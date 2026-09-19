/** Placeholder — Community Page */
export default function CommunityPage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gv-text-primary mb-2">
        Community
      </h1>
      <p className="text-gv-text-secondary mb-8">
        Placeholder — to be implemented in Phase 8.
      </p>

      {/* Skeleton example */}
      <div className="max-w-3xl space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gv-bg-tertiary shrink-0" />
              <div>
                <div className="h-4 bg-gv-bg-tertiary rounded w-24 mb-1" />
                <div className="h-3 bg-gv-bg-tertiary rounded w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gv-bg-tertiary rounded w-full" />
              <div className="h-4 bg-gv-bg-tertiary rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
