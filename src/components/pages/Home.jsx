import { useNavigate } from "react-router-dom";
import { BsChatSquareDotsFill } from "react-icons/bs";
import BotTestIamge from "../../assets/AiBotTestImg.jpg";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center max-w-md w-full">
        <img src={BotTestIamge} alt="" className="w-full h-full object-cover rounded-full" />
        <h1 className="text-5xl font-bold text-black mb-4">EChat</h1>
        <p className="text-lg text-gray-500 mb-10">Your AI-powered chat assistant</p>
        <button
          onClick={() => navigate("/chat")}
          className="w-full py-4 text-lg font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
}
