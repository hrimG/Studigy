import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    courseListReducer, 
    courseDetailsReducer, 
    courseDeleteReducer, 
    courseCreateReducer,
    courseUpdateReducer, 
} from './reducers/courseReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'
import { scheduleReducer } from './reducers/scheduleReducers'
import { 
    scheduleCreateReducer, 
    scheduleDetailsReducer, 
    scheduleListMyReducer,
    scheduleListReducer, 
    scheduleAttendReducer,
} from './reducers/scheduleCreateReducer'

const reducer = combineReducers({
    courseList: courseListReducer,
    userLogin: userLoginReducer,
    
    courseDetails: courseDetailsReducer,
    courseDelete: courseDeleteReducer,
    courseCreate: courseCreateReducer,
    courseUpdate: courseUpdateReducer,
    schedule: scheduleReducer,
    
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    scheduleCreate: scheduleCreateReducer,
    scheduleDetails: scheduleDetailsReducer,
    scheduleListMy: scheduleListMyReducer,
    scheduleList: scheduleListReducer,
    scheduleAttend: scheduleAttendReducer,
})

const scheduledLecturesFromStorage = localStorage.getItem('scheduledLectures') ?
    JSON.parse(localStorage.getItem('scheduledLectures')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const attendancePreferenceFromStorage = localStorage.getItem('attendancePreference') ?
    JSON.parse(localStorage.getItem('attendancePreference')) : {}

const initialState = {
    schedule: { 
        scheduledLectures: scheduledLecturesFromStorage,
        attendancePreference: attendancePreferenceFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store