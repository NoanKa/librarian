import { Box, Button, Typography } from "@mui/material";
import { QuestionIcon } from "@phosphor-icons/react";

export default function EmptyList() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="1.5rem"
    >
      <QuestionIcon size="5rem" color="#B05200" />
      <Typography
        fontSize="1.5rem"
        sx={{ whiteSpace: "pre-line", textAlign: "center", color: "#015850" }}
      >
        Kütüphanen boş görünüyor.
        <br />
        Yeni bir kitap ekleyerek başlayabilirsin
      </Typography>
      <Button
        variant="contained"
        sx={{ paddingX: "4rem", paddingY: "0.5rem", fontSize: "1rem" }}
      >
        Ekle
      </Button>
    </Box>
  );
}
