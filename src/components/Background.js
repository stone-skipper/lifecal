import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Background = () => {
  const [size, setSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  var lineCount = React.useRef(0);
  const [lineArray, setLineArray] = React.useState([]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  var color1 = "#000000";
  var color2 = "#60798A";
  var lineWidth = 4;

  const getRandomNum = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
  };
  const pickRandomItems = (array, min, max, itemCount) => {
    for (var i = 0; i < itemCount; i++) {
      var random = getRandomNum(min, max);
      array[random] = array[random] * -1;
    }
  };

  React.useEffect(() => {
    lineCount.current = parseInt(size[0] / lineWidth + 1);
    var lineArrayCount = new Array(lineCount.current);
    for (var i = 0; i < lineArrayCount.length; i++) {
      lineArrayCount[i] = i;
    }
    pickRandomItems(
      lineArrayCount,
      0,
      lineCount.current,
      lineCount.current / 4
    );
    setLineArray(lineArrayCount);
    console.log(lineArray);
  }, [size]);

  return (
    <motion.div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      style={{
        display: "flex",
        width: "100vw",
        height: size[1] / 6,
        marginTop: size[1] / 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        overflow: "visible",
      }}
    >
      {lineArray.map((item, index) => {
        return (
          <motion.div
            key={index}
            animate={{ y: item < 0 ? 200 : 0 }}
            transition={{
              repeatType: "reverse",
              repeat: Infinity,
              duration: getRandomNum(10, 20),
              delay: item < 0 ? getRandomNum(0, 3) : 0,
            }}
            style={{
              width: lineWidth,
              height: 300,
              //   height: 300 * getRandomNum(1, 5) * 0.5,
              background:
                "linear-gradient(0deg, rgba(96, 121, 138, 0.8) 13.61%, rgba(96, 121, 138, 0) 64.77%)",
            }}
          ></motion.div>
        );
      })}
    </motion.div>
  );
};

export default Background;
