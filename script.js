"use strict";

class elevator {
  constructor(name) {
    this.name = name;
    this.location = 0;
    this.queue = [];
  }
}

class system {
  constructor() {
    this.elevators = [
      new elevator("elevator1"),
      new elevator("elevator2"),
      new elevator("elevator3"),
      new elevator("elevator4"),
      new elevator("elevator5"),
    ];
  }

  findElevator(dest) {
    let max = 9;
    let el = "all taken";
    this.elevators.forEach((elevator) => {
      if (elevator.queue.length === 0) {
        if (Math.abs(dest - elevator.location) <= max) {
          max = Math.abs(dest - elevator.location);
          el = elevator.name;
        }
      }
    });

    if (el === "all taken") {
      let min = elevators[0].queue.length;
      el = elevators[0].name;
      this.elevators.forEach((elevator) => {
        if (elevator.quque.length < min) {
          min = elevator.quque.length;
          el = elevator.name;
        }
      });
    }
    return el;
  }
}

const mySystem = new system();

const upAndDown = function (event) {
  const buttonId = event.target.id;
  const floorCalled = parseInt(buttonId.slice(-1));
  //change button color and text
  event.target.style.backgroundColor = "red";
  event.target.textContent = "Waiting";
  // find the closest elevator
  const selectedElevator = mySystem.findElevator(floorCalled);
  const lift = document.getElementById(selectedElevator);
  const liftNum = parseInt(selectedElevator.slice(-1));
  const howMuch = mySystem.elevators[liftNum - 1].location - floorCalled;
  //move elevator
  mySystem.elevators[liftNum - 1].location = floorCalled;

  const start = performance.now();
  moveElevator(lift, howMuch, event.target);
  const end = performance.now();
  const elapsed = end - start;
  console.log(`Elapsed time: ${elapsed} milliseconds`);
};

const moveElevator = function (lift, howMuch, button) {
  console.log(" how much :", howMuch);
  const currentY = parseFloat(lift.getAttribute("y"));
  let newY;
  let step = 0;
  if (howMuch != 0) {
    lift.style.filter =
      "invert(24%) sepia(63%) saturate(6956%) hue-rotate(353deg) brightness(95%) contrast(131%)";
    if (howMuch < 0) {
      newY = currentY + -60 * howMuch;
      const interval = setInterval(function () {
        step += 1;
        const newYPos =
          currentY - ((newY - currentY) / ((howMuch * -60) / 5)) * step;
        lift.setAttribute("y", newYPos);
        if (step >= (howMuch * -60) / 5) {
          clearInterval(interval);
          arrivedFun(lift, button);
        }
      }, 500);
    } else {
      newY = currentY + 60 * howMuch;
      const interval = setInterval(function () {
        step += 1;
        const newYPos =
          currentY + ((newY - currentY) / ((howMuch * 60) / 5)) * step;
        lift.setAttribute("y", newYPos);
        if (step >= (howMuch * 60) / 5) {
          clearInterval(interval);
          arrivedFun(lift, button);
        }
      }, 500);
    }
  }
};

const arrivedFun = function (lift, button) {
  const dingSound = new Audio("ding.mp3");

  lift.style.filter =
    " invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)";
  dingSound.play();
  button.style.backgroundColor = "white";
  button.textContent = "Arrived";
  button.style.color = "4cb651";

  //wait 2 sec
  setTimeout(() => {
    button.style.backgroundColor = "4cb651";
    button.textContent = "Call";
    button.style.color = "white";
    lift.style.filter =
      "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)";
  }, 2000);
};
