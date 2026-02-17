export function renderStars(rating: number | undefined, showText = true, size: 'sm' | 'lg' = 'sm') {
  if (!rating) return null;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const starSize = size === 'sm' ? 'text-sm' : 'text-lg';
  const gapSize = size === 'sm' ? 'gap-1' : 'gap-2';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  
  return (
    <div className={`flex items-center ${gapSize}`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`${starSize} ${
              i < fullStars
                ? 'text-amber-400'
                : i === fullStars && hasHalfStar
                ? 'text-amber-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      {showText && (
        <span className={`${textSize} font-semibold text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
