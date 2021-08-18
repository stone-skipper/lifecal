import React from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Basic from "../components/Basic";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import * as p5 from "p5";
import store from "../store";
import { Link } from "react-router-dom";

var now = DateTime.now();
var todayDate = now.toString().substring(0, 10);

var end = DateTime.fromISO(todayDate);

var start,
  diffInDays,
  diffInDaysNum = 0,
  diffInMonths,
  diffInMonthsNum,
  diffInYears,
  diffInYearsNum;

const Timeline = (props) => {
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
        { title: "test", date: DateTime.fromISO("2010-07-08") },
        { title: "today", date: end },
      ]);

      // console.log(dayArray);
    }
  }, [profile.name]);

  // React.useEffect(() => {
  //   console.log(dayArray);
  // }, [dayArray]);

  var width = window.innerWidth;
  var height = window.innerHeight;
  var b1, b2;

  const [timelineScale, setTimelineScale] = React.useState("days");
  const [timelineWidth, setTimelineWidth] = React.useState(
    3 * diffInDaysNum + width * 0.08
  );

  const timelineRef = React.useRef(null);
  const [profileReady, setProfileReady] = React.useState(false);
  const timelineSketch = (p) => {
    let x = 0;
    let y = 0;
    var t;
    var canvas;

    p.setup = () => {
      canvas = p.createCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
      b1 = p.color(profile.color1);
      b2 = p.color(profile.color2);
      p.frameRate(30);

      p.noiseDetail(1);
      t = 0;
      // p.noLoop()
    };

    p.setupPosition = () => {
      x = 0;
      y = 0;
      canvas.position(x, y);
    };

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
      t = t + 0.1;

      p.translate(0, height / 2);

      for (let i = 0; i < 100; i++) {
        let theta = p.random(0, p.TWO_PI);
        let h = p.randomGaussian(1, 1); //experiment with different means
        // let r = ((p.exp(h) - 100) / (p.exp(h) + 100)) * t;
        let r = (p.exp(h) - 1) / (p.exp(h) + 1);
        let x = t * p.cos(theta) * 50;
        // let x =
        //   (p.noise(50) * width * t) / 2 +
        //   p.random(0, 1) *
        //     p.cos(t) *
        //     r *
        //     p.tan(t) *
        //     p.noise(1, 10) *
        //     p.sin(theta) *
        //     p.exp(theta);
        let y = p.exp(h) * 0.1 * p.sin(theta) * 4;

        let inter = p.map(x, 0, width, 0, 1);
        let c = p.lerpColor(b1, b2, inter);
        p.fill(c);
        // let y =
        //   (height / p.exp(h)) *
        //     (height / 2000) *
        //     p.sin(theta * 2) *
        //     p.noise(1, 100) *
        //     p.cos(theta) +
        //   p.random(p.tan(theta) * -0.2, p.tan(theta) * 0.2);

        p.ellipse(x, y, 1, 1);
        if (x > timelineWidth) {
          p.noLoop();
        }
      }
    };
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
            <h2>
              {diffInDaysNum}
              {diffInDaysNum.toString().slice(-1) === "1" ? "st" : ""}
              {diffInDaysNum.toString().slice(-1) === "2" ? "nd" : ""}
              {diffInDaysNum.toString().slice(-1) !== "1" &&
              diffInDaysNum.toString().slice(-1) !== "2"
                ? "th"
                : ""}{" "}
              day
              <br />
              <span>in your life</span>
            </h2>
            {/* birthday: {profile.birthday}
          <br />
          years: {diffInYearsNum} */}
            {/* months: {diffInMonthsNum} */}
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
                    <p>
                      <br />
                      {date.toString().substring(8, 10) === "01" ||
                      date.toString().substring(0, 10) === profile.birthday ||
                      date.toString().substring(0, 10) === todayDate
                        ? date.toString().substring(0, 10)
                        : ""}
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
                      {date.toString().substring(5, 10) === "01-01" ||
                      date.toString().substring(0, 10) === profile.birthday ||
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
                    key={index}
                    style={{
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
                        width: 7,
                        height: 7,
                        background: "white",
                      }}
                      animate={{
                        rotate: 360,
                        scale: 1.2,
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        loop: Infinity,
                      }}
                    ></motion.div>
                    <p>{date.title}</p>
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

export default Timeline;

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

  h2 {
    margin-top: 13vh;
    font-size: 70px;
    font-weight: 600;
    line-height: 0.5;
  }
  span {
    font-size: 20px;
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
    width: 80px;
    position: absolute;
    // border-left: 1px solid white;
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
      return "calc(3px * " + diffInDaysNum + " + 20px)";
    } else if (props.timelineScale === "months") {
      return "900vw";
    } else if (props.timelineScale === "years") {
      return "89vw";
    }
  }};

  height: 20vh;
  overflow-x: scroll;
  margin-left: 3vw;
  margin-right: 8vw;
  display: flex;
  position: absolute;
  top: 60vh;
  justify-content: space-between;
`;

const TimelineCanvas = styled.div`
  width: ${(props) => {
    if (props.timelineScale === "days") {
      return "calc(3px * " + diffInDaysNum + " + 20px)";
    } else if (props.timelineScale === "months") {
      return "900vw";
    } else if (props.timelineScale === "years") {
      return "89vw";
    }
  }};
  margin-left: 3vw;
  height: 100vh;
  position: absolute;
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
      return "calc(3px * " + diffInDaysNum + " + 20px)";
    } else if (props.timelineScale === "months") {
      return "900vw";
    } else if (props.timelineScale === "years") {
      return "89vw";
    }
  }};

  height: 20vh;
  // background: blue;
  margin-left: 3vw;
  margin-right: 8vw;

  position: absolute;
  top: calc(50vh - 3px);
`;
const EventItem = styled.div`
  p {
    width: 0;
    height: fit-content;
    margin-top: 2vh;
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
