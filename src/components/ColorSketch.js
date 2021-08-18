import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { SliderPicker } from "react-color";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";

var color1, setColor1;
var color2, setColor2;

const ColorSketch = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;
    let xspacing = 8; // Distance between each horizontal location
    let w; // Width of entire wave
    let maxwaves = 4; // total # of waves to add together

    let theta = 0.0;
    let amplitude = new Array(maxwaves); // Height of wave
    // Value for incrementing X, to be calculated
    // as a function of period and xspacing
    let dx = new Array(maxwaves);
    // Using an array to store height values
    // for the wave (not entirely necessary)
    let yvalues = [];
    p.setup = () => {
      p.createCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
      p.frameRate(30);
      t = 0;
      p.colorMode(p.RGB, 255, 255, 255, 100);
      w = width + 16;
      // p.noLoop()

      for (let i = 0; i < maxwaves; i++) {
        amplitude[i] = p.random(10, 50);
        let period = p.random(100, 500); // Num pixels before wave repeats
        dx[i] = (p.TWO_PI / period) * xspacing;
      }
      yvalues.push(p.floor(w / xspacing));

      // yvalues = new Array(p.floor(w / xspacing));
      console.log(yvalues);
    };
    function calcWave() {
      // Increment theta (try different values
      // for 'angular velocity' here
      theta += 0.1;

      // Set all height values to zero
      for (let i = 0; i < 150; i++) {
        yvalues[i] = 0;
      }

      // Accumulate wave height values
      for (let j = 0; j < maxwaves; j++) {
        let x = theta;
        for (let i = 0; i < yvalues.length; i++) {
          // Every other wave is cosine instead of sine
          if (j % 2 === 0) yvalues[i] += p.sin(x) * amplitude[j];
          else yvalues[i] += p.cos(x) * 0.3 * amplitude[j];
          x += dx[j];
        }
      }
    }

    function renderWave() {
      // A simple way to draw the wave with an ellipse at each location
      p.noStroke();
      // x = x + xspacing;

      // p.fill(255);
      p.ellipseMode(p.CENTER);
      for (let x = 0; x < yvalues.length; x++) {
        let xPos = x * xspacing;
        let inter = p.map(xPos, 0, width, 0, 1);
        let c = p.lerpColor(p.color(color1), p.color(color2), inter);
        p.fill(c);
        p.rect(xPos, height / 2 - yvalues[x] * 0.2, 4, yvalues[x] + 100);
        p.rect(xPos, height / 2 - yvalues[x] * 0.7, 1, yvalues[x] + 150);
        p.rect(xPos, height / 3 + yvalues[x] * 0.2, 1, yvalues[x] + 150);
        p.rect(xPos + 2, height / 2 - yvalues[x] * 0.6, 1, yvalues[x] + 200);
        p.ellipse(
          x * xspacing,
          width / 2 + yvalues[x] - 400,
          yvalues[x] * 0.2,
          yvalues[x] * 0.2
        );
      }
    }
    p.setupPosition = () => {};

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
      t = t + 0.01;
      p.background(0);
      calcWave();

      renderWave();

      p.loadPixels();
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

export default ColorSketch;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
