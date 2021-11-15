import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Difficulty from '../components/Difficulty'
import axios from 'axios'

function CourseScreen() {
    const params = useParams();    
    const [course, setCourse] = useState([])

    useEffect(() => {
        async function fetchCourse(){
            const { data } = await axios.get(`/api/courses/${params.id}`)
            setCourse(data)
        }
        fetchCourse()
        
    }, [params.id])
    
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
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
                            <Difficulty value={course.difficulty} text={`${course.numReviews} reviews`} color={'#f8e825'} />
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
        </div>
    )
}

export default CourseScreen
