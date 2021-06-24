import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { TiInputChecked } from 'react-icons/ti';

// import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function RDH_SDET(props) {
    const { datalist, swfw2 } = props;
    const [EXP_ID, SetEXP_ID] = useState("");
    const [expid2, setExpid2] = useState("");
    const [selectdataList, setSelectdataList] = useState([]);
    // const [sdet_dafault, setSdet_Default] = useState([]);

    const [value, setValue] = useState('');

    const [qty_sum, setQty_Sum] = useState();
    const [hga0, setHGA0] = useState('');
    const [hga1, setHGA1] = useState('');
    const [tga0, setTGA0] = useState('');
    const [tga1, setTGA1] = useState('');
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
                if (e.PARM_HGA_TAB === "Down-00") {
                    setHGA0(e.HGA_PART_NUM)
                    setTGA0(e.HGA_SUSPENSION_PN)
                    setSlider0(e.PARTNUM)
                }
                if (e.PARM_HGA_TAB === "Up-01") {
                    setHGA1(e.HGA_PART_NUM)
                    setTGA1(e.HGA_SUSPENSION_PN)
                    setSlider1(e.PARTNUM)
                }
            });
            const valuesall_sdet = [...allQTY];
            const valuesqty = [...inputFieldQTY];
            const Nqty = inputFieldQTY.map(Number);
            for (let i = 0; i < selectdataList.length; i++) {
                valuesall_sdet[i] = selectdataList[i].SDET_BN;
                setSdet_BO(valuesall_sdet);

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


    const [inputFieldSort, setinputFieldSort] = useState([])
    const handleInputSort = (index, event) => {
        const valuesSort = [...inputFieldSort];
        valuesSort[index] = event.target.value;
        setinputFieldSort(valuesSort);
    };

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

    const [Sdet_BO, setSdet_BO] = useState([]);
    const handleInputSdet_BO = (index, event) => {
        const valuesSdet_bo = [...Sdet_BO];
        valuesSdet_bo[index] = event.target.value;
        setSdet_BO(valuesSdet_bo);
    };

    const [allQTY, setAllQTY] = useState([])
    const [allWOF, setAllWOF] = useState([])
    const [allSort, setAllSort] = useState([])
    const [allWOF_0, setAllWOF_0] = useState([])

    const handleInputAll = (event) => {
        const valuesall = [...allQTY];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall[i] = event.target.value
            setAllQTY(valuesall);
            // all.push(event.target.value)
        }
    }
    const handleInputAllSort = (event) => {
        const valuesallSort = [...allSort];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesallSort[i] = event.target.value
            setAllSort(valuesallSort);
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
    const useClickSort = () => {
        setinputFieldSort(allSort);
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


    const [datahave_qty, setDatahave_QTY] = useState([]);
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
        Sdet_BO: Sdet_BO,
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


    return (

        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow RDH HGA</h3>
                {slider0.length === 0 ? (
                    <Container>
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
                    </Container>
                ) : null}

                {selectdataList.length && (slider0.length || slider1.length) !== 0 ? (
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
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>HGA P/N</strong></td>
                                    <td style={{ border: '2px solid black' }}>{hga1}</td>
                                    <td style={{ border: '2px solid black' }}>{hga0}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>TGA P/N</strong></td>
                                    <td style={{ border: '2px solid black' }}>{tga1}</td>
                                    <td style={{ border: '2px solid black' }}>{tga0}</td>
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
                            <Table responsive hover bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#8ED1FC' }}>
                                    <th>No.</th>
                                    <th>PREFIX</th>
                                    <th>Priority</th>
                                    <th>TAB</th>
                                    <th>HGA_BO</th>
                                    <th>AABdesign</th>
                                    <th>Sort <br></br>
                                        <input type="text" onChange={event => {
                                            handleInputAllSort(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickSort} /></a>
                                    </th>
                                    <th>HGA_loding_Q'ty<br></br>
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
                                    </th>
                                    <th>SDET_BO</th>
                                    <th> SEQ#/Old_BO </th>
                                    <th>WAF_CODE</th>
                                    <th>W/O</th>
                                    <th>Work_Oder_File
                                <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                        {/* <a type='button' onClick={set_0_WOF} ><u>set 0</u></a> */}
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
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{val.BUILDGROUP}</td>
                                                <td>{val.HGA_PRIORITY}</td>
                                                <td >{val.PARM_HGA_TAB}</td>
                                                <td>{val.HGA_BO}</td>
                                                <td>{val.AIRBEARINGDESIGN}</td>
                                                <td><input type="text" value={inputFieldSort[index]} onChange={event => {
                                                    handleInputSort(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '100px' }} /></td>
                                                <td><input type="number" value={inputFieldQTY[index]} onChange={event => {
                                                    handleInputQTY(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '100px' }} /><br></br>
                                                </td>
                                                <td><input type="text" value={Sdet_BO[index]} onChange={(event) => {
                                                    handleInputSdet_BO(
                                                        index,
                                                        event
                                                    )
                                                }} style={{ width: '140px' }} /></td>
                                                <td>{val.SLD_BO}</td>
                                                <td>{val.THREE_DIGIT_WAFER_CODE}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}-
                                            <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                        handleInputWOF(
                                                            index,
                                                            event
                                                        );
                                                    }} style={{ width: '60px' }} />.wo</td>
                                                <td>{val.TSR_PN_G_SAAM}</td>
                                                <td>{val.HGA_ET_TSR}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}</td>
                                                <td>{val.HGA_BO}</td>
                                                <td>{sw}</td>
                                                <td>{fw}</td>
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
                                        <td></td>
                                        <th>{qty_sum}</th>
                                        <td></td>
                                        {/* <td style={{textAlign: 'center'}}><button onClick={useClickClear}>clear</button></td> */}
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

                        {/* <Link
                        type='button'
                        to={{
                            pathname: "/flowro",
                            state: { datainput: datainput, dataselect: selectdataList }
                        }}
                    ><Button variant="outline-warning" style={{ marginTop: '20px' }}>Test</Button></Link> */}
                        <div>
                            {action}
                        </div>
                    </Container>
                ) : null}
            </Container>
        </div >
    )
}