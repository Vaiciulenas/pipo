import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import PixelButton from "../PixelButton";

export default function Hero() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: { xs: 160, md: 220 },
          aspectRatio: "1 / 1",
          mx: "auto",
          mb: 4,
          border: "4px solid #000",
          boxShadow: "8px 8px 0 #000",
          overflow: "hidden",
        }}
      >
        <Image
          src="/assets/pipo.png"
          alt="Pixel-art 3D printer printing a cube"
          fill
          priority
          sizes="220px"
          style={{ objectFit: "cover", imageRendering: "pixelated" }}
        />
      </Box>

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
          mb: 5,
        }}
      >
        From idea to reality. We create functional prototypes and small-batch parts
        with clean geometry, tight tolerances, and a focus on detail.
      </Typography>

      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
        <PixelButton href="/#prints">Browse prints</PixelButton>
        <PixelButton href="/contact" variant="outlined">
          Get a quote
        </PixelButton>
      </Box>
    </Box>
  );
}
