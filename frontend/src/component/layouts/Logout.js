import React, { useState } from 'react';
import { BiLogOut, BiHome } from 'react-icons/bi';
import { Col, Row } from 'react-bootstrap';
// import Home from '../pages/Home';
import { Link, Redirect } from 'react-router-dom';

export default function Logout() {

    const [redirect, setRedirect] = useState(false);

    const logout = async () => {
        await fetch(`http://localhost:3001/logout`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            credentials: 'include'
        })
        setRedirect(true);
        window.location.reload(false);
    }


    if (redirect) {
        return <Redirect to='/' />
    }
  

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }} >
            <Row>
                <Col>
                    <div type='button' onClick={logout}>
                        <Row>
                            <BiLogOut size={30} />
                        </Row>
                        <Row>
                            Logout
                        </Row>
                    </div>
                </Col>
                <div style={{ padding: '30px' }}></div>
                <Col>
                    <div type='button'>
                        <Link to='/'>
                        <Row>
                            <BiHome size={30} />
                        </Row>
                        <Row>
                            Home
                        </Row>
                        </Link>
                        
                    </div>
                </Col>
            </Row>
        </div>
    )
}