import { newHabitForm } from "./index.js";

const addNewHabitButton = document.querySelector("#add-new-habit");

addNewHabitButton.addEventListener("click", () => {
	newHabitForm.toggleVisibility();
});
