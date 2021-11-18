import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Message  from '../components/Message'
import { addToSchedule, removeFromSchedule } from '../actions/scheduleActions'

function ScheduleScreen() {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const courseId = params.id
    const lecs = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const schedule = useSelector(state => state.schedule)
    const { scheduledLectures } = schedule
    console.log('scheduledLectures:', scheduledLectures)

    useEffect(() => {
        if(courseId){
            dispatch(addToSchedule(courseId, lecs))
        }
    }, [dispatch, courseId, lecs])

    const removeFromScheduleHandler = (id) => {
        dispatch(removeFromSchedule(id))
    }
    const attendanceHandler = () => {
        navigate(`/login?redirect=attendance`)
    }
    return (
        <Row>
            <Col md={8}>
                <h1> My Schedule</h1>
                {scheduledLectures.length === 0 ? (
                    <Message variant='info'>
                        You have no lectures on your Schedule.  <Link to='/'>   Go Back</Link>
                    </Message>
                ): (
                    <ListGroup variant='flush'>
                        {scheduledLectures.map(course => (
                            <ListGroup.Item>
                                <Row>
                                    <Col md={2}>
                                        <Image src={course.image} alt={course.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/course/${course.course}`}>{course.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {course.tutor}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={course.lecs}
                                            onChange={(e) => dispatch(addToSchedule(course.course, e.target.value))}
                                        >
                                            {
                                                [...Array(course.lecturesScheduled).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromScheduleHandler(course.course)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <h2>Dates</h2>
                        Offline Available
                    </ListGroup>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled = {scheduledLectures.length === 0}
                            onClick = {attendanceHandler}
                        >
                            Fill Attendance Preference
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default ScheduleScreen
