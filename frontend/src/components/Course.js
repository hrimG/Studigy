import React from 'react'
import { Card } from 'react-bootstrap'
import Difficulty from './Difficulty'
import { Link } from 'react-router-dom'
function Course({ course }) {
    return (
        <Card className="p-3 rounded h-100">
            <Link to={`/course/${course._id}`}>
                <Card.Img src ={course.image} />
            </Link>

            <Card.Body>
                <Link style={{textDecoration:'none'}} to={`/course/${course._id}`}>
                    <Card.Title as="div">
                        <strong className="text-uppercase">{course.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Difficulty value={course.difficulty} text={`${course.numComments} comments`} color={'#fde825'} />
                    </div>
                </Card.Text>
                <Card.Text as="h5">
                    {course.tutor}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Course
