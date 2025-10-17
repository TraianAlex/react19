import { useContext, useState } from 'react';

import { SpeakersDataContext } from '../contexts/SpeakersDataContext';

export default function FavoriteSpeakerToggle({
  speakerRec,
}: {
  speakerRec: { id: number; favorite: boolean };
}) {
  const { updateSpeaker } = useContext(SpeakersDataContext);
  const [updating, setUpdating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSpeakerRec = {
      ...speakerRec,
      favorite: !speakerRec.favorite,
    };
    setUpdating(true);
    updateSpeaker(newSpeakerRec, () => {
      setUpdating(false);
    });
  };

  return (
    <button
      className={
        speakerRec.favorite ? 'heartredbutton btn' : 'heartdarkbutton btn'
      }
      onClick={handleClick}
    >
      {updating ? (
        <i className='spinner-border text-dark' role='status' />
      ) : null}
    </button>
  );
}
