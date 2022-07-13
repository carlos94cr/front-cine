import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, component }) => {
  if (user) return component;
  if (!user) return <Navigate to="/login" />;
};

export default connect((state) => ({ user: state.auth.user }))(PrivateRoute);