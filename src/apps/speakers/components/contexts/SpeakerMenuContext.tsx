import React, { createContext, useState } from 'react';

export const SpeakerMenuContext = createContext({
  speakingSaturday: true,
  setSpeakingSaturday: (() => {}) as React.Dispatch<
    React.SetStateAction<boolean>
  >,
  speakingSunday: true,
  setSpeakingSunday: (() => {}) as React.Dispatch<
    React.SetStateAction<boolean>
  >,
  searchText: '',
  setSearchText: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

export const SpeakerMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const [searchText, setSearchText] = useState('');
  const value = {
    //updating,
    //setUpdating,
    speakingSaturday,
    setSpeakingSaturday,
    speakingSunday,
    setSpeakingSunday,
    searchText,
    setSearchText,
  };

  return (
    <SpeakerMenuContext.Provider value={value}>
      {children}
    </SpeakerMenuContext.Provider>
  );
};
