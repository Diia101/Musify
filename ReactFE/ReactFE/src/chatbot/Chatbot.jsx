import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    try {
      await axios.post("http://127.0.0.1:5000/set_language", {
        language: selectedLanguage,
      });
    } catch (error) {
      console.error("Error setting the language:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting...");
    if (!userInput.trim()) return;

    const currentTime = new Date().toLocaleTimeString();
    const newMessage = { type: "user", content: userInput, time: currentTime };

    setMessages([...messages, newMessage]);
    setUserInput("");

    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_answer", {
        question: userInput,
        language: language,
      });

      console.log("RESPONSE FROM BACKEND:", response.data);

      const botTime = new Date().toLocaleTimeString();

      setMessages([
        ...messages,
        newMessage,
        {
          type: "bot",
          content: response.data.response || "No answer.",
          time: botTime,
        },
      ]);
    } catch (error) {
      console.error("Error fetching the response:", error);
      setMessages([
        ...messages,
        newMessage,
        {
          type: "bot",
          content: "Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  return (
    <Modal id="chatbot" show={open} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>CHRIS the Chatbot</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          height: "400px",
          overflowY: "auto",
          background: "#f1f1f1",
          padding: "15px",
        }}
        ref={chatBodyRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                background: message.type === "user" ? "#007bff" : "#e2e2e2",
                color: message.type === "user" ? "white" : "black",
                textAlign: message.type === "user" ? "right" : "left",
                marginLeft: message.type === "user" ? "auto" : "0",
                position: "relative",
              }}
              title={`Sent at ${message.time}`}
            >
              <i
                className={`fas fa-${message.type === "user" ? "user" : "robot"} icon`}
                style={{
                  fontSize: "20px",
                  marginRight: message.type === "user" ? "0" : "10px",
                  marginLeft: message.type === "user" ? "10px" : "0",
                }}
              ></i>
              <div data-cy="message-content">{message.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div
          style={{
            padding: "15px",
            background: "#007bff",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <select
            id="language-select"
            className="form-control"
            style={{ width: "200px", marginRight: "10px" }}
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ro">Română</option>
            <option value="es">Español</option>
          </select>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="input-group">
              <input
                type="text"
                id="user-input"
                className="form-control"
                placeholder="Type your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{
                  borderRadius: "20px",
                }}
              />
              <div className="input-group-append">
                <Button
                  id="sendButton"
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
Chatbot.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Chatbot;
