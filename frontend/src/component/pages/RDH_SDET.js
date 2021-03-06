import React, { useState } from 'react'
import Axios from 'axios'
import { Card, Button, Col, Container, Form, Table } from 'react-bootstrap'
import { TiInputChecked } from 'react-icons/ti';
// import ReactExport from 'react-data-export';
// import { Link } from 'react-router-dom';
// import Flow_RDH_RO from './Flow_RDH_RO';

// import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
export default function RDH_SDET(props) {
    const { datalist, swfw2 } = props;
    const [selectdataList, setSelectdataList] = useState([]);
    const [EXP_ID, SetEXP_ID] = useState("");
    const [expid2, setExpid2] = useState("")

    const [value, setValue] = useState('');

    const [qty_sum, setQty_Sum] = useState();

    const [sets0, setSets0] = useState('');
    const [sets1, setSets1] = useState('');
    const [slider0, setSlider0] = useState('');
    const [slider1, setSlider1] = useState('');

    const getSelect = () => {
        if (datalist) {
            Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
                setSelectdataList(response.data);
                setExpid2(EXP_ID)
            })
        } else {
            console.log("data NO NO");
            window.location.reload(false);
        }
        if (selectdataList) {
            selectdataList.forEach((e) => {
                if (e.SDET_TAB === "0") {
                    setSets0(e.SDET_SETS_PARTNUM)
                    setSlider0(e.PARTNUM)
                }
                if (e.SDET_TAB === "1") {
                    setSets1(e.SDET_SETS_PARTNUM)
                    setSlider1(e.PARTNUM)
                }
            });

            const valuesqty = [...inputFieldQTY];
            const Nqty = inputFieldQTY.map(Number);
            for (let i = 0; i < selectdataList.length; i++) {

                valuesqty[i] = selectdataList[i].HGA_QTY;
                setinputFieldQTY(valuesqty);

                if (Nqty[i] > 1) {
                    sum_qty = sum_qty + Nqty[i];
                }
            }
            setQty_Sum(sum_qty)
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


    const [allQTY, setAllQTY] = useState([])
    const [allWOF, setAllWOF] = useState([])
    const [allWOF_0, setAllWOF_0] = useState([])

    const handleInputAll = (event) => {
        const valuesall = [...allQTY];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall[i] = event.target.value
            setAllQTY(valuesall);
        }
    }

    const handleInputAllWOF = (event) => {
        const defaultWOF = [...allWOF_0];
        const valuesall_WOF = [...allWOF];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall_WOF[i] = event.target.value
            defaultWOF[i] = "0";
            setAllWOF(valuesall_WOF)
            setAllWOF_0(defaultWOF);
            // all.push(event.target.value)
        }
    }
    const useClickQTY = () => {
        setinputFieldQTY(allQTY)
    }
    const useClickWOF = () => {
        setinputFieldWOF(allWOF);
    }
    // const set_0_WOF = () => {
    //     setinputFieldWOF(allWOF_0);
    // }
    // const useClickClear = () => {
    //     setSdet_BO("");
    // }

    const [action, setAction] = useState();

    let sum_qty = 0;
    let no_Bo = 0;

    const [newbuildType, setNewbuildType] = useState();
    const [newpersurface, setNewpersurface] = useState();
    const [sw, setSW] = useState();
    const [fw, setfw] = useState();
    const [newtestON, setNewtestON] = useState();
    const [newmedia, setNewmedia] = useState();

    const preview = () => {
        setNewmedia(media)
        setNewtestON(testON)
        setSW(swfw[0])
        setfw(swfw[1])
        setNewpersurface(persurface)
        setNewbuildType(type)
        setAction(true)

        console.log('data', selectdataList)
        console.log('datainput', datainput)
        setAction(
            <TabResult />
        )

        const Nqty = inputFieldQTY.map(Number);
        // console.log(Nqty)
        for (let i = 0; i < inputFieldQTY.length; i++) {
            if (Nqty[i] > 1) {
                sum_qty = sum_qty + Nqty[i];

                no_Bo = no_Bo + 1
            }
        }
        setQty_Sum(sum_qty)
        // console.log(sum_qty)
        // const valuesall_WOF = [...datahave_qty];
        // for (let i=0; i < selectdataList.length; i++) {
        //     // console.log(selectdataList[i].HGA_BO)
        //     if (inputFieldQTY[i] != 0 && inputFieldQTY[i] != null) {

        //         setDatahave_QTY(selectdataList[i])
        //     }
        // }

    }
    const datainput = [{
        qty: inputFieldQTY,
        wof: inputFieldWOF,
        buildType: type,
        persurface: persurface,
        sw: swfw[0],
        fw: swfw[1],
        testON: testON,
        media: media,
    }]

    const TabResult = () => {
        return (
            <Container style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Table hover style={{ width: '280px', border: '2px solid black' }}>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>Bin</strong></td>
                        <td>{selectdataList[0].EXP_ID}</td>
                    </tbody>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>Product</strong></td>
                        <td>{selectdataList[0].BLD_INTENT_PLATFORM}</td>
                    </tbody>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>Bin QTY</strong></td>
                        <td>{sum_qty}</td>
                    </tbody>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>No. BO</strong></td>
                        <td>{no_Bo}</td>
                    </tbody>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>No. surface</strong></td>
                        <td>????</td>
                    </tbody>
                    <tbody style={{ border: '2px solid black' }}>
                        <td style={{ backgroundColor: '#8ED1FC' }}><strong>Unit per. surface</strong></td>
                        <td>{persurface}</td>
                    </tbody>
                </Table>
            </Container>
        )
    }


    // const insertData = () => {
    //     Axios.post(`http://localhost:3001/pushflow`, {
    //         data: selectdataList,
    //         name: datalist
    //     })
    //     console.log('gg.gg', aa)
    //     // window.location.reload(false);
    // }


    return (

        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow RDH SDET</h3>
                {sets0.length === 0 ? (
                    <Container>
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
                    </Container>
                ) : null}


                {selectdataList.length && (sets0.length || sets1.length) !== 0 ? (
                    <Container style={{ marginBottom: '5%', marginTop: '5%' }}>

                        <div>
                            <Table hover style={{ width: '300px', border: '2px solid black' }}>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ width: '140px', backgroundColor: '#8ED1FC' }}><strong>BIN</strong></td>
                                    <td style={{ border: '2px solid black' }}><input type="text" value={expid2} onChange={(event) => {
                                        setExpid2(event.target.value);
                                    }} style={{ width: '140px' }} /></td>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Table responsive hover style={{ width: '300px', border: '2px solid black' }}>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>TAB</strong></td>
                                    <td style={{ border: '2px solid black' }}>Up-01</td>
                                    <td style={{ border: '2px solid black' }}>Dn-00</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>SETS J1.1 P/N</strong></td>
                                    <td style={{ border: '2px solid black' }}>{sets1}</td>
                                    <td style={{ border: '2px solid black' }}>{sets0}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>Slider P/N</strong></td>
                                    <td style={{ border: '2px solid black' }}>{slider1}</td>
                                    <td style={{ border: '2px solid black' }}>{slider0}</td>
                                </tbody>
                            </Table>

                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>

                        <div>
                            <Table hover responsive bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#8ED1FC' }}>
                                    <th>No.</th>
                                    <th>PREFIX</th>
                                    <th>Priority</th>
                                    <th>TAB</th>
                                    <th>SDET_BO</th>
                                    <th>AABdesign</th>
                                    <th>SDET_loding_Q'ty
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
                                    </th>
                                    <th>SDET_Retest_BIN</th>
                                    <th>SDET_Retest_BO</th>
                                    <th>SEQ#Old_BO</th>
                                    <th>WAF_CODE</th>
                                    <th>W/O</th>
                                    <th>Work_Oder_File
                                        <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                    </th>
                                    <th>SAAM_TSR</th>
                                    <th>ET_TSR</th>
                                    <th>TMWI_ET</th>
                                    <th>Build_Num_ET</th>
                                    <th>ET_S/W</th>
                                    <th>ET_F/W</th>
                                </thead>

                                <tbody>
                                    {selectdataList.map((val, index) => {
                                        let newT;
                                        if (val.SDET_TAB === '0') {
                                            newT = 'Dn-00'
                                        } 
                                        if (val.SDET_TAB === '1') {
                                            newT = 'Up-00'
                                        }
                                        return (
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
                                                }} style={{ width: '100px' }} />
                                                </td>
                                                <td>column?</td>
                                                <td>{val.SDET_BN}</td>
                                                <td>{val.SLD_BO}</td>
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
                                                <td>{sw}</td>
                                                <td>{fw}</td>

                                                {/* <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                    handleInputWOF(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />.wo */}

                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <th>{qty_sum}</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        {/* <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={insertData}>Insert Data</Button> */}
                        {/* <ExcelFile
                                filename="Test-Auto"
                                element={<button type='button' className='btn btn-success float-right' style={{ marginTop: '20px' }}>Export Data</button>}
                            >
                                <ExcelSheet dataSet={DataSet} name="FTD Automated Buildflow" />
                            </ExcelFile> */}

                        <div style={{ marginTop: '20px' }}>
                            <p>BUILD TYPE :
                            <select value={type} onChange={handleSelectType} >
                                    <option value="PRIME BUILD">PRIME BUILD</option>
                                    <option value="WSAT">WSAT</option>
                                    <option value="DVT Retest">DVT Retest</option>
                                </select>
                            </p>

                            <p>Set HGA BO Per surface :
                            <input type="number" value={persurface} onChange={(event) => {
                                    setPersurface(event.target.value);
                                }} style={{ width: '100px' }} />
                            </p>

                            <p>SW/FW :
                                <select value={newswfw} onChange={handleSelectSWFW} >
                                    {swfw2.map((val, index) => {
                                        return (
                                            <option value={val.swfw}>{val.swfw}</option>
                                        )
                                    })}
                                </select>
                            </p>

                            <p>1) Build flow ?????????????????? Test ????????? {selectdataList.length} BOs ??????????????? RO-02359 ?????? ??????????????? Test ?????? ?????????????????????
                            <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} style={{ width: '500px' }} />
                            </p>

                            <p>- ???????????????????????? test ????????????????????? Surf.
                            <p style={{ marginLeft: '25px' }}><strong>* Surf. ??????????????????????????????????????????????????????????????? test ????????? Tab DN ?????????????????????????????? (Surf. 1, 3, 5, ... )</strong></p>
                                <p style={{ marginLeft: '25px' }}><strong>* Surf. ??????????????????????????????????????????????????????????????? test ????????? Tab UP ?????????????????????????????? (Surf. 2, 4, 6, ....)</strong></p>
                            </p>

                            <p>2) Media ?????????????????? ???????????????????????? Media <input type="number" value={media} onChange={(event) => {
                                setMedia(event.target.value);
                            }} style={{ width: '100px' }} /> ??????????????? <strong>X</strong> surfaces ??????????????? test ????????? {selectdataList.length} BO. ?????????
                            </p>

                            <p>3) ??????????????????????????????????????????????????????????????? ??????????????? Load media ?????????????????????????????????????????????????????????????????? test ??????????????? ????????????????????????????????? ??????????????????</p>
                            <p>4) ???????????????????????? media scratch</p>
                            <p style={{ marginLeft: '10px' }}>- ????????? test ?????????????????? {'< 80%'} ????????? surf.????????? ???????????????????????? media scratch ?????????????????????????????? media ???????????? retest ???????????? surf.</p>
                            <p style={{ marginLeft: '10px' }}>- ????????? test ?????????????????? {'>='} 80% ????????? surf. ????????? ???????????????????????? media scratch ????????????????????? retest ???????????? surf. ?????????????????????????????? media ???????????? test ?????????????????????????????????????????? 20% ?????????????????? media ????????? test ????????? surf. ?????????????????????????????????</p>
                            <p style={{ marginLeft: '10px' }}>- ????????? ???????????? BIN WSAT ???????????????????????? media scratch ????????????????????? retest ?????????????????????????????? media ???????????? test ????????????????????????????????????</p>
                            <p style={{ marginLeft: '10px' }}>- wDVT Retest BIN ????????????????????? retest ?????????????????????????????? media surface ???????????? test ?????????????????????????????????</p>
                            <p style={{ marginLeft: '10px' }}><strong> ??????. 80% ????????? surf. ??????????????????????????????????????????????????????????????????????????? tray ????????? row > Minimum BOLA tray require / surface</strong></p>
                            <p style={{ marginLeft: '10px' }}>5) ????????????????????? test ??????????????? ???????????? ??????????????? Sort ????????????????????????????????? BOs ????????? complete ??????????????? BOs ????????? Label print (Completed HOLD)</p>
                            
                            <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={preview}>preview</Button>
                        </div>

                        <div>
                            {action}
                        </div>

                    </Container>
                ) : null}
            </Container>
        </div>
    )
}