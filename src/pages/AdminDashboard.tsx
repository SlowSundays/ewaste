import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Recycle,
  Users,
  Search,
  Settings,
  LogOut,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  Bell,
  Wallet,
  BatteryCharging,
  XCircle,
  Trash2,
  MapPin,
  Mail
} from 'lucide-react';

// --- MOCK DATA ---

const stats = [
  { label: 'Pending Listings', value: '12', subtext: 'Requires grading check', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Disposal Requests', value: '8', subtext: 'Pickups to schedule', icon: Recycle, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Total Revenue', value: 'RM 12,450', subtext: '+18% from last month', icon: Wallet, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Active Users', value: '1,204', subtext: '45 new this week', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
];

const allListings = [
  { id: 101, item: 'iPhone 13 Pro', seller: 'Alex Tan', price: 'RM 2,500', grade: 'A', date: 'Oct 24, 2025', status: 'Pending' },
  { id: 102, item: 'MacBook Air M1', seller: 'Sarah Lee', price: 'RM 3,200', grade: 'B', date: 'Oct 23, 2025', status: 'Approved' },
  { id: 103, item: 'Sony Headphones', seller: 'John Doe', price: 'RM 450', grade: 'C', date: 'Oct 22, 2025', status: 'Rejected' },
  { id: 104, item: 'Samsung S21', seller: 'Rumi Aktar', price: 'RM 1,800', grade: 'A', date: 'Oct 21, 2025', status: 'Pending' },
];

const allDisposals = [
  { id: 201, user: 'Sarah Lee', items: 'CRT Monitor, Old Cables', location: 'Kuala Lumpur', date: 'Oct 25, 2025', status: 'Action Needed' },
  { id: 202, user: 'David Chen', items: 'Broken Washing Machine', location: 'Petaling Jaya', date: 'Oct 24, 2025', status: 'Scheduled' },
  { id: 203, user: 'Jenny Kim', items: '5x Old Laptops', location: 'Subang Jaya', date: 'Oct 22, 2025', status: 'Completed' },
];

const allUsers = [
  { id: 1, name: 'Alex Tan', email: 'alex@example.com', role: 'Seller', joined: 'Jan 2024', status: 'Active' },
  { id: 2, name: 'Sarah Lee', email: 'sarah@example.com', role: 'Buyer', joined: 'Mar 2024', status: 'Active' },
  { id: 3, name: 'John Doe', email: 'john@gmail.com', role: 'Seller', joined: 'Dec 2023', status: 'Suspended' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'listings' | 'disposal' | 'users'
  const [searchQuery, setSearchQuery] = useState('');

  // --- SUB-COMPONENTS FOR VIEWS ---

  const DashboardOverview = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-6">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold">Recent Actions Needed</h2>
          <button onClick={() => setActiveTab('listings')} className="text-sm font-bold text-teal-600 hover:text-teal-800">View All Activity</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">Listing</span></td>
                <td className="px-6 py-4 font-medium">Alex Tan</td>
                <td className="px-6 py-4">iPhone 13 Pro (Grade A)</td>
                <td className="px-6 py-4 text-orange-600 font-bold text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> Pending</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4"><span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-bold">Disposal</span></td>
                <td className="px-6 py-4 font-medium">Sarah Lee</td>
                <td className="px-6 py-4">CRT Monitor + Cables</td>
                <td className="px-6 py-4 text-red-600 font-bold text-sm flex items-center gap-1"><XCircle className="w-4 h-4" /> Action Needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const ListingsView = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Listings</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold hover:bg-gray-200">Export</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800">Add New</button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Item</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Seller</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Grade</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allListings.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-bold">{item.item}</td>
              <td className="px-6 py-4 text-gray-600">{item.seller}</td>
              <td className="px-6 py-4 font-medium">{item.price}</td>
              <td className="px-6 py-4"><span className="bg-gray-100 px-2 py-1 rounded font-bold">{item.grade}</span></td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Approve"><CheckCircle2 className="w-4 h-4" /></button>
                <button className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Reject"><XCircle className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const DisposalView = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Disposal Requests</h2>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Items to Pickup</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Location</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allDisposals.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-bold">{request.user}</td>
              <td className="px-6 py-4 text-gray-600">{request.items}</td>
              <td className="px-6 py-4 flex items-center gap-1 text-gray-500"><MapPin className="w-3 h-3" /> {request.location}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  request.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="px-3 py-1 bg-black text-white text-xs font-bold rounded hover:bg-gray-800">Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const UsersView = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold">User Management</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Find user..." className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50" />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{user.role}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button className="p-2 text-gray-400 hover:text-black"><Mail className="w-4 h-4" /></button>
                <button className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white fixed h-full z-20 hidden md:flex flex-col transition-all">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-800">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
             <BatteryCharging className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide">Admin Panel</span>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Overview</p>
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'listings' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Listings</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('disposal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'disposal' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <Recycle className="w-5 h-5" />
            <span>Disposal</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'users' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>

          <div className="pt-8">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Settings</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors font-medium">
              <Settings className="w-5 h-5" />
              <span>Configuration</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 bg-gray-50 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-between shadow-sm">
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings, users, or order IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-full outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button 
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-md group"
            >
              <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              <span className="text-sm font-bold">User View</span>
            </button>
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">AD</div>
          </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="p-8 flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 capitalize">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab} Management
            </h1>
            <p className="text-gray-500">Welcome back, Admin.</p>
          </div>

          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'listings' && <ListingsView />}
          {activeTab === 'disposal' && <DisposalView />}
          {activeTab === 'users' && <UsersView />}
          
        </div>
      </main>
    </div>
  );
}