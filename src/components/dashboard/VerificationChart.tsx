import { ChartData } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface VerificationChartProps {
  data: ChartData[];
}

const COLORS = [
  'hsl(160, 84%, 39%)', // verified - success
  'hsl(38, 92%, 50%)',  // pending - warning
  'hsl(0, 84%, 60%)',   // rejected - destructive
  'hsl(215, 16%, 47%)', // suspended - muted
];

export function VerificationChart({ data }: VerificationChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-foreground mb-4">Verification Status</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
