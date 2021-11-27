import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SchedulingSteps({ step1, step2, step3}) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <Link to='/login' className='nav-link'>Login</Link>
                ): (
                    <Link to='/login' className='nav-link disabled'>Login</Link>
                )}
                
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Link to='/login/attendance' className='nav-link'>Attendance</Link>
                ): (
                    <Link to='/login/attendance' className='nav-link disabled'>Attendance</Link>
                )}
                
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Link to='/confirmation' className='nav-link'>Confirmation</Link>
                ): (
                    <Link to='/confirmation' className='nav-link disabled'>Confirmation</Link>
                 )}
                
            </Nav.Item>
        </Nav>
    )
}

export default SchedulingSteps
