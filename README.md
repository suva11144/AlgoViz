## AlgoViz

### Overview
AlgoViz is an algorithm visualization web app for learning and exploring classic CS algorithms interactively. The frontend lives in `Frontend/` (Vite + React + TypeScript). The `backend/` folder currently contains an early Express stub (not fully implemented yet).

### Core Features
- **Algorithm categories**: Sorting, Searching, Graph, Dynamic Programming, and Divide & Conquer.
- **Built-in algorithm list (UI)**: Bubble/Selection/Insertion/Merge/Quick Sort, Linear/Binary Search, BFS/DFS, Dijkstra/Prim/Kruskal, Bellman-Ford, Floyd–Warshall, Fibonacci, LCS, 0/1 Knapsack, Edit Distance, and more under Divide & Conquer.
- **AI helper (optional)**: Uses an OpenAI key in the frontend to provide explanations (development-focused; see deployment notes).

### Tech Stack
- **Frontend**: Vite, React, TypeScript, React Router
- **UI**: Tailwind CSS, shadcn/ui (Radix UI)
- **State/Data**: TanStack Query
- **Testing/Linting**: Vitest, ESLint
- **Backend (WIP)**: Node.js + Express (placeholder)

### Setup and Installation
#### Prerequisites
- **Node.js**: 18+ recommended
- **npm**

#### Clone the whole project
```bash
git clone <your-repo-url>
cd AlgoViz
```

#### Install dependencies
```bash
# Frontend
cd Frontend
npm install

# Backend (optional for now)
cd ../backend
npm install
```

#### Run locally
```bash
# Frontend (Vite dev server)
cd Frontend
npm run dev
```

```bash
# Backend (optional stub)
cd backend
node server.js
```

### Project Structure
- **`README.md`**: Project documentation (this file)
- **`Frontend/`**: Frontend app
  - **`src/pages/`**: Category pages and routes
  - **`src/components/`**: UI + visualization components
  - **`src/algorithms/`**: Algorithm logic
  - **`src/services/`**: Client-side services (e.g., AI helper)
- **`backend/`**: Backend stub (Express)

### Environment Variables
The frontend uses Vite, so browser-exposed variables must be prefixed with **`VITE_`**.

1) Create `Frontend/.env.local` (do not commit):

```bash
cd Frontend

# macOS / Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

2) Configure:
- **`VITE_OPENAI_API_KEY`**: OpenAI API key (used by `Frontend/src/services/chatgptService.ts`)

### Available Scripts
#### Frontend (`Frontend/`)
- **`npm run dev`**: Start Vite dev server
- **`npm run build`**: Production build
- **`npm run build:dev`**: Development-mode build
- **`npm run preview`**: Preview the production build locally
- **`npm run lint`**: Run ESLint
- **`npm test`**: Run Vitest (single run)
- **`npm run test:watch`**: Run Vitest in watch mode

#### Backend (`backend/`)
- **`npm test`**: Placeholder test script

### Contributing
- **Workflow**: Fork → create a branch → commit → open a PR.
- **Before opening a PR (frontend)**:

```bash
cd Frontend
npm run lint
npm test
```

- **Secrets**: Never commit `.env.local` or API keys. If a key was ever exposed, rotate it immediately.

### Deployment Notes
- **Frontend**: Build with:

```bash
cd Frontend
npm run build
```

Deploy the generated `Frontend/dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.).

- **Important security note**: `VITE_*` variables are bundled into the client. **Do not ship real private API keys to production in the browser**. For a production setup, move OpenAI calls to a backend (or serverless function) and keep the API key server-side.

### License
No repository-wide license file is included yet. If you intend this to be open source, add a `LICENSE` file (for example, MIT or ISC) and update this section accordingly.

