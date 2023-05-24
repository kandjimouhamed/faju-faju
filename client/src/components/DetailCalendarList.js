import React from 'react'

const DetailCalendarList = ({title, description}) => {
    const styleSpan = {
        fontSize: '0.8rem',
        fontWeight: "600"
    }
    const style = {
        borderBottom: '1px solid gray',
        marginTop: '0.5rem',
        paddingBottom: '0.6rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    return (
        <div style={style} >
            <span style={styleSpan}>{title}</span>
            <span style={{
                backgroundColor: "#b478ce",
                padding: "0.2rem 0.5rem",
                borderRadius: "5px",
                color: "white"
            }}>
                {
                    description
                }
            </span>
        </div>
    )
}

export default DetailCalendarList