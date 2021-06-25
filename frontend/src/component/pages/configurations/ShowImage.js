import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function ShowImage() {

    const name = useLocation().state.name;
    const [getName, setGetName] = useState()
    const [image, setImage] = useState()
    const [changeTitle, setChangeTitle] = useState('')

    useEffect(() => {
        async function fetchData() {
            setGetName(name)
            setChangeTitle(name)

            Axios.get(`http://localhost:3001/getImage/:name?name=${name}`).then((response) => {
                setImage(response.data)
                // console.log(response.data)
            })
        }
        fetchData();
    }, [])

    // console.log(image)

    const deleteItem = (id) => {
        console.log(id)
        Axios.delete(`http://localhost:3001/deleteItem?id=${id}&title=${name}`)
            .then((response) => {
                alert(response.data.message)
                window.location.reload(false);
            })
            .catch((err) => {
                throw err
            })
    }
    const submit = () => {
        console.log(changeTitle)
    }

    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3><b>Edit Image</b></h3>
                    <div className="mt-4">
                        <h4><b>{getName}</b></h4>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>

            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h4><b>Image List</b></h4>
                    {image != null ? (
                        <Table responsive hover bordered style={{ textAlign: 'center' }} >
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
                                            {/* <td>{val.images}</td> */}
                                            <td>
                                                <img src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg" width="150" height="auto" />
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
                    {/* <img src="http://localhost:3001/getImage/1624529335248-Before.png" width="400" height="auto" /> */}
                    <div className="mt-5">
                        <h5>* Change Name :
                            <input type='text' value={changeTitle} onChange={(e) => {
                                setChangeTitle(e.target.value)
                            }} />
                        </h5>
                    </div>
                    <div className='form-group mt-5' >
                        <h5>* Add Image : </h5>
                        <input type='file' className='form-control' ></input>
                    </div>
                    <button className='btn btn-primary' onClick={submit} >Submit</button>
                </div>
                
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}