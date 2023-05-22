import { Alert, Input, InputBase, Modal, Tooltip, createStyles, Textarea } from '@mantine/core'
import { DateInput, DatePickerInput  } from '@mantine/dates';
import React, { useState } from 'react'
import { btnStyle } from '../utils/linkStyle';
import { IconAlertCircle, IconAt, IconBrandTwitter } from '@tabler/icons';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import instance from '../axios/globalInstance';
// import { updatePatients } from '../redux/services/patientService';
import { toast } from 'react-hot-toast';
import { updateRendezvous } from '../redux/services/rendezvousService';



const useStyles = createStyles((theme) => ({
   
    input : {
      margin : "20px 0"
    }
  }));

function AddRendezvous({opened , setOpened , title , rendezvous , setRendezvous , error , setError}) {


    // ############################################## STYLE DE L'APP #############################################
    const modules = {
        toolbar : [
          [{ headers : [1, 2 , 3 , 4 , 5 ,6 ,false] }],
          [{font : []}],
          [{  size : [] }],
          ['bold' , 'italic' , 'underline' , 'strike' , "blockquote"],
          [
            {list : "ordered"},
            {list : "bullet"},
            {indent : "-1"},
            {indent : "+1"}
          ],
          ["link" , "image" , "video"]
        ]
    }
    const {classes} = useStyles()
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(rendezvous)

        if(rendezvous.nomCompletPatient === "" || rendezvous.dateRendezvous ==="" || rendezvous.description==="") {
          setError("Viellez remplire ce champ .")
        } else {
          if(rendezvous._id) {
            dispatch(updateRendezvous(rendezvous))
            .then(() => {
              setOpened(false)
              toast('Rendez vous modifié avec success', {icon: '👏',});
            })
            .catch((err) => {
              console.log(err);
              toast('Error')
            })
  
          } 
          else {
            try {
                await instance.post("/rendezvous", rendezvous) 
                setOpened(false)
                toast('Rendez vous ajoutée avec success', {icon: '👏',});
                setRendezvous({
                  nomCompletPatient : "",
                  dateRendezvous : "",
                  description : "",
                 
              })
        
            }
            catch (err) {
                console.log(err.response.data);
                toast(err.response.data.error)
            }
          }
        }
    }
  return (
    <div>
      <Modal
      radius="lg"
      overlayOpacity={0.43}
      overlayBlur={2}
      opened={opened}
      onClose={() => setOpened(false)} 
      title={title}
    >
    <form onSubmit={handleSubmit}>
      <Input.Wrapper 
      className={classes.input}
       id={'3'} 
       label="Entrez votre Nom Complet" 
       required 
      //  maw={320} mx="auto"
       >
        <Input
        //   icon={<IconBrandTwitter size="1rem" />}
            value={rendezvous.nomCompletPatient}
            onChange={(e) => setRendezvous({...rendezvous , nomCompletPatient : e.target.value})}
            placeholder="Nom Complet"
            rightSection={
                <Tooltip label="This is public" position="top-end" withArrow>
                <div>
                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                </div>
                </Tooltip>
            }
        /> 
        {
        error === "Viellez remplire ce champ ." && rendezvous.nomCompletPatient === "" && (
            <Alert icon={<IconAlertCircle size="1rem" />} color="red">
              {error}
            </Alert>
          )
        }
      </Input.Wrapper>
     
     <Input.Wrapper className={classes.input} id={'3'} label="Chioisir votre date de Rendez vous" required maw={320} mx="auto">
      
        {/* <Input
      
        value={rendezvous.dateRendezvous}
        onChange={(e) => setRendezvous({...rendezvous , dateRendezvous : e.target.valueAsDate})}
            placeholder="date"
            type ='date'
            rightSection={
                <Tooltip label="This is public" position="top-end" withArrow>
                <div>
                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                </div>
                </Tooltip>
            }
        />  */}
        {
        error === "Viellez remplire ce champ ." && rendezvous.dateRendezvous === "" && (
            <Alert icon={<IconAlertCircle size="1rem" />} color="red">
              {error}
            </Alert>
          )
        }
      </Input.Wrapper>
      {/* <DateInput 
  
             value={rendezvous.dateRendezvous}
             onChange={(e) => setRendezvous({...rendezvous , dateRendezvous : e.target.value})}
            placeholder="Date de Rendez vous"
            /> */}
      {/* <Input.Wrapper className={classes.input} id={'3'} label="Entrez votre Description" required maw={320} mx="auto">
        <Input
            value={rendezvous.description}
            onChange={(e) => setRendezvous({...rendezvous , description : e.target.value})}
            placeholder="Nom Complet"
            rightSection={
                <Tooltip label="This is public" position="top-end" withArrow>
                <div>
                    <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                </div>
                </Tooltip>
            }
        /> 
        {
        error === "Viellez remplire ce champ ." && rendezvous.description === "" && (
            <Alert icon={<IconAlertCircle size="1rem" />} color="red">
              {error}
            </Alert>
          )
        }
      </Input.Wrapper> */}
          {/* <DatePickerInput 
           className={classes.input}
             value={rendezvous.dateRendezvous}
            //  valueFormat="DD/MM/YYYY"
            //  onChange={(e) => setRendezvous({...rendezvous , dateRendezvous : e.target.value})}
             label="Chioisir votre date de Rendez vous"
            placeholder="Date de Rendez vous"
            /> */}
            <div>
              <input type="date" placeholder = 'date de rendez vous'
               value={rendezvous.dateRendezvous}
               name = 'dateRendezvous'
             onChange={(e) => setRendezvous({...rendezvous , dateRendezvous : e.target.value})} />
            </div>
     
      <Textarea
       value={rendezvous.description}
       onChange={(e) => setRendezvous({...rendezvous , description : e.target.value})}
        placeholder="Description"
        label="Entrez votre Description"
        autosize
        minRows={2}
      />
        {
        error === "Viellez remplire ce champ ." && rendezvous.description === "" && (
            <Alert icon={<IconAlertCircle size="1rem" />} color="red">
              {error}
            </Alert>
          )
        }
    

      <button 
       style={{ ...btnStyle, width: '100%', padding: '0.8rem' }} type="submit">
                       
                        {
                          rendezvous._id ? "Modifier" : "Ajouter"
                        }
                        
      </button>
    </form>
      </Modal>
    </div>
  )
}

export default AddRendezvous
