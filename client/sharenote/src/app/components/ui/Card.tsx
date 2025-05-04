// src/components/ui/Card.tsx
import { FaRegFileAlt } from "react-icons/fa";

type CardProps = {
  title?: string;
  subtitle?: string;
  footer?: string;
};

export default function Card({
  title = "Untitled",
  subtitle = "Unnamed Topic \n  asdasdasß" ,
  footer = "Tag",
}: CardProps) {
  return (
<div className="bg-white rounded-md shadow-sm border w-full max-w-xs hover:shadow-md transition min-h-64 flex flex-col">
<div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
         
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="bg-gray-900 text-white px-4 py-2 text-right text-sm rounded-b-md mt-auto">
  <span className="bg-gray-700 px-3 py-1 rounded-full font-semibold">
    {footer}
  </span>
</div>

    </div>
  );
}
