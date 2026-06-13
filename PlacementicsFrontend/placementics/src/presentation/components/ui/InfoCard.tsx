import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
