import { useState } from 'react'
import { useStore } from '../lib/store'
import { Search, Filter, MoreHorizontal, Eye, Edit, UserPlus } from 'lucide-react'

export default function Students(){
  const { students, classes } = useStore()
  const [q, setQ] = useState('')
  const [classFilter, setClassFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = students.filter(s=>{
    if(classFilter!=='All' && s.className!==classFilter) return false
    if(q && !s.name.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })
  const selectedStudent = selected? students.find(s=>s.id===selected): null
  return (
    <div className="max-w-[1280px] mx-auto space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">Students</h1>
          <p className="text-[13px] text-slate-500">{students.length} records • Unified data layer • {classes.length} classes</p>
        </div>
        <button className="h-9 px-4 bg-slate-900 text-white rounded-full text-[13px] font-semibold flex items-center gap-2"><UserPlus size={14}/> Add student</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px] max-w-[360px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, ID, parent..." className="w-full pl-9 pr-3 h-9 bg-slate-50 border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500"/>
          <div className="flex gap-1">
            {['All',...classes.map(c=>c.name)].map(c=>(
              <button key={c} onClick={()=>setClassFilter(c)} className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${classFilter===c?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-600 border-slate-200'}`}>{c}</button>
            ))}
          </div>
        </div>
        <span className="ml-auto text-[12px] text-slate-500">{filtered.length} students</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="text-left p-3">Student ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Class</th>
                <th className="text-left p-3">Parent</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.slice(0,20).map(s=>(
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-[12px] text-slate-600">{s.id.toUpperCase()}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/100?img=${(parseInt(s.id.slice(1))%70)+1}`} className="w-7 h-7 rounded-full object-cover"/>
                      <div>
                        <div className="font-medium text-slate-900 leading-none">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><span className="px-2 py-1 bg-slate-900 text-white rounded-full text-[11px] font-semibold">{s.className}</span></td>
                  <td className="p-3 text-slate-700">{s.parentName}</td>
                  <td className="p-3 font-mono text-[12px]">{s.phone}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded-full text-[11px] font-semibold border ${s.status==='active'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-slate-100 text-slate-600 border-slate-200'}`}>{s.status}</span></td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button onClick={()=>setSelected(s.id)} className="w-7 h-7 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center"><Eye size={14}/></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center"><Edit size={14}/></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center"><MoreHorizontal size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
          <span>Showing 20 of {filtered.length} • Pagination enabled</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-full font-medium">Previous</button>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-full">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-full">2</button>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-40" onClick={()=>setSelected(null)}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-[720px] overflow-hidden">
            <div className="h-1 bg-slate-900"/>
            <div className="p-6">
              <div className="flex gap-4">
                <img src={`https://i.pravatar.cc/200?img=${(parseInt(selectedStudent.id.slice(1))%70)+1}`} className="w-20 h-20 rounded-2xl object-cover"/>
                <div>
                  <div className="text-[18px] font-semibold text-slate-900">{selectedStudent.name}</div>
                  <div className="text-[13px] text-slate-500">{selectedStudent.className} • {selectedStudent.id.toUpperCase()} • {selectedStudent.status}</div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-[11px] bg-slate-900 text-white px-2 py-1 rounded-full">Attendance 94%</span>
                    <span className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-full">Documents: 2</span>
                  </div>
                </div>
                <button onClick={()=>setSelected(null)} className="ml-auto h-8 px-3 bg-white border border-slate-200 rounded-full text-[12px]">Close</button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
                <div className="bg-slate-50 rounded-xl p-4"><div className="text-[11px] font-semibold text-slate-500 uppercase">Parent / Guardian</div><div className="font-medium mt-1">{selectedStudent.parentName}</div><div className="text-slate-600">{selectedStudent.phone}</div></div>
                <div className="bg-slate-50 rounded-xl p-4"><div className="text-[11px] font-semibold text-slate-500 uppercase">Academic</div><div className="font-medium mt-1">Class {selectedStudent.className}</div><div className="text-slate-600">DOB {selectedStudent.dob}</div></div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-[12px] text-blue-800">Unified record: documents + attendance + alerts linked via student_id foreign key.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
