import { Box, Paper } from "@mui/material";
import { BookIcon, BookOpenTextIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type LoaderProps = {
  isOpen: boolean;
  cycles?: number;
};

export default function Loader(props: LoaderProps) {
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const toggle = () => {
      setShowOpen((prev) => {
        const next = !prev;
        timeout = setTimeout(toggle, next ? 600 : 400);
        return next;
      });
    };
    timeout = setTimeout(toggle, 400);
    return () => clearTimeout(timeout);
  }, []);

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
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3,
          }}
        >
          {showOpen ? (
            <BookOpenTextIcon size={"3rem"} color="#015850" />
          ) : (
            <BookIcon size={"3rem"} color="#015850" />
          )}
        </Box>
      </Paper>
    )
  );
}
