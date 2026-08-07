interface ComingSoonProps {
  eyebrow: string;
  description: string;
}

export default function ComingSoon({ eyebrow, description }: ComingSoonProps) {
  return (
    <section className="bg-bg px-8 pt-[45px] pb-32 md:pt-[50px] md:pb-40">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-4 text-caption tracking-[0.1em] text-fg-secondary uppercase">{eyebrow}</p>
        <h1 className="mb-6 font-serif text-[32px] font-bold tracking-[-0.03em] text-fg md:text-h1">Coming soon.</h1>
        <p className="mx-auto max-w-[480px] text-body-sm text-fg-secondary md:text-body">{description}</p>
      </div>
    </section>
  );
}
