import { Buffer } from 'node:buffer';
import { ImageResponse } from 'next/og';
import { CORMORANT_GARAMOND_TITLE_BASE64 } from './fonts/cormorant-title-font';

export const alt = 'Charlotte Wang — conductor, composer, soprano, and collaborator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SITE_URL = 'https://charlottewangmusic.com';
export default async function OpenGraphImage() {
  const cormorantData = Buffer.from(CORMORANT_GARAMOND_TITLE_BASE64, 'base64');

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
              'radial-gradient(circle at 76% 16%, rgba(207,199,216,0.42), transparent 38%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            width: '62%',
            height: '100%',
          }}
        >
          <img
            src={`${SITE_URL}/images/hero-color.jpg`}
            alt=""
            width="744"
            height="630"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '60% 28%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              background:
                'linear-gradient(90deg, #f4f1ea 0%, rgba(244,241,234,0.98) 12%, rgba(244,241,234,0.88) 24%, rgba(244,241,234,0.48) 39%, rgba(244,241,234,0.12) 52%, transparent 66%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '34%',
            display: 'flex',
            width: '42%',
            height: '100%',
            background:
              'linear-gradient(90deg, #f4f1ea 0%, rgba(244,241,234,0.98) 24%, rgba(238,232,233,0.72) 52%, rgba(215,205,216,0.22) 78%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '57%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '62px 0 58px 74px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={`${SITE_URL}/image.png`}
              alt=""
              width="50"
              height="50"
              style={{ width: 50, height: 50, objectFit: 'contain' }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: 14,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: '#7c7a43',
                whiteSpace: 'nowrap',
              }}
            >
              Conductor · Composer · Soprano · Collaborator
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 30,
              flexDirection: 'column',
              fontFamily: 'Cormorant Garamond',
              fontSize: 104,
              fontWeight: 500,
              lineHeight: 0.91,
              letterSpacing: '-0.04em',
            }}
          >
            <span>Charlotte</span>
            <span style={{ marginLeft: 42, color: '#6a5241' }}>Wang</span>
          </div>

          <div
            style={{
              display: 'flex',
              width: 410,
              marginTop: 34,
              paddingTop: 18,
              borderTop: '1px solid rgba(74,51,36,0.28)',
              fontSize: 22,
              color: '#6a5a4d',
            }}
          >
            transcending life with music and words
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: cormorantData.buffer.slice(
            cormorantData.byteOffset,
            cormorantData.byteOffset + cormorantData.byteLength,
          ),
          weight: 500,
          style: 'normal',
        },
      ],
    },
  );
}
