import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Work programme' },
  { to: '/generator', label: 'Brief generator' },
  { to: '/library', label: 'My library' },
  { to: '/compare', label: 'Compare' },
];

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        background: '#1a4731',
        borderBottom: '3px solid #b8960c',
        padding: '0 2rem',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '1rem 0',
        }}
      >
        <div>
          <div
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: 18,
              fontFamily: 'Georgia, serif',
            }}
          >
            🌿 NZ Policy Research Assistant
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
              marginTop: 2,
            }}
          >
            Tax & social policy tools for Aotearoa
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '7px 14px',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                color:
                  pathname === link.to ? 'white' : 'rgba(255,255,255,0.65)',
                background:
                  pathname === link.to
                    ? 'rgba(255,255,255,0.15)'
                    : 'transparent',
                borderBottom:
                  pathname === link.to
                    ? '2px solid #b8960c'
                    : '2px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
