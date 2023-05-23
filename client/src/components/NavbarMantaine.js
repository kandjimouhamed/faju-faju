import { List, Navbar, createStyles } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import adminData from '../utils/adminData'
import ListItem from './ListItem'
import { useSelector } from 'react-redux';
import userData from '../utils/userData';


const useStyles = createStyles((theme) => ({
  Navbar : {
    display : "flex",
    width : "20%",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display : "none"
    } 
  }
}))


const NavbarMantaine = () => {
     //gestion de la responsivite
     const {classes} = useStyles()
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   // End gestion de la responsivite
    const user = useSelector(state => state.user)
    const isAdmin = user.role === 'admin' ? true : false
    useEffect(() => {
        const hundleResize = () => {
          if (window.innerWidth < 734 && open === false) {
            setOpen(true);
          }
          if (window.innerWidth > 734) {
            setOpen(false);
          }
        };
        window.addEventListener("resize", hundleResize);
      }, [open]);
    return (  

            <Navbar className={classes.Navbar} sx={{ minHeight: '100vh' }} 
            // width={{
            //     // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
            //     sm: 250,
    
            //     // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
            //     // md: 250,

            //     // md : 0, 
    
            //     // When other breakpoints do not match base width is used, defaults to 100%
            //     base: 200,
            // }}
             p="lg"
            >
                <List
                    spacing="lg"
                    size="md"
                    center
                    sx={{ listStyle: 'none' }}
                >
                    {
                        isAdmin ? adminData.map(data => (
                            <ListItem key={data.to} {...data} />
                        )) : userData.map(data => (
                            <ListItem key={data.to} {...data} />
                        ))
                    }
                </List>
            </Navbar>
)}

export default React.memo(NavbarMantaine)