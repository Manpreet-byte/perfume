import { useEffect, useMemo, useRef, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function isInteractive(el) {
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
  if (el.isContentEditable) return true
  return false
}

export default function Draggable({
  storageKey,
  defaultPosition = { x: 20, y: 20 },
  handleSelector = null,
  className,
  style,
  children,
}) {
  const ref = useRef(null)
  const pointerIdRef = useRef(null)
  const startRef = useRef({ x: 0, y: 0, left: 0, top: 0 })
  const movedRef = useRef(false)

  const [pos, setPos] = useState(() => {
    if (!storageKey) return defaultPosition
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return defaultPosition
      const parsed = JSON.parse(raw)
      if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') return parsed
    } catch (err) {
      // ignore
    }
    return defaultPosition
  })

  const resolvedStyle = useMemo(() => {
    return {
      position: 'fixed',
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      zIndex: 90,
      touchAction: 'none',
      ...style,
    }
  }, [pos.x, pos.y, style])

  useEffect(() => {
    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(pos))
    } catch (err) {
      // ignore
    }
  }, [pos, storageKey])

  useEffect(() => {
    function onResize() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setPos((p) => {
        const next = {
          x: clamp(p.x, 8, window.innerWidth - rect.width - 8),
          y: clamp(p.y, 8, window.innerHeight - rect.height - 8),
        }
        return next.x === p.x && next.y === p.y ? p : next
      })
    }

    // Clamp once on mount (after first layout)
    const raf = window.requestAnimationFrame(onResize)
    window.addEventListener('resize', onResize)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onPointerDown = (e) => {
    if (pointerIdRef.current !== null) return
    if (e.button !== 0 && e.pointerType !== 'touch') return

    const target = e.target
    const el = ref.current
    if (!el) return

    if (handleSelector) {
      const handle = target?.closest?.(handleSelector)
      if (!handle) return
    } else if (isInteractive(target)) {
      // allow text inputs/selection to work normally
      return
    }

    const rect = el.getBoundingClientRect()
    pointerIdRef.current = e.pointerId
    movedRef.current = false
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: rect.left,
      top: rect.top,
    }

    try {
      el.setPointerCapture(e.pointerId)
    } catch (err) {
      // ignore
    }
  }

  const onPointerMove = (e) => {
    if (pointerIdRef.current !== e.pointerId) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    if (!movedRef.current && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) movedRef.current = true

    const nextLeft = startRef.current.left + dx
    const nextTop = startRef.current.top + dy

    setPos({
      x: clamp(nextLeft, 8, window.innerWidth - rect.width - 8),
      y: clamp(nextTop, 8, window.innerHeight - rect.height - 8),
    })
  }

  const onPointerUp = (e) => {
    if (pointerIdRef.current !== e.pointerId) return
    pointerIdRef.current = null
  }

  return (
    <div
      ref={ref}
      className={className}
      style={resolvedStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e) => {
        // prevent accidental clicks after dragging
        if (!movedRef.current) return
        movedRef.current = false
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {children}
    </div>
  )
}
