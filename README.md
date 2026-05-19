# NZ Policy Research Assistant

A multi-page React application for researching and generating New Zealand tax and social policy briefs. Built specifically to demonstrate understanding of IRD's policy work programme and Treasury's analytical frameworks.

## Live app
[nz-policy-assistant.vercel.app](https://nz-policy-assistant.vercel.app)

## Features

### Work programme page
- Browse 12 current and recent IRD policy topics with descriptions and status badges
- Search and filter by Tax policy or Social policy
- Click any topic to pre-fill the brief generator

### Brief generator
- Enter any NZ tax or social policy topic
- AI generates a structured brief in NZ Cabinet paper format
- Output includes: problem definition, current policy settings, 3 policy options with pros/cons, analysis applying Treasury's Living Standards Framework, recommendation, and next steps
- Save briefs to your personal library
- Export as PDF

### My library
- All generated briefs saved to localStorage
- Search saved briefs
- Select two briefs to compare side by side

### Compare
- Side by side comparison of any two saved briefs
- All sections displayed in parallel columns
- Export comparison as PDF

## Policy frameworks applied
- Treasury Living Standards Framework (Te Tai Waiora) — four capital stocks
- IRD policy analysis criteria: efficiency, equity, revenue adequacy, administrative feasibility
- NZ Cabinet paper structure: problem definition, options, analysis, recommendation, next steps
- References to NZ legislation including Income Tax Act 2007 and Tax Administration Act 1994

## Tech stack
- React 19 + TypeScript
- React Router for multi-page navigation
- React Context API for shared state
- Groq API — llama-3.3-70b-versatile model
- Vite build tool
- Deployed on Vercel

## How to run locally
```bash
git clone https://github.com/manni772/nz-policy-assistant
cd nz-policy-assistant
npm install
npm run dev
```

Add your Groq API key in the Brief generator page. Get a free key at [console.groq.com](https://console.groq.com).

## Built by
Manmeet Singh · MBA candidate, Victoria University of Wellington  
[Portfolio](https://manni772.github.io/Portfolio) · [GitHub](https://github.com/manni772)
