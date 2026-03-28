import { Star } from 'lucide-react';

const RatingStars = ({ rating, onChange = null, readOnly = false, size = "md" }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          className={`
            ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"}
            focus:outline-none
          `}
        >
          <Star
            className={`
              ${starSizes[size]} transition-all duration-300
              ${star <= rating ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "fill-transparent text-slate-600"}
            `}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
