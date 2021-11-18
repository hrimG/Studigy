import { SCHEDULE_ADD_LECTURE, SCHEDULE_REMOVE_LECTURE } from '../constants/scheduleConstants'

export const scheduleReducer = (state = { scheduledLectures: [] }, action) => {
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
        default:
            return state
    }
}