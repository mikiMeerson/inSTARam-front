import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import StarRow from './starRow';
import FilterHeaders from './filters/filterHeaders';
import { IEvent, IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import { FilterDataType } from '../../../types/configurations';

interface Props {
  userRole: UserRole;
  unprioritized: boolean;
  stars: IStar[];
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
  events: IEvent[];
}

const StarsTable = ({
  userRole,
  unprioritized,
  stars,
  removeStar,
  changePriority,
  dragged,
  setDragged,
  events,
}: Props) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = unprioritized
      ? localStorage.getItem(`stars ${filterName} unprioritized`)
      : localStorage.getItem(`stars ${filterName} `);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [statusFilter, setStatusFilter] = useState<string[]>(
    getExistingFilters('status'),
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>(
    getExistingFilters('assignee'),
  );
  const [blockFilter, setBlockFilter] = useState<string[]>(
    getExistingFilters('block'),
  );
  const [resourceFilter, setResourceFilter] = useState<string[]>(
    getExistingFilters('resource'),
  );
  const [computerFilter, setComputerFilter] = useState<string[]>(
    getExistingFilters('computer'),
  );
  const [dateFilter, setDateFilter] = useState<string[]>(
    getExistingFilters('date'),
  );
  const [freeTextFilter, setFreeTextFilter] = useState<string>('');
  const [filteredStars, setFilteredStars] = useState<IStar[]>([]);

  const filtersData: FilterDataType[] = [
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
      chipColor: 'primary',
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
      chipColor: 'secondary',
    },
    {
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      chipColor: 'warning',
    },
    {
      tabName: 'resource',
      filter: resourceFilter,
      func: setResourceFilter,
      chipColor: 'default',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      chipColor: 'info',
    },
    {
      tabName: 'date',
      filter: dateFilter,
      func: setDateFilter,
      chipColor: 'error',
    },
  ];

  useEffect(() => {
    const tempFilteredStars: IStar[] = [];
    stars.forEach((s) => {
      if ((freeTextFilter === ''
        || s.name.includes(freeTextFilter)
        || s.desc.includes(freeTextFilter))
        && (statusFilter.length === 0 || statusFilter.includes(s.status))
        && (blockFilter.length === 0 || blockFilter.includes(s.block))
        && (assigneeFilter.length === 0 || assigneeFilter.includes(s.assignee))
        && (computerFilter.length === 0 || computerFilter.includes(s.computer))
        && (resourceFilter.length === 0 || resourceFilter
          .some((element) => s.resources.includes(element)))
        && (dateFilter.length === 0 || (s.createdAt
          && new Date(s.createdAt) >= new Date(dateFilter[0])
          && new Date(s.createdAt) <= new Date(
            new Date(dateFilter[1]).getFullYear(),
            new Date(dateFilter[1]).getMonth(),
            new Date(dateFilter[1]).getDate() + 1,
          )))) {
        tempFilteredStars.push(s);
      }
    });
    setFilteredStars(tempFilteredStars);
  }, [
    stars,
    assigneeFilter,
    blockFilter,
    computerFilter,
    dateFilter,
    freeTextFilter,
    resourceFilter,
    statusFilter,
  ]);

  const handleDragOver = (e: BaseSyntheticEvent) => {
    if (!(unprioritized && dragged?.priority === 0)) {
      e.preventDefault();
      e.currentTarget.style.borderTop = '2px solid blue';
    }
  };

  const handleDrop = (e: BaseSyntheticEvent) => {
    e.currentTarget.style.border = 'none';
    if (dragged) {
      if (unprioritized) changePriority(dragged, 0);
      else if (stars.length === 0) {
        changePriority(dragged, 1);
      } else if (dragged.priority > 0) changePriority(dragged, stars.length);
      else changePriority(dragged, stars.length + 1);

      setDragged(undefined);
    }
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FilterHeaders
        unprioritized={unprioritized}
        freeTextFilter={freeTextFilter}
        setFreeTextFilter={setFreeTextFilter}
        filtersData={filtersData}
      />
      <div className="starsTable">
        {filteredStars.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">
              לא נמצאו סטארים
            </Typography>
          </div>
        )}
        {filteredStars.length > 0 && filteredStars
          .sort((a: IStar, b: IStar) => a.priority - b.priority)
          .map((star: IStar) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {!unprioritized && (<div id="priority">{star.priority}</div>)}
              <StarRow
                userRole={userRole}
                key={star._id}
                star={star}
                removeStar={removeStar}
                changePriority={changePriority}
                dragged={dragged}
                setDragged={setDragged}
                event={events.find((e) => e._id === star.event)}
              />
            </div>
          ))}
        <div
          style={{ width: '100%', height: '50px' }}
          onDragOver={handleDragOver}
          onDragLeave={
            (e: BaseSyntheticEvent) => (e.currentTarget.style.border = 'none')
          }
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
};

export default StarsTable;
