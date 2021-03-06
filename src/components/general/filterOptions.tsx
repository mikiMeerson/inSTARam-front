import { TableRow, Chip, TextField } from '@mui/material';
import { FilterDataType } from '../../types/configurations';

interface Props {
    lastTab: string;
    options: string[];
    displaySearch: boolean;
    searchValue: string;
    setSearchValue: (param: string) => void;
    filtersData: FilterDataType[];
    setFilter: (
        filter: string,
        value: string,
        action: 'add' | 'remove'
    ) => void;
}

const FilterOptions = ({
  lastTab,
  displaySearch,
  searchValue,
  setSearchValue,
  options,
  filtersData,
  setFilter,
}: Props) => {
  const getOptions = () => {
    const newOptions = options.filter((option) => {
      const currentFilter = filtersData
        .find((filter) => filter.tabName === lastTab);
      if (currentFilter) return !currentFilter.filter.includes(option);
      return true;
    });
    return newOptions;
  };

  return (
    <TableRow className="filterSection">
      {displaySearch ? (
        <TextField
          fullWidth
          autoFocus
          value={searchValue}
          variant="standard"
          label="חפש לפי טקסט חופשי"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      ) : getOptions().map((option: string) => (
        <Chip
          size="medium"
          sx={{ marginRight: '15px' }}
          label={option}
          key={option}
          onClick={() => { setFilter(lastTab, option, 'add'); }}
        />
      ))}
    </TableRow>
  );
};
export default FilterOptions;
