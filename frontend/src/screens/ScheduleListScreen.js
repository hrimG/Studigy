import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSchedules } from '../actions/scheduleCreateActions'

function ScheduleListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const scheduleList = useSelector(state => state.scheduleList)
    const { loading, error, schedules } = scheduleList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin ){
            dispatch(listSchedules())
        }
        else{
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <div>
            <h1>Schedules</h1>
            {loading 
                ? (<Loader />)
                : error 
                    ? (<Message variant='danger'>{error}</Message>)
                    :(
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>ATTENDED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map(schedule => (
                                    <tr key={schedule._id}>
                                        <td>{schedule._id}</td>
                                        <td>{schedule.user && schedule.user.name}</td>
                                        <td>{schedule.createdAt.substring(0,10)}</td>
                                        <td>{schedule.isAttended ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                                ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/myschedule/${schedule._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </Link>
                                        </td>     
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default ScheduleListScreen
