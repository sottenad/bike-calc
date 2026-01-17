interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'hc' | 'custom';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300',
    hc: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400',
    custom: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
