// define a preferência de linguagem do usuário

function setUserLangPreference(languageTag) {
	localStorage.setItem("lang", languageTag);
}

// retorna uma lista com as linguagem disponíveis

async function getAvailableLangs() {
	let availableLangs = [];

	const listOfAvailableLangs = await (
		await fetch(
			"https://raw.githubusercontent.com/cardtunic/habits/main/assets/repos/langs/availableLangs.json"
		)
	).json();

	const currentLang = getCurrentLangTag(listOfAvailableLangs);

	for (let langTag of listOfAvailableLangs) {
		let lang = await (
			await fetch(
				`https://raw.githubusercontent.com/cardtunic/habits/main/assets/repos/langs/${langTag}.json`
			)
		).json();

		lang.tag = langTag;

		if (currentLang === langTag) {
			lang.selected = true;
		}

		availableLangs.push(lang);
	}

	return availableLangs;
}

// retorna a linguagem de preferência do usuário

function getCurrentLangTag(listOfAvailableLangs) {
	const userLanguagePreference = localStorage.getItem("lang");

	let currentLang = userLanguagePreference || navigator.language;
	// define o código de linguagem da página com base na preferência do usuário, somente caso ela já estiver definida
	// caso contrário, pega a linguagem do navegador do usuário

	// dispara se a tag da linguagem não corresponde a nenhuma das disponíveis

	if (!listOfAvailableLangs.includes(currentLang)) {
		// dispara se a linguagem do usuário não obedecer ao padrão: "linguagem-país" (ex.: pt-BR)

		if (currentLang.length === 2) {
			currentLang = listOfAvailableLangs.filter(lang =>
				lang.startsWith(currentLang)
			)[0];

			// define a linguagem padrão como sendo inglês, caso a do usuário não esteja disponível
		} else {
			currentLang = "en-US";
		}
	}

	return currentLang;
}