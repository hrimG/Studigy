import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMySchedules } from '../actions/scheduleCreateActions'

function ProfileScreen() {
    const navigate = useNavigate();

    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [message, setMessage ] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const scheduleListMy = useSelector(state => state.scheduleListMy)
    const { loading:loadingSchedules, error:errorSchedules, schedules } = scheduleListMy

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMySchedules())
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [ dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match!')
        }
        else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        } 
    }

    return (
        <Row>
            <Col md ={3}>
                <h2> Student Profile </h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                { loading && <Loader />}
                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md ={9}>
                <h2> My Schedule </h2>
                {loadingSchedules ? (
                    <Loader />
                ): errorSchedules ? (
                        <Message variant='danger'>{errorSchedules}</Message>
                ):(
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Lectures</th>
                                <th>Attended</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map(schedule => (
                                <tr key={schedule._id}>
                                    <td>{schedule._id}</td>
                                    <td>{schedule.createdAt.substring(0,10)}</td>
                                    <td>lectures here</td>
                                    <td>{schedule.isAttended ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/myschedule/${schedule._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
