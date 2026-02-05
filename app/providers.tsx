"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4cc9f0" },
    secondary: { main: "#f72585" },
    background: {
      default: "#2b1b3f",
      paper: "rgba(0,0,0,0.25)",
    },
    text: { primary: "#f4f4f4" },
  },
  typography: {
    fontFamily: `var(--font-pixel), "Press Start 2P", monospace`,
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
