import {
  Autocomplete,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import AutocompleteOption from "./interface/AutocompleteOption";

type SearchBarProps = {
  options: AutocompleteOption[];
  selectedFilterType: "name" | "writer" | "type" | undefined;
  setSelectedFilterType: React.Dispatch<
    React.SetStateAction<"name" | "writer" | "type" | undefined>
  >;
  value: AutocompleteOption;
  setValue: React.Dispatch<React.SetStateAction<AutocompleteOption>>;
};

export default function SearchBar(props: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState<"filter" | "buttons" | "type">(
    "filter"
  );

  const getType = (type: string) => {
    switch (type) {
      case "name":
        return { color: "#015850", name: "BAŞLIK" };
      case "writer":
        return { color: "#B05200", name: "YAZAR" };
      case "type":
        return { color: "#0009B0", name: "TÜR" };
    }
  };

  useEffect(() => {
    if (props.selectedFilterType !== undefined) {
      setFilterType("type");
    }
  }, [props.selectedFilterType]);

  return (
    <Autocomplete
      options={props.options}
      getOptionLabel={(option) => option.name || ""}
      value={props.value}
      onChange={(_event, value) => {
        props.setValue(value);
        setInputValue(value.name);
      }}
      inputValue={inputValue}
      onInputChange={(_event, value, reason) => {
        if (reason === "input" || reason === "clear") {
          setInputValue(value);
        }
      }}
      sx={{
        ":hover": {
          borderColor: "#015850 !important",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              paddingRight: "1rem !important",
              paddingLeft: "1rem !important",
            },
          }}
          variant="outlined"
          color="primary"
          placeholder="Kitap, yazar veya tür ara"
          onFocus={() => {
            props.setValue(undefined);
            setInputValue("");
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlassIcon size="1rem" color="rgba(1, 88, 80, 0.4)" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {filterType === "filter" && (
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => setFilterType("buttons")}
                  >
                    <FunnelIcon size="1.5rem" color="#015850" />
                  </IconButton>
                )}
                {filterType === "buttons" && (
                  <Stack direction={"row"} gap={"0.62rem"}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: getType("name").color,
                        border:
                          "0.10rem solid " +
                          getType("name").color +
                          " !important",
                        ":hover": {
                          backgroundColor: getType("name").color,
                          border:
                            "0.10rem solid " +
                            getType("name").color +
                            " !important",
                        },
                      }}
                      onClick={() => props.setSelectedFilterType("name")}
                    >
                      BAŞLIK
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: getType("writer").color,
                        border:
                          "0.10rem solid " +
                          getType("writer").color +
                          " !important",
                        ":hover": {
                          backgroundColor: getType("writer").color,
                          border:
                            "0.10rem solid " +
                            getType("writer").color +
                            " !important",
                        },
                      }}
                      onClick={() => props.setSelectedFilterType("writer")}
                    >
                      YAZAR
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: getType("type").color,
                        border:
                          "0.10rem solid " +
                          getType("type").color +
                          " !important",
                        ":hover": {
                          backgroundColor: getType("type").color,
                          border:
                            "0.10rem solid " +
                            getType("type").color +
                            " !important",
                        },
                      }}
                      onClick={() => props.setSelectedFilterType("type")}
                    >
                      TÜR
                    </Button>
                  </Stack>
                )}
                {filterType === "type" && (
                  <Button
                    variant="outlined"
                    sx={{
                      color: getType(props.selectedFilterType).color,
                      border:
                        "0.10rem solid " +
                        getType(props.selectedFilterType).color +
                        " !important",
                      ":hover": {
                        backgroundColor: getType(props.selectedFilterType)
                          .color,
                        border:
                          "0.10rem solid " +
                          getType(props.selectedFilterType).color +
                          " !important",
                      },
                    }}
                    onClick={() => {
                      setFilterType("filter");
                      props.setSelectedFilterType(undefined);
                    }}
                  >
                    {getType(props.selectedFilterType).name}
                  </Button>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack
            direction="row"
            justifyContent={"start"}
            alignItems={"center"}
            paddingLeft={"1.70rem"}
            gap={"2rem"}
          >
            <Typography color={getType(option.type).color} fontWeight={"bold"}>
              {option.name}
            </Typography>
            <Box
              sx={{
                border: "0.06rem solid",
                borderColor: getType(option.type).color,
                color: getType(option.type).color,
                fontWeight: "bold",
                fontSize: "0.72rem",
                borderRadius: "0.12rem",
                px: "0.37em",
                py: "0.06rem",
                display: "flex",
                width: "3rem",
                justifyContent: "center",
              }}
            >
              {getType(option.type).name}
            </Box>
          </Stack>
        </li>
      )}
    />
  );
}
