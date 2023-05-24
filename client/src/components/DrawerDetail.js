import { Badge } from '@mantine/core'
import React from 'react'

const DrawerDetail = ({color, title, badge}) => {
    return (
        <div className='drawer-detail'>
            <h6>{title}</h6>
            <Badge color={color}>{badge}</Badge>
        </div>
    )
}

export default DrawerDetail