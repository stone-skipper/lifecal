import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";

var color1, setColor1;
var color2, setColor2;

const ColorSketch3 = () => {
  [color1, setColor1] = React.useState("#3d7fff");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;

    p.setup = () => {
      p.createCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
      //   p.frameRate(10);
      t = 0;
      // p.noLoop();
    };

    p.setupPosition = () => {};

    p.windowResized = () => {
      p.resizeCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      // p.background("red")
      //   p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      // p.background(0);
      p.translate(width / 2, height);
      t = t + 0.01;

      for (let i = 0; i < 100; i++) {
        let theta = p.random(0, p.TWO_PI);
        let h = p.randomGaussian(3.8); //experiment with different means
        let r = ((p.exp(h) - 1) / (p.exp(h) + 1)) * 0.7;
        let x = height * r * p.cos(theta);

        let y = height * r * p.sin(theta);
        let inter = p.map(x, -width * 0.3, width * 0.3, 0, 1);
        // let c = p.lerpColor(p.color("white"), p.color("white"), inter);

        // p.stroke(p.color(30));
        // p.strokeWeight(0.5);
        // p.line(x, y, 0, 0);
        p.fill(p.color(color1));
        p.noStroke();
        p.ellipse(x, y, 2, 2);
        // p.ellipse(x + p.random(-7, 7), y + p.random(-7, 7), 1, 1);
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
    <motion.div>
      <P5bg ref={p5ref}></P5bg>
    </motion.div>
  );
};

export default ColorSketch3;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
