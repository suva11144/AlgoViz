# Algorithm Insight - Interactive Algorithm Visualizer

An interactive web application for visualizing and understanding algorithms including sorting, searching, graph algorithms, and dynamic programming concepts.

## Features

- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Search Algorithms**: Linear Search, Binary Search
- **Graph Algorithms**: BFS, DFS, Dijkstra's, Prim's, Kruskal's, Bellman-Ford, Floyd-Warshall
- **Dynamic Programming**: Fibonacci, Longest Common Subsequence (LCS), 0/1 Knapsack, Edit Distance
- **AI-Powered ChatBot**: Ask questions about algorithms and get instant explanations
- **Real-time Visualization**: Step-by-step algorithm execution with smooth animations
- **Speed Control**: Adjust visualization speed from 1-100%
- **Dark/Light Theme**: Toggle between themes for comfortable viewing

## Quick Start

### Prerequisites
- Node.js & npm (or Bun)
- OpenAI API key for ChatBot (optional but recommended)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd algorithm-insight-main

# Step 3: Install dependencies
npm i
# or with bun:
bun install

# Step 4: Create .env.local file for ChatBot (optional)
# Copy .env.example and add your OpenAI API key
echo "VITE_OPENAI_API_KEY=your_api_key_here" > .env.local

# Step 5: Start development server
npm run dev
# or with bun:
bun run dev
```

Visit `http://localhost:8080` to see the application.

## ChatBot Setup (Optional)

The application includes an AI-powered ChatBot that can explain algorithms and answer questions.

### To Enable ChatBot:

1. **Get OpenAI API Key**:
   - Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new secret key

2. **Add API Key to `.env.local`**:
   ```
   VITE_OPENAI_API_KEY=sk_test_your_key_here
   ```

3. **Restart Development Server**:
   ```sh
   npm run dev
   ```

4. **Use ChatBot**:
   - Click the blue bot icon in the bottom-right corner
   - Ask questions about any algorithm

For detailed setup instructions, see [CHATBOT_SETUP.md](./CHATBOT_SETUP.md).

## Project Structure

```
src/
├── algorithms/          # Algorithm implementations (sorting, search, graph, dynamic)
├── components/          # React components
│   ├── ChatBot.tsx      # AI ChatBot component
│   ├── visualizers/     # Algorithm visualization components
│   ├── controls/        # UI controls (speed, size, inputs)
│   ├── panels/          # Information panels (stats, explanations)
│   └── sections/        # Home page sections
├── hooks/               # Custom React hooks for visualizers
├── pages/               # Page components for each algorithm type
├── services/            # External services (ChatGPT API)
└── lib/                 # Utility functions
```

## Development

### Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router
- **APIs**: OpenAI ChatGPT (optional)
- **UI Components**: Radix UI
- **Icons**: Lucide React

## Algorithm Details

### Sorting Algorithms
- Bubble Sort: O(n²) comparison-based sorting
- Selection Sort: O(n²) selection-based sorting
- Insertion Sort: O(n²) incremental sorting
- Merge Sort: O(n log n) divide-and-conquer
- Quick Sort: O(n log n) average case partitioning

### Search Algorithms
- Linear Search: O(n) sequential search
- Binary Search: O(log n) divide-and-conquer search

### Graph Algorithms
- BFS (Breadth-First Search): Graph traversal
- DFS (Depth-First Search): Graph traversal
- Dijkstra's Algorithm: Shortest path
- Prim's Algorithm: Minimum spanning tree
- Kruskal's Algorithm: Minimum spanning tree
- Bellman-Ford: Single-source shortest path
- Floyd-Warshall: All-pairs shortest path

### Dynamic Programming
- Fibonacci: Series calculation
- Longest Common Subsequence: String similarity
- 0/1 Knapsack: Optimization problem
- Edit Distance: String transformation distance

## How to Edit

### Using Your IDE

1. Clone the repository
2. Open in your preferred IDE
3. Make changes and save
4. Changes will hot-reload in browser

### Using GitHub

1. Navigate to desired file
2. Click the "Edit" button (pencil icon)
3. Make changes and commit

### Using GitHub Codespaces

1. Click "Code" button
2. Select "Codespaces" tab
3. Create new Codespace
4. Edit files and commit when done

## Deployment

### Using Lovable
1. Open the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
2. Click Share → Publish

### Using Vercel
```sh
vercel deploy
```

### Using Netlify
```sh
netlify deploy --prod --dir=dist
```

## Custom Domain

To connect a custom domain:
1. Go to Project Settings > Domains
2. Click "Connect Domain"
3. Follow the DNS configuration steps

[Read more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Environment Variables

```env
# Required for ChatBot feature
VITE_OPENAI_API_KEY=your_openai_api_key

# Optional - Custom OpenAI endpoint
VITE_OPENAI_API_ENDPOINT=https://api.openai.com/v1
```

⚠️ **Security**: Never commit `.env.local` to version control. Use `.env.example` as template.

## Troubleshooting

### Port 8080 Already in Use
```sh
# Use different port
npm run dev -- --port 3000
```

### ChatBot Not Working
- Verify `.env.local` has correct API key
- Check that `VITE_OPENAI_API_KEY` is set
- Restart development server after changing `.env.local`
- See [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for detailed troubleshooting

### Build Errors
```sh
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Tips

- Use Chrome DevTools for profiling
- Adjust array size for resource-constrained systems
- Reduce animation speed for faster exploration
- Close ChatBot window if not actively using

## Browser Support

- Chrome/Edge: Latest version recommended
- Firefox: Latest version
- Safari: Latest version
- Mobile: Responsive design (may need landscape for large visualizations)

## License

See LICENSE file in repository root.

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Support

For issues, questions, or suggestions:
- [Create an issue](../../issues)
- Check [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for ChatBot help
- Visit [OpenAI Documentation](https://platform.openai.com/docs)

## Credits

Built with React, TypeScript, Tailwind CSS, and Framer Motion.

---

**Happy Algorithm Learning!** 🎓
