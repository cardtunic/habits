// define a preferência de linguagem do usuário

function setUserLanguagePreference(languageTag) {
  localStorage.setItem("lang", languageTag);
}

// retorna uma lista com as linguagem disponíveis

async function getAvailableLanguages() {
  const availabeLangs = await (
    await fetch("../../assets/repos/langs/availableLangs.json")
  ).json();

  return availabeLangs;
}

// retorna a linguagem de preferência do usuário

async function getUserLanguageTag() {
  const availabeLangs = await getAvailableLanguages();
  const userLanguagePreference = localStorage.getItem("lang");

  let userLanguageTag = userLanguagePreference || navigator.language;
  // define o código de linguagem da página com base na preferência do usuário, somente caso ela já estiver definida
  // caso contrário, pega a linguagem do navegador do usuário

  // dispara se a tag da linguagem não corresponde a nenhuma das disponíveis

  if (!availabeLangs.includes(userLanguageTag)) {
    // dispara se a linguagem do usuário não obedecer ao padrão: "linguagem-país" (ex.: pt-BR)

    if (userLanguageTag.length === 2) {
      userLanguageTag = availabeLangs.filter((lang) =>
        lang.startsWith(userLanguageTag)
      )[0];

      // define a linguagem padrão como sendo inglês, caso a do usuário não esteja disponível
    } else {
      userLanguageTag = "en-US";
    }
  }

  return userLanguageTag;
}

// retorna o objeto da linguagem atual, com todos as strings necessárias

async function getLanguage() {
  const userLanguageTag = await getUserLanguageTag();

  const language = await (
    await fetch(`../../assets/repos/langs/${userLanguageTag}.json`)
  ).json();

  return language;
}
