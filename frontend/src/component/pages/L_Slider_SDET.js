import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Card, Col, Form, Table } from 'react-bootstrap';
import { TiInputChecked } from 'react-icons/ti';

// import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function L_Slider_SDET(props) {
    const { datalist, swfw2 } = props;
    const [EXP_ID, SetEXP_ID] = useState("");
    const [selectdataList, setSelectdataList] = useState([]);
    const [product, setProduct] = useState('');
    const [value, setValue] = useState('');
    let sum_qty = 0;

    const getSelect = () => {
        if (datalist) {
            Axios.get(`http://localhost:3001/ama?EXP_ID=${EXP_ID}`).then((response) => {
                setSelectdataList(response.data);

                if (selectdataList) {
                    const valuesqty = [...inputFieldQTY];
                    const Nqty = inputFieldQTY.map(Number);
                    for (let i = 0; i < selectdataList.length; i++) {
                        valuesqty[i] = selectdataList[i].SDET_QTY;
                        setinputFieldQTY(valuesqty);
                        // console.log(selectdataList[i].SDET_QTY)

                        if (Nqty[i] > 1) {
                            sum_qty = sum_qty + Nqty[i];
                        }
                    }

                    selectdataList.forEach((e) => {
                        if (e.L_SLD_TAB === "Down-00") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabDN('Dn')
                            setHGADN(e.HGA_PART_NUM)
                            setL_SliderDN(e.L_SLD_PART_NUM)
                            setTGADN(e.HGA_SUSPENSION_PN)
                        }
                        if (e.L_SLD_TAB === "Up-01") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabUP('Up')
                            setHGAUP(e.HGA_PART_NUM)
                            setL_SliderUP(e.L_SLD_PART_NUM)
                            setTGAUP(e.HGA_SUSPENSION_PN)
                        }
                    });
                }
            })
        } else {
            window.location.reload(false);
        }

        console.log(selectdataList)
    }

    //Start table Top Bin Detail//
    const [tabdn, setTabDN] = useState('');
    const [tabup, setTabUP] = useState('');
    const [hgadn, setHGADN] = useState('');
    const [hgaup, setHGAUP] = useState('');
    const [l_sliderdn, setL_SliderDN] = useState('');
    const [l_sliderup, setL_SliderUP] = useState('');
    const [tgadn, setTGADN] = useState('');
    const [tgaup, setTGAUP] = useState('');

    const [uad_Dn, setUAD_Dn] = useState('AMTI0211');
    const [uad_Up, setUAD_Up] = useState('AMTI0211');
    const [sla_Up, setSLA_Up] = useState('SL60E220');
    const [sla_Dn, setSLA_Dn] = useState('SL60E220');
    const [lsa_Up, setLsa_Up] = useState('LLEPPMCU');
    const [lsa_Dn, setLsa_Dn] = useState('LLEPPMCD');
    const [ebp_Up, setEBP_Up] = useState('ALT2CUMU');
    const [ebp_Dn, setEBP_Dn] = useState('ALT2CUMD');
    const [laser_Up, setLaser_Up] = useState('AU2260MU');
    const [laser_Dn, setLaser_Dn] = useState('AU2260MD');
    const [wo_Up, setLWo_Up] = useState('ใช้ WO จริง');
    const [wo_Dn, setLWo_Dn] = useState('ใช้ WO จริง');

    const [uad_Dn_2, setUAD_Dn_2] = useState('EPTI022P');
    const [uad_Up_2, setUAD_Up_2] = useState('EPTI022P');
    const [sla_Up_2, setSLA_Up_2] = useState('EPTI022P');
    const [sla_Dn_2, setSLA_Dn_2] = useState('EPTI022P');
    const [lsa_Up_2, setLsa_Up_2] = useState('EP2260MU');
    const [lsa_Dn_2, setLsa_Dn_2] = useState('EP2260MD');
    const [ebp_Up_2, setEBP_Up_2] = useState('EP22CUMU');
    const [ebp_Dn_2, setEBP_Dn_2] = useState('EP22CUMD');
    const [laser_Up_2, setLaser_Up_2] = useState('LLEPPMCU');
    const [laser_Dn_2, setLaser_Dn_2] = useState('LLEPPMCD');
    const [wo_Up_2, setLWo_Up_2] = useState('ใช้ WO จริง');
    const [wo_Dn_2, setLWo_Dn_2] = useState('ใช้ WO จริง');
    //End table Top Bin Detail//

    //Start Table Main//
    const [allQTY, setAllQTY] = useState([])
    const [allWOF, setAllWOF] = useState([])
    const [allWOF_0, setAllWOF_0] = useState([])
    const [allSort, setAllSort] = useState([])

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
    const [inputFieldSort, setinputFieldSort] = useState([])
    const handleInputSort = (index, event) => {
        const valuesSort = [...inputFieldSort];
        valuesSort[index] = event.target.value;
        setinputFieldSort(valuesSort);
    };

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
        }
    }
    const handleInputAllSort = (event) => {
        const valuesallSort = [...allSort];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesallSort[i] = event.target.value
            setAllSort(valuesallSort);
        }
    }

    const useClickQTY = () => {
        setinputFieldQTY(allQTY)
    }
    const useClickWOF = () => {
        setinputFieldWOF(allWOF);
    }
    const useClickSort = () => {
        setinputFieldSort(allSort);
    }
    //End Table Main//

    //Start table Butom Bin Detail//
    const [persurface, setPersurface] = useState(500)
    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')
    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }
    const [testON, setTestON] = useState('')
    const [media, setMedia] = useState()
    //End table Butom Bin Detail//

    //Start preview//
    const [sw, setSW] = useState();
    const [fw, setfw] = useState();
    const [newtestON, setNewtestON] = useState();
    const [newmedia, setNewmedia] = useState();
    const preview = () => {
        console.log(selectdataList)
        setNewmedia(media)
        setNewtestON(testON)
        setSW(swfw[0])
        setfw(swfw[1])
    }
    //End preview//

    return (
        <div style={{ marginTop: '6%' }}>
            <Container>
                <h3>Create Build Flow L-Slider SDET</h3>
                {l_sliderup.length === 0 || l_sliderdn.length === 0 ? (
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
                ) : null}

                {l_sliderup.length !== 0 || l_sliderdn.length !== 0 ? (
                    <Container>
                        <div>
                            <Table responsive hover style={{ width: '300px', border: '2px solid black' }}>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>BIN</strong></td>
                                    <td style={{ border: '2px solid black' }}>{EXP_ID}</td>
                                </tbody>
                                <tbody style={{ border: '2px solid black' }}>
                                    <td style={{ backgroundColor: '#8ED1FC' }}><strong>Product</strong></td>
                                    <td style={{ border: '2px solid black' }}>{product}</td>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Table hover bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#8ED1FC' }}>
                                    <th>Tab</th>
                                    <th>L-Slider_P/N</th>
                                    <th >HGA_P/N</th>
                                    <th >TGA_P/N</th>
                                    <th>uAD</th>
                                    <th >SLA</th>
                                    <th>Laser_u-TIC</th>
                                    <th >EBP_TIC</th>
                                    <th >LSA</th>
                                    <th >WO_Buy-off</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tabup}</td>
                                        <td>{l_sliderup}</td>
                                        <td>{hgaup}</td>
                                        <td>{tgaup}</td>
                                        <td>
                                            <input type="text" value={uad_Up} onChange={(event) => {
                                                setUAD_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={sla_Up} onChange={(event) => {
                                                setSLA_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={laser_Up} onChange={(event) => {
                                                setLaser_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={ebp_Up} onChange={(event) => {
                                                setEBP_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Up} onChange={(event) => {
                                                setLsa_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Up} onChange={(event) => {
                                                setLWo_Up(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
                                        {/* <td>FDB</td> */}
                                    </tr>
                                    <tr>
                                        <td>{tabdn}</td>
                                        <td>{l_sliderdn}</td>
                                        <td>{hgadn}</td>
                                        <td>{tgadn}</td>
                                        <td>
                                            <input type="text" value={uad_Dn} onChange={(event) => {
                                                setUAD_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={sla_Dn} onChange={(event) => {
                                                setSLA_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={laser_Dn} onChange={(event) => {
                                                setLaser_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={ebp_Dn} onChange={(event) => {
                                                setEBP_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Dn} onChange={(event) => {
                                                setLsa_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Dn} onChange={(event) => {
                                                setLWo_Dn(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
                                        {/* <td>FDB</td> */}
                                    </tr>
                                </tbody>
                                <tbody style={{backgroundColor:'#13FF89'}}>
                                    <tr>
                                        <td>{tabup}</td>
                                        <td>{l_sliderup}</td>
                                        <td>{hgaup}</td>
                                        <td>{tgaup}</td>
                                        <td>
                                            <input type="text" value={uad_Up_2} onChange={(event) => {
                                                setUAD_Up_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={sla_Up_2} onChange={(event) => {
                                                setSLA_Up_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={laser_Up_2} onChange={(event) => {
                                                setLaser_Up_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={ebp_Up_2} onChange={(event) => {
                                                setEBP_Up_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Up_2} onChange={(event) => {
                                                setLsa_Up_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Up_2} onChange={(event) => {
                                                setLWo_Up_2(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
                                        {/* <td>FDB</td> */}
                                    </tr>
                                    <tr>
                                        <td>{tabdn}</td>
                                        <td>{l_sliderdn}</td>
                                        <td>{hgadn}</td>
                                        <td>{tgadn}</td>
                                        <td>
                                            <input type="text" value={uad_Dn_2} onChange={(event) => {
                                                setUAD_Dn_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={sla_Dn_2} onChange={(event) => {
                                                setSLA_Dn_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={laser_Dn_2} onChange={(event) => {
                                                setLaser_Dn_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={ebp_Dn_2} onChange={(event) => {
                                                setEBP_Dn_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Dn_2} onChange={(event) => {
                                                setLsa_Dn_2(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Dn_2} onChange={(event) => {
                                                setLWo_Dn_2(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
                                        {/* <td>FDB</td> */}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Table responsive hover bordered style={{ textAlign: 'center' }} >
                                <thead style={{ backgroundColor: '#8ED1FC' }}>
                                    <th>Wafer</th>
                                    <th>AAB_Design</th>
                                    <th>Group</th>
                                    <th>L_Slider_from SDET_BO</th>
                                    <th>SDET_Sort
                                    <input type="text" onChange={event => {
                                            handleInputAllSort(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickSort} /></a>
                                    </th>
                                    <th>HGA_BO</th>
                                    <th>HGA_Loading_Q'ty
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
                                    </th>
                                    <th>HGA_WO_file
                                    <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                    </th>
                                    <th>Tray_Type</th>
                                    <th>Tap</th>
                                    <th>TMWI</th>
                                    <th>BUILD_NUM</th>
                                    <th>ET_TSR</th>
                                    <th>MEDIA_LOT</th>
                                    <th>Flamework</th>
                                    <th>WITE_Revision</th>
                                </thead>
                                <tbody>
                                    {selectdataList.map((val, index) => {
                                        let NewTab;
                                        if (val.L_SLD_TAB === 'Down-00') {
                                            NewTab = 'Dn';
                                        }
                                        if (val.L_SLD_TAB === 'Up-01') {
                                            NewTab = 'Up';
                                        }
                                        return (
                                            <tr>
                                                <td>{val.THREE_DIGIT_WAFER_CODE}</td>
                                                <td>{val.AIRBEARINGDESIGN.slice(0,3)}.{val.AIRBEARINGDESIGN.slice(3,5)}{' '}{val.AIRBEARINGDESIGN.slice(5)}</td>
                                                <td>??</td>
                                                <td>{val.SDET_BN}</td>
                                                <td>
                                                    <input type="text" value={inputFieldSort[index]} onChange={event => {
                                                        handleInputSort(
                                                            index,
                                                            event
                                                        );
                                                    }} style={{ width: '60px' }} />
                                                </td>
                                                <td>{val.HGA_BO}</td>
                                                <td><input type="number" value={inputFieldQTY[index]} onChange={event => {
                                                    handleInputQTY(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />
                                                </td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{NewTab[0]}-
                                                    <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                        handleInputWOF(
                                                            index,
                                                            event
                                                        );
                                                    }} style={{ width: '50px' }} />.wo
                                                </td>
                                                <td>??</td>
                                                <td>{NewTab}</td>
                                                <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}</td>
                                                <td>{val.HGA_BO}</td>
                                                <td>{val.HGA_ET_TSR}</td>
                                                <td>{newtestON}</td>
                                                <td>{fw}</td>
                                                <td>{sw}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <p>Set Per surface :
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

                            <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={preview}>preview</Button>
                        </div>
                    </Container>

                ) : null}
            </Container>
        </div>
    )
}