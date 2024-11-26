// App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Username : name,
      Password : password
    }
    console.log(formData);
    
    try {
      const response = await axios.post("http://localhost:8080/api/mobile/login", formData); // Replace with your API endpoint
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Form with Axios</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Field 1:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Field 2:
            <input
              type="text"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
