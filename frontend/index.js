import io from "socket.io-client";

const socket = io();
console.log("This is the front end");

document
  .querySelector("input#chatMessage")
  .addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      const message = event.target.value;
      event.target.value = "";

      fetch("/chat/0", {
        method: "post",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
    }
  });
