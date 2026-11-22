"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";

import SearchIcon from "@mui/icons-material/Search";

import { PRINTS } from "../lib/prints";
import { searchPrints } from "../lib/search";

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({ threshold: 24 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  fullWidth?: boolean;
};

function SearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  onKeyDown,
  fullWidth = false,
}: SearchBarProps) {
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1.25,
        height: 38,
        width: fullWidth ? "100%" : "min(560px, 46vw)",
        borderRadius: 999,
        backgroundColor: "rgba(0,0,0,0.28)",
        borderColor: "rgba(255,255,255,0.14)",
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder="Search prints…"
        inputProps={{ "aria-label": "search prints" }}
        sx={{
          flex: 1,
          pl: 1.25,
          fontSize: 12,
          opacity: 0.9,
          "& input::placeholder": { opacity: 0.6 },
        }}
      />
      <IconButton type="submit" aria-label="submit search" size="small">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:600px)");

  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(-1);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const anchorRef = React.useRef<HTMLDivElement | null>(null);

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const suggestions = React.useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return searchPrints(PRINTS, q).slice(0, 6);
  }, [query]);

  function goToSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    setMobileOpen(false);
    setHighlighted(-1);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function goToPrint(id: string) {
    if (!id) return;
    setOpen(false);
    setMobileOpen(false);
    setHighlighted(-1);
    setQuery("");
    router.push(`/prints/${id}`);
  }

  function handleSubmit() {
    goToSearch(query);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && suggestions.length > 0 && e.key.length === 1) setOpen(true);

    if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
      return;
    }

    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => (i - 1 + suggestions.length) % suggestions.length);
      return;
    }

    // Enter on a highlighted suggestion opens that print directly
    if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      goToPrint(suggestions[highlighted].id);
    }
  }

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0,0,0,0.45)"
              : "0 8px 24px rgba(0,0,0,0.30)",
          }}
        >
          <Toolbar
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ justifySelf: "start" }}>
              <Typography
                component={Link}
                href="/"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  letterSpacing: 2,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                }}
              >
                PIPO
              </Typography>
            </Box>

            <Box
              ref={anchorRef}
              sx={{ display: { xs: "none", sm: "block" }, justifySelf: "center" }}
            >
              <ClickAwayListener
                onClickAway={() => {
                  setOpen(false);
                  setHighlighted(-1);
                }}
              >
                <Box>
                  <SearchBar
                    value={query}
                    onChange={(v) => {
                      setQuery(v);
                      setOpen(Boolean(v.trim()));
                      setHighlighted(-1);
                    }}
                    onSubmit={handleSubmit}
                    onFocus={() => {
                      if (query.trim()) setOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                  />

                  <Popper
                    open={open && suggestions.length > 0}
                    anchorEl={anchorRef.current}
                    placement="bottom"
                    modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
                    style={{ zIndex: 1300 }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        width: "min(560px, 46vw)",
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundColor: "rgb(20, 12, 30)",
                        borderColor: "rgba(255,255,255,0.16)",
                        boxShadow: "0 18px 60px rgba(0,0,0,0.60)",
                      }}
                    >
                      <List dense disablePadding>
                        {suggestions.map((s, i) => (
                          <React.Fragment key={s.id}>
                            <ListItemButton
                              selected={i === highlighted}
                              onMouseEnter={() => setHighlighted(i)}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => goToPrint(s.id)}
                              sx={{
                                px: 2,
                                py: 1.25,
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.06)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(76,201,240,0.14)",
                                },
                                "&.Mui-selected:hover": {
                                  backgroundColor: "rgba(76,201,240,0.18)",
                                },
                              }}
                            >
                              <ListItemText
                                primary={s.title}
                                secondary={s.tags.slice(0, 3).join(" • ")}
                                primaryTypographyProps={{
                                  sx: { fontSize: 12 },
                                }}
                                secondaryTypographyProps={{
                                  sx: { fontSize: 10, opacity: 0.85 },
                                }}
                              />
                            </ListItemButton>
                            {i < suggestions.length - 1 ? (
                              <Divider
                                sx={{ borderColor: "rgba(255,255,255,0.08)" }}
                              />
                            ) : null}
                          </React.Fragment>
                        ))}
                      </List>
                    </Paper>
                  </Popper>
                </Box>
              </ClickAwayListener>
            </Box>

            <Box
              sx={{
                justifySelf: "end",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isMobile && (
                <IconButton
                  aria-label="open search"
                  onClick={() => {
                    setMobileOpen(true);
                    setOpen(false);
                    setHighlighted(-1);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              )}

              <Button
                component={Link}
                href="/"
                color="inherit"
                sx={{ fontSize: 12, opacity: pathname === "/" ? 1 : 0.65 }}
              >
                Home
              </Button>
              <Button
                component={Link}
                href="/services"
                color="inherit"
                sx={{ fontSize: 12, opacity: pathname === "/services" ? 1 : 0.65 }}
              >
                Services
              </Button>
              <Button
                component={Link}
                href="/contact"
                color="inherit"
                sx={{ fontSize: 12, opacity: pathname === "/contact" ? 1 : 0.65 }}
              >
                Contact
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Dialog
        fullWidth
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(20, 12, 30)",
            border: "1px solid rgba(255,255,255,0.12)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <SearchBar
            fullWidth
            value={query}
            onChange={(v) => {
              setQuery(v);
              setOpen(Boolean(v.trim()));
              setHighlighted(-1);
            }}
            onSubmit={() => goToSearch(query)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setMobileOpen(false);
            }}
          />

          {query.trim() && suggestions.length > 0 ? (
            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "rgb(20, 12, 30)",
                borderColor: "rgba(255,255,255,0.16)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.60)",
              }}
            >
              <List dense disablePadding>
                {suggestions.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <ListItemButton onClick={() => goToPrint(s.id)}>
                      <ListItemText
                        primary={s.title}
                        secondary={s.tags.slice(0, 3).join(" • ")}
                        primaryTypographyProps={{ sx: { fontSize: 12 } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: 10, opacity: 0.85 },
                        }}
                      />
                    </ListItemButton>
                    {i < suggestions.length - 1 ? (
                      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    ) : null}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ) : null}
        </Box>
      </Dialog>
    </>
  );
}
