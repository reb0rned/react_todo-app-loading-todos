import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../types/Filter';

type Props = {
  filterBy: FilterBy;
  setFilterBy: (value: FilterBy) => void;
  activeCount: number;
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  activeCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(FilterBy.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(FilterBy.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(FilterBy.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
