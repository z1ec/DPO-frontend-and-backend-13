import { useEffect, useRef, useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const submitEdit = () => {
    const normalized = draft.trim();
    if (!normalized) {
      setDraft(task.text);
      setIsEditing(false);
      return;
    }

    onEdit(task.id, normalized);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(task.text);
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? 'todo-item completed' : 'todo-item'}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="checkmark" />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={submitEdit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              submitEdit();
            }

            if (event.key === 'Escape') {
              cancelEdit();
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="todo-text-button"
          onDoubleClick={() => setIsEditing(true)}
          title="Двойной клик для редактирования"
        >
          <span className="todo-text">{task.text}</span>
        </button>
      )}

      <button
        type="button"
        className="icon-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Удалить задачу: ${task.text}`}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;
