import { FC, useReducer } from 'react'
import { UIContext, UiReducer } from './'

export interface UIState {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: 'UI - open Sidebar' })
  }
  const closeSideMenu = () => {
    dispatch({ type: 'UI - close Sidebar' })
  }
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - set IsAddingEntry', payload: isAdding })
  }
  const startDragging = () => {
    dispatch({ type: 'UI - start Dragging' })
  }
  const endDragging = () => {
    dispatch({ type: 'UI - end Dragging' })
  }

  return (
    <UIContext.Provider value={{
      ...state,
      // Method
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDragging,
      endDragging
    }}>
      {children}
    </UIContext.Provider>
  )
}