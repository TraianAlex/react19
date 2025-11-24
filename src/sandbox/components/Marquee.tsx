import './Marquee.modules.scss';

export const Marquee = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='marquee'>
      <h1>{children}</h1>
    </div>
  );
};
