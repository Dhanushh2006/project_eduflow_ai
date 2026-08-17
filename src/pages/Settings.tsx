import { useState } from 'react'
import { Building2, Calendar, Bell, Shield, Users, CreditCard, Save, Check, Clock, MapPin, Mail, Phone, UserCog, Lock, Eye, EyeOff } from 'lucide-react'

const tabs = [
  { id: 'school', label: 'School', icon: Building2 },
  { id: 'academic', label: 'Academic', icon: Calendar },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Plan', icon: CreditCard },
] as const

export default function Settings(){
  const [tab, setTab] = useState<typeof tabs[number]['id']>('school')
  const [saved, setSaved] = useState(false)
  const [schoolName, setSchoolName] = useState('Delhi Public School, Bengaluru')
  const [address, setAddress] = useState('12, Palm Avenue, Indiranagar, Bengaluru — 560038')
  const [email, setEmail] = useState('office@dpsblr.edu.in')
  const [phone, setPhone] = useState('+91 80 4123 4567')
  const [principal, setPrincipal] = useState('Dr. Anjali Rao')
  const [year, setYear] = useState('2024–2025')
  const [showPassword, setShowPassword] = useState(false)
  const [notif, setNotif] = useState({ conflicts: true, documents: true, attendance: true, staffing: false, weekly: true })

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000) }

  return (
    <div className="max-w-[1120px] mx-auto">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="text-[13px] text-slate-500 mt-1">Manage school details, academic calendar, members and preferences.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left nav */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-xl p-2 sticky top-6">
            <nav className="space-y-1">
              {tabs.map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-left transition-colors ${tab===t.id?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <t.icon size={15} strokeWidth={tab===t.id?2:1.8}/> {t.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-slate-100 px-3 pb-2">
              <div className="flex gap-3 items-center">
                <img src="https://i.pravatar.cc/100?img=33" className="w-8 h-8 rounded-full"/>
                <div>
                  <div className="text-[13px] font-medium text-slate-900 leading-none">Admin</div>
                  <div className="text-[11px] text-slate-500">admin@eduflow.ai</div>
                </div>
              </div>
              <div className="mt-3 text-[11px] leading-4 text-slate-500">Changes are audited. Last saved today 10:42 IST by Admin.</div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-9 space-y-4">
          {tab==='school' && (
            <>
              <div className="bg-white border border-slate-200 rounded-xl">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-slate-900">School profile</h2>
                  <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">ID: EF-BLR-2024 • CBSE 830456</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-20 h-20 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl">DPS</div>
                      <button className="mt-2 w-20 h-7 bg-white border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50">Change</button>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">School name</label>
                        <input value={schoolName} onChange={e=>setSchoolName(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-1"><MapPin size={10}/> Address</label>
                        <input value={address} onChange={e=>setAddress(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-1"><Mail size={10}/> Official email</label>
                        <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px]"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-1"><Phone size={10}/> Phone</label>
                        <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px]"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-1"><UserCog size={10}/> Principal</label>
                        <input value={principal} onChange={e=>setPrincipal(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px]"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Established</label>
                        <div className="mt-1.5 h-9 px-3 flex items-center bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700">1998 • Bengaluru</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-2">
                    <button className="h-8 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-medium">Cancel</button>
                    <button onClick={save} className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[13px] font-medium hover:bg-slate-800 inline-flex items-center gap-2"><Save size={14}/>{saved?'Saved':'Save changes'}{saved && <Check size={14} className="text-emerald-400"/>}</button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-slate-900">School code & affiliation</div>
                  <div className="text-[12px] text-slate-500">Used on reports, certificates and timetable headers.</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] tracking-wide font-semibold text-slate-500 uppercase">Affiliation No</div>
                  <div className="text-[13px] font-mono font-medium">830456</div>
                </div>
              </div>
            </>
          )}

          {tab==='academic' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="text-[14px] font-semibold text-slate-900">Academic year</h2>
                  <p className="text-[12px] text-slate-500">Timetable and attendance follow this calendar. Change requires confirmation.</p>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Current year</label>
                      <select value={year} onChange={e=>setYear(e.target.value)} className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px]">
                        <option>2024–2025</option>
                        <option>2025–2026</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Term 1</label>
                      <div className="mt-1.5 h-9 px-3 flex items-center bg-white border border-slate-200 rounded-lg text-[13px]"><Clock size={12} className="mr-2 text-slate-400"/> 3 Jun 2024 — 30 Sep 2024</div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Term 2</label>
                      <div className="mt-1.5 h-9 px-3 flex items-center bg-white border border-slate-200 rounded-lg text-[13px]"><Clock size={12} className="mr-2 text-slate-400"/> 7 Oct 2024 — 12 Apr 2025</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-xl p-4">
                      <div className="text-[12px] font-semibold text-slate-900">Weekly schedule</div>
                      <div className="mt-3 space-y-2 text-[13px]">
                        <div className="flex justify-between"><span className="text-slate-500">Working days</span><span className="font-medium">Monday — Friday</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Periods</span><span className="font-medium">6 per day • 45 min</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Break</span><span className="font-medium">After Period 3 • 25 min</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Assembly</span><span className="font-medium">Mon & Fri 08:30</span></div>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4">
                      <div className="text-[12px] font-semibold text-slate-900">Holidays (upcoming)</div>
                      <div className="mt-3 space-y-1.5 text-[13px]">
                        <div className="flex justify-between"><span>Independence Day</span><span className="text-slate-500">15 Aug</span></div>
                        <div className="flex justify-between"><span>Teacher’s Day</span><span className="text-slate-500">05 Sep</span></div>
                        <div className="flex justify-between"><span>Dussehra Break</span><span className="text-slate-500">02 — 08 Oct</span></div>
                        <div className="text-[11px] text-slate-500 mt-2">Full calendar is managed in Academic → Holidays.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab==='members' && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-slate-900">Members</h2>
                <button className="h-8 px-3 bg-slate-900 text-white rounded-lg text-[13px] font-medium">Invite member</button>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name:'Admin', email:'admin@eduflow.ai', role:'Owner', img:33 },
                  { name:'Priya Menon', email:'priya.m@dpsblr.edu.in', role:'Teacher', img:16 },
                  { name:'Vikram Singh', email:'vikram.s@dpsblr.edu.in', role:'Staff', img:15 },
                  { name:'Kavita Nair', email:'kavita.n@dpsblr.edu.in', role:'Teacher', img:26 },
                ].map(m=>(
                  <div key={m.email} className="px-6 py-4 flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/100?img=${m.img}`} className="w-9 h-9 rounded-full"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-slate-900">{m.name}</div>
                      <div className="text-[12px] text-slate-500">{m.email}</div>
                    </div>
                    <span className="text-[11px] font-medium bg-white border border-slate-200 px-2.5 py-1 rounded-full">{m.role}</span>
                    <button className="text-[11px] font-medium text-slate-500 hover:text-slate-700">Manage</button>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">Roles are enforced server-side. Owners can manage billing and academic year.</div>
            </div>
          )}

          {tab==='notifications' && (
            <div className="bg-white border border-slate-200 rounded-xl">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-[14px] font-semibold text-slate-900">Notifications</h2>
                <p className="text-[12px] text-slate-500">Choose what you’re notified about. High-severity alerts are always delivered.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { key:'conflicts', title:'Timetable conflicts', desc:'Teacher double-booking, room over-capacity' },
                  { key:'documents', title:'Document reviews', desc:'New admission forms needing validation' },
                  { key:'attendance', title:'Attendance anomalies', desc:'Class 8B 84% vs 95% baseline' },
                  { key:'staffing', title:'Staffing forecasts', desc:'Projected subject gaps for next term' },
                  { key:'weekly', title:'Weekly digest', desc:'Monday 08:30 — summary of health, alerts, attendance' },
                ].map(item=>(
                  <label key={item.key} className="px-6 py-4 flex items-start gap-4 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" checked={(notif as any)[item.key]} onChange={e=>setNotif(s=>({...s, [item.key]: e.target.checked}))} className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"/>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-slate-900">{item.title}</div>
                      <div className="text-[12px] text-slate-500">{item.desc}</div>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-full border ${(notif as any)[item.key]?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-500 border-slate-200'}`}>{(notif as any)[item.key] ? 'On':'Off'}</span>
                  </label>
                ))}
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button onClick={save} className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[13px] font-medium inline-flex items-center gap-2"><Save size={14}/>{saved?'Saved':'Save preferences'}{saved && <Check size={14}/>}</button>
              </div>
            </div>
          )}

          {tab==='security' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl">
                <div className="px-6 py-4 border-b border-slate-100"><h2 className="text-[14px] font-semibold text-slate-900">Password</h2></div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">Current password</label>
                    <div className="mt-1.5 relative">
                      <input type={showPassword?'text':'password'} defaultValue="demo1234" className="w-full h-9 pr-9 pl-3 bg-white border border-slate-200 rounded-lg text-[13px]"/>
                      <button onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600">{showPassword?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-wide text-slate-600 uppercase">New password</label>
                    <input type="password" placeholder="••••••••" className="mt-1.5 w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px]"/>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button className="h-8 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-medium">Update password</button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-[13px] font-semibold text-slate-900 flex items-center gap-2"><Lock size={14}/> Two-factor authentication</h3>
                <p className="text-[12px] text-slate-500 mt-1">Add an extra layer of security. Recommended for Owners.</p>
                <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[13px] font-medium">Authenticator app</div>
                  <span className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-full">Not enabled</span>
                </div>
                <button className="mt-3 h-8 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-medium">Enable 2FA</button>
              </div>
            </div>
          )}

          {tab==='billing' && (
            <div className="bg-white border border-slate-200 rounded-xl">
              <div className="px-6 py-4 border-b border-slate-100"><h2 className="text-[14px] font-semibold text-slate-900">Plan & billing</h2></div>
              <div className="p-6">
                <div className="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"><CreditCard size={18}/></div>
                  <div>
                    <div className="text-[13px] font-semibold">EduFlow Pro • Bengaluru</div>
                    <div className="text-[12px] text-white/70">Up to 1,200 students • Unlimited timetables • Priority support</div>
                  </div>
                  <span className="ml-auto text-[11px] bg-white text-slate-900 px-2.5 py-1 rounded-full font-medium">Active</span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px]">
                  <div className="border border-slate-200 rounded-xl p-4"><div className="text-slate-500">Students</div><div className="text-[20px] font-semibold">122 / 1,200</div></div>
                  <div className="border border-slate-200 rounded-xl p-4"><div className="text-slate-500">Members</div><div className="text-[20px] font-semibold">4 / 20</div></div>
                  <div className="border border-slate-200 rounded-xl p-4"><div className="text-slate-500">Next invoice</div><div className="font-medium">17 Sep 2026 • ₹4,999</div></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
