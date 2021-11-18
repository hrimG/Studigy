import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Difficulty from '../components/Difficulty'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCourseDetails } from '../actions/courseActions'

function CourseScreen() {
    const params = useParams();    
    const dispatch = useDispatch()
    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails
    useEffect(() => {
        dispatch(listCourseDetails(params.id))
    }, [params, dispatch])
    
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    :(
                        <Row>
                            <Col md={6}>
                                <Image src={course.image} alt={course.name} />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3 className="text-uppercase">{course.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Difficulty value={course.difficulty} text={`${course.numComments} comments`} color={'#f8e825'} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Tutor: {course.tutor}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {course.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tutor: </Col>
                                                <Col>
                                                    <strong>{course.tutor}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {course.lecturesScheduled > 0 ? 'Lectures Scheduled' : 'No upcoming Lectures'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            <Row>
                                                <Button className='btn btn-block align-items-center' disabled={course.lecturesScheduled === 0} type='button'>Scheduler</Button>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )


            }
        </div>
    )
}

export default CourseScreen
