import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";
import img from "../media/test.jpeg";

var color1, setColor1;
var color2, setColor2;

const ColorSketch4 = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;
    let image;
    let canvas;
    p.setup = () => {
      p.createCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
      //   p.pixelDensity(1)
      image = p.createImg(img, "the p5 magenta asterisk");
      //   p.frameRate(10);
      p.noStroke();
      image.hide();

      p.fill(255);
    };

    p.setupPosition = () => {};

    p.windowResized = () => {
      p.resizeCanvas(width, height);
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
      p.loadPixels();

      p.background(0);
      p.image(image, 0, 0, width / 2, height / 2);

      console.log(p.pixels);
      //   const stepSize = p.round(p.constrain(p.mouseX / 8, 6, 32));
      const stepSize = 10;
      for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
          const i = y * width + x;
          const darkness = (255 - p.pixels[i * 4]) / 255;
          const radius = stepSize * darkness;
          p.ellipse(x, y, radius, radius);
        }
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

export default ColorSketch4;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
