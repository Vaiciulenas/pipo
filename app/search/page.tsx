import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "next/link";

import { PRINTS } from "../lib/prints";
import { searchPrints } from "../lib/search";

export const metadata = { title: "Search | PIPO 3D printing" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = ((await searchParams).q ?? "").trim();
  const results = searchPrints(PRINTS, q);

  return (
    <Box component="main" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 16, letterSpacing: 1.5, mb: 2 }}>
          Search
        </Typography>

        <Typography sx={{ fontSize: 11, opacity: 0.75, mb: 5 }}>
          {q ? `Results for “${q}”` : "Type something in the search bar."}
        </Typography>

        {q && results.length === 0 ? (
          <Typography sx={{ fontSize: 11, opacity: 0.75 }}>
            No results found.
          </Typography>
        ) : null}

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
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/prints/${item.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  background: "rgba(0,0,0,0.16)",
                  borderColor: "rgba(255,255,255,0.10)",
                  transition: "border-color 160ms ease",
                  "&:hover": { borderColor: "rgba(255,255,255,0.25)" },
                }}
              >
                <Typography sx={{ fontSize: 12, mb: 1.5 }}>
                  {item.title}
                </Typography>

                <Typography sx={{ fontSize: 11, lineHeight: 1.8, opacity: 0.75 }}>
                  {item.description}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {item.tags.map((t) => (
                    <Box
                      key={t}
                      sx={{
                        fontSize: 10,
                        opacity: 0.7,
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: 999,
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      {t}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
