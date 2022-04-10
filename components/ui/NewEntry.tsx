import { ChangeEvent, useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
  const { addNewEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSave = () => {
    if (inputValue.length === 0) return

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setIsTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {
        isAddingEntry 
        ? (
          <>
            <TextField
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 1
              }}
              autoFocus
              multiline
              label='Nueva Entrada'
              helperText={isTouched && inputValue.length <= 0 && 'Ingrese un valor'}
              value={inputValue}
              onChange={handleChange}
              onBlur={() => setIsTouched(true)}
              error={isTouched && inputValue.length <= 0}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={() => {
                  setIsTouched(false)
                  setIsAddingEntry(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon  />}
                onClick={handleSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) 
        : (
          <>
            <Button
              startIcon={<AddCircleOutlineOutlinedIcon />}
              fullWidth
              variant='outlined'
              onClick={() => setIsAddingEntry(true)}
            >
              Agregar Tarea
            </Button>
          </>
        )
      }
    </Box>
  )
}