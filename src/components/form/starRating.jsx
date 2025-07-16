import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex justify-center space-x-3 py-3 bg-black rounded-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={36}
          className={`cursor-pointer transition duration-200 ${
            rating >= star ? 'text-yellow-400' : 'text-white'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
}
