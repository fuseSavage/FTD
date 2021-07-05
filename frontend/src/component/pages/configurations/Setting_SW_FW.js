import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';

export default function Setting_SW_FW(props) {

    const [sw, setSW] = useState('');
    const [fw, setFW] = useState('');
    const [swfw, setSWFW] = useState('');

    const submit = async () => {
        let sw_fw = `${sw} / ${fw}`;
        if (sw !== '' && fw !== '') {
            await Axios.post(`http://localhost:3001/sw-fw?sw_fw=${sw_fw}`)
                .then(async (response) => {
                    if (response.data.message) {
                        alert(response.data.message);
                        window.location.reload(false);
                    } else {
                        alert(response.data.message);
                        window.location.reload(false);
                    }
                })
        } else {
            alert('Please Enter SW and/or FW')
        }
    }

    useEffect(() => {
        async function fetchData() {
            Axios.get('http://localhost:3001/getswfw').then((response) => {
                setSWFW(response.data)
            })
        }
        fetchData();
    }, [])

    const delswfw = async (id) => {
        await Axios.delete(`http://localhost:3001/delswfw?id=${id}`).then((response) => {
            window.location.reload(false);
        })
    }

    return (
        <div class="container mt-5">
            <div class="row text-center mb-5">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <h3 className='text-center'><b>SW / FW Setting</b>  </h3>

                    <div className='form-group' style={{ marginTop: '30px' }}>
                        <h5><b>Add SW / FW</b></h5>
                        <p><b>SW :</b>
                            <input type='text' placeholder=' Input SW ' onChange={(e) => {
                                setSW(e.target.value);
                            }}></input>
                        </p>
                        <p><b>FW :</b>
                            <input type='text' placeholder=' Input FW ' onChange={(e) => {
                                setFW(e.target.value);
                            }}></input>
                        </p>
                    </div>
                    <button className='btn btn-danger' onClick={submit}>Submit</button>
                </div>
                <div class="col-sm-2"> </div>
            </div>
            <Divider />
            <div className='row text-center mt-5'>
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    {swfw.length !== 0 ? (
                        <Table responsive hover bordered>
                            <thead style={{ backgroundColor: '#9B9B9B' }}>
                                <th>No</th>
                                <th>SW</th>
                                <th>FW</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {swfw.map((val, index) => {
                                    let sw = val.swfw.split("/")[0]
                                    let fw = val.swfw.split("/")[1]
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{sw}</td>
                                            <td>{fw}</td>
                                            <td>
                                                <button className='btn btn-warning' onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        delswfw(val.id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                    ) : null}
                </div>
                <div class="col-sm-2"></div>
            </div>
        </div>
    )
}