interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>

        {icon}
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}
