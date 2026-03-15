import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import AppBanner from "./components/AppBanner"
import NoteForm from "./components/NoteForm"
import NoteBoard from "./components/NoteBoard"
import './TaskApp.css'

const TaskApp = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const priorityRef = useRef(null);

  const handleSaveTaskOrAddTask = () => {
    const title = titleRef.current.value.trim();
    const name = inputRef.current.value.trim();
    const priority = priorityRef.current.value;

    if (!title) {
      Swal.fire({
        icon: "warning",
        text: "Please enter a note title.",
        timer: 1500,
        timerProgressBar: true,
        heightAuto: false
      });
      return;
    }

    if (!name) {
      Swal.fire({
        icon: "warning",
        text: "Please enter a task description.",
        timer: 1500,
        timerProgressBar: true,
        heightAuto: false
      });
      return;
    }

    if (tasks.some(task => (name === task.name) && (priority === task.priority) && (title === task.title))) {
      Swal.fire({
        icon: "warning",
        text: "This task already exists!",
        timer: 1500,
        timerProgressBar: true,
        heightAuto: false
      });
      return;
    }

    if (editMode) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editTaskId ? { ...task, title, name, priority } : task
        )
      );
      setEditMode(false);
      setEditTaskId(null);
      titleRef.current.value = "";
      inputRef.current.value = "";
      priorityRef.current.value = "medium";
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      name,
      priority
    };
    setTasks(prev => [...prev, newTask]);
    titleRef.current.value = "";
    inputRef.current.value = "";
    priorityRef.current.value = "medium";
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    titleRef.current.value = "";
    inputRef.current.value = "";
    priorityRef.current.value = "medium";
  };

  const handleStartEdit = (task) => {
    titleRef.current.value = task.title;
    inputRef.current.value = task.name;
    priorityRef.current.value = task.priority;
    setEditMode(true);
    setEditTaskId(task.id);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditTaskId(null);
    titleRef.current.value = "";
    inputRef.current.value = "";
    priorityRef.current.value = "medium";
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app-wrapper">
      <AppBanner />
      <NoteForm
        handleSaveTaskOrAddTask={handleSaveTaskOrAddTask}
        titleRef={titleRef}
        inputRef={inputRef}
        priorityRef={priorityRef}
        editMode={editMode}
      />
      <NoteBoard
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleStartEdit={handleStartEdit}
        handleCancelEdit={handleCancelEdit}
        editMode={editMode}
      />
    </div>
  )
};

export default TaskApp;
