import { FC, useState } from "react";

const Index: FC = () => {
  const [count, setCount] = useState(0);
  const handleCouterClick = () => {
    setCount(count + 1);
  };
  const throwError = () => {
    throw new Error("render error");
  };

  return (
    <div>
      {count === 3 ? throwError() : ""}
      计数器：{count}
      <br />
      <button onClick={handleCouterClick}>点击+1</button>
    </div>
  );
};

export default Index;
