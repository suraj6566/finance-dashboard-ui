export default function SectionCard({ title, eyebrow, actions, children, className = "" }) {
  return (
    <section
      className={`rounded-[2rem] border border-white/60 bg-white/88 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:shadow-xl dark:border-slate-700/80 dark:bg-[#1f2b43] ${className}`}
    >
      {(title || actions || eyebrow) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-violet-300">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            ) : null}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
