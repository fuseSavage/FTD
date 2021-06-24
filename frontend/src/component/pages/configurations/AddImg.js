import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddImg() {
    const [title, setTitle] = useState('');
    const [selectfile, setSelectFile] = useState()
    const [check, setCheck] = useState(false);
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
        }
        fetchData();
    }, [])

    //   console.log('555', check)

    const upload = async (e) => {
        if (nameTitle.includes(title) === false) {
            if (selectfile != null && selectfile === ' ' && title.length !== 0) {
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
        }

        // window.location.reload(false);
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
                    <h6><b> * Image Name <input type='text' placeholder='Enter Name' onChange={(event) => {
                        setTitle(event.target.value);
                    }} /></b></h6>
                </div>

                <div className='form-group' >
                    <input type='file' className='form-control' multiple onChange={(e) => handleselectImg(e)}></input>
                </div>

                <button className='btn btn-danger' onClick={() => {
                    if (window.confirm('Are you sure you want to add this flow?'))
                        upload()
                }}>Upload</button>
            </div>
        </div>
    )
}