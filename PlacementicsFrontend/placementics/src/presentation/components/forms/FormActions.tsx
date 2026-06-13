export default function FormActions() {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      <button
        type="button"
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Submit
      </button>
    </div>
  );
}
