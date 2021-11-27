import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopCourses } from '../actions/courseActions'

function CourseCarousel() {
    const dispatch = useDispatch()

    const courseTopOnes = useSelector(state => state.courseTopOnes)
    const { error, loading, courses } = courseTopOnes

    useEffect(() => {
        dispatch(listTopCourses())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-info'>
                    {courses.map(course => (
                        <Carousel.Item key={course._id}>
                            <Link to={`/course/${course._id}`}>
                                <Image src={course.image} alt={course.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{course.name} ( By {course.tutor} )</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default CourseCarousel
