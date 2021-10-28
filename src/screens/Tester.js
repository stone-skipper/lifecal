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
import ReactDOM from "react-dom";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import styles from "./Tester.module.scss";
import { Slider } from "@lifarl/react-scroll-snap-slider";

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
    birthday: "1994-07-08",
    color1: "#333333",
    color2: "#ffffff",
  });

  const [dayArray, setDayArray] = React.useState([]);
  const [eventArray, setEventArray] = React.useState([]);
  const [eventIndexedArray, setEventIndexdArray] = React.useState([]);
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
        birthday: "1994-07-08",
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
        { title: "end of student", date: DateTime.fromISO("2019-08-27") },
        { title: "today", date: end },
      ]);

      // console.log(dayArray);
    }
  }, [profile.name]);

  const eventIndexChecker = (day, event) => {
    var eventIndexed = new Array(day.length);
    for (var i = 0; i < event.length; i++) {
      let index = -parseInt(start.diff(event[i].date, "days").toObject().days);
      event[i].dayIndex = index;
      eventIndexed[index] = { title: event[i].title, date: event[i].date };
    }
    setEventIndexdArray(eventIndexed);
  };
  React.useEffect(() => {
    if (dayArray.length > 1) {
      eventIndexChecker(dayArray, eventArray);
    }
  }, [eventArray]);

  const [timelineScale, setTimelineScale] = React.useState("days");

  const [dayFontSize, setDayFontSize] = React.useState(90);
  React.useEffect(() => {}, [timelineScale]);

  const timelineRef = React.useRef(null);
  const [profileReady, setProfileReady] = React.useState(false);

  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const gridRef = React.createRef();

  const DayItem = ({ children }) => {
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: (dayFontSize * 2) / 3 + 10 + "px",
          margin: 0,
          // fontFamily: "'Syne', sans-serif",
        }}
      >
        {children}
      </motion.p>
    );
  };

  const LOADING = 1;
  const LOADED = 2;
  let itemStatusMap = {};

  const isItemLoaded = (index) => !!itemStatusMap[index];
  const loadMoreItems = (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
    return new Promise((resolve) =>
      setTimeout(() => {
        for (let index = startIndex; index <= stopIndex; index++) {
          itemStatusMap[index] = LOADED;
        }
        resolve();
      }, 100)
    );
  };
  const MonthTranslator = (numDate) => {
    var monthFirst =
      numDate.toLocal().monthShort + " " + numDate.toLocal().year;
    return monthFirst;
  };

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      {/* heading */}
      {timelineScale === "days" ? (
        <>
          <div
            style={{
              width: "1px",
              height: 100,
              position: "absolute",
              // width:
              //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
              //   "px",
              // height:
              //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
              //   "px",
              background: "white",
            }}
          ></div>
          <p style={{ fontSize: "10px" }}>
            {dayArray[columnIndex].toString().substring(8, 10) === "01" ||
            dayArray[columnIndex].toString().substring(0, 10) ===
              profile.birthday
              ? dayArray[columnIndex].toString().substring(0, 7)
              : null}
          </p>

          <DayItem>{dayArray[columnIndex].toString().substring(8, 10)}</DayItem>
        </>
      ) : null}
      {timelineScale === "months" &&
      (dayArray[columnIndex].toString().substring(8, 10) === "01" ||
        dayArray[columnIndex].toString().substring(0, 10) ===
          profile.birthday ||
        dayArray[columnIndex].toString().substring(0, 10) === todayDate) ? (
        <>
          <div
            style={{
              width: "1px",
              height: 100,
              position: "absolute",
              // width:
              //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
              //   "px",
              // height:
              //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
              //   "px",
              background: "white",
            }}
          ></div>
          <DayItem>
            {/* {dayArray[columnIndex].toString().substring(0, 7)} */}
            {MonthTranslator(dayArray[columnIndex])}
          </DayItem>
        </>
      ) : (
        <div
          style={{
            width: "1px",
            height: 100,
            position: "absolute",
            // width:
            //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
            //   "px",
            // height:
            //   parseInt(dayArray[columnIndex].toString().substring(8, 10)) +
            //   "px",
            background: "white",
          }}
        ></div>
      )}

      {timelineScale === "years" &&
      (dayArray[columnIndex].toString().substring(0, 10) === profile.birthday ||
        dayArray[columnIndex].toString().substring(5, 10) === "01-01" ||
        dayArray[columnIndex].toString().substring(0, 10) === todayDate) ? (
        <DayItem> {dayArray[columnIndex].toString().substring(0, 4)}</DayItem>
      ) : null}

      {eventIndexedArray[columnIndex] !== undefined
        ? eventIndexedArray[columnIndex].title
        : null}
    </div>
  );

  // React.useEffect(() => {
  //   if (timelineScale === "years") {
  //     setTimelineWidth(width * 0.89);
  //   } else if (timelineScale === "months") {
  //     setTimelineWidth(width * 9);
  //   } else if (timelineScale === "days") {
  //     setTimelineWidth(3 * diffInDaysNum + width * 0.08);
  //   }
  // }, [timelineScale]);

  const [rangeStart, setRangeStart] = React.useState();
  const [rangeEnd, setRangeEnd] = React.useState();

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.topBar}>
        <motion.p style={{ width: "50%" }}>{profile.name}'s lifelog</motion.p>
        <motion.p style={{ width: "25%" }}>{diffInDaysNum} days</motion.p>
        <motion.p style={{ width: "25%" }}>{eventArray.length} marks</motion.p>
      </div>
      <div className={styles.bottomBar}>
        <motion.p>{profile.birthday}</motion.p>
        <motion.div
          className={styles.timelineBar}
          style={{ width: size[0] - 220 }}
        >
          <motion.div
            className={styles.timelineProgress}
            initial={{ width: 0, left: 0 }}
            animate={{ width: size[0] - 220 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className={styles.timelineRange}
            style={{
              width: rangeEnd - rangeStart,
              left: ((size[0] - 220) * rangeStart) / dayArray.length,
            }}
          ></motion.div>

          {eventArray.map((item, index) => {
            return (
              <motion.div
                className={styles.timelineEvent}
                style={{
                  left: ((size[0] - 220) * item.dayIndex) / dayArray.length,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 2 }}
                transition={{ duration: 1, delay: 0.2 * index }}
              >
                <div className={styles.timelineEventMargin}></div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.p>{todayDate}</motion.p>
      </div>
      <div className={styles.controlWrapper}>
        <div className={styles.controlBack}>
          <SliderWrapper>
            <ReactSlider
              className={styles.horizontalSlider}
              thumbClassName="thumb"
              trackClassName="track"
              min={1}
              // renderThumb={(props, state) => (
              //   <div {...props}>{state.valueNow}</div>
              // )}
              defaultValue={100}
              onChange={(state) => {
                // console.log(state);
                setDayFontSize((90 * state) / 100);
                if (state > 50) {
                  setTimelineScale("days");
                } else if (state <= 50 && state > 20) {
                  setTimelineScale("months");
                } else {
                  setTimelineScale("years");
                }
              }}
            />
          </SliderWrapper>
          <motion.p className={styles.scaleStatus}>{timelineScale}</motion.p>
          <motion.div
            className={styles.addBtn}
            style={{ background: "rgba(255, 255, 255, 0.03)" }}
            whileHover={{ background: "rgba(255,255,255,0.06)", scale: 1.07 }}
            transition={{ type: "spring" }}
          >
            +
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: mEvent === true || mMilestone === true ? -height * 0.4 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <DaysWrapperScroll>
          <DaysWrapper>
            {dayArray.length !== 0 ? (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={dayArray.length}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => {
                  gridRef.current = ref;
                  return (
                    <Grid
                      ref={ref}
                      columnCount={dayArray.length}
                      rowCount={1}
                      columnWidth={dayFontSize / 5 + dayFontSize}
                      rowHeight={80}
                      height={250}
                      width={1400}
                      // onScroll={(info) => {
                      //   console.log(info);
                      // }}

                      // reference link at https://stackblitz.com/edit/react-list-counter
                      onItemsRendered={(info) => {
                        // console.log(
                        //   info
                        //   // info.visibleColumnStartIndex,
                        //   // info.visibleColumnStopIndex
                        // );
                        setRangeStart(info.visibleColumnStartIndex);
                        setRangeEnd(info.visibleColumnStopIndex);
                      }}
                    >
                      {Cell}
                    </Grid>
                  );
                }}
              </InfiniteLoader>
            ) : null}
          </DaysWrapper>
        </DaysWrapperScroll>
      </motion.div>
      {/* <MarkEventLayout
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
      </MarkEventLayout> */}
      {/* <BtnWrapper>
        <MarkEvent
          style={{ opacity: mMilestone ? 0.3 : 1 }}
          onClick={() => {
            // setMEvent(!mEvent);
            // console.log(mEvent);
            gridRef.current.scrollToItem({
              align: "smart",
              columnIndex: 300,
              rowIndex: 0,
            });
            console.log(gridRef.current);
          }}
        >
          +
        </MarkEvent>
        <MarkMilestone
          style={{ opacity: mEvent ? 0.3 : 1 }}
          onClick={() => {
            // setMMilestone(!mMilestone);
          }}
        >
          +
        </MarkMilestone>
      </BtnWrapper> */}

      {/* <Profile></Profile> */}

      {/* <Basic /> */}
    </div>
  );
};

export default Tester;

const TimelineTitle = styled.div`
  width: 94vw;
  height: 20vh;
  position: fixed;
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

const SliderWrapper = styled.div`
  background: red;

  .thumb {
    cursor: pointer;
    position: absolute;
    background: black;
    border: 1px solid grey;
    display: block;
    height: 10px;
    margin-top: -5px;
    transition: 0.5s;
  }
  .thumb:hover {
    border: 1px solid white;
  }
  .thumb.active {
    background-color: grey;
  }
  .track {
    background: white;
    height: 1px;
  }
`;

const DaysWrapperScroll = styled.div`
  width: 100vw;
  padding-top: 45vh;
  position: relative;
`;
const DaysWrapper = styled.div`
  height: 20vh;
  margin-left: 3vw;
  margin-right: 8vw;
  display: flex;
  position: absolute;
  top: 40vh;
  justify-content: space-between;
  z-index: 100;
  width: 92vw;

  // & ::-webkit-scrollbar {
  //   height: 5px;
  //   background-color: darkgrey;
  // }
  // & ::-webkit-scrollbar-thumb {
  //   height: 5px;
  //   background-color: darkgrey;
  // }
  // & ::-webkit-scrollbar-track {
  //   height: 5px;
  //   background-color: grey;
  // }
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
