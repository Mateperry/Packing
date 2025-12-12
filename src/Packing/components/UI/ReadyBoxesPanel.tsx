import { useEffect } from "react";
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
  isOpen?: boolean;
  onClose?: () => void;
}

const PRIMARY = "#152c48";

export default function ReadyBoxesPanel({ readyBoxes, onRestore, isOpen = false, onClose }: Props) {

  //  BLOQUEAR SCROLL DEL BODY CUANDO EL PANEL ESTÁ ABIERTO
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);



  if (readyBoxes.length === 0) return null;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={() => onClose?.()}
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
        }}
      />

      {/* PANEL */}
      <Card
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: "100%", sm: "65%", md: "45%", lg: "38%" },
          maxWidth: 440,
          height: "100vh",
          zIndex: 1100,
          backgroundColor: "#ffffff",
          borderRadius: "12px 0 0 12px",
          boxShadow: "0 6px 30px rgba(0,0,0,0.18)",
          overflow: "auto",
          animation: "slideIn 0.25s ease-out",
        }}
      >
            {/* HEADER */}
            <Box
              sx={{
                background: PRIMARY,
                color: "white",
                padding: "14px 18px",
                fontWeight: 600,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "12px 0 0 0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <span style={{ fontSize: 17 }}>Cajas Listas</span>

                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {readyBoxes.length}
                </span>
              </Box>

              <IconButton
                size="small"
                onClick={() => onClose?.()}
                sx={{ color: "white" }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ padding: "16px 18px" }}>
              {readyBoxes.map((box, index) => (
                <Box
                  key={box.id}
                  sx={{
                    mb: 1.5,
                    background: "white",
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid #e6e6e6",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "0.2s",
                    "&:hover": {
                      boxShadow: "0 3px 10px rgba(0,0,0,0.13)",
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
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            fontWeight: 700,
                            fontSize: 15,
                            color: PRIMARY,
                          }}
                        >
                          {box.titulo}
                        </Box>

                        <Box sx={{ fontSize: 12, color: "#777" }}>
                          {box.productos.length} SKU
                        </Box>
                      </Box>

                      {onRestore && (
                        <IconButton
                          size="small"
                          onClick={() => onRestore(box.id)}
                          sx={{
                            color: PRIMARY,
                            backgroundColor: "#eff3f8",
                            width: 26,
                            height: 26,
                            "&:hover": {
                              backgroundColor: "#e3e8ef",
                            },
                          }}
                        >
                          <ChevronLeftIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
    </>
  );
}
