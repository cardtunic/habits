// ativa se chave "userHabits" ainda não foi definida e define um valor inicial de "[]" para ela

if (localStorage.getItem("userHabits") === null) {
  localStorage.setItem("userHabits", "[]");
}

// função que retorna os hábitos criados pelo usuário, salvos no armazenamento local do navegador

function getHabits() {
  const userHabits = JSON.parse(localStorage.getItem("userHabits"));
  return userHabits;
}

// função que adiciona um novo hábito ao array de hábitos criados pelo usuário

function addHabit(habit) {
  const userHabits = getHabits();

  // dispara se o usuário tentar criar um hábito com o nome igual à outro já existente

  if (
    userHabits.find((userHabit) => userHabit.name === habit.name) !== undefined
  ) {
    throw new Error("❌ Você já criou um hábito com esse nome!");
  }

  // adiciona o objeto de um hábito ao array de hábitos criados pelo usuário

  userHabits.push({
    id: userHabits.length + 1,
    icon: habit.icon,
    name: habit.name,
    checkedDays: [],
  });

  // atualiza os dados dentro do armazenamento local do navegador

  localStorage.setItem("userHabits", JSON.stringify(userHabits));
}

// função que adiciona um novo dia em que um hábito foi feito

function addCheckedDay(habitId, day) {
  const userHabits = getHabits();

  // adiciona a data aos dias marcados

  userHabits[habitId - 1].checkedDays.push(day);

  // atualiza os dados dentro do armazenamento local do navegador

  localStorage.setItem("userHabits", JSON.stringify(userHabits)); // at
}
