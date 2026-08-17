import { useState } from 'react'
import { useStore } from '../lib/store'
import { Upload, FileText, Check, AlertTriangle, ShieldCheck, Clock, MoreHorizontal, Eye, FileKey, History, Pencil, X } from 'lucide-react'

export default function Documents(){
  const { documents, updateDocumentField, approveDocument, addDocument } = useStore()
  const [selectedId, setSelectedId] = useState(documents[0]?.id || '')
  const doc = documents.find(d=>d.id===selectedId) || documents[0]
  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [editField, setEditField] = useState<string| null>(null)
  const [editVal, setEditVal] = useState('')

  const handleSample = ()=>{
    setProcessing(true)
    setTimeout(()=> setProcessing(false), 900)
  }
  const handleUpload = ()=>{
    const newDoc = {
      id:`doc-${Date.now()}`,
      fileName:`Admission_Form_${Date.now()}.pdf`,
      type:'student_admission_form',
      status:'extracted' as const,
      createdAt:new Date().toISOString(),
      fields: [
        { name:'student_name', label:'Student Name', value:'Kavya Iyer', confidence:0.96, requiresReview:false},
        { name:'dob', label:'Date of Birth', value:'09/11/2013', confidence:0.91, requiresReview:false},
        { name:'class', label:'Class', value:'9A', confidence:0.97, requiresReview:false},
        { name:'parent_name', label:'Parent / Guardian', value:'Suresh Iyer', confidence:0.93, requiresReview:false},
        { name:'phone', label:'Phone Number', value:'98*** *****', confidence:0.68, requiresReview:true},
        { name:'address', label:'Address', value:'45 Residency Road, Bengaluru', confidence:0.85, requiresReview:false},
      ],
      audit: [
        { time:new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), action:'Document uploaded'},
        { time:new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), action:'AI extraction completed'},
        { time:new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), action:'1 field flagged for review'},
      ]
    }
    addDocument(newDoc)
    setSelectedId(newDoc.id)
  }

  if(!doc) return null

  const avgConf = Math.round(doc.fields.reduce((a,f)=>a+f.confidence,0)/doc.fields.length*100)
  const flagged = doc.fields.filter(f=>f.requiresReview).length

  return (
    <div className="max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Document Intelligence • Human-in-the-loop</div>
          <h1 className="mt-1 text-[20px] font-semibold tracking-tight text-slate-900">Documents</h1>
          <p className="text-[12.5px] text-slate-500 mt-1">Upload → Process → Extract → Score → Review → Approve → Store • Structured JSON with Pydantic validation</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex h-7 items-center gap-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-600"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/> Gemini 1.5 Flash • Schema validated</span>
          <span className="h-7 inline-flex items-center px-2.5 bg-slate-900 text-white rounded-lg text-[11px] font-medium tabular-nums">{documents.length} docs • {avgConf}% avg</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left */}
        <div className="lg:col-span-4 space-y-4">
          <div onDragOver={e=>{e.preventDefault(); setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault(); setDragOver(false); handleUpload()}}
            className={`bg-white border rounded-xl p-4 ${dragOver?'border-slate-900 bg-slate-50':'border-slate-200'} ${dragOver?'ring-1 ring-slate-900':''}`}>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0"><Upload size={16}/></div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-slate-900">Upload admission forms</div>
                <div className="text-[11.5px] text-slate-500">PNG, JPG, PDF — 10 MB max • Drag & drop or browse</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleUpload} className="h-7 px-3 bg-slate-900 text-white rounded-lg text-[12px] font-medium hover:bg-slate-800">Browse</button>
                  <button onClick={handleSample} className="h-7 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-medium hover:bg-slate-50">Use sample</button>
                  {processing && <span className="text-[11px] text-slate-500 inline-flex items-center gap-1"><Clock size={11}/> Processing…</span>}
                </div>
                <div className="mt-2 text-[11px] text-slate-400">Sample: <span className="font-medium text-slate-600">Riya Sharma • 8B • 2024-25</span> — ready for demo</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-[12px] font-semibold tracking-wide text-slate-700 uppercase flex items-center gap-2"><FileText size={12}/> Queue</h2>
              <span className="text-[11px] text-slate-500">{documents.length} • {flagged? `${flagged} needs review` : 'All clear'}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {documents.map(d=>{
                const active = d.id===selectedId
                const f = d.fields.filter(x=>x.requiresReview).length
                const ac = Math.round(d.fields.reduce((a,x)=>a+x.confidence,0)/d.fields.length*100)
                return (
                  <button key={d.id} onClick={()=>setSelectedId(d.id)} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-slate-50 relative ${active?'bg-slate-50':''}`}>
                    {active && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900"/>}
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${active?'bg-white border-slate-900 text-slate-900':'bg-slate-50 border-slate-200 text-slate-500'}`}><FileKey size={14}/></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium text-slate-900 truncate">{d.fileName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="capitalize">{d.type.replaceAll('_',' ')}</span>
                        <span>•</span>
                        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-medium ${d.status==='verified'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-white text-slate-600 border-slate-200'}`}>{d.status}</span>
                        <span>•</span><span className="tabular-nums">{ac}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {f>0 && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"/>}
                      <span className="text-[11px] text-slate-400"><MoreHorizontal size={12}/></span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <History size={12} className="text-slate-500"/>
              <h3 className="text-[12px] font-semibold tracking-wide text-slate-700 uppercase">Audit trail</h3>
              <span className="ml-auto text-[11px] text-slate-500 font-mono">{doc.audit.length} events</span>
            </div>
            <div className="p-4">
              <div className="relative pl-6 border-l border-slate-200 space-y-3">
                {doc.audit.map((a,i)=>(
                  <div key={i} className="relative">
                    <span className={`absolute -left-[25px] top-1 w-2 h-2 rounded-full border-2 bg-white ${i===doc.audit.length-1?'border-slate-900':'border-slate-300'}`}/>
                    <div className="flex gap-2 text-[12px]">
                      <span className="font-mono text-[11px] text-slate-500 tabular-nums">{a.time}</span>
                      <span className="text-slate-700 leading-4">{a.action}</span>
                    </div>
                  </div>
                ))}
                {doc.status==='verified' && (
                  <div className="relative">
                    <span className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-emerald-500 border-2 border-emerald-500"/>
                    <div className="text-[12px] font-medium text-emerald-700">Record saved to PostgreSQL — student created</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right - preview + fields */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-semibold text-slate-900">Extraction result</h2>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${doc.status==='verified'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-amber-50 text-amber-700 border-amber-200'}`}>{doc.status==='verified'?'Verified — human approved':'AI extracted — needs review'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="hidden md:inline-flex items-center gap-1"><ShieldCheck size={11}/> Threshold 80%</span>
                <span className="font-mono bg-slate-50 border border-slate-200 px-2 py-1 rounded">id: {doc.id.slice(0,8)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-0">
              {/* Preview */}
              <div className="xl:col-span-2 border-b xl:border-b-0 xl:border-r border-slate-100 p-4 bg-slate-50/60">
                <div className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Eye size={12}/> Preview</span>
                  <span className="text-[10px] font-mono text-slate-400">sample.pdf • 1 page</span>
                </div>
                <div className="mt-3 bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Delhi Public School — Admission</div>
                    <span className="text-[10px] font-medium bg-slate-900 text-white px-1.5 py-0.5 rounded">2024–25</span>
                  </div>
                  <div className="mt-3 border border-slate-200 rounded-lg p-3 bg-white space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Student name</div>
                      <div className="h-8 px-2.5 flex items-center border border-slate-200 rounded bg-white text-[12.5px] font-medium">Riya Sharma</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Date of birth</div>
                        <div className="h-8 px-2.5 flex items-center border border-slate-200 rounded bg-white text-[12px]">14/06/2012</div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Class</div>
                        <div className="h-8 px-2.5 flex items-center border border-slate-200 rounded bg-white text-[12px] font-medium">8B</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2 space-y-1.5">
                        <div className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Phone</div>
                        <div className="h-8 px-2.5 flex items-center justify-between border rounded bg-white text-[12px] font-medium border-amber-300">
                          <span>9876543210</span><span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">71% • Review</span>
                        </div>
                      </div>
                      <div className="border border-slate-200 rounded bg-slate-50 flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-500">Photo</div>
                        <div className="text-[9px] text-slate-400 mt-1">Student</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Address</div>
                      <div className="h-8 px-2.5 flex items-center border border-slate-200 rounded bg-white text-[11px]">12 MG Road, Indiranagar</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 tabular-nums">{avgConf}% avg • {doc.fields.length} fields • {flagged} flagged</span>
                    <span className="font-mono text-[10px] text-slate-400">Gemini Vision • 1.2s</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 text-center">Confidence overlay • Low fields need human approval</div>
              </div>

              {/* Fields */}
              <div className="xl:col-span-3 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">Fields • Structured JSON</h3>
                  <span className="text-[11px] text-slate-500 tabular-nums">{doc.fields.length} keys</span>
                </div>
                <div className="mt-3 border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                  {doc.fields.map(f=>{
                    const isLow = f.confidence < 0.8
                    const editing = editField===f.name
                    return (
                      <div key={f.name} className={`group px-3 py-2.5 bg-white hover:bg-slate-50 flex gap-3 items-start ${isLow?'border-l-2 border-l-amber-500':''} ${editing?'bg-slate-50':''}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase truncate">{f.label}</span>
                            <span className="text-[10px] font-mono text-slate-400">{f.name}</span>
                            {isLow && <span className="ml-auto text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={10}/> Review</span>}
                          </div>
                          {editing ? (
                            <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ updateDocumentField(doc.id,f.name,editVal); setEditField(null)} if(e.key==='Escape') setEditField(null)}} className="mt-1.5 w-full h-8 px-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-slate-900"/>
                          ):(
                            <div className="mt-1 text-[13px] font-medium text-slate-900 truncate">{f.value}</div>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden max-w-[160px]"><div className={`h-full ${isLow?'bg-amber-500': f.confidence>0.9?'bg-slate-900':'bg-slate-400'}`} style={{width:`${f.confidence*100}%`}}/></div>
                            <span className="text-[11px] tabular-nums font-medium text-slate-600">{Math.round(f.confidence*100)}%</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          {editing ? (
                            <div className="flex gap-1">
                              <button onClick={()=>{ updateDocumentField(doc.id,f.name,editVal); setEditField(null)}} className="h-7 w-7 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800"><Check size={12}/></button>
                              <button onClick={()=>setEditField(null)} className="h-7 w-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50"><X size={12}/></button>
                            </div>
                          ):(
                            <>
                              <button onClick={()=>{setEditField(f.name); setEditVal(f.value)}} className="h-7 px-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-medium hover:bg-slate-50 inline-flex items-center gap-1"><Pencil size={11}/> Edit</button>
                              <button onClick={()=> updateDocumentField(doc.id,f.name,f.value)} className={`h-7 px-2.5 rounded-lg text-[11px] font-medium border inline-flex items-center justify-center ${isLow?'bg-amber-500 text-white border-amber-500 hover:bg-amber-600':'bg-white border-slate-200 hover:bg-slate-50'}`}>{isLow?'Approve':'Approve'}</button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 flex gap-2.5">
                  <ShieldCheck size={14} className="text-slate-600 shrink-0 mt-0.5"/>
                  <div>
                    <div className="text-[12px] font-medium text-slate-900">Human-in-the-loop</div>
                    <div className="text-[11.5px] leading-4 text-slate-600">Fields below <span className="font-medium text-slate-900">80%</span> are blocked from saving. Approved records write to <span className="font-mono text-[11px] bg-white border border-slate-200 px-1 py-0.5 rounded">students</span> with RLS.</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button disabled={doc.status==='verified'} onClick={()=> approveDocument(doc.id)} className={`flex-1 h-9 rounded-lg text-[13px] font-medium inline-flex items-center justify-center gap-2 ${doc.status==='verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    {doc.status==='verified'? <><Check size={14}/> Verified — student created</> : 'Approve & save to database'}
                  </button>
                  <button className="h-9 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-medium hover:bg-slate-50">Reject</button>
                </div>
                {doc.status==='verified' && <div className="mt-1.5 text-[11px] text-center text-emerald-700">Verified data persisted • Health recalculated • Audit logged</div>}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
            <span className="inline-flex items-center gap-1.5"><FileKey size={12}/> Pydantic schema • No unvalidated AI output is persisted</span>
            <span className="hidden md:inline">Fallback: transparent sample extraction if Gemini is unavailable</span>
          </div>
        </div>
      </div>
    </div>
  )
}
