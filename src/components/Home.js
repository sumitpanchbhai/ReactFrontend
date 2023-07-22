import React from 'react'
import { Button,Card ,InputGroup,Form} from 'react-bootstrap';



export default function Home() {
    const  [message,setMessage] = React.useState('') 
    const [listMessage,setListMessage] = React.useState([])
    const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < listMessage.length; i++) {
            console.log(listMessage[i])
          divs.push(<Card className="mb-2" key={i} 
          style={{marginLeft:'2dvw',marginRight:'2dvw'}}> 
          <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{listMessage[i]}</Card.Subtitle>
          <Card.Text style={{color:'blue'}}>sumit</Card.Text>
          </Card.Body> </Card>);
        }
        return divs;
      };

    const renderUser = () => {
        const divs = [];
        for (let i = 0; i < 5; i++) {
          divs.push(<Card className="mb-2" key={i} style={{marginRight:'5dvw',backgroundColor:'rgb(93,219,109)'}}> 
          <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">'user'</Card.Subtitle>
          <Card.Text style={{color:'blue'}}>sumit</Card.Text>
          </Card.Body> </Card>);
        }
        

        return divs;
      };
    function appendMessage(){
        setListMessage((prevList) => [...prevList, message]);
        setMessage(''); 


    }
  return (
    <div>
    <div style={{width:'100%',height:'93vh',border:'2px solid black',display:'flex'}}>
      <div style={{height:'100%' ,border:'2px solid black',display:'flex',flexFlow:'column',width:'70%',flex:'1',backgroundColor:'#434242',overflow:'auto'}}>
        {renderUser()}
      </div>
      
      <div style={{height:'100%',border:'2px solid black',display:'flex',width:'30%',flex:'2',position:'relative'}}>
        <div style={{
            backgroundColor:'rgb(50,50,52)',
            position:'absolute',height:'87%',border:'2px solid black',width:'100%',overflow: 'auto'}}>
        {renderDivs()}
        </div>
        <div style={{position:'absolute',bottom:'0px'}}>
                {/* <input type="text" id='inputField' value={message} onChange={(e)=>setMessage(e.target.value)}/> */}
                <InputGroup className="mb-3">
                    <Form.Control aria-describedby="basic-addon1" value={message} onChange={(e)=>setMessage(e.target.value)} />
                </InputGroup>
                <Button onClick={appendMessage}>submit</Button>
        </div>
      </div>
    </div>
    </div>
  )
}
