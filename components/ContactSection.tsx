import { Reveal } from "./Reveal";
import Button from "./Button";

const CONTACT_EMAIL = "yitinghuang.design@gmail.com";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-bg-alt py-20 md:py-30">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.2fr_1fr] md:gap-30">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">Let&apos;s talk</p>
            <h2 className="mb-8 text-[36px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-[clamp(36px,5vw,64px)]">
              Open to new
              <br />
              collaborations.
            </h2>
            <p className="max-w-[420px] text-base leading-[1.65] text-fg-secondary">
              Whether it&apos;s a full-time role, a contract project, or just a design conversation — my inbox is
              always open.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Email</span>
              <span className="text-[17px] font-medium text-fg">
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors duration-300 hover:text-accent">
                  {CONTACT_EMAIL}
                </a>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Location</span>
              <span className="text-[17px] font-medium text-fg">Berlin, Germany (UTC+2)</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Availability</span>
              <span className="text-[17px] font-medium text-available">Open to opportunities</span>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <Button href="#contact" variant="primary" className="w-full justify-center">
                Schedule a chat
              </Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary" className="w-full justify-center">
                Send an email
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
