import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ScheduleScreen from './screens/ScheduleScreen'
import AttendanceScreen from './screens/AttendanceScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import ScheduleDetailsScreen from './screens/ScheduleDetailsScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import CourseListScreen from './screens/CourseListScreen'
import CourseEditScreen from './screens/CourseEditScreen'
import ScheduleListScreen from './screens/ScheduleListScreen'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container> 
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/login/attendance' element={<AttendanceScreen />} />
            <Route path='/confirmation' element={<ConfirmationScreen />} />
            <Route path='/myschedule/:id' element={<ScheduleDetailsScreen />} />
            <Route path='/course/:id' element={<CourseScreen />} />
            <Route path='/schedule' element={<ScheduleScreen />} />
            <Route path='/schedule/:id' element={<ScheduleScreen />} />

            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

            <Route path='/admin/courselist' element={<CourseListScreen />} />
            <Route path='/admin/course/:id/edit' element={<CourseEditScreen />} />

            <Route path='/admin/schedulelist' element={<ScheduleListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
