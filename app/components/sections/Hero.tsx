import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Hero() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 28, sm: 36, md: 48 },
          letterSpacing: 2,
          lineHeight: 1.2,
          mb: 3,
        }}
      >
        PIPO 3D printing
      </Typography>

      <Typography
        sx={{
          maxWidth: 520,
          mx: "auto",
          fontSize: 12,
          lineHeight: 1.9,
          opacity: 0.8,
          mb: 6,
        }}
      >
        From idea to reality. We create functional prototypes and small-batch parts
        with clean geometry, tight tolerances, and a focus on detail.
      </Typography>

      {/* Replace this with your photo later */}
      <Paper
        variant="outlined"
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 820,
          aspectRatio: "16/9",
          borderRadius: 3,
          overflow: "hidden",
          background: "rgba(0,0,0,0.18)",
          borderColor: "rgba(255,255,255,0.10)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            opacity: 0.7,
            fontSize: 12,
          }}
        >
          PLACEHOLDER IMAGE 
        </Box>
      </Paper>
    </Box>
  );
}
