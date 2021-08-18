import React from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Basic from "../components/Basic";
import NavBottom from "../components/NavBottom";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import * as p5 from "p5";
import store from "../store";
import { Link } from "react-router-dom";
import noise from "../media/noise.png";
import { blurVert, blurFrag } from "../components/blurShader";

var now = DateTime.now();
var todayDate = now.toString().substring(0, 10);
var width = window.innerWidth;
var height = window.innerHeight;

var end = DateTime.fromISO(todayDate);

var start,
  diffInDays,
  diffInDaysNum = 0,
  diffInMonths,
  diffInMonthsNum,
  diffInYears,
  diffInYearsNum;

const TimelineView = (props) => {
  const [profile, setProfile] = React.useState({
    name: "",
    birthday: "2020-01-01",
    color1: "#333333",
    color2: "#ffffff",
  });

  const [dayArray, setDayArray] = React.useState([]);
  const [eventArray, setEventArray] = React.useState([]);
  const [mEvent, setMEvent] = React.useState(false);
  const [mMilestone, setMMilestone] = React.useState(false);
  const eventTitleRef = React.useRef(null);
  const eventDateRef = React.useRef(null);

  React.useEffect(() => {
    store.subscribe(function () {
      setProfile({
        name: store.getState().name,
        birthday: store.getState().birthday,
        color1: store.getState().color1,
        color2: store.getState().color2,
      });
    });
    console.log("update : " + profile.name + " / " + profile.birthday);
  }, [profile]);

  function UntilToday(begindate, dNum) {
    var arr = [begindate];
    if (arr.length !== 0) {
      for (var i = 0; i < dNum; i++) {
        arr.push(arr[arr.length - 1].plus({ days: 1 }));
      }
      console.log(arr);
      setDayArray(arr);
    }
  }

  React.useEffect(() => {
    if (profile.name !== "") {
      console.log(profile.birthday);
      setProfileReady(true);

      start = DateTime.fromISO(profile.birthday);

      diffInDays = end.diff(start, "days");
      diffInMonths = end.diff(start, "months");
      diffInYears = end.diff(start, "years");

      diffInDays.toObject(); //=> { days: 1 }

      diffInDaysNum = parseInt(diffInDays.toObject().days);
      console.log(diffInDaysNum.toString().slice(-1));
      diffInMonthsNum = parseInt(diffInMonths.toObject().months);
      diffInYearsNum = parseInt(diffInYears.toObject().years);
      UntilToday(start, diffInDaysNum);
      setEventArray([
        { title: "the beginning", date: start },
        { title: "test item", date: DateTime.fromISO("2010-07-08") },
        { title: "school", date: DateTime.fromISO("1999-12-11") },
        { title: "internship in US", date: DateTime.fromISO("2018-04-16") },
        { title: "today", date: end },
      ]);

      // console.log(dayArray);
    }
  }, [profile.name]);

  const [timelineScale, setTimelineScale] = React.useState("years");
  const [timelineWidth, setTimelineWidth] = React.useState(
    3 * diffInDaysNum + width * 0.08
  );

  const timelineRef = React.useRef(null);
  const [profileReady, setProfileReady] = React.useState(false);
  const timelineSketch = (p) => {
    let kMax;
    let step;
    let n = 1; // number of blobs
    let radius = 50; // diameter of the circle
    let inter = 12; // difference between the sizes of two blobs
    let maxNoise = 700;
    let lapse = 0; // timer
    let noiseProg = (x) => x;
    let c1, c2;
    // let r, b, g;
    let img, blurShader;
    let blurry = 0;
    let blurch = 1;

    p.setup = () => {
      p.createCanvas(width, height);
      // blurShader = p.createShader(blurVert, blurFrag);
      // p.shader(blurShader);
      p.pixelDensity(1.5);
      // p.colorMode(p.HSB, 1);
      p.colorMode(p.RGB);
      // p.colorMode(p.HSB, 360, 100, 100, 100);

      c1 = p.color(profile.color1);
      c2 = p.color(profile.color2);
      p.angleMode(p.DEGREES);
      p.noFill();
      kMax = p.random(0.6, 1.0);
      step = 0.01;

      // img = p.createGraphics(width, height);
      // img.circle(width / 2, height / 2, width / 4);

      // var t = p.millis();
      // p.shader(blurShader);
      // blurShader.setUniform("tex0", img);
      // blurShader.setUniform("texelSize", [1 / width, 1 / height]);
      // p.rect(0, 0, width, height);

      // var t = p.millis();
      // img.filter(p.BLUR, 4);
      // p.image(img, -width / 2, -height / 2);

      p.noStroke();
      p.frameRate(30);
    };

    p.draw = () => {
      p.blendMode(p.BLEND);
      p.background(0, 0, 0);
      p.blendMode(p.SCREEN);

      p.fill(0, 0, 0);
      p.noStroke();

      p.drawingContext.shadowColor = c1;
      p.drawingContext.shadowBlur = 2000;

      // p.ellipse(300, 260, 700);
      // p.ellipse(600, 4300, 750);
      let t = p.frameCount / 100;
      blob(200, 750, 580, kMax * p.sqrt(1 / 20), t * 10 * step, maxNoise);
      // p.ellipse(750, 580, 600);

      p.drawingContext.shadowColor = c2;
      // p.ellipse(480, 190, 900);
      // p.ellipse(330, 480, 1000);
      // p.ellipse(580, 580, 500);

      // blurry += blurch;
      // if (blurry > 300 || blurry < 0) blurch *= -1;
      // p.background(p.color("black"));
      // let t = p.frameCount / 100;
      // for (let i = n; i > 0; i--) {
      //   let alpha = 1 - noiseProg(i / n);
      //   // p.fill((alpha / 5 + 0.5) % 1, 1, 1, alpha);

      //   p.fill(p.red(c1), p.green(c1), p.blue(c1), alpha);
      //   let size = radius + i * inter;
      //   let k = kMax * p.sqrt(i / n);
      //   let noisiness = maxNoise * noiseProg(i / n);
      //   blob(size, width / 4, -height / 3, k, t - i * step, noisiness);
      // }
      setNoise();
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

    function setNoise() {
      p.loadPixels();
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height * 3; y++) {
          if (p.random(1) > 0.5) {
            const index = (x + y * width) * 4;
            p.pixels[index] = 0;
            p.pixels[index + 1] = 0;
            p.pixels[index + 2] = 0;
            p.pixels[index + 3] = 0;
          }
        }
      }
      p.updatePixels();
    }
  };

  React.useEffect(() => {
    let timelinep5;
    if (profileReady === true) {
      timelinep5 = new p5(timelineSketch, timelineRef.current);
    }

    return () => {
      if (profileReady === true) {
        timelinep5.remove();
      }
    };
  }, [profileReady]);

  React.useEffect(() => {
    if (timelineScale === "years") {
      setTimelineWidth(width * 0.89);
    } else if (timelineScale === "months") {
      setTimelineWidth(width * 9);
    } else if (timelineScale === "days") {
      setTimelineWidth(3 * diffInDaysNum + width * 0.08);
    }
  }, [timelineScale]);

  return (
    <TimelineWrapper>
      <div
        style={{
          position: "fixed",
          zIndex: -100,
          width: "100vw",
          height: "calc(100vh - 5vw)",
          //   backgroundImage: `url(${noise})`,
          backgroundSize: "cover",
          backgroundPosition: "100% 0%",
        }}
      ></div>
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: mEvent === true || mMilestone === true ? -height * 0.4 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <TimelineCanvas
          ref={timelineRef}
          timelineScale={timelineScale}
        ></TimelineCanvas>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: profileReady ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <TimelineTitle>
            <h1>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                {profile.name}*
                <br />
                LIFE*LOG
              </Link>
            </h1>

            <NavBottom daysNum={diffInDaysNum}></NavBottom>
            <br />
            <TimelineScaleBtn
              onClick={() => {
                console.log(timelineScale);
                if (timelineScale === "years") {
                  setTimelineScale("days");
                } else if (timelineScale === "days") {
                  setTimelineScale("months");
                } else if (timelineScale === "months") {
                  setTimelineScale("years");
                }
              }}
            >
              {timelineScale}
            </TimelineScaleBtn>
          </TimelineTitle>
        </motion.div>
        <DaysWrapperScroll>
          <DaysWrapper timelineScale={timelineScale}>
            {dayArray.map((date, index) => {
              if (timelineScale === "days") {
                return (
                  <DayItem key={index}>
                    <p style={{ fontSize: "30px" }}>
                      <br />
                      {/* {date.toString().substring(8, 10) === "01" ||
                      date.toString().substring(0, 10) === profile.birthday ||
                      date.toString().substring(0, 10) === todayDate
                        ? date.toString().substring(8, 10)
                        : ""} */}
                      {date.toString().substring(8, 10)}
                    </p>
                  </DayItem>
                );
              } else if (timelineScale === "months") {
                return (
                  <DayItem
                    key={index}
                    // timelineScale={date.toString().substring(5,10)==="01-01"||date.toString().substring(0,10)===birthday?"block":"none"}
                  >
                    <br />
                    {date.toString().substring(8, 10) === "01" ||
                    date.toString().substring(0, 10) === profile.birthday ||
                    date.toString().substring(0, 10) === todayDate
                      ? date.toString().substring(0, 8)
                      : ""}
                  </DayItem>
                );
              } else if (timelineScale === "years") {
                return (
                  <DayItem
                    key={index}
                    // timelineScale={date.toString().substring(5,10)==="01-01"||date.toString().substring(0,10)===birthday?"block":"none"}
                  >
                    {/* <motion.div
                    style={{
                      width: 2,
                      height: 2,
                      borderRadius: 1,
                      background: "white",
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: 0.1 * index,
                      },
                    }}
                  > */}
                    <p>
                      <br />
                      {/* {date.toString().substring(5, 10) === "01-01" ||
                      date.toString().substring(0, 10) === profile.birthday ||
                      date.toString().substring(0, 10) === todayDate
                        ? date.toString().substring(0, 4)
                        : ""} */}
                      {date.toString().substring(0, 10) === profile.birthday ||
                      date.toString().substring(0, 10) === todayDate
                        ? date.toString().substring(0, 4)
                        : ""}
                    </p>
                    {/* </motion.div> */}
                  </DayItem>
                );
              }
            })}
          </DaysWrapper>
          <EventWrapper timelineScale={timelineScale}>
            {eventArray.map((date, index) => {
              if (eventArray.length !== 0) {
                return (
                  <EventItem
                    sorter={
                      index === 0 || index === eventArray.length - 1
                        ? "star"
                        : "line"
                    }
                    key={index}
                    style={{
                      textAlign:
                        index === eventArray.length - 1 ? "right" : "left",
                      position: "absolute",
                      top: 0,
                      left:
                        (timelineWidth *
                          DateTime.fromISO(date.date)
                            .diff(start, "days")
                            .toObject().days) /
                        diffInDaysNum,
                    }}
                  >
                    <motion.div
                      style={{
                        width:
                          index === 0 || index === eventArray.length - 1
                            ? 10
                            : 30,
                        height:
                          index === 0 || index === eventArray.length - 1
                            ? 10
                            : 1,
                        background:
                          index === 0 || index === eventArray.length - 1
                            ? "white"
                            : "transparent",
                        borderBottom:
                          index === 0 || index === eventArray.length - 1
                            ? "none"
                            : "1px solid white",
                        rotate:
                          index === 0 || index === eventArray.length - 1
                            ? 45
                            : 0,
                      }}
                    ></motion.div>
                    <p>{date.title}</p>
                    <p>
                      <span>test date</span>
                    </p>
                  </EventItem>
                );
              }
            })}
          </EventWrapper>
        </DaysWrapperScroll>
      </motion.div>
      <MarkEventLayout
        style={{ zIndex: mEvent ? 5 : -100, opacity: mEvent ? 1 : 0 }}
        animate={{
          opacity: mEvent ? 1 : 0,
          transition: { duration: 5, delay: 1 },
        }}
      >
        <p>mark event in your life</p>
        <input ref={eventTitleRef} placeholder="event"></input>
        <input
          ref={eventDateRef}
          onChange={(e) => {
            console.log(eventDateRef.current.value);
            if (e.target.value.length === 4) {
              e.target.value = e.target.value + "-";
            } else if (e.target.value.length === 7) {
              e.target.value = e.target.value + "-";
            }
          }}
          placeholder="yyyy-mm(optional)-dd(optional)"
          type="text"
          maxLength={10}
          pattern="[0-9]*"
        ></input>
        <div
          style={{
            width: 100,
            height: 50,
            background: "white",
            color: "blue",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={async () => {
            await setEventArray((item) => [
              ...item,
              {
                title: eventTitleRef.current.value,
                date: DateTime.fromISO(eventDateRef.current.value),
              },
            ]);
            eventTitleRef.current.value = "";
            eventDateRef.current.value = "";
            store.dispatch({
              type: "EVENT",
              profile: profile,
              event: eventArray,
            });
          }}
        >
          Click!
        </div>
      </MarkEventLayout>
      <BtnWrapper>
        <MarkEvent
          style={{ opacity: mMilestone ? 0.3 : 1 }}
          onClick={() => {
            setMEvent(!mEvent);
            console.log(mEvent);
          }}
        >
          +
        </MarkEvent>
        <MarkMilestone
          style={{ opacity: mEvent ? 0.3 : 1 }}
          onClick={() => {
            setMMilestone(!mMilestone);
          }}
        >
          +
        </MarkMilestone>
      </BtnWrapper>
      <motion.div
        animate={
          {
            // scale: profile.name === "" ? 1 : 0.7,
            // opacity: profile.name === "" ? 1 : 0,
          }
        }
        transition={
          {
            // duration: 1,
          }
        }
      >
        <Profile></Profile>
      </motion.div>
      <Basic />
    </TimelineWrapper>
  );
};

export default TimelineView;

const TimelineWrapper = styled.div`
  width: auto;
  height: 100vh;
  color: white;
`;

const TimelineTitle = styled.div`
  width: 94vw;
  height: 20vh;
  position: absolute;
  left: 3vw;
  top: 2vw;
  color: white;
  z-index: 1;

  h1 {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    padding-bottom: 3px;
    width: fit-content;
    position: absolute;
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s;

    &:hover {
      border-bottom: 2px solid rgba(255, 255, 255, 1);
    }
  }
`;

const TimelineScaleBtn = styled.div`
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 10vw;
  margin: 0 auto;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
const DayItem = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 1px;
  // background: white;
  background: none;
  font-size: 8px;
  p {
    width: fit-content;
    position: absolute;
    // border-left: 1px solid white;
    margin-top: 5vh;
    font-size: 12px;
    background: green;
  }
`;
const DaysWrapperScroll = styled.div`
  width: 100vw;
  padding-top: 55vh;
  position: relative;
`;
const DaysWrapper = styled.div`
  width: ${(props) => {
    if (props.timelineScale === "days") {
      return "calc(50px * " + diffInDaysNum + " + 8vw)";
    } else if (props.timelineScale === "months") {
      return "900vw";
    } else if (props.timelineScale === "years") {
      return "89vw";
    }
  }};
  border-top: 1px solid white;
  height: 20vh;
  //   background: red;
  //   overflow-x: scroll;
  margin-left: 3vw;
  margin-right: 8vw;
  display: flex;
  position: absolute;
  top: 50vh;
  justify-content: space-between;
`;

const TimelineCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  z-index: -1;
`;

const MarkEvent = styled.div`
  width: 4vh;
  height: 4vh;
  // border: 2px solid white;
  background: white;
  color: black;
  transition: 0.5s;
  text-align: center;
  line-height: 4vh;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
const MarkMilestone = styled.div`
  width: 3.5vh;
  height: 3.5vh;
  // border: 2px solid white;
  background: white;
  color: black;
  transform: rotate(45deg);
  transition: 0.5s;
  text-align: center;
  line-height: 3.7vh;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    transform: rotate(45deg) scale(1.1);
  }
`;
const BtnWrapper = styled.div`
  width: 8vw;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  position: absolute;
  left: 46vw;
  bottom: 15vh;
  z-index: 1;
`;

const EventWrapper = styled.div`
  width: ${(props) => {
    if (props.timelineScale === "days") {
      return "calc(50px * " + diffInDaysNum + " + 8vw)";
    } else if (props.timelineScale === "months") {
      return "900vw";
    } else if (props.timelineScale === "years") {
      return "89vw";
    }
  }};

  height: 20vh;
  //   margin-right: 8vw;

  position: absolute;
  top: calc(50vh + 11px);
  margin-left: calc(3vw - 7px);
`;
const EventItem = styled.div`
  display: ${(props) => (props.sorter === "star" ? "block" : "flex")};
  transform-origin: ${(props) =>
    props.sorter === "star" ? "default" : "top left"};

  transform: ${(props) =>
    props.sorter === "star" ? "rotate(0deg)" : "rotate(-60deg)"};
  p {
    width: 200px;
    height: fit-content;
    margin-top: ${(props) => (props.sorter === "star" ? "0" : "-5px")};
    margin-left: ${(props) => (props.sorter === "star" ? "0" : "10px")};
  }
  span {
    opacity: 0;
  }
  &:hover {
    span {
      opacity: 1;
    }
  }
`;

const MarkEventLayout = styled.div`
  width: 100vw;
  height: 40vh;
  background: blue;
  position: absolute;
  top: 30vh;
  padding-left: 3vw;
  z-index: 2;
  input {
    background: none;
    border: none;
    color: white;
    font-family: "Neue Machina";
    font-size: 20px;
  }
`;
