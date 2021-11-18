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
            <Route path='/course/:id' element={<CourseScreen />} />
            <Route path='/schedule' element={<ScheduleScreen />} />
            <Route path='/schedule/:id' element={<ScheduleScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
