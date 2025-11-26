
// Componente de cajas, estilos y logica 




import Card from '@mui/material/Card';  //Se usa el componente de Material UI, Card, el cual nos ayuda ya con estilos existentes, nos ayuda con algunos subcomponentes
import CardHeader from '@mui/material/CardHeader'; // Primer Subcomponente que utilizamos para colocar un titulo o alguna accion en la parte de arriba
import CardContent from '@mui/material/CardContent'; //Este nos ayuda a manejar como tal lo que seria el cuerpo, la parte de abajo del Header
import IconButton from '@mui/material/IconButton'; // Aqui manejamos lo que es la importacion para los bonotnes, donde por ejemplo podemos utilizar estilos como focus o ripple y poner el icono simplemente
import Box from '@mui/material/Box'; // Lo usamos por su facilidad de poder establecerle estilos, donde podemos como tal manejar un grupo y darle estilos
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // Icono del ojo o de ver
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Icono de eliminar o la basura
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'; // Icono de una caja grande, 




//Definimos la funcion a utilizar y que exportaremos para utilizar como componente
function BoxCard({}) {
// Aquí manejamos alguna logica que necesitaramos más adelante por ahora no necesitamos 



    // Aquí necesitamos definir un return para poder mostrar en pantalla lo que deseamos y empezamos a poner etiquetas  
  return (
    < >
    {/*Utilizamos el componente de Material UI Card donde pondremos todo el contenido dentro, lo cual seria el componente generar */}
    <Card
    //Definimos estilos manejamos sx, ya que estamos en un componente de Material UI podemos utilizar esta propiedad para podificar estilos
      sx={{
        width: '50%',// Espacio en Horizontal de la tarjeta, 50 porciento de la pantalla
        borderRadius: 3, // Borde redondeado con una unidad de medida, este tres serian aproximandamente unos 24PX
        border: '1px solid #e5e7eb', // Aquí defininimos un 1 pixel para el borde, lo ponemos en solido para que sea continuo y finalizamos con un color
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Aquí hacemos lo que seria la sombra para que se vea como una profundidad debajo de la tarjeta
        paddingY: 1, //Ponemos un padding en vertical para que no se vea tan pegado al borde superior y inferior
        marginY: 3, // Ponemos un margen en vertical para que no se vea tan pegado al borde superior y inferior
        marginX: 3, // Ponemos un margen en horizontal para que no se vea tan pegado al borde izquierdo y derecho
      }}
    >
      {/* Aquí empezamos hacer uso de el subcomponente que tiene Card, donde usaremos como tal para el encabezado de nuestra tarjeta  */}
      <CardHeader
        title="Caja 1" // Definimos lo que es el titulo que mostraremos en la parte de arriba 

        action={ //Aquí lo que hace es que se usa action para empezar a colocar los elementos alineado a la derecha despues de titulo
          <Box sx={{ // Utilizamos nuevamente sx 
            display: 'flex' // Un flex para poder poner las cosas horizontalmente
          , gap: 1  // Espacio entre los componentes
          }}>
            {/* Aquí ponemos los componentes que queremos colocar en la parte de arriba */}
            {/* Aqui con el size utilizamos el "Espacio que tendra el icono, no su tamaño " */}
            <IconButton size="medium" >
                {/* Aqui utilizamos el icono que queremos colocar, en este caso el de ojo */}
              <VisibilityOutlinedIcon sx={{ // Usamos nuevamente lo que es sx porque sigue siendo un componente de Material UI 
                fontSize: 18  // Definimos el tamaño que queremos para el icono 
              }} />
            </IconButton>
              {/**Aqui nuevamente pondremos el boton deseado */}
              {/**Recordar que el size es para el "Espacio" que tendra el icono no su tamaño */}
            <IconButton size="small">
                {/**El boton a poner, icono de basura o de eliminar, */}
              <DeleteOutlineIcon sx={{ // Aqui manejamos nuevamente sx porque sigue siendo un componente de Material UI
                fontSize: 18, // Utilizamos para el tamaño del icono
                 color: 'red' // Indicamos el color del icono 
             }} />
            </IconButton>
          </Box> 

        }
        // Estilos ya directamente a el CardHeader 
        sx={{
          paddingX: 2,
          paddingY: 1,
          // Aquí personalizamos la tipografía correctamente
          "& .MuiCardHeader-title": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />

      {/* ÍCONO GRANDE AL CENTRO del contenido donde es el cuerpo de la caja , utilizamos nuevamente lo que es Material UI */}
      <CardContent
        sx={{ // seguimos utlizando lo que es Material UI, por eso el sx
          display: 'flex', // Para que podamos moverlo mas facil
          justifyContent: 'center', // Centramos 
          alignItems: 'center', // Centramos 
          paddingBottom: 3, // Ponemos un padding en la parte de abajo 
        }}
      >
        {/**Aqui utilizamos el icono y definimos lo que son estilos */}
        <Inventory2OutlinedIcon
          sx={{ // Seguimos usando Material UI
            fontSize: 60, // Tamaño del icono 
            color: '#f97316', // Colo del Icono 
          }}
        />
      </CardContent>
    </Card>
    </>
  );
}

export default BoxCard; // Exportacion para usar afuera en otros componentes







