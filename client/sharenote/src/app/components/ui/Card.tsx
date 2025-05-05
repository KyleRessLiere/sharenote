type CardProps = {
  title?: string;
  subtitle?: string;
  footer?: string;
  onClick?: () => void;
};

export default function Card({ title = "Untitled", subtitle, footer, onClick }: CardProps) {
  return (
    <div
      className="bg-white rounded-md shadow-sm border w-full aspect-[4/3] hover:shadow-md transition flex flex-col justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span dangerouslySetInnerHTML={{ __html: subtitle || "" }} />
        </div>
      </div>
      <div className="bg-gray-900 text-white px-4 py-2 text-right text-sm rounded-b-md mt-auto">
        <span className="bg-gray-700 px-3 py-1 rounded-full font-semibold">{footer}</span>
      </div>
    </div>
  );
}
