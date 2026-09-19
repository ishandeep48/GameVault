/** Placeholder — Mission Detail Page */
export default function MissionDetailPage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gv-text-primary mb-2">
        Mission Detail
      </h1>
      <p className="text-gv-text-secondary mb-8">
        Placeholder — to be implemented in Phase 7.
      </p>

      {/* Skeleton example */}
      <div className="card max-w-3xl">
        <div className="h-6 bg-gv-bg-tertiary rounded w-1/2 mb-4" />
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gv-bg-tertiary rounded w-full" />
          <div className="h-4 bg-gv-bg-tertiary rounded w-5/6" />
        </div>
        <div className="border-t border-white/[0.06] pt-4">
          <div className="h-10 bg-gv-bg-tertiary rounded w-full mb-3" />
          <div className="h-10 bg-gv-bg-tertiary rounded w-full mb-3" />
        </div>
      </div>
    </div>
  )
}
