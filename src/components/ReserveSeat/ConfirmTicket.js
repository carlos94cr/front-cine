import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSeats } from "../../redux/screenings/screenings.actions";
import {
  addTicket,
  editTemporalTicket,
} from "../../redux/tickets/tickets.actions";
import QRCode from "react-qr-code";
import StripeCheckout from "react-stripe-checkout";
import "./confirmTicket.scss";
import axios from "axios";
import Swal from "sweetalert2";

const ConfirmTicket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ticket } = useSelector((state) => state.tickets);
  const [showQr, setShowQr] = useState(false);

  let ticketToSaveDb = {};

  useEffect(() => {
    //COMPROBAR SI ESTO ES REDUNDANTE
    if (user && !ticket.email) {
      dispatch(
        editTemporalTicket({
          ...ticket,
          clientName: user.name,
          clientEmail: user.email,
        })
      );
    }
    if (ticket.qr) {
      setShowQr(true);
    }
    // eslint-disable-next-line
  }, [user, ticket.qr]);

  const handleToken = (token) => {
    axios
      .post("http://localhost:5000/checkout", { token, ticket })
      .then((res) => {
        if (res.data === "Purchased") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pago completado",
            showConfirmButton: true,
          });
          dispatch(addTicket(ticketToSaveDb));
        }
      })
      .catch((err) => {
        return err;
      });
  };

  const handleBuyTicket = () => {
    dispatch(updateSeats(ticket.idScreening, ticket.mySeats));
    ticketToSaveDb = {
      clientEmail: ticket.clientEmail,
      clientName: ticket.clientName,
      movie: ticket.movie,
      hall: ticket.hall,
      date: ticket.date,
      hour: ticket.hour,
      mySeats: ticket.mySeats,
      price: ticket.price,
    };
  };

  return (
    <div className="Container">
      <div className="confirm-ticket-container">
        <h1>{ticket.movie}</h1>
        <h2>{ticket.hall}</h2>
        <h2>{`Sesión: ${ticket.date} - ${ticket.hour}`}</h2>
        <h2>{`Butacas: ${ticket.mySeats}`}</h2>
        <h2>{user?.name}</h2>
        <h2>{user.email}</h2>
        <h2>{`Total: ${ticket.price}€`}</h2>

        {!showQr ? (
          <StripeCheckout
            name={ticket.movie}
            token={handleToken}
            stripeKey="pk_test_51LKmBRFPgUTVrozIkdXMhsRGxz7yKKSYMq7ebHwdISdDJroAknqCpNJh1Tu1RtjaFfXMza2dBKCaqWEhGvvXP9QZ00dHzhw9Vr"
            amount={ticket.price * 100}
            panelLabel="Pagar con tarjeta "
            currency="EUR"
          >
            <button onClick={handleBuyTicket}>Pagar con tarjeta</button>
          </StripeCheckout>
        ) : (
          <div className="ticket">
            <h2 className="SectionTitle">TICKET</h2>
            <div className="qr-container">
              <QRCode value={ticket?.qr} size={256} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmTicket;
