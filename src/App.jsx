import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.scss";
import Home from "./components/home/Home";
import Login from "./components/User/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/User/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./components/Admin/Admin";
import EditFilms from "./components/EditFilms/EditFilms";
import UserZone from "./components/User/UserZone";
import { getCheckSession } from "./redux/auth/auth.actions";
import DetailsFilm from "./components/DetailsFilm/DetailsFilm";
import ReserveSeat from "./components/ReserveSeat/ReserveSeat";
import ConfirmTicket from "./components/ReserveSeat/ConfirmTicket";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCheckSession());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/private/*"
          element={<PrivateRoute component={<Admin />} />}
        />
        <Route
          path="/editFilms/:id"
          element={<PrivateRoute component={<EditFilms />} />}
        />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/gestion" element={<UserZone />}></Route>
        <Route path="/details/:id" element={<DetailsFilm />}></Route>
        <Route path="/preticket" element={<ReserveSeat />}></Route>
        <Route path="/editScreenings/:id" element={<ConfirmTicket />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
