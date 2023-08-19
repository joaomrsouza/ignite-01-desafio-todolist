import { Clipboard, PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./App.module.css";
import { Input } from "./components/Input";
import { Task } from "./components/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTasks((st) => [
      ...st,
      {
        task: newTaskText,
        isComplete: false,
      },
    ]);

    setNewTaskText("");
  }

  function handleNewTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(e.target.value);
    e.target.setCustomValidity("");
  }

  function handleInvalid(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity("Digite uma tarefa");
  }

  function handleCompleteTask(task: Task) {
    setTasks((st) =>
      st.map((t) => {
        if (t.task === task.task) {
          return {
            ...t,
            isComplete: !t.isComplete,
          };
        }
        return t;
      })
    );
  }

  function handleDeleteTask(task: Task) {
    setTasks((st) => st.filter((t) => t.task !== task.task));
  }

  const completedTasks = tasks.filter((task) => task.isComplete);

  return (
    <div className={styles.container}>
      <header>
        <img src="/logo.svg" alt="Todo Logo" />
      </header>
      <main>
        <form className={styles.form} onSubmit={handleCreateTask}>
          <Input
            required
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onInvalid={handleInvalid}
            onChange={handleNewTaskTextChange}
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </form>
        <div className={styles.taskListContainer}>
          <header>
            <h5>
              Tarefas criadas
              <span>{tasks.length}</span>
            </h5>
            <h5>
              Concluídas
              <span>
                {tasks.length
                  ? `${completedTasks.length} de ${tasks.length}`
                  : "0"}
              </span>
            </h5>
          </header>
          {tasks.length === 0 ? (
            <div className={styles.noTasks}>
              <Clipboard size={64} />
              <h5>Você ainda não tem tarefas cadastradas</h5>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <div>
              {tasks.map((task) => (
                <Task
                  key={task.task}
                  task={task}
                  onComplete={handleCompleteTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
