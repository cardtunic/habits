const addNewHabitButton = document.querySelector("#add-new-habit");
const newHabitForm = document.querySelector("#new-habit-form");

addNewHabitButton.addEventListener("click", () => {
  newHabitForm.style.display = "flex";
});
