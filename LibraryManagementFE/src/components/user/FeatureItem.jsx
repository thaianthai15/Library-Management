export default function FeatureItem({ icon: Icon, title, description, isLast }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 w-full ${!isLast ? "border-r border-gray-200" : ""}`}>
      <div className="flex-shrink-0 w-14 h-14 bg-[--primary-color] text-white rounded-lg flex items-center justify-center text-2xl">
        <Icon />
      </div>

      <div className="flex flex-col">
        <h3 className="text-[--primary-color] font-bold text-lg leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  );
}