interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'hc' | 'custom';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    hc: 'bg-red-100 text-red-700',
    custom: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
