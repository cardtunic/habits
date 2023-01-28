// handlers: vão lidar com eventos do DOM

// lida com cliques no ícone de deletar hábito

function removeHabitHandler(element) {
  const habitId = Number(
    element.parentElement.parentElement.getAttribute("data-habit-id")
  );

  removeHabit(habitId);
  renderLayout();
}

// lida com cliques em checkboxes dentro do calendário

function addCheckedDayHandler(element, day) {
  const habitId = Number(element.getAttribute("data-habit-id"));

  addCheckedDay(habitId, day);
}

// renderers: vão mudar o DOM de acordo com alterações no estado dos hábitos do usuário

// alterna a visibilidade dos detalhes do hábito

function toggleHabitsDetails(habitElement) {
  const habitIconElement = habitElement.children[0];
  const habitDetailsElement = habitElement.children[1];

  if (
    habitDetailsElement.style.display === "none" ||
    habitDetailsElement.style.display === ""
  ) {
    habitDetailsElement.style.display = "flex";
    habitIconElement.classList.add("habit-icon-relative");
  } else if (habitDetailsElement.style.display === "flex") {
    habitDetailsElement.style.display = "none";
    habitIconElement.classList.remove("habit-icon-relative");
  }
}

// renderiza a lista de hábitos

function renderHabits() {
  const userHabits = getHabits();
  const habits = document.querySelector("#habits");

  habits.innerHTML = "";

  // passa por cada hábito salvo pelo usuário e adiciona os elementos HTML relativos a ele

  userHabits.forEach((habit) => {
    // verificação para evitar criar hábitos duplicados

    if (
      document.querySelectorAll(`span[data-habit-id="${habit.id}"]`).length ===
      0
    ) {
      // insere o código HTML do hábito dentro da lista de hábitos

      habits.insertAdjacentHTML(
        "beforeend",
        `
        <div
          class="habit"
          data-habit-id="${habit.id}"
        >
          <span
            onclick=toggleHabitsDetails(this.parentElement)
            class="habit-icon material-symbols-outlined"
          >
            ${habit.icon}
          </span>

          <div class="habit-details">
            <p>${habit.name}</p>
            <span
              class="material-symbols-outlined"
              onclick=removeHabitHandler(this)
            >
              delete
            </span>
          </div>
        </div>
        `
      );
    }
  });
}

// renderiza o calendário de hábitos

function renderCalendar() {
  const userHabits = getHabits();
  const calendar = document.querySelector("#calendar");

  calendar.innerHTML = "";

  const monthDays = getMonthDays(30); // retorna uma lista dos últimos 30 dias

  monthDays.forEach((day) => {
    // dispara caso o número de dias no calendário não for igual ao número de dias do mês atual

    if (calendar.children.length !== monthDays.length) {
      calendar.insertAdjacentHTML(
        "beforeend",
        `
        <div data-day=${day} class="day">
          <p>${day}</p>
        </div>
        `
      );
    }

    // passa por cada hábito salvo pelo usuário e retorna uma lista de checkboxes relativos a ele

    const checkboxes = userHabits.map((habit) => {
      // verificação para evitar criar checkboxes duplicados

      if (
        document.querySelectorAll(
          `#calendar div[data-day="${day}"] input[data-habit-id="${habit.id}"]`
        ).length === 0
      ) {
        const isChecked = habit.checkedDays.includes(day); // retorna um valor verdadeiro caso esse checkbox esteja marcado
        const isDisabled = day !== getFormattedToday(); // retorna um valor verdadeiro caso esse checkbox não corresponda ao dia atual

        return `
          <input
            data-habit-id="${habit.id}"
            onclick=addCheckedDayHandler(this,"${day}")
            type="checkbox"
            ${isChecked ? "checked" : ""}
            ${isDisabled ? "disabled" : ""}
          />
        `;
      }
    });

    // adiciona novos checkboxes ao dia atual

    const currentDay = document.querySelector(
      `#calendar div[data-day="${day}"]`
    );

    currentDay.insertAdjacentHTML("beforeend", `${checkboxes.join("")}`);
  });
}

// renderiza todo o layout do formulário de hábitos

function renderLayout() {
  const userHabits = getHabits();

  const todayElement = document.querySelector("#today span");
  const welcomeMessage = document.querySelector("#welcome-message");
  const habitsForm = document.querySelector("#habits-form");

  todayElement.innerText = getFormattedToday();

  // dispara se o usuário não tiver hábitos

  if (userHabits.length === 0) {
    welcomeMessage.style.display = "flex"; // mostra mensagem de boas-vindas
    habitsForm.style.display = "none"; // oculta o formulário de hábitos

    return;
  }

  welcomeMessage.style.display = "none"; // oculta mensagem de boas-vindas

  // renderiza a lista de hábitos e o calendário de hábitos

  renderHabits();
  renderCalendar();

  habitsForm.style.display = "flex"; // mostra o formulário de hábitos
}

// faz a primeira renderização do formulário de hábitos

renderLayout();
