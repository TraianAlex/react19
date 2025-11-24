import './Marquee.modules.scss';

export const Marquee = (props: { text: string }) => {
  return (
    <div className='marquee'>
      <h1>{props.text}</h1>
    </div>
  );
};
