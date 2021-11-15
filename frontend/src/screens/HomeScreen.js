import React, { useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Course from '../components/Course'
import axios from 'axios'
function HomeScreen() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        async function fetchCourses(){
            const { data } = await axios.get('/api/courses/')
            setCourses(data)
        }

        fetchCourses()
        
    }, [])

    return (
        <div>
            <h1> Latest Courses</h1>
            <Row>
                {courses.map(course =>(
                    <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
                        <Course course = {course} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
