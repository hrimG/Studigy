import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router'
import Course from '../components/Course'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CourseCarousel from '../components/CourseCarousel'
import { listCourses } from '../actions/courseActions'

function HomeScreen() {
    const dispatch = useDispatch()
    const courseList = useSelector(state => state.courseList)
    const { error, loading, courses} = courseList

    const location = useLocation() 
    let keyword = location.search
    console.log(keyword)
    
    useEffect(() => {
        dispatch(listCourses(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword &&  <CourseCarousel />}
            <h1> Latest Courses</h1>
            {loading ? <Loader /> 
                : error ? <Message variant='danger'>{ error }</Message>
                    :
                    <Row>
                        {courses.map(course =>(
                            <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{padding: "12px 12px"}}>
                                <Course course = {course} />
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    )
}

export default HomeScreen
