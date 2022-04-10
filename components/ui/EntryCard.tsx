import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }
  const handleDragEnd = () => {
    endDragging()
  }

  return (
    <div>
      <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <CardActionArea>
          <CardContent>
             <Typography sx={{ whiteSpace: 'pre-line' }}>
               {entry.description}
             </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
            <Typography variant={'body2'}>Hace 30 minutos</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  )
}