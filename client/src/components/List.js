import { Badge } from '@mantine/core'
import React, { useState } from 'react'
import { convertDate } from '../utils/functions/dates'
import localFrFormat from '../utils/functions/localFrFormat'

const List = ({_id: id, description,isConfirmed, unAvaiblityId, unAvaiblities, onClick, show, SetAppointmentId }) => {
    const handleClick = (id) => {
        onClick()
        SetAppointmentId(id)
    }
    return (

        <li style={{cursor: 'pointer'}} onClick={() => handleClick(id)} className="t-body">
            <span style={{ fontWeight: '600' }} className='t-left'>
                {/* <Badge> */}
                    {
                        description
                    }
                {/* </Badge> */}
                <Badge variant='dot' color={isConfirmed === null ? 'orange' : isConfirmed === true ? 'green' : isConfirmed === false ? 'pink' : null} sx={{marginLeft: '1.2rem'}}>
                    {
                        isConfirmed === null ? "En attente" : isConfirmed ? "Confirmé" : "Annulé"
                    }
                </Badge>

            </span>
            <span style={{
                // backgroundColor: "#3F73D7",
                padding: "0.2rem 0.3rem",
                borderRadius: "5px",
                color: "white"
            }}>
                <Badge color={!show ? 'red' : null}>
                    {
                        localFrFormat(unAvaiblities?.find(unAvaiblity => unAvaiblity._id === unAvaiblityId)?.day)
                    }
                </Badge>
            </span>
        </li>
    )
}

export default List