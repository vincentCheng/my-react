import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrement,
  counterSelector,
  incrementAsync,
} from '@/store/reducers/counter'
import { Button } from '@arco-design/web-react'
import classes from './index.module.scss'

const TestHotUpdate: FC = () => {
  return <div>111222433321TestHotUpdate</div>
}

const Index: FC = () => {
  const count = useSelector(counterSelector)
  const dispatch = useDispatch()

  return (
    <div className={classes.pageHome}>
      {/* {count === 3 ? throwError() : ""} */}
      计数器：{count}
      <br />
      <button
        onClick={() => {
          dispatch(decrement())
        }}
      >
        同步-1
      </button>
      <button
        onClick={() => {
          // dispatch(incrementAsync(1));
          incrementAsync(1)(dispatch)
        }}
      >
        异步+1
      </button>
      <Button>11111222Arco 按钮</Button>
      <TestHotUpdate />
    </div>
  )
}

export default Index
