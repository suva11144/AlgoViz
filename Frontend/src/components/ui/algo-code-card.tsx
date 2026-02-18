import * as React from "react";

interface AlgoCodeCardProps {
  title: string;
  pseudocode: string;
}

export const AlgoCodeCard: React.FC<AlgoCodeCardProps> = ({ title, pseudocode }) => (
  <div className="rounded-xl border bg-background p-4 shadow-md my-4">
    <div className="font-semibold mb-2 text-primary">{title}</div>
    <pre className="bg-muted rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap">
      {pseudocode}
    </pre>
  </div>
);
