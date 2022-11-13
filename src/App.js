import './App.css';
import { useState, useEffect } from 'react';

function App() {
  let api_key = '65ac98c7e8553bc17656ed4fe49ec9d3';
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1)

  const anterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const siguiente = () => {
    if (pagina < 1000) {
      setPagina(pagina + 1);
    }
  };

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-MX&page=${pagina}`);

        switch(respuesta.status) {
          case 200:
            const datos = await respuesta.json();
            setPeliculas(datos.results);
            break;
          case 401:
            console.log("Key incorrecta");
            break;
          case 404:
            console.log("no disponible");
            break;
          default:
            console.log(`no tengo idea del error ${respuesta.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPeliculas();
  }, [pagina]);

  return (
    <div className="App">
      <div className='encabezado'>
        <h1>Peliculas</h1>
        <p>TMDB</p>
      </div>

      <div className="contenedor" id="contenedor">

        {peliculas.map((pelicula) =>
          <div className="pelicula">
            <img className="poster" src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} title={pelicula.overview} />
            <h3 className="titulo">{pelicula.title} </h3>
          </div>
        )}

      </div>

      <div className="paginacion">
        <button id="btnAnterior" onClick={anterior} >Anterior</button>
        <button id="btnSiguiente" onClick={siguiente} >Siguiente</button>
      </div>
    </div>
  );
}

export default App;
