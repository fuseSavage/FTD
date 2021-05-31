import React, { useState } from 'react'
import Axios from 'axios'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Card, Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import ReactExport from 'react-data-export';
// import Flow_RDH_RO from './Flow_RDH_RO';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import App from '../../App';
// import Flow_RDH_RO from './Flow_RDH_RO';
import { Link } from 'react-router-dom';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;




export default function RDH_RO(props) {
    const { datalist } = props;
    const [selectdataList, setSelectdataList] = useState([]);
    const [EXP_ID, SetEXP_ID] = useState("");


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

    // const insertData = () => {
    //     Axios.post(`http://localhost:3001/pushflow`, {
    //         data: selectdataList,
    //         name: datalist
    //     })
    //     console.log('gg.gg', aa)
    //     // window.location.reload(false);
    // }


    const [type, setTYPE] = useState("PRIME BUILD");
    const handleSelectType = (e) => {
        setTYPE(e.target.value)
    }

    // const [newTab, setNewTab] = useState([])

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
    const [newbuildType, setNewbuildType] = useState();
    const [newpersurface, setNewpersurface] = useState();
    const [sw, setSW] = useState();
    const [fw, setfw] = useState();
    const [newtestON, setNewtestON] = useState();
    const [newmedia, setNewmedia] = useState();

    //    const [wof, setWOF] = useState()

    const preview = (index) => {
        setNewmedia(media)
        setNewtestON(testON)
        setSW(swfw[0])
        setfw(swfw[1])
        setNewpersurface(persurface)
        setNewbuildType(type)
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



    // const [allQTY, setAllQTY] = useState(0)
    // const handleAllQTY = (event) => {

    // }

    return (

        <div style={{ marginTop: '6%' }}>
            {selectdataList.length === 0 ? (
                <Container>
                    <h3>Create Build Flow RDH RO</h3>
                    <Col></Col>
                    <Col md={10}>
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
                    <Col></Col>
                </Container>
            ) : null }

            {selectdataList.length !== 0 ? (
                <Container style={{ marginBottom: '20px', marginTop: '20px' }}>

                    <Col sm={12}>
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

                        <Table hover bordered>
                            <thead style={{ backgroundColor: '#8ED1FC' }}>
                                <th>No.</th>
                                <th>BIN</th>
                                <th>PREFIX</th>
                                <th>Priority</th>
                                <th>TAB</th>
                                <th>SBR</th>
                                <th>AABdesign</th>
                                <th>Qty
                                {/* <input type="number" onChange={event => {
                                        setAllQTY(event.target.value)
                                    }} style={{ width: '60px' }} /> */}
                                </th>
                                <th>SEQ#/OldBO</th>
                                <th>W/O</th>
                                <th>WorkOrderFile</th>
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
                                                    preview(index);
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
                        {/* <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={insertData}>Insert Data</Button> */}
                        {/* <ExcelFile
                                filename="Test-Auto"
                                element={<button type='button' className='btn btn-success float-right' style={{ marginTop: '20px' }}>Export Data</button>}
                            >
                                <ExcelSheet dataSet={DataSet} name="FTD Automated Buildflow" />
                            </ExcelFile> */}


                    </Col>
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
                                <option value='4.51B213/SHF 1.6.1.246'>4.51B213 / SHF 1.6.1.246</option>
                                <option value='WITE4.51B121/SHF 1.6.1.187'>WITE4.51B121 / SHF 1.6.1.187</option>
                                <option value='SW4.51B121/SHF 1.6.1.161'>SW4.51B121 / SHF 1.6.1.161</option>
                                <option value='WITE450B901/SHF1.6.1.141'>WITE450B901 / SHF1.6.1.141</option>
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
                    </div>
                    <p><strong> Result is </strong>{type}{' '}{persurface}{' '}{swfw}{' '}{testON}{' '}{media}{' '}{inputFieldQTY}{' '}{inputFieldWOF}</p>


                    <Button variant="outline-warning" onClick={preview} style={{ marginTop: '20px' }}  >preview</Button>

                    <Link
                        type='button'
                        to={{
                            pathname: "/flowro",
                            state: { datainput: datainput, dataselect: selectdataList } // your data array of objects
                        }}
                    ><Button variant="outline-warning" style={{ marginTop: '20px' }}>Test</Button></Link>
                </Container>
            ) : null}

            

        </div>
    )
}
