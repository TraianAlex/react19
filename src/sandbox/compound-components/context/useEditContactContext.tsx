import { createContext, useContext, useState, useEffect } from 'react';

import { useGetContact } from '../hooks/useGetContact';
import { useSaveContact } from '../hooks/useSaveContact';

// Create the context
const EditContactContext = createContext({} as any);
// Hook to use the context
export const useEditContactContext = () => {
  const context = useContext(EditContactContext);
  if (!context) {
    throw new Error(
      'EditContact subcomponents must be used within EditContact.Root'
    );
  }
  return context;
};
// Root component that manages state and logic
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

  // Fetch contact details
  const { data: contact } = useGetContact(contactId);

  // Save contact mutation
  const saveContact = useSaveContact({
    onSuccess: () => {
      // Handle success
      console.log('onSuccess');
    },
    onError: (err: Error) => {
      setError(err.message);
      console.log('onError');
    },
  });

  // Set initial form data
  useEffect(() => {
    if (contact) {
      setFormState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }, [contact]);

  // Handle form submission
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

  // Context value
  const value = {
    contact,
    formState,
    setFormState,
    error,
    isLoading,
    handleSubmit,
    onClose,
  };

  return (
    <EditContactContext.Provider value={value}>
      {children}
    </EditContactContext.Provider>
  );
};
