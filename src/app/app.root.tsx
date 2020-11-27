import React from 'react'
import { Text, View } from 'react-native'

import { AppProvider } from './app.provider'

export const AppRoot: React.VFC = () => (
  <AppProvider>
    <View>
      <Text>invst</Text>
    </View>
  </AppProvider>
)
