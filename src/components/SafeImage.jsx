import { useMemo, useState } from 'react'

const DEFAULT_FALLBACK = '/ai-images/ai-placeholder.svg'

function buildWebpCandidate(src) {
  if (!src || typeof src !== 'string') return null
  if (src.includes('://') && src.startsWith('data:')) return null

  // Only create a .webp candidate when the URL clearly ends with a raster extension
  // (ignores querystrings and avoids mismatched mime types that can cause blank images).
  const match = src.match(/\.(png|jpe?g)$/i)
  if (!match) return null
  return src.replace(/\.(png|jpe?g)$/i, '.webp')
}

export default function SafeImage({
  src,
  alt,
  className,
  loading = 'lazy',
  fallbackSrc = DEFAULT_FALLBACK,
  ...rest
}) {
  const [failed, setFailed] = useState(false)
  const resolvedSrc = failed ? fallbackSrc : src
  const webpCandidate = useMemo(() => (failed ? null : buildWebpCandidate(src)), [failed, src])

  const handleError = () => {
    if (!failed) setFailed(true)
  }

  if (webpCandidate) {
    return (
      <picture>
        <source srcSet={webpCandidate} type="image/webp" />
        <img
          src={resolvedSrc}
          alt={alt}
          className={className}
          loading={loading}
          onError={handleError}
          {...rest}
        />
      </picture>
    )
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      {...rest}
    />
  )
}

