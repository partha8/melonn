import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext, useAuthContext } from "../../context";
import "./auth.css";

export const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const { loginHandler } = useAuthContext();
  const { toastHandler } = useAppContext();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toastHandler(true, "Logging in, wait a few seconds", "success");
      await loginHandler(email, pwd);
      navigate("/");
      toastHandler(true, "Logged In!", "success");
    } catch (error) {
      setErrMsg(error.message);
      toastHandler(true, `Something went wrong, ${error.message}`, "error");
    }
  };

  return (
    <section className="form-box">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label className="flex-center" htmlFor="email">
              Email:
            </label>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <label className="flex-center" htmlFor="password">
              Password:
            </label>
          </div>

          <button className="btn btn-primary-solid">Sign In</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEmail("parthasarma34@gmail.com");
              setPwd("1234567");
            }}
            style={{ color: "white" }}
            className="btn btn-primary-outline"
          >
            Guest Login
          </button>
        </form>

        <br />
        <div className="action-links">
          <Link to="/signup">Need an account? Sign up!</Link>
        </div>
      </section>
    </section>
  );
};
