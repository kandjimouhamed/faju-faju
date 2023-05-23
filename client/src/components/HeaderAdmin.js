import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Logout, NotificationOff, UserCircle } from "tabler-icons-react";
import {
  Menu,
  Burger,
  Drawer,
  Group,
  Button,
  List,
  Navbar,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { clearAvaiblities } from "../redux/slices/unAvaiblitiesSlice";
import { clearAppointments } from "../redux/slices/appointmentsSlice";
import { clearUser } from "../redux/slices/userSlice";
import { FaBars } from "react-icons/fa";
import "../assets/styles/css/HeaderAdmin.css";
import adminData from "../utils/adminData";
import ListItem from "./ListItem";
import userData from "../utils/userData";
// import { useDisclosure } from '@mantine/hooks';
// import { Drawer, Group, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  Notification: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
  BtnRendezVous: {
    display : "flex",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
      backgroundColor : 'red'
    },
    // [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    //   display : "none"
    // }
  },
  Burger : {
    display : 'flex',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
  Drawer : {
    display : 'block',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  }
}));

const HeaderItem = () => {
  const [opened, { open, close }] = useDisclosure(false);

  //gestion de la responsivite
  const [open1, setOpen1] = useState(false);
  const [show, setShow] = useState(true);
  // const handleClose = () => setShow(false);
  // const handleShow = () => {
  //   setShow(true);
  //   console.log('show')
  // }
  // End gestion de la responsivite
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAdmin = user.role === "admin" ? true : false;
  const linkStyle = {
    textDecoration: "none",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.3rem 2rem",
    marginLeft: "1rem",
    color: isAdmin ? "#DB4C3E" : "#3F73D7",
    fontSize: "0.9rem",
  };

  const logout = () => {
    dispatch(clearAvaiblities());
    dispatch(clearAppointments());
    dispatch(clearUser());
    window.localStorage.clear("persist:store");
    navigate("/login");
  };
  // const hundleClick =() =>{
  //   setShow(true)
  //   console.log(show)
  //   return open;

  // }

  useEffect(() => {
    // if(show === false){
    //   setShow(true)

    // }
    // console.log(show)
    const hundleResize = () => {
      if (window.innerWidth < 734 && open1 === false) {
        setOpen1(true);
      }
      if (window.innerWidth > 734) {
        setOpen1(false);
      }
    };
    window.addEventListener("resize", hundleResize);
    // setShow(true)
  }, [open1]);

  return (
    <>
      <header
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className={classes.BtnRendezVous}
          // style={{ display: "flex", alignItems: "center" }}
        >
          <Home color="white" size={35} />
          <Link
            style={linkStyle}
            to={isAdmin ? "" : "/dashboard/appointements"}
          >
            Voir les rendez-vous
          </Link>
        </div>


          <Group className={classes.Burger} position="center">
            <Burger color="#fff" onClick={open} />
          </Group>

        <div style={{ display: "flex", alignItems: "center" }}>
          <NotificationOff
            className={classes.Notification}
            style={{ color: "white" }}
            color="white"
            size={35}
          />
          <Menu shadow="md" width={200} color="white">
            <Menu.Target>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "0.5rem 0rem",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    backgroundColor: "white",
                    color: isAdmin ? "#DB3C4E" : "#3F73D7",
                    borderRadius: "50px",
                    padding: "8px 10px",
                  }}
                >
                  A
                </span>
                <span
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "white",
                    padding: "0.5rem",
                    fontSize: "1.2rem",
                  }}
                >
                  {user.firstname + " " + user.lastname}
                </span>
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<UserCircle size={20} />}>Profile</Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                icon={<Logout color="red" size={20} />}
                onClick={logout}
              >
                Déconnexion
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        
      </header>
      {show === true || (open1 === true && show === false) ? (
        <Drawer className={classes.Drawer} opened={opened} onClose={close}>
          {/* <Navbar className='navbar' sx={{ minHeight: '100vh' }} width={{
                // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
                sm: 200,
    
                // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
                lg: 250,
    
                // When other breakpoints do not match base width is used, defaults to 100%
                base: 200,
            }} p="lg"> */}
          <List spacing="lg" size="md" center sx={{ listStyle: "none" }}>
            {isAdmin
              ? adminData.map((data) => <ListItem key={data.to} {...data} />)
              : userData.map((data) => (
                  <ListItem
                    key={data.to}
                    {...data}
                    setShow={setShow}
                    opened={opened}
                    onClose={close}
                  />
                ))}
          </List>
          {/* </Navbar> */}
        </Drawer>
      ) : (
        <></>
      )}

      {/* <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group> */}
    </>
  );
};

export default HeaderItem;
