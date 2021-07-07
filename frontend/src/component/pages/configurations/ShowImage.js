import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function ShowImage() {

    const name = useLocation().state.name;
    const [getName, setGetName] = useState()
    const [image, setImage] = useState()
    const [selectfile, setSelectFile] = useState()

    useEffect(() => {
        async function fetchData() {
            setGetName(name)

            Axios.get(`http://localhost:3001/getImage`, {
                params: {
                    title: name,
                }
            }).then((response) => {
                setImage(response.data)
                console.log(response.data)
            })
        }
        fetchData();
    }, [])

    const handleselectImg = (e) => {
        setSelectFile(e.target.files)
    }

    const deleteItem = (id) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/deleteItem?id=${id}&title=${name}`)
            .then((response) => {
                alert(response.data.message)
                window.location.reload(false);
            })
            .catch((err) => {
                throw err;
            })
    }

    const submitImage = () => {
        console.log(selectfile)
        console.log(name)
        if (selectfile != null) {
            let formData = new FormData();
            for (const key of Object.keys(selectfile)) {
                formData.append('imagesArr', selectfile[key])
            }
            fetch(`http://localhost:3001/changeImage?title=${getName}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'multipart/form-data',
                },
                credentials: 'include',
            })
                .then(() => {
                })
                .catch((error) => {
                    throw error;
                })
        } else {
            alert("Please Select Image!!");
        }
        window.location.reload(false);
    }

 

    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3>Edit Image</h3>
                    <div className="mt-4">
                        <h4>{getName}</h4>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>

            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h4>Image List</h4>
                    {image != null ? (
                        <Table hover bordered style={{ textAlign: 'center' }} >
                            <thead>
                                <th>No</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {image.map((val, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <a href={`http://localhost:3001/showImages/${(encodeURIComponent(val.images.trim()))}`}>
                                                    <img src={`http://localhost:3001/showImages/${(encodeURIComponent(val.images.trim()))}`} width="350" height="auto" />
                                                </a>
                                            </td>
                                            <td>
                                                <button className='btn btn-danger' onClick={(event) => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        deleteItem(val.id)
                                                }} >Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : null}
                    <div className='form-group mt-5' >
                        <h5>* Add Image : </h5>
                        <input type='file' multiple className='form-control' onChange={(e) => handleselectImg(e)} ></input>
                    </div>
                    <button className='btn btn-primary' onClick={submitImage} >Submit</button>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}