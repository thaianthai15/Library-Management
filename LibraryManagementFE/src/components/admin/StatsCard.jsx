export default function StatsCard({ title, count, color, icon }) {
  return (
    <div className={`${color} text-white p-6 rounded-xl shadow-lg flex justify-between items-center min-h-[120px]`}>
      <div>
        <p className="text-xs opacity-90 font-bold uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black">
          {count?.toLocaleString() || 0}
        </h3>
      </div>
      <div className="text-4xl opacity-40">
        {icon}
      </div>
    </div>
  );
}