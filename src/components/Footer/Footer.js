import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <a href="https://twitter.com/partha_sarma8">
        <FaTwitter />
      </a>
      <a href="https://github.com/partha8">
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/partha8/">
        <FaLinkedin />
      </a>
      <a href="https://parthasarma.netlify.app/">
        <AiOutlineGlobal />
      </a>
    </footer>
  );
};
