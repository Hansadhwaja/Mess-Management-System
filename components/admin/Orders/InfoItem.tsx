const InfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-gray-500 uppercase text-xs tracking-wide">
      {label}
    </span>
    <span className="mt-1 text-gray-900 font-medium break-words">{value}</span>
  </div>
);

export default InfoItem;
