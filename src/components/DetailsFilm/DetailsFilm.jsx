import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getScreenings } from '../../redux/screenings/screenings.actions';
import './detailsFilm.scss';
import { resetTempTicket, temporalTicket } from '../../redux/tickets/tickets.actions';

const DetailsFilm = () => {

    const { id } = useParams();
    const { film } = useSelector(state => state.film);
    const  { user } = useSelector(state => state.auth);
    const { screenings } = useSelector(state => state.screenings);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!film){
            navigate('/');
        }
        dispatch(resetTempTicket());
        dispatch(getScreenings(film[id])); 
       
        // eslint-disable-next-line   
    },[]);

    
    const dates = screenings.map(screening => {
        return screening.date;
    })
    const datesArray = dates.filter((item,index) => {
        return dates.indexOf(item) === index;
    });
    



    const handleDataPreTicket = (event) => {

        const filteredScreening = screenings.filter(screening => screening._id === event.target.id);
        let tempTicket = {
            idScreening: filteredScreening[0]['_id'],
            movie: film[id].name,
            hall: screenings[0].idHall.name,
            date: filteredScreening[0].date,
            hour: filteredScreening[0].hour,
            dimensionsHall: {
                rows: screenings[0].idHall.rows, 
                cols: screenings[0].idHall.cols
            },
        }
        
        if(user){
           tempTicket = {...tempTicket, clientEmail: user.email, clientName: user.name};
        }
        dispatch(temporalTicket(tempTicket, filteredScreening[0].takenSeat));
    }
    
    return (
        <section className="Container">
          <div className="details-container">
            <div className="details-up">
              <div className="details-up-1">
                <img
                  className="Film-img"
                  src={film[id].poster}
                  alt={film[id].name}
                />
              </div>
              <div className="details-up-2">
                <div className="Films-div-long">
                  <span className="Films-span">Título</span>
                  <p>{film[id].name}</p>
                </div>
                <div className="Films-div-long">
                  <span className="Films-span">Sinopsis</span>
                  <p>{film[id].synopsis}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Calificación:</span>
                  <p>{film[id].rated}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Duración:</span>
                  <p>{film[id].duration}min.</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Género:</span>
                  <p>{film[id].genre}</p>
                </div>
                <div className="Films-div">
                  <span className="Films-span">Director:</span>
                  <p>{film[id].director}</p>
                </div>
                <div className="Films-div-long">
                  <span className="Films-span">Actores:</span>
                  <p>{film[id].actors}</p>
                </div>
              </div>
            </div>
            <div className="details-down">
              <h1 className="SectionTitle">COMPRAR ENTRADAS</h1>
              <div className="details-dates">
                {datesArray.map((date, indexDate) => {
                  return (
                    <div key={`${indexDate}-${date}`} className="details-date">
                      <h3 key={`${indexDate}-${date}-h3`}>{date}</h3>
                      <div className="details-hour" key={`${indexDate}-details-hour`}>
                        {screenings.map((item, indexHour) => {
                          return item.date === date ? (
                            <div className="details-hour-links" key={`${indexDate}-${indexHour}-${date}`}>
                              <Link to="/preticket" key={`${item._id}-link`}>
                                <span id={item._id} onClick={handleDataPreTicket} key={`${item._id}-span`}>
                                  {item.hour}
                                </span>
                              </Link>
                            </div>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      );
}

export default DetailsFilm;