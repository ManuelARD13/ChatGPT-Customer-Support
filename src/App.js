import React, { useState } from "react";
const App = () => {

  const API_KEY = "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"

  const [ userInput, setUserInput ] = useState("");
  const [ messages, setMesages ] = useState([{
    message: "Hello world",
    sender: "ChatGPT"
  }]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user"
    }

    const newMessages = [...messages, newMessage];
    setMesages(newMessages);

    await processMessagesToChatGPT(newMessages)
  }

   const processMessagesToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObj) => {
      let role = ""
      if(messageObj.sender === "ChatGPT"){
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObj.message }
    })

    const systemMessage = {
      role: "system",
      content: "Speek like a pirate's parrot"
    }

    const apiRequestBody = {
      "model": "davinci",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <div>
      <input type="text" onChange={(e) => setUserInput(e.target.value)}/>
      <button onClick={() => handleSend(userInput)}>Send</button>
    </div>
  )
}

export { App }