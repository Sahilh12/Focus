const goalContainers = document.querySelectorAll(".goal-container");
const inputs = document.querySelectorAll(".goal-input");
const checkboxes = document.querySelectorAll(".custom-checkbox");
const errorGoal = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progresValue = document.querySelector(".progress-value");
const progressLable = document.querySelector(".progress-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let goalCount = Object.values(allGoals).filter((goal) => goal.completed).length;

const quotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away ,keep going!",
  "Whoa! You just completed all the goals, time for chill",
];
progressLable.innerText = `${quotes[goalCount]}`;

progresValue.style.width = `${(goalCount / 3) * 100}%`;
progresValue.firstElementChild.innerText = ` ${goalCount} / 3 completed`;

checkboxes.forEach((box) => {
  box.addEventListener("click", () => {
    const filledInput = [...inputs].every((input) => {
      return input.value;
    });

    if (filledInput) {
      box.parentElement.classList.toggle("completed");
      const inputID = box.nextElementSibling.id;
      allGoals[inputID].completed = !allGoals[inputID].completed;
      goalCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressLable.innerText = `${quotes[goalCount]}`;
      progresValue.style.width = `${(goalCount / 3) * 100}%`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      progresValue.firstElementChild.innerText = ` ${goalCount} / 3 completed`;
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputs.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
