import React from 'react';
import { Error_type } from '../types/Error';
import cn from 'classnames';

type Props = {
  error: Error_type | null;
  setError: (value: Error_type | null) => void;
};

export const Error: React.FC<Props> = ({ error, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};
