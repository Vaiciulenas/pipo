import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const items = [
  { title: "Custom printing", body: "From one-off parts to small batches." },
  { title: "Prototyping", body: "Iterate quickly with reliable dimensions." },
  { title: "Finishing", body: "Clean surfaces, tuned for the use-case." },
];

export default function WhatWeDo() {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ fontSize: 16, letterSpacing: 1.5, mb: 4 }}
      >
        What we do
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {items.map((it) => (
          <Paper
            key={it.title}
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(0,0,0,0.16)",
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            <Typography sx={{ fontSize: 12, mb: 1.5 }}>
              {it.title}
            </Typography>
            <Typography sx={{ fontSize: 11, lineHeight: 1.8, opacity: 0.75 }}>
              {it.body}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
