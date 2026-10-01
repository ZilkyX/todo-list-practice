import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const CreatePage = () => {
  const navigate = useNavigate();
  //placeholder or variable
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation
      if (!formData.title || !formData.content) {
        toast.error("All fields are required");
        return;
      }

      //creation
      await fetch(`${BASE_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //navigation
      navigate("/");
      toast.success("Task created!");
    } catch (error) {
      console.error(error);
      toast.error("Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create New Task
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new task and keep your work organized.
          </p>
        </div>
      </header>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Form Header */}
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Task Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the information below to create your task.
            </p>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 px-6 py-6 sm:px-8 sm:py-8"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Task Title
              </label>

              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                id="title"
                type="text"
                placeholder="Enter your task title"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                id="content"
                rows="6"
                placeholder="Describe what needs to be done..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreatePage;
