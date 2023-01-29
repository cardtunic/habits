document.addEventListener("DOMContentLoaded", () => {
  addLangaugeText();
});

// adiciona o texto dos elementos HTML da página, de acordo com a linguagem atual

async function addLangaugeText() {
  const currentLangauge = await getLanguage(); // retorna a linguagem atual
  const elementsToAddText = document.querySelectorAll("[data-translate-key]"); // retorna os elementos que terão texto adicionado

  // passa por todos os elementos e adiciona o texto relativo ao data-translate-key

  elementsToAddText.forEach((element) => {
    const translateKey = element.getAttribute("data-translate-key");

    // dispara se o elemento estiver dentro de outro objeto

    if (typeof currentLangauge[translateKey] === "object") {
      const parentObjetct = currentLangauge[translateKey];

      // passa por cada "key" do objeto pai, e adiciona o texto relativo ao elemento

      Object.keys(parentObjetct).forEach((key) => {
        const elementText = parentObjetct[key]; // retorna o texto relativo ao elemento

        // dispara se o elemento for um input, mudando seu placeholder

        if (key === "input") {
          element.querySelector(key).setAttribute("placeholder", elementText);

          return;
        }

        const elementChildren = element.querySelector(key).innerHTML; // retorna o HTML interno, com os filhos do elemento

        // adiciona o texto, mas sem alterar o HTML interno anterior

        element.querySelector(key).innerHTML = elementText.replace(
          "{{child}}",
          elementChildren
        );
      });

      return;
    }

    const elementText = currentLangauge[translateKey]; // retorna o texto relativo ao elemento
    const elementChildren = element.innerHTML; // retorna o HTML interno, com os filhos do elemento

    element.innerHTML = elementText.replace("{{child}}", element.innerHTML); // adiciona o texto, mas sem alterar o HTML interno anterior
  });
}
