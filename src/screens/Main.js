import React from "react";
import styled from "styled-components";
import Basic from "../components/Basic";
import * as p5 from "p5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Main = () => {
  // const { width, height, color1, color2 } = props
  var width = window.innerWidth;
  var height = window.innerHeight;
  var b1, b2;
  var color1 = "#0A6AFA";
  var color2 = "#FFD500";

  const p5ref = React.useRef(null);
  const [anim, setAnim] = React.useState(false);
  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;
    var canvas;

    p.setup = () => {
      canvas = p.createCanvas(width * 5, height * 2.5);
      p.drawBackground();
      p.setupPosition();
      b1 = p.color(color1);
      b2 = p.color(color2);
      p.frameRate(15);
      p.noiseDetail(1);
      t = 0;
      // p.noLoop()
    };

    p.setupPosition = () => {
      x = 0;
      y = (-height * 1.5) / 2;
      canvas.position(x, y);
    };

    p.windowResized = () => {
      p.resizeCanvas(width * 5, height * 2.5);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      t = t + 0.02;
      p.translate(0, (height * 2.5) / 2);
      // let inter = p.map(t, 0, 1, 0, 1)
      // let c = p.lerpColor(
      //     p.color(142, 40, 230),
      //     p.color(85, 142, 230),
      //     inter
      // )
      // // console.log(t)
      // console.log(c._array)
      // p.fill(c)
      if (t > 2) {
        setAnim(true);
      }
      // p.stroke(c)

      for (let i = 0; i < 500; i++) {
        let theta = p.random(0, p.TWO_PI);
        let h = p.randomGaussian(5, 1); //experiment with different means
        let r = ((p.exp(h) - 100) / (p.exp(h) + 100)) * t * t;

        let x =
          (p.noise(50) * width * t) / 2 +
          p.random(0, 40) *
            p.cos(t) *
            r *
            p.tan(t) *
            p.noise(1, 10) *
            p.sin(theta) *
            p.exp(theta);

        let inter = p.map(x, 0, width * 2, 0, 1);
        let c = p.lerpColor(b1, b2, inter);
        p.fill(c);
        let y =
          (height / p.exp(h)) *
            (height / 10) *
            p.sin(theta) *
            p.tan(t) *
            p.sin(theta) *
            p.cos(theta) +
          p.random(-100 * p.tan(theta), 100 * p.tan(theta));

        p.ellipse(x, y, 1, 1);
        p.ellipse(x + p.random(0, 10), y + p.random(0, 10), 1, 1);
      }
    };
  };

  React.useEffect(() => {
    let newp5 = new p5(sketch, p5ref.current);

    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <MainWrapper>
      <motion.div
        animate={{
          scale: anim ? 0.4 : 1,
          originX: 0,
          transition: { duration: 30 },
        }}
      >
        <BG ref={p5ref}></BG>
      </motion.div>
      <Basic></Basic>

      <Content>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
          }}
        >
          LIFE*LOG
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            delay: 0.5,
          }}
        >
          Calendar in a scale of your life. <br />
          Mark your moments and milestones.
        </motion.p>
        <StartBtn>
          <Link
            to={"/timelineView"}
            style={{
              display: "block",
              textDecoration: "none",
              color: "white",
              width: "fit-content",

              padding: "20px",
            }}
          >
            →→Create yours→→
          </Link>
        </StartBtn>
        {/* <StartBtn>
          <Link
            to={"/timeline"}
            style={{
              display: "block",
              textDecoration: "none",
              color: "white",
              width: "fit-content",

              padding: "20px",
            }}
          >
            →→I already have one→→
          </Link>
        </StartBtn> */}
      </Content>
    </MainWrapper>
  );
};

export default Main;
const MainWrapper = styled.div`
  width: fit-content;
  height: 100vh;
  overflow-x: scroll;
  position: absolute;
`;

const BG = styled.div`
  width: 500vw;
  height: 100vh;
`;

const Content = styled.div`
  width: 50vw;
  height: 80vh;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  text-align: left;
  font-weight: light;
  h1 {
    font-size: 100px;
    font-weight: 400;
    margin-left: 3vw;
  }
  p {
    margin-left: 3.2vw;
    margin-top: -4vh;
    font-size: 15px;
    line-height: 1.5;
  }
`;

const StartBtn = styled.div`
  width: fit-content;
  height: fit-content;
  font-style: italic;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  margin-left: 3vw;
  margin-top: 30vh;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;
