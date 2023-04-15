class SelectLangForm {
	constructor() {
		this.element = document.querySelector("#select-lang-form");

		this.cancelBtn = this.element.querySelector(".cancel-button");

		this.cancelBtn.addEventListener("click", () => {
			this.eventHandler("cancel");
		});

		this.currentVisibility = "invisible";

		getAvailableLangs()
			.then(langs => {
				langs.forEach(lang => {
					this.createLangOption(lang);
				});
			})
			.catch(error => {
				console.log(
					`Error when try to fetch available langs.\n${error}`
				);
			});
	}

	eventHandler(event, args) {
		const events = {
			selectLang(langTag) {
				setUserLangPreference(langTag);
				this.toggleVisibility();

				document.location.reload(true);
			},
			cancel() {
				this.toggleVisibility();
			},
		};

		events[event].apply(this, args);
	}

	createLangOption(lang) {
		const langOption = document.createElement("div");

		langOption.classList.add("language");

		if (lang.selected === true) {
			langOption.classList.add("selected");
		}

		langOption.innerText = lang[`language-${lang.tag.toLowerCase()}`];

		const langOptions = this.element.querySelector(".languages");
		langOptions.appendChild(langOption);

		langOption.addEventListener("click", () =>
			this.eventHandler("selectLang", [lang.tag])
		);
	}

	toggleVisibility() {
		if (this.currentVisibility === "invisible") {
			this.element.style.display = "flex";
			this.currentVisibility = "visible";
		} else {
			this.element.style.display = "none";
			this.currentVisibility = "invisible";
		}
	}
}

export default SelectLangForm;
