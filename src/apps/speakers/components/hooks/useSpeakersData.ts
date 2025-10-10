import useGeneralizedCrudMethods from '../../../../hooks/useGeneralizedCrudMethods';

function useSpeakersData() {
  const url = 'http://localhost:4000/api/speakers';
  const errorNotificationFn = (error: any) => {
    console.log('Error From useSpeakersData', error);
  };

  const {
    data,
    error,
    loadingStatus,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useGeneralizedCrudMethods(url, errorNotificationFn);

  function createSpeaker(speakerRec: any, callbackDone: () => void) {
    createRecord(speakerRec, callbackDone);
  }

  function updateSpeaker(speakerRec: any, callbackDone: () => void) {
    updateRecord(speakerRec, callbackDone);
  }

  function deleteSpeaker(id: any, callbackDone: () => void) {
    deleteRecord(id, callbackDone);
  }

  return {
    speakerList: data,
    loadingStatus,
    error,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
  };
}

export default useSpeakersData;
