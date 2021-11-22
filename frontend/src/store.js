import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { scheduleReducer } from './reducers/scheduleReducers'
import { scheduleCreateReducer, scheduleDetailsReducer, scheduleListMyReducer } from './reducers/scheduleCreateReducer'

const reducer = combineReducers({
    courseList: courseListReducer,
    userLogin: userLoginReducer,
    courseDetails: courseDetailsReducer,
    schedule: scheduleReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    scheduleCreate: scheduleCreateReducer,
    scheduleDetails: scheduleDetailsReducer,
    scheduleListMy: scheduleListMyReducer,
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