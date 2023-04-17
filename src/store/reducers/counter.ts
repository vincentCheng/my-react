/**
 * 这是模板代码。
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../index'

// 创建reducer、action
const CounterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // 默认通过了immer处理，不会修改原来的state
      // 或者return一个新的state。
      // 但是不要即修改又返回，这样很不好。
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
    },
  },
})

// 返回的是action，更新state。
export const { increment, decrement, incrementByAmount, decrementByAmount } =
  CounterSlice.actions

// 异步 thunk ，用于需要在更新数据前异步处理数据的情况。
export const incrementAsync = (amount: number) => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1500)
}

// selector 作为 useSelector 读取数据的函数参数
export const counterSelector = (state: RootState) => {
  return state.counter.value
  //   return state.counter;
}

// reducer，真正执行修改 state 的纯函数
export default CounterSlice.reducer
// export default CounterSlice;
