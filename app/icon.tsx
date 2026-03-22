import { ImageResponse } from 'next/og'

export const size        = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background:     'linear-gradient(135deg, #8B6914 0%, #4A3800 50%, #1a0f00 100%)',
        width:          '100%',
        height:         '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          '#FFFFFF',
        fontSize:       13,
        fontWeight:     900,
        fontFamily:     'Georgia, serif',
        letterSpacing:  '-0.5px',
      }}
    >
      RRW
    </div>,
    { ...size },
  )
}
