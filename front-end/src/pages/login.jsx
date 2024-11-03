import { useEffect, useRef, useState } from "react";
import { loginUser } from "../operations/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(),
    passwordRef = useRef(),
    errRef = useRef();

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  let info = {
    email: logEmail,
    password: logPassword,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(JSON.stringify(info))
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <main className="App">
      
    <section >
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email: </label>
        <input
          id="logemail"
          type="email"
          value={logEmail}
          onChange={(e) => setLogEmail(e.target.value)}
          ref={emailRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault;
              passwordRef.current.focus();
            }
          }}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          id="logpw"
          type="password"
          value={logPassword}
          onChange={(e) => setLogPassword(e.target.value)}
          ref={passwordRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault;
              handleSubmit(e);
            }
          }}
        />
        <button>Sign In</button>
      </form>
      <p>
        
        Not registered?
        <br />
        <span className="line">
          <Link className="link_form" to={"/register"}>Sign up</Link>
        </span>
      </p>
    </section>
    </main>
  );
};

export default Login;
