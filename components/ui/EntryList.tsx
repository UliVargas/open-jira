import { List, Paper } from '@mui/material'
import { DragEvent, FC, useContext, useMemo } from 'react'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { Entry, EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'
import styles from '../../styles/EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { isDragging, endDragging } = useContext(UIContext)
  const { entries, updateEntry } = useContext(EntriesContext)
  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
  
  const handleAllowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  const handleDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find(entry => entry._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }
  return (
    //TODO aquí haremos drop
    <div 
      onDrop={handleDropEntry}
      onDragOver={handleAllowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
        {/*TODO cambiará dependiendo de si estoy haciendo  drag o no*/}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
                <EntryCard key={entry._id} entry={entry}/>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}