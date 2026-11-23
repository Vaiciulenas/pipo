import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import WhatWeDo from "../components/sections/WhatWeDo";
import PixelButton from "../components/PixelButton";

export const metadata = { title: "Services | PIPO 3D printing" };

const steps = [
  { n: "01", title: "Send your idea", body: "A sketch, a photo, measurements or a ready 3D model." },
  { n: "02", title: "Get a quote", body: "We check the design and suggest a material and finish." },
  { n: "03", title: "Print & finish", body: "Your part is printed, cleaned up and ready to use." },
];

export default function ServicesPage() {
  return (
    <Box component="main" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 22, md: 32 }, letterSpacing: 2, mb: 3 }}
        >
          Services
        </Typography>
        <Typography sx={{ fontSize: 12, lineHeight: 1.9, opacity: 0.8, mb: { xs: 8, md: 10 } }}>
          Computer accessories, car accessories and home decorations, printed to order.
        </Typography>

        <WhatWeDo />

        <Typography
          variant="h2"
          sx={{ fontSize: 16, letterSpacing: 1.5, mt: { xs: 9, md: 12 }, mb: 4 }}
        >
          How it works
        </Typography>

        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
          {steps.map((s) => (
            <Box key={s.n}>
              <Typography sx={{ fontSize: 20, color: "primary.main", mb: 2 }}>{s.n}</Typography>
              <Typography sx={{ fontSize: 12, mb: 1.5 }}>{s.title}</Typography>
              <Typography sx={{ fontSize: 11, lineHeight: 1.8, opacity: 0.75 }}>{s.body}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 9, md: 12 }, textAlign: "center" }}>
          <PixelButton href="/contact">Get a quote</PixelButton>
        </Box>
      </Container>
    </Box>
  );
}
