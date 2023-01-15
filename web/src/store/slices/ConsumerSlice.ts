import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../'

// depois tipar
const initialState: any = {
  consumer: null,
}

const consumerSlice = createSlice({
  name: 'consumerSlice',
  initialState,
  reducers: {
    setConsumer: (state, action) => {
      state.consumer = action.payload
    },
  },
})

export const { setConsumer } = consumerSlice.actions
export const selectCurrentConsumer = (state: RootState) => state.consumer.consumer


export default consumerSlice.reducer
