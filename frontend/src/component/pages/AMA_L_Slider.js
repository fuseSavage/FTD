import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Card, Col, Form } from 'react-bootstrap';

export default function AMA_L_Slider(props) {
    const { datalist } = props;
    const [EXP_ID, SetEXP_ID] = useState("");
    const [selectdataList, setSelectdataList] = useState([]);

    const getSelect = () => {
        if (datalist) {
            Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
                setSelectdataList(response.data);
            })
        } else {
            console.log("data NO NO");
            window.location.reload(false);
        }

        console.log(selectdataList)
    }

    return (

        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow AMA L-Slider</h3>

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
            </Container>
        </div>
    )
}