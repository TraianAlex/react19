import { useState } from 'react';

import { Contact } from './useGetContact';

interface UseSaveContactOptions {
  onSuccess?: (data: Contact) => void;
  onError?: (error: Error) => void;
}
export function useSaveContact(options: UseSaveContactOptions = {}): {
  mutateAsync: (contactData: Contact) => Promise<Contact>;
  isLoading: boolean;
  error: string | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutateAsync = async (contactData: Contact): Promise<Contact> => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API call - replace with actual API endpoint
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${contactData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save contact');
      }

      const savedContact = await response.json();

      // Map the API response to our Contact interface
      const contact: Contact = {
        id: savedContact.id.toString(),
        name: savedContact.name,
        email: savedContact.email,
        phone: savedContact.phone,
      };

      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(contact);
      }

      return contact;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      // Call error callback if provided
      if (options.onError) {
        options.onError(err instanceof Error ? err : new Error(errorMessage));
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, isLoading, error };
}
