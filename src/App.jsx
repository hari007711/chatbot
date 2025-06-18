// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import { IoCodeSlash, IoSend } from "react-icons/io5";
// import { BiPlanet } from "react-icons/bi";
// import { FaPython } from "react-icons/fa";
// import { TbMessageChatbot } from "react-icons/tb";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function App() {
//   const [message, setMessage] = useState("");
//   const [isResponse, setIsResponse] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const sendRequest = () => {
//     if (message.trim()) {
//       generateResponse(message);
//     } else {
//       alert("You must write something...");
//     }
//   };

//   const generateResponse = async (msg) => {
//     if (!msg) return;
//     setLoading(true);

//     try {
//       const genAI = new GoogleGenerativeAI(
//         "AIzaSyC6khYkAsLx_qi2ABkNA_ZrCJTF7117yWQ"
//       );
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const result = await model.generateContent(msg);
//       const responseText = result.response.text();

//       const newMessages = [
//         ...messages,
//         { type: "userMsg", text: msg },
//         { type: "responseMsg", text: responseText },
//       ];

//       setMessages(newMessages);
//       setIsResponse(true);
//       setMessage("");
//     } catch (error) {
//       console.error("Error generating response:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, loading]);

//   return (
//     <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
//       {isResponse ? (
//         <div className="h-[80vh]">
//           <div className="header pt-[25px] mb-[14px] flex items-center justify-between w-[100vw] px-[300px]">
//             <h2 className="text-2xl">Assist Me</h2>
//             <button
//               id="newchatbtn"
//               className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
//             >
//               New Chat
//             </button>
//           </div>
//           <div className="messages-container h-[calc(80vh-80px)] overflow-y-auto px-[300px] pt-[30px]">
//             <div className="messages space-y-4">
//               {messages.map((msg, index) => {
//                 const lines = msg.text
//                   .split("\n")
//                   .filter((line) => line.trim() !== "");
//                 const isLong = lines.length > 2 || msg.text.length > 150;

//                 return (
//                   <div key={index} className={msg.type}>
//                     {msg.type === "responseMsg" && isLong ? (
//                       <ul className="list-disc ml-6 space-y-1">
//                         {lines.map((line, i) => (
//                           <li key={i}>{line}</li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>{msg.text}</p>
//                     )}
//                   </div>
//                 );
//               })}

//               {loading && (
//                 <div className="responseMsg text-gray-400 italic animate-pulse">
//                   Getting response...
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="middle h-[80vh] flex items-center flex-col justify-center">
//           <h1 className="text-4xl">Assist Me</h1>
//           <div className="boxes mt-[30px] flex items-center gap-2">
//             {[
//               {
//                 text: "what is coding ?\nHow we can learn it.",
//                 icon: <IoCodeSlash />,
//               },
//               {
//                 text: "which is red\nplanet solar\nsystem",
//                 icon: <BiPlanet />,
//               },
//               {
//                 text: "In which year python\nwas invented ?",
//                 icon: <FaPython />,
//               },
//               {
//                 text: "How can we use\nthe AI for adopt ?",
//                 icon: <TbMessageChatbot />,
//               },
//             ].map((card, index) => (
//               <div
//                 key={index}
//                 className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]"
//               >
//                 <p className="text-[18px] whitespace-pre-line">{card.text}</p>
//                 <i className="absolute right-3 bottom-3 text-[18px]">
//                   {card.icon}
//                 </i>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="bottom w-[100%] flex flex-col items-center">
//         <div className="inputBox w-[75%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
//           <input
//             type="text"
//             value={message}
//             className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
//             placeholder="write your message here"
//             id="messageBox"
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendRequest();
//             }}
//           />
//           {message && (
//             <i
//               className="text-green-500 text-[20px] mr-5 cursor-pointer"
//               onClick={sendRequest}
//             >
//               <IoSend />
//             </i>
//           )}
//         </div>
//         <p className="text-[gray] text-[14px] my-4">
//           this AI uses the Gemini API for giving the responses
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./chatBotApp";
import { Login } from "./login";
// import Register from "./Register";
// import ProtectedRoute from "./protected";
import Register from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
