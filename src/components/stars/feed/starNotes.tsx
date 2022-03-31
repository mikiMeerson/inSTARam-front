import { Typography } from '@mui/material';
import { useState } from 'react';
import Note from './note';
import AddComment from './addComment';
import { INote } from '../../../types/interfaces';

interface Props {
  notes: INote[];
  addNote: (note: INote) => void;
  deleteNote: (noteId: string) => void;
}
const StarNotes = ({ notes, addNote, deleteNote }: Props) => {
  const [replyTo, setReplyTo] = useState<INote | undefined>(undefined);

  const getNotes = () => notes.filter(
    (n: INote) => n.repliesTo === undefined,
  );
  const getReplies = (note: INote) => notes.filter(
    (n: INote) => n.repliesTo === note._id,
  );

  if (notes.length === 0) {
    return (
      <div className="feedSection" id="notes">
        <Typography variant="caption">עדיין אין הערות על סטאר זה</Typography>
        <AddComment
          replyTo={replyTo}
          addNote={addNote}
          setReplyTo={setReplyTo}
        />
      </div>
    );
  }
  return (
    <div className="feedSection" id="notes">
      <Typography variant="h5" paddingBottom="10px" height="10%">
        הערות
      </Typography>
      <div style={{ overflow: 'scroll', height: '65%' }}>
        {getNotes().map((note: INote) => (
          <Note
            key={note._id}
            notes={notes}
            note={note}
            replies={getReplies(note)}
            replyBranch={0}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            deleteNote={deleteNote}
          />
        ))}
      </div>
      <AddComment replyTo={replyTo} addNote={addNote} setReplyTo={setReplyTo} />
    </div>
  );
};

export default StarNotes;
