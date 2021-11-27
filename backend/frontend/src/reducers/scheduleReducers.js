import { SCHEDULE_ADD_LECTURE, SCHEDULE_REMOVE_LECTURE, SCHEDULE_SAVE_ATTENDANCE_PREFERENCE, SCHEDULE_CLEAR_LECTURES } from '../constants/scheduleConstants'

export const scheduleReducer = (state = { scheduledLectures: [], attendancePreference: {} }, action) => {
    switch(action.type){
        case SCHEDULE_ADD_LECTURE:
            const lecture = action.payload
            const existLecture = state.scheduledLectures.find(x => x.course === lecture.course)

            if(existLecture){
                return {
                    ...state,
                    scheduledLectures: state.scheduledLectures.map(x => 
                        x.course === existLecture.course ? lecture : x)
                }
            }
            else{
                return {
                    ...state,
                    scheduledLectures: [...state.scheduledLectures, lecture]
                }
            }
        
        case SCHEDULE_REMOVE_LECTURE:
            return{
                ...state,
                scheduledLectures: state.scheduledLectures.filter(x => x.course !== action.payload)
            }
        case SCHEDULE_SAVE_ATTENDANCE_PREFERENCE:
            return{
                ...state,
                attendancePreference: action.payload
            }
        case SCHEDULE_CLEAR_LECTURES:
            return{
                ...state,
                scheduledLectures: []
            }
        default:
            return state
    }
}