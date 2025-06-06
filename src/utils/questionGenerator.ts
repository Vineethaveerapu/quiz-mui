import { Question, Difficulty } from "./types";

export const generateQuestion = (difficulty: Difficulty): Question => {
  let num1: number, num2: number;

  switch (difficulty) {
    case "easy":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    case "medium":
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      break;
    case "hard":
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;
      break;
    case "very hard":
      num1 = Math.floor(Math.random() * 200) + 1;
      num2 = Math.floor(Math.random() * 200) + 1;
      break;
  }

  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer: number;
  switch (operation) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    default:
      answer = 0;
  }

  const options = [
    answer.toString(),
    (answer + Math.floor(Math.random() * 10) + 1).toString(),
    (answer - Math.floor(Math.random() * 10) - 1).toString(),
    (answer + Math.floor(Math.random() * 20) + 10).toString()
  ].sort(() => Math.random() - 0.5);

  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    options,
    correctAnswer: answer.toString()
  };
};
