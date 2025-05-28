"use client";

import { useState, useEffect } from "react";
import { Box, Container, Snackbar, Alert } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import QuizQuestion from "../components/QuizQuestion";
import { generateQuestion } from "../utils/questionGenerator";
import { Difficulty, Question, QuizState, HighScores } from "../utils/types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#f50057"
    }
  }
});

const getInitialState = (): QuizState => ({
  currentQuestion: 0,
  score: 0,
  answers: [],
  difficulty: "easy"
});

const getInitialHighScores = (): HighScores => ({
  easy: 0,
  medium: 0,
  hard: 0,
  "very hard": 0
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>(getInitialState);
  const [question, setQuestion] = useState<Question>(() =>
    generateQuestion(quizState.difficulty)
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [highScores, setHighScores] =
    useState<HighScores>(getInitialHighScores);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      setQuizState(JSON.parse(savedState));
    }

    const savedScores = localStorage.getItem("highScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("quizState", JSON.stringify(quizState));
    }
  }, [quizState, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  }, [highScores, isClient]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setQuizState((prev) => ({
      ...prev,
      difficulty,
      currentQuestion: 0,
      score: 0,
      answers: []
    }));
    setQuestion(generateQuestion(difficulty));
    setSelectedAnswer("");
    setShowResult(false);
  };

  const handleAnswerSubmit = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    setQuizState((prev) => ({
      ...prev,
      score: newScore,
      answers: [...prev.answers, selectedAnswer],
      currentQuestion: prev.currentQuestion + 1
    }));

    if (newScore > highScores[quizState.difficulty]) {
      setHighScores((prev) => ({
        ...prev,
        [quizState.difficulty]: newScore
      }));
    }

    setShowResult(true);
    setTimeout(() => {
      setQuestion(generateQuestion(quizState.difficulty));
      setSelectedAnswer("");
      setShowResult(false);
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      difficulty: quizState.difficulty
    });
    setQuestion(generateQuestion(quizState.difficulty));
    setSelectedAnswer("");
    setShowResult(false);
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Header
          currentDifficulty={quizState.difficulty}
          onDifficultyChange={handleDifficultyChange}
        />

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box sx={{ width: "100%" }}>
            <QuizQuestion
              question={question}
              questionNumber={quizState.currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              onSubmit={handleAnswerSubmit}
              onReset={resetQuiz}
              score={quizState.score}
              highScore={highScores[quizState.difficulty]}
            />
          </Box>
        </Container>

        <Snackbar
          open={showResult}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={
              selectedAnswer === question.correctAnswer ? "success" : "error"
            }
          >
            {selectedAnswer === question.correctAnswer
              ? "Correct!"
              : "Incorrect!"}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
