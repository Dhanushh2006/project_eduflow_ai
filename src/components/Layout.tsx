import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, GraduationCap, Building2, BookOpen, DoorOpen, CalendarDays, AlertTriangle, ClipboardCheck, BarChart3, Users2, Settings, Bell, Search, LogOut, Menu, X, Sparkles, Activity } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../lib/store'

const nav = [
  { label:'Overview', icon: LayoutDashboard, path:'/dashboard'},
  { label:'Operations', icon: Activity, path:'/operations'},
  { label:'Documents', icon: FileText, path:'/documents'},
  { label:'Students', icon: Users, path:'/students'},
  { label:'Teachers', icon: GraduationCap, path:'/teachers'},
  { label:'Classes', icon: Building2, path:'/classes'},
  { label:'Subjects', icon: BookOpen, path:'/subjects'},
  { label:'Rooms', icon: DoorOpen, path:'/rooms'},
  { label:'Timetable', icon: CalendarDays, path:'/timetable'},
  { label:'Conflicts', icon: AlertTriangle, path:'/conflicts'},
  { label:'Attendance', icon: ClipboardCheck, path:'/attendance'},
  { label:'Analytics', icon: BarChart3, path:'/analytics'},
  { label:'Staffing', icon: Users2, path:'/staffing'},
]

export default function Layout({ children }:{children:React.ReactNode}){
  const [mobileOpen, setMobileOpen] = useState(false)
  const { alerts, notifications, students, teachers } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const unread = notifications.filter(n=>!n.read).length

  const searchResults = query ? [
    ...students.filter(s=> s.name.toLowerCase().includes(query.toLowerCase())).slice(0,3).map(s=> ({ label:s.name, sub:`Student • ${s.className}`, link:'/students'})),
    ...teachers.filter(t=> t.name.toLowerCase().includes(query.toLowerCase())).slice(0,3).map(t=> ({ label:t.name, sub:`Teacher • ${t.department}`, link:'/teachers'})),
  ] : []

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* sidebar */}
      <aside className={`w-[260px] shrink-0 bg-white border-r border-slate-200 flex flex-col fixed lg:sticky top-0 h-screen z-30 transition-transform ${mobileOpen?'translate-x-0':'-translate-x-full lg:translate-x-0'}`}>
        <div className="h-[64px] px-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-[13px]">EF</div>
          <div>
            <div className="text-[14px] font-semibold tracking-tight text-slate-900 leading-none">EduFlow AI</div>
            <div className="text-[11px] text-slate-500 font-medium tracking-wide">OPERATING SYSTEM</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {nav.map(item=> {
            const active = location.pathname===item.path || (item.path==='/dashboard' && location.pathname==='/')
            return (
              <NavLink key={item.path} to={item.path} onClick={()=>setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13.5px] font-medium transition-colors ${active?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                <item.icon size={16} strokeWidth={active?2.2:1.8}/>
                {item.label}
                {item.label==='Conflicts' && alerts.filter(a=>a.type==='timetable').length>0 && <span className="ml-auto text-[11px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-semibold">{alerts.filter(a=>a.type==='timetable').length}</span>}
                {item.label==='Documents' && alerts.filter(a=>a.type==='document').length>0 && <span className="ml-auto w-2 h-2 bg-amber-500 rounded-full"/>}
              </NavLink>
            )
          })}
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-1">
          <NavLink to="/notifications" className={({isActive})=>`flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium ${isActive?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-50'}`}><Bell size={16}/> Notifications {unread>0 && <span className="ml-auto bg-blue-600 text-white text-[11px] px-1.5 py-0.5 rounded-full">{unread}</span>}</NavLink>
          <NavLink to="/settings" className={({isActive})=>`flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium ${isActive?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-50'}`}><Settings size={16}/> Settings</NavLink>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-3 px-2">
            <img src="https://i.pravatar.cc/100?img=33" className="w-8 h-8 rounded-full object-cover"/>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-900 leading-none">Admin</div>
              <div className="text-[11px] text-slate-500">admin@eduflow.ai</div>
            </div>
            <button onClick={()=>navigate('/login')} className="p-1.5 hover:bg-slate-100 rounded-lg"><LogOut size={14} className="text-slate-500"/></button>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-[64px] bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center gap-4 px-4 lg:px-6">
          <button onClick={()=>setMobileOpen(!mobileOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">{mobileOpen? <X size={18}/>:<Menu size={18}/>}</button>
          <div className="hidden lg:flex items-center gap-2 text-[13px] text-slate-500">
            <Sparkles size={14} className="text-blue-600"/>
            <span>Intelligent operations • <span className="text-slate-900 font-medium">School ID: EF-BLR-2024</span></span>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input value={query} onChange={e=>{setQuery(e.target.value); setShowSearch(true)}} onFocus={()=>setShowSearch(true)} onBlur={()=>setTimeout(()=>setShowSearch(false),200)} placeholder="Search students, teachers, rooms…" className="w-full pl-9 pr-4 h-9 bg-slate-50 border border-slate-200 rounded-full text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"/>
              {showSearch && query && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-soft overflow-hidden">
                  {searchResults.length? searchResults.map((r,i)=>(
                    <button key={i} onClick={()=>{navigate(r.link); setShowSearch(false)}} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex justify-between items-center">
                      <div className="text-[13px] font-medium text-slate-900">{r.label}</div>
                      <div className="text-[11px] text-slate-500">{r.sub}</div>
                    </button>
                  )): <div className="px-4 py-3 text-[13px] text-slate-500">No results</div>}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setShowNotif(!showNotif)} className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
              <Bell size={16} className="text-slate-700"/>
              {unread>0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
            </button>
            <button onClick={()=>navigate('/settings')} className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-[12px] font-semibold">A</button>
          </div>
          {showNotif && (
            <div className="absolute top-[64px] right-4 w-[360px] bg-white border border-slate-200 rounded-2xl shadow-soft overflow-hidden z-30">
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="text-[13px] font-semibold text-slate-900">Notifications</div>
                <button onClick={()=>setShowNotif(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
              </div>
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0,6).map(n=>(
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50">
                    <div className="text-[13px] text-slate-800 leading-snug">{n.message}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{navigate('/notifications'); setShowNotif(false)}} className="w-full py-3 text-[13px] font-medium text-blue-600 hover:bg-slate-50">View all →</button>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-[#f8fafc]">{children}</main>
      </div>
      {mobileOpen && <div onClick={()=>setMobileOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden"/>}
    </div>
  )
}
