import React, { useEffect ,useRef} from 'react';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
// import WebSocketClient from './WebSocketClient';
import axios from 'axios';
export default function Home() {

  const inputRef = useRef(null);

  // // const { client, sendMessage } = WebSocketClient();

  // const [message, setMessage] = React.useState('');
  const [listMessage, setListMessage] = React.useState([]);
  const [userList,setuserList] = React.useState([]);
  useEffect(() => {
      // const ID = localStorage.getItem('userID')
       
    console.log('Error fetching data: sumit',sessionStorage.getItem("Token"));

    let config = {
      method: "get",
      url: `http://localhost:8000/userConnectionsData`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },}
      axios(config)
              .then(response => {
                console.log('Error fetching data: sumit', response.data.status);
                if (response.data.status===true){
                  console.log(response.data.message)
                  setuserList(response.data.message)
                }else{
                  console.log("error")
                }

              })
              .catch(error => {
                console.error('Error fetching data:', error);

              });


    // client.onmessage = (Reviedmessage) => {
    //   const newData = {
    //     id: listMessage.length + 1,
    //     name: 'sumit',
    //     message: Reviedmessage.data,
    //   };
    //   console.log('Received message new:',client.readyState, Reviedmessage.data);
    //   setListMessage((prevList) => [...prevList, newData]);
    // };
  },[] );

  const handleSendMessage = () => {
      const newData = {
        id_sender:  1,
        id_reciver :0,
        name: 'sumit',
        message: inputRef.current.value,
      };
      // sendMessage(newData);
      inputRef.current.value =null
      setListMessage((prevList) => [...prevList, newData]);
    
  };

  const renderDivs = () => {
    const divs = [];
    for (let i = 0; i < listMessage.length; i++) {
      divs.push(
        <Card className="mb-2" key={i} style={{ marginLeft: '2dvw', marginRight: '2dvw' }}>
          <Card.Body>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'block',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  marginRight: '0.5rem',
                }}
              ></span>
              <Card.Text style={{ color: 'blue' }}>
                <b>{listMessage[i].name}</b>{' '}
              </Card.Text>
            </div>
            <Card.Subtitle className="mb-2 text-muted">{listMessage[i].message}</Card.Subtitle>
          </Card.Body>{' '}
        </Card>
      );
    }
    return divs;
  };

  const renderUser = () => {
    const divs = [];
    for (let i = 0; i < userList.length; i++) {
      console.log("username",i)
      divs.push(
        <Card className="mb-2" key={i.id} style={{ marginRight: '5dvw', backgroundColor: 'rgb(93,219,109)' }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{userList[i].user_name}</Card.Subtitle>
          </Card.Body>
        </Card>
      );
    }
    return divs;
  };


  return (
    <div>
      <div style={{ width: '100%', height: '93vh', border: '2px solid black', display: 'flex' }}>
        <div style={{ height: '100%', border: '2px solid black', display: 'flex', flexFlow: 'column', width: '70%', flex: '1', backgroundColor: '#434242', overflow: 'auto' }}>
          {renderUser()}
        </div>

        <div style={{ height: '100%', border: '2px solid black', display: 'flex', width: '30%', flex: '2', position: 'relative' }}>
          <div style={{ backgroundColor: 'rgb(50,50,52)', position: 'absolute', height: '87%', border: '2px solid black', width: '100%', overflow: 'auto' }}>
            {renderDivs()}
          </div>
          <div style={{ position: 'absolute', bottom: '0px' }}>
            <InputGroup className="mb-3">
              <Form.Control aria-describedby="basic-addon1"  ref={inputRef}/>
            </InputGroup>
            <Button onClick={handleSendMessage}>submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
