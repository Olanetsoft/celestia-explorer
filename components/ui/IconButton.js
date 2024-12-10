export default function IconButton({ icon: Icon, onClick, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
      } hover:bg-opacity-80 transition-all duration-200 shadow-lg`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
