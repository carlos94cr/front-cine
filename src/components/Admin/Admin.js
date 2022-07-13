import { useForm } from "react-hook-form";

import { addFilms, getFilms } from "../../redux/films/films.actions";
import { useDispatch, useSelector } from "react-redux";
import Films from "../Films/Films";
import { useEffect } from "react";
import "./Admin.scss";


const Admin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { film } = useSelector(state => state.film);
  

  const dispatch = useDispatch();

  useEffect(() => {
    if(film.length === 0){
      dispatch(getFilms());
      console.log(film);
    }
   // eslint-disable-next-line
  }, [film]);

  const onSubmit = (formData) => {
    if (formData.isActive === "true") {
      formData.isActive = true;
    } else {
      formData.isActive = false;
    }
    reset();
    
    dispatch(addFilms(formData));
  };

  return (
    <div className="Container">
      <h1 className="SectionTitle">ADMIN</h1>
      <div className="BigCard">
      <h2 className="SectionTitle">AÑADIR PELÍCULA</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="InputFilm">
            <span className="Admin-span">Título</span>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Please, enter a name"})}
            />

            {errors.name && errors.name.type === "required" && (
              <span>{errors.name.message}</span>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <span>{errors.name.message}</span>
            )}
          </div>

          <div className="InputFilm">
            <span className="Admin-span">Imagen</span>
            <input type="text" name="poster" {...register("poster")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Sinopsis</span>
            <input type="text" name="synopsis" {...register("synopsis")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Calificación</span>
            <input type="text" name="rated" {...register("rated")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Duración</span>
            <input type="number" name="duration" {...register("duration")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Género</span>
            <input type="text" name="genre" {...register("genre")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Director</span>
            <input type="text" name="director" {...register("director")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Actores</span>
            <input type="text" name="actors" {...register("actors")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Fecha Inicio</span>
            <input type="date" name="iniDate" {...register("iniDate")} />
          </div>
          <div className="InputFilm">
            <span className="Admin-span">Fecha Fin</span>
            <input type="date" name="finDate" {...register("finDate")} />
          </div>
          <div className="InputFilm">
            <select name="isActive" type="boolean" {...register("isActive")}>
              <option selected value="true">
                Disponible
              </option>
              <option value="false">No disponible</option>
            </select>
            {/* <span>En cartelera:</span>
            <input
              type="checkbox"
              name='isActive'
              checked='Disponible'
              value= 'true'
              {...register("isActive")}
            /> */}
          </div>

          <button className="PrimaryBtn">Añadir película</button>
        </form>
      </div>
      <div className="FilmsCard">
        <Films />
      </div>
    </div>
  );
};

export default Admin;

