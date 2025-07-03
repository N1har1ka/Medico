import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const { backendUrl, dToken, setAppointments, getAppointments } =
    useContext(DoctorContext);
  useEffect(() => {
    getAppointments();
  }, [dToken]);
  return <div>DoctorAppointments</div>;
};

export default DoctorAppointments;
