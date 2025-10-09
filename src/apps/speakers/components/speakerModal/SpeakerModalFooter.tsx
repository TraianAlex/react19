import { Activity, useContext } from 'react';

import { SpeakerModalContext } from '../contexts/SpeakerModalContext';
import { SpeakersDataContext } from '../contexts/SpeakersDataContext';

export default function NotesModalFooter() {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerEmail,
    modalSpeakerImageUrl,
  } = useContext(SpeakerModalContext);

  const { createSpeaker, updateSpeaker } = useContext(SpeakersDataContext);

  return (
    <div className='modal-footer justify-content-center'>
      <Activity mode={modalSpeakerId !== 0 ? 'visible' : 'hidden'}>
        <button
          onClick={() => {
            updateSpeaker(
              {
                id: modalSpeakerId,
                firstName: modalSpeakerFirstName,
                lastName: modalSpeakerLastName,
                imageUrl: modalSpeakerImageUrl,
                email: modalSpeakerEmail,
              },
              () => {}
            );
            setModalShow(false);
          }}
          className='float-left btn btn-accent'
        >
          Save
        </button>
      </Activity>

      <button
        className='btn btn-danger'
        onClick={() => {
          setModalShow(false);
        }}
        data-dismiss='modal'
      >
        Discard
      </button>

      <Activity mode={modalSpeakerId === 0 ? 'visible' : 'hidden'}>
        <button
          className='btn btn-accent'
          onClick={() => {
            createSpeaker(
              {
                firstName: modalSpeakerFirstName,
                lastName: modalSpeakerLastName,
                email: modalSpeakerEmail,
                imageUrl: modalSpeakerImageUrl,
                sat: true,
                sun: true,
                favorite: false,
                company: 'Code Camp',
                twitterHandle: 'unknown',
                userBioShort: 'Dummy Bio',
                bio: 'Dummy Bio',
              },
              () => {}
            );
            setModalShow(false);
          }}
        >
          Add
        </button>
      </Activity>
    </div>
  );
}
