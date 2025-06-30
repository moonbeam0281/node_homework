import students from './students.js';

// 1. Скопје + име завршува на "а" + просек > 7 + сортирање по име
function task1() {
  return new Promise(res => {
    const result = students
      .filter(s => s.grad === "Skopje" && s.ime.endsWith("a") && s.prosek > 7)
      .sort((a, b) => a.ime.localeCompare(b.ime));
    res(result);
  });
}

// 2. Просек > 9 и не се од Скопје + сортирање опаѓачки по просек
function task2() {
  return new Promise(res => {
    const result = students
      .filter(s => s.prosek > 9 && s.grad !== "Skopje")
      .sort((a, b) => b.prosek - a.prosek);
    res(result);
  });
}

// 3. Првите 3 студенти со име од 5 букви, подредени по просек
function task3() {
  return new Promise(res => {
    const result = students
      .filter(s => s.ime.length === 5)
      .sort((a, b) => a.prosek - b.prosek)
      .slice(0, 3);
    res(result);
  });
}

// 4. Градови по групна висина на просек (sort descending)
function task4() {
  return new Promise(res => {
    const gradovi = {};

    students.forEach(s => {
      if (!gradovi[s.grad]) {
        gradovi[s.grad] = { total: 0, count: 0 };
      }
      gradovi[s.grad].total += s.prosek;
      gradovi[s.grad].count++;
    });

    const result = Object.entries(gradovi)
      .map(([grad, data]) => ({
        grad,
        prosek: (data.total / data.count).toFixed(2)
      }))
      .sort((a, b) => b.prosek - a.prosek);

    res(result);
  });
}

// 5. Вкупен просек: име завршува на "а" VS сите останати
function task5() {
  return new Promise(res => {
    let aTotal = 0, aCount = 0, oTotal = 0, oCount = 0;

    students.forEach(s => {
      if (s.ime.endsWith("a")) {
        aTotal += s.prosek;
        aCount++;
      } else {
        oTotal += s.prosek;
        oCount++;
      }
    });

    res({
      "Имиња што завршуваат на 'а'": (aTotal / aCount).toFixed(2),
      "Останати": (oTotal / oCount).toFixed(2)
    });
  });
}

export {
  task1,
  task2,
  task3,
  task4,
  task5
};