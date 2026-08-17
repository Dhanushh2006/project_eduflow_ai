import { useStore } from '../lib/store'
import { Bell, CheckCheck, Filter, Clock, AlertTriangle, FileText, CalendarDays, Users, Building2, Search, MoreHorizontal, Dot, Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notifications(){
  const { notifications, markNotificationRead } = useStore()
  const nav = useNavigate()
  const [filter, setFilter] = useState<'all'|'unread'>('all')
  const [q, setQ] = useState('')
  const unreadCount = notifications.filter(n=>!n.read).length
  const filtered = notifications.filter(n=>{
    if(filter==='unread' && n.read) return false
    if(q && !n.message.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const getIcon = (msg:string)=>{
    if(msg.includes('document')) return FileText
    if(msg.includes('timetable') || msg.includes('conflict')) return CalendarDays
    if(msg.includes('attendance')) return Users
    if(msg.includes('staffing')) return Building2
    if(msg.includes('Room')) return Building2
    return Bell
  }

  const markAll = ()=>{
    notifications.forEach(n=> markNotificationRead(n.id))
  }

  return (
    <div className="max-w-[1120px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase flex items-center gap-2"><Bell size={12}/> Inbox • Notifications</div>
          <h1 className="mt-1 text-[20px] font-semibold tracking-tight text-slate-900">Notifications</h1>
          <p className="text-[13px] text-slate-500 mt-1">Operational alerts from timetable, documents, attendance and staffing. Grouped by time, linked to action.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex h-8 items-center px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700">{unreadCount} unread • {notifications.length} total</span>
          <button onClick={markAll} className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-medium hover:bg-slate-50 inline-flex items-center gap-1.5"><CheckCheck size={14}/> Mark all read</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Filters */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sticky top-[72px]">
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search notifications…" className="w-full pl-8 pr-3 h-8 bg-slate-50 border border-slate-200 rounded-lg text-[12.5px] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"/>
              </div>
            </div>
            <div className="p-2 space-y-1">
              <button onClick={()=>setFilter('all')} className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium flex items-center justify-between ${filter==='all'?'bg-slate-900 text-white':'hover:bg-slate-50 text-slate-700'}`}>
                <span className="flex items-center gap-2"><Filter size={14}/> All</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${filter==='all'?'bg-white/20 text-white':'bg-slate-100 text-slate-600'}`}>{notifications.length}</span>
              </button>
              <button onClick={()=>setFilter('unread')} className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium flex items-center justify-between ${filter==='unread'?'bg-slate-900 text-white':'hover:bg-slate-50 text-slate-700'}`}>
                <span className="flex items-center gap-2"><Dot size={18} className={filter==='unread'?'text-white':'text-blue-600'}/> Unread</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${filter==='unread'?'bg-white/20 text-white':'bg-blue-50 text-blue-700 border border-blue-100'}`}>{unreadCount}</span>
              </button>
              <div className="pt-2 mt-2 border-t border-slate-100 space-y-1 text-[12px]">
                <div className="px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">Types</div>
                {[
                  { label:'Timetable', count:1 },
                  { label:'Documents', count:1 },
                  { label:'Attendance', count:1 },
                  { label:'Staffing', count:1 },
                  { label:'Rooms', count:1 },
                ].map(t=>(
                  <div key={t.label} className="px-3 py-1.5 flex justify-between text-slate-600"><span>{t.label}</span><span className="text-slate-500 tabular-nums">{t.count}</span></div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 px-3 py-2 bg-slate-50 rounded-lg">
                <div className="text-[11px] font-medium text-slate-700 flex items-center gap-1.5"><Clock size={12}/> Digest</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">Daily summary at 08:30 IST. Instant for HIGH severity.</div>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-9">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{filtered.length} notifications • Most recent first</div>
              <span className="text-[11px] text-slate-500 hidden md:inline">Click to mark read • Action opens workflow</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filtered.map(n=>{
                const Icon = getIcon(n.message)
                return (
                  <div key={n.id} onClick={()=> markNotificationRead(n.id)} className={`group flex gap-3 px-4 py-3.5 hover:bg-slate-50 cursor-pointer relative ${!n.read ? 'bg-white' : 'bg-white'}`}>
                    {!n.read && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-600"/>}
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${!n.read ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                      <Icon size={14}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] leading-5 text-slate-900 pr-6">{n.message}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1 text-slate-500"><Clock size={11}/>{n.time}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">{n.link}</span>
                        {!n.read && <span className="ml-1 inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">● Unread</span>}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 shrink-0 self-start">
                      <button onClick={(e)=>{e.stopPropagation(); nav(n.link)}} className="h-7 px-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50 inline-flex items-center gap-1"><Eye size={12}/> Open</button>
                      <button onClick={(e)=>{e.stopPropagation(); markNotificationRead(n.id)}} className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-500"><CheckCheck size={12}/></button>
                    </div>
                  </div>
                )
              })}
              {filtered.length===0 && (
                <div className="px-6 py-16 text-center">
                  <div className="w-10 h-10 mx-auto bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400"><Bell size={16}/></div>
                  <div className="mt-3 text-[13px] font-medium text-slate-900">No notifications</div>
                  <div className="text-[12px] text-slate-500">Operations are clear. No immediate action is required.</div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Retention 30 days • Audited • RLS scoped to school</span>
              <button className="text-[12px] font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1">View audit log <MoreHorizontal size={12}/></button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
            <AlertTriangle size={12} className="text-amber-600"/>
            <span>Pro tip: HIGH alerts also appear in <button onClick={()=>nav('/dashboard')} className="underline font-medium text-slate-700">Operations queue</button> with recommended resolution.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
