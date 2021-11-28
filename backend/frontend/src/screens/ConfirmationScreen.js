import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import SchedulingSteps from '../components/SchedulingSteps'
import { createSchedule } from '../actions/scheduleCreateActions'
import { SCHEDULE_CREATE_RESET } from '../constants/scheduleConstants'

function ConfirmationScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const scheduleCreate = useSelector(state => state.scheduleCreate)
    const {myschedule, error, success} = scheduleCreate

    const schedule = useSelector(state => state.schedule)

    if (schedule.attendancePreference.fullyVaccinated && 
        (!schedule.attendancePreference.firstDoseAt || 
            !schedule.attendancePreference.secondDoseAt)) {
        navigate('/login/attendance')
    }
    if (schedule.attendancePreference.partiallyVaccinated && 
        !schedule.attendancePreference.firstDoseAt) {
        navigate('/login/attendance')
    }

    useEffect(() => {
        if(success){
            navigate(`/myschedule/${myschedule._id}`)
            dispatch({ type:SCHEDULE_CREATE_RESET })
        }
    }, [success, dispatch, navigate, myschedule])

    const confirm = () => {
        dispatch(createSchedule({
            lectures: schedule.scheduledLectures,
            attendancePreference: schedule.attendancePreference,

        }))
    }
    return (
        <div>
            <SchedulingSteps step1 step2 step3/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <h2>Scheduled Lectures</h2>
                        {schedule.scheduledLectures.length === 0 ? 
                        <Message variant='info'>
                            You have not added any lectures to your Schedule
                        </Message>:(
                            <ListGroup variant='flush'>
                                {schedule.scheduledLectures.map((lec, index) => (
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
                                            <Col md={2}>
                                                Lecture No: {lec.lecs}
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
                        <h2>Attendance Preference</h2>
                        <p>  
                            {schedule.attendancePreference.attendOffline && <strong>Attending Offline</strong> }
                            {!schedule.attendancePreference.attendOffline && <strong>Attending Online</strong>}
                        </p>
                    </ListGroup>
                    <ListGroup variant='flush'>
                        <h2>Vaccination Status</h2>
                        <div>  
                            {schedule.attendancePreference.fullyVaccinated && (
                                <div>
                                    <ListGroup.Item>
                                        <strong>Fully Vaccinated</strong>{' '}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>First Dose: </Col>
                                            <Col>
                                                <strong>{schedule.attendancePreference.firstDoseAt}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Second Dose: </Col>
                                            <Col>
                                                <strong>{schedule.attendancePreference.secondDoseAt}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </div>
                            )}
                            
                            {schedule.attendancePreference.partiallyVaccinated && 
                            !schedule.attendancePreference.fullyVaccinated && (
                                <div>
                                    <ListGroup.Item>
                                        <strong>Partially Vaccinated</strong>{' '}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>First Dose: </Col>
                                            <Col>
                                                <strong>{schedule.attendancePreference.firstDoseAt}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </div>
                            )}
                            
                            {!schedule.attendancePreference.partiallyVaccinated && 
                            !schedule.attendancePreference.fullyVaccinated && (
                                <div>
                                    <ListGroup.Item>
                                        <strong>Not Vaccinated</strong>{' '}
                                    </ListGroup.Item>
                                </div>
                            )}
                        </div>
                    </ListGroup>
                    <ListGroup variant='flush'>

                        <ListGroup.Item className='align-center'>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item className='align-center'>
                            <Col md={3}>
                            <Button
                                type='button'
                                className='btn-block my-3 align-center'
                                disabled={schedule.scheduledLectures ===0}
                                onClick={confirm}
                            >
                                Confirm
                            </Button>
                            </Col>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ConfirmationScreen
