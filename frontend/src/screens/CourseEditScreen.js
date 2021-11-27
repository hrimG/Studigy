import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listCourseDetails, updateCourse } from '../actions/courseActions'
import { COURSE_UPDATE_RESET } from '../constants/courseConstants'

function CourseEditScreen() {
    const navigate = useNavigate()
    const params = useParams()

    const courseId = params.id

    const [name, setName ] = useState('')
    const [tutor, setTutor ] = useState('')
    const [description, setDescription ] = useState('')
    const [lecturesScheduled, setLecturesScheduled ] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] =useState(false)

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { error, loading, course } = courseDetails

    const courseUpdate = useSelector(state => state.courseUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = courseUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type: COURSE_UPDATE_RESET})
            navigate('/admin/courselist')
        }
        else{
            if(!course.name || course._id !== Number(courseId)){
                dispatch(listCourseDetails(courseId))
            }else{
                setName(course.name)
                setTutor(course.tutor)
                setImage(course.image)
                setDescription(course.description)
                setLecturesScheduled(course.lecturesScheduled)
            }
        }
        
    }, [ dispatch, course, courseId, successUpdate, navigate ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCourse({
            _id: courseId,
            name, 
            tutor,
            image,
            description,
            lecturesScheduled,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('course_id', courseId)

        setUploading(true)
        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post(`/api/courses/upload/`, formData, config)

            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }

    }

    return (
        <div>
            <Link to='/admin/courselist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Course</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
                :(
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name' className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='tutor' className='mb-3'>
                            <Form.Label>Tutor</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Tutor'
                                value={tutor}
                                onChange={(e) => setTutor(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='image' >
                            <Form.Label>Image</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.Control
                                    type='file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                            </Form.Control>
                            {uploading && <Loader />}

                        </Form.Group>

                        <Form.Group controlId='lecturesScheduled' className='mb-3'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter stock'
                                value={lecturesScheduled}
                                onChange={(e) => setLecturesScheduled(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                row='5'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default CourseEditScreen
