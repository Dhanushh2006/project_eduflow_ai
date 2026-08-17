import { useState } from 'react'
import { useStore, DAYS_CONST, PERIODS_CONST } from '../lib/store'
import { AlertTriangle, Check, Info, Filter, Clock, ShieldCheck, ArrowRight, Settings2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Timetable(){
  const { timetable, conflicts, generateTimetable, classes } = useStore()
  const [filterClass, setFilterClass] = useState('8B')
  const [generating, setGenerating] = useState(false)
  const nav = useNavigate()
  const filtered = timetable.filter(t=> t.className===filterClass)
  const hasConflict = conflicts.some(c=>c.type==='Teacher Conflict')
  const score = hasConflict? 84 : 93

  const handleGenerate = ()=>{
    setGenerating(true)
    setTimeout(()=>{ generateTimetable(); setGenerating(false)}, 700)
  }

  const getCell = (day:string, period:number)=> filtered.find(e=> e.day===day && e.period===period)

  return (
    <div className="max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Timetable Engine • OR-Tools CP-SAT</div>
          <h1 className="mt-1 text-[20px] font-semibold tracking-tight text-slate-900">Timetable</h1>
          <p className="text-[12.5px] text-slate-500 mt-1">Configure constraints → Generate → Validate → Explain • Hard constraints block, soft constraints score</p>
        </div>
        <button onClick={handleGenerate} disabled={generating} className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[12.5px] font-medium hover:bg-slate-800 disabled:opacity-60 inline-flex items-center gap-2">
          {generating? <><Clock size={13} className="animate-spin"/> Generating…</> : <>Generate timetable</>}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Config */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <Settings2 size={13} className="text-slate-500"/>
              <h2 className="text-[12px] font-semibold tracking-wide text-slate-700 uppercase">Configuration</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5"><div className="text-[11px] tracking-wide font-medium text-slate-500 uppercase">Days</div><div className="font-medium text-slate-900">Mon — Fri</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5"><div className="text-[11px] tracking-wide font-medium text-slate-500 uppercase">Periods</div><div className="font-medium text-slate-900">6 • Break after 3</div></div>
                <div className="bg-white border border-slate-200 rounded-lg p-2.5"><div className="text-slate-500">Classes</div><div className="font-medium">6</div><div className="text-[11px] text-slate-500">8A — 10B</div></div>
                <div className="bg-white border border-slate-200 rounded-lg p-2.5"><div className="text-slate-500">Teachers</div><div className="font-medium">20 active</div><div className="text-[11px] text-slate-500">8 depts</div></div>
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 col-span-2"><div className="text-slate-500">Rooms</div><div className="font-medium">10 • 3 labs • 1 hall</div></div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-semibold tracking-wide text-slate-700 uppercase flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-600"/> Hard constraints</div>
                <div className="mt-2 space-y-1">
                  {[
                    'Teacher single-assignment per period',
                    'Class single-assignment per period',
                    'Room single-assignment per period',
                    'Capacity ≥ class strength',
                    'Respect teacher unavailability',
                    'Lab subjects → lab rooms',
                    'Weekly periods satisfied',
                    'Fixed slots locked',
                  ].map(v=>(
                    <div key={v} className="flex gap-2 text-[11.5px] leading-4 text-slate-700"><Check size={11} className="text-emerald-600 mt-0.5 shrink-0"/>{v}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                <div className="text-[11px] font-semibold tracking-wide text-slate-700 uppercase">Soft optimization</div>
                <div className="mt-1 text-[11.5px] leading-4 text-slate-600">Balances distribution, avoids back-to-back load, prefers teacher dept., evens room use. Scored 0–100.</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[12px] font-semibold text-slate-900">Validation</div>
            <div className="mt-3 space-y-1.5">
              {[
                { ok: !hasConflict, label:'Teacher double-booking'},
                { ok: !hasConflict, label:'Room capacity (8B 42 → 35)'},
                { ok: true, label:'Lab assignments'},
                { ok: true, label:'Weekly periods'},
              ].map((r,i)=>(
                <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11.5px] ${r.ok?'bg-white border-slate-200 text-slate-700':'bg-red-50 border-red-200 text-red-700'}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${r.ok?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-red-500 text-white'}`}>{r.ok?'✓':'!'}</span>
                  {r.label}
                  <span className="ml-auto text-[11px]">{r.ok?'Pass':'Fail'}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>nav('/conflicts')} className="mt-3 w-full h-7 bg-white border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50">Open Conflict Center →</button>
          </div>
        </div>

        {/* Grid */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-900">Schedule</span>
                <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                  {classes.map(c=>(
                    <button key={c.name} onClick={()=>setFilterClass(c.name)} className={`px-2.5 py-1 text-[11px] font-medium ${filterClass===c.name?'bg-slate-900 text-white':'bg-white text-slate-600 hover:bg-slate-50'}`}>{c.name}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex items-center gap-2 text-[11px] text-slate-500">Quality</span>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
                  <span className="text-[12px] font-semibold tabular-nums text-slate-900">{score}</span>
                  <span className="text-[11px] text-slate-500">/ 100</span>
                  <span className="w-20 h-1.5 bg-white border border-slate-200 rounded-full overflow-hidden hidden md:block"><span className={`block h-full ${hasConflict?'bg-amber-500':'bg-slate-900'}`} style={{width:`${score}%`}}/></span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${hasConflict?'bg-amber-50 text-amber-700 border-amber-200':'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{hasConflict?'Needs fix':'Optimal'}</span>
                </div>
                <button className="h-7 px-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-medium inline-flex items-center gap-1"><Filter size={12}/> Teacher</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-3 py-2 text-[11px] font-semibold tracking-wide text-slate-500 uppercase w-[76px]">Period</th>
                    {DAYS_CONST.map(d=> <th key={d} className="px-2 py-2 text-center text-[11px] font-semibold tracking-wide text-slate-600 uppercase border-l border-slate-200">{d}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PERIODS_CONST.map(p=>(
                    <tr key={p} className={p===3?'bg-amber-50/30':''}>
                      <td className="px-3 py-2 border-r border-slate-200 bg-slate-50/70 align-top">
                        <div className="text-[11px] font-semibold text-slate-700">P{p}</div>
                        <div className="text-[10px] tabular-nums text-slate-500">{p<=3? `${8+p}:00` : `${9+p}:30`}</div>
                        {p===3 && <div className="mt-1 text-[9px] font-semibold tracking-wide text-amber-700 uppercase">Break</div>}
                      </td>
                      {DAYS_CONST.map(day=>{
                        const cell = getCell(day,p)
                        const isConflict = !!(cell && hasConflict && day==='MON' && p===3 && filterClass==='8B')
                        return (
                          <td key={day} className={`px-2 py-2 border-l border-slate-100 align-top h-[64px] ${isConflict?'bg-red-50/70 ring-inset ring-1 ring-red-200':''}`}>
                            {cell ? (
                              <div className={isConflict?'':'text-slate-900'}>
                                <div className="text-[12px] font-medium leading-tight truncate">{cell.subject}</div>
                                <div className="text-[11px] text-slate-600 truncate">{cell.teacherName.replace('Mr. ','').replace('Ms. ','')}</div>
                                <div className="text-[11px] font-mono text-slate-500 truncate inline-flex items-center gap-1">{cell.room} {isConflict && <AlertTriangle size={10} className="text-red-600"/>}</div>
                                {isConflict && <div className="mt-1 text-[10px] font-medium text-red-700">Conflict</div>}
                              </div>
                            ): <span className="text-slate-300">—</span>}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasConflict && filterClass==='8B' && (
              <div className="mx-3 mb-3 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 flex gap-2.5">
                <AlertTriangle size={14} className="text-red-600 shrink-0 mt-0.5"/>
                <div className="text-[12px] leading-5">
                  <span className="font-medium text-red-900">Conflict:</span> <span className="text-red-800">Mr. Arvind Kumar assigned to 8B and 10A at MON P3.</span> <span className="text-red-700">Fix by moving 8B Mathematics → TUE P4 (Room 201, 48 cap.).</span>
                  <button onClick={()=>nav('/conflicts')} className="ml-2 inline-flex items-center gap-1 font-medium text-red-900 underline">Resolve <ArrowRight size={11}/></button>
                </div>
              </div>
            )}

            <div className="mx-3 mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 flex gap-2.5">
              <Info size={13} className="text-slate-500 shrink-0 mt-0.5"/>
              <div className="text-[11.5px] leading-5 text-slate-600"><span className="font-medium text-slate-900">Why this slot?</span> Physics → WED P5 — Physics Lab 1 free • Teacher free • Class free • Weekly quota OK • No hard-constraint breach. Explainable, not opaque.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-[12px] font-semibold text-slate-900">Engine notes</div>
              <div className="mt-2 space-y-2 text-[11.5px] leading-4 text-slate-600">
                <div className="flex gap-2"><span className="w-1 h-1 bg-slate-400 rounded-full mt-2 shrink-0"/> Solver is deterministic — same inputs produce same timetable. Re-run is idempotent unless constraints change.</div>
                <div className="flex gap-2"><span className="w-1 h-1 bg-slate-400 rounded-full mt-2 shrink-0"/> Applying a resolution writes to <span className="font-mono bg-slate-100 border border-slate-200 px-1 rounded text-[11px]">timetables</span> and emits a notification.</div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="text-[12px] font-semibold text-slate-900">Next action</div>
                <div className="text-[12px] leading-5 text-slate-600 mt-1">Resolve the MON P3 clash to restore quality from <span className="font-semibold text-slate-900">84 → 93</span> and clear the operations queue.</div>
              </div>
              <button onClick={()=>nav('/conflicts')} className="mt-3 h-8 w-fit px-4 bg-slate-900 text-white rounded-lg text-[12px] font-medium hover:bg-slate-800 inline-flex items-center gap-1.5">Go to Conflict Center <ArrowRight size={12}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
