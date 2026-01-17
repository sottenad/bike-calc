export function GearLegend() {
  const items = [
    { color: 'bg-green-500', label: 'Ideal (70-95 RPM)' },
    { color: 'bg-yellow-500', label: 'Acceptable (60-70 or 95-110 RPM)' },
    { color: 'bg-red-500', label: 'Difficult (<60 or >110 RPM)' }
  ];

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-slate-400 mt-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${item.color}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
