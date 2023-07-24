import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { receivedMsgs } from "./convo";
import Avatar from "@mui/material/Avatar";

function Chat({ selectedFriend, sentMessages, onSend }) {
  const [msg, setMsg] = useState("");

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sentMessages]);

  const receivedMessages = receivedMsgs.find(
    (message) => message.senderId === selectedFriend.id
  );

  const receivedMessagesArray = receivedMessages?.messages || [];

  const allMessages = [
    ...sentMessages.map((message) => ({
      ...message,
      type: "sent",
      Timestamp: message.timestamp,
      unixTimestamp: message.unixTimestamp,
    })),
    ...receivedMessagesArray.map((message) => ({
      ...message,
      type: "received",
      senderName: receivedMessages.senderName,
      Timestamp: message.timestamp,
      unixTimestamp: message.unixTimestamp,
    })),
  ];

  const sortedMessages = allMessages.sort(
    (a, b) => a.unixTimestamp - b.unixTimestamp
  );
  const handleSend = (e) => {
    e.preventDefault();

    if (msg) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const unixTimestamp = Math.floor(new Date().getTime() / 1000);
      const sentDate = new Date().toLocaleDateString();
      const newMessage = {
        message: msg,
        toSend: selectedFriend.id,
        toSendName: selectedFriend.userName,
        timestamp: timestamp,
        unixTimestamp: unixTimestamp,
        sentDate: sentDate,
      };
      console.log(newMessage);
      
      onSend(newMessage);
      setMsg("");
    }
  };

  return (
    <div>
      <div
        className="ml-5"
        style={{
          overflowY: "scroll",
          height: "auto",
          maxHeight: "calc(100vh - 8rem)",
          flexDirection: "column-reverse",
        }}
      >
        {sortedMessages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          sortedMessages?.map((message, index) => (
            <div
              className={`d-flex ${
                message.type === "sent"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
              key={index}
            >
              <Card
                className={`mr-5 ${
                  message.type === "sent" ? "sent-card" : "received-card"
                }`}
                style={{
                  margin: "0",
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "bold",
                
                }}
              >
                <Card.Body
                  style={{
                    margin:'0',
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Avatar
                      src="/broken-image.jpg"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <h5
                      style={
                        message.type === "sent"
                          ? { color: "red", marginLeft: "5px" }
                          : { color: "blue", marginLeft: "5px" }
                      }
                    >
                      {message.type === "sent"
                        ? "you"
                        : message.senderName || "Unknown"}
                    </h5>
                  </div>
                  {message.message}
                  <div
                    style={{
                      fontSize: "smaller",
                      fontWeight: "lighter",
                      textAlign: "right",
                    }}
                  >
                    {message.timestamp}
                  </div>
                  <div ref={messageEndRef} />
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
      <form style={{ width: "100%", display: "flex" }} onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type Message"
          style={{ flex: "1", marginRight: "10px" }}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <Button style={{ width: "100px" }} type="submit" >
          Send
        </Button>
      </form>{" "}
    </div>
  );
}

export default Chat;