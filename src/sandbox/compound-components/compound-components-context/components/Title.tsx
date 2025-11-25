import { useEditContactContext } from '../context/useEditContactContext';

export const Title = () => {
  const { contact } = useEditContactContext();

  return <>{contact ? `Edit ${contact.name}` : 'Create Contact'}</>;
};
