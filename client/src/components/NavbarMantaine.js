import { List, Navbar } from '@mantine/core'
import React from 'react'
import adminData from '../utils/adminData'
import ListItem from './ListItem'
import { useSelector } from 'react-redux';
import userData from '../utils/userData';

const NavbarMantaine = () => {
    const user = useSelector(state => state.user)
    const isAdmin = user.role === 'admin' ? true : false
    return (
        <Navbar className='navbar' sx={{ minHeight: '100vh' }} width={{
            // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
            sm: 200,

            // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
            lg: 250,

            // When other breakpoints do not match base width is used, defaults to 100%
            base: 200,
        }} p="lg">
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
    )
}

export default React.memo(NavbarMantaine)