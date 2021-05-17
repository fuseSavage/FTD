import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Card, Button, Col, Container, Form, Row, Table } from 'react-bootstrap'


export default function DataFlow() {

    
    const [datalist, setDatalist] = useState([]);

    const getSelect = () => {
        Axios.get('http://localhost:3001/dataflow').then((response) => {
            setDatalist(response.data)
            console.log('Main', datalist)
        })
    }

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }} >
        
            <Button variant="outline-success" onClick={getSelect}>ShowData</Button>
        </div>
        <div>
            {datalist.length !== 0 ? (
                <Container style={{ marginBottom: '5%', marginTop: '5%' }}>
                    <Row>
                        <Col></Col>
                        <Col xs={11}>

                            <Table responsive hover>
                                <thead style={{ backgroundColor: 'yellow' }}>
                                    <th>EXP_ID</th>
                                    <th>BLD_INTENT_AUTHOR</th>
                                    <th>BLD_INTENT_TEAM</th>
                                    <th>QTY</th>
                                    <th>WAF_EXP_CODE_DESCR</th>
                                    <th>WAF_EXP_CODE</th>
                                    <th>WAF_CODE</th>
                                </thead>
                                {datalist.map((val) => {
                                    return (
                                        <tbody key={val.SLD_BO_ID}>
                                            <tr>
                                                <td>{val.EXP_ID}</td>
                                                <td>{val.BLD_INTENT_AUTHOR}</td>
                                                <td>{val.BLD_INTENT_TEAM}</td>
                                                <td>{val.HGA_QTY}</td>
                                                {/* <td><input type="number" name="name" style={{ width: '60px' }} /></td> */}
                                                <td>{val.WAF_EXP_CODE_DESCR}</td>
                                                <td>{val.WAF_EXP_CODE}</td>
                                                <td>{val.WAF_CODE}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </Table>
                            

                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            ) : null}
        </div>
        </div>
    )

}