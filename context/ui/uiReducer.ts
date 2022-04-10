import { UIState } from './'

type UIActionType =
  | { type: 'UI - open Sidebar' }
  | { type: 'UI - close Sidebar' }
  | { type: 'UI - set IsAddingEntry', payload: boolean }
  | { type: 'UI - start Dragging' }
  | { type: 'UI - end Dragging' }

export const UiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - open Sidebar':
      return {
        ...state,
        sideMenuOpen: true
    }
    case 'UI - set IsAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    case 'UI - close Sidebar':
      return {
        ...state,
        sideMenuOpen: false
      }
      case 'UI - start Dragging':
        return {
          ...state,
          isDragging: true
        }
        case 'UI - end Dragging':
        return {
          ...state,
          isDragging: false
        }
    default:
      return state
  }
}