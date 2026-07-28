import { ImageResponse } from 'next/og';

export const alt = 'Charlotte Wang — conductor, composer, soprano, and collaborator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SITE_URL = 'https://charlottewangmusic.com';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#f4f1ea',
          color: '#4a3324',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(circle at 78% 18%, rgba(207,199,216,0.4), transparent 35%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            width: '61%',
            height: '100%',
          }}
        >
          <img
            src={`${SITE_URL}/images/hero-color.jpg`}
            alt=""
            width="732"
            height="630"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '58% 28%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              background:
                'linear-gradient(90deg, #f4f1ea 0%, rgba(244,241,234,0.96) 14%, rgba(244,241,234,0.64) 30%, transparent 53%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '58%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '68px 0 60px 76px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src={`${SITE_URL}/image.png`}
              alt=""
              width="66"
              height="66"
              style={{ width: 66, height: 66, objectFit: 'contain' }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: 19,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7c7a43',
              }}
            >
              Conductor · Composer · Writer
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 30,
              flexDirection: 'column',
              fontFamily: 'Georgia, serif',
              fontSize: 100,
              lineHeight: 0.82,
              letterSpacing: '-0.045em',
            }}
          >
            <span>Charlotte</span>
            <span style={{ marginLeft: 48, color: '#6a5241' }}>Wang</span>
          </div>

          <div
            style={{
              display: 'flex',
              width: 410,
              marginTop: 42,
              paddingTop: 18,
              borderTop: '1px solid rgba(74,51,36,0.28)',
              fontSize: 22,
              color: '#6a5a4d',
            }}
          >
            Music, words, and work made with others.
          </div>
        </div>
      </div>
    ),
    size,
  );
}