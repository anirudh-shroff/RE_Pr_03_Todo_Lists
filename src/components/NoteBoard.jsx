const NoteBoard = ({ tasks, handleDeleteTask, handleStartEdit, handleCancelEdit, editMode }) => {
    const getPriority = (task) => {
        switch (task.priority) {
            case "high": return 0;
            case "medium": return 1;
            case "low": return 2;
            default: return -1;
        }
    };

    const priorityMeta = {
        high:   { label: "High",   emoji: "🔴", cls: "badge--high" },
        medium: { label: "Medium", emoji: "🟡", cls: "badge--medium" },
        low:    { label: "Low",    emoji: "🟢", cls: "badge--low" },
    };

    return (
        <div className="note-board">
            {tasks.length > 0 ? (
                tasks
                    .slice()
                    .sort((a, b) => getPriority(a) - getPriority(b))
                    .map(task => {
                        const meta = priorityMeta[task.priority] || priorityMeta.medium;
                        return (
                            <div className="note-card" key={task.id}>
                                <div className={`note-card__stripe stripe--${task.priority}`} />

                                <div className="note-card__body">
                                    <div className="note-card__header">
                                        <span className="note-card__title">{task.title}</span>
                                        <span className={`priority-badge ${meta.cls}`}>
                                            {meta.emoji} {meta.label}
                                        </span>
                                    </div>
                                    <p className="note-card__desc">{task.name}</p>
                                </div>

                                <div className="note-card__actions">
                                    {editMode ? (
                                        <button
                                            className="icon-btn icon-btn--cancel"
                                            onClick={handleCancelEdit}
                                            title="Cancel edit"
                                        >
                                            <img src="./images/close-large-fill.svg" alt="cancel" />
                                        </button>
                                    ) : (
                                        <button
                                            className="icon-btn icon-btn--edit"
                                            onClick={() => handleStartEdit(task)}
                                            title="Edit task"
                                        >
                                            <img src="./images/ball-pen-line.svg" alt="edit" />
                                        </button>
                                    )}
                                    <button
                                        className="icon-btn icon-btn--delete"
                                        onClick={() => handleDeleteTask(task.id)}
                                        title="Delete task"
                                    >
                                        <img src="./images/trash-can-regular.svg" alt="delete" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
            ) : (
                <div className="empty-board">
                    <div className="empty-board__icon">📒</div>
                    <h3>Your notebook is empty</h3>
                    <p>Add your first task above and start getting things done!</p>
                </div>
            )}
        </div>
    );
};

export default NoteBoard;
