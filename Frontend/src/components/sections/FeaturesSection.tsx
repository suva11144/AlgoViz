import { motion } from 'framer-motion';
import { Eye, Gauge, BookOpen, Layers, Zap, Code2 } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Step-by-Step Visualization',
    description: 'Watch algorithms execute one step at a time with clear visual feedback.',
  },
  {
    icon: Gauge,
    title: 'Complexity Analysis',
    description: 'Understand time and space complexity with real-time operation counters.',
  },
  {
    icon: BookOpen,
    title: 'Plain English Explanations',
    description: 'Each step is explained in simple terms to build intuition.',
  },
  {
    icon: Layers,
    title: 'Multiple Algorithm Types',
    description: 'Sorting, searching, graph traversal, and dynamic programming.',
  },
  {
    icon: Zap,
    title: 'Adjustable Speed',
    description: 'Control visualization speed to match your learning pace.',
  },
  {
    icon: Code2,
    title: 'Interview Ready',
    description: 'Perfect preparation for technical interviews at top companies.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why This Visualizer?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for developers who want to truly understand algorithms, not just memorize them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:border-primary/50 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
