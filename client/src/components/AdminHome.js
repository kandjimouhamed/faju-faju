import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUnAvaiblities } from "../redux/services/unAvaiblitiesServices";
import { getAppointments } from "../redux/services/appointmentsServices";
import { getUsers } from "../redux/services/usersServices";
import Dashboard from "./Dashboard";

const AdminHome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // setLoading(true);
        // get all avaiblities && appointments % && users
        dispatch(getAppointments());
        dispatch(getUnAvaiblities());
        dispatch(getUsers())
    }, []); 

    return (
        <>
            <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>
            <Dashboard />
        </>
    );
};

export default AdminHome;

/*


      
*/
