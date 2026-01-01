import { ChartData } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UserGrowthChartProps {
  data: ChartData[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-foreground mb-4">User Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCounselors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
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
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name === 'students' ? 'Students' : 'Counselors'
              ]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="students"
              stroke="hsl(222, 47%, 20%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStudents)"
              name="Students"
            />
            <Area
              type="monotone"
              dataKey="counselors"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCounselors)"
              name="Counselors"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
