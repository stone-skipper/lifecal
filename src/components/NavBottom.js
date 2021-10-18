import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavBottom = (props) => {
  const { daysNum } = props;
  return (
    <NavWrapper>
      <h2>
        {daysNum.toLocaleString()}
        <span>
          {" "}
          {daysNum.toString().slice(-1) === "1" ? "st" : ""}
          {daysNum.toString().slice(-1) === "2" ? "nd" : ""}
          {daysNum.toString().slice(-1) === "3" ? "rd" : ""}
          {daysNum.toString().slice(-1) !== "1" &&
          daysNum.toString().slice(-1) !== "2" &&
          daysNum.toString().slice(-1) !== "3"
            ? "th"
            : ""}{" "}
        </span>
        day
        {/* <span> in your life</span> */}
      </h2>
    </NavWrapper>
  );
};

export default NavBottom;

const NavWrapper = styled.div`
  width: 100vw;
  height: 5vw;
  background: rgba(255, 255, 255, 0.05);
  position: fixed;
  text-align: left;
  left: 0;
  bottom: 0;
  color: white;

  font-size: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  h2 {
    position: absolute;
    font-size: 40px;
    font-weight: 600;
    line-height: 5vw;
    top: 0.2vw;
    left: 1.5vw;
    margin: 0;
  }
  span {
    font-size: 10px;
    height: 0;
    margin-bottom: 1em;
    background: red;
  }
`;
