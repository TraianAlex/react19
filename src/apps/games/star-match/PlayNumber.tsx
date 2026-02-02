const statusClassMap = {
  available: 'btn-light',
  used: 'btn-success',
  wrong: 'btn-danger',
  candidate: 'btn-info',
} as const;

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
      className={`btn ${statusClassMap[status]} border w-100 fs-4 d-flex align-items-center justify-content-center`}
      onClick={() => onClick(number, status)}
    >
      {number}
    </button>
  );
};
