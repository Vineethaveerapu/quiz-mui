import {
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button
} from "@mui/material";
import { QuizQuestionProps } from "../../utils/types";

const QuizQuestion = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  onReset,
  score,
  highScore
}: QuizQuestionProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Question {questionNumber + 1}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {question.question}
      </Typography>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Select your answer:</FormLabel>
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => onAnswerSelect(e.target.value)}
        >
          {question.options.map((option: string, index: number) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!selectedAnswer}
          sx={{ mr: 2 }}
        >
          Submit Answer
        </Button>
        <Button variant="outlined" color="secondary" onClick={onReset}>
          Reset Quiz
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="subtitle1">High Score: {highScore}</Typography>
      </Box>
    </Paper>
  );
};

export default QuizQuestion;
