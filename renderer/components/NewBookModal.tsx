import {
  Autocomplete,
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CaretDownIcon, XCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import NewBook from "./interface/NewBook";

type NewBookModalProps = {
  isOpen: boolean;
  onClick: () => void;
  close: () => void;
  types: string[];
};

export default function NewBookModal(props: NewBookModalProps) {
  const [newBook, setNewBook] = useState<NewBook>();
  const [inputType, setInputType] = useState("");

  const handleClose = () => {
    setNewBook(undefined);
    props.close();
  };

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
            <IconButton onClick={handleClose}>
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
                <OutlinedInput
                  placeholder="Başlık"
                  value={newBook?.name}
                  onChange={(e) => {
                    setNewBook((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Yazar</Typography>
                <OutlinedInput
                  placeholder="Yazar"
                  value={newBook?.writer}
                  onChange={(e) => {
                    setNewBook((prev) => ({
                      ...prev,
                      writer: e.target.value,
                    }));
                  }}
                />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Tür</Typography>
                <Autocomplete
                  freeSolo
                  openOnFocus
                  disableClearable
                  options={props.types}
                  filterOptions={(options) => options}
                  popupIcon={<CaretDownIcon />}
                  forcePopupIcon={props.types.length > 0 ? true : false}
                  value={newBook?.type ?? ""}
                  inputValue={inputType}
                  onChange={(_event, value) => {
                    setNewBook((prev) => ({ ...prev, type: value ?? "" }));
                    setInputType(value ?? "");
                  }}
                  onInputChange={(_event, value) => {
                    setInputType(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Tür" />
                  )}
                />
              </Stack>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"}>
              <Button
                variant="contained"
                sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
                onClick={props.onClick}
                disabled={
                  !newBook ||
                  !(
                    newBook.name?.trim() &&
                    newBook.writer?.trim() &&
                    newBook.type?.trim()
                  )
                }
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
