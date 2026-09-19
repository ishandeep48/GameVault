/**
 * Simple footer component.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gv-text-muted">
        <p>© {new Date().getFullYear()} GameVault. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gv-text-secondary transition-colors">Privacy</a>
          <a href="#" className="hover:text-gv-text-secondary transition-colors">Terms</a>
          <a href="#" className="hover:text-gv-text-secondary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
