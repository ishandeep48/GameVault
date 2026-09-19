/** Placeholder — Game Details Page */
export default function GameDetailsPage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gv-text-primary mb-2">
        Game Details
      </h1>
      <p className="text-gv-text-secondary mb-8">
        Placeholder — to be implemented in Phase 5.
      </p>

      {/* Skeleton example */}
      <div className="card max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 aspect-[3/4] bg-gv-bg-tertiary rounded-gv-sm shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gv-bg-tertiary rounded w-2/3" />
            <div className="h-4 bg-gv-bg-tertiary rounded w-1/3" />
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-gv-bg-tertiary rounded w-full" />
              <div className="h-4 bg-gv-bg-tertiary rounded w-5/6" />
              <div className="h-4 bg-gv-bg-tertiary rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
