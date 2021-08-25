import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Slider } from "@lifarl/react-scroll-snap-slider";

import { Link } from "react-router-dom";

const Test = () => {
  return (
    <Wrapper>
      <LWrapper>
        <motion.h1>shadergradient</motion.h1>
        <motion.h1>Make</motion.h1>
        <motion.h1>your products</motion.h1>
        <motion.h1>
          <span>alive</span>
        </motion.h1>
        <motion.p>
          Customize all the moving gradients inspired by nature, emotions and
          blahand apply them to your products from Figma and Framer. <br />
          You can control Noise / Color / Speed / Lighting / Shape
        </motion.p>
        <SlideWrapper>
          <Slider>
            <SlideItem>Foo</SlideItem>
            <SlideItem>Bar</SlideItem>
            <SlideItem>Baz</SlideItem>
            <SlideItem>Foo</SlideItem>
            <SlideItem>Bar</SlideItem>
            <SlideItem>Baz</SlideItem>
            <SlideItem>Foo</SlideItem>
            <SlideItem>Bar</SlideItem>
            <SlideItem>Baz</SlideItem>
          </Slider>
        </SlideWrapper>
      </LWrapper>
      <RWrapper>
        <MobileLine></MobileLine>
      </RWrapper>
    </Wrapper>
  );
};

export default Test;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
  display: grid;
  grid-template-columns: 50vw 50vw;
`;

const LWrapper = styled.div`
  width: 50vw;
  height: 100vh;
`;

const RWrapper = styled.div`
  width: 50vw;
  height: 100vh;
  background: black;
`;

//https://github.com/lifarl/react-scroll-snap-slider
const SlideWrapper = styled.div`
  width: 50vw;
  background: green;
  display: flex;
  fliex-direction: column;
`;

const SlideItem = styled.div`
  width: fit-content;
  background: blue;
`;

const MobileLine = styled.div`
  box-sizing: border-box;
  width: 296px;
  height: 606px;
  overflow: hidden;
  border-radius: 27px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
`;
