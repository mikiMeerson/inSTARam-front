import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Collapse,
} from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';
import StarExpand from './starExpand';
import { severityColors } from '../../../assets/star';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
}
const StarRow = ({
  star,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: starProps) => {
  const [openDesc, setOpenDesc] = useState(false);

  const deleteStar = () => {
    setOpenDesc(false);
    removeStar(star._id);
  };

  const handleStartDrag = () => {
    setDragged(star);
  };
  const handleDragOver = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = '2px solid blue';
  };

  const handleDrop = (e: BaseSyntheticEvent) => {
    e.currentTarget.style.borderTop = 'none';
    if (dragged) {
      if (star.priority === 0) {
        // if moved into the unprioritized table
        changePriority(dragged, 0);
      } else if (star.priority === 1) {
        // if moved to top of prioritized table
        changePriority(dragged, 1);
      } else {
        // if moved inside the prioritized table
        changePriority(dragged, star.priority);
      }
    }
    setDragged(undefined);
  };

  return (
    <TableContainer component={Paper} className="starRow">
      <Table onClick={() => setOpenDesc(!openDesc)}>
        <TableRow
          draggable
          onDragStart={handleStartDrag}
          onDragOver={handleDragOver}
          onDragLeave={
            (e: BaseSyntheticEvent) => e.currentTarget.style.borderTop = 'none'
          }
          onDrop={handleDrop}
        >
          <TableCell align="center" width="50px">
            <div
              id="priority"
              style={{
                color: severityColors[star.severity - 1],
              }}
            >
              {star.priority > 0 ? star.priority : '?'}
            </div>
          </TableCell>
          <TableCell width="105px">{star.name}</TableCell>
          <TableCell width="70px">{star.status}</TableCell>
          <TableCell width="70px">{star.assignee}</TableCell>
          <TableCell width="45px">{star.createdAt}</TableCell>
          <TableCell width="60px">{star.version}</TableCell>
        </TableRow>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: 'hidden' }}>
        <StarExpand star={star} setFeed={setFeed} removeStar={deleteStar} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;