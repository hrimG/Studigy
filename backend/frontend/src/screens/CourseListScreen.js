import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCourses, deleteCourse, createCourse } from '../actions/courseActions'
import { COURSE_CREATE_RESET } from '../constants/courseConstants'

function CourseListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses } = courseList

    const courseDelete = useSelector(state => state.courseDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = courseDelete

    const courseCreate = useSelector(state => state.courseCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, course:createdCourse } = courseCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: COURSE_CREATE_RESET})

        if(!userInfo.isAdmin ){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/admin/course/${createdCourse._id}/edit`)
        }
        else{
            dispatch(listCourses())
        }
    }, [dispatch, userInfo, navigate, successDelete, successCreate, createdCourse])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this Course')){
            dispatch(deleteCourse(id))
        }
    }

    const createCourseHandler = (course) => {
        dispatch(createCourse())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col md={10}>
                    <h1>Courses</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createCourseHandler}>
                        <i className='fas fa-plus'></i>  Create Course
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading 
                ? (<Loader />)
                : error 
                    ? (<Message variant='danger'>{error}</Message>)
                    :(
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>SR NO.</th>
                                    <th>NAME</th>
                                    <th>TUTOR</th>
                                    {/* <th>DESCRIPTION</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={course._id}>
                                        <td>{index+1}</td>
                                        <td>{course.name}</td>
                                        <td>{course.tutor}</td>
                                        {/* <td>{course.description}</td> */}
                                        <td>
                                            <Link to={`/admin/course/${course._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(course._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>     
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default CourseListScreen
