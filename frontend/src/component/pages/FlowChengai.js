import React, { useState } from 'react'
import Axios from 'axios'
import { Card, Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
// import Axios from 'axios';
// import '../Layouts.css';
import ReactExport from 'react-data-export';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


export default function FlowChengai() {

    const [selectdataList, setSelectdataList] = useState([]);
    const [EXP_ID, SetEXP_ID] = useState("");

    // const getSelect = () => {
    //     Axios.get('http://localhost:3001/select').then((response) => {
    //         setSelectdataList(response.data)
    //         console.log('Main',props.select)
    //     })
    // }

    const getSelect = () => {
        Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
            setSelectdataList(response.data);
        })
    }
    const DataSet = [
        {
            columns: [
                { title: 'EXP_ID', style: { font: { sz: '18', bold: true } }, width: { wpx: 125 } },
                { title: 'BLD_INTENT_AUTHOR', style: { font: { sz: '18', bold: true } }, width: { wpx: 130 } },
                { title: 'BLD_INTENT_TEAM', style: { font: { sz: '18', bold: true } }, width: { wpx: 100 } },
                { title: 'HGA_QTY', style: { font: { sz: '18', bold: true } }, width: { wpx: 100 } },
                { title: 'WAF_EXP_CODE_DESCR', style: { font: { sz: '18', bold: true } }, width: { wpx: 200 } },
                { title: 'WAF_EXP_CODE', style: { font: { sz: '18', bold: true } }, width: { wpx: 125 } },
                { title: 'WAF_CODE', style: { font: { sz: '18', bold: true } }, width: { wpx: 100 } },
            ],
            data: selectdataList.map((data) => [
                { value: data.EXP_ID, style: { font: { sz: '14' } } },
                { value: data.BLD_INTENT_AUTHOR, style: { font: { sz: '14' } } },
                { value: data.BLD_INTENT_TEAM, style: { font: { sz: '14' } } },
                { value: data.HGA_QTY, style: { font: { sz: '14' } } },
                { value: data.WAF_EXP_CODE_DESCR, style: { font: { sz: '14' } } },
                { value: data.WAF_EXP_CODE, style: { font: { sz: '14' } } },
                { value: data.WAF_CODE, style: { font: { sz: '14' } } },
            ])
        }
    ]

    return (

        <div style={{ marginTop: '6%' }}>
            <Row>
                <Col></Col>
                <Col md={11}><h3>Create Build Flow</h3></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ width: '18rem', marginTop: '3%' }}>
                        <Card.Header style={{ backgroundColor: '#c6ff00', fontWeight: 'bold' }}>No BIN.</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter No BIN."
                                        onChange={(event) => {
                                            SetEXP_ID(event.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Button variant="outline-success" onClick={getSelect}>Success</Button>
                    </Card>
                </Col>
                <Col></Col>
            </Row>

            {selectdataList.length !== 0 ? (
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
                                {selectdataList.map((val, key=0) => {
                                    return (
                                        <tbody>
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
                            <ExcelFile
                                filename="Test-Auto"
                                element={<button type='button' className='btn btn-success float-right' style={{ marginTop: '20px' }}>Export Data</button>}
                            >
                                <ExcelSheet dataSet={DataSet} name="FTD Automated Buildflow" />
                            </ExcelFile>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            ) : null}
        </div>
    )
}
