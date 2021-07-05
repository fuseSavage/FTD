import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AddImg() {
    const [title, setTitle] = useState('');
    const [selectfile, setSelectFile] = useState()
    // const [check, setCheck] = useState(false);
    // const [uploadStatus, setUploadStatus] = useState('');
    const [nameTitle, setNameTitle] = useState([])
    // const nameTitle = []

    const handleselectImg = (e) => {
        setSelectFile(e.target.files)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await Axios.get(`http://localhost:3001/check-title`);
            const check_title = response.data;
            for (const key of Object.keys(check_title)) {
                setNameTitle(arrlist => [...arrlist, check_title[key].Tables_in_images])
            }
            // console.log(nameTitle)
        }
        fetchData();
    }, [])

    //   console.log('555', check)

    const upload = async () => {
        if (nameTitle.includes(title) === false) {
            if (selectfile != null && title.length !== 0) {
                let formData = new FormData();
                for (const key of Object.keys(selectfile)) {
                    formData.append('imagesArray', selectfile[key])
                }
                fetch(`http://localhost:3001/uploadimg?title=${title}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                    },
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then(res => {
                    })
                    .catch(error => {
                        console.error(error);
                    })
            } else {
                alert("Enter Image Name And Select Image!!");
            }
            window.location.reload(false);
        } else {
            alert("มีรายการนี้แล้ว!!");
            window.location.reload(false);
        }

        // window.location.reload(false);
        // alert(uploadStatus)
    }

    const deleteItem = (name) => {
        console.log(name)
        Axios.delete(`http://localhost:3001/deleteTitle?name=${name}`)
        .then((response) => {
            alert(response.data.message)
            window.location.reload(false);
        })
        .catch((err) => {
            throw err
        })
    }

    // const editItem = (name) => {
    //     Axios.put(`http://localhost:3001/editItem?name=${name}`).then((response) => {
    //         alert(response.data.message)
    //         window.location.reload(false);
    //     })
    // }

    return (
        <div style={{ marginTop: '3%' }}>
            <div className='container'>
                <h3 className='text-center'> Add Image Flow  </h3>

                <div className='row form-group text-center'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8'>
                        {nameTitle.length !== 0 ? (
                            <Table responsive hover>
                                <thead>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>View</th>
                                    <th>Delete</th>
                                </thead>
                                <tbody>

                                    {nameTitle.map((val, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{val}</td>
                                                <td>

                                                    <Link
                                                        type='button'
                                                        to={{
                                                            pathname: "/showimage",
                                                            state: { name: val }
                                                        }}
                                                    ><button className='btn btn-primary'>Edit</button></Link>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={(event) => {
                                                        if (window.confirm('Are you sure you wish to delete this item?'))
                                                            deleteItem(val)
                                                    }} >Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>
                        ) : null}
                    </div>
                    <div className='col-sm-2'></div>
                </div>

                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className='form-group' >
                            <h5><b>Add Image</b></h5>
                            <h6 style={{ color: 'blue' }}><b> * Image Name <input type='text' placeholder='Enter Name' onChange={(event) => {
                                setTitle(event.target.value);
                            }} required /></b></h6>
                            {/* <div className="ml-5">
                                <p style={{ color: 'red' }}> *Except mark (, . ' ') </p>
                            </div> */}
                        </div>

                        <div className='form-group' >
                            <input type='file' className='form-control' multiple onChange={(e) => handleselectImg(e)}></input>
                        </div>

                        <button className='btn btn-danger' onClick={() => {
                            if (window.confirm('Are you sure you want to add this flow?'))
                                upload()
                        }}>Upload</button>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        </div>
    )
}