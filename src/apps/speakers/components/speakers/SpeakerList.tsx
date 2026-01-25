import axios from 'axios';

import SpeakerLine from './SpeakerLine';
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function List({ state, dispatch }: { state: any; dispatch: any }) {
  const [updatingId, setUpdatingId] = useState(0);
  const [searchName, setSearchName] = useState('');
  // const highlightCharts = useDeferredValue(searchName);
  const [highlightChars, setHighlightChars] = useState<string | undefined>(
    undefined
  );
  const [isPending, startTransition] = useTransition();
  const speakers = state.speakers;

  function toggleFavoriteSpeaker(speakerRec: any) {
    const speakerRecUpdated = {
      ...speakerRec,
      favorite: !speakerRec.favorite,
    };
    dispatch({
      type: 'updateSpeaker',
      speaker: speakerRecUpdated,
    });
    async function updateAsync(rec: any) {
      setUpdatingId(rec.id);
      await axios.put(`http://localhost:4000/api/speakers/${rec.id}`, speakerRecUpdated);
      setUpdatingId(0);
    }
    updateAsync(speakerRecUpdated);
  }

  return (
    <div className='container'>
      <div className='border-0'>
        <div
          className='btn-toolbar'
          role='toolbar'
          aria-label='Speaker toolbar filter'
        >
          <div className='toolbar-trigger mb-3 flex-grow-04'>
            <div className='toolbar-search w-100'>
              <input
                value={searchName}
                onChange={(event) => {
                  setSearchName(event.target.value);
                  startTransition(() => {
                    setHighlightChars(event.target.value);
                  });
                }}
                type='text'
                className='form-control'
                placeholder='Highlight Names'
              />
            </div>
            <div className='spinner-height'>
              {isPending && (
                <i className='spinner-border text-dark' role='status' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='row g-3'>
        {speakers.map(function (speakerRec: any) {
          const highlight =
            highlightChars?.length &&
            highlightChars.length > 0 &&
            (
              speakerRec.firstName?.toLowerCase() +
              speakerRec.lastName?.toLowerCase()
            ).includes(highlightChars.toLowerCase())
              ? true
              : false;
          return (
            <SpeakerLine
              key={speakerRec.id}
              speakerRec={speakerRec}
              updating={updatingId === speakerRec.id ? updatingId : 0}
              toggleFavoriteSpeaker={useCallback(
                () => toggleFavoriteSpeaker(speakerRec),
                [speakerRec.favorite]
              )}
              highlight={highlight}
            />
          );
        })}
      </div>
    </div>
  );
}

const SpeakerList = () => {
  const { darkTheme } = useContext(ThemeContext);
  const mountedRef = useRef(false);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'speakersLoaded':
        return {
          ...state,
          loading: false,
          speakers: [...action.speakers, ...createDummySpeakers(8)], // 8000 dummy speakers
        };
      case 'setLoadingStatus':
        return {
          ...state,
          loading: true,
        };
      case 'updateSpeaker':
        const speakersUpdated = state.speakers.map((rec: { id: any }) =>
          action.speaker.id === rec.id ? action.speaker : rec
        );
        return {
          ...state,
          speakers: speakersUpdated,
        };
      default:
        throw new Error(`case failure.  type: ${action.type}`);
    }
  }

  const initialState = {
    speakers: [],
    loading: true,
    updateItem: () => {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getDataAsync() {
      dispatch({
        type: 'setLoadingStatus',
      });
      const results = await axios.get('http://localhost:4000/api/speakers');
      dispatch({
        type: 'speakersLoaded',
        speakers: results.data,
      });
    }
    if (mountedRef.current) return;
    mountedRef.current = true;
    getDataAsync();
  }, []);

  // function updateSpeaker(speakerRec: any) {
  //   const speakerUpdated = state.speakers.map(function (rec: { id: any }) {
  //     return speakerRec.id === rec.id ? speakerRec : rec;
  //   });
  //   dispatch({
  //     type: 'updateSpeaker',
  //     speaker: speakerUpdated,
  //   });
  // }

  if (state.loading) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? 'theme-dark' : 'theme-light'}>
      <List state={state} dispatch={dispatch} />
    </div>
  );
};

export default SpeakerList;

function createDummySpeakers(numToAdd: number) {
  let speakers = [];
  for (let increment = 1; increment < numToAdd; increment++) {
    speakers.push({
      id: 100000 + increment,
      firstName: `Craig${increment}`,
      lastName: `Mantle${increment}`,
      favorite: false,
      bio: 'fake bio',
      company: 'fake company',
      twitterHandle: `fakeTwitterHandle${increment}`,
      userBioShort: `fake short bio ${increment}`,
      imageUrl: '',
      email: `FakeEmail${increment}@codecamp.net`,
    });
  }
  return speakers;
}
