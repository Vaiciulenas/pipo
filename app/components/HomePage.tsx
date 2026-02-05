import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Hero from "./sections/Hero";
import WhatWeDo from "./sections/WhatWeDo";
import Examples from "./sections/Examples";
import FeatureSplit from "./sections/FeatureSplit";
import SiteFooter from "./sections/SiteFooter";

export default function HomePage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
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

      <Box sx={{ height: { xs: 72, md: 120 } }} />

      <Container maxWidth="md">
        <SiteFooter />
      </Container>
    </Box>
  );
}
