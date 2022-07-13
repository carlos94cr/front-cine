import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../redux/auth/auth.actions";
import "./User.scss";

const Register = () => {

    const { ticket, isTempTicket } = useSelector(state => state.tickets);
    const { register, handleSubmit, formState:{errors} } = useForm();
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
        dispatch(registerUser(goClientZone, isTempTicket, ticket.idScreening, formData));
    }

  return (
    <div className="Container">
      <h1 className="SectionTitle">REGISTER</h1>
      <div className="BigCard">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>Email</span>
                <input className="InputField" type="text" name="email" {...register('email', { 
                    required: "Please, enter a mail",
                    pattern: {
                        // eslint-disable-next-line
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Wrong format mail"
                    } 
                })}/>
                {errors.email && errors.email.type === 'required' && <span>{errors.email.message}</span>}          
                {errors.email && errors.email.type === 'pattern' && <span>{errors.email.message}</span>}
            </label>

            <label>
                <span>Password</span>
                <input className="InputField" type="password" name="password" {...register('password', { 
                    required: "Please, enter password",
                    pattern: {
                        // eslint-disable-next-line
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        message: "Wrong format password"
                    } 
                })}/>
                {errors.password && errors.password.type === 'required' && <span>{errors.password.message}</span>}          
                {errors.password && errors.password.type === 'pattern' && <span>{errors.password.message}</span>}
            </label>

            <label>
                <span>Name</span>
                <input className="InputField" type="text" name="name" {...register('name', {required: "Please, enter name" })}/>
                {errors.name && errors.name.type === 'required' && <span>{errors.name.message}</span>}          
            </label>
            <label>
                <span>Phone</span>
                <input className="InputField" type="text" name="phone" {...register('phone', { 
                    required: "Please, enter phone",
                    pattern: {
                        value: /^\d{9}$/,
                        message: "Wrong format phone"
                    }
                })}/>
                {errors.phone && errors.phone.type === 'required' && <span>{errors.phone.message}</span>}          
                {errors.phone && errors.phone.type === 'pattern' && <span>{errors.phone.message}</span>}
            </label>
            <button className="PrimaryBtn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
