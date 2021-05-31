import React, { useState } from 'react'
import Axios from 'axios'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Card, Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import ReactExport from 'react-data-export';
import { Link } from 'react-router-dom';
// import Flow_RDH_RO from './Flow_RDH_RO';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;



export default function RDH_SDET(props) {
    const { datalist } = props;

    const [EXP_ID, SetEXP_ID] = useState("");

    const [expid2, setExpid2] = useState("")
    // const [aa, setAA] = useState([])

    // const [newTab, setNewTab] = useState([])


    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')
    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }



    const [inputFieldQTY, setinputFieldQTY] = useState([])
    const handleInputQTY = (index, event) => {
        const valuesqty = [...inputFieldQTY];
        valuesqty[index] = event.target.value;
        setinputFieldQTY(valuesqty);
    };

    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const valueswof = [...inputFieldWOF];
        valueswof[index] = event.target.value;
        setinputFieldWOF(valueswof);
    };

    // const [bin, setBin] = useState('');

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

    // const insertData = () => {
    //     Axios.post(`http://localhost:3001/pushflow`, {
    //         data: selectdataList,
    //         name: datalist
    //     })
    //     console.log('gg.gg', aa)
    //     // window.location.reload(false);
    // }

    // const datainput = [{
    //     qty: inputFieldQTY,
    //     wof: inputFieldWOF,
    //     buildType: type,
    //     persurface: persurface,
    //     swfw: swfw,
    //     testON: testON,
    //     media: media,
    // }]

    const preview = () => {
        // console.log(datainput[0])
        console.log(selectdataList)
        // return (
        //     <Flow_RDH_RO datainput={datainput} />
        // )

    }

    return (

        <div style={{ marginTop: '6%' }}>
            <Row>
                <Col></Col>
                <Col md={11}><h3>Create Build Flow RDH SDET</h3></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
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
                                            setExpid2(event.target.value);
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

                    <Col sm={12}>
                        <Table hover style={{ width: '300px', border: '2px solid black' }}>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ width: '140px', backgroundColor: '#8ED1FC' }}><strong>BIN</strong></td>
                                <td style={{border: '2px solid black'}}><input type="text" value={expid2} onChange={(event) => {
                                    setExpid2(event.target.value);
                                }} style={{ width: '140px' }} /></td>
                            </tbody>
                        </Table>
                        <Table responsive hover style={{ width: '300px', border: '2px solid black' }}>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>TAB</strong></td>
                                <td style={{border: '2px solid black'}}>Up-01</td>
                                <td style={{border: '2px solid black'}}>Dn-00</td>
                            </tbody>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>SETS J1.1 P/N</strong></td>
                                <td style={{border: '2px solid black'}}>731264300</td>
                                <td style={{border: '2px solid black'}}>731264300</td>
                            </tbody>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>Slider P/N</strong></td>
                                <td style={{border: '2px solid black'}}>100851462</td>
                                <td style={{border: '2px solid black'}}>100851463</td>
                            </tbody>
                        </Table>

                        <Table responsive hover bordered>
                            <thead style={{ backgroundColor: 'yellow' }}>
                                <th>No.</th>
                                <th>PREFIX</th>
                                <th>Priority</th>
                                <th>TAB</th>
                                <th>SDET_BO</th>
                                <th>AABdesign</th>
                                <th>SDET_loding_Q'ty</th>
                                <th>SDET_Retest_BIN</th>
                                <th>SDET_Retest_BO</th>
                                <th>SEQ#Old_BO</th>
                                <th>WAF_CODE</th>
                                <th>W/O</th>
                                <th>Work_Oder_File</th>
                                <th>SAAM_TSR</th>
                                <th>ET_TSR</th>
                                <th>TMWI_ET</th>
                                <th>Build_Num_ET</th>
                                <th>ET_S/W</th>
                                <th>ET_F/W</th>
                            </thead>
                            {selectdataList.map((val, index) => {
                                let newT;
                                if (val.SDET_TAB[index] === '0') {
                                    newT = 'Dn-00'
                                } else {
                                    newT = 'Up-01'
                                }
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{val.SDET_BUILDGROUP}</td>
                                            <td>{val.SDET_PRIORITY}</td>
                                            <td>{newT}</td>
                                            <td>{val.SDET_BN}</td>
                                            <td>{val.AIRBEARINGDESIGN}</td>
                                            <td><input type="number" value={inputFieldQTY[index]} onChange={event => {
                                                handleInputQTY(
                                                    index,
                                                    event
                                                );
                                            }} style={{ width: '100px' }} /></td>
                                            <td>column?</td>
                                            <td>{val.SDET_RETEST_BUILD_NUMBER}</td>
                                            <td>Column?</td>
                                            <td>{val.WAF_CODE}</td>
                                            <td>{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}{newT[0]}</td>
                                            <td>{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}{newT[0]}-
                                            <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                    handleInputWOF(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />.wo</td>
                                            <td>{val.TSR_PN_G_SAAM}</td>
                                            <td>{val.SDET_ET_TSR}</td>
                                            <td>{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}</td>
                                            <td>{val.SDET_BN}</td>
                                            <td>Select Dropdown</td>
                                            <td>Select Dropdown</td>

                                            {/* <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                    handleInputWOF(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />.wo */}

                                        </tr>
                                    </tbody>
                                )
                            })}
                        </Table>
                        {/* <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={insertData}>Insert Data</Button> */}
                        {/* <ExcelFile
                                filename="Test-Auto"
                                element={<button type='button' className='btn btn-success float-right' style={{ marginTop: '20px' }}>Export Data</button>}
                            >
                                <ExcelSheet dataSet={DataSet} name="FTD Automated Buildflow" />
                            </ExcelFile> */}


                    </Col>

                    <div style={{ marginTop: '20px' }}>
                    <p>SW/FW :
                        <select value={newswfw} onChange={handleSelectSWFW} >
                                <option value='4.51B213/SHF 1.6.1.246'>4.51B213 / SHF 1.6.1.246</option>
                                <option value='WITE4.51B121/SHF 1.6.1.187'>WITE4.51B121 / SHF 1.6.1.187</option>
                                <option value='SW4.51B121/SHF 1.6.1.161'>SW4.51B121 / SHF 1.6.1.161</option>
                                <option value='WITE450B901/SHF1.6.1.141'>WITE450B901 / SHF1.6.1.141</option>
                            </select>
                        </p>
                    </div>
                    <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={preview}>preview</Button>

                    

                </Container>
            ) : null}

        </div>
    )
}