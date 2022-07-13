import { useState } from "react";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";


import './historial.scss';


const Historial = () => {

    const { ticket } = useSelector(state => state.tickets);
    const [showQr, setShowQr] = useState(false);
    const [valueQr, setValueQr] = useState('');

   
    const handleShowQr = (event) => {
        setShowQr(true);
        setValueQr(event.target.id);
    }

    return(
        <section className="history-data">
            
            <div>
                { ticket && ticket.map((item) => {
                    return(
                        <div className="history-ticket" key={ticket._id}>
                            <span>{item.movie}</span>
                            <span>{item.hall}</span>
                            <span>{item.date}</span>
                            <span>{item.hour}</span>
                            <span>{item.mySeats}</span>
                            <span className="qr-anchor" id={item._id} onClick={handleShowQr}>QR</span>
                        </div>
                        
                    );
                })
                }
            </div>
            {showQr &&
                <QRCode value={valueQr} size={256}/>
            }
        </section>
    );
}

export default Historial;