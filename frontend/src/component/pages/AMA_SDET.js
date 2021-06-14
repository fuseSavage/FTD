import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Card, Col, Form, Table } from 'react-bootstrap';
import { TiInputChecked } from 'react-icons/ti';

// import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AMA_SDET(props) {
    const { datalist } = props;
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
                        if (e.SDET_TAB === "0") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabDN('Dn')
                            setSliderDN(e.PARTNUM)
                            setL_SliderDN(e.L_SLD_PART_NUM)
                            setSetsDN(e.SDET_SETS_PARTNUM)
                        }
                        if (e.SDET_TAB === "1") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabUP('Up')
                            setSliderUP(e.PARTNUM)
                            setL_SliderUP(e.L_SLD_PART_NUM)
                            setSetsUP(e.SDET_SETS_PARTNUM)
                        }
                    });
                }
            })
        } else {
            window.location.reload(false);
        }

        // console.log(alullm_lDn, '22', alullm_lU)
    }

    //Start table Top Bin Detail//
    const [tabdn, setTabDN] = useState('');
    const [tabup, setTabUP] = useState('');
    const [sliderdn, setSliderDN] = useState('');
    const [sliderup, setSliderUP] = useState('');
    const [l_sliderdn, setL_SliderDN] = useState('');
    const [l_sliderup, setL_SliderUP] = useState('');
    const [setsdn, setSetsDN] = useState('');
    const [setsup, setSetsUP] = useState('');

    const [alullm_lDn, setAlullm_lDn] = useState('ALGMP0AD');
    const [alullm_lUp, setAlullm_lUp] = useState('ALGMP0AU');
    const [lsa_Up, setLsa_Up] = useState('LLSFSMBU');
    const [lsa_Dn, setLsa_Dn] = useState('LLSFSMBD');
    const [alullm_ul_Up, setAlullm_ul_Up] = useState('AUGMP0AU');
    const [alullm_ul_Dn, setAlullm_ul_Dn] = useState('AUGMP0AD');
    const [wo_Up, setLWo_Up] = useState('SFRSFBFU-0.wo');
    const [wo_Dn, setLWo_Dn] = useState('SFRSFBFD-0.wo');
    //End table Top Bin Detail//

    //Start Table Main//
    const [allQTY, setAllQTY] = useState([])
    const [allWOF, setAllWOF] = useState([])
    const [allWOF_0, setAllWOF_0] = useState([])

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

    const useClickQTY = () => {
        setinputFieldQTY(allQTY)
    }
    const useClickWOF = () => {
        setinputFieldWOF(allWOF);
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
                <h3>Create Build Flow AMA SDET</h3>
                {setsdn.length === 0 ? (
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

                {selectdataList.length && (setsdn.length || setsup.length) !== 0 ? (
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
                                    <th >Slider_P/N</th>
                                    <th>L-Slider_P/N</th>
                                    <th >SET_P/N</th>
                                    <th>ALULLM-L</th>
                                    <th >LSA</th>
                                    <th>ALULLM-UL</th>
                                    <th >WO_Buy-off</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tabup}</td>
                                        <td>{sliderup}</td>
                                        <td>{l_sliderup}</td>
                                        <td>{setsup}</td>
                                        <td>
                                            <input type="text" value={alullm_lUp} onChange={(event) => {
                                                setAlullm_lUp(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Up} onChange={(event) => {
                                                setLsa_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={alullm_ul_Up} onChange={(event) => {
                                                setAlullm_ul_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Up} onChange={(event) => {
                                                setLWo_Up(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{tabdn}</td>
                                        <td>{sliderdn}</td>
                                        <td>{l_sliderdn}</td>
                                        <td>{setsdn}</td>
                                        <td>
                                            <input type="text" value={alullm_lDn} onChange={(event) => {
                                                setAlullm_lDn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={lsa_Dn} onChange={(event) => {
                                                setLsa_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={alullm_ul_Dn} onChange={(event) => {
                                                setAlullm_ul_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={wo_Dn} onChange={(event) => {
                                                setLWo_Dn(event.target.value);
                                            }} style={{ width: '150px' }} />
                                        </td>
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
                                    <th>Bo_SLIDER</th>
                                    <th>L_Slider_Bo</th>
                                    <th>SDET_SBR</th>
                                    <th>SDET_WO_file
                                    <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                    </th>
                                    <th>SDET_Loading_Q'ty
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
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
                                        if (val.SDET_TAB === '0') {
                                            NewTab = 'Dn';
                                        }
                                        if (val.SDET_TAB === '1') {
                                            NewTab = 'Up';
                                        }
                                        return (
                                            <tr>
                                                <td>{val.THREE_DIGIT_WAFER_CODE}</td>
                                                <td>{val.AIRBEARINGDESIGN}</td>
                                                <td>??</td>
                                                <td>{val.SLD_BO}</td>
                                                <td>{val.L_SLD_BO}</td>
                                                <td>??</td>
                                                <td>{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}{NewTab[0]}-
                                                    <input type="number" value={inputFieldWOF[index]} onChange={event => {
                                                        handleInputWOF(
                                                            index,
                                                            event
                                                        );
                                                    }} style={{ width: '50px' }} />.wo
                                                </td>
                                                <td><input type="number" value={inputFieldQTY[index]} onChange={event => {
                                                    handleInputQTY(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />
                                                </td>
                                                <td>??</td>
                                                <td>{NewTab}</td>
                                                <td>{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}</td>
                                                <td>{val.SDET_BN}</td>
                                                <td>{val.SDET_ET_TSR}</td>
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

                            <Button variant="outline-warning" style={{ marginTop: '20px' }} onClick={preview}>preview</Button>
                        </div>
                    </Container>

                ) : null}
            </Container>
        </div>
    )
}