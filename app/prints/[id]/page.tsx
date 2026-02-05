"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { PRINTS } from "@/app/lib/prints";

export default function PrintDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id;
  const item = React.useMemo(() => PRINTS.find((p) => p.id === id), [id]);

  // If params isn't ready yet (rare, but safe)
  if (!id) {
    return (
      <Box component="main" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Typography sx={{ fontSize: 12, opacity: 0.75 }}>Loading…</Typography>
        </Container>
      </Box>
    );
  }

  // If no such print exists -> show a simple "not found" UI
  if (!item) {
    return (
      <Box component="main" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Typography sx={{ fontSize: 18, letterSpacing: 1.5, mb: 2 }}>
            Not found
          </Typography>
          <Typography sx={{ fontSize: 11, opacity: 0.75, mb: 4 }}>
            No print with id: <code>{id}</code>
          </Typography>

          <Button
            color="inherit"
            sx={{ fontSize: 12, opacity: 0.85 }}
            onClick={() => router.push("/")}
          >
            ← Back home
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ py: { xs: 8, md: 5} }}>
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/"
          color="inherit"
          sx={{ fontSize: 12, opacity: 0.8, mb: 3 }}
        >
          ← Back
        </Button>

        <Typography sx={{ fontSize: 20, letterSpacing: 1.5, mb: 2 }}>
          {item.title}
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.16)",
            borderColor: "rgba(255,255,255,0.10)",
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
            {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt ?? item.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  opacity: 0.7,
                }}
              >
                No image yet
              </Box>
            )}
          </Box>
        </Paper>

        <Typography sx={{ fontSize: 11, lineHeight: 1.9, opacity: 0.9, mb: 4 }}>
          {item.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {item.tags.map((t) => (
            <Box
              key={t}
              sx={{
                fontSize: 10,
                opacity: 0.75,
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                px: 1,
                py: 0.5,
              }}
            >
              {t}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
