import { motion } from 'framer-motion';
import { GraduationCap, Building2, Code, Users } from 'lucide-react';

const audiences = [
  {
    icon: GraduationCap,
    title: 'Computer Science Students',
    description: 'Supplement your coursework with interactive visualizations.',
  },
  {
    icon: Building2,
    title: 'Job Seekers',
    description: 'Prepare for technical interviews at top tech companies.',
  },
  {
    icon: Code,
    title: 'Self-taught Developers',
    description: 'Build strong CS fundamentals at your own pace.',
  },
  {
    icon: Users,
    title: 'Educators',
    description: 'Use as a teaching tool in classrooms and bootcamps.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who Is This For?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're preparing for your first technical interview or brushing up on 
              fundamentals, this visualizer helps you build deep understanding of how 
              algorithms work under the hood.
            </p>

            <div className="space-y-6">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <audience.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground">{audience.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Built for Learning
            </h3>
            <ul className="space-y-4">
              {[
                'No external algorithm libraries – all logic written from scratch',
                'Clean, modular code structure for easy understanding',
                'Real-time complexity analysis and operation counting',
                'Step-by-step explanations in plain English',
                'Responsive design for learning on any device',
                'Dark and light modes for comfortable viewing',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
