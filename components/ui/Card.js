export default function Card({ children, className = "", darkMode }) {
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-2xl shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}
