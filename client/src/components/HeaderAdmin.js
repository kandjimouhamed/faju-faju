import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Logout, NotificationOff, UserCircle } from 'tabler-icons-react'
import { Menu } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux';
import { clearAvaiblities } from '../redux/slices/unAvaiblitiesSlice';
import { clearAppointments } from '../redux/slices/appointmentsSlice';
import { clearUser } from '../redux/slices/userSlice';

const HeaderItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const isAdmin = user.role === 'admin' ? true : false
  const linkStyle = {
    textDecoration: 'none',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.3rem 2rem',
    marginLeft: '1rem',
    color: isAdmin ? '#DB4C3E' : '#3F73D7',
    fontSize: '0.9rem'
  }

  const logout = () => {
    dispatch(clearAvaiblities())
    dispatch(clearAppointments())
    dispatch(clearUser())

    window.localStorage.clear('persist:store')

    navigate("/login")
  }

  return (
    <header style={{ paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Home color='white' size={35} />
        <Link style={linkStyle} to={isAdmin ? "" : '/dashboard/appointements'} >Voir les rendez-vous</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NotificationOff style={{ color: 'white' }} color='white' size={35} />
        <Menu shadow="md" width={200} color="white">
          <Menu.Target>
            <button style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: '0.5rem 2rem',
              cursor: 'pointer'
            }}>
              <span style={{
                backgroundColor: 'white',
                color: isAdmin ? '#DB3C4E' : '#3F73D7',
                borderRadius: '50px',
                padding: '8px 10px'
              }}>A</span>
              <span style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white',
                padding: '0.5rem',
                fontSize: '1.2rem'
              }}>
                {
                  user.firstname + ' ' + user.lastname
                }
              </span>
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<UserCircle size={20} />}>Profile</Menu.Item>

            <Menu.Divider />

            <Menu.Item color="red" icon={<Logout color='red' size={20} />} onClick={logout} >Déconnexion</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  )
}

export default HeaderItem