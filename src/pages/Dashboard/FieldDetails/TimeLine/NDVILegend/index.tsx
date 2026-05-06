const legendStops = [
  { label: '1.0 (High)', color: '#15803d' },
  { label: '0.5', color: '#84cc16' },
  { label: '0.0', color: '#facc15' },
  { label: '-1.0 (Low)', color: '#ef4444' },
];

const NDVILegend = () => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
      <div
        className="h-30 w-5 rounded-full shadow-inner"
        style={{
          background:
            'linear-gradient(to bottom, #15803d 0%, #84cc16 35%, #facc15 68%, #ef4444 100%)',
        }}
      />

      <div className="flex flex-col gap-2">
        {legendStops.map(stop => (
          <div
            key={stop.label}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stop.color }} />
            <span>{stop.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NDVILegend;
