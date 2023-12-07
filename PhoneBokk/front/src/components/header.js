import React from 'react'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function Header() {
    return (
        <>
                <div className="head">
            <Container fluid>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/'>Sign In</Link>
                    <Link to='/contact'>Contact</Link>
            </Container>
                </div>
        </>
    )
}

export default Header