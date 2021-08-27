import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": "5d9e299e-68c4-4df6-ad57-87fc8bf27032",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      // username | password matches => chatengine -> shows previous chat
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      // works out -> logged in successfully
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      // error -> try with right credentials
      setError("Oops, incorrect credentials!");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">ChatOn</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
