import { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, MoreHorizontal } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/utils/cn'

export interface ReviewCardProps {
  _id?: string // kept for future API compatibility
  _userId?: string // kept for future API compatibility
  username: string
  avatarUrl?: string
  rating: number // 1-5
  content: string
  createdAt: string
  likes: number
  dislikes: number
  isLiked?: boolean
  isDisliked?: boolean
  onLike?: () => void
  onDislike?: () => void
  onReply?: () => void
  /** When true, actions require authentication */
  authRequired?: boolean
  /** Called when an action is clicked while auth is required (e.g. navigate to login) */
  onAuthRequired?: () => void
  className?: string
}

/**
 * Reusable review card for game and mission reviews.
 */
export function ReviewCard({
  _id: _reviewId,
  _userId: _reviewUserId,
  username,
  avatarUrl,
  rating,
  content,
  createdAt,
  likes,
  dislikes,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  onReply,
  authRequired = false,
  onAuthRequired,
  className,
}: ReviewCardProps) {
  const [showAllContent, setShowAllContent] = useState(false)

  // Format relative time (simplified — can be enhanced with date-fns later)
  const timeAgo = getTimeAgo(createdAt)

  return (
    <div className={cn('card card-hover', className)}>
      {/* Header: avatar + username + rating */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={avatarUrl} alt={username} fallback={username} size="md" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gv-text-primary">{username}</p>
              <p className="text-xs text-gv-text-muted">{timeAgo}</p>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn('w-4 h-4', i < rating ? 'text-status-completed' : 'text-gv-bg-tertiary')}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review content */}
      <div className="mb-3">
        <p className={cn(
          'text-sm text-gv-text-secondary leading-relaxed',
          !showAllContent && 'line-clamp-3',
        )}>
          {content}
        </p>
        {content.length > 200 && (
          <button
            type="button"
            onClick={() => setShowAllContent(!showAllContent)}
            className="mt-1 text-xs font-medium text-gv-accent hover:underline"
          >
            {showAllContent ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Actions bar */}
      <div className="flex items-center gap-1 pt-2 border-t border-white/[0.06]">
        {/* Like button */}
        <Tooltip content={authRequired ? 'Login to like' : isLiked ? 'Unlike' : 'Like'} position="bottom">
          <button
            type="button"
            onClick={() => authRequired && onAuthRequired ? onAuthRequired() : (!authRequired ? onLike?.() : undefined)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors',
              authRequired
                ? 'text-gv-text-muted cursor-pointer hover:text-gv-accent'
                : isLiked
                  ? 'text-gv-accent bg-gv-accent/10'
                  : 'text-gv-text-muted hover:text-gv-text-primary hover:bg-white/[0.05]',
            )}
            aria-label={isLiked ? 'Unlike this review' : authRequired ? 'Login to like this review' : 'Like this review'}
          >
            <ThumbsUp size={14} className={cn(isLiked && 'fill-current')} />
            {likes || ''}
          </button>
        </Tooltip>

        {/* Dislike button */}
        <Tooltip content={authRequired ? 'Login to dislike' : isDisliked ? 'Remove dislike' : 'Dislike'} position="bottom">
          <button
            type="button"
            onClick={() => authRequired && onAuthRequired ? onAuthRequired() : (!authRequired ? onDislike?.() : undefined)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors',
              authRequired
                ? 'text-gv-text-muted cursor-pointer hover:text-red-400'
                : isDisliked
                  ? 'text-red-400 bg-red-500/10'
                  : 'text-gv-text-muted hover:text-gv-text-primary hover:bg-white/[0.05]',
            )}
            aria-label={isDisliked ? 'Remove dislike' : authRequired ? 'Login to dislike this review' : 'Dislike this review'}
          >
            <ThumbsDown size={14} className={cn(isDisliked && 'fill-current')} />
            {dislikes || ''}
          </button>
        </Tooltip>

        {/* Reply button */}
        {onReply && (
          <Tooltip content={authRequired ? 'Login to reply' : 'Reply'} position="bottom">
            <button
              type="button"
              onClick={() => authRequired && onAuthRequired ? onAuthRequired() : (!authRequired ? onReply?.() : undefined)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors',
                authRequired
                  ? 'text-gv-text-muted cursor-pointer hover:text-gv-accent'
                  : 'text-gv-text-muted hover:text-gv-text-primary hover:bg-white/[0.05]',
              )}
              aria-label={authRequired ? `Login to reply to ${username}'s review` : `Reply to ${username}'s review`}
            >
              <MessageSquare size={14} />
              Reply
            </button>
          </Tooltip>
        )}

        {/* More options */}
        <div className="ml-auto">
          <Tooltip content="More options" position="bottom">
            <button
              type="button"
              className="p-1.5 rounded-md text-gv-text-muted hover:text-gv-text-primary hover:bg-white/[0.08] transition-colors"
              aria-label="More options for this review"
            >
              <MoreHorizontal size={16} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

/**
 * Simple time-ago formatter.
 */
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
