import React from 'react'
import { Container, Col, Row} from 'react-bootstrap'



export const Header = ( {onLoginPress, onRegisterPress}) => {


    return (
        <header className='header'>
            <Container fluid>
            <Row>
            <Col lg={8} className='d-none d-lg-block'>
                <div className='container-box'>
                    <h1 className='font-size: 54px; width:80%; allign-middle'> Game Item Tradesite</h1>
                </div>
            </Col>
            <Col lg={4}  sm={12}>
              <Container className='container-box' fluid>
                <Row>
                    { localStorage["isLoggedIn"] === undefined || localStorage["isLoggedIn"] === false ? 
                    (<><Col lg={12} sm={6}><h3>You're currently not logged in.</h3></Col>
                    <Col lg={6} sm={3} ><button className='btn' onClick={onLoginPress}>Login</button></Col>
                    <Col lg={6} sm={3} ><button className='btn' onClick={onRegisterPress}>Register</button></Col></>)
                    : (
                    <>
                      <Col lg={12} sm={6}><h4>You're currently logged in as: <b><i>{localStorage["username"]}</i></b></h4></Col>
                      <Col lg={12} sm={6} ><h4><i>UserId:</i> <b>{localStorage["userId"]}</b></h4></Col>
                      <Col lg={12} sm={6}><p><i>Roles:</i> RegisteredCustomer{localStorage["role"] === 'Admin' ? (<>,<b> Admin</b></>):(<></>)}</p></Col>
                      <Col lg={12} sm={6} ><button className='btn' onClick={() => {localStorage.clear();
                                                                                   localStorage.clear();
                                                                                   localStorage.clear();
                                                                                   window.location.replace('/');}}>Logout</button></Col>
                    </>)
                    }
                </Row>
                </Container>

            </Col>
            </Row>
            <Row>
            </Row>
            </Container>

            
           </header>
    )
}

export default Header;
