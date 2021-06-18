import React, { useState } from 'react';
// import { Button, Card, Table } from 'react-bootstrap';
import Axios from 'axios';


export default function AddImg() {
    const [title, setTitle] = useState('');
    const [selectfile, setSelectFile] = useState()

    const [uploadStatus, setUploadStatus] = useState('');

    const handleselectImg = (e) => {
        setSelectFile(e.target.files)
    }

    const upload = async (e) => {
        e.preventDefault();
        // console.log(imgname)
        // console.log(selectfile)
        if (selectfile != null) {
            let formData = new FormData();
            // formData.append('image', selectfile)
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
            // Axios.post("http://localhost:3001/uploadimg", formData, {
            // }).then(response => {
            //     console.log((response.data))
            // })
                .then(res => res.json())
                .then(res => {
                    setUploadStatus(res.msg);
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            alert("Enter Image Name And Select Image!!");
        }
        // alert(uploadStatus)
    }

    return (
        <div style={{ marginTop: '3%' }}>
            <div className='container'>
                <h3 className='text-center'> Add Image Flow  </h3>

                <div className='form-group text-center'>
                    Show img
                </div>

                <div className='form-group' >
                    <h5><b>Add Image</b></h5>
                    <h6><b> * Image Name <input type='text' placeholder='Enter name image' onChange={(event) => {
                        setTitle(event.target.value);
                    }} /></b></h6>
                </div>

                <div className='form-group' >
                    <input type='file' className='form-control' multiple onChange={(e) => handleselectImg(e)}></input>
                </div>

                <button className='btn btn-danger' onClick={upload}>Upload</button>
            </div>
        </div>
    )
}