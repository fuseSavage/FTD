import React, { useState } from 'react'
import { Button, Col, Container, Table } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';

export default function Flow_RDH_RO() {

    const datainput = useLocation().state.datainput[0];
    const dataselect = useLocation().state.dataselect;

    console.log(datainput)
    console.log(dataselect)


    // const preview = datainput => {
    //     console.log(data)
    // }

    return (
        <div >
            <h3>Flow RDH RO</h3>
                {datainput.length !== 0 ? (
                    <Container style={{ marginBottom: '5%', marginTop: '2%', marginLeft: '10px', marginRight: '20px'}}>
                        <Table hover bordered>
                            <thead style={{ backgroundColor: '#8ED1FC' }}>
                                <th>No.</th>
                                <th>BIN</th>
                                <th>PREFIX</th>
                                <th>Priority</th>
                                <th>TAB</th>
                                <th>SBR</th>
                                <th>AABdesign</th>
                                <th>Qty</th>
                                <th>SEQ#/OldBO</th>
                                <th>W/O</th>
                                <th>WorkOrderFile</th>
                                <th>TMWI_ET</th>
                                <th>Build_Num_ET</th>
                                <th>SAAM_TSR</th>
                                <th>Cl_tsr_pn_i_electric</th>
                                <th>Media</th>
                                <th>Tester#</th>
                                <th>ETS/W</th>
                                <th>ETF/W</th>
                                <th>THREE_DIGIT_WAF_CODE</th>
                                <th> WAFER_INFO</th>
                            </thead>
                            {dataselect.map((val, index) => {
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
                                            <td>{datainput.qty[index]}</td>
                                            <td>{val.SLD_BO}</td>
                                            <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}</td>
                                            <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}{val.PARM_HGA_TAB[0]}-{datainput.wof[index]}.wo</td>
                                            <td>{val.BUILDGROUP}{val.HGA_BO.slice(3)}</td>
                                            <td>{val.HGA_BO}</td>
                                            <td>{val.TSR_PN_G_SAAM}</td>
                                            <td>Column?</td>
                                            <td>{datainput.media}</td>
                                            <td>{datainput.testON}</td>
                                            <td>{datainput.sw}</td>
                                            <td>{datainput.fw}</td>
                                            <td>{val.THREE_DIGIT_WAFER_CODE}</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </Table>
                    </Container>
                ) : null}
            
            
        </div>
    )
}
