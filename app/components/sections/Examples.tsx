"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";

import { PRINTS } from "@/app/lib/prints";

export default function Examples() {
  return (
    <Box>
      <Typography variant="h2" sx={{ fontSize: 16, letterSpacing: 1.5, mb: 4 }}>
        Example prints
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {PRINTS.map((item) => (
          <Paper
            key={item.id}
            variant="outlined"
            component={Link}
            href={`/prints/${item.id}`}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "rgba(0,0,0,0.16)",
              borderColor: "rgba(255,255,255,0.10)",
              display: "block",

              // subtle hover lift (minimal)
              transition: "transform 160ms ease, border-color 160ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: "rgba(255,255,255,0.18)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                backgroundColor: "rgba(0,0,0,0.25)",
              }}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              ) : null}

              {/* Hover caption overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  p: 2.25,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.0) 60%)",
                  opacity: 0,
                  transition: "opacity 160ms ease",

                  // show on hover/focus (keyboard-friendly)
                  ".MuiPaper-root:hover &": { opacity: 1 },
                  ".MuiPaper-root:focus-visible &": { opacity: 1 },
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 12, opacity: 0.95, mb: 0.5 }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ fontSize: 10, opacity: 0.8, lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Base caption (always visible, minimal) */}
            <Box sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: 11, opacity: 0.85 }}>
                {item.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
