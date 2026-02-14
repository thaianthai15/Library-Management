import { FaArrowRight } from "react-icons/fa";

export default function Button({
  children,
  iconLeft: IconLeft,
  iconRight: IconRight,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-[--primary-color] text-white border-none",
    light: "bg-[#d0e1e7] text-[--primary-color] hover:text-white border-none",
    outline: "bg-transparent border-[--primary-color] text-[--primary-color]",
  };

  return (
    <button
      {...props}
      className={`
        relative overflow-hidden
        rounded-full border
        px-8 py-3
        font-bold
        transition-all duration-300
        group
        flex items-center justify-center gap-2
        ${variants[variant]} 
        ${className}
      `}
    >
      {variant && (
        <span
          className="
            absolute inset-0
            bg-[--highlight-color]
            transform scale-x-0
            origin-left
            transition-transform duration-300 ease-out
            group-hover:scale-x-100
          "
        ></span>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {IconLeft && <IconLeft className="text-xl" />}

        {children}

        {IconRight && (
          <IconRight className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </button>
  );
}
