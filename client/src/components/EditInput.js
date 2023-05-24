import { Collapse, TextInput } from '@mantine/core'
import React from 'react'
import { ClockHour12 } from 'tabler-icons-react'

const EditInput = ({ editForm, placeholder, name, form, type }) => {

    return (
        <Collapse sx={{ marginTop: '0.2rem' }} in={editForm}>
            <TextInput
                type={type}
                className="edit--input"
                icon={<ClockHour12 size={20} />}
                placeholder={placeholder}
                {...form.getInputProps(name)}
            />
        </Collapse>
    )
}

export default EditInput