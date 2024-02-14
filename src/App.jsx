import React, { useState, useEffect } from "react";
import io from "socket.io-client"; //connect to socket.io server
import Chat from "./Components/Chat";
import { IoIosPeople } from "react-icons/io";
import Hero from "../src/assets/hero.svg";
import Navbar from "./Components/Navbar";

const socket = io.connect("https://chat-app-backend-1vxk.onrender.com");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShow(true);
    } else {
      alert("Enter the name and room ID to join a Chat!");
    }
  };

  return (
    <div>
      {!show ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="h-screen p-10 bg-green-primary rounded-tr-3xl rounded-br-3xl flex flex-col space-y-10 justify-center items-center">
            <h2 className="text-5xl text-white font-bold">Chat App</h2>
            <img
              src={Hero}
              alt="hero"
              className="w-[40em] max-w-md md:max-w-none"
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="bg-green-secondary rounded-lg w-[30em] max-w-md md:max-w-none h-[30em] flex flex-col gap-10 items-center justify-center">
              <div className="flex gap-2 items-center justify-center">
                <IoIosPeople className="text-5xl text-green-primary" />
                <h2 className="text-4xl text-green-primary font-bold">
                  Join a Chat Room
                </h2>
              </div>
              <form className="flex flex-col space-y-6 w-full max-w-md md:max-w-none p-4">
                <input
                  className="w-full border-2 border-green-primary rounded-md p-2"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="w-full border-2 border-green-primary rounded-md p-2"
                  type="text"
                  placeholder="Enter a Room ID"
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
                <button
                  onClick={joinRoom}
                  className="bg-green-primary text-white p-2 border-2 border-primary rounded-md font-medium"
                >
                  Start chatting
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <Chat socket={socket} room={room} name={name} />
        </div>
      )}
    </div>
  );
}

export default App;
