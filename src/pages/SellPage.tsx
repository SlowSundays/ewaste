import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function SellPage() {

  const { user } = useAuth();

  const [step,setStep] = useState(0)

  const [selectedCategory,setSelectedCategory] = useState<string|null>(null)
  const [deviceName,setDeviceName] = useState("")
  const [modelNumber,setModelNumber] = useState("")
  const [brand,setBrand] = useState("")

  const [images,setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement|null>(null)

  const [answers,setAnswers] = useState({
    working:null as boolean|null,
    screen:null as boolean|null,
    ports:null as boolean|null,
    speakers:null as boolean|null
  })

  const categories = ["Mobile","Laptop","TV","Tablet"]

  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET


  // Upload images to cloudinary
  const handleUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {

    if(!e.target.files) return

    const files = Array.from(e.target.files)

    const uploaded = await Promise.all(

      files.map(async(file)=>{

        const formData = new FormData()
        formData.append("file",file)
        formData.append("upload_preset",uploadPreset)

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {method:"POST",body:formData}
        )

        const data = await res.json()

        return data.secure_url

      })

    )

    setImages(prev=>[...prev,...uploaded])

  }


  const removeImage = (index:number)=>{
    setImages(prev=>prev.filter((_,i)=>i!==index))
  }


  const handleAnswer = (key:keyof typeof answers,value:boolean)=>{
    setAnswers(prev=>({...prev,[key]:value}))
  }


  const weights = {working:40,screen:25,ports:20,speakers:15}

  const score = Object.entries(answers).reduce((total,[key,value])=>{
    if(value===true) return total + weights[key as keyof typeof weights]
    return total
  },0)


  let grade = "F"

  if(score>=90) grade="A"
  else if(score>=75) grade="B"
  else if(score>=60) grade="C"
  else if(score>=40) grade="D"


  const basePriceMap:any = {
    Mobile:1800,
    Laptop:3500,
    TV:2500,
    Tablet:1200
  }

  const basePrice = selectedCategory ? basePriceMap[selectedCategory] : 1500

  const gradeMultiplier:any = {
    A:1,
    B:0.8,
    C:0.6,
    D:0.4,
    F:0.2
  }

  const price = Math.round(basePrice * gradeMultiplier[grade])


  const submitSell = async()=>{

    const productData = {
      category:selectedCategory,
      deviceName,
      modelNumber,
      brand,
      images,
      grade,
      price,
    sellerId: user ? user.id : "",
    }

    await fetch("http://localhost:5001/api/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(productData)
    })

    alert("Device Listed")

  }



  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar/>

      <section className="bg-teal-700 text-white py-14 text-center">
        <h1 className="text-3xl font-bold">Sell Your Device</h1>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">




{/* STEP 0 */}

{step===0 && (

<div className="bg-white p-10 rounded-xl shadow max-w-3xl mx-auto">

<h2 className="text-2xl font-bold mb-6">Device Info</h2>

<div className="grid grid-cols-4 gap-4 mb-6">

{categories.map(cat=>(
<button
key={cat}
onClick={()=>setSelectedCategory(cat)}
className={`p-3 border rounded ${
selectedCategory===cat ? "bg-teal-600 text-white":""
}`}
>
{cat}
</button>
))}

</div>

<input
placeholder="Device Name"
value={deviceName}
onChange={e=>setDeviceName(e.target.value)}
className="border w-full p-3 mb-4"
/>

<input
placeholder="Model Number"
value={modelNumber}
onChange={e=>setModelNumber(e.target.value)}
className="border w-full p-3 mb-4"
/>

<input
placeholder="Brand"
value={brand}
onChange={e=>setBrand(e.target.value)}
className="border w-full p-3 mb-6"
/>

<button
onClick={()=>setStep(1)}
className="bg-teal-600 text-white px-6 py-3 rounded"
>
Next
</button>

</div>

)}




{/* STEP 1 */}

{step===1 && (

<div className="bg-white p-10 rounded-xl shadow max-w-3xl mx-auto">

<h2 className="text-xl font-bold mb-6">Upload Images</h2>

<div
onClick={()=>fileInputRef.current?.click()}
className="border-2 border-dashed p-10 text-center cursor-pointer"
>

<UploadCloud className="mx-auto mb-2"/>

Click to upload

<input
ref={fileInputRef}
type="file"
hidden
multiple
onChange={handleUpload}
/>

</div>


<div className="flex gap-3 flex-wrap mt-6">

{images.map((img,idx)=>(
<div key={idx} className="relative">

<img
src={img}
className="w-24 h-24 object-cover"
/>

<button
onClick={()=>removeImage(idx)}
className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
>
<X size={12}/>
</button>

</div>
))}

</div>


<div className="flex justify-between mt-8">

<button onClick={()=>setStep(0)}>Back</button>

<button
onClick={()=>setStep(2)}
className="bg-teal-600 text-white px-6 py-3 rounded"
>
Next
</button>

</div>

</div>

)}




{/* STEP 2 */}

{step===2 && (

<div className="bg-white p-10 rounded-xl shadow max-w-3xl mx-auto">

<h2 className="text-xl font-bold mb-6">Device Condition</h2>

{Object.keys(answers).map(key=>(
<div key={key} className="mb-4">

<p className="mb-2 font-semibold">{key}</p>

<button
onClick={()=>handleAnswer(key as any,true)}
className="border px-4 py-2 mr-3"
>
Yes
</button>

<button
onClick={()=>handleAnswer(key as any,false)}
className="border px-4 py-2"
>
No
</button>

</div>
))}


<div className="mt-6">

<p>Grade: {grade}</p>

<p>Price: ${price}</p>

</div>


<button
onClick={submitSell}
className="bg-teal-600 text-white px-6 py-3 rounded mt-6"
>
Submit
</button>

</div>

)}

</main>

</div>

)
}