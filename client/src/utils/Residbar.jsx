import React from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HiBellAlert } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Navbar, List } from '@mantine/core';
import { useSelector } from "react-redux";
import ListItem from '../components/ListItem'
import adminData from "./adminData";
import userData from "./userData";

export default function Residbar({ show, handleClose }) {
    const user = useSelector(state => state.user)
    const isAdmin = user.role === 'admin' ? true : false


  return (
    <>
    <Offcanvas
      className=""
      show={show}
      onHide={handleClose}
    //   style={{ width: "50%", height: "100vh" , backgroundColor: "rgb(0, 151, 136)"}}
    >
      {/* <Offcanvas.Header closeButton></Offcanvas.Header> */}
      <Offcanvas.Body>
          <div className="d-flex justify-content-end pt-2 pe-2">
            <AiOutlineClose
              onClick={handleClose}
              className="icon-close fs-1"
              style={{ color: "red" }}
            />
          </div>
        <div className="siidbar">
          {/* <div className='sidbar'> */}
          <h3 className='title-sidbar1'>Welcome</h3>
          <ul>
          <li>
            <NavLink
              to="/accueil"
              className={`humburger linklien1 linkUsers opacity-100 py-2`}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#000" : "",
                  backgroundColor: isActive ? "rgba(245, 245, 245)" : "",
                  fontWeight: isActive ? "300" : undefined,
                };
              }}
            >
                <MdDashboard
                  className={`icon icon-accueil iconModif opacity-100`}
                />
              Dashboard
            </NavLink>
              
          </li>
          <li>
            <NavLink
              to="/users"
              className={`humburger linklien1 linkUsers opacity-100 py-2`}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#355BC0" : "",
                  backgroundColor: isActive ? "rgba(245, 245, 245)" : "",
                  fontWeight: isActive ? "300" : undefined,
                };
              }}
            >
                <HiUsers
                  className={`icon icon-accueil iconModif opacity-100`}
                />
              Utilisateurs
            </NavLink>
              
          </li>
          <li>
            <NavLink
              to="/alert"
              className={`humburger linklien1 linkUsers opacity-100`}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#355BC0" : "",
                  backgroundColor: isActive ? "rgba(245, 245, 245)" : "",
                  fontWeight: isActive ? "300" : undefined,
                };
              }}
            >
                <HiBellAlert
                  className={`icon icon-accueil iconModif opacity-100`}
                />
              Alerts
            </NavLink>
              
          </li>
         
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  </>
   
  );
}
