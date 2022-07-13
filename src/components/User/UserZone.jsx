import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPersonalUser } from "../../redux/auth/auth.actions";

import "./User.scss";
import Historial from "./Historial";
import { getTicketsByClient } from "../../redux/tickets/tickets.actions";

const UserZone = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    register: registerPersonal,
    setValue: setValuePersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errors2 },
  } = useForm();
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showHistorial, setShowHistorial] = useState(false);

  useEffect(() => {
    setValuePersonal("name", user.name);
    setValuePersonal("phone", user.phone);
    dispatch(getTicketsByClient(user.email));
    // eslint-disable-next-line
  }, [user.name, user.phone]);

  const showToChangePassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setValue("password", "", { shouldDirty: true });
      setValue("password2", "", { shouldDirty: true });
      setVisible(false);
    }
  };

  const onSubmitPassword = (formData) => {
    const newPass = { _id: user._id, password: formData.password };
    dispatch(editPersonalUser(newPass));
  };

  const showToChangePersonal = () => {
    if (disabled) {
      setDisabled(false);
    } else {
      setValuePersonal("name", user.name, { shouldDirty: true });
      setValuePersonal("phone", user.phone, { shouldDirty: true });
      setDisabled(true);
    }
  };

  const onSubmitPersonal = (formData) => {
    const newData = {
      _id: user._id,
      name: formData.name,
      phone: formData.phone,
    };
    dispatch(editPersonalUser(newData));
    setDisabled(true);
  };

  return (
    <div className="Container">
    <button className="PrimaryBtn" onClick={() => setShowHistorial(false)}>DATOS PERSONALES</button>
    <button className="PrimaryBtn" onClick={() => setShowHistorial(true)}>HISTORIAL</button>
    { !showHistorial ?
      <>
      <h1 className="SectionTitle">ACCOUNT</h1>
      <div className="BigCard">
        
        <section className="personal-data">
          <span className="Users-span">{user.email}</span>
          <form onSubmit={handleSubmit(onSubmitPassword)}>
            <input
              type="password"
              name="password"
              className={visible ? "InputField" : "password-invisible"}
              {...register("password", {
                required: "Please, enter password",
                pattern: {
                  // eslint-disable-next-line
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                  message: "Wrong format password",
                },
              })}
            />
            <input
              type="password"
              name="password2"
              className={visible ? "InputField" : "password-invisible"}
              {...register("password2", {
                validate: {
                  equalToPassword: () =>
                    getValues("password") === getValues("password2"),
                },
              })}
            />
            {errors?.password2 && <p>Passwords are different</p>}
            <button
              type="submit"
              className={visible ? "PrimaryBtn" : "password-invisible"}
            >
              Guardar cambios
            </button>
          </form>

          <button className="PrimaryBtn" onClick={() => showToChangePassword()}>
            {visible ? "Cancelar" : "Editar password"}
          </button>

          <form onSubmit={handleSubmitPersonal(onSubmitPersonal)}>
            <span className="Users-span">Nombre</span>
            <input
              className="InputField"
              type="text"
              name="name"
              disabled={disabled}
              {...registerPersonal("name", { required: `Name can't be null` })}
            />
            {errors2?.name && <p>{errors2.name.message}</p>}
            <span className="Users-span">Teléfono</span>
            <input
              className="InputField"
              type="text"
              name="phone"
              disabled={disabled}
              {...registerPersonal("phone", {
                required: "Please, enter phone",
                pattern: {
                  value: /^\d{9}$/,
                  message: "Wrong format phone",
                },
              })}
            />
            {errors2?.phone && <p>{errors2.phone.message}</p>}
            <button
              type="submit"
              className={disabled ? "password-invisible" : "PrimaryBtn"}>
              Guardar cambios
            </button>
          </form>

          <button className="PrimaryBtn" onClick={() => showToChangePersonal()}>
            {disabled ? "Editar datos" : "Cancelar"}
          </button>

        </section>
        </div>  
        </>
        :  <Historial/>
    }
      
    </div>
  );
};

export default UserZone;
