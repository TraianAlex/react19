import { colors } from './utils';

export const PlayNumber = ({
  number,
  status,
  onClick,
}: {
  number: number;
  status: 'available' | 'used' | 'wrong' | 'candidate';
  onClick: (
    number: number,
    status: 'available' | 'used' | 'wrong' | 'candidate'
  ) => void;
}) => {
  return (
    <button
      className='number'
      style={{ backgroundColor: colors[status] }}
      onClick={() => onClick(number, status)}
    >
      {number}
    </button>
  );
};
