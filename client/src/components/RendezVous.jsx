import React, { useEffect, useState } from 'react'
import { AiOutlineDelete,AiOutlineEdit } from 'react-icons/ai'
import { Grid, Table } from '@mantine/core'
import { btnStyle } from '../utils/linkStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getRendezvous } from '../redux/services/rendezvousService'
import AddRendezvous from './AddRendezvous'
import ModalConfirm from './ModalConfirm'

export default function RendezVous() {
  const [openedModal, setOpenedModal] = useState(false);
  const [id , setId] = useState(null)
  const [mode , setMode] = useState("")
  const [ouvre , setOuvre] = useState(false)
  const dispatch = useDispatch()
  const [rendezvous , setRendezvous] = useState({
    nomComplet : "",
    dateRendezvous : "",
    description: ""  
})
const [error , setError] = useState("")
  const stateRendezvous = useSelector((state) => state.rendezvous)
  // console.log(stateRendezvous)
 
  useEffect(() => {
    dispatch(getRendezvous())
  },[dispatch])
  return (
    <div className='table-container'>
      <h1>Rendez vous</h1>
      <Grid justify="flex-end">
        <button
         onClick={
          () => {
              setOpenedModal((open) => !open)
              setRendezvous({
                nomCompletPatient : "",
                dateRendezvous : "",
                description: "" 
              })
              setError("")
          }
      } 
        style={btnStyle}>
          Programmer un Rendez vous
        </button>
      </Grid>
      {
                    openedModal && mode === "update" ? (
                        <AddRendezvous
                            setOpened={setOpenedModal}
                            opened={openedModal}
                            title='Modifier un Rendez vous'
                            rendezvous={rendezvous}
                            setRendezvous={setRendezvous}
                            setError={setError}
                            error={error}
                        />
                    ) : (
                        <AddRendezvous
                            setOpened={setOpenedModal}
                            opened={openedModal}
                            title='Ajouter un Rendez vous'
                            rendezvous={rendezvous}
                            setRendezvous={setRendezvous}
                            setError={setError}
                            error={error}
                        />
                    )
                }


      <div>
      <Table>
      <thead>
        <tr>
          <th>Nom complet </th>
          <th>Date Rendez-vous</th>
          <th>Exisences</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          stateRendezvous?.data.map((rv)=>(

       <tr key = {rv._id}>
              <td>{rv.nomCompletPatient}</td>
              <td>{rv.dateRendezvous}</td>
              <td>{rv.description}</td>
              {/* <td dangerouslySetInnerHTML={{__html : 'description'}}/> */}
              <td>
              <AiOutlineEdit
                    onClick={() => {
                        setOpenedModal((open) => !open)
                        setMode('update')
                        setRendezvous(rv)
                    }}
                    />
                <AiOutlineDelete
                 onClick={() => {
                  setOuvre((open) => !open)
                  setId(rv._id)
                  }}
                />
              </td>
       </tr>
          ))
        }
         
      

      </tbody>
    </Table>
    {   
        ouvre && <ModalConfirm
        setOuvre={setOuvre} 
        ouvre={ouvre}
        title={'Confirmer la suppréssion'} 
        contenu={'Vous vous supprimer ce Rendez vous.'}
        rendezvous={"rendezvous"}
        // handleDelete={handleDelete}
        id={id} />
        }
     
      </div>
    </div>
  )
}
