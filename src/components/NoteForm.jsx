const NoteForm = ({ handleSaveTaskOrAddTask, titleRef, inputRef, priorityRef, editMode }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSaveTaskOrAddTask();
    };

    return (
        <div className="note-form">
            <div className="form-row form-row--full">
                <label htmlFor="noteTitleInput">
                    <span className="label-icon">📌</span> Note Title
                </label>
                <input
                    ref={titleRef}
                    type="text"
                    id="noteTitleInput"
                    placeholder="e.g. Work tasks, Personal, Shopping…"
                    maxLength="100"
                />
            </div>

            <div className="form-row form-row--full">
                <label htmlFor="taskInput">
                    <span className="label-icon">📝</span> Task Description
                </label>
                <input
                    ref={inputRef}
                    type="text"
                    id="taskInput"
                    placeholder="What needs to be done?"
                    maxLength="500"
                    onKeyDown={(e) => e.key === "Enter" && handleSaveTaskOrAddTask()}
                />
            </div>

            <div className="form-row form-row--half">
                <label htmlFor="prioritySelect">
                    <span className="label-icon">🎯</span> Priority
                </label>
                <select ref={priorityRef} id="prioritySelect" defaultValue="medium">
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                </select>
            </div>

            <div className="form-row form-row--half form-row--action">
                <button onClick={handleSaveTaskOrAddTask} className="submit-btn" id="addTaskBtn">
                    {editMode
                        ? <><span>💾</span> Save Changes</>
                        : <><span>+</span> Add Task</>
                    }
                </button>
            </div>
        </div>
    );
};

export default NoteForm;
