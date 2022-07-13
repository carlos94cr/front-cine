
import axios from "axios";
export const ADD_FILM = "ADD_FILM";
export const DELETE_FILM = "DELETE_FILM";
export const DELETE_FILM_ERROR = "DELETE_FILM_ERROR";
export const EDIT_FILM = "EDIT_FILM";
export const ADD_FILM_ERROR = "ADD_FILM_ERROR";
export const EDIT_FILM_ERROR = "EDIT_FILM_ERROR";
export const GET_FILM = "GET_FILM";
export const GET_FILM_ERROR = "GET_FILM_ERROR";
export const GET_PREMIERE = "GET_PREMIERE";
export const GET_PREMIERE_ERROR = "GET_PREMIERE_ERROR";


export const getFilms = () => (dispatch) => {
  axios.get("http://localhost:5000/movies/admin", { withCredentials: true, })
    .then((res) => {
      dispatch({
        type: GET_FILM,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('Error to get films');
      dispatch({
        type: GET_FILM_ERROR,
        payload: err.message
      });
    })

};

export const addFilms = (newFilm) => (dispatch) => {

  axios.post("http://localhost:5000/movies/add", newFilm, { withCredentials: true, })
    .then((res) => {
      dispatch({
        type: ADD_FILM,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('Error to saved film');
      dispatch({
        type: ADD_FILM_ERROR,
        payload: err.message
      });
    })
};

export const editFilms = (editFilm) => (dispatch) => {
  axios.put(`http://localhost:5000/movies/edit/${editFilm._id}`, editFilm, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: EDIT_FILM,
        payload: editFilm, //res.data devuelve el que sustituye???
      });
    })
    .catch(err => {
      console.log('Error to saved film');
      dispatch({
        type: EDIT_FILM_ERROR,
        payload: err.message
      });
    })
};


export const deleteFilms = (filmToDelete) => (dispatch) => {
  
  axios.delete(`http://localhost:5000/movies/delete/${filmToDelete._id}`, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: DELETE_FILM,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('Error to delete film');
      dispatch({
        type: DELETE_FILM_ERROR,
        payload: err.message
      });
    })
};

export const getPremiereFilms = () => (dispatch) => {

  axios.get("http://localhost:5000/movies/premiere", { withCredentials: true })
  .then(res => {
    dispatch({
      type: GET_PREMIERE,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: GET_PREMIERE_ERROR,
      payload: err.message
    });
  });
}
