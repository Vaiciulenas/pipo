import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Hero from "./sections/Hero";
import WhatWeDo from "./sections/WhatWeDo";
import Examples from "./sections/Examples";
import FeatureSplit from "./sections/FeatureSplit";

export default function HomePage() {
  return (
    <Box component="main" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Hero />
      </Container>

      <Box sx={{ height: { xs: 72, md: 120 } }} />

      <Container maxWidth="md">
        <WhatWeDo />
      </Container>

      <Box sx={{ height: { xs: 72, md: 120 } }} />

      <Container maxWidth="lg">
        <Examples />
      </Container>

      <Box sx={{ height: { xs: 72, md: 120 } }} />

      <Container maxWidth="lg">
        <FeatureSplit />
      </Container>
    </Box>
  );
}
