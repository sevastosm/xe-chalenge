import { useCallback, useEffect, useState } from 'react';
import { fetchAdById, getAllAds } from '../api';
import { NavLink, useParams } from 'react-router';
import AddsList from '@/components/AddsList';
import AddForm from '@/components/AddForm';

const Landing = () => {
  const [formEntries, setFormEntries] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addId } = useParams();

  const loadFormDataHandler = useCallback(async () => {
    if (addId) {
      try {
        const data = await fetchAdById(addId);
        setFormEntries([data]);
      } catch (err) {
        setError('Failed to load form submissions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      try {
        const data = await getAllAds();
        setFormEntries(data);
      } catch (err) {
        setError('Failed to load form submissions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [addId]);

  useEffect(() => {
    loadFormDataHandler();
  }, [addId]);

  if (isLoading) return <div className="flex flex-col items-center justify-center">Loading ads...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="flex flex-col items-center px-4 h-screen relative">
      <div className="w-full flex flex-row items-center justify-end m-4">
        <NavLink
          className="bg-blue-500 p-2 rounded-md text-white"
          to="/new-add"
        >
          New Add
        </NavLink>
      </div>
      {addId ? <AddForm status="edit" formEntries={formEntries} /> : <AddsList formEntries={formEntries} />}

    </div>
  );
};

export default Landing; 