import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { ReadyBox } from "../../Hooks/useBoxShipping";

interface Props {
  readyBoxes: ReadyBox[];
  onRestore?: (readyBoxId: number) => void;
}

const PRIMARY = "#152c48";

export default function ReadyBoxesPanel({ readyBoxes, onRestore }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (readyBoxes.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 90,
        right: 10,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        gap: 0,
      }}
    >
      {isOpen && (
        <>
          {/* Backdrop */}
          <Box
            onClick={() => setIsOpen(false)}
            sx={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 1000,
            }}
          />

          {/* Fullscreen panel */}
          <Card
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              width: { xs: "100%", sm: "70%", md: "50%", lg: "40%" },
              maxWidth: 500,
              height: "100vh",
              zIndex: 1100,
              backgroundColor: "#fafafa",
              boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
              borderRadius: "12px 0 0 12px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.25s ease-out",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                background: "linear-gradient(90deg, #80ac22, #6a8c1d)",
                color: "white",
                padding: "16px",
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 18 }}>Cajas Listas</span>
                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {readyBoxes.length}
                </span>
              </Box>

              <IconButton size="large" onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
                <ChevronRightIcon />
              </IconButton>
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ padding: 3 }}>
              {readyBoxes.map((box, index) => {
                const totalItems = box.productos.reduce((s, p) => s + (p.quantity || 0), 0);

                return (
                  <Box
                    key={box.id}
                    sx={{
                      mb: 2,
                      background: "white",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #e4e4e4",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      transition: "0.2s",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {index > 0 && <Divider sx={{ my: 1 }} />}

                    <Box sx={{ py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
                          <Box sx={{ fontWeight: 700, fontSize: 16, color: PRIMARY }}>
                            {box.titulo}
                          </Box>
                          <Box sx={{ fontSize: 13, color: "#777" }}>{totalItems} items</Box>
                        </Box>

                        {onRestore && (
                          <IconButton
                            size="small"
                            onClick={() => onRestore(box.id)}
                            sx={{
                              color: PRIMARY,
                              backgroundColor: "#eef2f7",
                              "&:hover": { backgroundColor: "#e0e6ef" },
                            }}
                          >
                            <ChevronLeftIcon />
                          </IconButton>
                        )}
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {box.productos.map((prod) => (
                          <Box key={prod.id} sx={{ fontSize: 14, color: "#444" }}>
                            {prod.description} × {prod.quantity}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </>
      )}

      {/* BOTÓN TOGGLE */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: "#80ac22",
          color: "white",
          borderRadius: "50%",
          width: 48,
          height: 48,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "#6a8c1d",
            transform: "scale(1.07)",
          },
          transition: "0.25s",
        }}
      >
        {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );
}
