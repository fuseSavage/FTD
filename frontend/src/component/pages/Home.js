import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'


export default function Home() {

    const [datalist, setDataList] = useState('')

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3001/user`, {
                    headers: { 'content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json()
                if (!content.message) {
                    setDataList(content[0].name)
                    // console.log(datalist)
                }
            }
        )();
    });

    return (
        <div>
            <Row>
                <Col></Col>
                <Col><h1>{datalist ? 'Hi ' + datalist : 'You are not login'}</h1></Col>
                <Col></Col>
            </Row>
        </div>
    )
}