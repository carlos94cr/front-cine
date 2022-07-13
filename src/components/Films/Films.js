import React from "react";

import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFilms } from "../../redux/films/films.actions";
import "./Films.scss";

const Films = () => {
  const { film } = useSelector((state) => state.film);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="SectionTitle">PELÍCULAS</h2>
      {film.length > 0 &&
        film.map((fil, index) => {
          return (
            <div className="FilmCard" key={index}>
              <div className="FilmCard-Left">
                <img className="Film-img" src={fil.poster} alt="film" />
              </div>
              <div className="FilmCard-Right">
                <div className="Films-div-long">
                  <span className="Films-span">Título</span>
                  <p>{fil.name}</p>
                </div>
                <div className="Films-div-long">
                  <span className="Films-span">Sinopsis</span>
                  <p>{fil.synopsis}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Calificación</span>
                  <p>{fil.rated}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Duración</span>
                  <p>{fil.duration}min.</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Género</span>
                  <p>{fil.genre}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Director</span>
                  <p>{fil.director}</p>
                </div>
                <div className="Films-div-long">
                  <span className="Films-span">Actores</span>
                  <p>{fil.actors}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Fecha estreno</span>
                  <p>{fil.iniDate}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Fecha fuera de cartelera</span>
                  <p>{fil.finDate}</p>
                </div>
                <div>
                  {fil.isActive === "true" && <p>Disponible en cartelera</p>}
                  {fil.isActive === "false" && (
                    <p>No disponible en cartelera</p>
                  )}
                </div>
                {user && (
                  <button
                    className="button"
                    onClick={() => {
                      dispatch(deleteFilms(fil));
                    }}
                  >
                    Eliminar
                  </button>
                )}
                {user && (
                  <Link to={`/editFilms/${index}`}>
                    <button>Modificar</button>
                  </Link>
                )}
                {/* {user && <button
                className="button"
                onClick={() => {
                  dispatch(editFilms(fil));
                }}
              >
               Editar
              </button>} */}
              </div>
            </div>
          );
        })}
    </>
  );
};
export default connect((state) => ({ user: state.auth.user }))(Films);
