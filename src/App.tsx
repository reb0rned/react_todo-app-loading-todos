/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Error } from './components/Error';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Error';
import { FilterBy } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<FilterBy>(FilterBy.all);
  const [activeCount, setActiveCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const receiveData = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setError(ErrorType.loading_error);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const updateTodoStatus = (id: number, completed: boolean) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
    );
  };

  const filterData = (filterBy: FilterBy) => {
    if (filterBy === FilterBy.active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filterBy === FilterBy.completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  };

  useEffect(() => {
    receiveData();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setActiveCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  const visibleTodos = filterData(filter);

  return (
    <div className="todoapp">
      {!USER_ID ? (
        <UserWarning />
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header />

            {todos.length > 0 && (
              <>
                <TodoList
                  todos={visibleTodos}
                  setUpdateTodoStatus={updateTodoStatus}
                />
                <Footer
                  filterBy={filter}
                  setFilterBy={setFilter}
                  activeCount={activeCount}
                />
              </>
            )}
          </div>

          <Error error={error} setError={setError} />
        </>
      )}
    </div>
  );
};
