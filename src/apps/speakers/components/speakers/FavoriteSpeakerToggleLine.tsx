export default function FavoriteSpeakerToggleLine({
  speakerRec,
  toggleFavoriteSpeaker,
  children,
}: {
  speakerRec: { id: number; favorite: boolean };
  toggleFavoriteSpeaker: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={
        speakerRec.favorite ? 'heartredbutton btn' : 'heartdarkbutton btn'
      }
      onClick={toggleFavoriteSpeaker}
    >
      {children}
    </button>
  );
}
