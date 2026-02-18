import { motion } from 'framer-motion';
import { algorithmInfo } from '@/algorithms/sorting';

export function AlgorithmsSection() {
  const algorithms = Object.entries(algorithmInfo);

  return (
    <section id="algorithms" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Algorithms Covered
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn the most important algorithms for technical interviews.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map(([key, info], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">{info.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  info.stable 
                    ? 'bg-state-sorted/20 text-state-sorted' 
                    : 'bg-state-swapping/20 text-state-swapping'
                }`}>
                  {info.stable ? 'Stable' : 'Unstable'}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {info.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time (Best)</span>
                  <span className="font-mono text-state-sorted">{info.timeComplexity.best}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time (Worst)</span>
                  <span className="font-mono text-state-swapping">{info.timeComplexity.worst}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Space</span>
                  <span className="font-mono text-primary">{info.spaceComplexity}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming Soon cards */}
          {['BFS', 'DFS', 'Dijkstra'].map((algo, index) => (
            <motion.div
              key={algo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (algorithms.length + index) * 0.1 }}
              className="glass-card rounded-2xl p-6 border-dashed opacity-60"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">{algo}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Graph algorithm visualization coming in the next update.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
