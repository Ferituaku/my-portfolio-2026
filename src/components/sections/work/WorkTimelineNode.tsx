'use client'

import { memo } from 'react'

interface WorkTimelineNodeProps {
  isLatest?: boolean
  isFocalPoint?: boolean
  isExpanded?: boolean
}

export const WorkTimelineNode = memo(function WorkTimelineNode({
  isLatest = false,
  isExpanded = false,
}: WorkTimelineNodeProps) {
  if (isLatest) {
    return (
      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-foreground shadow-xs">
        {/* Pulsing ring indicator for the latest/active position */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
        <span
          className={`relative inline-flex rounded-full bg-foreground transition-all duration-300 ${
            isExpanded ? 'w-2.5 h-2.5 scale-110' : 'w-2 h-2 group-hover:scale-125'
          }`}
        />
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background border-2 border-border/80 group-hover:border-foreground transition-all duration-300 shadow-xs">
      <span
        className={`rounded-full bg-muted-foreground/60 group-hover:bg-foreground transition-all duration-300 ${
          isExpanded
            ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-foreground scale-110'
            : 'w-1.5 h-1.5 sm:w-2 sm:h-2 group-hover:scale-125'
        }`}
      />
    </div>
  )
})
