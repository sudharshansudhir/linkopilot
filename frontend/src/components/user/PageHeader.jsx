function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-8 lg:p-10 mb-8">

      {/* Glow Effects */}

      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full" />

      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />

      {/* Content */}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-yellow-300
              via-white
              to-cyan-300
              bg-clip-text
              text-transparent
            "
          >
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          )}

        </div>

        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}

      </div>

      {/* Bottom Accent */}

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-yellow-400 opacity-50" />

    </div>
  );
}

export default PageHeader;