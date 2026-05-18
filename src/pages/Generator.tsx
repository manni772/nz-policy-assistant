import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Brief } from '../context/AppContext';

export default function Generator() {
  const { apiKey, setApiKey, saveBrief } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(searchParams.get('topic') || '');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t = searchParams.get('topic');
    if (t) setTopic(t);
  }, [searchParams]);

  const steps = [
    'Researching NZ policy context...',
    'Identifying stakeholder impacts...',
    'Developing policy options...',
    'Applying Treasury framework...',
    'Drafting Cabinet paper format...',
  ];

  const generate = async () => {
    if (!apiKey) {
      setError('Please enter your Groq API key above.');
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a policy topic.');
      return;
    }
    setError('');
    setLoading(true);
    setSaved(false);
    setBrief(null);

    let si = 0;
    setLoadingStep(steps[0]);
    const timer = setInterval(() => {
      si = Math.min(si + 1, steps.length - 1);
      setLoadingStep(steps[si]);
    }, 1200);

    const prompt = `You are a senior policy advisor at Inland Revenue Department New Zealand. Write a policy brief on the following topic in New Zealand government Cabinet paper format.

Topic: ${topic}

Return your response as a JSON object with EXACTLY this structure (no markdown, no code blocks, just raw JSON):
{
  "title": "Brief title",
  "problemDefinition": "2-3 paragraphs defining the problem, current NZ context, and why action is needed. Reference specific NZ legislation, Stats NZ data, or RBNZ data where relevant.",
  "currentSettings": "2 paragraphs describing the current policy settings in NZ, including relevant legislation (e.g. Income Tax Act 2007, Tax Administration Act 1994) and how they work.",
  "options": [
    { "title": "Option 1 name", "pros": "2-3 specific advantages in NZ context", "cons": "2-3 specific disadvantages or risks" },
    { "title": "Option 2 name", "pros": "2-3 specific advantages in NZ context", "cons": "2-3 specific disadvantages or risks" },
    { "title": "Option 3 name", "pros": "2-3 specific advantages in NZ context", "cons": "2-3 specific disadvantages or risks" }
  ],
  "analysis": "2-3 paragraphs analysing the options using Treasury's Living Standards Framework (Te Tai Waiora) and standard IRD policy criteria: efficiency, equity, revenue adequacy, administrative feasibility. Reference comparable international approaches where relevant.",
  "recommendation": "1-2 paragraphs with a clear recommended option and detailed rationale in NZ policy context. Reference fiscal implications and alignment with Government priorities.",
  "nextSteps": "5 specific numbered next steps for progressing this policy work through the NZ government process (e.g. consultation, Cabinet paper, legislation)."
}`;

    try {
      const res = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 3000,
            temperature: 0.4,
          }),
        }
      );
      const data = await res.json();
      clearInterval(timer);
      if (data.error) {
        setError(data.error.message);
        setLoading(false);
        return;
      }
      const text = data.choices[0].message.content
        .replace(/```json|```/g, '')
        .replace(/[\x00-\x1F\x7F]/g, ' ')
        .trim();
      const parsed = JSON.parse(text);
      const newBrief: Brief = {
        id: Date.now().toString(),
        title: parsed.title,
        topic,
        date: new Date().toLocaleDateString('en-NZ', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        content: parsed,
      };
      setBrief(newBrief);
    } catch (e: any) {
      clearInterval(timer);
      setError(e.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (brief) {
      saveBrief(brief);
      setSaved(true);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1
        style={{ fontFamily: 'Georgia, serif', fontSize: 28, marginBottom: 6 }}
      >
        Policy brief generator
      </h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: '1.5rem' }}>
        Generates a structured policy brief in NZ Cabinet paper format using AI.
      </p>

      <div
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#888',
            marginBottom: 6,
          }}
        >
          Groq API key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="gsk_..."
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: 14,
            marginBottom: 4,
          }}
        />
        <div style={{ fontSize: 11, color: '#aaa' }}>
          Your key is never stored or shared.
        </div>
      </div>

      <div
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#888',
            marginBottom: 6,
          }}
        >
          Policy topic
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Income tax threshold adjustment"
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: 14,
            marginBottom: 12,
          }}
        />
        <button
          onClick={generate}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#1a4731',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Generating...' : 'Generate policy brief'}
        </button>
      </div>

      {loading && (
        <div
          style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
            {loadingStep}
          </div>
          <div
            style={{
              height: 4,
              background: '#f0f0f0',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: '#1a4731',
                borderRadius: 2,
                animation: 'progress 6s linear forwards',
              }}
            />
          </div>
          <style>{`@keyframes progress { from { width: 0% } to { width: 95% } }`}</style>
        </div>
      )}

      {error && (
        <div
          style={{
            background: '#fceae9',
            border: '1px solid #f0b0ae',
            borderRadius: 10,
            padding: '12px 16px',
            color: '#b8302a',
            fontSize: 14,
            marginBottom: '1.5rem',
          }}
        >
          {error}
        </div>
      )}

      {brief && (
        <div
          style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            padding: '2rem',
          }}
        >
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
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: '#888',
                  marginBottom: 4,
                }}
              >
                Policy brief · {brief.date}
              </div>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 22,
                  margin: 0,
                }}
              >
                {brief.title}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleSave}
                disabled={saved}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #1a4731',
                  background: saved ? '#e6f5ed' : 'white',
                  color: saved ? '#0F6E56' : '#1a4731',
                  fontSize: 13,
                  cursor: saved ? 'default' : 'pointer',
                }}
              >
                {saved ? 'Saved ✓' : 'Save to library'}
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

          {[
            {
              label: 'Problem definition',
              content: brief.content.problemDefinition,
            },
            {
              label: 'Current policy settings',
              content: brief.content.currentSettings,
            },
            { label: 'Analysis', content: brief.content.analysis },
            { label: 'Recommendation', content: brief.content.recommendation },
            { label: 'Next steps', content: brief.content.nextSteps },
          ].map((section) => (
            <div
              key={section.label}
              style={{
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: '#1a4731',
                  marginBottom: 8,
                }}
              >
                {section.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: '#333',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {section.content}
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
                color: '#1a4731',
                marginBottom: 12,
              }}
            >
              Policy options
            </div>
            {brief.content.options.map((opt, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 10,
                  padding: '1rem',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                  Option {i + 1}: {opt.title}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      background: '#e6f5ed',
                      borderRadius: 8,
                      padding: '10px 12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#0F6E56',
                        marginBottom: 4,
                      }}
                    >
                      Advantages
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#085041',
                        lineHeight: 1.6,
                      }}
                    >
                      {opt.pros}
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#fceae9',
                      borderRadius: 8,
                      padding: '10px 12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#b8302a',
                        marginBottom: 4,
                      }}
                    >
                      Risks
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#8b2020',
                        lineHeight: 1.6,
                      }}
                    >
                      {opt.cons}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
