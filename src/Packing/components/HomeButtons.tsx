function HomeButtons () { 
  return (
    <div className="flex gap-6">
      <button
        className="flex items-center gap-2 bg-red-100 text-red-500 px-6 py-2 rounded-full border border-red-300 hover:bg-red-200 transition"
        onClick={() => alert("Botón de cancelar tocado")}
      >
         Cancelar proceso
      </button>

      <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
      onClick={()=> alert("El boton de proceso Finalizado fue tocado")}
      >
         Finalizar proceso
      </button>
    </div>
  );
}

export default HomeButtons;

































