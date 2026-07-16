interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-neutral-400 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
