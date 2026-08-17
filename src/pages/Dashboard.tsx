import { useStore } from '../lib/store'
import { ArrowRight, AlertTriangle, FileText, Users, GraduationCap, Building2, CheckCircle2, Clock, TrendingDown, TrendingUp, MoreHorizontal, ShieldCheck, Activity, CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const { students, teachers, classes, attendanceToday, alerts, health, pendingReviews, conflicts } = useStore()
  const nav = useNavigate()

  const kpis = [
    { label:'Students', value: students.filter(s=>s.status==='active').length.toString(), sub:'6 classes • avg 40', delta:'+3 this week', up:true },
    { label:'Teachers', value: teachers.filter(t=>t.status==='active').length.toString(), sub:'8 depts • 2 on leave', delta:'Stable', up:null },
    { label:'Classes', value: classes.length.toString(), sub:'Capacity 88% avg', delta:'1 at limit', up:false },
    { label:'Attendance', value: `${attendanceToday}%`, sub:'102 / 122 present', delta: attendanceToday<90? '-11 vs baseline' : 'On track', up: attendanceToday>=90, danger: attendanceToday<90 },
    { label:'Open alerts', value: alerts.length.toString(), sub:`${alerts.filter(a=>a.severity==='HIGH').length} high • ${alerts.filter(a=>a.severity==='MEDIUM').length} medium`, delta:'Needs review', up:false, danger: true },
    { label:'Pending review', value: pendingReviews.toString(), sub:'1 document • Riya Sharma', delta: pendingReviews? 'Action required' : 'All clear', up:false },
  ]

  return (
    <div className="max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div>
          <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Workspace • DPS Bengaluru • EF-BLR-2024</div>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">Good morning, Admin.</h1>
          <p className="text-[13px] leading-5 text-slate-500 mt-1.5 max-w-[560px]">Here is what needs your attention today. <span className="text-slate-900 font-medium">{alerts.length} issues</span> are open across timetable, documents and attendance. Last sync <span className="font-mono text-[12px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">10:42 IST</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>nav('/operations')} className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-[12.5px] font-medium text-slate-700 hover:bg-slate-50">View operations</button>
          <button onClick={()=>nav('/documents')} className="h-8 px-3.5 bg-slate-900 text-white rounded-lg text-[12.5px] font-medium hover:bg-slate-800 inline-flex items-center gap-1.5">Review queue <ArrowRight size={13}/></button>
        </div>
      </div>

      {/* KPIs - compact, tabular, no big icons */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map(k=>(
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{k.label}</div>
              {k.danger ? <span className="w-1.5 h-1.5 bg-red-500 rounded-full"/> : k.up===true ? <TrendingUp size={12} className="text-emerald-600"/> : k.up===false ? <TrendingDown size={12} className="text-amber-600"/> : null}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-[22px] font-semibold tracking-tight text-slate-900 tabular-nums leading-none">{k.value}</div>
              {k.label==='Attendance' && <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded border ${k.danger?'bg-red-50 text-red-700 border-red-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{k.delta}</span>}
            </div>
            <div className="text-[11.5px] text-slate-500 mt-1 truncate">{k.sub}</div>
            {k.label!=='Attendance' && <div className={`text-[11px] mt-1.5 ${k.danger?'text-red-600 font-medium':'text-slate-500'}`}>{k.delta}</div>}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Operations Health */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-slate-900 flex items-center gap-2"><Activity size={14} className="text-slate-500"/> Operations health</h2>
            <span className="text-[11px] font-medium tabular-nums bg-slate-900 text-white px-2 py-1 rounded-md">{health.score} / 100</span>
          </div>
          <div className="p-4">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-[72px] h-[72px] rounded-full border-[6px] border-slate-100 relative flex items-center justify-center" style={{borderTopColor: health.score>80?'#0f172a': health.score>60?'#d97706':'#dc2626', transform:'rotate(-90deg)'}}>
                  <div className="transform rotate-90 text-center">
                    <div className="text-[18px] font-semibold tabular-nums leading-none text-slate-900">{health.score}</div>
                    <div className="text-[9px] tracking-widest font-semibold text-slate-500">HEALTH</div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-center font-medium flex items-center justify-center gap-1">
                  {health.score>80 ? <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/> : <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"/>}
                  <span className="text-slate-700">{health.score>80?'Stable':'Needs attention'}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2.5">
                {Object.entries(health.breakdown).map(([k,v])=>(
                  <div key={k}>
                    <div className="flex justify-between text-[11.5px]"><span className="text-slate-600">{k}</span><span className="font-medium tabular-nums text-slate-900">{v}</span></div>
                    <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900" style={{width:`${v}%`}}/></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5">
              <div className="text-[12px] leading-5 text-slate-700">{health.explanation}</div>
            </div>
          </div>
          <div className="mt-auto px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 flex items-center gap-1.5"><ShieldCheck size={12}/> Calculated from live DB state</span>
            <button onClick={()=>nav('/operations')} className="text-[12px] font-medium text-slate-900 hover:underline inline-flex items-center gap-1">Breakdown <ArrowRight size={12}/></button>
          </div>
        </div>

        {/* Operations Center - inbox style */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
            <h2 className="text-[13px] font-semibold text-slate-900">Operations queue</h2>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-slate-500">{alerts.length} open • sorted by severity</span>
              <span className="text-[11px] font-medium bg-slate-900 text-white px-2 py-1 rounded-md">{alerts.filter(a=>a.severity==='HIGH').length} high</span>
              <button className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center"><MoreHorizontal size={12}/></button>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map(a=>(
              <div key={a.id} className="group flex gap-3 px-4 py-3 hover:bg-slate-50">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.severity==='HIGH'?'bg-red-500':a.severity==='MEDIUM'?'bg-amber-500':'bg-slate-400'}`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded border ${a.severity==='HIGH'?'bg-white text-red-700 border-red-200':a.severity==='MEDIUM'?'bg-white text-amber-700 border-amber-200':'bg-slate-50 text-slate-600 border-slate-200'}`}>{a.severity}</span>
                    <span className="text-[13px] font-medium text-slate-900 truncate">{a.title}</span>
                    <span className="text-[11px] text-slate-500 inline-flex items-center gap-1 ml-auto"><Clock size={11}/>{a.timestamp}</span>
                  </div>
                  <div className="text-[12.5px] leading-5 text-slate-600 mt-1 line-clamp-2">{a.description}</div>
                  <div className="mt-2 text-[12px] leading-5 text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"><span className="font-medium text-slate-900">Next step:</span> {a.recommendation}</div>
                </div>
                <div className="hidden md:flex flex-col gap-1.5 shrink-0">
                  <button onClick={()=>nav(a.link)} className="h-7 px-3 bg-slate-900 text-white rounded-lg text-[12px] font-medium hover:bg-slate-800">{a.actionLabel}</button>
                  <button onClick={()=>nav(a.link)} className="h-7 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-medium hover:bg-slate-50">Details</button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Human-in-the-loop — no action is applied without admin approval.</span>
            <button onClick={()=>nav('/operations')} className="text-[11px] font-medium text-slate-700 hover:text-slate-900">View all →</button>
          </div>
        </div>
      </div>

      {/* Bottom row - dense, muted */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-slate-900 flex items-center gap-2"><CalendarDays size={14} className="text-slate-500"/> Timetable</h3>
            <span className={`text-[11px] font-medium px-2 py-1 rounded-full border ${conflicts.length?'bg-amber-50 text-amber-700 border-amber-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{conflicts.length? `${conflicts.length} conflict`:'No conflicts'}</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[22px] font-semibold tabular-nums tracking-tight text-slate-900">{conflicts.length? '84':'93'}</span>
            <span className="text-[11px] font-medium text-slate-500">/ 100 quality</span>
          </div>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900" style={{width: conflicts.length?'84%':'93%'}}/></div>
          <p className="mt-2 text-[12px] leading-5 text-slate-600">
            {conflicts.length? 'MON P3 double-booking lowers score. Resolution restores 93.' : 'All hard constraints pass. Soft optimization balanced.'}
          </p>
          <button onClick={()=>nav('/timetable')} className="mt-3 w-full h-8 bg-white border border-slate-200 rounded-lg text-[12.5px] font-medium hover:bg-slate-50">Open timetable</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="text-[13px] font-semibold text-slate-900 flex items-center gap-2"><FileText size={14} className="text-slate-500"/> Document queue</h3>
          <div className="mt-3 flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700"><FileText size={14}/></div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium text-slate-900 truncate">Riya Sharma — Admission</div>
              <div className="text-[11px] text-slate-500">1 field flagged • 71% phone</div>
            </div>
            <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-1 rounded">Review</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white border border-slate-200 rounded-lg py-2"><div className="text-[15px] font-semibold tabular-nums">8</div><div className="text-[10px] tracking-wide font-medium text-slate-500 uppercase">Fields</div></div>
            <div className="bg-white border border-slate-200 rounded-lg py-2"><div className="text-[15px] font-semibold tabular-nums text-emerald-700">7</div><div className="text-[10px] tracking-wide font-medium text-slate-500 uppercase">High conf</div></div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg py-2"><div className="text-[15px] font-semibold tabular-nums text-amber-700">1</div><div className="text-[10px] tracking-wide font-medium text-amber-700 uppercase">Flagged</div></div>
          </div>
          <button onClick={()=>nav('/documents')} className="mt-3 w-full h-8 bg-white border border-slate-200 rounded-lg text-[12.5px] font-medium hover:bg-slate-50">Review & approve</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="text-[13px] font-semibold text-slate-900 flex items-center gap-2"><Users size={14} className="text-slate-500"/> Attendance</h3>
          <div className="mt-3 flex items-center gap-3">
            <div className="text-[22px] font-semibold tabular-nums tracking-tight text-slate-900">{attendanceToday}%</div>
            <div className="text-[11px] leading-3 text-slate-500">Today<br/>-11 vs 95% baseline</div>
            <span className={`ml-auto text-[11px] font-medium px-2 py-1 rounded-full border ${attendanceToday<90?'bg-red-50 text-red-700 border-red-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{attendanceToday<90?'Anomaly':'Normal'}</span>
          </div>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${attendanceToday<90?'bg-red-500':'bg-slate-900'}`} style={{width:`${attendanceToday}%`}}/></div>
          <div className="mt-2 text-[12px] leading-5 text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">Class <span className="font-medium text-slate-900">8B</span> at 84% — 7 absent vs 2 avg. Reproducible from stored records.</div>
          <button onClick={()=>nav('/attendance')} className="mt-3 w-full h-8 bg-white border border-slate-200 rounded-lg text-[12.5px] font-medium hover:bg-slate-50">View attendance</button>
        </div>
      </div>

      {/* Footer hint - not a loud black banner */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="text-[12px] leading-5 text-slate-600"><span className="font-medium text-slate-900">Demo flow:</span> Data enters → AI understands → Validated → Optimized → Flagged → Approved → State changes. Follow the queue top-to-bottom.</div>
        <div className="flex gap-2">
          <button onClick={()=>nav('/documents')} className="h-7 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-medium hover:bg-slate-50">Start with documents</button>
          <button onClick={()=>nav('/timetable')} className="h-7 px-3 bg-slate-900 text-white rounded-lg text-[12px] font-medium hover:bg-slate-800">Generate timetable</button>
        </div>
      </div>
    </div>
  )
}
