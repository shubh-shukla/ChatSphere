import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get("/api/avatar/all");
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  return (
    <div>
      <h3 className="text-sm font-medium text-textSecondary mb-1">
        Choose your avatar
      </h3>
      <p className="text-xs text-textMuted mb-4">Pick one that represents you best</p>

      {loading && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-surfaceLight animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {avatars?.map((avatar, index) => (
            <button
              type="button"
              key={avatar._id}
              onClick={() => setSelectedLink(avatar.link)}
              className={`
                relative group rounded-2xl p-1.5 transition-all duration-200 animate-fade-in
                ${selectedLink === avatar.link
                  ? "bg-primaryMuted ring-2 ring-primary scale-105 shadow-glow-sm"
                  : "bg-surface hover:bg-surfaceLight hover:scale-105 hover:shadow-card"
                }
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <img
                src={avatar.link}
                alt={`Avatar ${avatar._id}`}
                className="w-full aspect-square rounded-xl object-cover"
              />
              {selectedLink === avatar.link && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-glow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              )}
              {/* Hover overlay */}
              <div className={`absolute inset-1.5 rounded-xl bg-primary/0 group-hover:bg-primary/10 transition-all duration-200 ${
                selectedLink === avatar.link ? "bg-primary/10" : ""
              }`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectAvatar;
