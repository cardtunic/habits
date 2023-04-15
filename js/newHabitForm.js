class NewHabitForm {
	constructor() {
		// get all necessary DOM elements

		this.element = document.querySelector("#new-habit-form");

		
		this.habitIconBtn = this.element.querySelector(
			".info-view .habit-icon button"
		);

		this.submitBtn = this.element.querySelector(".buttons .submit-button");
		this.cancelBtn = this.element.querySelector(".buttons .cancel-button");
		
		// set some configs

		this.currentVisibility = "invisible";
		this.currentView = "info";

		// set listeners for some elements

		this.habitIconBtn.addEventListener("click", () =>
			this.eventHandler("showIcon")
		);

		this.submitBtn.addEventListener("click", () =>
			this.eventHandler("submit")
		);

		this.cancelBtn.addEventListener("click", () =>
			this.eventHandler("cancel")
		);

		// fetch icons list and show in HTML

		fetch(
			"https://raw.githubusercontent.com/cardtunic/habits/main/assets/repos/icons.json"
		)
			.then(async data => {
				const iconsList = await data.json();

				iconsList.forEach(icon => {
					this.createIconElement(icon);
				});
			})
			.catch(error => {
				console.error(`Error when try to fetch icons list.\n${error}`);
			});
	}

	// handles all events in form

	eventHandler(event, args) {
		const events = {
			submit() {
				this.submitNewHabit();
			},
			cancel() {
				if (this.currentView === "icons") {
					this.toggleView();
				} else {
					this.toggleVisibility();
				}
			},
			showIcon() {
				this.toggleView();
			},
			selectIcon(iconName) {
				this.habitIconBtn.querySelector(".icon").innerText = iconName;
				this.toggleView();
			},
		};

		events[event].apply(this, args);
	}

	// create icon element to show in HTML

	createIconElement(iconName) {
		const icon = document.createElement("span");
		icon.classList.add("material-symbols-outlined");
		icon.classList.add("icon");
		icon.innerText = iconName;

		const iconsList = this.element.querySelector(".icons-view .icons-list");
		iconsList.appendChild(icon);

		icon.addEventListener("click", () => this.eventHandler("selectIcon", [iconName]));
	}

	// toggle view to icons view or info view

	toggleView() {
		const infoView = this.element.querySelector(".info-view");
		const iconsView = this.element.querySelector(".icons-view");

		if (this.currentView === "icons") {
			iconsView.style.display = "none";
			infoView.style.display = "flex";

			this.submitBtn.style.display = "flex";
			this.currentView = "info";
		} else if (this.currentView === "info") {
			iconsView.style.display = "flex";
			infoView.style.display = "none";

			this.submitBtn.style.display = "none";
			this.currentView = "icons";
		}
	}

	// toggle visibility of new habit form element

	toggleVisibility() {
		if (this.currentVisibility === "invisible") {
			this.element.style.display = "flex";
			this.currentVisibility = "visible";
		} else if (this.currentVisibility === "visible") {
			this.element.style.display = "none";
			this.currentVisibility = "invisible";
		}
	}

	// submit the new habit created by user

	submitNewHabit() {
		const selectedHabitIcon = this.habitIconBtn.querySelector("span").innerText;
		const habitNameInput = this.element.querySelector("#habit-name-input").value;

		if (habitNameInput.length === 0) {
			alert("⚠️ Escolha um nome para o seu novo hábito.");
			return;
		}

		addHabit({
			icon: selectedHabitIcon,
			name: habitNameInput,
		});

		this.toggleVisibility();
	}
}

export default NewHabitForm;
