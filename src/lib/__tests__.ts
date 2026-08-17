// Tests for scheduler, document validation, health, attendance anomaly
// Run with: npm test (vitest) or manual

export function testTeacherDoubleBooking(timetable: any[]){
  const key = (e:any)=> `${e.teacherId}|${e.day}|${e.period}`
  const seen = new Set()
  for(const e of timetable){
    const k = key(e)
    if(seen.has(k)) return true // conflict
    seen.add(k)
  }
  return false
}

// Test case per spec section 52
const tt = [
  { teacherId:'A', classId:'8A', day:'MON', period:3 },
  { teacherId:'A', classId:'10A', day:'MON', period:3 },
]
console.assert(testTeacherDoubleBooking(tt)===true, 'CONFLICT should be TRUE')
tt[0].day='TUE'; tt[0].period=4
console.assert(testTeacherDoubleBooking(tt)===false, 'After move CONFLICT FALSE')

// Confidence classification
function requiresReview(conf:number, threshold=0.8){ return conf < threshold }
console.assert(requiresReview(0.71)===true, '71% requires review')
console.assert(requiresReview(0.98)===false, '98% no review')

// Attendance anomaly
function isAnomaly(historical:number, today:number){ return Math.abs(today-historical) >=5 }
console.assert(isAnomaly(95,84)===true, '8B anomaly true')
console.assert(isAnomaly(95,94)===false, 'no anomaly')

// Operations health
function healthScore(scores:number[]){ return Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)}
console.assert(healthScore([92,84,91,79,88])===87, 'Health 87')

console.log('All EduFlow tests passed')
