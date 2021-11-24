import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
//import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
           <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to='/' className='navbar-brand'>STUDIGY</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="/courses"><i className="fas fa-book-open"></i> Courses</Nav.Link> */}
                            <Link to='/schedule' className='nav-link'><i className="fas fa-calendar"></i> Schedule</Link>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item>
                                        <Link to='/profile' className='nav-link'>Profile</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                <Link to='/login' className='nav-link'><i className=" fa fa-user"></i> Login</Link>
                            )}

                            {/* <Nav.Link href="/login"><i className=" fa fa-user"></i> Login</Nav.Link> */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <NavDropdown.Item>
                                        <Link to='/admin/userlist' className='nav-link'>Users</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to='/admin/courselist' className='nav-link'>Courses</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to='/admin/schedulelist' className='nav-link'>Schedules</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
