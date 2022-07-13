import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editTemporalTicket } from "../../redux/tickets/tickets.actions";


import './reserveseats.scss';

const ReserveSeat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticket, takenSeats } = useSelector(state => state.tickets);
    const { user } = useSelector(state => state.auth);
    const [selected, setSelected] = useState([]);
    const [btnDisabled, setBtnDisabled ] = useState(true);
    const [showLoginInfo, setShowLoginInfo] = useState(false);
    const [price, setPrice] = useState(5.50 || 7.50); 

   
    let numRows = ticket.dimensionsHall.rows;
    let numCols = ticket.dimensionsHall.cols;
    const rows = [];
    const cols = [];
    for(let i = 1; i <= numCols; i++){
        cols.push(i);
    }
    for(let i = 0; i< numRows; i++){
        if(i === 0){
            rows.push(0);
        }else{
            rows.push(numCols * i);
        }
    }
    
        
    useEffect(() => {
        const today = new Date().getDay();
        //Miercoles entrada del dia del espectador
        if(today === 3){
            setPrice(5.50);
        }else{
            setPrice(7.50);
        }
    },[]);
    
    
    const handleChecked = (event) => {
        if(event.target.checked){ 
            setSelected(current => [...current,Number(event.target.id)]);
            setBtnDisabled(false);
         }else{
            const uncheck = selected.filter((seat)=> seat !== Number(event.target.id));
            if(uncheck.length !== 0){
                setSelected(uncheck);
            }else{
                setSelected([]);
                setBtnDisabled(true);
            }
        }
    }

    const handleBtnBuy = (event) => {
        const aux = {...ticket};
        aux.mySeats = selected;
        aux.price = price * selected.length;
        if(user){
            aux.clientName = user.name;
            aux.clientEmail = user.email;
        }
        dispatch(editTemporalTicket(aux));  
        if(user){
            navigate(`/editScreenings/${ticket.idScreening}`);
        }else{
            setShowLoginInfo(true);
        }
        
    }

    return (
        <div className="Container">
        <div className="ticket-container">
          <section className="hall-container">
            <h2 className="SectionTitle2">Butacas</h2>
                {rows.map((row, i) => {
                    return (
                        <div key={`row${i}`} className='row-container' >
                            {cols.map((col, j) => {
                                return (
                                    <div key={`row${i}-col${j}`}>
                                    {!takenSeats 
                                        ? <input type="checkbox" id={row + col} onClick={handleChecked}  
                                            className="seat-1" key={`${i}-${j}seat-1`}
                                            />
                                        : takenSeats.indexOf(row+col) === -1 
                                            ?  <input type="checkbox" id={row + col} onClick={handleChecked}  
                                                className="seat-2" key={`${i}-${j}seat-2`}
                                                />
                                            : <div className="seat-3"></div>
                                
                                    }
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </section>
            <section className="preticket-container">
                <h2 className="SectionTitle2">Ticket</h2>
                <h3>{ticket.name}</h3>
                <p>{ticket.movie}</p>
                <div className="preticket-container-hall-time">
                    <p>{ticket.hall}</p>
                    <span>{`${ticket.date} - ${ticket.hour}`}</span>
                </div>
                <div>
                    <span>Butacas:</span>
                    {selected.length && selected.map((seat, index) =>{
                        return(
                            <span className="seat-number" key={`${index}-seat-number`}>{seat}</span>
                        );
                    })
                    }
                </div>
                <div>
                    <span>Total: </span>
                    <span>{selected.length * price}€</span>
                    <h2>Método de pago</h2>
                </div>
                { btnDisabled  
                    ? <button className="PrimaryBtn" disabled>Comprar entradas</button>
                    : <button className="PrimaryBtn" onClick={handleBtnBuy}>Comprar entradas</button>
                }
            </section>
            {showLoginInfo &&
                <div className="login-popup">
                    <p>Para poder realizar la compra de las entradas tiene que estar logueado:</p>
                    <p>
                        <span>Ya soy usuario,</span>
                        <span className="anchor-login" onClick={()=> navigate('/login')}>ir a Login</span>
                    </p>
                    <p>
                        <span>Aún no me he registrado,</span>
                        <span className="anchor-register" onClick={()=> navigate('/register')}>ir a Registro</span>
                    </p>
                </div>
            }
        </div>
        </div>
    );
}

export default ReserveSeat;