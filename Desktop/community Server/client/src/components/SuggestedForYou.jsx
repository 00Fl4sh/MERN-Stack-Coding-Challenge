function SuggestedForYou() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Suggested for You</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[1,2].map(i => (
          <div key={i} className="min-w-[220px] bg-white rounded-lg shadow p-4 flex flex-col gap-2">
            <div className="font-semibold text-lg">Suggested Path {i}</div>
            <div className="text-sm text-gray-500">Based on your interests</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuggestedForYou; 