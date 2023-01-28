document.addEventListener("DOMContentLoaded", () => {
  setLangaugeText();
});

async function setLangaugeText() {
  const currentLangauge = await getCurrentLanguage();
  const elementsToSetText = document.querySelectorAll("[data-translate-key]");

  elementsToSetText.forEach((element) => {
    const translateKey = element.getAttribute("data-translate-key");

    if (typeof currentLangauge[translateKey] === "object") {
      const fatherObject = currentLangauge[translateKey];

      Object.keys(fatherObject).forEach((key) => {
        const elementText = fatherObject[key];

        if (key === "input") {
          element
            .querySelector(key)
            .setAttribute(
              "placeholder",
              elementText.replace("{{child}}", element.innerHTML)
            );

          return;
        }

        element.querySelector(key).innerHTML = elementText.replace(
          "{{child}}",
          element.innerHTML
        );
      });

      return;
    }

    const elementText = currentLangauge[translateKey];
    element.innerHTML = elementText.replace("{{child}}", element.innerHTML);
  });
}
