import { Entry } from '../../interfaces'
import {  } from './'
import { EntriesState } from './EntriesProvider'

type EntriesActionType =
  | { type: '[Entry] Add-Entry', payload: Entry }
  | { type: '[Entry] Entry-updated', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
      case '[Entry] Entry-updated':
        return {
          ...state,
          entries: state.entries.map(entry => {
            if (entry._id === action.payload._id) {
              entry.status = action.payload.status
            }
            return entry
          })
        }
    default:
      return state
  }
}