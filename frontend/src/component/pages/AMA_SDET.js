import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Card, Col, Form, Table } from 'react-bootstrap';

export default function AMA_SDET(props) {
    const { datalist } = props;
    const [EXP_ID, SetEXP_ID] = useState("");
    const [selectdataList, setSelectdataList] = useState([]);
    

    const getSelect = () => {
        if (datalist) {
            Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
                setSelectdataList(response.data);

            })
        } else {
            window.location.reload(false);
        }
        console.log(selectdataList)
    }

    return (

        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow AMA SDET</h3>

                <Col></Col>
                <Col md={10}>
                    <div>
                        <Card style={{ width: '18rem', marginTop: '1%' }}>
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
                    </div>
                </Col>
                <Col></Col>

                {selectdataList.length !== 0 ? (
                    <div style={{ marginBottom: '5%', marginTop: '5%' }}>
                        <Table responsive hover style={{ width: '300px', border: '2px solid black' }}>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>BIN</strong></td>
                                <td style={{ border: '2px solid black' }}>{EXP_ID}</td>
                            </tbody>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>Product</strong></td>
                                <td style={{ border: '2px solid black' }}>HAMR AMA</td>
                            </tbody>
                        </Table>
                    </div>

                ) : null}

            </Container>
        </div>
    )
}