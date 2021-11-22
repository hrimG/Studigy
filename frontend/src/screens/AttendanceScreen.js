import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import SchedulingSteps from '../components/SchedulingSteps'
import { saveAttendancePreference } from '../actions/scheduleActions'

function AttendanceScreen() {
    const navigate = useNavigate();

    const schedule = useSelector(state => state.schedule)
    const { attendancePreference } = schedule

    const dispatch = useDispatch()

    const [attendOffline, setattendOffline ] = useState(attendancePreference.attendOffline)
    const [partiallyVaccinated, setpartiallyVaccinated ] = useState(attendancePreference.partiallyVaccinated)
    const [firstDoseAt, setfirstDoseAt ] = useState(attendancePreference.firstDoseAt)
    const [fullyVaccinated, setfullyVaccinated ] = useState(attendancePreference.fullyVaccinated)
    const [secondDoseAt, setsecondDoseAt ] = useState(attendancePreference.secondDoseAt)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveAttendancePreference({attendOffline, partiallyVaccinated, firstDoseAt, fullyVaccinated, secondDoseAt}))
        navigate('/confirmation')
    }
    return (
        <FormContainer>
            <SchedulingSteps step1 step2/>
            <h1>Attendance Preference</h1>
            <Form onSubmit={submitHandler}>

                <Form.Label>Attendance Mode</Form.Label>
                <div key={`inline-radio-mode`} className="mb-3">
                    <Form.Check
                        inline
                        required
                        label="Online"
                        name="mode"
                        type='radio'
                        id={`inline-radio-1`}
                        checked = { !attendOffline }
                        onChange={()=>setattendOffline(false)}
                    />
                    <Form.Check
                        inline
                        required
                        label="Offline"
                        name="mode"
                        type='radio'
                        id={`inline-radio-2`}
                        checked = { attendOffline }
                        onChange={()=>setattendOffline(true)}
                    />
                </div>

                <Form.Label>Vaccination Status</Form.Label>
                <div key={`inline-radio-status`} className="mb-3">
                    <Form.Check
                        inline
                        required
                        label="Not Vaccinated"
                        name="status"
                        type='radio'
                        id={`inline-radio-1`}
                        checked= { !partiallyVaccinated && !fullyVaccinated} 
                        onChange={()=>{
                            setpartiallyVaccinated(false)
                            setfullyVaccinated(false)
                        }}
                    />
                    <Form.Check
                        inline
                        required
                        label="Partially Vaccinated"
                        name="status"
                        type='radio'
                        id={`inline-radio-1`}
                        checked= { partiallyVaccinated && !fullyVaccinated} 
                        onChange={()=>{
                            setpartiallyVaccinated(true)
                            setfullyVaccinated(false)
                        }}
                    />
                    <Form.Check
                        inline
                        required
                        label="Fully Vaccinated"
                        name="status"
                        type='radio'
                        id={`inline-radio-2`}
                        checked= { fullyVaccinated} 
                        onChange={()=>{
                            setpartiallyVaccinated(true)
                            setfullyVaccinated(true)
                        }}
                    />
                </div>
                
                { partiallyVaccinated && 
                    <div className="col-md-6 mb-3">
                        <Form.Group controlId="firstDoseAt">
                            <Form.Label>Dose 1 Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                required
                                name="firstDoseAt" 
                                placeholder="First Dose Date" 
                                value={firstDoseAt}
                                onChange={(e) => setfirstDoseAt(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                }

                { fullyVaccinated && 
                    <div className="col-md-6 mb-3">
                        <Form.Group controlId="secondDoseAt">
                            <Form.Label>Dose 2 Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                required
                                name="secondDoseAt" 
                                placeholder="Second Dose Date" 
                                value={secondDoseAt}
                                onChange={(e) => setsecondDoseAt(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                }

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default AttendanceScreen
