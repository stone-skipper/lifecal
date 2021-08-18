import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";
import dataTable from "../media/test.csv";

var color1, setColor1;
var color2, setColor2;

const Graph = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t = 0;
    var xstep = 8;
    //   let yfactor = 0.00000006; original
    var yfactor = 0.00000025;

    let data;
    let bar = xstep;

    p.preload = () => {
      data = p.loadTable(dataTable, "csv", "header");
    };

    p.setup = () => {
      p.createCanvas(width, height);
      p.background(p.color("EBEBEB"));

      console.log(data.getRowCount() + " total rows in table");
      console.log(data.getColumnCount() + " total columns in table");

      console.log(data.columns);
    };

    p.setupPosition = () => {};

    p.windowResized = () => {
      p.resizeCanvas(width, height);
      p.drawBackground();
      p.setupPosition();
    };

    p.drawBackground = () => {
      // p.background("red")
      p.background(p.color("EBEBEB"));
      p.noStroke();
    };

    function colorAlpha(aColor, alpha) {
      var c = p.color(aColor);
      return p.color(
        "rgba(" + [p.red(c), p.green(c), p.blue(c), alpha].join(",") + ")"
      );
    }

    p.draw = () => {
      let ax, ay;
      let by, cy, dy, ey, fy;

      //speed contro
      if (yfactor > 0.00000006) {
        yfactor = yfactor - 0.000000003;
      }

      if (bar < xstep * (data.getRowCount() - 1)) {
        bar = bar + xstep;
      }

      let gap = 5;

      let arcA1, arcA2;

      // asia
      p.background(p.color("#EBEBEB"));
      //   bar = 100;

      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        p.vertex(ax, height);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        p.fill(colorAlpha("#3D7FFF", 0.2));
        p.vertex(ax, ay);
      }

      p.endShape();

      //africa
      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        p.vertex(ax, ay - gap);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        p.fill(colorAlpha("#3D7FFF", 0.2));
        p.vertex(ax, by - gap);
      }
      p.endShape();

      //europe
      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;

        p.vertex(ax, by - gap * 2);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        p.fill(colorAlpha("#696969", 0.2));

        p.vertex(ax, cy - gap * 2);
      }
      p.endShape();

      //NA
      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;

        p.vertex(ax, cy - gap * 3);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        dy = cy - data.getColumn("North America")[i] * yfactor;
        p.fill(colorAlpha("#696969", 0.2));
        p.vertex(ax, dy - gap * 3);
      }
      p.endShape();

      //LA
      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        dy = cy - data.getColumn("North America")[i] * yfactor;

        p.vertex(ax, dy - gap * 4);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        dy = cy - data.getColumn("North America")[i] * yfactor;
        ey = dy - data.getColumn("Latin America")[i] * yfactor;
        p.fill(colorAlpha("#696969", 0.2));

        p.vertex(ax, ey - gap * 4);
      }
      p.endShape();

      //Oceania
      p.beginShape();
      for (let i = data.getRowCount() - 1; i >= 1; i--) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        dy = cy - data.getColumn("North America")[i] * yfactor;
        ey = dy - data.getColumn("Latin America")[i] * yfactor;

        p.vertex(ax, ey - gap * 5);
      }
      for (let i = 1; i < data.getRowCount(); i++) {
        ax = i * xstep;
        ay = height - data.getColumn("Asia")[i] * yfactor;
        by = ay - data.getColumn("Africa")[i] * yfactor;
        cy = by - data.getColumn("Europe")[i] * yfactor;
        dy = cy - data.getColumn("North America")[i] * yfactor;
        ey = dy - data.getColumn("Latin America")[i] * yfactor;
        fy = ey - data.getColumn("Ocenania")[i] * yfactor;

        p.fill(colorAlpha("#696969", 0.2));

        p.vertex(ax, fy - gap * 5);
      }
      p.endShape();

      // cursor
      p.stroke(p.color("#696969"));
      p.line(bar, 50, bar, height);
      p.noStroke();
      p.fill(p.color("#ebebeb"));
      p.rect(bar, 0, width, height);

      p.fill(p.color("white"));
      p.noStroke();
      p.fill(p.color("#3D7FFF"));

      //asia
      p.arc(
        bar,
        height -
          (data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor) / 2,
        data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );

      //africa
      p.arc(
        bar,
        height -
          data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor -
          gap -
          (data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor) / 2,
        data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );

      //europe
      p.fill(p.color("#696969"));
      p.arc(
        bar,
        height -
          data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor -
          gap * 2 -
          data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor -
          (data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor) / 2,
        data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );

      //na
      p.fill(p.color("#696969"));
      p.arc(
        bar,
        height -
          data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor -
          gap * 3 -
          data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor -
          (data.getColumn("North America")[Math.floor(bar / xstep)] * yfactor) /
            2,
        data.getColumn("North America")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("North America")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );

      //la
      p.arc(
        bar,
        height -
          data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor -
          gap * 4 -
          data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("North America")[Math.floor(bar / xstep)] * yfactor -
          (data.getColumn("Latin America")[Math.floor(bar / xstep)] * yfactor) /
            2,
        data.getColumn("Latin America")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("Latin America")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );

      //la
      p.arc(
        bar,
        height -
          data.getColumn("Asia")[Math.floor(bar / xstep)] * yfactor -
          gap * 5 -
          data.getColumn("Africa")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("Europe")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("North America")[Math.floor(bar / xstep)] * yfactor -
          data.getColumn("Latin America")[Math.floor(bar / xstep)] * yfactor -
          (data.getColumn("Ocenania")[Math.floor(bar / xstep)] * yfactor) / 2,
        data.getColumn("Ocenania")[Math.floor(bar / xstep)] * yfactor,
        data.getColumn("Ocenania")[Math.floor(bar / xstep)] * yfactor,
        p.radians(270),
        p.radians(90)
      );
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

export default Graph;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
