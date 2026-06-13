import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? 'MMDESIGN'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#060771',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            top: '0',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            fontSize: '400px',
            fontWeight: 700,
            color: 'rgba(255,251,243,0.04)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          MM
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          <div
            style={{
              color: '#FF6C0C',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '8px',
              textTransform: 'uppercase',
              marginBottom: '32px',
              display: 'flex',
            }}
          >
            DIGITAL EXPERIENCE STUDIO
          </div>

          <div
            style={{
              color: '#FFFBF3',
              fontSize: '96px',
              fontWeight: 700,
              letterSpacing: '-2px',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: 'rgba(255,251,243,0.6)',
              fontSize: '22px',
              fontWeight: 400,
              marginTop: '24px',
              maxWidth: '700px',
              display: 'flex',
            }}
          >
            Web siteleri tasarlamıyoruz. İnsanların sizi tercih etmesini kolaylaştırıyoruz.
          </div>

          <div
            style={{
              marginTop: '48px',
              width: '80px',
              height: '4px',
              background: '#FF6C0C',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
