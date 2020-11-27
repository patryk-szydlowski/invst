import React from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { createStore } from './store'

export const AppProvider: React.FC = ({ children }) => (
  <React.StrictMode>
    <StoreProvider store={createStore()}>{children}</StoreProvider>
  </React.StrictMode>
)
