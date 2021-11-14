import React from "react";
import styled from "styled-components";
import styles from "@/Tester.module.scss";
import { motion } from "framer-motion";

const TopBar = (diffInDaysNum, name, eventNum) => {
  return (
    <></>
    // <motion.div
    //   className={styles.topBar}
    //   initial={{ opacity: 0, y: -30 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 1, type: "spring", delay: landingDelaySec }}
    // >
    //   <motion.div style={{ width: "50%" }}>
    //     <motion.p>{name}'s lifelog</motion.p>
    //   </motion.div>
    //   <motion.div style={{ width: "25%" }}>
    //     <motion.p>
    //       living {diffInDaysNum.toLocaleString()}
    //       {diffInDaysNum.toString().slice(-1) === "1" ? "st" : ""}
    //       {diffInDaysNum.toString().slice(-1) === "2" ? "nd" : ""}
    //       {diffInDaysNum.toString().slice(-1) === "3" ? "rd" : ""}
    //       {diffInDaysNum.toString().slice(-1) !== "1" &&
    //       diffInDaysNum.toString().slice(-1) !== "2" &&
    //       diffInDaysNum.toString().slice(-1) !== "3"
    //         ? "th"
    //         : ""}{" "}
    //       day
    //     </motion.p>
    //   </motion.div>
    //   <motion.div style={{ width: "25%" }}>
    //     <motion.p>{eventNum} marks</motion.p>
    //   </motion.div>
    // </motion.div>
  );
};

export default TopBar;
