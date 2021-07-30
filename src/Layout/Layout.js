import React from "react";
import { Link } from "react-router-dom";
import { title } from "../assets";
import "./Layout.css";

const Layout = ({ children }) => (
  <>
    <header>
      <Link to="/">
        <img className="logo" src={title} alt="MyTeam" />
      </Link>
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
