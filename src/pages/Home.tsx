import { useNavigate } from 'react-router-dom';

const topics = [
  {
    id: 1,
    title: 'Income tax threshold adjustment',
    area: 'Tax policy',
    status: 'Active',
    description:
      'NZ income tax thresholds have not been adjusted since 2010, creating fiscal drag as inflation has eroded their real value.',
  },
  {
    id: 2,
    title: 'Gig economy taxation',
    area: 'Tax policy',
    status: 'Active',
    description:
      'Platform-based work (Uber, Airbnb, TaskRabbit) creates tax compliance gaps and challenges for GST and income tax collection.',
  },
  {
    id: 3,
    title: 'Working for Families reform',
    area: 'Social policy',
    status: 'Active',
    description:
      'WFF tax credits create high effective marginal tax rates at abatement thresholds, reducing work incentives for families.',
  },
  {
    id: 4,
    title: 'Closely-held company rules',
    area: 'Tax policy',
    status: 'Active',
    description:
      'Current rules governing closely-held companies may allow tax advantages not available to other business structures.',
  },
  {
    id: 5,
    title: 'Charities tax settings',
    area: 'Tax policy',
    status: 'Active',
    description:
      'Review of tax exemptions for charitable organisations and whether current settings remain fit for purpose.',
  },
  {
    id: 6,
    title: 'Child support scheme',
    area: 'Social policy',
    status: 'Active',
    description:
      'The child support formula and administrative settings have not been comprehensively reviewed since the 1990s.',
  },
  {
    id: 7,
    title: 'Student loan interest settings',
    area: 'Social policy',
    status: 'Active',
    description:
      'Interest-free student loans for NZ-based borrowers — review of settings and fiscal sustainability.',
  },
  {
    id: 8,
    title: 'Bright-line test for property',
    area: 'Tax policy',
    status: 'Recent change',
    description:
      'The bright-line test was reduced from 10 years to 2 years in 2024 — ongoing monitoring of housing market impacts.',
  },
  {
    id: 9,
    title: 'Interest deductibility for rental property',
    area: 'Tax policy',
    status: 'Recent change',
    description:
      'Interest deductibility for residential rental properties was reinstated in 2024 after being restricted in 2021.',
  },
  {
    id: 10,
    title: 'Minimum wage settings',
    area: 'Social policy',
    status: 'Active',
    description:
      'Annual review of the minimum wage rate and its interaction with Working for Families and the tax-transfer system.',
  },
  {
    id: 11,
    title: 'Digital services taxation',
    area: 'Tax policy',
    status: 'Active',
    description:
      'OECD-led work on ensuring multinational digital companies pay tax in countries where they earn revenue.',
  },
  {
    id: 12,
    title: 'Land value tax feasibility',
    area: 'Tax policy',
    status: 'Under consideration',
    description:
      'Exploratory work on whether a land value tax could improve housing affordability and productive investment.',
  },
];

const areaColors: Record<string, string> = {
  'Tax policy': '#e8f0ec',
  'Social policy': '#eeedfe',
};

const statusColors: Record<string, { bg: string; color: string }> = {
  Active: { bg: '#e6f5ed', color: '#0F6E56' },
  'Recent change': { bg: '#fdf0e6', color: '#854F0B' },
  'Under consideration': { bg: '#eeedfe', color: '#3C3489' },
};

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = topics.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.area === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 28,
            marginBottom: 6,
          }}
        >
          IRD Work Programme
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          Current and recent tax and social policy projects from Inland Revenue.
          Click any topic to generate a policy brief.
        </p>
      </div>

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
          placeholder="Search topics..."
          style={{
            flex: 1,
            minWidth: 200,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: 14,
          }}
        />
        {['All', 'Tax policy', 'Social policy'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: filter === f ? '#1a4731' : 'white',
              color: filter === f ? 'white' : '#333',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 12,
        }}
      >
        {filtered.map((topic) => (
          <div
            key={topic.id}
            onClick={() =>
              navigate(`/generator?topic=${encodeURIComponent(topic.title)}`)
            }
            style={{
              background: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              padding: '1.25rem',
              cursor: 'pointer',
              borderTop: `3px solid ${
                topic.area === 'Tax policy' ? '#1a4731' : '#534AB7'
              }`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = '#1a4731')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = '#e0e0e0')
            }
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: areaColors[topic.area] || '#f0f0f0',
                  color: '#333',
                }}
              >
                {topic.area}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 20,
                  ...statusColors[topic.status],
                }}
              >
                {topic.status}
              </span>
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 6,
                color: '#1a1a1a',
              }}
            >
              {topic.title}
            </div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
              {topic.description}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: '#1a4731',
                fontWeight: 500,
              }}
            >
              Generate brief →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
