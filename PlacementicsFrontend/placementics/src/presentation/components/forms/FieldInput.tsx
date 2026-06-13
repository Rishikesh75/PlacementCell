type FieldInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "date" | "password";
};

export default function FieldInput({
  id,
  label,
  placeholder,
  type = "text",
}: FieldInputProps) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-0 transition focus:border-indigo-500"
      />
    </label>
  );
}
