import React from 'react'
import { Row, Col } from 'react-bootstrap'
import courses from '../courses'
import Course from '../components/Course'

function HomeScreen() {
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
