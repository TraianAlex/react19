import { createContext, useContext, useState, useEffect } from 'react';

import { useGetContact } from '../hooks/useGetContact';
import { useSaveContact } from '../hooks/useSaveContact';

const EditContactContext = createContext({} as any);

export const useEditContactContext = () => {
  const context = useContext(EditContactContext);
  if (!context) {
    throw new Error(
      'EditContact subcomponents must be used within EditContact.Root'
    );
  }
  return context;
};

export const RootProvider = ({
  contactId,
  onClose,
  children,
}: {
  contactId: string;
  onClose?: () => void;
  children: React.ReactNode;
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: contact } = useGetContact(contactId);

  const saveContact = useSaveContact({
    onSuccess: () => {
      console.log('onSuccess');
    },
    onError: (err: Error) => {
      setError(err.message);
      console.log('onError');
    },
  });

  useEffect(() => {
    if (contact) {
      setFormState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }, [contact]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await saveContact.mutateAsync({
        id: contactId,
        ...formState,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    setFormState({
      name: '',
      email: '',
      phone: '',
    });
    onClose?.();
  };

  const value = {
    contact,
    formState,
    setFormState,
    error,
    isLoading,
    handleSubmit,
    onClose,
    onCancel,
  };

  return (
    <EditContactContext.Provider value={value}>
      {children}
    </EditContactContext.Provider>
  );
};
