const API_KEY_STORAGE = 'netplus_api_key';

export function getApiKey() {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(API_KEY_STORAGE) || ''
    : '';
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export async function generateQuestions(domain, count = 5) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('No API key set. Add your Anthropic API key in Settings.');

  const prompt = `Generate ${count} multiple choice questions for the CompTIA Network+ exam (N10-009).
Domain: ${domain}

Return ONLY a JSON array. No markdown, no explanation, just the raw JSON.
Each object must follow this exact shape:
{
  "id": "gen_<random 6 char string>",
  "domain": "${domain}",
  "question": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "answer": "A",
  "explanation": "Markdown string explaining why the answer is correct and why others are wrong"
}

Make questions realistic exam difficulty. Avoid trivial questions.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error('Failed to parse generated questions:', e);
    return [];
  }
}
