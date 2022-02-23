import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Box, CircularProgress } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import { getStarById } from '../../../services/star-service';
import { addNote, deleteNotes, getNotes } from '../../../services/note-service';
import { getActivities } from '../../../services/activity-service';

interface starProps {
  userRole: userRole;
  starId: string | undefined;
  updateStar: (starId: string, formData: IStar) => void;
  saveActivity: (starId: string, activityData: IActivity) => void;
}

const StarFeed = ({
  userRole,
  starId,
  updateStar,
  saveActivity,
}: starProps) => {
  const [star, setStar] = useState<IStar>();
  const [notes, setNotes] = useState<INote[]>([]);
  const [activity, setActivity] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  if (!starId) {
    const navigate = useNavigate();
    navigate('/stars');
    return null;
  }

  const fetchStar = useCallback(async (): Promise<void> => {
    const { status, data } = await getStarById(starId);
    if (status !== StatusCodes.OK) {
      throw new Error('Error! Star not found');
    }
    setStar(data.star);
  }, [starId]);

  const fetchNotes = useCallback(async (id: string): Promise<void> => {
    const { data } = await getNotes(id);
    setNotes(data.notes);
  }, []);

  const fetchActivity = useCallback(async (id: string): Promise<void> => {
    const { data } = await getActivities(id);
    setActivity(data.activities);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetchStar();
    if (star) {
      fetchNotes(star._id);
      fetchActivity(star._id);
    }
    setLoading(false);
    return () => ac.abort();
  }, [fetchActivity, fetchNotes, fetchStar, star]);

  if (!star) {
    return (
      <Box sx={{
        position: 'absolute', top: '50%', right: '50%', zIndex: 1,
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleAddNote = async (noteData: INote): Promise<void> => {
    setLoading(true);
    noteData.starId = star._id;
    const { status } = await addNote(noteData);
    if (status !== StatusCodes.CREATED) {
      console.log('note failed to save');
    }
    fetchNotes(star._id);
    saveActivity(star._id, {
      _id: '0',
      starId: star._id,
      publisher: noteData.publisher,
      action: 'הוסיפ/ה הערה חדשה',
    });
    setLoading(false);
  };

  const handleDeleteNote = async (noteId: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteNotes(noteId, notes);
    if (status !== StatusCodes.OK) {
      throw new Error('Error! note not deleted');
    }
    fetchNotes(star._id);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="starFeed">
        <StarDesc
          userRole={userRole}
          star={star}
          updateStar={updateStar}
          saveActivity={saveActivity}
        />
        <div className="starDetails">
          <StarNotes
            notes={notes}
            addNote={handleAddNote}
            deleteNote={handleDeleteNote}
          />
          <StarActivity activity={activity} />
        </div>
      </div>
    </>
  );
};

export default StarFeed;
