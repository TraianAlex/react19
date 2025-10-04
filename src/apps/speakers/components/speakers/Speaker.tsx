import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

import { ThemeContext } from '../contexts/ThemeContext';
import SpeakerDetail from './SpeakerDetail';
import {
  SpeakersDataContext,
  SpeakersDataProvider,
} from '../contexts/SpeakersDataContext';

function Inner() {
  const { id } = useParams();
  const { darkTheme } = useContext(ThemeContext);
  const { speakerList, loadingStatus } = useContext(SpeakersDataContext);

  if (loadingStatus === 'loading') return <div>Loading...</div>;

  const speakerRec = speakerList?.find((rec) => rec.id === Number(id));

  return speakerRec ? (
    <div className={darkTheme ? 'theme-dark' : 'theme-light'}>
      <SpeakerDetail speakerRec={speakerRec} showDetails={true} />
    </div>
  ) : (
    <h2 className='text-danger'>Speaker {id} not found</h2>
  );
}

export default function Speaker(props: JSX.IntrinsicAttributes) {
  return (
    <SpeakersDataProvider>
      <Inner />
    </SpeakersDataProvider>
  );
}
