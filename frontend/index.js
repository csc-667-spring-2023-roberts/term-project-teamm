import io from "socket.io-client";

const socket = io();
const messageContainer = document.querySelector("#messages");

console.log("This is the front end");
console.log("This is the front end again");
socket.on("chat-message", ({ message, sender }) => {
  console.log({ message, sender });

  const name = document.createElement("span");
  name.innerText = sender;
  const thing = document.createElement("div");
  thing.innerText = message;

  display.appendChild(name);
  display.appendChild(thing);

  messageContainer.append(display);
});

document
  .querySelector("input#chatMessage")
  .addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      const message = event.target.value;
      console.log({ message });
      event.target.value = "";

      fetch("/chat/0", {
        method: "post",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
    }
  });
