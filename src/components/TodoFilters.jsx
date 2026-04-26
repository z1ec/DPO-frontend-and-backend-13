const filters = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
];

function TodoFilters({ filter, onFilterChange, activeCount }) {
  return (
    <div className="filters">
      <span className="filters-count">Осталось задач: {activeCount}</span>

      <div className="filters-actions">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={filter === item.value ? 'filter-chip active' : 'filter-chip'}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;
