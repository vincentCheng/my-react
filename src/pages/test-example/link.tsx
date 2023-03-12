import { useState } from 'react';

interface IStatus {
  HOVERED: string;
  NORMAL: string;
}

interface IParams {
  page: string;
  children: HTMLElement;
}

const STATUS: IStatus = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

const Link = ({ page, children }: IParams) => {
  const [status, setStatus] = useState<string>(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || '#'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default Link;
