import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
const Basic = () => {
  return (
    <BasicWrapper>
      <Nav></Nav>
      {/* <Foot>
        Created by{" "}
        <a
          href="https://seungmee-lee.com"
          style={{ textDecoration: "none", color: "white" }}
        >
          stone.skipper
        </a>
        <br />
        Copyright © 2021 stone.skipper all rights reserved
      </Foot> */}
    </BasicWrapper>
  );
};

export default Basic;

const BasicWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: none;
  position: fixed;
  left: 0;
  top: 0;
`;

const Foot = styled.div`
  width: 97vw;
  position: fixed;
  bottom: 3vw;
  left: 3vw;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  font-size: 12px;
`;
