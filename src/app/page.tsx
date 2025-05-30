"use client";

import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import QuizQuestion from "../components/QuizQuestion";
import ResultDialog from "@/components/Dialog";
import { generateQuestion } from "../utils/questionGenerator";
import { Difficulty, Question, HighScores } from "../utils/types";

export default function Home() {
  // Quiz state
  const [isClient, setIsClient] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [question, setQuestion] = useState<Question>(() => ({
    question: "",
    options: [],
    correctAnswer: ""
  }));
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  // High scores
  const [highScores, setHighScores] = useState<HighScores>({
    easy: 0,
    medium: 0,
    hard: 0,
    "very hard": 0
  });

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const savedScores = localStorage.getItem("highScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
    setQuestion(generateQuestion("easy"));
  }, []);

  // Save high scores whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  }, [highScores, isClient]);

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setCurrentQuestion(0);
    setScore(0);
    setQuestion(generateQuestion(newDifficulty));
    setSelectedAnswer("");
    setShowResult(false);
  };

  // Handle answer submission
  const handleAnswerSubmit = () => {
    // Check if answer is correct
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Update score if correct
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      // Update high score if needed
      if (newScore > highScores[difficulty]) {
        setHighScores((prev) => ({
          ...prev,
          [difficulty]: newScore
        }));
      }
    }

    // Show result
    setShowResult(true);
  };

  // Handle next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setQuestion(generateQuestion(difficulty));
    setSelectedAnswer("");
    setShowResult(false);
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuestion(generateQuestion(difficulty));
    setSelectedAnswer("");
    setShowResult(false);
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        currentDifficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ width: "100%" }}>
          <QuizQuestion
            question={question}
            questionNumber={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            onSubmit={handleAnswerSubmit}
            onReset={resetQuiz}
            score={score}
            highScore={highScores[difficulty]}
          />
        </Box>
      </Container>

      <ResultDialog
        showResult={showResult}
        setShowResult={setShowResult}
        selectedAnswer={selectedAnswer}
        question={question}
        onNextQuestion={handleNextQuestion}
      />
    </Box>
  );
}
