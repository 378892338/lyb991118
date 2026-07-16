export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300";
  const styles = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg",
    secondary:
      "border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
  };

  return (
    <a
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
