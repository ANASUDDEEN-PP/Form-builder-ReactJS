import React, { useState } from "react";
import axios from "axios";
import apiUrl from "./API";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [inputs, setInputs] = useState([]); 
  const [showPopup, setShowPopup] = useState(false); 
  const [newInput, setNewInput] = useState({ type: "text", id: "", value: "" }); 
  const [terminalOutput, setTerminalOutput] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = inputs.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

    console.log("Submitting:", formData);

    try {
      const response = await axios.post(`${apiUrl}`, formData);
      console.log("Response:", response.data);
      setTerminalOutput(formatResponse(response.data));
      toast.success("Form Submitted Successfully");
      // setInputs([]);
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      setTerminalOutput(formatResponse(error.response?.data || error.message));
      toast.error(error.response?.data?.message || "Failed to submit the form.");
    }
  };

  const handleAddInput = () => {
    setShowPopup(true);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInput = () => {
    if (!newInput.type || !newInput.id) {
      toast.error("Type and ID are required!");
      return;
    }
    setInputs((prev) => [...prev, newInput]);
    setNewInput({ type: "text", id: "", value: "" });
    setShowPopup(false);
  };

  const handleDeleteInput = (id) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const formatResponse = (response) => {
    return JSON.stringify(response, null, 2); 
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Form Builder</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {inputs.map((input, index) => (
          <div key={index} style={styles.inputGroup}>
            <label style={styles.label}>
              {input.id}:
              <input
                type={input.type}
                id={input.id}
                value={input.value}
                onChange={(e) => {
                  const updatedInputs = [...inputs];
                  updatedInputs[index].value = e.target.value;
                  setInputs(updatedInputs);
                }}
                style={styles.input}
              />
            </label>
            <button
              type="button"
              onClick={() => handleDeleteInput(input.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>

      <button onClick={handleAddInput} style={styles.addButton}>
        Add Input Field
      </button>

      {showPopup && (
        <div style={styles.popup}>
          <h3>Add New Input Field</h3>
          <div style={styles.popupField}>
            <label style={styles.label}>
              Type:
              <select
                name="type"
                value={newInput.type}
                onChange={handleNewInputChange}
                required
                style={styles.input}
              >
                <option value="text">Text</option>
                <option value="password">Password</option>
                <option value="file">File</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="tel">Tel</option>
              </select>
            </label>
          </div>
          <div style={styles.popupField}>
            <label style={styles.label}>
              label:
              <input
                type="text"
                name="id"
                value={newInput.id}
                onChange={handleNewInputChange}
                required
                placeholder="Enter The Feild name According to Backend"
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.popupActions}>
            <button onClick={handleSaveInput} style={styles.popupButton}>
              Save
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={{ ...styles.popupButton, backgroundColor: "red" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={styles.terminal}>
        <pre style={styles.terminalText}>{terminalOutput}</pre>
      </div>
      <Toaster />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    flex: 1,
    marginRight: "10px",
  },
  input: {
    flex: 2,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  deleteButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    color: "white",
    backgroundColor: "red",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addButton: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    width: "90%",
    maxWidth: "400px",
  },
  popupField: {
    marginBottom: "15px",
  },
  popupActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  popupButton: {
    flex: 1,
    padding: "10px",
    margin: "0 5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  terminal: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontFamily: "'Courier New', monospace",
    borderRadius: "5px",
    overflowY: "auto",
    height: "200px",
  },
  terminalText: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default App;
