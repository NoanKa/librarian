import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ArrowCounterClockwiseIcon,
  BookIcon,
  BookOpenTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import EmptyList from "../components/EmptyList";
import Column from "../components/interface/Column";
import Row from "../components/interface/Row";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";

const columns: readonly Column[] = [
  { id: "name", label: "Başlık" },
  { id: "writer", label: "Yazar" },
  { id: "type", label: "Tür" },
  { id: "status", label: "Durum" },
  { id: "actions", label: "" },
];

export default function HomePage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row>();
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      name: "Kaşağı",
      writer: "Ömer Seyfettin",
      type: "Roman",
      status: 0,
    } as Row,
  ]);

  const getStatus: (status: number) => { text: string; color: string } = (
    status
  ) => {
    switch (status) {
      case 0:
        return { text: "Okunmadı", color: "#B05200" };
      case 1:
        return { text: "Devam Ediyor", color: "#0009B0" };
      case 2:
        return { text: "Tamamlandı", color: "#015850" };
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-material-ui)</title>
      </Head>
      <Loader isOpen={isLoader} />
      <DeleteModal
        book={rows.at(0)}
        isOpen={isDeleteModalOpen}
        close={() => {
          setIsDeleteModalOpen(false);
        }}
      />
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
            alignContent: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {rows.length == 0 ? (
            <EmptyList />
          ) : (
            <>
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
              <TableContainer sx={{ backgroundColor: "white", height: "100%" }}>
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
                        let status = getStatus(row.status);
                        return (
                          <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={columns[0].id}>
                              {row.name}
                            </TableCell>
                            <TableCell key={columns[1].id}>
                              {row.writer}
                            </TableCell>
                            <TableCell key={columns[2].id}>
                              {row.type}
                            </TableCell>
                            <TableCell
                              key={columns[3].id}
                              sx={{ color: status.color }}
                            >
                              {status.text}
                            </TableCell>
                            <TableCell key={columns[4].id}>
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                              >
                                <Box sx={{ width: "2rem" }}>
                                  {row.status === 1 && (
                                    <IconButton edge="end" size="small">
                                      <ArrowCounterClockwiseIcon
                                        size="1.5rem"
                                        color="#B05200"
                                      />
                                    </IconButton>
                                  )}
                                </Box>

                                <Box sx={{ width: "2rem" }}>
                                  {row.status === 0 ? (
                                    <IconButton edge="end" size="small">
                                      <BookOpenTextIcon
                                        size="1.5rem"
                                        color="#015850"
                                      />
                                    </IconButton>
                                  ) : row.status === 1 ? (
                                    <IconButton edge="end" size="small">
                                      <BookIcon size="1.5rem" color="#015850" />
                                    </IconButton>
                                  ) : null}
                                </Box>

                                <Box sx={{ width: "2rem" }}>
                                  <IconButton edge="end" size="small">
                                    <TrashIcon size="1.5rem" color="#FF0000" />
                                  </IconButton>
                                </Box>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Box>
              <Stack direction={"row"} width={"100%"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
                >
                  Ekle
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
