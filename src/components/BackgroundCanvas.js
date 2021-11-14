import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";

const BackgroundCanvas = () => {
  const [size, setSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  var b1, b2;
  var color1 = "#000000";
  var color2 = "#60798A";
  const p5ref = React.useRef(null);

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t;
    var canvas;
    var lines = [];
    var lineWidth = 3;
    p.setup = () => {
      canvas = p.createCanvas(size[0], size[1]);
      p.drawBackground();
      p.setupPosition();
      b1 = p.color(color1);
      b2 = p.color(color2);
      p.frameRate(30);
      // p.noLoop();
      t = 0;
      for (let i = 0; i < parseInt(size[0] / 4); i++) {
        lines.push(new LineObject(i));
      }
    };

    p.setupPosition = () => {
      x = 0;
      y = 0;
      canvas.position(x, y);
    };

    p.windowResized = () => {
      p.resizeCanvas(size[0], size[1]);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      p.background(0);
      p.noStroke();
    };

    p.setGradient = (x, y, w, h, c1, c2, axis) => {
      p.noFill();

      if (axis === p.Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = p.map(i, y, y + h, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(x, i, x + w, i);
        }
      } else if (axis === p.X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = p.map(i, x, x + w, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(i, y, i, y + h);
        }
      }
    };

    p.draw = () => {
      //vertical line background
      p.drawBackground();

      for (let i = 0; i < lines.length; i++) {
        // p.line(i, 0, i, size[1]);

        // lines[i].move();
        lines[i].display();

        // p.setGradient(
        //   i * lineWidth,
        //   p.random(-(size[1] * 1) / 3, (size[1] * 1) / 3),
        //   lineWidth,
        //   size[1] * p.random(0.3, 0.6),
        //   b1,
        //   b2,
        //   p.Y_AXIS
        // );
        // let h = p.randomGaussian(5, 1);
        // p.setGradient(
        //   i,
        //   (size[1] / 2) * p.exp(h),
        //   1,
        //   size[1],
        //   b1,
        //   b2,
        //   p.Y_AXIS
        // );
      }
    };

    class LineObject {
      constructor(index) {
        this.x = index * (lineWidth + 1);
        this.y = p.random((size[1] * 1) / 4, (size[1] * 3) / 4);
        this.speed = 1;
        this.height = size[1] * p.random(0.2, 0.5);
        this.index = index;
      }

      move() {
        // this.x += p.random(-this.speed, this.speed);
        // this.y += p.random(-this.speed, this.speed);
        // if (this.y < (size[1] * 3) / 4 && this.index === 2) {
        //   this.y = this.y + this.speed * p.random(0.5, 1.5);
        // } else {
        //   // this.y = this.y - this.speed * p.random(0.5, 1.5);
        // }
      }

      display() {
        // ellipse(this.x, this.y, this.diameter, this.diameter);
        p.setGradient(this.x, this.y, lineWidth, this.height, b1, b2, p.Y_AXIS);
      }
    }
  };

  React.useEffect(() => {
    let newp5 = new p5(sketch, p5ref.current);

    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <motion.div
      ref={p5ref}
      style={{ width: "100vw", height: "100vh" }}
      animate={{ y: 200 }}
      transition={{ duration: 3, repeatType: "reverse", repeat: Infinity }}
    ></motion.div>
  );
};

export default BackgroundCanvas;
