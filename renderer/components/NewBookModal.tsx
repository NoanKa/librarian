import { IconButton, Paper, Stack } from "@mui/material";
import { XCircleIcon } from "@phosphor-icons/react";

type NewBookModalProps = {
  isOpen: boolean;
  close: () => void;
};

export default function NewBookModal(props: NewBookModalProps) {
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
          sx={{ width: "50rem", height: "37.5rem" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"white"}
          paddingBottom={"3rem"}
          paddingTop={"2rem"}
          paddingX={"5rem"}
        >
          <Stack
            direction={"row"}
            width={"100%"}
            paddingRight={"1.25rem"}
            paddingTop={"1.25rem"}
          >
            <IconButton onClick={props.close}>
              <XCircleIcon size={"2.5rem"} color="#015850" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    )
  );
}
