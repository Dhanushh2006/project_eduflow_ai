import { useStore } from '../lib/store'
import { Building2, BookOpen, DoorOpen } from 'lucide-react'

export function Classes(){
  const { classes, students } = useStore()
  return (
    <div className="max-w-[1100px] mx-auto space-y-4">
      <h1 className="text-[22px] font-semibold text-slate-900">Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map(c=>{
          const count = students.filter(s=>s.className===c.name).length
          return (
            <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm"><Building2 size={18}/></div>
                <div>
                  <div className="text-[16px] font-semibold text-slate-900">{c.name}</div>
                  <div className="text-[12px] text-slate-500">Section {c.section} • Capacity {c.capacity}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 text-center"><div className="text-[20px] font-bold text-slate-900">{count}</div><div className="text-[11px] text-slate-500">students</div></div>
                <div className={`rounded-xl p-3 text-center border ${count>c.capacity?'bg-red-50 border-red-200 text-red-700':'bg-emerald-50 border-emerald-200 text-emerald-700'}`}><div className="text-[20px] font-bold">{c.capacity}</div><div className="text-[11px]">capacity {count>c.capacity? '• Over by '+(count-c.capacity): '• OK'}</div></div>
              </div>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900" style={{width:`${Math.min(100, count/c.capacity*100)}%`}}/></div>
              <div className="mt-3 flex flex-wrap gap-1">{c.requiredSubjects.slice(0,4).map(s=> <span key={s} className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-full">{s}</span>)}<span className="text-[11px] text-slate-500">+{c.requiredSubjects.length-4} more</span></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Subjects(){
  const { subjects } = useStore()
  return (
    <div className="max-w-[1100px] mx-auto space-y-4">
      <h1 className="text-[22px] font-semibold text-slate-900">Subjects</h1>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
            <tr><th className="text-left p-3">Subject</th><th className="text-left p-3">Code</th><th className="text-left p-3">Weekly periods</th><th className="text-left p-3">Lab</th><th className="text-left p-3">Department</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subjects.map(s=>(
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-medium flex items-center gap-2"><BookOpen size={14} className="text-slate-400"/>{s.name}</td>
                <td className="p-3 font-mono text-[12px]">{s.code}</td>
                <td className="p-3">{s.weeklyPeriods}</td>
                <td className="p-3">{s.labRequired? <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[11px] font-semibold">Lab required</span>: <span className="text-slate-400">—</span>}</td>
                <td className="p-3 text-slate-600">{s.preferredDepartment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Rooms(){
  const { rooms, classes } = useStore()
  const getUtil = (r: any)=>{
    if(r.name==='Room 204') return 120
    if(r.name==='Room 201') return 62
    return 75 + Math.round(Math.random()*15)
  }
  return (
    <div className="max-w-[1100px] mx-auto space-y-4">
      <h1 className="text-[22px] font-semibold text-slate-900">Rooms</h1>
      <p className="text-[13px] text-slate-500">Capacity participates in scheduling constraints • {rooms.length} rooms</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map(r=>{
          const util = getUtil(r)
          const over = util>100
          return (
            <div key={r.id} className={`bg-white border rounded-2xl p-5 ${over?'border-red-200':'border-slate-200'}`}>
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.type.includes('Lab')?'bg-amber-50 text-amber-700 border border-amber-200':'bg-slate-900 text-white'}`}><DoorOpen size={18}/></div>
                <div>
                  <div className="text-[14px] font-semibold text-slate-900">{r.name}</div>
                  <div className="text-[12px] text-slate-500">{r.type} • Capacity {r.capacity} • {r.availability}</div>
                </div>
                <span className={`ml-auto text-[11px] font-bold px-2 py-1 rounded-full border ${over?'bg-red-50 text-red-700 border-red-200': util>90?'bg-amber-50 text-amber-700 border-amber-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{util}% util</span>
              </div>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${over?'bg-red-500': util>90?'bg-amber-500':'bg-slate-900'}`} style={{width:`${Math.min(100, util)}%`}}/></div>
              {over && <div className="mt-2 text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">Capacity conflict: 42 students assigned to 35-capacity room. Rebalance recommended.</div>}
              <div className="mt-3 flex flex-wrap gap-1">{r.equipment.map(e=> <span key={e} className="text-[11px] bg-slate-50 border border-slate-200 px-2 py-1 rounded-full">{e}</span>)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Operations(){
  const { health, alerts } = useStore()
  return (
    <div className="max-w-[1100px] mx-auto space-y-4">
      <h1 className="text-[22px] font-semibold text-slate-900">Operations</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{background:`conic-gradient(#0f172a ${health.score}%, #e2e8f0 0)`}}><span className="w-14 h-14 bg-white text-slate-900 rounded-full flex items-center justify-center">{health.score}</span></div>
          <div>
            <div className="text-[16px] font-semibold text-slate-900">School Operations Health {health.score}/100</div>
            <div className="text-[13px] text-slate-600 mt-1 max-w-[640px]">{health.explanation}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-3">
          {Object.entries(health.breakdown).map(([k,v])=>(
            <div key={k} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
              <div className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{k}</div>
              <div className="text-[20px] font-bold text-slate-900 mt-1">{v}</div>
              <div className="h-1.5 bg-white rounded-full mt-2 overflow-hidden"><div className="h-full bg-slate-900" style={{width:`${v}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="text-[13px] font-semibold text-slate-900">Live operational issues</div>
        <div className="mt-3 space-y-2">
          {alerts.map(a=>(
            <div key={a.id} className="flex gap-3 p-3 border border-slate-200 rounded-xl">
              <span className={`w-2 h-2 mt-1.5 rounded-full ${a.severity==='HIGH'?'bg-red-500':a.severity==='MEDIUM'?'bg-amber-500':'bg-slate-400'}`}/>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">{a.title}</div>
                <div className="text-[12px] text-slate-600">{a.description}</div>
                <div className="text-[11px] text-slate-500 mt-1">Recommendation: {a.recommendation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
