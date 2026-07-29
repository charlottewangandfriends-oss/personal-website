import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { CORMORANT_GARAMOND_TITLE_BASE64 } from './fonts/cormorant-title-font';

export const alt = 'Charlotte Wang — conductor, composer, soprano, writer, and collaborator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const cormorantData = Buffer.from(CORMORANT_GARAMOND_TITLE_BASE64, 'base64');
  const brandMarkData = await readFile(
    join(process.cwd(), 'public/images/brand-mark-light.png'),
  );
  const brandMarkSrc = `data:image/png;base64,${brandMarkData.toString('base64')}`;

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
          color: '#432d20',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(circle at 42% 0%, rgba(211,198,222,0.48), transparent 42%), linear-gradient(115deg, #f6f2ea 0%, #f2eee7 55%, #ebe4e4 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            width: 505,
            height: '100%',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background:
              'linear-gradient(145deg, #352218 0%, #4e3324 58%, #64503a 100%)',
            borderLeft: '1px solid rgba(204,188,214,0.34)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -180,
              right: -150,
              display: 'flex',
              width: 440,
              height: 440,
              borderRadius: 440,
              background:
                'radial-gradient(circle, rgba(201,184,215,0.28), rgba(201,184,215,0) 68%)',
            }}
          />
          <img
            src={brandMarkSrc}
            alt=""
            width="430"
            height="385"
            style={{
              width: 430,
              height: 385,
              marginTop: -20,
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              display: 'flex',
              marginTop: -8,
              fontFamily: 'Cormorant Garamond',
              fontSize: 29,
              letterSpacing: '0.2em',
              color: '#e6d8c1',
            }}
          >
            CON AMORE
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: 695,
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '56px 60px 50px 70px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#77763f',
              whiteSpace: 'nowrap',
            }}
          >
            Conductor · Composer · Soprano · Writer
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 31,
              flexDirection: 'column',
              fontFamily: 'Cormorant Garamond',
              fontSize: 105,
              fontWeight: 500,
              lineHeight: 0.86,
              letterSpacing: '-0.045em',
            }}
          >
            <span>Charlotte</span>
            <span style={{ marginLeft: 55, color: '#5d4636' }}>Wang</span>
          </div>

          <div
            style={{
              display: 'flex',
              width: 475,
              marginTop: 39,
              paddingTop: 20,
              borderTop: '1px solid rgba(67,45,32,0.25)',
              fontSize: 23,
              lineHeight: 1.35,
              color: '#69594d',
            }}
          >
            Transcending life with music and words
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 31,
              fontSize: 16,
              letterSpacing: '0.08em',
              color: '#786b61',
            }}
          >
            <span
              style={{
                display: 'flex',
                width: 8,
                height: 8,
                marginRight: 12,
                borderRadius: 8,
                background: '#b7a5c1',
              }}
            />
            charlottewangmusic.com
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
