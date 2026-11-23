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
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { PRINTS, type PrintItem } from "@/app/lib/prints";

function Thumb({
  src,
  alt,
  selected,
  onClick,
}: {
  src: string;
  alt: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        border: selected
          ? "2px solid rgba(255,255,255,0.55)"
          : "1px solid rgba(255,255,255,0.14)",
        opacity: selected ? 1 : 0.8,
        transition: "opacity 140ms ease, border-color 140ms ease",
        "&:hover": { opacity: 1, borderColor: "rgba(255,255,255,0.35)" },
        backgroundColor: "rgba(255,255,255,0.04)",
        flex: "0 0 auto",
      }}
      aria-label={selected ? "Selected image" : "Select image"}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        style={{ objectFit: "cover" }}
        quality={90}
      />
    </Box>
  );
}

export default function PrintDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id;
  const item = React.useMemo(() => PRINTS.find((p) => p.id === id), [id]);

  if (!id) {
    return (
      <Box component="main" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Typography sx={{ fontSize: 12, opacity: 0.75 }}>Loading…</Typography>
        </Container>
      </Box>
    );
  }

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

  return <PrintDetail item={item} />;
}

// Separate component so its hooks never run after an early return
function PrintDetail({ item }: { item: PrintItem }) {
  const images: string[] =
    item.images?.length ? item.images : item.image ? [item.image] : [];

  const hasMany = images.length > 1;
  const alt = item.imageAlt ?? item.title;

  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (active > images.length - 1) setActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const openLightbox = () => {
    if (!images.length) return;
    setOpen(true);
  };
  const closeLightbox = () => setOpen(false);

  const prev = React.useCallback(() => {
    if (!hasMany) return;
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [hasMany, images.length]);

  const next = React.useCallback(() => {
    if (!hasMany) return;
    setActive((i) => (i + 1) % images.length);
  }, [hasMany, images.length]);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (!hasMany) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hasMany, prev, next]);

  const touchStartX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!hasMany) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!hasMany) return;
    if (touchStartX.current == null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else next();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="main" sx={{ py: { xs: 8, md: 5 } }}>
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
            {images.length ? (
              <Box
                role="button"
                tabIndex={0}
                onClick={openLightbox}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox();
                }}
                sx={{ position: "absolute", inset: 0, cursor: "zoom-in" }}
              >
                <Image
                  src={images[active]}
                  alt={alt}
                  fill
                  quality={100}
                  priority
                  sizes="(max-width: 900px) 100vw, 900px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
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

          {images.length > 1 && (
            <Box
              sx={{
                p: 2,
                pt: 1.5,
                display: "flex",
                gap: 1,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {images.map((src, i) => (
                <Thumb
                  key={src}
                  src={src}
                  alt={alt}
                  selected={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </Box>
          )}
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

        <Dialog
          open={open}
          onClose={closeLightbox}
          fullScreen={fullScreen}
          maxWidth="lg"
          PaperProps={{
            sx: {
              backgroundColor: "rgba(0,0,0,0.92)",
              borderRadius: fullScreen ? 0 : 3,
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: fullScreen ? "100vw" : "min(92vw, 1100px)",
              height: fullScreen ? "100vh" : "min(80vh, 780px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton
              onClick={closeLightbox}
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 3,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>

            {hasMany && (
              <>
                <IconButton
                  onClick={prev}
                  aria-label="Previous image"
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.35)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton
                  onClick={next}
                  aria-label="Next image"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.35)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}

            <Box
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              sx={{
                position: "relative",
                flex: 1,
                minHeight: 0,
              }}
            >
              {images.length ? (
                <Image
                  key={images[active]}
                  src={images[active]}
                  alt={alt}
                  fill
                  quality={100}
                  priority
                  sizes="1100px"
                  style={{ objectFit: "contain" }}
                />
              ) : null}
            </Box>

            {images.length > 1 && (
              <Box
                sx={{
                  flex: "0 0 auto",
                  p: 2,
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                  backgroundColor: "rgba(0,0,0,0.35)",
                }}
              >
                {images.map((src, i) => (
                  <Thumb
                    key={src}
                    src={src}
                    alt={alt}
                    selected={i === active}
                    onClick={() => setActive(i)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}
