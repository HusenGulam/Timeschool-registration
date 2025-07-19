"use client";
import './App.css'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import robot from "../img/robott.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faListNumeric, faPhone, faLocation } from '@fortawesome/free-solid-svg-icons';


export default function RobotForm() {
  const [formData, setFormData] = useState({
    ism: "",
    familiya: "",
    yosh: "",
    raqam: "",
    manzil: "",
  });

  const [robotMsg, setRobotMsg] = useState("Hush kelibsan!");
  const [showMsg, setShowMsg] = useState(true);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key].trim()) {
        const formatted = key.charAt(0).toUpperCase() + key.slice(1);
        setRobotMsg(`💭 ${formatted} bo'sh qoldi!`);
        setShowMsg(false);
        setTimeout(() => setShowMsg(true), 50);
        return;
      }
    }

    setRobotMsg("📤 Yuborilmoqda...");
    setShowMsg(false);
    setTimeout(() => setShowMsg(true), 50);

    const message = `
📝 Yangi o'quvchi yuborildi:

👤 Ism: ${formData.ism}
👤 Familiya: ${formData.familiya}
🎂 Yosh: ${formData.yosh}
📱 Raqam: ${formData.raqam}
📍 Manzil: ${formData.manzil}
`;

    try {
      const response = await fetch(`https://api.telegram.org/bot8104651750:AAG08hZyYNKCI8E6upO1uGkWsUw5qiIHVvs/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "6173952454",
          text: message,
        }),
      });

      if (response.ok) {
        setRobotMsg("✅ Muvaffaqiyatli yuborildi!");
        setFormData({
          ism: "",
          familiya: "",
          yosh: "",
          raqam: "",
          manzil: "",
        });

        setShowMsg(false);
        setTimeout(() => setShowMsg(true), 50);

        // ✅ Navigate to another page
        navigate("/rating");
      } else {
        setRobotMsg("❌ Xatolik yuz berdi!");
        setShowMsg(false);
        setTimeout(() => setShowMsg(true), 50);
      }
    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error);
      setRobotMsg("❌ Ulanishda muammo bor!");
      setShowMsg(false);
      setTimeout(() => setShowMsg(true), 50);
    }
  };

  const handleFocus = (field) => {
    const messages = {
      ism: (
        <>
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Bu yerga ismingni yozasan.
        </>
      ),
      familiya: (
        <>
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Familiyangni kiriting.
        </>
      ),
      yosh: (
        <>
          <FontAwesomeIcon icon={faListNumeric} className="mr-2" />
          Bu yerga yoshingni yoz.
        </>
      ),
      raqam: (
        <>
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          Telefon raqamingni yoz.
        </>
      ),
      manzil: (
        <>
          <FontAwesomeIcon icon={faLocation} className="mr-2" />
          Qayerdansan? Manzilingni yoz.
        </>
      ),
    };

    setRobotMsg(messages[field] || "✍️ Ma'lumotni kiriting.");
    setShowMsg(false);
    setTimeout(() => setShowMsg(true), 50);
  };


  return (
    <div
      className="  min-h-screen flex items-center justify-center p-6 relative"
      style={{
        background: "linear-gradient(136deg, #facc15 50%, #000000 50%)",
      }}
    >
      {/* Robot */}

       
     <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-4 left-4 "
      >
        {/* ✅ floating animation on wrapper, NOT on parent or img directly */}
        <motion.div
  animate={{ y: [0, -60, 0] }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  }}
  className="w-full h-full"
>
  <img
    src={robot}
    alt="Robot"
   className='robotic'
  />
</motion.div>


        <AnimatePresence >
          {showMsg && (
            <motion.div
              key={robotMsg}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className=" bubble absolute -top-20  left-5 - bg-yellow-400 text-black text-xs px-4 py-2 rounded-full shadow-lg border border-black"
            >
              <p >{robotMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className=" main-form w-full max-w-sm p-6 font-bold shadow-xl text-yellow-400"
        style={{
          background: "linear-gradient(136.1deg, #000000 50%, #facc15 50%)",
        }}
      >
        {["ism", "familiya", "yosh", "raqam", "manzil"].map((field) => (
  <input
    key={field}
    name={field}
    value={formData[field]}
    onChange={handleChange}
    onFocus={() => handleFocus(field)} // 🧠 bubble logic
    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
    className=" w-full p-2 bg-transparent border-2 border-white text-black-400 placeholder-white-300 rounded mb-3 focus:outline-none"
/>
))}


        <button
          type="submit"
          className="w-full bg-transparent border-2 border-white text-black py-2 rounded hover:bg-black hover:border-0 hover:text-yellow-400 transition"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}
