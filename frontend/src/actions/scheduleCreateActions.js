import axios from 'axios'
import { 
    SCHEDULE_CREATE_REQUEST, 
    SCHEDULE_CREATE_SUCCESS, 
    SCHEDULE_CREATE_FAIL,

    SCHEDULE_CLEAR_LECTURES,

    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_DETAILS_FAIL,

    SCHEDULE_LIST_MY_REQUEST, 
    SCHEDULE_LIST_MY_SUCCESS, 
    SCHEDULE_LIST_MY_FAIL,
} from '../constants/scheduleConstants'

export const createSchedule = (schedule) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SCHEDULE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/schedules/add/',
            schedule,
            config
        )

        dispatch({
            type: SCHEDULE_CREATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: SCHEDULE_CLEAR_LECTURES,
            payload:data
        })
        
        localStorage.removeItem('scheduledLectures')

    }catch(error){
        dispatch({
            type: SCHEDULE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const getScheduleDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SCHEDULE_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(
            `/api/schedules/${id}/`,
            config
        )

        dispatch({
            type: SCHEDULE_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: SCHEDULE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listMySchedules = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: SCHEDULE_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(
            `/api/schedules/myschedules/`,
            config
        )

        dispatch({
            type: SCHEDULE_LIST_MY_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: SCHEDULE_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}
