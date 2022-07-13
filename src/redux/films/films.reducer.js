import * as actions from "./films.actions";

const INITIAL_STATE = {
  film: [],
  error: "",
  isPremiere: true
};

export const filmsReducer = (state = INITIAL_STATE, action) => {
  const { film } = state;

  switch (action.type) {

    case actions.ADD_FILM:
      return { ...state, film: [...film, action.payload] };

    case actions.EDIT_FILM: {
      const filmCopy = film.filter((fil) => fil._id !== action.payload._id);
      // encontrar en filmcopy la pelicula con id del que viene en el  payload y sobreescribir esa con action     
      return { ...state, film: [...filmCopy, action.payload] };
    }

    case actions.GET_FILM:
      return { ...state, film: [...action.payload], isPremiere: false };
    
    case actions.GET_PREMIERE:
      return {...state, film: action.payload, isPremiere: true };

    case actions.DELETE_FILM: {
      const filmsFiltered = film.filter((fil) => fil._id !== action.payload._id);
      return { ...state, film: [...filmsFiltered] };
    }

    case actions.ADD_FILM_ERROR:
      return { ...state, error: action.payload };

    case actions.EDIT_FILM_ERROR:
      return { ...state, error: action.payload };

    case actions.GET_FILM_ERROR:
      return { ...state, error: action.payload };
    
    case actions.GET_PREMIERE_ERROR:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};
