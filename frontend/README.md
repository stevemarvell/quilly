# Quilly - AI-Powered Term Organizer 📚

> Automatically organize terminology into intelligent hierarchies using Claude AI and semantic embeddings

**Perfect for:** Non-fiction authors, technical writers, educators, and anyone managing complex terminology - especially useful for photography books, training materials, and reference guides.

---

## 📸 Example: Photography Terms Organization

**Input:** A jumbled list of photography terms
```
aperture, f-stop, depth of field, bokeh, ISO, exposure triangle, 
shutter speed, long exposure, golden hour, blue hour, rule of thirds, 
leading lines, however, important, composition, framing, white balance, 
color temperature, histogram, exposure compensation, effectively, strategy
```

**Output:** Intelligent 3-level hierarchy

```
📁 EXPOSURE CONTROL
  📂 Aperture Settings
     • aperture
     • f-stop
     • depth of field
     • bokeh
  
  📂 Time & Sensitivity
     • shutter speed
     • long exposure
     • ISO
     • exposure triangle

📁 COMPOSITION TECHNIQUES
  📂 Framing Methods
     • rule of thirds
     • leading lines
     • composition
     • framing

📁 LIGHTING & COLOR
  📂 Natural Light
     • golden hour
     • blue hour
  
  📂 Color Management
     • white balance
     • color temperature
     • histogram
     • exposure compensation

🏊 GENERAL TERMS
  • however, important, effectively, strategy
```

---

## 🎯 What It Does

Quilly takes an unstructured list of terms and:

1. **Generates semantic embeddings** - Creates 1024-dimensional vector representations to understand term relationships
2. **Calculates similarity scores** - Identifies which terms are semantically related (e.g., "aperture" and "f-stop" have 0.87 similarity)
3. **Organizes hierarchically** - Groups related terms into Domains → Clusters → Terms
4. **Filters general terms** - Separates domain-specific terms from generic connecting words

**Result:** A clean, logical hierarchy that makes sense for your content domain.

---

## 🚀 Quick Start (Mid-Tech Level)

### Prerequisites
- Node.js 18+ installed
- Text editor (VS Code recommended)
- Internet connection for AI API calls

### 1. Install Dependencies

```bash
# Clone or download the project
cd quilly

# Install all packages
npm install
npm install express cors dotenv
```

### 2. Set Up API Keys

Create a file named `.env` in the project root:

```env
# Claude AI (for intelligent organization)
CLAUDE_API_KEY=sk-ant-api03-YOUR_KEY_HERE
CLAUDE_MODEL=claude-sonnet-4-5-20250929

# Voyage AI (for semantic embeddings)
VOYAGE_API_KEY=pa-YOUR_KEY_HERE
```

**Get your keys:**
- Claude: https://console.anthropic.com/settings/keys
- Voyage: https://dash.voyageai.com/

### 3. Run the App

```bash
# Start both backend and frontend together
npm run dev:all

# Or run separately in two terminals:
# Terminal 1: Backend
node server.js

# Terminal 2: Frontend
npm run dev
```

### 4. Use It!

1. Open http://localhost:3000
2. Paste your photography terms (or any domain terms)
3. Click "Organize Terms"
4. Review the parsed terms
5. Click "Continue" to let AI organize them
6. Export as JSON when done

---

## 🔧 Full Technical Documentation

### Architecture Overview

```
┌─────────────────┐
│   React/Ionic   │  Frontend (Port 3000)
│   TypeScript     │  - User interface
│                 │  - State management
└────────┬────────┘
         │ HTTP
         ↓
┌─────────────────┐
│  Express.js     │  Backend (Port 8000)
│  Node.js        │  - API proxy
│                 │  - Protects API keys
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌─────────┐ ┌──────────┐
│ Claude  │ │ Voyage   │  External APIs
│   AI    │ │   AI     │
└─────────┘ └──────────┘
```

### Tech Stack

**Frontend:**
- **Ionic 7 + React 18**: Cross-platform UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

**Backend:**
- **Express.js**: API server
- **Node.js 18+**: Runtime
- **CORS**: Cross-origin resource sharing

**AI Services:**
- **Claude Sonnet 4.5**: LLM for intelligent organization
- **Voyage AI v2**: Semantic embedding generation (1024 dimensions)

### Project Structure

```
quilly/
├── src/
│   ├── App.tsx                    # Main app component & routing
│   ├── main.tsx                   # React entry point
│   │
│   ├── screens/                   # Page components
│   │   ├── InputScreen.tsx        # Term input form
│   │   ├── ReviewScreen.tsx       # Parsed terms review
│   │   ├── ProcessingScreen.tsx   # AI processing display
│   │   └── TreeScreen.tsx         # Results visualization
│   │
│   ├── components/                # Reusable components
│   │   └── ApiSettings.tsx        # Backend connection test
│   │
│   ├── services/                  # Business logic
│   │   ├── claudeService.ts       # Claude API integration
│   │   ├── embeddingService.ts    # Voyage embeddings + similarity
│   │   └── termOrganizerService.ts # Main orchestration
│   │
│   ├── utils/                     # Helper functions
│   │   └── termParser.ts          # Text parsing & validation
│   │
│   └── vite-env.d.ts              # TypeScript environment types
│
├── server.js                      # Backend Express server
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
├── ionic.config.json              # Ionic settings
├── .env                           # API keys (DO NOT COMMIT)
├── .env.example                   # Template for .env
└── .gitignore                     # Git ignore rules
```

### How It Works: The Pipeline

#### 1. **Term Parsing** (`termParser.ts`)

```typescript
Input: "aperture, f-stop, depth of field, bokeh, aperture, , ISO"

Processing:
1. Split by delimiters: comma, newline, semicolon, pipe
2. Trim whitespace from each term
3. Remove empty entries (the double comma)
4. Deduplicate (case-insensitive)

Output: {
  terms: ["aperture", "f-stop", "depth of field", "bokeh", "ISO"],
  stats: {
    total: 6,
    unique: 5,
    duplicatesRemoved: 1,
    emptyRemoved: 1
  }
}
```

#### 2. **Embedding Generation** (`embeddingService.ts`)

```typescript
// Request to Voyage AI
POST https://api.voyageai.com/v1/embeddings
Body: {
  input: ["aperture", "f-stop", "depth of field"],
  model: "voyage-2"
}

// Response: 1024-dimensional vectors
{
  data: [
    { embedding: [0.023, -0.145, 0.872, ...], index: 0 },  // "aperture"
    { embedding: [0.019, -0.142, 0.869, ...], index: 1 },  // "f-stop"
    { embedding: [-0.234, 0.456, 0.123, ...], index: 2 }   // "depth of field"
  ]
}
```

#### 3. **Similarity Calculation** (`embeddingService.ts`)

```typescript
// Cosine similarity between vectors
cosineSimilarity(aperture_vector, fstop_vector)
= dot_product / (norm_a * norm_b)
= 0.87  // High similarity = semantically related!

// Similarity matrix (example):
         aperture  f-stop  DoF    bokeh  ISO
aperture   1.00    0.87   0.76   0.71   0.23
f-stop     0.87    1.00   0.74   0.68   0.21
DoF        0.76    0.74   1.00   0.82   0.19
bokeh      0.71    0.68   0.82   1.00   0.17
ISO        0.23    0.21   0.19   0.17   1.00
```

**Key Insight:** "aperture" and "f-stop" are highly similar (0.87), while "ISO" is distinct (0.23). This helps AI group related terms.

#### 4. **AI Organization** (`termOrganizerService.ts`)

```typescript
// Prompt sent to Claude
System: "You are an expert at semantic analysis..."

User: "Organize these 5 terms:
1. aperture
2. f-stop
3. depth of field
4. bokeh
5. ISO

SEMANTIC SIMILARITY ANALYSIS:
'aperture' is most similar to: f-stop (0.87), depth of field (0.76)
'f-stop' is most similar to: aperture (0.87), depth of field (0.74)
'depth of field' is most similar to: bokeh (0.82), aperture (0.76)
...

Use similarity scores to group related terms."

// Claude's response (JSON):
{
  "domains": [
    {
      "id": "1",
      "name": "Exposure Control",
      "clusters": [
        {
          "id": "1-1",
          "name": "Aperture Settings",
          "terms": ["aperture", "f-stop", "depth of field", "bokeh"]
        },
        {
          "id": "1-2",
          "name": "Sensitivity",
          "terms": ["ISO"]
        }
      ]
    }
  ],
  "generalTerms": []
}
```

### API Endpoints

#### Backend Server (Port 8000)

**POST `/api/claude`**
```typescript
// Request
{
  messages: [
    { role: "user", content: "Organize these terms..." }
  ],
  system?: "You are an expert..."
}

// Response
{
  content: [
    { type: "text", text: "{\"domains\": [...]}" }
  ]
}
```

**POST `/api/embeddings`**
```typescript
// Request
{
  texts: ["aperture", "f-stop", "ISO"]
}

// Response
{
  data: [
    { embedding: [...1024 floats...], index: 0 },
    { embedding: [...1024 floats...], index: 1 },
    { embedding: [...1024 floats...], index: 2 }
  ]
}
```

---

## 📖 Usage Examples

### Photography Book Chapter Planning

**Scenario:** You're writing a photography textbook and need to organize technical terms by chapter.

**Input Terms:**
```
aperture, f-stop, shutter speed, ISO, exposure triangle, depth of field,
bokeh, motion blur, golden hour, blue hour, harsh light, soft light,
diffuser, reflector, rule of thirds, leading lines, framing, negative space,
RAW, JPEG, histogram, exposure compensation, white balance, color temperature,
lens compression, focal length, wide angle, telephoto, prime lens, zoom lens
```

**Quilly Output:**

```json
{
  "domains": [
    {
      "name": "Exposure Fundamentals",
      "clusters": [
        {
          "name": "The Exposure Triangle",
          "terms": ["aperture", "f-stop", "shutter speed", "ISO", "exposure triangle"]
        },
        {
          "name": "Exposure Tools",
          "terms": ["histogram", "exposure compensation"]
        }
      ]
    },
    {
      "name": "Creative Effects",
      "clusters": [
        {
          "name": "Depth Effects",
          "terms": ["depth of field", "bokeh"]
        },
        {
          "name": "Motion Effects",
          "terms": ["motion blur"]
        }
      ]
    },
    {
      "name": "Lighting Techniques",
      "clusters": [
        {
          "name": "Natural Light",
          "terms": ["golden hour", "blue hour"]
        },
        {
          "name": "Light Quality",
          "terms": ["harsh light", "soft light", "diffuser", "reflector"]
        }
      ]
    },
    {
      "name": "Composition Principles",
      "clusters": [
        {
          "name": "Compositional Rules",
          "terms": ["rule of thirds", "leading lines", "framing", "negative space"]
        }
      ]
    },
    {
      "name": "Color & Processing",
      "clusters": [
        {
          "name": "File Formats",
          "terms": ["RAW", "JPEG"]
        },
        {
          "name": "Color Management",
          "terms": ["white balance", "color temperature"]
        }
      ]
    },
    {
      "name": "Lens Characteristics",
      "clusters": [
        {
          "name": "Focal Length Effects",
          "terms": ["lens compression", "focal length", "wide angle", "telephoto"]
        },
        {
          "name": "Lens Types",
          "terms": ["prime lens", "zoom lens"]
        }
      ]
    }
  ]
}
```

**Book Structure Generated:**
```
Chapter 1: Exposure Fundamentals
  - Section 1.1: The Exposure Triangle
  - Section 1.2: Exposure Tools

Chapter 2: Creative Effects
  - Section 2.1: Depth Effects
  - Section 2.2: Motion Effects

Chapter 3: Lighting Techniques
  ... and so on
```

### Workshop Glossary Creation

**Scenario:** Creating a glossary for a "Landscape Photography 101" workshop.

**Input:** Dump all terms you plan to use
**Output:** Organized glossary by topic, ready to print

---

## 🔍 Advanced Configuration

### Customizing Claude's Behavior

Edit `src/services/termOrganizerService.ts`:

```typescript
const SYSTEM_PROMPT = `You are an expert at semantic analysis...

CUSTOM INSTRUCTION: For photography terms, always group by:
1. Technical camera settings
2. Lighting conditions
3. Compositional techniques
4. Post-processing concepts

...`;
```

### Adjusting Similarity Thresholds

Edit `src/services/embeddingService.ts`:

```typescript
// Show top 5 most similar terms instead of 3
export function createSimilaritySummary(
  termsWithEmbeddings: TermWithEmbedding[],
  topN: number = 5  // Changed from 3
): string {
  // ...
}
```

### Changing Embedding Model

Edit `server.js`:

```javascript
// Switch to different Voyage model
body: JSON.stringify({
  input: texts,
  model: 'voyage-large-2'  // More accurate, slower, more expensive
})
```

**Available Voyage Models:**
- `voyage-2`: Balanced (default)
- `voyage-large-2`: Higher quality, 16K context
- `voyage-code-2`: Optimized for code/technical terms

---

## 🐛 Troubleshooting

### "CORS Error"

**Problem:** Frontend can't reach backend
**Solution:**
```bash
# Check backend is running
curl http://localhost:8000/api/claude

# If not running, start it:
node server.js
```

### "API Key Not Configured"

**Problem:** `.env` file missing or incorrect
**Solution:**
1. Check `.env` exists in project root (not in `src/`)
2. Verify variable names: `CLAUDE_API_KEY` and `VOYAGE_API_KEY`
3. No quotes needed: `CLAUDE_API_KEY=sk-ant-123` not `"sk-ant-123"`
4. Restart backend after editing `.env`

### "Connection Test Failed"

**Problem:** Backend can't reach AI APIs
**Solution:**
1. Check API keys are valid (try them in API docs)
2. Check internet connection
3. Check for firewall/proxy blocking API calls

### "Terms Not Organized Well"

**Problem:** AI grouping doesn't make sense
**Solution:**
1. **Add more terms**: AI needs 10+ terms per domain to identify patterns
2. **Be more specific**: "light" vs "golden hour light" vs "diffused studio light"
3. **Remove ambiguous terms**: "shot" could mean photo, camera setting, or injection
4. **Check similarity scores**: In browser console, look for embedding similarities

### TypeScript Errors

**Problem:** `import.meta.env` not recognized
**Solution:** Ensure `src/vite-env.d.ts` exists with proper types

---

## 💡 Tips for Best Results

### ✅ DO:
- **Use 15-50 terms** per organization request
- **Be domain-specific**: "bokeh effect" instead of just "effect"
- **Mix technical and creative terms**: AI understands relationships
- **Include related concepts**: "aperture" + "f-stop" + "depth of field" help AI understand the domain

### ❌ DON'T:
- **Mix unrelated domains**: Don't combine photography + cooking terms
- **Use full sentences**: "how to use aperture" → just "aperture"
- **Include too many generic words**: "important", "strategy", etc. (they'll be filtered anyway)
- **Expect perfect results with <5 terms**: Need critical mass for pattern recognition

### Photography-Specific Tips:

**Good Input:**
```
aperture priority, shutter priority, manual mode, program mode,
exposure compensation, metering modes, spot metering, matrix metering
```
Result: Clear "Camera Modes" domain with logical clusters

**Bad Input:**
```
photography, camera, important, taking pictures, best settings
```
Result: Too vague, AI can't identify specific relationships

---

## 📊 Performance & Costs

### Processing Time
- **10 terms**: ~3-5 seconds
- **50 terms**: ~8-12 seconds
- **100 terms**: ~15-20 seconds

### API Costs (Approximate)

**Voyage AI:**
- ~$0.0001 per term (1000 terms = $0.10)

**Claude API:**
- ~$0.003 per organization request
- Based on prompt length (terms + similarity data)

**Example:** Organizing 30 photography terms
- Embeddings: $0.003
- Claude: $0.003
- **Total: ~$0.006** (less than a penny!)

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway/Heroku)
```bash
# Add start script to package.json
"scripts": {
  "start": "node server.js"
}

# Set environment variables in hosting dashboard
CLAUDE_API_KEY=...
VOYAGE_API_KEY=...
```

**Important:** Update `BACKEND_URL` in frontend services to production URL

---

## 🤝 Contributing

Ideas for improvements:
- [ ] Add support for multiple languages
- [ ] Export to Markdown/PDF
- [ ] Save/load previous organizations
- [ ] Collaborative editing
- [ ] Custom domain templates
- [ ] Integration with Notion/Google Docs

---

## 📄 License

MIT License - Use freely for personal and commercial projects

---

## 🙏 Credits

Built with:
- [Claude AI](https://anthropic.com) - Intelligent term organization
- [Voyage AI](https://voyageai.com) - Semantic embeddings
- [Ionic Framework](https://ionicframework.com) - UI components
- [React](https://react.dev) - Frontend framework

---

## 📧 Support

Having issues? Check:
1. This README's troubleshooting section
2. Browser console for error messages
3. Backend logs: `node server.js` output

**Example Photography Terms for Testing:**
```
aperture, f-stop, shutter speed, ISO, exposure triangle, depth of field,
bokeh, motion blur, panning, freeze motion, golden hour, blue hour,
harsh light, soft light, diffuser, reflector, fill light, key light,
rule of thirds, leading lines, framing, negative space, symmetry,
RAW, JPEG, histogram, exposure compensation, white balance, color temperature,
lens compression, focal length, wide angle, telephoto, fisheye,
prime lens, zoom lens, macro lens, kit lens
```

Happy organizing! 📚✨