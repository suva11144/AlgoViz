import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowDownUp, 
  Search, 
  GitBranch, 
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Visualize how different sorting algorithms organize data step by step.',
    icon: ArrowDownUp,
    path: '/sorting',
    algorithms: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    description: 'Understand how search algorithms find elements in data structures.',
    icon: Search,
    path: '/search',
    algorithms: ['Linear Search', 'Binary Search'],
    gradient: 'from-green-500 to-emerald-500',
    available: true,
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    description: 'Explore graph traversal and pathfinding algorithms visually.',
    icon: GitBranch,
    path: '/graph',
    algorithms: ['BFS', 'DFS', "Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", 'Bellman-Ford', 'Floyd-Warshall'],
    gradient: 'from-purple-500 to-pink-500',
    available: true,
  },
  {
    id: 'dynamic',
    title: 'Dynamic Programming',
    description: 'Learn dynamic programming concepts through visual explanations.',
    icon: BrainCircuit,
     path: '/dynamic',
     algorithms: ['Fibonacci', 'LCS', '0/1 Knapsack', 'Edit Distance'],
    gradient: 'from-orange-500 to-red-500',
     available: true,
  },
  {
    id: 'divideconquer',
    title: 'Divide and Conquer',
    description: 'Explore classic divide and conquer algorithms that break problems into subproblems.',
    icon: ArrowDownUp, // You can replace with a more suitable icon if desired
    path: '/divideconquer',
    algorithms: [
      'Max/Min Finding (D&C)',
      'Quicksort',
      'Binary Search',
      'Merge Sort',
      "Strassen's Matrix Multiplication"
    ],
    gradient: 'from-indigo-500 to-blue-700',
    available: true,
  },
];

export function AlgorithmCategoriesSection() {
  return (
    <section id="algorithms" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Algorithms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a category to start visualizing algorithms and understanding how they work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category.available ? (
                <Link
                  to={category.path}
                  className="block h-full"
                >
                  <div className="glass-card rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-border/50 hover:border-primary/50">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4`}>
                      <category.icon className="h-7 w-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.algorithms.map((algo) => (
                        <span
                          key={algo}
                          className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-secondary-foreground"
                        >
                          {algo}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>Start Visualizing</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="glass-card rounded-2xl p-6 h-full opacity-60 border border-border/30">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 opacity-50`}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.algorithms.map((algo) => (
                      <span
                        key={algo}
                        className="px-2 py-1 text-xs rounded-md bg-secondary/30 text-muted-foreground"
                      >
                        {algo}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-sm text-muted-foreground italic">Coming Soon</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
