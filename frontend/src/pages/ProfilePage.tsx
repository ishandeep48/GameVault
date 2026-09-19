/** Placeholder — Profile Page */
export default function ProfilePage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gv-text-primary mb-2">
        User Profile
      </h1>
      <p className="text-gv-text-secondary mb-8">
        Placeholder — to be implemented in Phase 9.
      </p>

      {/* Skeleton example */}
      <div className="card max-w-4xl flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 rounded-full bg-gv-bg-tertiary shrink-0" />
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="h-7 bg-gv-bg-tertiary rounded w-1/3 mx-auto md:mx-0" />
          <div className="h-4 bg-gv-bg-tertiary rounded w-2/3 mx-auto md:mx-0" />
          <div className="flex gap-6 justify-center md:justify-start pt-4">
            <div className="h-10 bg-gv-bg-tertiary rounded w-20" />
            <div className="h-10 bg-gv-bg-tertiary rounded w-20" />
            <div className="h-10 bg-gv-bg-tertiary rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
