import axios from 'axios'
import React, { useState } from 'react'
import instance from '../axios/globalInstance';


export default function SmsSendTest() {
    const [recipent , setRecipent] = useState('')
    const [textMessage ,  setTextMessage] = useState('')

    const sendSms = async () => {
        setRecipent('+221765729896')
        setTextMessage("Vous avez rendez-vous demain.")
        await instance.post('/sms' ,{
            recipent,
            textMessage
        })
    }
  return (
    <div>
      <button style={{margin : '50px' , padding : '50px'}} onClick={sendSms}>sms</button>
    </div>
  )
}
