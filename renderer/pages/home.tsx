import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

interface Column {
  id: "name" | "writer" | "type" | "status" | "actions";
  label: string;
}

interface Row {
  id: number;
  name: string;
  writer: string;
  type: string;
  status: number;
}

const columns: readonly Column[] = [
  { id: "name", label: "Başlık" },
  { id: "writer", label: "Yazar" },
  { id: "type", label: "Tür" },
  { id: "status", label: "Durum" },
  { id: "actions", label: "" },
];

export default function HomePage() {
  const [rows, setRows] = useState<Row[]>([{id: 1, name: "Kaşağı", writer: "Ömer Seyfettin", type: "Roman", status: 0} as Row]);

  const getStatus: (status: number) => {
    switch (status) {
      case 0:
        return "Okunmadı"
        break;
    
      case 1:
        return "Devam Ediyor"
        break;

      case 2:
        return "Tamamlandı"
    }
  };

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
            gap: "1.87rem",
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
          <TableContainer sx={{ backgroundColor: "white" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={columns[0].id}>
                      {row.name}
                    </TableCell>
                    <TableCell key={columns[1].id}>
                      {row.writer}
                    </TableCell>
                    <TableCell key={columns[2].id}>
                      {row.type}
                    </TableCell>
                    <TableCell key={columns[3].id}>
                      {row.status}
                    </TableCell>
                    <TableCell key={columns[4].id}>
                      
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
