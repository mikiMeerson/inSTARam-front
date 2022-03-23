import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { eventKeyDisplay } from '../../../assets';

interface EventProps {
    event: IEvent;
}

const EventLists = ({ event }: EventProps) => (
  <div>
    {
        [
          'generalSummary',
          'goals',
          'dataSources',
          'description',
          'findings',
          'notes',
          'conclusions',
        ].map((list) => (
          <div className="eventDetails">
            <Typography variant="h6">
              {eventKeyDisplay.find((k) => k.key === list)!.display}
            </Typography>
            <List>
              {event[list as keyof IEvent]
                .map((item: string, index: number) => (
                  <ListItem key={index} sx={{ textAlign: 'start' }}>
                    <ListItemText primary={`${index + 1}. ${item}`} />
                  </ListItem>
                ))}
            </List>
          </div>
        ))
    }
  </div>
);

export default EventLists;