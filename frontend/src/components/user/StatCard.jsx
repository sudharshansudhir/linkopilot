import { useEffect, useState } from "react";

function StatCard({
  title,
  value,
  icon,
  color = "yellow",
  subtitle,
}) {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    let start = 0;

    const end =
      Number(value) || 0;

    if (end === 0) return;

    const duration = 1200;

    const increment =
      end / (duration / 16);

    const timer =
      setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(
            Math.floor(start)
          );
        }
      }, 16);

    return () =>
      clearInterval(timer);
  }, [value]);

  const colorStyles = {
    yellow: {
      glow:
        "shadow-yellow-500/10",
      border:
        "border-yellow-500/20",
      icon:
        "text-yellow-400",
      value:
        "text-yellow-300",
    },

    cyan: {
      glow:
        "shadow-cyan-500/10",
      border:
        "border-cyan-500/20",
      icon:
        "text-cyan-400",
      value:
        "text-cyan-300",
    },

    green: {
      glow:
        "shadow-green-500/10",
      border:
        "border-green-500/20",
      icon:
        "text-green-400",
      value:
        "text-green-300",
    },

    purple: {
      glow:
        "shadow-purple-500/10",
      border:
        "border-purple-500/20",
      icon:
        "text-purple-400",
      value:
        "text-purple-300",
    },
  };

  const theme =
    colorStyles[color];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        ${theme.border}
        bg-zinc-950
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        ${theme.glow}
      `}
    >
      {/* TOP GLOW */}

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all" />

      {/* ICON */}

      <div
        className={`
          mb-5
          text-3xl
          ${theme.icon}
        `}
      >
        {icon}
      </div>

      {/* TITLE */}

      <p className="text-zinc-500 text-sm uppercase tracking-widest">
        {title}
      </p>

      {/* VALUE */}

      <h2
        className={`
          mt-3
          text-4xl
          font-black
          ${theme.value}
        `}
      >
        {count}
      </h2>

      {/* SUBTITLE */}

      {subtitle && (
        <p className="mt-3 text-zinc-400 text-sm">
          {subtitle}
        </p>
      )}

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          -right-10
          -bottom-10
          w-32
          h-32
          rounded-full
          bg-white/[0.03]
          blur-2xl
        "
      />
    </div>
  );
}

export default StatCard;