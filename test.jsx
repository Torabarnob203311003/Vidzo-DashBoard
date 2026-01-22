import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { 
  LayoutDashboard, Users, FileCheck, DollarSign, Radio, 
  Trophy, Flag, ShoppingBag, Tag, MessageSquare, FileText,
  Settings, LogOut, Bell, Search, Plus, Edit, Trash2, Eye,
  X, ChevronDown, Menu, Crown, Upload, Send
} from 'lucide-react';

// Context for state management
const AppContext = createContext();

const initialState = {
  user: { name: 'Austin Mahoney', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=12' },
  categories: [
    { id: 1, title: 'Lifestyle', image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=200' },
    { id: 2, title: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200' },
    { id: 3, title: 'Gaming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200' },
    { id: 4, title: 'Cooking', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200' },
  ],
  conversations: [
    { id: 1, name: 'Florencio Dorrance', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'woohoooo', time: '24m', online: true, unread: 3 },
    { id: 2, name: 'Elmer Laverty', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Haha oh man🔥', time: '12m', online: false },
    { id: 3, name: 'Lavern Laboy', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: "Haha that's terrifying😅", time: '1h', online: false },
  ],
  activeChat: null,
  messages: [],
  faqs: [
    {
      id: 1,
      question: 'How can I start a live stream?',
      answer: 'To start a live stream, tap the "Go Live" button on the main screen or navigation menu. Enter your stream details like title, category, description, and any tags, then hit submit. Viewers will start joining in shortly!'
    },
    {
      id: 2,
      question: 'How can I join a live stream?',
      answer: 'To join a live stream, head to the live streams section. Browse through the available streams and click on the one you want to watch. Make sure your device is ready for streaming!'
    },
  ],
  feedbacks: [
    { id: 1, name: 'Lisa Johnson', feedback: 'This App....', rating: 4, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Lisa Johnson', feedback: 'This App....', rating: 4, avatar: 'https://i.pravatar.cc/150?img=5' },
  ]
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'ADD_FAQ':
      return { ...state, faqs: [...state.faqs, action.payload] };
    case 'DELETE_FAQ':
      return { ...state, faqs: state.faqs.filter(f => f.id !== action.payload) };
    default:
      return state;
  }
}

// Main App Component
export default function VidZoDashboard() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={state.user} setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {currentPage === 'overview' && <OverviewPage />}
            {currentPage === 'profile-settings' && <ProfileSettings />}
            {currentPage === 'categories' && <CategoriesPage />}
            {currentPage === 'messages' && <MessagesPage />}
            {currentPage === 'faq' && <FAQPage />}
            {currentPage === 'feedback' && <FeedbackPage />}
            {currentPage === 'marketplace' && <MarketplacePage />}
            {currentPage === 'challenges' && <ChallengesPage />}
            {currentPage === 'report-monitoring' && <ReportMonitoringPage />}
            {currentPage === 'streamers' && <StreamersPage />}
            {currentPage === 'business' && <BusinessUsersPage />}
            {currentPage === 'business-approvals' && <BusinessApprovalsPage />}
            {currentPage === 'marketplace-items' && <MarketplaceItemsPage />}
            {currentPage === 'earnings' && <EarningsPage />}
            {currentPage === 'live-monitoring' && <LiveMonitoringPage />}
            {currentPage === 'top-performers' && <TopPerformersPage />}
            {currentPage === 'terms-of-service' && <DocumentEditorPage title="Terms of Service" />}
            {currentPage === 'privacy-policy' && <DocumentEditorPage title="Privacy Policy" />}
            {currentPage === 'about-us' && <DocumentEditorPage title="About Us" />}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

// Sidebar Component
function Sidebar({ currentPage, setCurrentPage, sidebarOpen }) {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { 
      id: 'users', 
      icon: Users, 
      label: "User's",
      children: [
        { id: 'streamers', label: 'Streamer & Fans' },
        { id: 'business', label: 'Business Users' }
      ]
    },
    { 
      id: 'approvals', 
      icon: FileCheck, 
      label: 'Approvals',
      children: [
        { id: 'business-approvals', label: 'Business Users' },
        { id: 'marketplace-items', label: 'Marketplace Item' }
      ]
    },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'live-monitoring', icon: Radio, label: 'Live Monitoring' },
    { id: 'top-performers', icon: Trophy, label: 'Top Performers' },
    { id: 'report-monitoring', icon: Flag, label: 'Report Monitoring' },
    { id: 'challenges', icon: ShoppingBag, label: 'Challenges' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { id: 'categories', icon: Tag, label: 'Categories' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'feedback', icon: FileText, label: 'Feedback' },
    { 
      id: 'documentation', 
      icon: FileText, 
      label: 'Documentation',
      children: [
        { id: 'faq', label: 'FAQ' },
        { id: 'privacy-policy', label: 'Privacy Policy' },
        { id: 'terms-of-service', label: 'Terms of Service' },
        { id: 'about-us', label: 'About Us' }
      ]
    },
    { id: 'profile-settings', icon: Settings, label: 'Profile Settings' },
    { id: 'logout', icon: LogOut, label: 'Log Out' }
  ];

  const [expandedMenus, setExpandedMenus] = useState({});

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">VidZo</h1>
            <p className="text-xs text-yellow-600">STREAMING</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-400 mx-4 my-4 rounded-lg flex items-center gap-3 cursor-pointer">
        <LayoutDashboard className="w-5 h-5 text-gray-800" />
        <span className="font-medium text-gray-800">Overview</span>
      </div>

      <nav className="px-2 pb-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {menuItems.slice(1).map(item => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  setExpandedMenus(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                } else {
                  setCurrentPage(item.id);
                }
              }}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition ${
                currentPage === item.id ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.children && (
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus[item.id] ? 'rotate-180' : ''}`} />
              )}
            </button>
            
            {item.children && expandedMenus[item.id] && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setCurrentPage(child.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                      currentPage === child.id ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    • {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// Header Component
function Header({ user, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setSidebarOpen(prev => !prev)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Overview Page
function OverviewPage() {
  const stats = [
    { label: 'Total Users', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Regular Users (Creators & Fans)', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Business Users', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Platform Earnings', value: '$12,547', change: '+12% from last month', icon: DollarSign },
    { label: 'Live Now', value: '123', change: 'Peak 240 Today', icon: Radio }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Hello Austin <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-green-600 mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">User Overview</h2>
            <select className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg font-medium text-sm">
              <option>Regular</option>
              <option>Business</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month) => {
              const height = Math.random() * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Earning Overview</h2>
            <select className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg font-medium text-sm">
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month) => {
              const height = Math.random() * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-yellow-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity Pattern</h2>
          <p className="text-sm text-gray-600 mb-6">User activity and streams throughout the day</p>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <path d="M 0,150 Q 100,140 200,145 T 400,135 T 600,125 T 800,120" 
                    stroke="#FCD34D" strokeWidth="3" fill="none" />
              <path d="M 0,180 Q 100,175 200,178 T 400,172 T 600,170 T 800,168" 
                    stroke="#1F2937" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Geographic Distribution</h2>
          <div className="flex items-center justify-center mb-6">
            <svg className="w-48 h-48" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="#FCD34D" />
              <path d="M 100,20 A 80,80 0 0,1 180,100 L 100,100 Z" fill="#60A5FA" />
              <path d="M 180,100 A 80,80 0 0,1 100,180 L 100,100 Z" fill="#34D399" />
              <path d="M 100,180 A 80,80 0 0,1 20,100 L 100,100 Z" fill="#F97316" />
            </svg>
          </div>
          <div className="space-y-3">
            {[
              { region: 'North America', color: 'bg-yellow-400', percent: '35%' },
              { region: 'Europe', color: 'bg-blue-400', percent: '28%' },
              { region: 'Asia Pacific', color: 'bg-green-400', percent: '22%' },
              { region: 'South America', color: 'bg-orange-500', percent: '10%' },
              { region: 'Others', color: 'bg-purple-400', percent: '5%' }
            ].map(item => (
              <div key={item.region} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-600">{item.region}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Settings Page
function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('edit');
  const [formData, setFormData] = useState({
    fullName: 'Austin Mahoney',
    email: 'user@example.com',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex gap-2 p-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'edit' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'password' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?img=12" 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full"
                />
                <button type="button" className="absolute bottom-0 right-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition">
                  <Edit className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Categories Page
function CategoriesPage() {
  const { state, dispatch } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      title: categoryTitle,
      image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=200'
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    setShowModal(false);
    setCategoryTitle('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none"
          />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">000{category.id}</td>
                <td className="px-6 py-4">
                  <img src={category.image} alt={category.title} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{category.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => dispatch({ type: 'DELETE_CATEGORY', payload: category.id })}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">← Previous</button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 8, 9, 10].map((page, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-sm rounded-lg ${
                  page === 1 ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Next →</button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New Category">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category Title</label>
              <input
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="Enter Title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-12 text-center bg-yellow-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Upload Image</p>
                    <p className="text-sm text-gray-500">Max file size: 25 MB</p>
                  </div>
                  <button type="button" className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Messages Page Component
function MessagesPage() {
  const { state, dispatch } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState('');

  const selectChat = (conversation) => {
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: conversation });
    const mockMessages = [
      { id: 1, text: 'omg, this is amazing', sender: 'them', time: '10:30 AM' },
      { id: 2, text: 'perfect!✅', sender: 'them', time: '10:31 AM' },
      { id: 3, text: 'Wow, this is really epic', sender: 'them', time: '10:32 AM' },
      { id: 4, text: 'just ideas for next time', sender: 'them', time: '10:35 AM' },
      { id: 5, text: "I'll be there in 2 mins⏱️", sender: 'them', time: '10:36 AM' },
      { id: 6, text: 'woohoooo🔥', sender: 'them', time: '10:42 AM' }
    ];
    dispatch({ type: 'SET_MESSAGES', payload: mockMessages });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex">
        <div className="w-96 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">12</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {state.conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectChat(conv)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition ${
                  state.activeChat?.id === conv.id ? 'bg-yellow-50' : ''
                }`}
              >
                <div className="relative">
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <span className="w-6 h-6 bg-yellow-400 text-gray-800 text-xs font-semibold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {state.activeChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <img src={state.activeChat.avatar} alt={state.activeChat.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-800">{state.activeChat.name}</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'them' && (
                      <img src={state.activeChat.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div className={`max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-yellow-400 text-gray-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <MessageSquare className="w-16 h-16" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FAQ Page
function FAQPage() {
  const { state, dispatch } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_FAQ', payload: { id: Date.now(), question, answer } });
    setShowModal(false);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New FAQ
        </button>
      </div>

      <div className="space-y-4">
        {state.faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => dispatch({ type: 'DELETE_FAQ', payload: faq.id })}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New FAQ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter FAQ Question"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter FAQ Answer"
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Feedback Page
function FeedbackPage() {
  const { state } = useContext(AppContext);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none"
          />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feedback</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">0{feedback.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{feedback.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{feedback.feedback}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => setSelectedFeedback(feedback)}
                    className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <Modal onClose={() => setSelectedFeedback(null)} title="User Feedback">
          <div className="text-center space-y-4">
            <img 
              src={selectedFeedback.avatar} 
              alt={selectedFeedback.name} 
              className="w-32 h-32 rounded-lg mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-800">{selectedFeedback.name}</h3>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Feedback</p>
              <p className="text-gray-600 leading-relaxed">
                While the upload speed on your streaming app could use some improvement, I appreciate the overall functionality and user experience. Enhancing the upload speed would really help users like me meet our deadlines more efficiently. Thank you for considering this suggestion!
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Marketplace Page
function MarketplacePage() {
  const products = Array(10).fill({
    rank: '01',
    name: 'Larson Cap',
    business: 'Pam Cola',
    price: '$20',
    unitsSold: '1,240',
    totalSales: '$24,800',
    partner: 'Jim Larson',
    commission: '5.5',
    status: 'In Stock'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Product Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Business Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Unit Price</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Units Sold</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Sales</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Partner Creator</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Creator Commission (%)</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Item Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">{product.rank}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.business}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.price}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.unitsSold}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.totalSales}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.partner}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.commission}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      idx === 1 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {idx === 1 ? 'Out of Stock' : product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Challenges Page
function ChallengesPage() {
  const [showModal, setShowModal] = useState(false);
  const challenges = Array(10).fill({
    id: '01',
    title: 'Gift Giver',
    reward: '50 Feather',
    level: 'Rare',
    participants: '1,200',
    completion: '68%',
    status: 'Active'
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Challenges</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Challenge
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reward</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Challenge Level</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participants</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Completion %</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {challenges.map((challenge, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{challenge.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.reward}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.level}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.participants}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.completion}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                    {challenge.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New Challenges">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Title</label>
              <input
                placeholder="Enter Title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Description</label>
              <textarea
                placeholder="Challenge Description"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reward (Feather)</label>
              <input
                placeholder="eg:, 50"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Level</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Rare</option>
                <option>Common</option>
                <option>Epic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Type</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Send Gift</option>
                <option>Stream Duration</option>
                <option>Viewer Count</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Goal</label>
              <input
                placeholder="10"
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Report Monitoring Page
function ReportMonitoringPage() {
  const [activeTab, setActiveTab] = useState('moments');

  const stats = [
    { label: 'Live Stream Reports', value: '123' },
    { label: 'Streamer/Fans Reports', value: '432' },
    { label: 'Business User Reports', value: '345' },
    { label: 'Resolution Rate', value: '75%' },
    { label: 'Avg Resolution Time', value: '18 hrs' }
  ];

  const reports = Array(7).fill({
    id: '1223',
    post: 'Behind the scenes......',
    reason: 'Counterfeit Item',
    reportedBy: 'Bobby Miles',
    date: 'Sep 25, 2025',
    status: 'Pending'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Flag className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">6</p>
            <p className="text-sm text-gray-600">Pending Reports</p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-sm text-gray-600">Resolved Reports</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Flag className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">13</p>
            <p className="text-sm text-gray-600">Total Reports</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex gap-2 p-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('livestream')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'livestream' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Radio className="w-4 h-4" />
            Live Stream Reports
          </button>
          <button
            onClick={() => setActiveTab('streamers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'streamers' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Streamer/Fans Reports
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'business' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Business Users Reports
          </button>
          <button
            onClick={() => setActiveTab('moments')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'moments' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Moments Reports
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {activeTab === 'moments' && 'Moments Reports'}
            {activeTab === 'livestream' && 'Live Stream Reports'}
            {activeTab === 'streamers' && 'Streamers/Fans Reports'}
            {activeTab === 'business' && 'Business Users Reports'}
          </h2>

          <div className="flex justify-end mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Report ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Post</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Report Reason</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reported By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{report.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.post}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reportedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-semibold">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                        Resolve
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600">
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Document Editor Page
function DocumentEditorPage({ title }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option>Regular</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option>Sora</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <span className="font-bold">B</span>
          </button>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <span className="italic">I</span>
          </button>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            ABC
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border-none outline-none resize-none"
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
}

// Modal Component
function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
































// Modal Component
function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Streamers & Fans Page
function StreamersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const streamers = Array(10).fill({
    id: '1223',
    name: 'Mille Jacob',
    location: 'New York, USA',
    featherLevel: 2,
    avgViewers: '2457',
    totalFeather: '1200',
    totalCoins: '12',
    flagged: 0,
    followers: '122',
    following: '56',
    friends: '56',
    subscribers: '56',
    totalEarnings: '$200.87',
    lastStream: '2 hrs Ago'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Streamers & Fans</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">ID</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Location</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Feather Level</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Avg Viewers</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Feather</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Coins</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Flagged</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Followers</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Following</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Friends</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Subscribers</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Earnings</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Last Stream</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {streamers.map((streamer, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.id}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">{streamer.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.location}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.featherLevel}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.avgViewers}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.totalFeather}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.totalCoins}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.flagged}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.followers}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.following}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.friends}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.subscribers}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.totalEarnings}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{streamer.lastStream}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedUser(streamer)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>

      {selectedUser && (
        <Modal onClose={() => setSelectedUser(null)} title="Users Details">
          <div className="text-center space-y-4">
            <img 
              src="https://i.pravatar.cc/150?img=8" 
              alt={selectedUser.name}
              className="w-40 h-40 rounded-xl mx-auto object-cover"
            />
            <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Email :
                </span>
                <span className="font-semibold text-gray-800">user@exmaple.com</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location :
                </span>
                <span className="font-semibold text-gray-800">George Town</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Business Users Page
function BusinessUsersPage() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  const businesses = Array(10).fill({
    id: '1223',
    name: 'Mille Jacob',
    businessName: 'Pam Cola',
    totalEarnings: '$22,407',
    totalProductSold: 25,
    subscriptionPlan: 'Business Basic',
    topSoldProduct: 'Premium Hoodie',
    activeProducts: 20,
    totalPartnerCreators: 12,
    avgReview: 4.9,
    flagged: 0
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Users</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">ID</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Business Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Earnings</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Product Sold</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Subscription Plan</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Top Sold Product</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Active Products</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Partner Creators</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Avg Review</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Flagged</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {businesses.map((business, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">{business.id}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">{business.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.businessName}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.totalEarnings}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.totalProductSold}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.subscriptionPlan}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.topSoldProduct}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.activeProducts}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.totalPartnerCreators}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.avgReview}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{business.flagged}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBusiness(business)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>

      {selectedBusiness && (
        <Modal onClose={() => setSelectedBusiness(null)} title="Users Details">
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-red-500 rounded-xl mx-auto flex items-center justify-center">
              <div className="text-white text-6xl font-bold">Pam Cola</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Pam Cola</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Business Owner :
                </span>
                <span className="font-semibold text-gray-800">Mile Jacob</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Email :
                </span>
                <span className="font-semibold text-gray-800">user@exmaple.com</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location :
                </span>
                <span className="font-semibold text-gray-800">George Town</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Business Approvals Page
function BusinessApprovalsPage() {
  const approvals = Array(10).fill({
    id: '1223',
    businessName: 'Mille Jacob',
    userName: 'Chris Brad',
    submitted: '2024-01-15',
    taxId: 'TXN099145678'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Users</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Business Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tax ID/ Reg Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verification Documents</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {approvals.map((approval, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{approval.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{approval.businessName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{approval.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{approval.submitted}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{approval.taxId}</td>
                <td className="px-6 py-4">
                  <button className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500">
                    View
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  );
}

// Marketplace Items Page
function MarketplaceItemsPage() {
  const items = Array(10).fill({
    id: '1',
    productName: 'Premium Hoodie',
    businessName: 'Pam Cola',
    price: '$20.00',
    partneredCreator: 'Tom McMahon',
    creatorCommission: '5.5%',
    submitted: '2024-01-16'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Marketplace Item</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Business Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Partnered Creator</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Creator Commission</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
                    <span className="text-sm font-medium text-gray-800">{item.productName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.businessName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.price}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.partneredCreator}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.creatorCommission}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.submitted}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  );
}

// Earnings Page
function EarningsPage() {
  const earnings = Array(10).fill({
    id: '1223',
    sourceType: 'Streamer',
    userName: 'Alex McMahon',
    totalValue: '$12,500',
    commissionPercentage: '33%',
    adminShare: '$4,125 (33%)',
    notes: "Admin's cut from all streamer earnings",
    date: 'Sep 27, 2025'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Earnings</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Source Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User Name/Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Commission Percentage (%)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Admin Share</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {earnings.map((earning, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.sourceType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.totalValue}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.commissionPercentage}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.adminShare}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.notes}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{earning.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>
    </div>
  );
}

// Live Monitoring Page
function LiveMonitoringPage() {
  const streams = Array(10).fill({
    id: '1223',
    name: 'Graham Jackson',
    title: 'IRL Stream | Streaming from Las Vegas | Doing QA Sessions',
    category: 'Lifestyle',
    currentViewers: '10002',
    peakViews: '15621',
    flagged: 2
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Live Monitoring</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-600">Currently Live</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">1,247</p>
          <p className="text-xs text-gray-500 mt-1">Across all categories</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Total Viewers</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">342,891</p>
          <p className="text-xs text-gray-500 mt-1">+12% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Peak Concurrent</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">89,234</p>
          <p className="text-xs text-gray-500 mt-1">At 8:00 PM today</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Real-time overview of active streams</h2>
          <div className="flex justify-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 pyimport React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { 
  LayoutDashboard, Users, FileCheck, DollarSign, Radio, 
  Trophy, Flag, ShoppingBag, Tag, MessageSquare, FileText,
  Settings, LogOut, Bell, Search, Plus, Edit, Trash2, Eye,
  X, ChevronDown, Menu, Crown, Upload, Send
} from 'lucide-react';

// Context for state management
const AppContext = createContext();

const initialState = {
  user: { name: 'Austin Mahoney', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=12' },
  categories: [
    { id: 1, title: 'Lifestyle', image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=200' },
    { id: 2, title: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200' },
    { id: 3, title: 'Gaming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200' },
    { id: 4, title: 'Cooking', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200' },
  ],
  conversations: [
    { id: 1, name: 'Florencio Dorrance', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'woohoooo', time: '24m', online: true, unread: 3 },
    { id: 2, name: 'Elmer Laverty', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Haha oh man🔥', time: '12m', online: false },
    { id: 3, name: 'Lavern Laboy', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: "Haha that's terrifying😅", time: '1h', online: false },
  ],
  activeChat: null,
  messages: [],
  faqs: [
    {
      id: 1,
      question: 'How can I start a live stream?',
      answer: 'To start a live stream, tap the "Go Live" button on the main screen or navigation menu. Enter your stream details like title, category, description, and any tags, then hit submit. Viewers will start joining in shortly!'
    },
    {
      id: 2,
      question: 'How can I join a live stream?',
      answer: 'To join a live stream, head to the live streams section. Browse through the available streams and click on the one you want to watch. Make sure your device is ready for streaming!'
    },
  ],
  feedbacks: [
    { id: 1, name: 'Lisa Johnson', feedback: 'This App....', rating: 4, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Lisa Johnson', feedback: 'This App....', rating: 4, avatar: 'https://i.pravatar.cc/150?img=5' },
  ]
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'ADD_FAQ':
      return { ...state, faqs: [...state.faqs, action.payload] };
    case 'DELETE_FAQ':
      return { ...state, faqs: state.faqs.filter(f => f.id !== action.payload) };
    default:
      return state;
  }
}

// Main App Component
export default function VidZoDashboard() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={state.user} setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {currentPage === 'overview' && <OverviewPage />}
            {currentPage === 'profile-settings' && <ProfileSettings />}
            {currentPage === 'categories' && <CategoriesPage />}
            {currentPage === 'messages' && <MessagesPage />}
            {currentPage === 'faq' && <FAQPage />}
            {currentPage === 'feedback' && <FeedbackPage />}
            {currentPage === 'marketplace' && <MarketplacePage />}
            {currentPage === 'challenges' && <ChallengesPage />}
            {currentPage === 'report-monitoring' && <ReportMonitoringPage />}
            {currentPage === 'streamers' && <StreamersPage />}
            {currentPage === 'business' && <BusinessUsersPage />}
            {currentPage === 'business-approvals' && <BusinessApprovalsPage />}
            {currentPage === 'marketplace-items' && <MarketplaceItemsPage />}
            {currentPage === 'earnings' && <EarningsPage />}
            {currentPage === 'live-monitoring' && <LiveMonitoringPage />}
            {currentPage === 'top-performers' && <TopPerformersPage />}
            {currentPage === 'terms-of-service' && <DocumentEditorPage title="Terms of Service" />}
            {currentPage === 'privacy-policy' && <DocumentEditorPage title="Privacy Policy" />}
            {currentPage === 'about-us' && <DocumentEditorPage title="About Us" />}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

// Sidebar Component
function Sidebar({ currentPage, setCurrentPage, sidebarOpen }) {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { 
      id: 'users', 
      icon: Users, 
      label: "User's",
      children: [
        { id: 'streamers', label: 'Streamer & Fans' },
        { id: 'business', label: 'Business Users' }
      ]
    },
    { 
      id: 'approvals', 
      icon: FileCheck, 
      label: 'Approvals',
      children: [
        { id: 'business-approvals', label: 'Business Users' },
        { id: 'marketplace-items', label: 'Marketplace Item' }
      ]
    },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'live-monitoring', icon: Radio, label: 'Live Monitoring' },
    { id: 'top-performers', icon: Trophy, label: 'Top Performers' },
    { id: 'report-monitoring', icon: Flag, label: 'Report Monitoring' },
    { id: 'challenges', icon: ShoppingBag, label: 'Challenges' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { id: 'categories', icon: Tag, label: 'Categories' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'feedback', icon: FileText, label: 'Feedback' },
    { 
      id: 'documentation', 
      icon: FileText, 
      label: 'Documentation',
      children: [
        { id: 'faq', label: 'FAQ' },
        { id: 'privacy-policy', label: 'Privacy Policy' },
        { id: 'terms-of-service', label: 'Terms of Service' },
        { id: 'about-us', label: 'About Us' }
      ]
    },
    { id: 'profile-settings', icon: Settings, label: 'Profile Settings' },
    { id: 'logout', icon: LogOut, label: 'Log Out' }
  ];

  const [expandedMenus, setExpandedMenus] = useState({});

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">VidZo</h1>
            <p className="text-xs text-yellow-600">STREAMING</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-400 mx-4 my-4 rounded-lg flex items-center gap-3 cursor-pointer">
        <LayoutDashboard className="w-5 h-5 text-gray-800" />
        <span className="font-medium text-gray-800">Overview</span>
      </div>

      <nav className="px-2 pb-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {menuItems.slice(1).map(item => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  setExpandedMenus(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                } else {
                  setCurrentPage(item.id);
                }
              }}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition ${
                currentPage === item.id ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.children && (
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus[item.id] ? 'rotate-180' : ''}`} />
              )}
            </button>
            
            {item.children && expandedMenus[item.id] && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setCurrentPage(child.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                      currentPage === child.id ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    • {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// Header Component
function Header({ user, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setSidebarOpen(prev => !prev)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Overview Page
function OverviewPage() {
  const stats = [
    { label: 'Total Users', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Regular Users (Creators & Fans)', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Business Users', value: '12,547', change: '+12 from last month', icon: Users },
    { label: 'Platform Earnings', value: '$12,547', change: '+12% from last month', icon: DollarSign },
    { label: 'Live Now', value: '123', change: 'Peak 240 Today', icon: Radio }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Hello Austin <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-green-600 mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">User Overview</h2>
            <select className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg font-medium text-sm">
              <option>Regular</option>
              <option>Business</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month) => {
              const height = Math.random() * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Earning Overview</h2>
            <select className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg font-medium text-sm">
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month) => {
              const height = Math.random() * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-yellow-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity Pattern</h2>
          <p className="text-sm text-gray-600 mb-6">User activity and streams throughout the day</p>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <path d="M 0,150 Q 100,140 200,145 T 400,135 T 600,125 T 800,120" 
                    stroke="#FCD34D" strokeWidth="3" fill="none" />
              <path d="M 0,180 Q 100,175 200,178 T 400,172 T 600,170 T 800,168" 
                    stroke="#1F2937" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Geographic Distribution</h2>
          <div className="flex items-center justify-center mb-6">
            <svg className="w-48 h-48" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="#FCD34D" />
              <path d="M 100,20 A 80,80 0 0,1 180,100 L 100,100 Z" fill="#60A5FA" />
              <path d="M 180,100 A 80,80 0 0,1 100,180 L 100,100 Z" fill="#34D399" />
              <path d="M 100,180 A 80,80 0 0,1 20,100 L 100,100 Z" fill="#F97316" />
            </svg>
          </div>
          <div className="space-y-3">
            {[
              { region: 'North America', color: 'bg-yellow-400', percent: '35%' },
              { region: 'Europe', color: 'bg-blue-400', percent: '28%' },
              { region: 'Asia Pacific', color: 'bg-green-400', percent: '22%' },
              { region: 'South America', color: 'bg-orange-500', percent: '10%' },
              { region: 'Others', color: 'bg-purple-400', percent: '5%' }
            ].map(item => (
              <div key={item.region} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-600">{item.region}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Settings Page
function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('edit');
  const [formData, setFormData] = useState({
    fullName: 'Austin Mahoney',
    email: 'user@example.com',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex gap-2 p-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'edit' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'password' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?img=12" 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full"
                />
                <button type="button" className="absolute bottom-0 right-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition">
                  <Edit className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Categories Page
function CategoriesPage() {
  const { state, dispatch } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      title: categoryTitle,
      image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=200'
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    setShowModal(false);
    setCategoryTitle('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none"
          />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">000{category.id}</td>
                <td className="px-6 py-4">
                  <img src={category.image} alt={category.title} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{category.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => dispatch({ type: 'DELETE_CATEGORY', payload: category.id })}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">← Previous</button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 8, 9, 10].map((page, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-sm rounded-lg ${
                  page === 1 ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Next →</button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New Category">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category Title</label>
              <input
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="Enter Title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-12 text-center bg-yellow-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Upload Image</p>
                    <p className="text-sm text-gray-500">Max file size: 25 MB</p>
                  </div>
                  <button type="button" className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Messages Page Component
function MessagesPage() {
  const { state, dispatch } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState('');

  const selectChat = (conversation) => {
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: conversation });
    const mockMessages = [
      { id: 1, text: 'omg, this is amazing', sender: 'them', time: '10:30 AM' },
      { id: 2, text: 'perfect!✅', sender: 'them', time: '10:31 AM' },
      { id: 3, text: 'Wow, this is really epic', sender: 'them', time: '10:32 AM' },
      { id: 4, text: 'just ideas for next time', sender: 'them', time: '10:35 AM' },
      { id: 5, text: "I'll be there in 2 mins⏱️", sender: 'them', time: '10:36 AM' },
      { id: 6, text: 'woohoooo🔥', sender: 'them', time: '10:42 AM' }
    ];
    dispatch({ type: 'SET_MESSAGES', payload: mockMessages });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex">
        <div className="w-96 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">12</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {state.conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectChat(conv)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition ${
                  state.activeChat?.id === conv.id ? 'bg-yellow-50' : ''
                }`}
              >
                <div className="relative">
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <span className="w-6 h-6 bg-yellow-400 text-gray-800 text-xs font-semibold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {state.activeChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <img src={state.activeChat.avatar} alt={state.activeChat.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-800">{state.activeChat.name}</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'them' && (
                      <img src={state.activeChat.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div className={`max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-yellow-400 text-gray-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <MessageSquare className="w-16 h-16" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FAQ Page
function FAQPage() {
  const { state, dispatch } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_FAQ', payload: { id: Date.now(), question, answer } });
    setShowModal(false);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New FAQ
        </button>
      </div>

      <div className="space-y-4">
        {state.faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => dispatch({ type: 'DELETE_FAQ', payload: faq.id })}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New FAQ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter FAQ Question"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter FAQ Answer"
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Feedback Page
function FeedbackPage() {
  const { state } = useContext(AppContext);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none"
          />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feedback</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">0{feedback.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{feedback.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{feedback.feedback}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => setSelectedFeedback(feedback)}
                    className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <Modal onClose={() => setSelectedFeedback(null)} title="User Feedback">
          <div className="text-center space-y-4">
            <img 
              src={selectedFeedback.avatar} 
              alt={selectedFeedback.name} 
              className="w-32 h-32 rounded-lg mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-800">{selectedFeedback.name}</h3>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Feedback</p>
              <p className="text-gray-600 leading-relaxed">
                While the upload speed on your streaming app could use some improvement, I appreciate the overall functionality and user experience. Enhancing the upload speed would really help users like me meet our deadlines more efficiently. Thank you for considering this suggestion!
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Marketplace Page
function MarketplacePage() {
  const products = Array(10).fill({
    rank: '01',
    name: 'Larson Cap',
    business: 'Pam Cola',
    price: '$20',
    unitsSold: '1,240',
    totalSales: '$24,800',
    partner: 'Jim Larson',
    commission: '5.5',
    status: 'In Stock'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Product Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Business Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Unit Price</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Units Sold</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Total Sales</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Partner Creator</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Creator Commission (%)</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Item Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">{product.rank}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.business}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.price}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.unitsSold}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.totalSales}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.partner}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{product.commission}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      idx === 1 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {idx === 1 ? 'Out of Stock' : product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Challenges Page
function ChallengesPage() {
  const [showModal, setShowModal] = useState(false);
  const challenges = Array(10).fill({
    id: '01',
    title: 'Gift Giver',
    reward: '50 Feather',
    level: 'Rare',
    participants: '1,200',
    completion: '68%',
    status: 'Active'
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Challenges</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Challenge
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none" />
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reward</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Challenge Level</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participants</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Completion %</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {challenges.map((challenge, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{challenge.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.reward}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.level}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.participants}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{challenge.completion}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                    {challenge.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New Challenges">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Title</label>
              <input
                placeholder="Enter Title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Description</label>
              <textarea
                placeholder="Challenge Description"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reward (Feather)</label>
              <input
                placeholder="eg:, 50"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Level</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Rare</option>
                <option>Common</option>
                <option>Epic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Type</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Send Gift</option>
                <option>Stream Duration</option>
                <option>Viewer Count</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Goal</label>
              <input
                placeholder="10"
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Report Monitoring Page
function ReportMonitoringPage() {
  const [activeTab, setActiveTab] = useState('moments');

  const stats = [
    { label: 'Live Stream Reports', value: '123' },
    { label: 'Streamer/Fans Reports', value: '432' },
    { label: 'Business User Reports', value: '345' },
    { label: 'Resolution Rate', value: '75%' },
    { label: 'Avg Resolution Time', value: '18 hrs' }
  ];

  const reports = Array(7).fill({
    id: '1223',
    post: 'Behind the scenes......',
    reason: 'Counterfeit Item',
    reportedBy: 'Bobby Miles',
    date: 'Sep 25, 2025',
    status: 'Pending'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Flag className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">6</p>
            <p className="text-sm text-gray-600">Pending Reports</p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-sm text-gray-600">Resolved Reports</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Flag className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">13</p>
            <p className="text-sm text-gray-600">Total Reports</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex gap-2 p-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('livestream')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'livestream' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Radio className="w-4 h-4" />
            Live Stream Reports
          </button>
          <button
            onClick={() => setActiveTab('streamers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'streamers' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Streamer/Fans Reports
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'business' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Business Users Reports
          </button>
          <button
            onClick={() => setActiveTab('moments')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'moments' ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Moments Reports
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {activeTab === 'moments' && 'Moments Reports'}
            {activeTab === 'livestream' && 'Live Stream Reports'}
            {activeTab === 'streamers' && 'Streamers/Fans Reports'}
            {activeTab === 'business' && 'Business Users Reports'}
          </h2>

          <div className="flex justify-end mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Report ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Post</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Report Reason</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reported By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{report.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.post}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reportedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-semibold">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                        Resolve
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600">
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Document Editor Page
function DocumentEditorPage({ title }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option>Regular</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option>Sora</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <span className="font-bold">B</span>
          </button>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <span className="italic">I</span>
          </button>
          <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            ABC
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border-none outline-none resize-none"
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
}

// Modal Component
function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

