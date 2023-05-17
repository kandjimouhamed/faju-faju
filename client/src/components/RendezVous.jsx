import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Grid, Table } from '@mantine/core'
import { btnStyle } from '../utils/linkStyle'

export default function RendezVous() {
  return (
    <div className='table-container'>
      <h1>Les Rendez vous fixées</h1>
      <Grid justify="flex-end">
        <button
        //  onClick={() => setOpenedModal((open) => !open)} style={btnStyle}
        style={btnStyle}>
          Programmer un Rendez vous
        </button>
      </Grid>

      <div>
      <Table>
      <thead>
        <tr>
          <th>Prénom patient</th>
          <th>Nom patient</th>
          <th>Date Rendez-vous</th>
          <th>Exisences</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       <tr>

              <td>{'patientId.firstname'}</td>
              <td>{'patientId.lastname'}</td>
              <td>{'patientId.phone'}</td>
              <td dangerouslySetInnerHTML={{__html : 'description'}}/>
              <td>
                <AiOutlineDelete
               
                />
              </td>
       </tr>
         
      

      </tbody>
    </Table>
     
      </div>
    </div>
  )
}
