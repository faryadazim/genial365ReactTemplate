import React from "react";
import { useSelector } from "react-redux";
const Footer = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
      <footer
        className={`footer   ${
          showNavMenu === false ? "footer-margin-remove" : " "
        }  `}
      >
        <div className="pull-right">
          React - ERP System by{" "}
          <a  href="https://www.technupur.com/" target="_blank" rel="noopener noreferrer">Technupur</a> 
        </div>
        <div className="clearfix" />
      </footer>
    </>
  );
};

export default Footer;
