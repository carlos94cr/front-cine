import * as actions from './halls.action'; 

const INITIAL_STATE = {
    halls:[],
    error: ''
}

export const screeningsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
       
        case actions.GET_HALLS: {
            return {...state, halls: action.payload }; 
        }
        case actions.GET_HALLS_ERROR: {
            return {...state, error: action.payload };
        }
        
        
        default:
             return {...state};
    
            }}