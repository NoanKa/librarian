import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Row from "./interface/Row";

export default function DeleteModal(book: Row) {
  return (
    <Paper>
      <Box width="" height="" justifyContent="center" alignItems="center">
        <Typography
          sx={{ whiteSpace: "pre-line", textAlign: "center", color: "#015850" }}
        >
          Seçtiğiniz <b>{book.name}</b> kitabı listeden
          <br /> kaldırılacaktır.
          <br /> Onaylıyor musunuz?
        </Typography>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"end"}
          gap={"2rem"}
        >
          <Button
            variant="contained"
            sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
          >
            Kaldır
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
          >
            Vazgeç
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
