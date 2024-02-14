import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { BiMicrophone } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBg from "../assets/chat-bg.jpg";

function Chat({ socket, name, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        user: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_msg", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_msg", receiveMessage);

    return () => {
      socket.off("receive_msg", receiveMessage);
    };
  }, [socket]);

  return (
    <div className="container mx-auto space-y-5 p-4 ">
      <div className="container mx-auto">
        <div className="container mx-auto flex flex-col">
          <div className="bg-green-primary rounded-md p-2 text-white">
            <h2 className="text-xl text-white font-bold">
              Room <span className="text-[#ff8fab]">{room}</span>{" "}
            </h2>
            <div className="flex flex-row items-center gap-1 text-sm">
              <p className="text-sm">online</p>
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-secondary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>
          </div>
        </div>
        <div
          className="relative px-1 py-1 rounded-md"
          style={{ backgroundImage: `url(${ChatBg})` }}
        >
          <ScrollToBottom className="h-[78vh]" style={{ overflowY: "hidden" }}>
            {messageList.map((messageContent, index) => {
              const isCurrentUser = name === messageContent.user;
              return (
                <div
                  key={index}
                  className={` flex items-center justify-start mb-2 gap-0.5 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`relative bottom-6 w-6 h-6 flex items-center justify-center rounded-full ${
                      isCurrentUser ? "bg-green-primary" : "bg-[#40916c]"
                    } `}
                  >
                    <p
                      className={`uppercase text-md ${
                        isCurrentUser ? "text-[#ff8fab]" : "text-[#bbdefb]"
                      } font-semibold`}
                    >
                      {messageContent.user[0]}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`p-2 text-white flex flex-col ${
                        isCurrentUser
                          ? "bg-green-primary rounded-bl-md rounded-tl-md rounded-tr-md"
                          : "bg-[#40916c] rounded-br-md rounded-tr-md rounded-bl-md"
                      }`}
                    >
                      <p
                        className={`${
                          isCurrentUser
                            ? "text-[#ff8fab] font-semibold"
                            : "text-[#bbdefb] font-semibold"
                        } text-xs `}
                      >
                        @{messageContent.user}
                      </p>
                      <p className="max-w-xl text-sm md:text-md lg:text-lg">
                        {messageContent.message}
                      </p>
                      <p className="text-white text-right text-xs">
                        {messageContent.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="container mx-auto flex relative">
          <input
            className="p-2 rounded-full bg-[#f8f9fa] border w-full pl-10"
            type="text"
            value={message}
            placeholder="Send a message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <BiMicrophone className="hover:cursor-pointer absolute right-[6em] top-1/2 transform -translate-y-1/2 text-gray-500" />
          <div className="bg-green-primary text-white p-2 rounded-full flex flex-row items-center gap-2">
            <button onClick={sendMessage}>Send</button>
            <IoSend className="text-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
