import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container> 
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/course/:id' element={<CourseScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
