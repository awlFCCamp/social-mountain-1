import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import Modal from "./modal/Modal";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false); // State to control the modal
  const [errorMessage, setErrorMessage] = useState(""); // Store the error message
  const openErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalIsOpen(true);
  };

  const closeErrorModal = () => {
    setErrorModalIsOpen(false);
    setErrorMessage("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        if (err.response.data) {
          //alert(err.response.data);
          openErrorModal(err.response.data);
        }
        console.error(err);
      });
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
      {/* Error Modal */}
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error Modal"
      >
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={closeErrorModal}>Close</button>
      </Modal>
    </main>
  );
};

export default Auth;
