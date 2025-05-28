import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Difficulty, HeaderProps } from "../../utils/types";

const drawerWidth = 240;

export default function DrawerAppBar({
  currentDifficulty,
  onDifficultyChange
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const difficultyLevels: Difficulty[] = [
    "easy",
    "medium",
    "hard",
    "very hard"
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {difficultyLevels.map((level) => (
          <ListItem key={level} disablePadding>
            <ListItemButton
              onClick={() => onDifficultyChange(level)}
              sx={{
                textAlign: "center",
                backgroundColor:
                  currentDifficulty === level
                    ? "rgba(0, 0, 0, 0.08)"
                    : "transparent"
              }}
            >
              <ListItemText primary={level} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Typography variant="h6" sx={{ my: 2 }}>
        Math Quiz
      </Typography>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            Math Quiz
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Math Quiz
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {difficultyLevels.map((level) => (
              <Button
                key={level}
                onClick={() => onDifficultyChange(level)}
                sx={{
                  color: "#fff",
                  p: 1,
                  m: 1,
                  backgroundColor:
                    currentDifficulty === level
                      ? "rgba(59, 50, 50, 0.2)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }
                }}
              >
                {level}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
