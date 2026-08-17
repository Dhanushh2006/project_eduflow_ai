import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Shield, Zap, Database } from 'lucide-react'

export default function Login(){
  const nav = useNavigate()
  const [email, setEmail] = useState('admin@eduflow.ai')
  const [pass, setPass] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <div className="flex-1 hidden lg:flex flex-col justify-between p-10 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20"/>
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-slate-900 flex items-center justify-center font-bold">EF</div>
            <span className="font-semibold tracking-tight">EduFlow AI</span>
            <span className="text-[10px] tracking-[0.14em] bg-white/10 px-2 py-1 rounded-full">OS FOR SCHOOLS</span>
          </div>
          <div className="mt-20 max-w-[520px]">
            <h1 className="text-[42px] font-semibold leading-[0.95] tracking-tight">The AI Operating System for Smarter Schools</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">Turn paper-heavy, fragmented administration into one proactive, intelligent operational system. Digitize → Understand → Optimize → Act.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                {icon: Database, title:'Unified Data Layer', desc:'One source of truth for students, teachers, rooms & timetables'},
                {icon: Zap, title:'Smart Timetable Engine', desc:'Constraint-based solver with OR-Tools'},
                {icon: Shield, title:'Human-in-the-loop AI', desc:'Confidence-scored extraction with admin verification'},
                {icon: Sparkles, title:'Proactive Ops Center', desc:'Detects issues before administrators search for them'},
              ].map(c=>(
                <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <c.icon size={18} className="text-white/90"/>
                  <div className="mt-2 text-[13px] font-semibold">{c.title}</div>
                  <div className="text-[12px] text-white/60 leading-snug mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative text-[12px] text-white/50 flex items-center justify-between">
          <span>© 2024 EduFlow AI • Built for Round 2 Demo</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> System operational</span>
        </div>
      </div>
      <div className="w-full lg:w-[480px] bg-white flex flex-col justify-center p-8 lg:p-12">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">EF</div>
          <span className="font-semibold">EduFlow AI</span>
        </div>
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-slate-900">Welcome back</h2>
          <p className="text-[13px] text-slate-500 mt-1">Sign in to your school operations workspace.</p>
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <div className="text-[12px] font-semibold text-amber-900">Demo credentials</div>
          <div className="text-[12px] text-amber-800 font-mono mt-1">admin@eduflow.ai / demo1234</div>
          <div className="text-[11px] text-amber-700 mt-1">One click — no email verification required.</div>
        </div>
        <form onSubmit={e=>{
          e.preventDefault(); setLoading(true); setTimeout(()=>{ nav('/dashboard')}, 600)
        }} className="mt-6 space-y-4">
          <div>
            <label className="text-[12px] font-medium text-slate-700">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
          </div>
          <div>
            <label className="text-[12px] font-medium text-slate-700">Password</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="mt-1 w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
          </div>
          <button disabled={loading} className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
            {loading? 'Signing in…':'Sign in →'}
          </button>
          <button type="button" onClick={()=>nav('/dashboard')} className="w-full h-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium">Continue as Demo Admin</button>
        </form>
        <div className="mt-8 pt-6 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
          Protected by Supabase Auth • Row-level security • All data is demo-seeded and resets on refresh.
        </div>
      </div>
    </div>
  )
}
