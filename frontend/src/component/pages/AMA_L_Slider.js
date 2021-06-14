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
                        // setinputFieldQTY(valuesqty);
                        // console.log(selectdataList[i].SDET_QTY)

                        if (Nqty[i] > 1) {
                            sum_qty = sum_qty + Nqty[i];
                        }
                    }

                    selectdataList.forEach((e) => {
                        if (e.L_SLD_TAB === "Down-00") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabDN('Dn')
                            setSliderDN(e.PARTNUM)
                            setL_SliderDN(e.L_SLD_PART_NUM)
                        }
                        if (e.L_SLD_TAB === "Up-01") {
                            setProduct(e.PRODUCTFAMILY)
                            setTabUP('Up')
                            setSliderUP(e.PARTNUM)
                            setL_SliderUP(e.L_SLD_PART_NUM)
                        }
                    });
                }
            })
        } else {
            window.location.reload(false);
        }
        console.log(selectdataList)
        // console.log(alullm_lDn, '22', alullm_lU)
    }

    //Start table Top Bin Detail//
    const [tabdn, setTabDN] = useState('');
    const [tabup, setTabUP] = useState('');
    const [sliderdn, setSliderDN] = useState('');
    const [sliderup, setSliderUP] = useState('');
    const [l_sliderdn, setL_SliderDN] = useState('');
    const [l_sliderup, setL_SliderUP] = useState('');
    const [ldudn, setLDU_Dn] = useState('739074601');
    const [lduup, setLDU_Up] = useState('739074601');
    const [mac_num_Dn, setmac_num_Dn] = useState('HVLA04');
    const [mac_num_Up, setmac_num_Up] = useState('HVLA04');
    const [ratio_Up, setRatio_Up] = useState(1);
    const [ratio_Dn, setRatio_Dn] = useState(1);
    const [power_Up, setPower_Up] = useState('10w');
    const [power_Dn, setPower_Dn] = useState('10w');
    //End table Top Bin Detail//

    //Start Table Main//
    const [allQTY_good, setAllQTY_good] = useState([]);
    const [allQTY_sh, setAllQTY_sh] = useState([]);
    const [allWOF, setAllWOF] = useState([]);
    const [lud_lot, setAllLud] = useState([]);
    const [allQTY_lab, setAllQTY_Lab] = useState([]);

    const [inputFieldLUD, setinputFieldLUD] = useState([])
    const handleInputLUD = (index, event) => {
        const values = [...inputFieldLUD];
        values[index] = event.target.value;
        setinputFieldLUD(values);
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
    const [inputFieldQTY_sh, setinputFieldQTY_sh] = useState([])
    const handleInputQTY_sh = (index, event) => {
        const values = [...inputFieldQTY_sh];
        values[index] = event.target.value;
        setinputFieldQTY_sh(values);
    };
    const [inputFieldQTY_lab, setinputFieldQTY_Lab] = useState([])
    const handleInputQty_Lab = (index, event) => {
        const values = [...inputFieldQTY_lab];
        values[index] = event.target.value;
        setinputFieldQTY_Lab(values);
    };

    
    const handleInputAll = (event) => {
        const valuesall = [...allQTY_good];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall[i] = event.target.value
            setAllQTY_good(valuesall);
        }
    }
    const handleInputAllWOF = (event) => {
        const valuesall_WOF = [...allWOF];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall_WOF[i] = event.target.value
            setAllWOF(valuesall_WOF)
            
        }
    }
    const handleInputAll_LUD = (event) => {
        const valuesall = [...lud_lot];
        for (let i = 0; i < selectdataList.length; i++) {
            valuesall[i] = event.target.value
            setAllLud(valuesall)
        }
    }
    const handleInput_Qty_sh = (event) => {
        const values = [...allQTY_good];
        for (let i = 0; i < selectdataList.length; i++) {
            values[i] = event.target.value
            setAllQTY_sh(values);
        }
    }
    const handleInput_Qty_Lab = (event) => {
        const values = [...allQTY_lab];
        for (let i = 0; i < selectdataList.length; i++) {
            values[i] = event.target.value
            setAllQTY_Lab(values);
        }
    }

    const useClickLud_lot = () => {
        setinputFieldLUD(lud_lot)
    }
    const useClickQTY = () => {
        setinputFieldQTY(allQTY_good)
    }
    const useClickWOF = () => {
        setinputFieldWOF(allWOF);
    }
    const useClickQTY_sh = () => {
        setinputFieldQTY_sh(allQTY_sh);
    }
    const useClickQTY_Lab = () => {
        setinputFieldQTY_Lab(allQTY_lab);
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
                <h3>Create Build Flow AMA L-Slider</h3>
                {sliderdn.length === 0 ? (
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

                {selectdataList.length && (l_sliderdn.length || l_sliderup.length) !== 0 ? (
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
                                    <th >LDU_P/N</th>
                                    <th>L-Slider_P/N</th>
                                    <th>Machine_Number</th>
                                    <th >PD_Ratio</th>
                                    <th >Reflow_Power</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tabup}</td>
                                        <td>{sliderup}</td>
                                        <td>
                                            <input type="text" value={lduup} onChange={(event) => {
                                                setLDU_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>{l_sliderup}</td>
                                        <td>
                                            <input type="text" value={mac_num_Up} onChange={(event) => {
                                                setmac_num_Up(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>

                                        <td>
                                            <input type="number" value={ratio_Up} onChange={(event) => {
                                                setRatio_Up(event.target.value);
                                            }} style={{ width: '50px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={power_Up} onChange={(event) => {
                                                setPower_Up(event.target.value);
                                            }} style={{ width: '50px' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{tabdn}</td>
                                        <td>{sliderdn}</td>
                                        <td>
                                            <input type="text" value={ldudn} onChange={(event) => {
                                                setLDU_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>{l_sliderdn}</td>
                                        <td>
                                            <input type="text" value={mac_num_Dn} onChange={(event) => {
                                                setmac_num_Dn(event.target.value);
                                            }} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <input type="number" value={ratio_Dn} onChange={(event) => {
                                                setRatio_Dn(event.target.value);
                                            }} style={{ width: '50px' }} />
                                        </td>
                                        <td>
                                            <input type="text" value={power_Dn} onChange={(event) => {
                                                setPower_Dn(event.target.value);
                                            }} style={{ width: '50px' }} />
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
                                    <th>LDU_Lot_ID
                                        <input type="text" onChange={event => {
                                            handleInputAll_LUD(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickLud_lot} ><TiInputChecked size={20} /></a>
                                    </th>
                                    <th>Bo_SLIDER</th>
                                    <th>L_Slider_Bo</th>
                                    <th>Tap</th>
                                    <th>L_Slider_WO
                                    <input type="number" onChange={event => {
                                            handleInputAllWOF(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button' onClick={useClickWOF} ><TiInputChecked size={20} /></a>
                                    </th>
                                    <th>L_Slider_Good_Qty for_SDET (ไม่รวม_buy_off)
                                        <input type="number" onChange={event => {
                                            handleInputAll(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY} /></a>
                                    </th>
                                    <th>L_Slider_Qty for_Shear_and %Wetting
                                        <input type="number" onChange={event => {
                                            handleInput_Qty_sh(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY_sh} /></a>
                                    </th>
                                    <th>L_Slider_Qty for Lab
                                        <input type="number" onChange={event => {
                                            handleInput_Qty_Lab(event)
                                        }} style={{ width: '60px' }} />
                                        <a type='button'><TiInputChecked size={20} onClick={useClickQTY_Lab} /></a>
                                    </th>
                                    {/* <th>MEDIA_LOT</th>
                                    <th>Flamework</th>
                                    <th>WITE_Revision</th> */}
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
                                                <td>{val.AIRBEARINGDESIGN}</td>
                                                <td>??</td>
                                                <td><input type="number" value={inputFieldLUD[index]} onChange={event => {
                                                    handleInputLUD(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />
                                                </td>
                                                <td>{val.SLD_BO}</td>
                                                <td>{val.L_SLD_BO}</td>
                                                <td>{NewTab}</td>
                                                <td>{val.L_SLD_BUILD_GROUP.slice(0, 2)}{val.L_SLD_BO.slice(2)}{NewTab[0]}-
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
                                                <td><input type="number" value={inputFieldQTY_sh[index]} onChange={event => {
                                                    handleInputQTY_sh(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />
                                                </td>
                                                <td><input type="number" value={inputFieldQTY_lab[index]} onChange={event => {
                                                    handleInputQty_Lab(
                                                        index,
                                                        event
                                                    );
                                                }} style={{ width: '60px' }} />
                                                </td>
                                                {/* <td>{newtestON}</td>
                                                <td>{fw}</td>
                                                <td>{sw}</td> */}
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