import {
  AppBar,
  Toolbar,
  Typography,
  ButtonGroup,
  Button
} from "@mui/material";
import { Difficulty, HeaderProps } from "../../utils/types";

const Header = ({ currentDifficulty, onDifficultyChange }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Math Quiz
        </Typography>
        <ButtonGroup variant="contained" color="secondary">
          {(["easy", "medium", "hard", "very hard"] as Difficulty[]).map(
            (level) => (
              <Button
                key={level}
                onClick={() => onDifficultyChange(level)}
                variant={currentDifficulty === level ? "contained" : "outlined"}
              >
                {level}
              </Button>
            )
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
