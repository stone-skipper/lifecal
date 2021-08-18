import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { SliderPicker } from "react-color";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";

var name, setName;
var birthday, setBirthday;
var color1, setColor1;
var color2, setColor2;
var visible, setVisible;
var colorChange, setColorChange;
const Profile = () => {
  [name, setName] = React.useState("");
  [birthday, setBirthday] = React.useState("1994-07-08");
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  [visible, setVisible] = React.useState(true);
  [colorChange, setColorChange] = React.useState(true);

  const [title, setTitle] = React.useState("");

  const nameRef = React.useRef();
  const birthdayRef = React.useRef();
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;
  const profile = {
    name: name,
    birthday: birthday,
    color1: color1,
    color2: color2,
  };
  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;

    p.setup = () => {
      p.createCanvas(width, width);
      p.drawBackground();
      p.setupPosition();
      p.frameRate(10);
      t = 0;
      // p.noLoop()
    };

    p.setupPosition = () => {};

    p.windowResized = () => {
      p.resizeCanvas(width, width);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      // p.background("red")
      p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      // p.background(0);
      p.translate(width / 2, width / 2);
      t = t + 0.01;

      for (let i = 0; i < 2000; i++) {
        let theta = p.random(0, p.TWO_PI);
        let h = p.randomGaussian(5 - t); //experiment with different means
        let r = ((p.exp(h) - 1) / (p.exp(h) + 1)) * 0.7;
        let x = height * r * p.cos(theta);

        let y = height * r * p.sin(theta);
        let inter = p.map(y, -height * 0.3, height * 0.3, 0, 1);
        let c = p.lerpColor(p.color(color1), p.color(color2), inter);
        p.fill(c);
        p.ellipse(x, y, 2, 2);
        p.ellipse(x + p.random(-7, 7), y + p.random(-7, 7), 1, 1);
      }
    };
  };
  const fadeRefresh = async () => {
    await setColorChange(false);
    await console.log(colorChange);
    await setColorChange(true);
    await console.log(colorChange);
  };

  React.useEffect(() => {
    let newp5 = new p5(sketch, p5ref.current);
    fadeRefresh();

    return () => {
      newp5.remove();
      fadeRefresh();
    };
  }, [color1, color2]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "calc(100vw - 120vh)",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        // scale: visible ? 1 : 0.7,
        display: visible ? "block" : "none",
      }}
      transition={{
        duration: 2,
        display: {
          delay: 4,
        },
      }}
    >
      <Title>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {title}*
          <br />
          LIFE*LOG
        </Link>
      </Title>
      <motion.div
        style={{ originY: 0.5 }}
        animate={{ rotate: 360, opacity: colorChange ? 1 : 0 }}
        transition={{
          rotate: { duration: 400, loop: Infinity, ease: "linear" },
          opacity: { duration: 5 },
        }}
      >
        <P5bg ref={p5ref}></P5bg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <ProfileWrapper>
          <h1>Welcome onboard</h1>
          <InputWrapper>
            <p>name / </p>
            <input
              ref={nameRef}
              onChange={(e) => {
                setTitle(nameRef.current.value);
                console.log(nameRef.current.value);
              }}
              placeholder="set your name"
              type="text"
              maxLength={10}
              pattern="[0-9]*"
            ></input>
          </InputWrapper>
          <InputWrapper>
            <p>birthday / </p>
            <input
              ref={birthdayRef}
              onChange={(e) => {
                console.log(birthdayRef.current.value);
                if (e.target.value.length === 4) {
                  e.target.value = e.target.value + "-";
                } else if (e.target.value.length === 7) {
                  e.target.value = e.target.value + "-";
                }
              }}
              placeholder="yyyy-mm-dd"
              type="text"
              maxLength={10}
              pattern="[0-9]*"
            ></input>
          </InputWrapper>
          <InputWrapper>
            <p style={{ color: color1 }}>color1 / </p>
            <SliderPicker
              color={color1}
              onChangeComplete={(color) => {
                setColor1(color.hex);
              }}
            ></SliderPicker>
          </InputWrapper>
          <InputWrapper>
            <p style={{ color: color2 }}>color2 / </p>
            <SliderPicker
              color={color2}
              onChangeComplete={(color) => {
                setColor2(color.hex);
              }}
            ></SliderPicker>
          </InputWrapper>
          <ProfileBtn
            onClick={() => {
              setName(nameRef.current.value);
              setBirthday(birthdayRef.current.value);
              setVisible(false);

              store.dispatch({
                type: "PROFILE",
                name: nameRef.current.value,
                birthday: birthdayRef.current.value,
                color1: color1,
                color2: color2,
              });
            }}
          >
            →→set→→
          </ProfileBtn>
        </ProfileWrapper>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  width: 30vw;
  height: 50vh;
  // background: blue;
  position: fixed;
  left: 35vw;
  top: 25vh;
  display: grid;
  grid-template-rows: repeat(4, 9vh);
  z-index: 10;
`;

const InputWrapper = styled.div`
  font-size: 20px;
  display: grid;
  grid-template-columns: 30% 70%;
  height: 5vh;
  p {
    color: white;
  }
  input {
    background: none;
    border: none;
    color: white;
    font-family: "Neue Machina";
    font-size: 20px;
  }
`;

const ProfileBtn = styled.div`
  width: auto;
  height: fit-content;
  font-size: 20px;
  cursor: pointer;
  background: white;
  color: blue;
  text-align: center;
  font-style: italic;
  margin-top: 2vh;
`;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vw;
  margin-top: calc(100vh / -1.1);
`;

const Title = styled.h1`
  text-transform: uppercase;

  font-size: 15px;
  font-weight: 600;
  padding-bottom: 3px;
  width: fit-content;
  position: fixed;
  z-index: 10;
  left: 3vw;
  top: 2vw;
  border-bottom: 2px solid rgba(255, 255, 255, 0);
  transition: 0.5s;

  &:hover {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
  }
`;
