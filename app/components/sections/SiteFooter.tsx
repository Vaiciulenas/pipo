import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography sx={{ fontSize: 10, opacity: 0.5 }}>
        {year} PIPO
      </Typography>
    </Box>
  );
}
