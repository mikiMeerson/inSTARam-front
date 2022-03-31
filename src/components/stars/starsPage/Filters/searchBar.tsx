import { TextField, TableRow } from '@mui/material';

interface Props {
    nameFilter: string;
    setNameFilter: (e: any) => void;
}

const SearchBar = ({ nameFilter, setNameFilter }: Props) => (
  <TableRow
    className="searchSection"
    sx={{
      display: 'flex',
    }}
  >
    <TextField
      fullWidth
      autoFocus
      value={nameFilter}
      variant="standard"
      label="חפש לפי שם הסטאר"
      onChange={(e) => setNameFilter(e.target.value)}
    />
  </TableRow>
);

export default SearchBar;
