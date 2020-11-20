import React from 'react'
import { render } from '@testing-library/react-native'

import { AppRoot } from './app.root'

describe('app root', () => {
  test('displays "invst" text', () => {
    const { getByText } = render(<AppRoot />)

    expect(getByText('invst')).toBeDefined()
  })
})
