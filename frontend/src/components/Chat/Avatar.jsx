export default function Avatar({ username, userId, isOnline, avatarLink, size = "md" }) {
  const colors = [
    "from-violet-500 to-purple-600",
    "from-rose-400 to-pink-600",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-600",
    "from-blue-400 to-indigo-600",
    "from-cyan-400 to-sky-600",
    "from-fuchsia-400 to-pink-600",
    "from-lime-400 to-green-600",
  ];

  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const gradientClass = colors[colorIndex];

  const sizeClasses = {
    sm: "w-8 h-8 rounded-xl text-xs",
    md: "w-11 h-11 rounded-2xl text-sm",
    lg: "w-14 h-14 rounded-2xl text-lg",
  };

  const dotSizeClasses = {
    sm: "w-2.5 h-2.5 border-2",
    md: "w-3 h-3 border-2",
    lg: "w-3.5 h-3.5 border-2",
  };

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden shadow-card transition-transform duration-200 hover:scale-105`}
      >
        {username && avatarLink ? (
          <img
            src={avatarLink}
            className="w-full h-full object-cover"
            alt={username[0]}
          />
        ) : (
          <span className="text-white font-bold uppercase drop-shadow-sm">
            {username ? username[0] : "?"}
          </span>
        )}
      </div>
      {isOnline && (
        <span className={`absolute -bottom-0.5 -right-0.5 ${dotSizeClasses[size]} bg-accent border-dark rounded-full shadow-glow-accent`} />
      )}
    </div>
  );
}
