import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Row from "./interface/Row";

type DeleteModalProps = {
  book: Row;
  isOpen: boolean;
  onClick: () => void;
  close: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
  return (
    props.isOpen && (
      <Paper
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(116, 116, 116, 0.7)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
      >
        <Stack
          sx={{ width: "25rem", height: "16rem" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"white"}
          paddingBottom={"3rem"}
          paddingTop={"2rem"}
          paddingX={"5rem"}
        >
          <Stack direction={"column"} height={"100%"}>
            <Stack height={"100%"} justifyContent={"center"}>
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  color: "#015850",
                }}
              >
                Seçtiğiniz <b>{props.book.name}</b> kitabı listeden
                <br /> kaldırılacaktır.
                <br /> Onaylıyor musunuz?
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              width={"100%"}
              gap={"2rem"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
                onClick={props.onClick}
              >
                Kaldır
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
                onClick={props.close}
              >
                Vazgeç
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    )
  );
}
