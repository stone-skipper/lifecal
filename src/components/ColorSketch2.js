import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { SliderPicker } from "react-color";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";

var color1, setColor1;
var color2, setColor2;

const ColorSketch2 = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;

    let kMax;
    let step;
    let n = 100; // number of blobs
    let radius = 0; // diameter of the circle
    let inter = 0.05; // difference between the sizes of two blobs
    let maxNoise = 500;
    let lapse = 0; // timer
    let noiseProg = (x) => x;

    p.setup = () => {
      p.createCanvas(width, height);
      p.drawBackground();
      p.frameRate(30);
      p.colorMode(p.HSB, 1);
      p.angleMode(p.DEGREES);
      p.noFill();
      kMax = p.random(0.6, 1.0);
      step = 0.01;
      p.noStroke();
    };
    function blob(size, xCenter, yCenter, k, t, noisiness) {
      p.beginShape();
      let angleStep = 360 / 10;
      for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
        let r1, r2;
        r1 = p.cos(theta) + 1;
        r2 = p.sin(theta) + 1;
        let r = size + p.noise(k * r1, k * r2, t) * noisiness;
        let x = xCenter + r * p.cos(theta);
        let y = yCenter + r * p.sin(theta);
        p.curveVertex(x, y);
      }
      p.endShape();
    }

    function rope(size, xRoot, yRoot, k, t, noisiness) {
      p.beginShape();
      let angleStep = 360 / 10;
      for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
        let r1, r2;
        r1 = p.cos(theta) + 1;
        r2 = p.sin(theta) + 1;
        let r = size + p.noise(k * r1, k * r2, t) * 80;
        let x = xRoot + r * p.cos(theta);
        let y = yRoot + r * p.sin(theta);
        // p.curveVertex(x, y);
        p.ellipse(x, y, 10);
      }
      p.endShape();
    }

    p.windowResized = () => {
      p.resizeCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      //   t = t + 0.01;
      //   p.background(0.6, 0.75, 0.25);
      p.background(0);
      let t = p.frameCount / 100;
      for (let i = n; i > 0; i--) {
        let alpha = 1 - noiseProg(i / n);
        p.fill((alpha / 5 + 0.5) % 1, 1, 1, alpha);
        let size = radius + i * inter;
        let k = kMax * p.sqrt(i / n);
        let noisiness = maxNoise * noiseProg(i / n);
        // blob(size, width / 2, height / 2, k, t - i * step, noisiness);
        rope(size, width / 2, height / 2, k, t - i * step, noisiness);
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

export default ColorSketch2;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
