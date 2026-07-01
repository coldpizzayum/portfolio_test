export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-8">
        <p className="text-[13px] text-fg-secondary">© 2026 Yiting Huang. All rights reserved.</p>
        <nav className="flex gap-8">
          <a
            href="https://www.linkedin.com/in/yiting-huang"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-fg-secondary transition-colors duration-300 hover:text-fg"
          >
            LinkedIn
          </a>
          <a href="#" className="text-[13px] text-fg-secondary transition-colors duration-300 hover:text-fg">
            Dribbble
          </a>
          <a
            href="https://drive.google.com/file/d/1XynSSZhJOwGmKKukWlngmdwRWqP6Z-9l/view"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-fg-secondary transition-colors duration-300 hover:text-fg"
          >
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
}
