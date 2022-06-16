import { io } from "socket.io-client";
import "../ChatRoom/style.css"
import { useState } from "react";
import Chat from "../Chat"

const socket = io.connect("https://infintyzone.herokuapp.com");

function ChatRoom() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h4>Join A Chat room now with a professional that will help you with the difficult decision
             of choosing the best product for your need
          </h4>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
        // <p>l</p>
      )}
    </div>
  );
}
export default ChatRoom;