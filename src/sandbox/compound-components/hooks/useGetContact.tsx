import { useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}
export function useGetContact(contactId: string): {
  data: Contact | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock API call - replace with actual API endpoint
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${contactId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contact');
        }

        const contactData = await response.json();

        // Map the API response to our Contact interface
        const contact: Contact = {
          id: contactData.id.toString(),
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
        };

        setData(contact);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  return { data, loading, error };
}
