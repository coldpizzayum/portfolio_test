interface ComingSoonProps {
  description: string;
}

export default function ComingSoon({ description }: ComingSoonProps) {
  return (
    <section className="bg-bg px-8 pt-[45px] pb-32 md:pt-[50px] md:pb-40">
      <div className="mx-auto max-w-[1200px] text-center">
        <h1 className="mb-3 text-h1 tracking-[-0.03em] text-fg">Coming soon.</h1>
        <p className="mx-auto max-w-[480px] text-body text-fg">{description}</p>
      </div>
    </section>
  );
}
