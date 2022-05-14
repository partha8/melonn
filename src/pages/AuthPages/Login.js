import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./auth.css";

export const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const { loginHandler } = useAuthContext();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(email, pwd);
      navigate("/");
    } catch (error) {
      setErrMsg(error.message);
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
        </form>

        <br />
        <div className="action-links">
          <Link to="/signup">Need an account? Sign up!</Link>
        </div>
      </section>
    </section>
  );
};
