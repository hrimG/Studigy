import axios from 'axios'
import { SCHEDULE_ADD_LECTURE, SCHEDULE_REMOVE_LECTURE, SCHEDULE_SAVE_ATTENDANCE_PREFERENCE } from '../constants/scheduleConstants'

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

export const saveAttendancePreference = (data) => (dispatch) => {
    dispatch({
        type: SCHEDULE_SAVE_ATTENDANCE_PREFERENCE,
        payload: data
    })
    localStorage.setItem('attendancePreference', JSON.stringify(data))
}