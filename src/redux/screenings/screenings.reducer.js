import * as actions from './screenings.actions'; 

const INITIAL_STATE = {
    screenings:[],
    error: ''
}

export const screeningsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
       
        case actions.GET_SCREENING: {
            return {...state, screenings: action.payload }; 
        }
       
        case actions.UPDATE_SEATS: {
            const {id, seats} = action.payload;
            const newScreenings = state.screenings.map((screening) => {
                if(screening._id !== id) return screening;
                return {
                    ...screening, 
                    takenSeat: [...screening.takenSeat, ...seats]
                }
            });
           return {...state, screenings: newScreenings };
        }
        case actions.ADD_SCREENING:{


            return { ...state, screenings:  action.payload};
           
        }
        case actions.UPDATE_SEATS_ERROR : {
            return {...state, error:action.payload };
        }
        case actions.GET_SCREENING_ERROR: {
            return {...state, error: action.payload };
        }
        case actions.EDIT_SCREENING_ERROR:{
            return { ...state, error: action.payload };   
        }
        case actions.ADD_SCREENING_ERROR:{
            return { ...state, error: action.payload };   
        }
        default:
            return {...state};
    }
}

