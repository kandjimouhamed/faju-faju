import { Grid, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {btnStyle} from '../utils/linkStyle'
import AddPrescription from './AddPrescription';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescription , deletePrescription } from '../redux/services/prescriptionService';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ModalConfirm from './ModalConfirm';

export default function Prescription() {
    const [openedModal, setOpenedModal] = useState(false);
    const [ouvre , setOuvre] = useState(false)
    const dispatch = useDispatch()
    const prescriptions = useSelector((state) => state.prescription)
    const [id , setId] = useState(null)
    const [ mode , setMode] = useState('') 
    const [prescription , setPrescription ] = useState({
      description  : "",
      patientId : ""
    })
  
    
    useEffect(() => {
      dispatch(getPrescription())
    },[dispatch])


  return (
    <div className='table-container'>
      <h1>Prescription</h1>
      <Grid justify="flex-end">
        <button
         onClick={() => {
          setPrescription({
            description  : "",
            patientId : ""
          })
          setOpenedModal((open) => !open)}} 
         style={btnStyle}
         >
          Ajouter une préscription médicale
        </button>
      </Grid>
      {openedModal  && mode === "update" ? (
        <AddPrescription opened={openedModal}
          setOpened={setOpenedModal}
          title="Modifier une préscription"
          mode={mode}
          prescription={prescription}
          setPrescription={setPrescription}
        />
      ) : (
        <AddPrescription 
          opened={openedModal}
          prescription={prescription}
          setPrescription={setPrescription}
          setOpened={setOpenedModal}
          title="Ajouter une préscription" />
        )}

      <div>
      <Table>
      <thead>
        <tr>
          <th>Prénom patient</th>
          <th>Nom patient</th>
          <th>Numéro téléphone</th>
          <th>Prescription</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          prescriptions?.data.map((prescription) => (
            <tr key={prescription?._id}>
              <td>{prescription?.patientId?.firstname}</td>
              <td>{prescription?.patientId?.lastname}</td>
              <td>{prescription?.patientId?.phone}</td>
              <td dangerouslySetInnerHTML={{__html :prescription.description}}/>
              <td className='d-flex'>
                <div>
                  <AiOutlineDelete
                    onClick={() => {
                      setOuvre((open) => !open)
                      setId(prescription._id)
                    }}
                  />
                </div>
                <div className=''>
                <AiOutlineEdit 
                  onClick={() => {
                    setOpenedModal((open) => !open)
                    setMode('update')
                    setPrescription(prescription)
                  }}
                 />
                </div>
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
          contenu={'Vous vous supprimer cette préscription.'}
          // handleDelete={handleDelete}
          id={id} />
        }
      </div>
    </div>
  )
}
