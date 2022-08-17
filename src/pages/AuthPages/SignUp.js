import { updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext, useAuthContext } from "../../context";
import { auth } from "../../firebase.config";
import "./auth.css";

export const SignUp = () => {
  const { signUpHandler } = useAuthContext();
  const { toastHandler } = useAppContext();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd, email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      toastHandler(true, "Signing Up, wait a few seconds", "success");
      await signUpHandler(email, pwd);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate("/");
      toastHandler(true, "Signed Up!", "success");
    } catch (error) {
      setErrMsg(error.message);
      toastHandler(true, `something went wrong, ${error.message}`, "error");
    }
  };

  return (
    <section className="form-box">
      <h2>Sign Up!</h2>{" "}
      <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={submitHandler}>
        {/* firstName */}
        <div className="input-box">
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
            value={firstName}
            required
          />
          <label htmlFor="firstName" className="flex-center">
            First Name
          </label>
        </div>

        <div className="input-box">
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
            value={lastName}
            required
          />
          <label htmlFor="lastName" className="flex-center">
            Last Name
          </label>
        </div>

        {/* email */}
        <div className="input-box">
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            value={email}
            required
          />
          <label htmlFor="email" className="flex-center">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="input-box">
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <label htmlFor="password" className="flex-center">
            Password
          </label>
        </div>

        {/* confirm password */}
        <p
          id="confirmnote"
          className={!validMatch ? "instructions" : "offscreen"}
        >
          Must match the first password input field.
        </p>
        <div className="input-box">
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
          />
          <label htmlFor="confirm_pwd" className="flex-center">
            Confirm Password
          </label>
        </div>

        {/* submit button */}
        <button className="btn btn-primary-solid">Sign Up!</button>
        <div className="action-links">
          <Link to="/login">Already have an account? Login!</Link>
        </div>
      </form>
    </section>
  );
};
