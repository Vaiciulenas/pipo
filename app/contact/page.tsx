"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./contact.module.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setToast({ open: true, severity: "error", message: error });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");

      setForm(initialState);
      setToast({ open: true, severity: "success", message: "Message sent!" });
    } catch (err) {
      setToast({
        open: true,
        severity: "error",
        message: err instanceof Error ? err.message : "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container maxWidth={false} className={styles.page}>
      <Box className={styles.card}>
        <div className={styles.header}>
          <Typography component="h1" className={styles.title}>
            Contact
          </Typography>
        </div>

        <Typography className={styles.subtitle}>
          Drop a message below. We’ll get back to you soon.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            required
            variant="filled"
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
            required
            type="email"
            variant="filled"
          />

          <TextField
            label="Subject (optional)"
            value={form.subject}
            onChange={handleChange("subject")}
            fullWidth
            variant="filled"
          />

          <TextField
            label="Message"
            value={form.message}
            onChange={handleChange("message")}
            fullWidth
            required
            multiline
            minRows={6}
            variant="filled"
          />

          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={loading}
            className={styles.submit}
          >
            {loading ? (
              <>
                <CircularProgress size={18} style={{ marginRight: 8 }} />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </Box>

        <div className={styles.hint}>
          Tip: keep it short — 140 characters is very retro.
        </div>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            borderRadius: 0,
            border: "4px solid #000",
            boxShadow: "6px 6px 0 #000",
            fontFamily: "inherit",
            letterSpacing: "1px",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
