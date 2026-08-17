def calculate_operations_health(attendance_score, timetable_score, documents_score, staffing_score, rooms_score):
    return round((attendance_score + timetable_score + documents_score + staffing_score + rooms_score)/5)

def attendance_anomaly(historical: float, today: float, threshold=5) -> bool:
    return abs(today - historical) >= threshold
