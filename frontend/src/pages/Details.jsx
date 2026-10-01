import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const Details = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/task/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getDataById();
  }, [id]);

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      toast.success("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
          <p className="text-sm text-slate-400">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Task Manager
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Edit Task
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Update the details of your task below.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back
          </button>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
          {/* Card Header */}
          <div className="border-b border-slate-800 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                ✏️
              </div>

              <div>
                <h2 className="font-semibold text-white">Task Information</h2>
                <p className="text-sm text-slate-500">
                  Make changes to your task
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-7 px-6 py-7 sm:px-8 sm:py-8">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Task title
              </label>

              <input
                id="title"
                type="text"
                value={task.title}
                onChange={(e) =>
                  setTask({
                    ...task,
                    title: e.target.value,
                  })
                }
                placeholder="Enter task title"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                id="content"
                rows={6}
                value={task.content}
                onChange={(e) =>
                  setTask({
                    ...task,
                    content: e.target.value,
                  })
                }
                placeholder="Describe your task..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Task Information */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Created */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-sm">
                    📅
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Created
                  </p>
                </div>

                <p className="text-sm font-medium text-slate-300">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : "Unknown"}
                </p>
              </div>

              {/* Task ID */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-sm">
                    #️⃣
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Task ID
                  </p>
                </div>

                <p className="truncate font-mono text-xs text-slate-400">
                  {task._id}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 bg-slate-950/50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={() => handleUpdate(task._id)}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="mt-5 text-center text-xs text-slate-600">
          Changes will be saved to your task immediately.
        </p>
      </div>
    </div>
  );
};

export default Details;
