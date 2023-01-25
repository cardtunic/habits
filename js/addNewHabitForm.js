// pega todos os elementos HTML necessários

const newHabitFormInfoView = document.querySelector(
  "#new-habit-form .habit-info-view"
);

const newHabitFormIconView = document.querySelector(
  "#new-habit-form .habit-icon-view"
);

const newHabitFormSubmitButton = document.querySelector(
  "#new-habit-form .buttons .submit-button"
);

const newHabitFormCancelButton = document.querySelector(
  "#new-habit-form .buttons .cancel-button"
);

const newHabitFormIconSelectorButton = document.querySelector(
  "#habit-icon-selector"
);

const newHabitFormNameInput = document.querySelector("#habit-name-input");

const newHabitFormIconsList = document.querySelector(
  "#new-habit-form .habit-icon-view .icons-list"
);

// funções para renderizar diferentes estados do formulário

function renderHabitInfoView() {
  newHabitFormSubmitButton.style.display = "flex";
  newHabitFormInfoView.style.display = "flex";
  newHabitFormIconView.style.display = "none";
}

async function renderHabitIconView() {
  if (newHabitFormIconsList.innerHTML === "") {
    const data = await fetch(
      "https://raw.githubusercontent.com/cardtunic/habits/main/assets/icons/icons.json"
    );
    const availableIcons = await data.json();

    const iconsElements = availableIcons.map((icon) => {
      return `<span class="material-symbols-outlined" onclick="selectIcon(event)">${icon}</span>`;
    });
    newHabitFormIconsList.insertAdjacentHTML(
      "beforeend",
      iconsElements.join("")
    );
  }

  newHabitFormInfoView.style.display = "none";
  newHabitFormIconView.style.display = "flex";
  newHabitFormSubmitButton.style.display = "none";
}

function hideNewHabitForm() {
  newHabitForm.style.display = "none";

  if (newHabitFormIconView.style.display === "flex") {
    newHabitFormInfoView.style.display = "flex";
    newHabitFormSubmitButton.style.display = "flex";
    newHabitFormIconView.style.display = "none";
  }
}

// muda para a visão de seleção de ícone quando o botão de seleção de ícone é apertado

newHabitFormIconSelectorButton.addEventListener("click", async () => {
  renderHabitIconView();
});

// esconde um formulário quando o botão "cancelar" é apertado

newHabitFormCancelButton.addEventListener("click", async () => {
  hideNewHabitForm();
});

// verifica os valores fornecidos e envia-os para a função que cria um hábito

newHabitFormSubmitButton.addEventListener("click", async () => {
  const habitName = newHabitFormNameInput.value;

  if (habitName === "") {
    alert("⚠️ Preencha o campo de nome do hábito.");
    return;
  }

  const habitIcon = newHabitFormIconSelectorButton.innerText;

  try {
    addHabit({ icon: habitIcon, name: habitName });

    renderLayout();
    hideNewHabitForm();
  } catch (error) {
    alert(error.message);
  }
});

// recebe os eventos de clique pra cada clique na lista de ícones
// muda o ícone no botão de seleção de ícones
// muda para a visão de preenchimento de info do novo hábito

function selectIcon(event) {
  const choosedIcon = event.currentTarget.innerText;
  newHabitFormIconSelectorButton.innerHTML = `<span class="material-symbols-outlined">${choosedIcon}</span>`;

  renderHabitInfoView();
}
