import { useState } from 'react'
import { useStore } from '../lib/store'
import { Search, Plus, Edit } from 'lucide-react'

export default function Teachers(){
  const { teachers } = useStore()
  const [q,setQ]=useState('')
  const filtered = teachers.filter(t=> t.name.toLowerCase().includes(q.toLowerCase()) || t.department.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="max-w-[1280px] mx-auto space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">Teachers</h1>
          <p className="text-[13px] text-slate-500">{teachers.length} active • Availability feeds directly into timetable engine</p>
        </div>
        <button className="h-9 px-4 bg-slate-900 text-white rounded-full text-[13px] font-semibold flex items-center gap-2"><Plus size={14}/> Add teacher</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
        <div className="relative flex-1 max-w-[360px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search teachers…" className="w-full pl-9 pr-3 h-9 bg-slate-50 border border-slate-200 rounded-full text-[13px]"/>
        </div>
        <span className="text-[12px] text-slate-500">{filtered.length} teachers</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0,9).map(t=>(
          <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex gap-3">
              <img src={`https://i.pravatar.cc/100?img=${(parseInt(t.id.slice(1))*7)%70 +1}`} className="w-10 h-10 rounded-full object-cover"/>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-slate-900 truncate">{t.name}</div>
                <div className="text-[12px] text-slate-500">{t.department} • {t.subjects.join(', ')}</div>
              </div>
              <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center"><Edit size={14}/></button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 rounded-xl py-2"><div className="text-[11px] text-slate-500">Workload</div><div className="text-[13px] font-bold">{t.workload}/24</div></div>
              <div className="bg-slate-50 rounded-xl py-2"><div className="text-[11px] text-slate-500">Available</div><div className="text-[13px] font-bold">{t.availablePeriods.length}/30</div></div>
              <div className={`rounded-xl py-2 border ${t.workload>22?'bg-amber-50 border-amber-200 text-amber-700':'bg-emerald-50 border-emerald-200 text-emerald-700'}`}><div className="text-[11px]">Status</div><div className="text-[12px] font-bold">{t.workload>22?'High':'Balanced'}</div></div>
            </div>
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900" style={{width:`${t.workload/24*100}%`}}/></div>
            <div className="mt-3 flex flex-wrap gap-1">
              {t.subjects.map(s=> <span key={s} className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-full">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
