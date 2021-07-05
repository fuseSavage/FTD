import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Card, Button, Col, Container, Form, Table } from 'react-bootstrap'
// import ReactExport from 'react-data-export';
// import { Link } from 'react-router-dom';
import { TiInputChecked } from 'react-icons/ti';


import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Search from '../layouts/Search';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;



export default function RDH_RO(props) {
    const { datalist, swfw2 } = props;
    const [selectdataList, setSelectdataList] = useState([]);
    const [EXP_ID, SetEXP_ID] = useState("");

    const [value, setValue] = useState('');

    const getSelect = () => {
        if (datalist) {
            Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
                setSelectdataList(response.data);
            })
        } else {
            console.log("data NO NO");
            window.location.reload(false);
        }
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

    // useEffect(()=> {
    //     async function fetchData() {
    //         console.log('fetchData',swfw2)
    //     }
    //     fetchData();
    // }, [])

    
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
    const [sw, setSW] = useState();
    const [fw, setfw] = useState();
    const [newtestON, setNewtestON] = useState();
    const [newmedia, setNewmedia] = useState();

    //    const [wof, setWOF] = useState()
    const [allQTY, setAllQTY] = useState([])
    const [allWOF, setAllWOF] = useState([])
    const [allWOF_0, setAllWOF_0] = useState([])

    const handleInputAll = (event) => {
        const valuesall = [...allQTY];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall[i] = event.target.value
            setAllQTY(valuesall);
            // all.push(event.target.value)
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
    const set_0_WOF = () => {
        setinputFieldWOF(allWOF_0);
    }

    //Start HGA shipment detail//
    const [inputFields1, setinputFieldS1] = useState([])
    const handleInputS1 = (index, event) => {
        const values1 = [...inputFields1];
        values1[index] = event.target.value;
        setinputFieldS1(values1);
    };
    const [inputFields2, setinputFieldS2] = useState([])
    const handleInputS2 = (index, event) => {
        const values = [...inputFields2];
        values[index] = event.target.value;
        setinputFieldS2(values);
    };
    const [inputFields3, setinputFieldS3] = useState([])
    const handleInputS3 = (index, event) => {
        const values = [...inputFields3];
        values[index] = event.target.value;
        setinputFieldS3(values);
    };
    const [inputFields4, setinputFieldS4] = useState([])
    const handleInputS4 = (index, event) => {
        const values = [...inputFields4];
        values[index] = event.target.value;
        setinputFieldS4(values);
    };
    const [inputFields5, setinputFieldS5] = useState([])
    const handleInputS5 = (index, event) => {
        const values = [...inputFields5];
        values[index] = event.target.value;
        setinputFieldS5(values);
    };
    const [inputFields6, setinputFieldS6] = useState([])
    const handleInputS6 = (index, event) => {
        const values = [...inputFields6];
        values[index] = event.target.value;
        setinputFieldS6(values);
    };
    const [inputFields7, setinputFieldS7] = useState([])
    const handleInputS7 = (index, event) => {
        const values = [...inputFields7];
        values[index] = event.target.value;
        setinputFieldS7(values);
    };
    const [inputFields8, setinputFieldS8] = useState([])
    const handleInputS8 = (index, event) => {
        const values = [...inputFields8];
        values[index] = event.target.value;
        setinputFieldS8(values);
    };
    //End HGA shipment detail//


    const [action, setAction] = useState(false);
    let sum_qty = 0;
    let no_Bo = 0;
    let valuesurface = 0;
    let newValues = [];

    const preview = () => {
        setNewmedia(media)
        setNewtestON(testON)
        setSW(swfw[0])
        setfw(swfw[1])
        console.log('data', selectdataList)
        const Nqty = inputFieldQTY.map(Number);
        for (let i = 0; i < inputFieldQTY.length; i++) {
            if (Nqty[i] > 1) {
                sum_qty = sum_qty + Nqty[i];
                no_Bo = no_Bo + 1
            }
        }
        if (sum_qty != 0) {
            valuesurface = Math.ceil(sum_qty / persurface)
        }
        for (let i = 0; i < selectdataList.length; i++) {
            if (inputFieldQTY[i] != 0 && inputFieldQTY[i] != null) {
                newValues.push(selectdataList[i])
            }
        }
        setAction(true);
        // setAction(
        //     <TabResult />
        // )
        // console.log('new', newValues)
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
    const send = () => {
        console.log(inputFields1)
        console.log(inputFields2)
        console.log(inputFields3)
        console.log(inputFields4)
        console.log(inputFields5)
        console.log(inputFields6)
        console.log(inputFields7)
        console.log(inputFields8)
        console.log(inputFieldQTY)
        console.log('datainput', datainput)
    }
    useEffect(() => {
        
    })
    const TabResult = () => {
        return (
            <div>
                {persurface > 0 ? (
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
                                <td>{valuesurface}</td>
                            </tbody>
                            <tbody style={{ border: '2px solid black' }}>
                                <td style={{ backgroundColor: '#8ED1FC' }}><strong>Unit per. surface</strong></td>
                                <td>{persurface}</td>
                            </tbody>
                        </Table>

                        <div>
                            <h6><b>HGA shipment detail</b></h6>
                            <Table hover responsive bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#FD980A' }}>
                                    <th>BO</th>
                                    <th>s1</th>
                                    <th>s2</th>
                                    <th>s3</th>
                                    <th>s4</th>
                                    <th>s5</th>
                                    <th>s6</th>
                                    <th>s7</th>
                                    <th>s8</th>
                                </thead>
                                <tbody>
                                    {newValues.map((val, index) => {
                                        return (
                                            <tr>
                                                <td>{val.HGA_BO}</td>
                                                <td><input type="number" value={inputFields1[index]} onChange={event => {
                                                    handleInputS1(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields2[index]} onChange={event => {
                                                    handleInputS2(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields3[index]} onChange={event => {
                                                    handleInputS3(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields4[index]} onChange={event => {
                                                    handleInputS4(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields5[index]} onChange={event => {
                                                    handleInputS5(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields6[index]} onChange={event => {
                                                    handleInputS6(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields7[index]} onChange={event => {
                                                    handleInputS7(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                                <td><input type="number" value={inputFields8[index]} onChange={event => {
                                                    handleInputS8(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Table>
                                <thead style={{ backgroundColor: '#FD980A' }} >
                                    <th>No</th>
                                    <th>BO</th>
                                    <th>TAB</th>
                                    <th>TSR</th>
                                    <th>BO Qty</th>
                                    <th>Format Media.</th>
                                </thead>
                            </Table>
                        </div>
                        <Button variant="outline-warning" onClick={send} style={{ marginTop: '20px' }}>Send</Button>
                    </Container>
                ) : null}
            </div>
        )
    }

    return (
        <div style={{ marginTop: '6%' }}>
            <div className='container'>
                <h3>Create Build Flow RDH RO</h3>
                {selectdataList.length === 0 ? (
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

                {selectdataList.length !== 0 ? (
                    <div className='container'>
                        <div>
                            <Table responsive hover style={{ width: '280px', border: '2px solid black' }}>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>TAB</strong></td>
                                    <td>{selectdataList[0].PARM_HGA_TAB}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>HGA P/N</strong></td>
                                    <td>{selectdataList[0].HGA_PART_NUM}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>FSA P/N</strong></td>
                                    <td>{selectdataList[0].HGA_SUSPENSION_PN}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>Slider P/N</strong></td>
                                    <td>{selectdataList[0].PARTNUM}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>BLD_INTENT_TYPE</strong></td>
                                    <td>{selectdataList[0].BLD_INTENT_TYPE}</td>
                                </tbody>
                            </Table>

                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                            {/* {Parser(value)} */}
                        </div>

                        <div>
                            <Table hover responsive bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#8ED1FC' }} >
                                    <th>No.</th>
                                    <th>BIN</th>
                                    <th>PREFIX</th>
                                    <th>Priority</th>
                                    <th>TAB</th>
                                    <th>SBR</th>
                                    <th>AABdesign</th>
                                    <th>Qty
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
                                    </th>
                                    <th>SEQ#/OldBO</th>
                                    <th>W/O</th>
                                    <th>WorkOrderFile
                                        <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                        <a type='button' onClick={set_0_WOF} ><u>set 0</u></a>
                                    </th>
                                    <th>TMWI_ET</th>
                                    <th>Build_Num_ET</th>
                                    <th>SAAM TSR</th>
                                    <th>Cl_tsr_pn_i_electric</th>
                                    <th>Media</th>
                                    <th>Tester#</th>
                                    <th>ETS/W</th>
                                    <th>ETF/W</th>
                                    <th>THREE_DIGIT_WAF_CODE</th>
                                    <th> WAFER_INFO</th>
                                </thead>
                                {selectdataList.map((val, index) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{val.EXP_ID}</td>
                                                <td>{val.BUILDGROUP}</td>
                                                <td>{val.SLC_PRIORITY}</td>
                                                <td>{val.PARM_HGA_TAB}</td>
                                                <td>{val.HGA_BO}</td>
                                                <td>{val.AIRBEARINGDESIGN}</td>
                                                <td><input type="number" value={inputFieldQTY[index]} onChange={event => {
                                                    handleInputQTY(
                                                        index,
                                                        event
                                                    );

                                                }} style={{ width: '60px' }} /></td>
                                                <td>{val.SLD_BO}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}-
                                                    <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                        handleInputWOF(
                                                            index,
                                                            event
                                                        );

                                                    }} style={{ width: '60px' }} />.wo</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}</td>
                                                <td>{val.HGA_BO}</td>
                                                <td>{val.TSR_PN_G_SAAM}</td>
                                                <td>Column?</td>
                                                <td>{newmedia}</td>
                                                <td>{newtestON}</td>
                                                <td>{sw}</td>
                                                <td>{fw}</td>
                                                <td>{val.THREE_DIGIT_WAFER_CODE}</td>
                                                <td>-</td>

                                            </tr>
                                        </tbody>
                                    )
                                })}
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

                            <p>1) Build flow สำหรับ Test งาน {selectdataList.length} BOs กลุ่ม RO-02359 จะ ทำการ Test บน เครื่อง
                                <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} style={{ width: '500px' }} />
                            </p>

                            <p>- ลำดับการ test ในแต่ละ Surf.
                                <p style={{ marginLeft: '25px' }}><strong>* Surf. ที่เป็นเลขคี่ให้เริ่ม test จาก Tab DN ให้หมดก่อน (Surf. 1, 3, 5, ... )</strong></p>
                                <p style={{ marginLeft: '25px' }}><strong>* Surf. ที่เป็นเลขคู่ให้เริ่ม test จาก Tab UP ให้หมดก่อน (Surf. 2, 4, 6, ....)</strong></p>
                            </p>

                            <p>2) Media ที่ใช้ เราจะใช้ Media <input type="number" value={media} onChange={(event) => {
                                setMedia(event.target.value);
                            }} style={{ width: '100px' }} /> จำนวน <strong>X</strong> surfaces เพื่อ test งาน {selectdataList.length} BO. นี้
                            </p>

                            <p>3) โปรดใช้ความระมัดระวัง ในการ Load media ให้เป็นไปตามลำดับในการ test ให้ดู ตารางข้อมูล ประกอบ</p>
                            <p>4) กรณีเกิด media scratch</p>
                            <p style={{ marginLeft: '10px' }}>- ถ้า test งานได้ {'< 80%'} ของ surf.ใดๆ แล้วเกิด media scratch ให้เปลี่ยน media แล้ว retest ทั้ง surf.</p>
                            <p style={{ marginLeft: '10px' }}>- ถ้า test งานได้ {'>='} 80% ของ surf. ใดๆ แล้วเกิด media scratch ไม่ต้อง retest ทั้ง surf. ให้เปลี่ยน media แล้ว test งานที่เหลืออีก 20% และใช้ media นี้ test งาน surf. ต่อไปได้เลย</p>
                            <p style={{ marginLeft: '10px' }}>- ถ้า เป็น BIN WSAT กรณีเกิด media scratch ไม่ต้อง retest ให้เปลี่ยน media แล้ว test งานต่อได้เลย</p>
                            <p style={{ marginLeft: '10px' }}>- wDVT Retest BIN ไม่ต้อง retest ให้เปลี่ยน media surface แล้ว test ต่อไปได้เลย</p>
                            <p style={{ marginLeft: '10px' }}><strong> ปล. 80% ของ surf. สามารถดูได้จากตัวเลขจำนวน tray ที่ row > Minimum BOLA tray require / surface</strong></p>
                            <p style={{ marginLeft: '10px' }}>5) หลังจาก test เสร็จ ค่อย ทำการ Sort งานในแต่ล่ะ BOs และ complete แต่ละ BOs ที่ Label print (Completed HOLD)</p>

                            <Button variant="outline-warning" onClick={preview} style={{ marginTop: '20px' }}  >preview</Button>
                        </div>
                        {/* <p><strong> Result is </strong>{type}{' '}{persurface}{' '}{swfw}{' '}{testON}{' '}{media}{' '}{inputFieldQTY}{' '}{inputFieldWOF}</p> */}

                        {/* <Link
                        type='button'
                        to={{
                            pathname: "/flowro",
                            state: { datainput: datainput, dataselect: selectdataList }
                        }}
                    ><Button variant="outline-warning" style={{ marginTop: '20px' }}>Test</Button></Link> */}

                        <div>
                        <TabResult />
                        </div>
                        {/* <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={test}>Test</Button> */}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
