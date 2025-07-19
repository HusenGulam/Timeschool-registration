import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatePage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (value) => {
    setRating(prev => (prev === value ? 0 : value)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      alert("Iltimos, baho bering va fikringizni yozing.");
      return;
    }

    const message = `
⭐️ Yangi baho keldi!

📊 Baho: ${rating} / 5
💬 Fikr: ${comment}
`;

    try {
      await fetch(`https://api.telegram.org/bot8104651750:AAG08hZyYNKCI8E6upO1uGkWsUw5qiIHVvs/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "6173952454",
          text: message,
        }),
      });

      setSubmitted(true);
      setRating(0);
      setComment("");
    } catch (error) {
      alert("❌ Telegramga yuborishda xatolik.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">💬  baholang</h2>

      {submitted ? (
        <p className="text-green-600 font-semibold">✅ Fikringiz uchun rahmat!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              const isActive = starValue <= rating;

              return (
                <div
                  key={index}
                  onClick={() => handleStarClick(starValue)}
                  className={`p-2 rounded-full cursor-pointer transition ${
                    isActive ? "bg-yellow-300" : "bg-white"
                  }`}
                >
                  <FaStar
                    size={28}
                    color={isActive ? "#ffc107" : "#e4e5e9"}
                  />
                </div>
              );
            })}
          </div>

          <textarea
            placeholder="Fikringizni yozing..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-3 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Yuborish
          </button>
        </form>
      )}
    </div>
  );
};

export default RatePage;
 