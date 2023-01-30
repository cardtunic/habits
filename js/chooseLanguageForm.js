// pega todos o elementos HTML necessários

const chooseLanguageForm = document.querySelector("#choose-language");
const changeLanguageButton = document.querySelector("#change-language");
const chooseLanguageFormCancelButton = document.querySelector(
  "#choose-language .cancel-button"
);

const chooseLanguageFormAvailableLanguages = document.querySelector(
  "#choose-language .languages"
);

// handlers

// lida com os cliques no botão de cancelar dentro do formulário

chooseLanguageFormCancelButton.addEventListener("click", async () => {
  chooseLanguageForm.style.display = "none"; // esconde o formulário
});

// lida com os cliques no botão de mudar a linguagem

changeLanguageButton.addEventListener("click", () => {
  // dispara se o formulário estiver invisível, mostrando-o

  if (
    chooseLanguageForm.style.display === "none" ||
    chooseLanguageForm.style.display === ""
  ) {
    chooseLanguageForm.style.display = "flex";

    // dispara se o formulário estiver visível, escodendo-o
  } else if (chooseLanguageForm.style.display === "flex") {
    chooseLanguageForm.style.display = "none";
  }
});

// lida com os cliques do usuário ao selecionar uma linguagem

function chooseLanguage(languageTag) {
  setUserLanguagePreference(languageTag); // define a linguagem de preferência do usuário

  chooseLanguageForm.style.display = "none"; // esconde o formulário

  document.location.reload(true); // atualiza a página para aplicar as alterações
}

// renderiza as linguagens disponíveis no formulário

async function renderAvailableLanguages() {
  const userLanguageTag = await getUserLanguageTag(); // retorna a tag da linguagem do usuário
  const availableLangs = await getAvailableLanguages();
  const language = await getLanguage();

  // passa por cada linguaegm disponível, e cria um elemento dentro do formulário relativo a ela

  availableLangs.forEach((lang) => {
    const isSelected = lang === userLanguageTag; // retorna um valor verdadeiro quando a linguagem em questão é igual a linguagem do usuário

    chooseLanguageFormAvailableLanguages.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="language ${isSelected ? "selected" : ""}"
        onclick=chooseLanguage("${lang}")    
      >
      ${language[`language-${lang.toLowerCase()}`]}
      </div>
      `
    );
  });
}

renderAvailableLanguages(); // renderiza as linguagens disponíveis pela primeira vez
