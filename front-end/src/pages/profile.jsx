import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { getMe,updateMe } from "../operations/axios";

const UserSettings = () => {
  const token = localStorage.getItem("token");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getMe(token)
      .then((res) => {
        setFirstName(res.firstname); // Update the firstName state
        setLastName(res.lastname); // Update the lastName state
        setEmail(res.email); // Update the email state
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);
  let info ={
    email: email,
    firstname: firstName,
    lastname: lastName,
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updateMe(token, JSON.stringify(info))
    .then((res) => { console.log(res);})
    .catch((error) => { console.error(error);})
    
  }

  return (
    <div className="user-settings">
      <h1>User Settings</h1>
      <form className="user-settings-form"
      onSubmit={handleSubmit}
      >
        <label>
          First Name:
          <input
            type="text"
            ref={firstNameRef}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            ref={lastNameRef}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserSettings;
