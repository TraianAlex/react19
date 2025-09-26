export function Square(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  value:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
}) {
  return (
    <button className='board-square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}
