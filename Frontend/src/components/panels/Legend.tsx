export function Legend() {
  const items = [
    { label: 'Default', className: 'bar-default' },
    { label: 'Comparing', className: 'bar-comparing' },
    { label: 'Swapping', className: 'bar-swapping' },
    { label: 'Sorted', className: 'bar-sorted' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 justify-center">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${item.className}`} />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
