import {
  Autocomplete,
  Button,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CaretDownIcon, XCircleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import NewBook from "./interface/NewBook";

type NewBookModalProps = {
  isOpen: boolean;
  onClick: () => void;
  close: () => void;
  types: string[];
  writers: string[];
  newBook: NewBook;
  setNewBook: React.Dispatch<React.SetStateAction<NewBook>>;
};

export default function NewBookModal(props: NewBookModalProps) {
  const handleClose = () => {
    props.setNewBook(undefined);
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
                  value={props.newBook?.name}
                  onChange={(e) => {
                    props.setNewBook((prev) => ({
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
                <Autocomplete
                  disableClearable
                  disablePortal
                  freeSolo
                  options={props.writers}
                  popupIcon={<CaretDownIcon />}
                  forcePopupIcon={props.writers.length > 0 ? true : false}
                  value={props.newBook?.writer ?? null}
                  onChange={(_event, value) => {
                    props.setNewBook((prev) => ({
                      ...prev,
                      writer: value ?? "",
                    }));
                  }}
                  onInputChange={(_event, newInputValue) => {
                    props.setNewBook((prev) => ({
                      ...prev,
                      writer: newInputValue,
                    }));
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: 3 * 40,
                      overflowY: "auto",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Yazar" />
                  )}
                />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"start"}
                gap={"0.62rem"}
              >
                <Typography color={"#015850"}>Tür</Typography>
                <Autocomplete
                  disableClearable
                  disablePortal
                  freeSolo
                  options={props.types}
                  popupIcon={<CaretDownIcon />}
                  forcePopupIcon={props.types.length > 0 ? true : false}
                  value={props.newBook?.type ?? null}
                  onChange={(_event, value) => {
                    props.setNewBook((prev) => ({
                      ...prev,
                      type: value ?? "",
                    }));
                  }}
                  onInputChange={(_event, newInputValue) => {
                    props.setNewBook((prev) => ({
                      ...prev,
                      type: newInputValue,
                    }));
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: 3 * 40,
                      overflowY: "auto",
                    },
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
                  !props.newBook ||
                  !(
                    props.newBook.name?.trim() &&
                    props.newBook.writer?.trim() &&
                    props.newBook.type?.trim()
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
