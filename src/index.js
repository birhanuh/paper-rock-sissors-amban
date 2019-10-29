import _ from "lodash";
import "./styles/style.css";
import Placeholder from "./images/placeholder.png";
import printMe from "./print.js";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  // Add the image to our existing div.
  const myPlaceholder = new Image();
  myPlaceholder.src = Placeholder;

  element.appendChild(myPlaceholder);

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
