// BoxCard.tsx
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

interface BoxCardProps {
  titulo: string;
  onEliminar?: () => void;
  mostrarTitulo?: boolean;
  alternarTitulo?: () => void;
}

function BoxCard({ titulo, onEliminar, mostrarTitulo = true, alternarTitulo }: BoxCardProps) {
  return (
    <Card
      sx={{
        width: '090%',
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        paddingY: 1,
        marginY: 1,
        marginX: 3,
      }}
    >
      <CardHeader
        title={mostrarTitulo ? titulo : ''} // mostramos el título solo si mostrarTitulo es true
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="medium" onClick={alternarTitulo} title="Mostrar/ocultar título">
              {mostrarTitulo ? (
                <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
              ) : (
                <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <IconButton size="small" onClick={onEliminar} title="Disminuir caja">
              <DeleteOutlineIcon sx={{ fontSize: 18, color: 'red' }} />
            </IconButton>
          </Box>
        }
        sx={{
          paddingX: 2,
          paddingY: 1,
          "& .MuiCardHeader-title": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />

      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 3,
        }}
      >
        <Inventory2OutlinedIcon sx={{ fontSize: 60, color: '#f97316' }} />
      </CardContent>
    </Card>
  );
}

export default BoxCard;
