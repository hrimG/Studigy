import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getScheduleDetails, attendSchedule } from '../actions/scheduleCreateActions'
import { SCHEDULE_ATTEND_RESET } from '../constants/scheduleConstants'

function ScheduleDetailsScreen() {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const scheduleId = params.id

    const scheduleDetails= useSelector(state => state.scheduleDetails)
    const {myschedule, error, loading} = scheduleDetails

    const scheduleAttend= useSelector(state => state.scheduleAttend)
    const {loading:loadingAttend, success:successAttend} = scheduleAttend

    const userLogin= useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        if(!myschedule || myschedule._id!== Number(scheduleId) || successAttend ){
            dispatch({ type: SCHEDULE_ATTEND_RESET })
            dispatch(getScheduleDetails(scheduleId))
        }
    }, [myschedule, scheduleId, dispatch, successAttend, navigate, userInfo])

    const attendHandler = () => {
        dispatch(attendSchedule(myschedule))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
                <div>
                    <h1> Schedule: {myschedule._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <h2>Scheduled Lectures</h2>
                                {myschedule.isOutdated ? (
                                    <Message variant='warning'> Is Outdated </Message>
                                ):(
                                    <Message variant='success'> In Progress </Message>
                                )}
                                {myschedule.lectures.length === 0 ? 
                                <Message variant='info'>
                                    No lectures on your Schedule
                                </Message>:(
                                    <ListGroup variant='flush'>
                                        {myschedule.lectures.map((lec, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={lec.image} alt={lec.name} fluid rounded/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link style={{textDecoration:'none'}} to={`/course/${lec.course}`}>{lec.name}</Link>
                                                    </Col>
                                                    <Col md={2}>
                                                        {lec.tutor}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <h2>Student Details</h2>
                                <p><strong>Name: </strong>{myschedule.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${myschedule.user.email}`}>{myschedule.user.email}</a></p>
                            </ListGroup>
                            <ListGroup variant='flush'>
                                <h2>Attendance Preference</h2>
                                <p>  
                                    {myschedule.attendancePreference.attendOffline && <strong>Attending Offline</strong> }
                                    {!myschedule.attendancePreference.attendOffline && <strong>Attending Online</strong>}
                                </p>
                                {myschedule.isAttended ? (
                                    <Message variant='success'> Attended </Message>
                                ):(
                                    <Message variant='warning'> Not Attended </Message>
                                )}
                            </ListGroup>
                            {loadingAttend && <Loader />}
                            {userInfo && userInfo.isAdmin && !myschedule.isAttended && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={attendHandler}
                                    >
                                        Mark As Attended
                                    </Button>
                                </ListGroup.Item>
                            )}
                            <ListGroup variant='flush'>
                                <h2>Vaccination Status</h2>
                                <div>  
                                    {myschedule.attendancePreference.fullyVaccinated && (
                                        <div>
                                            <ListGroup.Item>
                                                <strong>Fully Vaccinated</strong>{' '}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>First Dose: </Col>
                                                    <Col>
                                                        <strong>{myschedule.attendancePreference.firstDoseAt}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Second Dose: </Col>
                                                    <Col>
                                                        <strong>{myschedule.attendancePreference.secondDoseAt}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </div>
                                    )}
                                    
                                    {myschedule.attendancePreference.partiallyVaccinated && 
                                    !myschedule.attendancePreference.fullyVaccinated && (
                                        <div>
                                            <ListGroup.Item>
                                                <strong>Partially Vaccinated</strong>{' '}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>First Dose: </Col>
                                                    <Col>
                                                        <strong>{myschedule.attendancePreference.firstDoseAt}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </div>
                                    )}
                                    
                                    {!myschedule.attendancePreference.partiallyVaccinated && 
                                    !myschedule.attendancePreference.fullyVaccinated && (
                                        <div>
                                            <ListGroup.Item>
                                                <strong>Not Vaccinated</strong>{' '}
                                            </ListGroup.Item>
                                        </div>
                                    )}
                                </div>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )
}

export default ScheduleDetailsScreen
