import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowCounterClockwiseIcon,
  BookIcon,
  BookOpenTextIcon,
  BooksIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import EmptyList from "../components/EmptyList";
import Column from "../components/interface/Column";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import NewBookModal from "../components/NewBookModal";
import { useSnackbar } from "notistack";
import { Book } from "../../main/types/Book";
import { convert, sleep } from "../utils/methods";
import NewBook from "../components/interface/NewBook";
import { BookStatus } from "../components/enum/BookStatus";

const pageSize = 5;

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
  const [isEmptyList, setIsEmptyList] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedFilterType, setSelectedFilterType] = useState<
    "name" | "writer" | "type" | undefined
  >();
  const [filterType, setFilterType] = useState<"filter" | "buttons" | "type">(
    "filter"
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<Book>();
  const [rows, setRows] = useState<Book[]>();
  const [bookTypes, setBookTypes] = useState<string[]>();
  const [bookWriters, setBookWriters] = useState<string[]>();
  const [newBook, setNewBook] = useState<NewBook>();
  const [page, setPage] = useState<number>(1);

  async function asyncFunc<T>(method: () => Promise<T>): Promise<T> {
    setIsLoader(true);

    try {
      const [result] = await Promise.all([method(), sleep(1500)]);
      return result;
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    } finally {
      setIsLoader(false);
    }
  }

  const getStatus = (status: BookStatus) => {
    switch (status) {
      case 0:
        return { text: "Okunmadı", color: "#B05200" };
      case 1:
        return { text: "Devam Ediyor", color: "#0009B0" };
      case 2:
        return { text: "Tamamlandı", color: "#015850" };
    }
  };

  const getFilterType = (type: string) => {
    switch (type) {
      case "name":
        return { color: "#015850", name: "BAŞLIK" };
      case "writer":
        return { color: "#B05200", name: "YAZAR" };
      case "type":
        return { color: "#0009B0", name: "TÜR" };
    }
  };

  const changeStatus = (id: number, status: BookStatus) => {
    asyncFunc(() => window.db.updateBookStatus(id, status)).then(
      (updatedBook: Book) => {
        if (updatedBook) {
          window.db.getBooks().then((books: Book[]) => {
            if (books) {
              setRows(books);
              setPage(
                Math.floor(books.findIndex((b) => b.id === id) / pageSize) + 1
              );
              setNewBook(undefined);
            }
          });
          enqueueSnackbar(
            'Kitabın Durumu "' +
              getStatus(status).text +
              '" Olarak Değiştirildi',
            { variant: "success" }
          );
        }
      }
    );
  };

  const handleFilterButtonClick = (type: "name" | "writer" | "type") => {
    setSelectedFilterType(type);
    setFilterType("type");
  };

  useEffect(() => {
    asyncFunc(() => window.db.getBooks()).then((books: Book[]) => {
      if (books) {
        setRows(books);
        setIsFirstLoad(false);
      }
    });
    asyncFunc(() => window.db.getTypes()).then((types: string[]) => {
      if (types) setBookTypes(types);
    });
    asyncFunc(() => window.db.getWriters()).then((writers: string[]) => {
      if (writers) setBookWriters(writers);
    });
  }, []);

  useEffect(() => {
    if (rows) {
      if (!((rows.length ?? 0) > 0) && (isLoader ?? true) !== true) {
        setIsEmptyList(true);
      } else {
        setIsEmptyList(false);
      }
    }
  }, [rows]);

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
        writers={bookWriters}
        newBook={newBook}
        setNewBook={setNewBook}
        onClick={() => {
          asyncFunc(() => window.db.addBook(convert(newBook))).then(
            (newBook: Book) => {
              if (newBook) {
                window.db.getBooks().then((books: Book[]) => {
                  if (books) {
                    setRows(books);
                    setPage(Math.floor(books.length / pageSize) + 1);
                    setNewBook(undefined);
                    setSearchValue("");
                    setSelectedFilterType(undefined);
                    setFilterType("filter");
                    window.db.getTypes().then((types: string[]) => {
                      if (types) setBookTypes(types);
                    });
                    window.db.getWriters().then((writers: string[]) => {
                      if (writers) setBookWriters(writers);
                    });
                  }
                });
                enqueueSnackbar("Kitap Eklendi", { variant: "success" });
              }
            }
          );
        }}
      />
      {selectedRow && (
        <DeleteModal
          book={selectedRow}
          isOpen={isDeleteModalOpen}
          onClick={() => {
            asyncFunc(() => window.db.deleteBook(selectedRow.id)).then(
              (deletedBook: Book) => {
                if (deletedBook) {
                  window.db.getBooks().then((books: Book[]) => {
                    if (books) {
                      const totalPages = Math.ceil(books.length / pageSize);
                      const newPage =
                        page > totalPages ? Math.max(totalPages, 1) : page;

                      setRows(books);
                      setPage(newPage);
                      setSearchValue("");
                      setSelectedFilterType(undefined);
                      setFilterType("filter");
                      window.db.getTypes().then((types: string[]) => {
                        if (types) setBookTypes(types);
                      });
                      window.db.getWriters().then((writers: string[]) => {
                        if (writers) setBookWriters(writers);
                      });
                    }
                  });
                  enqueueSnackbar("Kitap Kaldırıldı", { variant: "success" });
                }
              }
            );
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
          {isEmptyList ? (
            <EmptyList onClick={() => setIsNewBookModalOpen(true)} />
          ) : (
            !isFirstLoad && (
              <>
                <TextField
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      paddingRight: "1rem !important",
                      paddingLeft: "1rem !important",
                    },
                  }}
                  variant="outlined"
                  placeholder="Kitap, yazar veya tür ara"
                  value={searchValue}
                  onFocus={() => {
                    setSearchValue("");
                  }}
                  onBlur={() => {
                    setFilterType("filter");
                  }}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MagnifyingGlassIcon
                          size="1rem"
                          color="rgba(1, 88, 80, 0.4)"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Fade in={true} timeout={300}>
                          <Box key={filterType}>
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
                              <Stack direction="row" gap="0.62rem">
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: getFilterType("name").color,
                                    border:
                                      "0.10rem solid " +
                                      getFilterType("name").color +
                                      " !important",
                                    ":hover": {
                                      backgroundColor:
                                        getFilterType("name").color,
                                      border:
                                        "0.10rem solid " +
                                        getFilterType("name").color +
                                        " !important",
                                    },
                                  }}
                                  onClick={() =>
                                    handleFilterButtonClick("name")
                                  }
                                >
                                  BAŞLIK
                                </Button>
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: getFilterType("writer").color,
                                    border:
                                      "0.10rem solid " +
                                      getFilterType("writer").color +
                                      " !important",
                                    ":hover": {
                                      backgroundColor:
                                        getFilterType("writer").color,
                                      border:
                                        "0.10rem solid " +
                                        getFilterType("writer").color +
                                        " !important",
                                    },
                                  }}
                                  onClick={() =>
                                    handleFilterButtonClick("writer")
                                  }
                                >
                                  YAZAR
                                </Button>
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: getFilterType("type").color,
                                    border:
                                      "0.10rem solid " +
                                      getFilterType("type").color +
                                      " !important",
                                    ":hover": {
                                      backgroundColor:
                                        getFilterType("type").color,
                                      border:
                                        "0.10rem solid " +
                                        getFilterType("type").color +
                                        " !important",
                                    },
                                  }}
                                  onClick={() =>
                                    handleFilterButtonClick("type")
                                  }
                                >
                                  TÜR
                                </Button>
                              </Stack>
                            )}

                            {filterType === "type" && (
                              <Button
                                variant="outlined"
                                sx={{
                                  color:
                                    getFilterType(selectedFilterType)?.color,
                                  border:
                                    "0.10rem solid " +
                                    getFilterType(selectedFilterType)?.color +
                                    " !important",
                                  ":hover": {
                                    backgroundColor:
                                      getFilterType(selectedFilterType)?.color,
                                    border:
                                      "0.10rem solid " +
                                      getFilterType(selectedFilterType)?.color +
                                      " !important",
                                  },
                                }}
                                onClick={() => {
                                  setFilterType("filter");
                                }}
                              >
                                {getFilterType(selectedFilterType)?.name}
                              </Button>
                            )}
                          </Box>
                        </Fade>
                      </InputAdornment>
                    ),
                  }}
                />
                {(() => {
                  const data = rows
                    ?.filter((value) => {
                      if (searchValue !== "") {
                        switch (selectedFilterType) {
                          case "name":
                            return value.name
                              .toLowerCase()
                              .includes(searchValue.toLowerCase());
                          case "writer":
                            return value.writer
                              .toLowerCase()
                              .includes(searchValue.toLowerCase());
                          case "type":
                            return value.type
                              .toLowerCase()
                              .includes(searchValue.toLowerCase());
                          default:
                            return (
                              value.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              value.writer
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              value.type
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                            );
                        }
                      } else return true;
                    })
                    .slice(
                      (page - 1) * pageSize,
                      (page - 1) * pageSize + pageSize
                    );
                  if (data?.length > 0) {
                    return (
                      <>
                        <TableContainer
                          sx={{ backgroundColor: "white", height: "100%" }}
                        >
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                {columns.map((column) => (
                                  <TableCell key={column.id}>
                                    {column.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data?.map((row) => {
                                const status = getStatus(row.status);
                                return (
                                  <TableRow
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                  >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.writer}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell sx={{ color: status?.color }}>
                                      {status.text}
                                    </TableCell>
                                    <TableCell>
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
                                                changeStatus(
                                                  row.id,
                                                  BookStatus.NotFinished
                                                )
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
                                              onClick={() =>
                                                changeStatus(
                                                  row.id,
                                                  BookStatus.Ongoing
                                                )
                                              }
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
                                                changeStatus(
                                                  row.id,
                                                  BookStatus.Finished
                                                )
                                              }
                                            >
                                              <BookIcon
                                                size="1.5rem"
                                                color="#015850"
                                              />
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
                                            <TrashIcon
                                              size="1.5rem"
                                              color="#FF0000"
                                            />
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
                          <Pagination
                            count={Math.ceil((rows?.length ?? 0) / pageSize)}
                            page={page}
                            variant="outlined"
                            onChange={(_event, value: number) => {
                              setPage(value);
                            }}
                            shape="rounded"
                          />
                        </Box>
                        <Stack
                          direction={"row"}
                          width={"100%"}
                          justifyContent={"end"}
                        >
                          <Button
                            variant="contained"
                            sx={{ paddingX: "2.5rem", paddingY: "0.5rem" }}
                            onClick={() => setIsNewBookModalOpen(true)}
                          >
                            Ekle
                          </Button>
                        </Stack>
                      </>
                    );
                  } else if (data?.length === 0) {
                    return (
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        gap={2}
                      >
                        <BooksIcon size="4rem" color="#B05200" />
                        <Typography
                          fontSize="1.5rem"
                          sx={{
                            whiteSpace: "pre-line",
                            textAlign: "center",
                            color: "#015850",
                          }}
                        >
                          Aramanıza uygun bir kitap bulunamadı.
                        </Typography>
                      </Stack>
                    );
                  }
                })()}
              </>
            )
          )}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
