// função que retorna o dia atual no formatdo dd/mm

function getFormattedToday() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, 5);

  return today;
}

// função que retorna uma lista de dias anteriores à data de atual

function getMonthDays(numberOfDays) {
  const today = new Date();
  const previousDays = [];

  for (let i = 0; i < numberOfDays; i++) {
    let day = today.getDate() - i; // retorna o dia atual e subtrai do valor de i, que é incremetado a cada loop
    let month = today.getMonth() + 1; // retorna o mês atual
    let year = today.getFullYear(); // retorna o dia atual

    // dispara se o valor de day é menor que 1,
    // ou seja, o dia corresponde à um mês anterior

    if (day < 1) {
      let numberOfDaysInMonth = 0;

      // dispara se o valor dos mês passado é igual a 1 (janeiro).

      if (month === 1) {
        month = 12; // muda o valor para 12 (dezembro)
        numberOfDaysInMonth = new Date(year - 1, month, 0).getDate(); // retorna o número de dias do mês 12, do ano anterior

        // dispara se não for o mês 1 (janeiro).
      } else {
        month -= 1; // muda o valor para um mês anterior
        numberOfDaysInMonth = new Date(year, month, 0).getDate(); // retorna o número de dias do mês anterior, do ano atual
      }

      day = numberOfDaysInMonth - i + 1; // muda o valor do dia, para um dia anterior do mês anterior
    }

    // formata os valores para obedecerem o padrão dd/mm

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    previousDays.push(`${day}/${month}`); // adiciona a data formatada no array de dias prévios
  }

  return previousDays;
}
