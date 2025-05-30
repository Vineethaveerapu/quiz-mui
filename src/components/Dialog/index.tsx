import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ResultDialogProps } from "@/utils/types";

const ResultDialog = ({
  showResult,
  setShowResult,
  selectedAnswer,
  question,
  onNextQuestion
}: ResultDialogProps) => {
  const handleNext = () => {
    setShowResult(false);
    onNextQuestion();
  };

  return (
    <Dialog
      open={showResult}
      onClose={() => setShowResult(false)}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor:
            selectedAnswer === question.correctAnswer ? "#e8f5e9" : "#ffebee",
          borderRadius: 2,
          padding: 2
        }
      }}
    >
      <DialogContent sx={{ textAlign: "center" }}>
        {selectedAnswer === question.correctAnswer ? (
          <>
            <CheckCircleIcon sx={{ color: "success.main", fontSize: 60 }} />
            <Typography variant="h6" sx={{ mt: 2, color: "success.main" }}>
              Correct! Well done!
            </Typography>
          </>
        ) : (
          <>
            <CancelIcon sx={{ color: "error.main", fontSize: 60 }} />
            <Typography variant="h6" sx={{ mt: 2, color: "error.main" }}>
              Incorrect!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              The correct answer was: {question.correctAnswer}
            </Typography>
          </>
        )}
        <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
          Next Question
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
