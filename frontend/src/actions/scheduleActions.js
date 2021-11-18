import axios from 'axios'
import { SCHEDULE_ADD_LECTURE, SCHEDULE_REMOVE_LECTURE } from '../constants/scheduleConstants'

export const addToSchedule = (id, lecs) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/courses/${id}`)

    dispatch({
        type: SCHEDULE_ADD_LECTURE,
        payload: {
            course:data._id,
            name: data.name,
            image: data.image,
            tutor: data.tutor,
            lecturesScheduled: data.lecturesScheduled,
            lecs
        }
    })
    localStorage.setItem('scheduledLectures', JSON.stringify(getState().schedule.scheduledLectures))
}

export const removeFromSchedule = (id) => (dispatch, getState) => {
    dispatch({
        type: SCHEDULE_REMOVE_LECTURE,
        payload: id
    })
    localStorage.setItem('scheduledLectures', JSON.stringify(getState().schedule.scheduledLectures))
}