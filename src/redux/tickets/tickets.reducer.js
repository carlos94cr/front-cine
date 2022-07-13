import * as actions from './tickets.actions';

const INITIAL_STATE = {
    ticket:[],
    error: '',
    isTempTicket: false,
    takenSeats: []
};

export const ticketsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.ADD_TICKET: {
            return {...state, ticket: {...state.ticket, qr: action.payload._id}, isTempTicket: false };
        }
        case actions.ADD_TICKET_ERROR: {
            return {...state, error: action.payload, isTempTicket: false };
        }
        case actions.TEMPORAL_TICKET: {
            const { occupied, ticket } = action.payload;
            return {...state, takenSeats: occupied, ticket: ticket, isTempTicket: true };
        }
        case actions.GET_TICKETS_CLIENT: {
            return {...state, ticket: action.payload, isTempTicket: false};
        }
        case actions.RESET_TEMP_TICKET: {
            return { ...state, ticket:null, isTempTicket: false };
        }
        case actions.GET_TICKETS_CLIENT_ERROR: {
            return {...state, error: action.payload, isTempTicket: false};
        }
        case actions.EDIT_TEMPORAL_TICKET: {
            return {...state, ticket: action.payload}
        }
        default:
            return {...state };
    }
}