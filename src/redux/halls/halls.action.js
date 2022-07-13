import axios from 'axios';


export const GET_HALLS = 'GET_HALLS';
export const GET_HALLS_ERROR = 'GET_HALLS_ERROR';






export const getHalls = () => dispatch => {

    axios.get(`http://localhost:5000/halls/`, { withCredentials:true })
    .then(res => {
        dispatch({
            type: GET_HALLS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: GET_HALLS_ERROR,
            payload: err.message
        });
    })
}


