// ativa se chave "userHabits" ainda não foi definida
// e define um valor inicial de "[]" para ela

if (localStorage.getItem("userHabits") === null) {
  localStorage.setItem("userHabits", "[]");
}

// pega o tempo atual, e formata para dd/mm

const today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;

if (day < 10) day = "0" + day;
if (month < 10) month = "0" + month;

const formattedToday = `${day}/${month}`;

// retorna uma lista dos últimos 8 dias em formato dd/mm

function getDays(numberOfDays) {
  const previousDays = [];
  const year = today.getFullYear();

  for (let i = 0; i < numberOfDays; i++) {
    let previousDay = Number(day) - i;
    // pega o dia atual e subtrai do valor de i, que é incremetado a cada loop

    let previousMonth = Number(month);

    // dispara se o valor de previousDay é menor que 1,
    // ou seja, o dia corresponde à um mês anterior

    if (previousDay < 1) {
      let numberOfDaysInMonth = 0;

      // dispara se o valor dos mês passado é igual a 1 (janeiro).

      if (previousMonth === 1) {
        // muda o valor para 12 (dezembro)
        previousMonth = 12;

        // retorna o valor de dias do mês 12, do ano anterior
        numberOfDaysInMonth = new Date(year - 1, previousMonth, 0).getDate();

        // dispara se não for o mês 1 (janeiro).

      } else {
        // muda o valor para um mês antes
        previousMonth -= 1;

        // retorna o valor de dias do mês anterior, do ano atual
        numberOfDaysInMonth = new Date(year, previousMonth, 0).getDate();
      }

      // muda o valor para o dia anterior do mês anterior

      previousDay = numberOfDaysInMonth - i + 1;
    }

    // formata os valores para obedecerem o padrão dd/mm

    if (previousDay < 10) previousDay = "0" + previousDay;
    if (previousMonth < 10) previousMonth = "0" + previousMonth;

    previousDays.push(`${previousDay}/${previousMonth}`);
  }

  return previousDays;
}

// renderiza o layout no seu estado inicial

renderLayout();

// adiciona um novo hábito ao hábitos do usuário no localStorage
// e logo depois renderiza as alterações

function addNewHabit(habit) {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));

  if (userHabits.find(userHabit => userHabit.name === habit.name) !== undefined) {
    throw new Error("❌ Você já criou um hábito com esse nome!")
  }

  userHabits.push({
    id: userHabits.length + 1,
    icon: habit.icon,
    name: habit.name,
    checkedDays: [],
  });

  localStorage.setItem("userHabits", JSON.stringify(userHabits));
  renderLayout();
}


function removeHabit(habitId) {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));

  localStorage.setItem("userHabits", JSON.stringify(userHabits.splice(habitId - 1, 1)));
  renderLayout();
}

// adiciona um novo dia em que um hábito foi feito
// e logo depois renderiza as alterações

function addNewCheckDay(habitId, day) {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));

  userHabits[habitId - 1].checkedDays.push(day);
  localStorage.setItem("userHabits", JSON.stringify(userHabits));

  renderLayout();
}


function seeHabitsDetails(habitElement) {
  const currentDetailsDisplay = habitElement.children[0].style.display

  if (currentDetailsDisplay === "none" || currentDetailsDisplay === "") {
    habitElement.children[0].style.display = "flex"
    habitElement.classList.add("no-hover")
  }
  if (currentDetailsDisplay === "flex") {
    habitElement.children[0].style.display = "none"
    habitElement.classList.remove("no-hover")
  }
}

// renderiza os elementos HTML dos ícones do hábitos

function renderHabits() {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));
  const habits = document.querySelector("#habits");

  // passa por cada hábito salvo pelo usuário e cria um elemento relativo a ele

  userHabits.forEach((habit) => {
    if (
      document.querySelectorAll(`span[data-habit-id="${habit.id}"]`).length ===
      0
    ) {
      // verificação para evitar elementos duplicados

      habits.insertAdjacentHTML(
        "beforeend",
        `<span data-habit-id="${habit.id}" onclick=seeHabitsDetails(this) class="material-symbols-outlined">
        ${habit.icon}
        <div class="habit-info">
          <p>${habit.name}</p>
        </div>
        </span>`
      );
    }
  });
}
// renderiza os elementos HTML dos dias

function renderDays() {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));
  const daysElement = document.querySelector("#days");

  // ativa se nenhum elemento day foi criado

  const days = getDays(30);

  days.forEach((day) => {
    if (daysElement.children.length !== days.length) {
      daysElement.insertAdjacentHTML(
        "beforeend",
        `
        <div data-day=${day} class="day">
          <p>${day}</p>
        </div>
        `
      );
    }

    const checkboxes = userHabits.map((habit) => {
      if (
        document.querySelectorAll(
          `#days div[data-day="${day}"] input[data-habit-id="${habit.id}"]`
        ).length === 0
      ) {
        // verificação para evitar elementos duplicados

        const isChecked = habit.checkedDays.includes(day);
        const isDisabled = day !== formattedToday;

        return `<input data-habit-id="${habit.id
          }" onclick=addNewCheckDay(this.getAttribute("data-habit-id"),"${day}") type="checkbox" ${isChecked ? "checked" : ""
          } ${isDisabled ? "disabled" : ""} />`;
      }
    });

    const currentDay = document.querySelector(`#days div[data-day="${day}"]`);

    currentDay.insertAdjacentHTML("beforeend", `${checkboxes.join("")}`);
  });
}

function renderLayout() {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));
  const todayElement = document.querySelector("#today span");
  const welcomeMessage = document.querySelector("#welcome-message")
  const habitsForm = document.querySelector("#habits-form")

  todayElement.innerText = formattedToday;

  if (userHabits.length > 0) {
    welcomeMessage.style.display = "none";

    renderHabits();
    renderDays();

    habitsForm.style.display = "flex";
  }
}
