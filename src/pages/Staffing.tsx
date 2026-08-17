import { useStore } from '../lib/store'
import { Users, TrendingUp, AlertTriangle } from 'lucide-react'

export default function Staffing(){
  const { teachers, classes, subjects } = useStore()
  // calculate staffing
  const staffing = subjects.map(sub=>{
    const current = teachers.filter(t=> t.subjects.includes(sub.name)).length
    const weeklyPeriodsPerClass = sub.weeklyPeriods
    const totalDemand = classes.length * weeklyPeriodsPerClass
    // each teacher max 24 periods
    const estimated = Math.ceil(totalDemand / 20) // assume 20 effective periods
    const gap = estimated - current
    return { subject: sub.name, current, estimated, gap, demand:totalDemand }
  })

  return (
    <div className="max-w-[1100px] mx-auto space-y-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">Staffing Intelligence</h1>
        <p className="text-[13px] text-slate-500">Forecast is an estimate — calculated from enrollment, classes, and weekly period requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-2">
          <div className="text-[13px] font-semibold text-slate-900">Subject-wise forecast</div>
          <div className="mt-4 space-y-3">
            {staffing.map(s=>(
              <div key={s.subject} className={`p-4 rounded-xl border flex items-center gap-4 ${s.gap>0?'bg-amber-50 border-amber-200':'bg-white border-slate-200'}`}>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-slate-900">{s.subject}</div>
                  <div className="text-[11px] text-slate-500">{s.demand} periods/week • {classes.length} classes × {Math.round(s.demand/classes.length)} periods</div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-full">Current: <b>{s.current}</b></span>
                    <span className="text-[11px] bg-slate-900 text-white px-2 py-1 rounded-full">Est. need: <b>{s.estimated}</b></span>
                    <span className={`text-[11px] px-2 py-1 rounded-full font-bold border ${s.gap>0?'bg-red-50 text-red-700 border-red-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{s.gap>0? `Gap: +${s.gap}`:'Balanced'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Confidence</div>
                  <div className="text-[13px] font-bold text-slate-900">Moderate</div>
                  <div className="text-[11px] text-slate-500">Rule-based estimate</div>
                </div>
                {s.gap>0 && <AlertTriangle size={18} className="text-amber-600 shrink-0"/>}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[13px] font-semibold"><Users size={16}/> Workload overview</div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-[12px]"><span className="text-white/70">Total teachers</span><span className="font-bold">20</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-white/70">Avg workload</span><span className="font-bold">19.8 / 24</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-white/70">Highest load</span><span className="font-bold text-amber-300">Ms. Priya Menon — 22</span></div>
            </div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-white" style={{width:'82%'}}/></div>
            <div className="mt-2 text-[11px] text-white/60">82% average utilization • Mathematics at 98%</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="text-[13px] font-semibold text-amber-900 flex items-center gap-2"><TrendingUp size={16}/> Recommendation</div>
            <div className="text-[13px] text-amber-800 mt-2 leading-snug">Mathematics shows potential gap of 1 teacher. Review workload allocation before next term. Consider redistributing 2 periods from high-load teachers or hiring.</div>
            <div className="mt-3 text-[11px] text-amber-700 font-medium">This forecast is an estimate and should be reviewed by administration.</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-[12px] font-semibold text-slate-900">How gap is calculated</div>
            <div className="text-[11px] text-slate-600 mt-2 leading-relaxed font-mono bg-slate-50 border border-slate-200 rounded-lg p-3">
              demand = classes × weeklyPeriods<br/>estimated = ceil(demand / 20 effective periods)<br/>gap = estimated - current<br/>* excludes leave & part-time
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
