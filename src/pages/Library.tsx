import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Library() {
  const { briefs, deleteBrief } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = briefs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.topic.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
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
            My library
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            Your saved policy briefs. Select two to compare them side by side.
          </p>
        </div>
        <button
          onClick={() => navigate('/generator')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            background: '#1a4731',
            color: 'white',
            border: 'none',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          + New brief
        </button>
      </div>

      {briefs.length === 0 ? (
        <div
          style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 15, color: '#666', marginBottom: 12 }}>
            No briefs saved yet.
          </div>
          <button
            onClick={() => navigate('/generator')}
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
            Generate your first brief
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved briefs..."
              style={{
                flex: 1,
                minWidth: 200,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 14,
              }}
            />
            {selected.length === 2 && (
              <button
                onClick={() =>
                  navigate(`/compare?a=${selected[0]}&b=${selected[1]}`)
                }
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  background: '#534AB7',
                  color: 'white',
                  border: 'none',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Compare selected →
              </button>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 12,
            }}
          >
            {filtered.map((brief) => (
              <div
                key={brief.id}
                style={{
                  background: 'white',
                  border: `2px solid ${
                    selected.includes(brief.id) ? '#534AB7' : '#e0e0e0'
                  }`,
                  borderRadius: 12,
                  padding: '1.25rem',
                  cursor: 'pointer',
                }}
                onClick={() => toggleSelect(brief.id)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <div style={{ fontSize: 11, color: '#888' }}>
                    {brief.date}
                  </div>
                  {selected.includes(brief.id) && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: '#eeedfe',
                        color: '#534AB7',
                        padding: '2px 8px',
                        borderRadius: 20,
                      }}
                    >
                      Selected
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                  {brief.title}
                </div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                  {brief.content.recommendation?.substring(0, 120)}...
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: '#534AB7', fontWeight: 500 }}
                  >
                    Click to select for comparison
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBrief(brief.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                      fontSize: 16,
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
