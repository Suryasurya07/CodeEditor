import React from "react";
import { Button } from "@mui/material";

const Header = ({ toggleTheme, theme, handleRunCode }) => {
  return (
    <header className="relative flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
     
      <h1
        className="text-2xl font-bold text-gray-800 dark:text-white"
        style={{
          fontFamily: "'Roboto', sans-serif", 
        }}
      >
        Code Editor
      </h1>

      
      <Button
        variant="contained"
        color={theme === "dark" ? "secondary" : "primary"}
        onClick={toggleTheme}
        sx={{
          position: "absolute", 
          top: "1rem", 
          right: "1rem", 
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>

      
      <Button
        variant="contained"
        color="primary"
        onClick={handleRunCode}
        sx={{
          position: "absolute",
          top: "1rem", 
          right: "10rem", 
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Run Code
      </Button>
    </header>
  );
};

export default Header;
