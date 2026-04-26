import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = text.trim();
    if (!normalized) {
      return;
    }

    onAdd(normalized);
    setText('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Добавить новую задачу..."
        className="text-input"
      />
      <button type="submit" className="primary-button">
        Добавить
      </button>
    </form>
  );
}

export default AddTodoForm;
