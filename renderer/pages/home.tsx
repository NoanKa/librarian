import React from "react";
import Head from "next/head";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-material-ui)</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem",
          alignContent: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Stack
          style={{
            backgroundColor: "white",
            border: "1px solid rgba(1, 88, 80, 0.6)",
            borderRadius: "0.31rem",
            padding: "1.87rem",
            flex: 1,
            height: "100%",
          }}
        >
          <OutlinedInput
            placeholder="Kitap, yazar veya tür ara"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon
                  size={"1rem"}
                  color="rgba(1, 88, 80, 0.4)"
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <FunnelIcon size={"1.5rem"} color="#015850" />
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
