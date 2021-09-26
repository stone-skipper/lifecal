import React, { Suspense } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Basic from "../components/Basic";
import NavBottom from "../components/NavBottom";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import store from "../store";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";

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

const Tester = (props) => {
  const [profile, setProfile] = React.useState({
    name: "test",
    birthday: "1999-12-12",
    color1: "#333333",
    color2: "#ffffff",
  });

  const [dayArray, setDayArray] = React.useState([]);
  const [eventArray, setEventArray] = React.useState([]);
  const [milestoneArray, setMilestoneArray] = React.useState([]);
  const [mEvent, setMEvent] = React.useState(false);
  const [mMilestone, setMMilestone] = React.useState(false);
  const eventTitleRef = React.useRef(null);
  const eventDateRef = React.useRef(null);

  React.useEffect(() => {
    store.subscribe(function () {
      setProfile({
        // name: store.getState().name,
        // birthday: store.getState().birthday,
        name: "test",
        birthday: "1999-10-12",
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
        { title: "Baltimore", date: DateTime.fromISO("2016-07-02") },
        { title: "start college", date: DateTime.fromISO("2013-03-02") },
        { title: "internship in US", date: DateTime.fromISO("2018-04-16") },
        { title: "today", date: end },
      ]);

      // console.log(dayArray);
    }
  }, [profile.name]);

  const [timelineScale, setTimelineScale] = React.useState("days");
  const [timelineWidth, setTimelineWidth] = React.useState(
    3 * diffInDaysNum + width * 0.08
  );
  const [dayFontGap, setDayFontGap] = React.useState(90);
  const [dayFontSize, setDayFontSize] = React.useState(60);
  React.useEffect(() => {}, [timelineScale]);

  const timelineRef = React.useRef(null);
  const [profileReady, setProfileReady] = React.useState(false);

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
        {/* <TimelineCanvas
          ref={timelineRef}
          timelineScale={timelineScale}
        ></TimelineCanvas> */}
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
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              defaultValue={100}
              onChange={(state) => {
                // console.log(state);
                setDayFontSize((60 * state) / 100);
                if (state > 70) {
                  setTimelineScale("days");
                } else if (state <= 70 && state > 40) {
                  setTimelineScale("months");
                } else {
                  setTimelineScale("years");
                }
              }}
            />
          </TimelineTitle>
        </motion.div>
        <DaysWrapperScroll>
          <DaysWrapper timelineScale={timelineScale}>
            {dayArray.map((date, index) => {
              if (timelineScale === "days") {
                return (
                  <DayItem key={index}>
                    <p style={{ fontSize: "20px", marginTop: "-90px" }}>
                      {date.toString().substring(8, 10) === "01" ||
                      date.toString().substring(0, 10) === profile.birthday
                        ? date.toString().substring(0, 7)
                        : ""}
                    </p>
                    <p style={{ fontSize: dayFontSize + "px" }}>
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
                        // marginTop:
                        //   index === 0 || index === eventArray.length - 1
                        //     ? 20
                        //     : 0,
                        width:
                          index === 0 || index === eventArray.length - 1
                            ? "fit-content"
                            : 50,
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
        {/* <Profile></Profile> */}
      </motion.div>
      <Basic />
    </TimelineWrapper>
  );
};

export default Tester;

const TimelineWrapper = styled.div`
  width: auto;
  height: 100vh;
  color: white;
`;

const TimelineTitle = styled.div`
  width: 94vw;
  height: 20vh;
  position: fixed;
  left: 3vw;
  top: 2vw;
  color: white;
  z-index: 1;

  .horizontal-slider {
    position: absolute;
    margin-left: 50vw;
    right: 0;
    background: red;
    z-index: 100;
    display: flex;
    width: 30vw;
  }
  .thumb {
    background: black;
    font-size: 15px;
    margin-top: 10px;
  }
  .track {
    background: white;
    height: 3px;
    justify-content: center;
    align-content: center;
  }

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
  font-size: 8px;
  p {
    width: 1em;
    height: 50vh;
    position: absolute;
    // border-left: 1px solid white;
    margin-top: -5vh;
    font-size: 12px;
    background: blue;
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
      return "calc(90px * " + diffInDaysNum + " + 8vw)";
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
      return "calc(90px * " + diffInDaysNum + " + 8vw)";
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
