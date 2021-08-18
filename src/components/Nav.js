import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  return (
    <NavWrapper>
      <StyledLink to="/">*</StyledLink>
      <Question>?</Question>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.div`
  width: 5vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.05);
  position: fixed;
  text-align: center;
  right: 0;
  top: 0;
  font-size: 50px;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-top: 3vh;
  height: 19px;
  color: white;
  width: 100%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    transform: rotate(360deg) scale(1.1);
    transition: 1s;
  }
`;

const Question = styled.div`
  width: 5vw;
  background: rgba(255, 255, 255, 0.08);
  height: 5vw;
  font-size: 40px;
  position: absolute;
  color: white;
  bottom: 0;
  left: 0;
  line-height: 5vw;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
