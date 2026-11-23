"use client";

import Link from "next/link";
import Button from "@mui/material/Button";

export default function PixelButton({
  href,
  children,
  variant = "contained",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "contained" | "outlined";
}) {
  return (
    <Button
      component={Link}
      href={href}
      variant={variant}
      disableElevation
      sx={{
        fontSize: 11,
        px: 2.5,
        height: 44,
        borderRadius: 0,
        border: "4px solid #000",
        boxShadow: "6px 6px 0 #000",
        letterSpacing: 1,
        ...(variant === "outlined" && {
          color: "inherit",
          backgroundColor: "rgba(0,0,0,0.25)",
        }),
        "&:hover": { border: "4px solid #000" },
        "&:active": { transform: "translate(2px, 2px)", boxShadow: "4px 4px 0 #000" },
      }}
    >
      {children}
    </Button>
  );
}
