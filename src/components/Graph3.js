import React from "react";
import styled from "styled-components";
import * as p5 from "p5";
import { motion } from "framer-motion";
import store from "../store";
import { Link } from "react-router-dom";
import dataTable from "../media/test.csv";

var color1, setColor1;
var color2, setColor2;

const Graph3 = () => {
  [color1, setColor1] = React.useState("#0A6AFA");
  [color2, setColor2] = React.useState("#FFD500");
  const p5ref = React.useRef(null);

  var width = window.innerWidth;
  var height = window.innerHeight;

  const sketch = (p) => {
    let x = 0;
    let y = 0;
    var t = 0;
    var xstep = 10;
    //   let yfactor = 0.00000006; original
    var yfactor = 0.00000002;

    let data;
    let bar = xstep;
    let yearsum =[]

    p.preload = () => {
      data = p.loadTable(dataTable, "csv", "header");
    };

    p.setup = () => {
      p.createCanvas(width, height);
      p.background(p.color("EBEBEB"));

      console.log(data.getRowCount() + " total rows in table");
      console.log(data.getColumnCount() + " total columns in table");

      console.log(data.columns);
      console.log()

      for (let i=1; i< data.getRowCount(); i++){
        console.log( parseInt(data.rows[i].arr[1]))
yearsum.push(parseInt(data.rows[i].arr[1]) +parseInt(data.rows[i].arr[2])+parseInt(data.rows[i].arr[3]) + parseInt(data.rows[i].arr[4]) + parseInt(data.rows[i].arr[5]) + parseInt(data.rows[i].arr[6]))   
      }
      console.log( parseInt(data.rows[1].arr[2])/yearsum[0]*360)
   

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

      // speed control
      // if (yfactor < 0.00000006) {
      //   yfactor = yfactor + 0.0000000001;
      // }

    //   if (bar < xstep * (data.getRowCount() - 1)) {
    //     bar = bar + xstep;
    //   }
      let gap = 200;
      p.background(p.color("black"));
p.translate(width/2, height/2)
p.rotate(p.radians(270) + p.radians(360*1/(data.getRowCount()-1)))

      let arcA1, arcA2;
      for (let i=1; i<= data.getRowCount()-1; i++){
        p.strokeWeight(3); 
        p.noFill();
  p.stroke(colorAlpha("grey", 0.5));
        //   p.arc(width/2, height/2, xstep*i, xstep*i, 0, p.radians(360*parseInt(data.rows[i].arr[1])/yearsum[i-1]));
        //all
        p.line(0,gap,0,yearsum[i-1]*yfactor+gap)

        //asia
        p.stroke(colorAlpha("#FF603D", 1));
       p.line(0,gap,0, parseInt(data.rows[i].arr[1])/yearsum[i-1]*yearsum[i-1]*yfactor+gap);

       //africa
       p.stroke(colorAlpha("#FDAF00", 1));
       p.line(0,parseInt(data.rows[i].arr[1])/yearsum[i-1]*yearsum[i-1]*yfactor+gap, 0,parseInt(data.rows[i].arr[1])/yearsum[i-1]*yearsum[i-1]*yfactor+ parseInt(data.rows[i].arr[2])/yearsum[i-1]*yearsum[i-1]*yfactor+gap);
       
       //europe
       p.stroke(colorAlpha("skyblue", 1));
      //  p.line(0,parseInt(data.rows[i].arr[1])/yearsum[i-1]*yearsum[i-1]*yfactor+ parseInt(data.rows[i].arr[2])/yearsum[i-1]*yearsum[i-1]*yfactor+gap, 0,parseInt(data.rows[i].arr[1])/yearsum[i-1]*yearsum[i-1]*yfactor+ parseInt(data.rows[i].arr[2])/yearsum[i-1]*yearsum[i-1]*yfactor+ parseInt(data.rows[i].arr[3])/yearsum[i-1]*yearsum[i-1]*yfactor+gap);

        p.rotate(p.radians(360*1/(data.getRowCount()-1)));

      }
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

export default Graph3;

const P5bg = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
