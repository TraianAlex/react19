import { createContext, ReactNode } from 'react';

import useSpeakersData from '../hooks/useSpeakersData';

export const SpeakersDataContext = createContext({
  speakerList: [] as any[],
  createSpeaker: (() => {}) as (
    speakerRec: any,
    callbackDone: () => void
  ) => void,
  updateSpeaker: (() => {}) as (
    speakerRec: any,
    callbackDone: () => void
  ) => void,
  deleteSpeaker: (() => {}) as (id: any, callbackDone: () => void) => void,
  loadingStatus: '',
});

export const SpeakersDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    speakerList,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
    loadingStatus,
  } = useSpeakersData();

  const value = {
    speakerList: speakerList || [],
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
    loadingStatus,
  };

  return (
    <SpeakersDataContext.Provider value={value}>
      {children}
    </SpeakersDataContext.Provider>
  );
};
