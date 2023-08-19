import { Trash } from "@phosphor-icons/react";

import styles from "./Task.module.css";

export interface Task {
  task: string;
  isComplete: boolean;
}

export interface TaskProps {
  task: Task;
  onComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function Task(props: TaskProps) {
  const {
    task: { isComplete, task },
    onComplete,
    onDelete,
  } = props;

  function handleComplete() {
    onComplete(props.task);
  }

  function handleDelete() {
    onDelete(props.task);
  }

  return (
    <div className={styles.task}>
      <input type="checkbox" checked={isComplete} onChange={handleComplete} />
      <span className={styles.taskText}>{task}</span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <Trash size={14} />
      </button>
    </div>
  );
}
