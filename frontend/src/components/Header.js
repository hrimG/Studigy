import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
//import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header>
           <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                
                    {/* <Navbar.Brand href="/">STUDIGY</Navbar.Brand> */}
                    <Link to='/' className='navbar-brand'>STUDIGY</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="/courses"><i className="fas fa-book-open"></i> Courses</Nav.Link> */}
                            <Link to='/courses' className='nav-link'><i className="fas fa-book-open"></i> Courses</Link>

                            {/* <Nav.Link href="/login"><i className=" fa fa-user"></i> Login</Nav.Link> */}
                            <Link to='/login' className='nav-link'><i className=" fa fa-user"></i> Login</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
