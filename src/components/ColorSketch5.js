import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";
import img from "../media/test.jpeg";

var color1, setColor1;
var color2, setColor2;

//reference link -> https://openprocessing.org/sketch/1244981

const ColorSketch5 = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;
  let cols = 6,
    rows = 4,
    fc = 0;
  let segment = 150;
  // ArrayList <Circle> circles = new ArrayList<Circle>();
  var circles = [];
  const sketch = (p) => {
    var t;
    let image;
    let canvas;
    p.setup = () => {
      p.createCanvas(width, height);
      p.smooth(8);
      p.noFill();
      p.stroke(p.color("white"), 20); // set alpha channel to 20 (high transparency)
      p.initCircles();
    };

    p.initCircles = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          var x = (j + 0.5) * segment;
          var y = (i + 0.5) * segment;
          circles.push(new Circle(x, y));
        }
      }
      console.log(circles);
    };
    var a1, a2, r1, r2, x, y, num, c;
    class Circle {
      constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.a1 = Math.PI / 2 + p.random(Math.PI);
        this.a2 = a1 * 2 + p.random(Math.PI);
        this.r1 = segment * 0.1;
        this.r2 = segment * 0.4;
        this.num = p.int(p.map(a2 - a1, a1 + Math.PI, a1, 500, 100));
        this.c = p.random(1);
      }

      drawStuff() {
        p.pushMatrix();
        p.translate(this.x, this.y);
        for (let i = 0; i < num; i++) {
          var angle = p.random(p.random(this.a1, this.a1 * 2), this.a2); // take an angle
          var radius = p.random(this.r1, this.r2); // take radius
          let px = radius * p.cos(angle);
          let py = radius * p.sin(angle);
          p.stroke(p.color("white"), 20);
          if (c > 0.9) p.stroke(p.color("blue"), 30);
          p.point(px, py);
        }
        p.popMatrix();
      }
      // Circle(_x, _y) {
      //   x = _x;
      //   y = _y;
      //   a1 = Math.PI / 2 + p.random(Math.PI);
      //   a2 = a1 * 2 + p.random(Math.PI);
      //   //r1 = random(segment*.1, segment*.2);
      //   //r2 =  random(segment*.3, segment*.4);
      //   r1 = segment * 0.1;
      //   r2 = segment * 0.4;
      //   num = p.int(p.map(a2 - a1, a1 + Math.PI, a1, 500, 100));
      //   c = p.random(1);
      // }
    }

    p.windowResized = () => {
      p.resizeCanvas(width, height);
      p.drawBackground();
    };

    p.drawBackground = () => {
      // p.background("red")
      p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      if (p.frameCount < fc + 500) {
        for (let i = 0; i < circles.length; i++) {
          c = circles[i];
          c.drawStuff();
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

export default ColorSketch5;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
