import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  IconButton,
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
  TrashIcon,
} from "@phosphor-icons/react";
import EmptyList from "../components/EmptyList";
import Column from "../components/interface/Column";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import NewBookModal from "../components/NewBookModal";
import SearchBar from "../components/SearchBar";
import AutocompleteOption from "../components/interface/AutocompleteOption";
import { useSnackbar } from "notistack";
import { Book } from "../../main/types/Book";
import { convert, sleep } from "../utils/methods";
import NewBook from "../components/interface/NewBook";

const columns: readonly Column[] = [
  { id: "name", label: "Başlık" },
  { id: "writer", label: "Yazar" },
  { id: "type", label: "Tür" },
  { id: "status", label: "Durum" },
  { id: "actions", label: "" },
];

export default function HomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [selectedFilterType, setSelectedFilterType] = useState<
    "name" | "writer" | "type" | undefined
  >();
  const [autocompleteValue, setAutocompleteValue] =
    useState<AutocompleteOption>();
  const [selectedRow, setSelectedRow] = useState<Book>();
  const [rows, setRows] = useState<Book[]>();
  const [bookTypes, setBookTypes] = useState<string[]>();
  const [newBook, setNewBook] = useState<NewBook>();

  async function asyncFunc<T>(method: () => Promise<T>): Promise<T> {
    setIsLoader(true);

    try {
      const [result] = await Promise.all([method(), sleep(2000)]);
      return result;
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    } finally {
      setIsLoader(false);
    }
  }

  const getStatus = (status: number) => {
    switch (status) {
      case 0:
        return { text: "Okunmadı", color: "#B05200" };
      case 1:
        return { text: "Devam Ediyor", color: "#0009B0" };
      case 2:
        return { text: "Tamamlandı", color: "#015850" };
    }
  };

  const changeStatus = (book: Book, status: "start" | "finish" | "revert") => {
    // your logic
  };

  useEffect(() => {
    asyncFunc(() => window.db.getBooks()).then((books: Book[]) => {
      if (books) setRows(books);
    });
    asyncFunc(() => window.db.getTypes()).then((types: string[]) => {
      if (types) setBookTypes(types);
    });
  }, []);

  useEffect(() => {
    if (isLoader === true) {
      setIsNewBookModalOpen(false);
      setIsDeleteModalOpen(false);
    }
  }, [isLoader]);

  return (
    <React.Fragment>
      <Head>
        <title>Librarian</title>
      </Head>
      <Loader isOpen={isLoader} />
      <NewBookModal
        isOpen={isNewBookModalOpen}
        close={() => setIsNewBookModalOpen(false)}
        types={bookTypes}
        newBook={newBook}
        setNewBook={setNewBook}
        onClick={() => {
          asyncFunc(() => window.db.addBook(convert(newBook))).then(
            (newBook: Book) => {
              if (newBook) window.db.getBooks();
            }
          );
        }}
      />
      {selectedRow && (
        <DeleteModal
          book={selectedRow}
          isOpen={isDeleteModalOpen}
          onClick={() => {
            setIsLoader(true);
          }}
          close={() => {
            setIsDeleteModalOpen(false);
          }}
        />
      )}
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
          {!(rows?.length > 0) ? (
            <EmptyList onClick={() => setIsNewBookModalOpen(true)} />
          ) : (
            <>
              <SearchBar
                options={[
                  {
                    id: 1,
                    name: "Kaşağı, Ömer Seyfettin, Roman",
                    type: "name",
                  },
                  {
                    id: 2,
                    name: "Kaşağı, Ömer Seyfettin, Roman",
                    type: "writer",
                  },
                  {
                    id: 3,
                    name: "Kaşağı, Ömer Seyfettin, Roman",
                    type: "type",
                  },
                ]}
                setSelectedFilterType={setSelectedFilterType}
                selectedFilterType={selectedFilterType}
                setValue={setAutocompleteValue}
                value={autocompleteValue}
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
                      ?.map((row) => {
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
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={() =>
                                        changeStatus(row, "revert")
                                      }
                                    >
                                      <ArrowCounterClockwiseIcon
                                        size="1.5rem"
                                        color="#B05200"
                                      />
                                    </IconButton>
                                  )}
                                </Box>

                                <Box sx={{ width: "2rem" }}>
                                  {row.status === 0 ? (
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={() => changeStatus(row, "start")}
                                    >
                                      <BookOpenTextIcon
                                        size="1.5rem"
                                        color="#015850"
                                      />
                                    </IconButton>
                                  ) : row.status === 1 ? (
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={() =>
                                        changeStatus(row, "finish")
                                      }
                                    >
                                      <BookIcon size="1.5rem" color="#015850" />
                                    </IconButton>
                                  ) : null}
                                </Box>

                                <Box sx={{ width: "2rem" }}>
                                  <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() => {
                                      setSelectedRow(row);
                                      setIsDeleteModalOpen(true);
                                    }}
                                  >
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
                  onClick={() => setIsNewBookModalOpen(true)}
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
