import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

const components: Partial<Components> = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold tracking-tight text-neutral-900 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-neutral-600 leading-relaxed mb-4">{children}</p>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    return isInline ? (
      <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono text-brand-700">
        {children}
      </code>
    ) : (
      <pre className="bg-neutral-900 text-neutral-50 rounded-lg p-4 overflow-x-auto mb-6">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-neutral-600 space-y-1 mb-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-neutral-600 space-y-1 mb-4">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-300 pl-4 py-2 my-4 bg-brand-50 rounded-r-lg italic text-neutral-700">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ""} className="rounded-lg my-6 max-w-full" loading="lazy" />
  ),
  iframe: ({ src, title, ...props }) => (
    <div className="my-6 rounded-lg overflow-hidden">
      <iframe
        src={src}
        title={title || "Embedded content"}
        className="w-full aspect-video"
        allowFullScreen
        {...props}
      />
    </div>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
