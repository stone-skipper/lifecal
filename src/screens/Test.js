import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Slider } from "@lifarl/react-scroll-snap-slider";

import { Link } from "react-router-dom";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useDragToScroll,
  useScroll,
} from "react-snaplist-carousel";
//https://www.npmjs.com/package/react-snaplist-carousel
const MyItem = React.forwardRef(
  ({ children, visible, isDragging, ...props }, ref) => (
    <div
      style={{
        width: "fit-content",
        height: 200,
        fontSize: 30,
        background: visible ? "#bce6fe" : "#cccccc",
        cursor: visible | isDragging ? "inherit" : "pointer",
        padding: 20,
      }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
);

const Test = () => {
  const snapList = React.useRef(null);
  const lastSnapItem = React.useRef(null);
  const goToSnapItem = useScroll({ ref: snapList });

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  );
  const goToChildren = useScroll({ ref: snapList });
  const { isDragging } = useDragToScroll({ ref: snapList });
  return (
    <Wrapper>
      <LWrapper>
        <motion.h1>shadergradient</motion.h1>
        <motion.h1>Make</motion.h1>
        <motion.h1>your products</motion.h1>
        <motion.h1>
          <span>alive</span>
        </motion.h1>
        <motion.p>
          Customize all the moving gradients inspired by nature, emotions and
          blahand apply them to your products from Figma and Framer. <br />
          You can control Noise / Color / Speed / Lighting / Shape
        </motion.p>
        <SlideWrapper>
          <SnapList
            ref={snapList}
            tabIndex={0} // so it can receive focus and can be scrolled with keyboard
            role="region" // context for screen readers
            aria-label="my awesome snaplist" // for screen readers to read out loud on focus
          >
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem
                tabIndex={0}
                visible={visible === 0}
                isDragging={isDragging}
              >
                Item 0
              </MyItem>
              {/* <button
                onClick={() => {
                  goToSnapItem(4);
                  lastSnapItem.current?.focus();
                }}
              >
                go to last item
              </button> */}
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem
                tabIndex={1}
                visible={visible === 1}
                isDragging={isDragging}
              >
                Item 1
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem
                tabIndex={2}
                visible={visible === 2}
                isDragging={isDragging}
              >
                Item 2
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem
                tabIndex={3}
                visible={visible === 3}
                isDragging={isDragging}
              >
                Item 3
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem
                ref={lastSnapItem}
                tabIndex={4}
                visible={visible === 4}
                isDragging={isDragging}
              >
                Item 4
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem ref={lastSnapItem} tabIndex={5} visible={visible === 5}>
                Item 4
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem ref={lastSnapItem} tabIndex={6} visible={visible === 6}>
                Item 4
              </MyItem>
            </SnapItem>
            <SnapItem margin={{ left: "15px", right: "15px" }} snapAlign="left">
              <MyItem ref={lastSnapItem} tabIndex={7} visible={visible === 7}>
                Item 4
              </MyItem>
            </SnapItem>
          </SnapList>
        </SlideWrapper>
      </LWrapper>
      <RWrapper>
        <MobileLine></MobileLine>
      </RWrapper>
    </Wrapper>
  );
};

export default Test;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
  display: grid;
  grid-template-columns: 50vw 50vw;
`;

const LWrapper = styled.div`
  width: 50vw;
  height: 100vh;
`;

const RWrapper = styled.div`
  width: 50vw;
  height: 100vh;
  background: black;
`;

//https://github.com/lifarl/react-scroll-snap-slider
const SlideWrapper = styled.div`
  width: 50vw;
  background: green;
  display: flex;
  fliex-direction: column;
`;

const SlideItem = styled.div`
  width: fit-content;
  background: blue;
`;

const MobileLine = styled.div`
  box-sizing: border-box;
  width: 296px;
  height: 606px;
  overflow: hidden;
  border-radius: 27px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
`;
