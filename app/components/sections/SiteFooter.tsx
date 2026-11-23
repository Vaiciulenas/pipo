"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mb: 2.5 }}>
        {links.map((l) => (
          <Typography
            key={l.href}
            component={Link}
            href={l.href}
            sx={{
              fontSize: 10,
              color: "inherit",
              textDecoration: "none",
              opacity: 0.7,
              "&:hover": { opacity: 1 },
            }}
          >
            {l.label}
          </Typography>
        ))}
      </Box>
      <Typography sx={{ fontSize: 10, opacity: 0.5 }}>
        © {year} PIPO 3D printing
      </Typography>
    </Box>
  );
}
