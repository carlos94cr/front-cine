import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPremiereFilms } from "../../redux/films/films.actions";
import "./Home.scss";

const Home = () => {
    const { film } = useSelector(state => state.film);
    const { isPremiere } = useSelector(state => state.film);
    const dispatch = useDispatch();
    //Lo pongo asi porque solo quiero que haga el dispatch cuando cargue la pagina por 1º vez
    // y cuando venga de administracion porque film contendra las inactivas y solo queremos mostrar las activas
    useEffect(() => {
        if (film.length === 0){
            dispatch(getPremiereFilms());
        }
        if(!isPremiere){
            dispatch(getPremiereFilms());
        }
        // eslint-disable-next-line
    }, [isPremiere, film]);
    return (
        <>
          <h1 className="SectionTitle">CARTELERA</h1>
          <section className="cartelera-all">
            {film.length > 0 &&
              film.map((fil, index) => {
                return (
                  <div key={fil._id}>
                    <Link className="cartelera-card" to={`/details/${index}`}>
                      <div className="cartelera-card-black">
                        <img
                          className="cartelera-card-img"
                          src={fil.poster}
                          alt={fil.name}
                        />
                      </div>
                      <h2>{fil.name}</h2>
                      <h2 className="details">VER DETALLES</h2>
                    </Link>
                  </div>
                );
              })}
          </section>
        </>
      );
}

export default Home;