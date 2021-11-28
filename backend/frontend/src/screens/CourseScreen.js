import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Difficulty from '../components/Difficulty'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCourseDetails, createCourseComment } from '../actions/courseActions'
import { COURSE_CREATE_COMMENT_RESET } from '../constants/courseConstants'

function CourseScreen() {
    const [lecs, setLecs] = useState(1)
    const [difficulty, setDifficulty] = useState(0)
    const [content, setContent] = useState('')

    const params = useParams()
    const navigate = useNavigate()   
    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseCommentCreate = useSelector(state => state.courseCommentCreate)
    const { 
        success: successCourseComment, 
        loading: loadingCourseComment, 
        error: errorCourseComment 
    } = courseCommentCreate

    useEffect(() => {
        if(successCourseComment){
            setDifficulty(0)
            setContent('')
            dispatch({ type: COURSE_CREATE_COMMENT_RESET})
        }
        dispatch(listCourseDetails(params.id))
    }, [params, dispatch, successCourseComment])
    
    const addToScheduleHandler = () => {
        navigate(`/schedule/${params.id}?lecs=${lecs}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createCourseComment(
            params.id, {
                difficulty,
                content,
            }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    :(
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={course.image} alt={course.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='pb-3'>
                                            <h3 className="text-uppercase">{course.name}</h3>
                                            <Difficulty value={course.difficulty} text={`${course.numComments} comments`} color={'#f8e825'} />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {course.numComments} Comments
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
                                            {course.lecturesScheduled > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col> Lecture No. </Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={lecs}
                                                                onChange={(e) => setLecs(e.target.value)}
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
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item >
                                                <Row>
                                                    <Button 
                                                        onClick={ addToScheduleHandler }
                                                        className='btn btn-block align-items-center' 
                                                        disabled={course.lecturesScheduled === 0} 
                                                        type='button'>
                                                        Add to Schedule
                                                    </Button>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4 className="mt-3">Disscusion Forum</h4>
                                    {course.comments.length === 0 && 
                                    <Message variant='info'>No posts</Message>}

                                    <ListGroup variant='flush'>
                                        {course.comments.map((comment) => (
                                            <ListGroup.Item key={comment._id}>
                                                <strong>{comment.name}</strong>
                                                <Difficulty value={comment.difficulty} color='#f8e825'/>
                                                <p>{comment.createdAt.substring(0, 10)}</p>
                                                <p>{comment.content}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Post a Comment/ Ask a Doubt</h4>

                                            {loadingCourseComment && <Loader />}
                                            {successCourseComment && <Message variant='success'>Post Submitted</Message>}
                                            {errorCourseComment && <Message variant='danger'>{errorCourseComment}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='difficulty' className='mb-3'>
                                                        <Form.Label>Difficulty</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={difficulty}
                                                            onChange={(e) => setDifficulty(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Piece of Cake</option>
                                                            <option value='2'>2 - Easy</option>
                                                            <option value='3'>3 - Moderate</option>
                                                            <option value='4'>4 - Hard</option>
                                                            <option value='5'>5 - Insane</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='content' className='mb-3'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={content}
                                                            onChange={(e) => setContent(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingCourseComment}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to post a comment</Message>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )


            }
        </div>
    )
}

export default CourseScreen
