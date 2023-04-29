import { List } from '@mantine/core'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ListItem = ({to, icon, label}) => {
    const user = useSelector(state => state.user)
    const isAdmin = user.role === 'admin' ? true : false;
    const className = isAdmin ? 'list-item--link' : 'list-item--link-user'
    return (
        <List.Item>
            <NavLink 
            style={({ isActive }) =>
              isActive ? {backgroundColor: isAdmin ? '#DB3C4E' : '#3F73D7', borderRadius: '5px', color: 'white '} : undefined
            } className={className} to={to}
            end
            >
                
                <span style={{marginRight: '0.5rem'}}>{icon}</span>
                {label}
            </NavLink>
        </List.Item>
    )
}

export default ListItem