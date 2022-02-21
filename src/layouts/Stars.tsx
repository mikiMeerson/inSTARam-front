import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Alert, CircularProgress, Box } from '@mui/material';
import StarFeed from '../components/stars/feed/starFeed';
import StarsPage from '../components/stars/starsPage/starsPage';
import {
  addStar,
  deleteSingleStar,
  getStars,
  updatePriorities,
  updateStar,
} from '../services/star-service';
import { deleteNotes, getNotes } from '../services/note-service';
import { deleteActivity, getActivities } from '../services/activity-service';
import StarsHistory from '../components/stars/starsHistory/starsHistory';
import { STATUSES } from '../assets/utils';

interface starProps {
  userRole: userRole;
}

const Stars = ({ userRole }: starProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedToDisplay, setFeedToDisplay] = useState<string>();
  const [stars, setStars] = useState<IStar[]>([]);
  const [alert, setAlert] = useState<IAlert>({
    isAlert: false,
    content: '',
    severity: 'info',
  });

  const handleAlert = (
    isSuccess: boolean,
    content: string,
  ) => {
    setAlert({
      isAlert: true,
      content,
      severity: isSuccess ? 'success' : 'error',
    });
    setTimeout(() => {
      setAlert(Object.assign(alert, { isAlert: false }));
    }, 3000);
  };

  const fetchStars = async (): Promise<void> => {
    setLoading(true);
    const { data } = await getStars();
    setStars(data.stars.filter((s) => s.status !== STATUSES.CLOSED));
    setLoading(false);
  };

  useEffect(() => {
    fetchStars();
  }, []);

  const handleAddStar = async (formData: any): Promise<void> => {
    formData.publisher = localStorage.getItem('userDisplay') || 'אנונימי';
    const { status } = await addStar(formData);
    handleAlert(
      status === StatusCodes.CREATED,
      status === StatusCodes.CREATED
        ? 'הסטאר נוצר בהצלחה!' : 'שגיאה! לא הצלחנו ליצור את הסטאר',
    );
    fetchStars();
  };

  const handleDeleteStar = async (_id: string): Promise<void> => {
    try {
      const { status } = await deleteSingleStar(_id);
      handleAlert(
        status === StatusCodes.OK,
        status === StatusCodes.OK
          ? 'הסטאר נמחק בהצלחה!' : 'שגיאה! לא הצלחנו למחוק את הסטאר',
      );

      const { data: notesData } = await getNotes(_id);
      notesData.notes.forEach((n) => {
        deleteNotes(n._id, notesData.notes);
      });

      const { data: activityData } = await getActivities(_id);

      activityData.activities.forEach((a) => {
        deleteActivity(a._id);
      });

      fetchStars();
    } catch (error) {
      handleAlert(false, error as string);
    }
  };

  const changePriority = async (
    draggedStar: IStar,
    newPri: number,
  ): Promise<void> => {
    const { status } = await updatePriorities(draggedStar, newPri, stars);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
    fetchStars();
  };

  const handleUpdateStar = async (
    starId: string,
    formData: IStar,
  ): Promise<void> => {
    const { status, data } = await updateStar(starId, formData);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
    setStars(data.stars);
  };

  return (
    <>
      {alert.isAlert && (
        <Alert
          color={alert.severity}
          sx={{ position: 'absolute', bottom: '5%', zIndex: 1 }}
        >
          {alert.content}
        </Alert>
      )}
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress size="100px" />
        </Box>
      )}
      <Routes>
        {['/', '/stars'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              stars && (
                <StarsPage
                  userRole={userRole}
                  stars={stars}
                  addStar={handleAddStar}
                  removeStar={handleDeleteStar}
                  setFeed={setFeedToDisplay}
                  changePriority={changePriority}
                />
              )
            }
          />
        ))}
        <Route
          path="/star/:id"
          element={(
            <StarFeed
              userRole={userRole}
              starId={feedToDisplay}
              updateStar={handleUpdateStar}
            />
          )}
        />
        <Route
          path="/stars-history"
          element={
            <StarsHistory userRole={userRole} updateStar={handleUpdateStar} />
          }
        />
      </Routes>
    </>
  );
};

export default Stars;
