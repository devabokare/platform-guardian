import { ChartData } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InstitutionChartProps {
  data: ChartData[];
}

export function InstitutionChart({ data }: InstitutionChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-foreground mb-4">Institution Onboarding</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(215, 16%, 47%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 16%, 47%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [value, 'Institutions']}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(222, 47%, 20%)" 
              radius={[4, 4, 0, 0]}
              name="Institutions"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
