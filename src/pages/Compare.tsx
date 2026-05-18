import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Compare() {
  const { briefs } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idA = searchParams.get('a');
  const idB = searchParams.get('b');
  const briefA = briefs.find((b) => b.id === idA);
  const briefB = briefs.find((b) => b.id === idB);

  if (!briefA || !briefB) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: 12 }}>
          No briefs selected
        </h2>
        <p style={{ color: '#666', marginBottom: 20 }}>
          Go to your library and select two briefs to compare.
        </p>
        <button
          onClick={() => navigate('/library')}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: '#1a4731',
            color: 'white',
            border: 'none',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Go to library
        </button>
      </div>
    );
  }

  const sections = [
    {
      label: 'Problem definition',
      keyA: briefA.content.problemDefinition,
      keyB: briefB.content.problemDefinition,
    },
    {
      label: 'Current settings',
      keyA: briefA.content.currentSettings,
      keyB: briefB.content.currentSettings,
    },
    {
      label: 'Analysis',
      keyA: briefA.content.analysis,
      keyB: briefB.content.analysis,
    },
    {
      label: 'Recommendation',
      keyA: briefA.content.recommendation,
      keyB: briefB.content.recommendation,
    },
    {
      label: 'Next steps',
      keyA: briefA.content.nextSteps,
      keyB: briefB.content.nextSteps,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              marginBottom: 6,
            }}
          >
            Comparing briefs
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            Side by side policy analysis.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => navigate('/library')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: 'white',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            ← Back to library
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: 'white',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Export PDF
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: '1.5rem',
        }}
      >
        {[briefA, briefB].map((brief, i) => (
          <div
            key={i}
            style={{
              background: i === 0 ? '#e8f0ec' : '#eeedfe',
              borderRadius: 12,
              padding: '1rem 1.25rem',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: i === 0 ? '#0F6E56' : '#534AB7',
                marginBottom: 4,
              }}
            >
              Brief {i + 1}
            </div>
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              {brief.title}
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              {brief.date}
            </div>
          </div>
        ))}
      </div>

      {sections.map((section) => (
        <div key={section.label} style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: '#888',
              marginBottom: 10,
              paddingBottom: 6,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            {section.label}
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {[section.keyA, section.keyB].map((content, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  border: `1px solid ${i === 0 ? '#9fcdb4' : '#AFA9EC'}`,
                  borderRadius: 10,
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: '#333',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#888',
            marginBottom: 10,
            paddingBottom: 6,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Policy options
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          {[briefA, briefB].map((brief, i) => (
            <div key={i}>
              {brief.content.options.map((opt, j) => (
                <div
                  key={j}
                  style={{
                    background: 'white',
                    border: `1px solid ${i === 0 ? '#9fcdb4' : '#AFA9EC'}`,
                    borderRadius: 10,
                    padding: '1rem',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}
                  >
                    Option {j + 1}: {opt.title}
                  </div>
                  <div
                    style={{ fontSize: 12, color: '#0F6E56', marginBottom: 4 }}
                  >
                    + {opt.pros}
                  </div>
                  <div style={{ fontSize: 12, color: '#b8302a' }}>
                    − {opt.cons}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
