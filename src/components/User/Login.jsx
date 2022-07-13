import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/auth/auth.actions";
import "./User.scss";

const Login = () => {
  const { ticket, isTempTicket } = useSelector(state => state.tickets);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const goClientZone = (isTemp, idScreening) => {
      if(isTemp){
        navigate(`/editScreenings/${idScreening}`);
      }else{
        navigate("/");
      }
    }
    
    dispatch(loginUser(goClientZone,isTempTicket, ticket.idScreening, formData));
  };
  

  return (
      <div className="Container">
        <h1 className="SectionTitle">LOG IN</h1>
        <div className="BigCard">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Email</span>
              <input
                className="InputField"
                type="text"
                name="email"
                {...register("email")}
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                className="InputField"
                type="password"
                name="email"
                {...register("password")}
                required
              />
            </label>
            <button className="PrimaryBtn">Log In</button>
          </form>
        </div>
      </div>
  );
};

export default Login;
