import React from "react";
import styled from "styled-components";
import Basic from "../components/Basic";
import { motion } from "framer-motion";
import Background from "../components/Background";
import styles from "./Main.module.scss";
import { Link } from "react-router-dom";

const Main = () => {
  // const { width, height, color1, color2 } = props
  // var width = window.innerWidth;
  // var height = window.innerHeight;
  // var b1, b2;
  // var color1 = "#0A6AFA";
  // var color2 = "#FFD500";

  // const p5ref = React.useRef(null);
  // const [anim, setAnim] = React.useState(false);
  // const sketch = (p) => {
  //   let x = 0;
  //   let y = 0;
  //   var t;
  //   var canvas;

  //   p.setup = () => {
  //     canvas = p.createCanvas(width * 5, height * 2.5);
  //     p.drawBackground();
  //     p.setupPosition();
  //     b1 = p.color(color1);
  //     b2 = p.color(color2);
  //     p.frameRate(15);
  //     p.noiseDetail(1);
  //     t = 0;
  //     // p.noLoop()
  //   };

  //   p.setupPosition = () => {
  //     x = 0;
  //     y = (-height * 1.5) / 2;
  //     canvas.position(x, y);
  //   };

  //   p.windowResized = () => {
  //     p.resizeCanvas(width * 5, height * 2.5);
  //     p.drawBackground();
  //     p.setupPosition();
  //   };

  //   p.drawBackground = () => {
  //     p.background(0);
  //     p.noStroke();
  //   };

  //   p.draw = () => {
  //     t = t + 0.02;
  //     p.translate(0, (height * 2.5) / 2);
  //     // let inter = p.map(t, 0, 1, 0, 1)
  //     // let c = p.lerpColor(
  //     //     p.color(142, 40, 230),
  //     //     p.color(85, 142, 230),
  //     //     inter
  //     // )
  //     // // console.log(t)
  //     // console.log(c._array)
  //     // p.fill(c)
  //     if (t > 2) {
  //       setAnim(true);
  //     }
  //     // p.stroke(c)

  //     for (let i = 0; i < 500; i++) {
  //       let theta = p.random(0, p.TWO_PI);
  //       let h = p.randomGaussian(5, 1); //experiment with different means
  //       let r = ((p.exp(h) - 100) / (p.exp(h) + 100)) * t * t;

  //       let x =
  //         (p.noise(50) * width * t) / 2 +
  //         p.random(0, 40) *
  //           p.cos(t) *
  //           r *
  //           p.tan(t) *
  //           p.noise(1, 10) *
  //           p.sin(theta) *
  //           p.exp(theta);

  //       let inter = p.map(x, 0, width * 2, 0, 1);
  //       let c = p.lerpColor(b1, b2, inter);
  //       p.fill(c);
  //       let y =
  //         (height / p.exp(h)) *
  //           (height / 10) *
  //           p.sin(theta) *
  //           p.tan(t) *
  //           p.sin(theta) *
  //           p.cos(theta) +
  //         p.random(-100 * p.tan(theta), 100 * p.tan(theta));

  //       p.ellipse(x, y, 1, 1);
  //       p.ellipse(x + p.random(0, 10), y + p.random(0, 10), 1, 1);
  //     }
  //   };
  // };

  // React.useEffect(() => {
  //   let newp5 = new p5(sketch, p5ref.current);

  //   return () => {
  //     newp5.remove();
  //   };
  // }, []);

  const addChunk = () => {
    setInterval(() => {
      return <Background />;
    }, 1800);
  };

  React.useEffect(() => {
    addChunk();
  }, []);

  return (
    <div className={styles.main}>
      <Background />

      {/* <motion.div
        animate={{
          scale: anim ? 0.4 : 1,
          originX: 0,
          transition: { duration: 30 },
        }}
      >
        <BG ref={p5ref}></BG>
      </motion.div> */}
      <div className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            delay: 0,
          }}
        >
          life<span>*</span>log
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            delay: 0.5,
          }}
        >
          A calendar, in a scale of your life.
          <br />
          Mark your moments from your own history, <br />
          or moments yet to come.
        </motion.p>
      </div>
      <div className={styles.btn}>
        <Link
          to={"/tester"}
          style={{
            display: "block",
            textDecoration: "none",
            color: "white",
            width: "fit-content",
          }}
        >
          create<span>↗</span>
        </Link>
      </div>
    </div>
  );
};

export default Main;

const BG = styled.div`
  width: 500vw;
  height: 100vh;
`;
