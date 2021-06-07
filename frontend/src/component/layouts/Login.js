import React, {useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'


export default function Login() {

    const [uid, setUid] = useState();
    const [password, setPassword] = useState();

    const [loginstatus, setLoginStatus] = useState('');

    const handleSuccess = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                uid: uid,
                password: password,
            })
        }).then(async (response) => {
            // console.log(await response.json())
            const content = await response.json();
            // console.log(content.message)
            if (content.message) {
                setLoginStatus(content.message);
            } else {
                setLoginStatus(null)
            }
        })
        window.location.reload(false);
    }
    
    return (
        <div>
            <Card>
                <Card.Header><strong>Login</strong></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter GID"
                                onChange={(event) => {
                                    setUid(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <p>{loginstatus}</p>
                </Card.Body>
                <Button variant="success" onClick={handleSuccess} >Success</Button>
            </Card>
        </div>
    )
}