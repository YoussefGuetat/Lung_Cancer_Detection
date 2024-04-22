import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Importez uuidv4 ici

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    createSession();
  }, []); // Appelé uniquement au chargement initial

  const projectId = 'rugged-reality-334720';
  const apiUrl = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId || ''}:detectIntent`;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const createSession = async () => {
    try {
      const newSessionId = uuidv4(); // Utilisez uuidv4 pour générer un nouvel ID de session
      setSessionId(newSessionId);
      await axios.post(`https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions`, null, {
        headers: {
          'Authorization': 'Bearer AIzaSyD6uQyvBocMFoZchmPaqw7X8pyGaG6Hh9w',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const sendMessage = async () => {
    const requestBody = {
      queryInput: {
        text: {
          text: inputValue,
          languageCode: 'en-US',
        },
      },
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AIzaSyD6uQyvBocMFoZchmPaqw7X8pyGaG6Hh9w',
        },
      });

      const botResponse = response.data.queryResult.fulfillmentText;
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setMessages([...messages, { text: botResponse, sender: 'bot' }]);
      setInputValue('');
    } catch (error) {
      console.error('Error sending message to Dialogflow:', error);
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
