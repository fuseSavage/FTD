import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Axios from 'axios';


export default function Home() {

    const [username, setUserName] = useState('')

    useEffect(() => {
        (
            async () => {
                // const response = await fetch(`http://localhost:3001/user`, {
                //     headers: { 'content-Type': 'application/json' },
                //     credentials: 'include',
                // });
                // const content = await response.json()
                // if (!content.message) {
                //     setDataList(content[0].name)
                //     // console.log(datalist)
                // }
                await Axios.get('http://localhost:3001/login').then((response) => {
                    if (response.data.loggedIn === true) {
                        console.log(response)
                        setUserName(response.data.user[0].name)
                    }
                })
            }
        )();
    });

    return (
        <div>
            <Row>
                <Col></Col>
                <Col><h1>{username ? 'Hi ' + username : 'You are not login'}</h1></Col>
                <Col></Col>
            </Row>
        </div>
    )
}