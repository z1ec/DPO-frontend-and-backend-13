import { useEffect, useMemo, useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

const TODOS_STORAGE_KEY = 'dpo13.todos';
const THEME_STORAGE_KEY = 'dpo13.theme';

const demoTodos = [
  { id: 1, text: 'Собрать React-приложение', completed: true },
  { id: 2, text: 'Добавить фильтрацию задач', completed: false },
  { id: 3, text: 'Сохранить данные в localStorage', completed: false },
];

function readTodos() {
  try {
    const saved = localStorage.getItem(TODOS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : demoTodos;
  } catch {
    return demoTodos;
  }
}

function readTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch {
    return 'light';
  }
}

function createTodo(text) {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now();

  return {
    id,
    text,
    completed: false,
  };
}

function App() {
  const [todos, setTodos] = useState(readTodos);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const addTodo = (text) => {
    setTodos((current) => [createTodo(text), ...current]);
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
    setFilter('all');
  };

  const isDark = theme === 'dark';

  return (
    <main className="page">
      <section className="app-shell">
        <header className="hero">
          <div>
            <h1>Менеджер задач</h1>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? 'Светлая тема' : 'Тёмная тема'}
          </button>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Всего задач</span>
            <strong>{todos.length}</strong>
          </article>
          <article className="stat-card">
            <span>Активных</span>
            <strong>{activeCount}</strong>
          </article>
          <article className="stat-card">
            <span>Выполненных</span>
            <strong>{completedCount}</strong>
          </article>
        </div>

        <AddTodoForm onAdd={addTodo} />

        <TodoFilters
          filter={filter}
          activeCount={activeCount}
          onFilterChange={setFilter}
        />

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <h2>Список пуст</h2>
            <p>
              {filter === 'all' && 'Добавьте первую задачу через форму выше.'}
              {filter === 'active' && 'Активных задач сейчас нет.'}
              {filter === 'completed' && 'Выполненных задач пока нет.'}
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                task={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        <footer className="toolbar">
          <button
            type="button"
            className="ghost-button"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Удалить выполненные
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={clearAll}
            disabled={todos.length === 0}
          >
            Очистить всё
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
