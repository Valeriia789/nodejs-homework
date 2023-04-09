// приймає ім'я контакта і перевіряє, чи то стрінг (якщо не стрінг, поверне пусту строку)
module.exports = (name) => {
  if (typeof name !== "string") return "";

  const handledArray = name
    .normalize("NFD")
    // букви з символами у крапками зверху замінюються звичайними латинськими буквами
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    // всі невідомі (не латинські) літери просто зітруться
    .replace(/[^a-z]/g, " ")
    // все це розділяється і перетворюється в масив
    .split(" ");

  const resultArray = [];

  for (const item of handledArray) {
    // проходимось по масиву, видаляються зайві пробіли, перша літера кожного слова робиться UpperCase
    if (item) resultArray.push(item.charAt(0).toUpperCase() + item.slice(1));
  }

  return resultArray.join(" ");
};
