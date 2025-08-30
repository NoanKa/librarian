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
import { ReactNode, useEffect, useState } from "react";
import AutocompleteOption from "./interface/AutocompleteOption";

type SearchBarProps = {
  options: AutocompleteOption[];
};

export default function SearchBar(props: SearchBarProps) {
  const [value, setValue] = useState(null);
  const [filterType, setFilterType] = useState<"filter" | "buttons" | "type">("filter");
  const [selectedFilterType, setSelectedFilterType] = useState<"name" | "writer" | "type" | undefined>();

  const getType: (type: string) => string = (type) => {
    switch (type) {
      case "name":
        return "#015850";
      case "writer":
        return "#B05200";
      case "type":
        return "#0009B0";
    }
  };

  useEffect(() => {
    if(selectedFilterType !== undefined){
      setFilterType("type");
    }
  }, [selectedFilterType])

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
                {filterType === "filter" && (<IconButton edge="end" size="small" onClick={() => setFilterType("buttons")}>
                  <FunnelIcon size="1.5rem" color="#015850" />
                </IconButton>)}
                {filterType === "buttons" && (<Stack direction={"row"} paddingX={"0.62rem"} gap={"0.62rem"}>
          <Button variant="outlined" sx={{color: "#015850", border: "0.16rem solid #015850"}} onClick={() => setSelectedFilterType("name")}>BAŞLIK</Button>
          <Button variant="outlined" sx={{color: "#B05200", border: "0.16rem solid #B05200"}} onClick={() => setSelectedFilterType("writer")}>YAZAR</Button>
          <Button variant="outlined" sx={{color: "#0009B0", border: "0.16rem solid #0009B0"}} onClick={() => setSelectedFilterType("type")}>TÜR</Button>
        </Stack>)}
                {filterType === "type" && (<Button variant="outlined" sx={{color: "#015850", border: "0.16rem solid #015850"}} onClick={() => setFilterType("filter")}></Button>)}
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
            <Typography color={getType(option.type)} fontWeight={"bold"}>
              {option.name}
            </Typography>
            <Badge
              sx={{ fontSize: "0.62rem", color: getType(option.type)}}
              badgeContent="Başlık"
              variant="standard"
            />
          </Stack>
        </li>
      )}
    />
  );
}
