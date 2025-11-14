export const Child = ({
  clickParentHandler,
  value,
}: {
  clickParentHandler: () => void;
  value: number;
}) => {
  console.log('Child rendered', value); // 3 clicks values is 4

  const handleClick = () => {
    clickParentHandler();
  };
  return <button onClick={handleClick} className='btn btn-primary'>Child button</button>;
};
