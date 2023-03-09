import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  counterSelector,
  incrementAsync,
} from "@/store/reducers/counter";

const Index: FC = () => {
  const count = useSelector(counterSelector);
  const dispatch = useDispatch();

  return (
    <div>
      {/* {count === 3 ? throwError() : ""} */}
      计数器：{count}
      <br />
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        同步-1
      </button>
      <button
        onClick={() => {
          // dispatch(incrementAsync(1));
          incrementAsync(1)(dispatch);
        }}
      >
        异步+1
      </button>
    </div>
  );
};

export default Index;
