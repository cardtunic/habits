function setUserLanguagePreference(languageCode) {
  localStorage.setItem("lang", languageCode);
}

async function getCurrentLanguage() {
  const availabeLangs = await (
    await fetch("../../assets/repos/langs/availableLangs.json")
  ).json();

  const userLanguagePreference = localStorage.getItem("lang");
  let userLanguageCode = userLanguagePreference || navigator.language;

  if (!availabeLangs.includes(userLanguageCode)) {
    if (userLanguageCode.length === 2) {
      userLanguageCode = availabeLangs.filter((lang) =>
        lang.startsWith(userLanguageCode)
      )[0];
    } else {
      userLanguageCode = "en-US";
    }
  }

  const currentLangauge = await (
    await fetch(`../../assets/repos/langs/${userLanguageCode}.json`)
  ).json();

  return currentLangauge;
}
