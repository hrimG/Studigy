import { 
    SCHEDULE_CREATE_REQUEST, 
    SCHEDULE_CREATE_SUCCESS, 
    SCHEDULE_CREATE_FAIL,
    SCHEDULE_CREATE_RESET,

    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_DETAILS_FAIL,

    SCHEDULE_LIST_MY_REQUEST, 
    SCHEDULE_LIST_MY_SUCCESS, 
    SCHEDULE_LIST_MY_FAIL,
    SCHEDULE_LIST_MY_RESET,
} from '../constants/scheduleConstants'

export const scheduleCreateReducer = (state={}, action) => {
    switch(action.type){
        case SCHEDULE_CREATE_REQUEST:
            return {
                loading: true
            }
        case SCHEDULE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                myschedule: action.payload
            }
        case SCHEDULE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SCHEDULE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const scheduleDetailsReducer = (state={ loading: true, lectures:[], attendancePreference:{}}, action) => {
    switch(action.type){
        case SCHEDULE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SCHEDULE_DETAILS_SUCCESS:
            return {
                loading: false,
                myschedule: action.payload
            }
        case SCHEDULE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const scheduleListMyReducer = (state = { schedules: [] }, action) => {
    switch (action.type) {
        case SCHEDULE_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case SCHEDULE_LIST_MY_SUCCESS:
            return {
                loading: false,
                schedules: action.payload
            }

        case SCHEDULE_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case SCHEDULE_LIST_MY_RESET:
            return {
                schedules: []
            }

        default:
            return state
    }
}