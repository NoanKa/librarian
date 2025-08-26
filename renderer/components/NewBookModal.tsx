import {
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
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
          sx={{ width: "45rem", height: "32.5rem" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"white"}
        >
          <Stack
            direction={"row"}
            width={"100%"}
            paddingRight={"1.25rem"}
            paddingTop={"1.25rem"}
            justifyContent={"end"}
          >
            <IconButton onClick={props.close}>
              <XCircleIcon size={"2.5rem"} color="#015850" />
            </IconButton>
          </Stack>
          <Stack
            direction={"column"}
            height={"100%"}
            width={"100%"}
            paddingBottom="3rem"
            paddingX="5rem"
          >
            <Stack
              direction={"column"}
              sx={{
                gap: "1.25rem",
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Başlık</Typography>
                <OutlinedInput placeholder="Başlık" />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Yazar</Typography>
                <OutlinedInput placeholder="Yazar" />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Tür</Typography>
                <Select value={""} onChange={() => {}} placeholder="Tür">
                  <MenuItem value="" disabled>
                    Tür
                  </MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"}>
              <Button
                variant="contained"
                sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
              >
                Kaydet
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    )
  );
}
