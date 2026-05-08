//  import kaboom from "kaboom"; // usually it is kaboom.js but since we have vite no need to write that.
//  import { scaleFactor } from "./constants";
//  export const k=kaboom({
//     global: false, // 
//     touchToMouse: true, // for phone users conv. touch events on phone to click events.
//     canvas: document.getElementById("game"), // give kaboom ctrl of game id from html.
//     scale: 1,
//     clearColor: [0,0,0,1],
//  })
 

import kaboom from "kaboom";

export const k = kaboom({
  global: false,
  touchToMouse: true,
  scale: 1,
  clearColor: [0, 0, 0, 1],
});
