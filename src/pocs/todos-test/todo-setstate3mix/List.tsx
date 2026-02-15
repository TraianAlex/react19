export const List = ({ optimisticList }: { optimisticList: string[] }) => {
  console.log('render List');

  return (
    <div className='text-center border border-secondary rounded p-2 mt-3'>
      {optimisticList?.map((item: string, i: number) => (
        <span key={crypto.randomUUID()}>
          {item} {i + 1} /{' '}
          {item.slice(-3) === '...' && (
            <span className='badge bg-warning text-dark ms-2 small'>
              Optimistic
            </span>
          )}
        </span>
      ))}
    </div>
  );
};
