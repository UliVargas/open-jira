import { FC, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

import { v4 as uuidv4 } from 'uuid'
import { NewEntry } from '../../components/ui'

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending - Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium consequuntur molestiae mollitia obcaecati, quas voluptates.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In-progress - Amet atque autem dolorem esse hic, magnam odit omnis quasi quis reprehenderit repudiandae',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Done - saepe sapiente similique sint tenetur unde vero voluptatem voluptatum',
      status: 'done',
      createdAt: Date.now() - 100000
    }
  ]
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = (description: string) => {

    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }
    dispatch({ type: '[Entry] Add-Entry', payload: newEntry })
  }
  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] Entry-updated', payload: entry})
  }


  return (
    <EntriesContext.Provider value={{
      ...state,
      // Methods
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}