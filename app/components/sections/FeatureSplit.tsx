import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function FeatureSplit() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 4, md: 6 },
        alignItems: "center",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: 16, letterSpacing: 1.5, mb: 3 }}
        >
          Designed for precision
        </Typography>

        <Typography sx={{ fontSize: 11, lineHeight: 1.9, opacity: 0.78 }}>
          We prioritize clean geometry, consistent wall thickness, and practical
          design details. Whether it’s a display piece or a functional component,
          the goal is simple: make it look right and fit right.
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: "rgba(0,0,0,0.16)",
          borderColor: "rgba(255,255,255,0.10)",
        }}
      >
        <Box
          sx={{
            aspectRatio: "16/10",
            display: "grid",
            placeItems: "center",
            opacity: 0.7,
            fontSize: 12,
          }}
        >
          PLACEHOLDER PHOTO
        </Box>
      </Paper>
    </Box>
  );
}
