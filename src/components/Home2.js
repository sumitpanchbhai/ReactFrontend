import React, { useEffect, useState } from "react";
import {  Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Chat from "./Chat";
import axios from "axios";
function Home2() {
  const [friends,setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [sentMessagesMap, setSentMessagesMap] = useState({});
  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };
useEffect(()=>{
    let config = {
        method: "get",
        url: `http://192.168.2.60:5000/userConnectionsData`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      console.log("configconfig",config)
      axios(config)
        .then((response) => {
          console.log("Error fetching data: sumit", response.data.status);
          if (response.data.status === true) {
            console.log(response.data.message);
            setFriends(response.data.message);
            // console.log(friends)
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
},[])
  
function handleSocket(){
    console.log("count")
}

//   const handleSearch = () => {
//     console.log(friends)
//     if (search.trim() !== "") {
       
//       let filtered = friends.filter((friend) =>
//         friend.user_name?.toLowerCase().includes(search.toLowerCase())
//       );
//       setFilteredFriends(filtered);
//       console.log(filteredFriends, search);
//     } else {
//       setFilteredFriends(friends);
//     }
//   };

  const handleSend = (message) => {

    let config = {
        method: "post",
        url: `http://192.168.2.60:5000/messagedata`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
        data:message,
      }
      console.log("configconfig",config)
      axios(config)
        .then((response) => {
          console.log("Error fetching data: sumit", response.data);
          if (response.data.status === true) {
            console.log(response.data.message);
            setSentMessagesMap((sentMessagesMap) => ({
                ...sentMessagesMap,
                [selectedFriend.id]: [
                  ...(sentMessagesMap[selectedFriend.id] || []),
                  message,
                ],
              }));
            // console.log(friends)
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    
  };

  return (
    <div>
      <div
        style={{ height: "calc(100vh - 20px)",  }}
        className="d-flex"
      >
        <Card
          style={{
            width: "30%",
            height: "100%",
            backgroundColor: "#D3D3D3",
            overflowY: "scroll",
          }}
        >
       


          {friends.map((friend) => ( 
           <div>
            <ListGroup
              variant="flush"
              style={{ backgroundColor: "#D3D3D3" }}
              key={friend.id}
            >
              <ListGroup.Item
              key={friend.id}
                style={
                  friend === selectedFriend
                    ? { backgroundColor: "blue", textAlign: "left" }
                    : { backgroundColor: "#D3D3D3", textAlign: "left" }
                }
              >
                <button
                key={friend.id}
                  style={{
                    border: "none",
                    backgroundColor:
                      friend === selectedFriend ? "blue" : "#D3D3D3",
                    cursor: "pointer",
                  }}
                  onClick={() => handleFriendClick(friend)}
                >
                  <h5 key={friend.id}>{friend.user_name}</h5>
                </button>
              </ListGroup.Item>
            </ListGroup>
            </div>
          ))}
        </Card>
        <Card
          style={{
            flex: "1",
            height: "100%",
            backgroundColor: "#D3D3D3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          {!selectedFriend ? (
            <div
              style={{ height: "100%" }}
              className="d-flex align-items-center justify-content-center"
            >
              <h1>Click on a user to start messaging</h1>
              <button onClick={handleSocket}>Web socket</button>
            </div>
          ) : (
            <>
              <Chat
                selectedFriend={selectedFriend}
                sentMessages={sentMessagesMap[selectedFriend.id] || []}
                onSend={handleSend}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Home2;