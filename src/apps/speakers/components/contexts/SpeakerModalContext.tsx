import { createContext } from 'react';

import useSpeakerModal from '../hooks/useSpeakerModal';

export const SpeakerModalContext = createContext({
  modalShow: false,
  setModalShow: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  modalSpeakerId: 0,
  setModalSpeakerId: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  modalSpeakerFirstName: '',
  setModalSpeakerFirstName: (() => {}) as React.Dispatch<
    React.SetStateAction<string>
  >,
  modalSpeakerLastName: '',
  setModalSpeakerLastName: (() => {}) as React.Dispatch<
    React.SetStateAction<string>
  >,
  modalSpeakerImageUrl: '',
  setModalSpeakerImageUrl: (() => {}) as React.Dispatch<
    React.SetStateAction<string>
  >,
  modalSpeakerEmail: '',
  setModalSpeakerEmail: (() => {}) as React.Dispatch<
    React.SetStateAction<string>
  >,
});

export const SpeakerModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    modalShow,
    setModalShow,
    modalSpeakerId,
    setModalSpeakerId,
    modalSpeakerFirstName,
    setModalSpeakerFirstName,
    modalSpeakerLastName,
    setModalSpeakerLastName,
    modalSpeakerEmail,
    setModalSpeakerEmail,
    modalSpeakerImageUrl,
    setModalSpeakerImageUrl,
  } = useSpeakerModal();

  const value = {
    modalShow,
    setModalShow,
    modalSpeakerId,
    setModalSpeakerId,
    modalSpeakerFirstName,
    setModalSpeakerFirstName,
    modalSpeakerLastName,
    setModalSpeakerLastName,
    modalSpeakerEmail,
    setModalSpeakerEmail,
    modalSpeakerImageUrl,
    setModalSpeakerImageUrl,
  };

  return (
    <SpeakerModalContext.Provider value={value}>
      {children}
    </SpeakerModalContext.Provider>
  );
};
