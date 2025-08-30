import {
  Autocomplete,
  Badge,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import AutocompleteOption from "./interface/AutocompleteOption";

type SearchBarProps = {
  options: AutocompleteOption[];
  selectedFilterType: "name" | "writer" | "type" | undefined;
  setSelectedFilterType: React.Dispatch<
    React.SetStateAction<"name" | "writer" | "type" | undefined>
  >;
};

export default function SearchBar(props: SearchBarProps) {
  const [value, setValue] = useState(null);
  const [filterType, setFilterType] = useState<"filter" | "buttons" | "type">(
    "filter"
  );

  const getType: (type: string) => { color: string; name: string } = (type) => {
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
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      options={props.options}
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
            <Badge
              sx={{ fontSize: "0.62rem", color: getType(option.type).color }}
              badgeContent="Başlık"
              variant="standard"
            />
          </Stack>
        </li>
      )}
    />
  );
}
