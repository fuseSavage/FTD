import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Card, Col, Form, Table } from 'react-bootstrap';

// import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function L_Slider_SDET(props) {
    const { datalist } = props;
    const [EXP_ID, SetEXP_ID] = useState("");
    const [selectdataList, setSelectdataList] = useState([]);
    const [value, setValue] = useState('');


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

    const [type, setTYPE] = useState("PRIME BUILD");
    const handleSelectType = (e) => {
        setTYPE(e.target.value)
    }
    const [persurface, setPersurface] = useState(500)
    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')
    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }
    const [testON, setTestON] = useState('')
    const [media, setMedia] = useState()

    return (

        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow AMA L-Slider SDET</h3>

                <Container>
                    <Col>
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
                </Container>

                {selectdataList.length !== 0 ? (
                    <Container>
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




                        <div style={{ marginTop: '20px' }}>
                            <p>BUILD TYPE :
                        <select value={type} onChange={handleSelectType} >
                                    <option value="PRIME BUILD">PRIME BUILD</option>
                                    <option value="WSAT">WSAT</option>
                                    <option value="DVT Retest">DVT Retest</option>
                                </select>
                            </p>

                            <p>Set Per surface :
                        <input type="number" value={persurface} onChange={(event) => {
                                    setPersurface(event.target.value);
                                }} style={{ width: '100px' }} />
                            </p>

                            <p>SW/FW :
                        <select value={newswfw} onChange={handleSelectSWFW} >
                                    <option value='4.51B213/SHF 1.6.1.246'>4.51B213 / SHF 1.6.1.246</option>
                                    <option value='WITE4.51B121/SHF 1.6.1.187'>WITE4.51B121 / SHF 1.6.1.187</option>
                                    <option value='SW4.51B121/SHF 1.6.1.161'>SW4.51B121 / SHF 1.6.1.161</option>
                                    <option value='WITE450B901/SHF1.6.1.141'>WITE450B901 / SHF1.6.1.141</option>
                                </select>
                            </p>

                            <p>ทำการ Test บน เครื่อง
                        <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} style={{ width: '350px' }} />
                            </p>
                            <p>2) Media <input type="number" value={media} onChange={(event) => {
                                setMedia(event.target.value);
                            }} style={{ width: '100px' }} />
                            </p>

                            <ReactQuill theme="snow" value={value} onChange={setValue} />


                        </div>
                    </Container>

                ) : null}
            </Container>
        </div>
    )
}