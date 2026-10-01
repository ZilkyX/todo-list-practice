import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${BASE_URL}/task`);
      const data = await response.json();

      setTasks(data.tasks);
    };

    getData();
  }, [tasks]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/task/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Tasks
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and keep track of your tasks.
            </p>
          </div>

          <button
            onClick={() => navigate("/task")}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Tasks</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Tasks</p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-slate-500">Status</p>

            <p className="mt-2 text-lg font-semibold text-emerald-600">
              All systems operational
            </p>
          </div>
        </div>

        {/* Tasks header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>

            <p className="mt-1 text-sm text-slate-500">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} available
            </p>
          </div>

          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-slate-400">
            <option>All Tasks</option>
            <option>Recent</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* Task cards */}
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
              📝
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No tasks yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first task to get started.
            </p>

            <button
              onClick={() => navigate("/task")}
              className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => {
              return (
                <article
                  key={task._id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Blue accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

                  {/* Card top */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                      Task
                    </span>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="rounded-lg p-3 text-m leading-none cursor-pointer bg-red-400 text-white transition hover:bg-zinc-400 hover:text-slate-700"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                    {task.title}
                  </h3>

                  {/* Content */}
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {task.content}
                  </p>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-medium text-slate-400">
                      ID: {task._id.slice(-6)}
                    </span>

                    <button
                      onClick={() => navigate(`/task/${task._id}`)}
                      className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                      View task →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
