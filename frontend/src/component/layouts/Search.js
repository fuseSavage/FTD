// import React, { useEffect, useState } from 'react';
// import { Button, Card, Form } from 'react-bootstrap';
// import Axios from 'axios';


// export default function Search() {
//     const [EXP_ID, SetEXP_ID] = useState("");
//     const [data, setData] = useState([])

//     const getSelect = () => {
//         // if (datalist) {
//             Axios.get(`http://localhost:3001/select?EXP_ID=${EXP_ID}`).then((response) => {
//                 setData(response.data);
//                 console.log(data)
                
//             })
//         // } else {
//         //     console.log("data NO NO");
//         //     window.location.reload(false);
//         // }
//     }

//     return (
//         <div className="card w-500 h-auto">
//             <Card style={{ width: '18rem', marginTop: '1%' }}>
//                 <Card.Header style={{ backgroundColor: '#c6ff00', fontWeight: 'bold' }}>No BIN.</Card.Header>
//                 <Card.Body>
//                     <Form>
//                         <Form.Group>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter No BIN."
//                                 onChange={(event) => {
//                                     SetEXP_ID(event.target.value);
//                                 }}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Card.Body>
//                 <Button variant="outline-success" onClick={getSelect}>Success</Button>
//             </Card>
//         </div>
//     )
// }
