// імпортуємо той файл, який будемо тестувати
const contactNamesHandler = require("../contactNamesHandler");

const testingData = [
  { input: "Jimi Hendrix", output: "Jimi Hendrix" },
  { input: "jimi hendrix", output: "Jimi Hendrix" },
  { input: "jimi Hendrix", output: "Jimi Hendrix" },
  { input: "   Jimi  hendriX ", output: "Jimi Hendrix" },
  { input: "Jimi_Hendrix", output: "Jimi Hendrix" },
  { input: "jimi.hendrix", output: "Jimi Hendrix" },
  { input: "jimi@hend@rix", output: "Jimi Hend Rix" },
  { input: "_jimi * hendrix", output: "Jimi Hendrix" },
  { input: "jimi hèndrix__", output: "Jimi Hendrix" },
  { input: "jimi中村hèndrix__", output: "Jimi Hendrix" },
  { input: "jimi de Hèndrix__", output: "Jimi De Hendrix" },
  { input: "中村哲二", output: "" },
  { input: undefined, output: "" },
  { input: null, output: "" },
  { input: true, output: "" },
];

describe("Contact names handler function tests", () => {
  // // можна писати так:
  // test("Test jimi hendrix", () => {
  //   expect(contactNamesHandler("jimi hendrix")).toBe("Jimi Hendrix");
  // });

  // а щоб не писати кожен тест окремо, можна прогнати цикл:
  test("Test passed names", () => {
    for (const item of testingData) {
      const normalizedName = contactNamesHandler(item.input);

      expect(normalizedName).toBe(item.output);
    }
  });
});

// // примітивний приклад, функція яку будемо тестити:
// const calc = (x, y) => x + y;
// // Test Suites (група тестів)
// // приймає два параметри, 1 - опис того, що ми тестимо; 2- приймає колбек, де будуть прописані всі кейси
// describe("Contact names handler function tests", () => {
//   // опис конкретного одного тесту, що він робить
//   test("Test calc sum 2+2", () => {
//     // що очікую, що функція має повернути
//     expect(calc(2, 2)).toBe(4);
//   });

//   test("Test calc sum 3+3", () => {
//     // що очікую, що функція має повернути
//     expect(calc(3, 3)).toBe(6);
//   });
// });
