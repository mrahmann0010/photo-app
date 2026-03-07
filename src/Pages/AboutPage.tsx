import { Helmet } from 'react-helmet-async';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import AnimatedText from '../components/ui/AnimatedText';
import Button from '../components/ui/Button';
import { siteConfig } from '../data/site';

const values = [
  {
    label: 'Patience',
    body: 'The right light appears once. I wait for it. Whether that means four hours on a hillside or returning to the same forest path across four seasons.',
  },
  {
    label: 'Simplicity',
    body: 'Reduction is the work. Strip the frame until only the essential remains, and what remains carries weight.',
  },
  {
    label: 'Presence',
    body: 'Every photograph is a record of a specific moment of attention. The camera is secondary to actually being there.',
  },
];

const process = [
  { step: '01', title: 'Scout', body: 'Research light conditions, seasons, access. Walk the location before raising the camera.' },
  { step: '02', title: 'Wait', body: 'Return during the golden windows — pre-dawn, golden hour, blue hour, storm breaks.' },
  { step: '03', title: 'Edit', body: 'Process in Lightroom then Photoshop. Dodge, burn, and tone to match what I\'d seen, not correct it.' },
  { step: '04', title: 'Sequence', body: 'Photographs live in relationship to each other. I organise into collections that sustain attention across frames.' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — {siteConfig.title}</title>
        <meta name="description" content={`${siteConfig.author} — landscape and nature photographer.`} />
      </Helmet>

      {/* Hero split */}
      <div className="pt-32 pb-0 bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[60vh]">
            {/* Portrait */}
            <RevealOnScroll delay={0.1}>
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none overflow-hidden rounded-card">
                <img
                  src="/main/hero-bg-3.jpg"
                  alt={siteConfig.author}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent pointer-events-none" />
              </div>
            </RevealOnScroll>

            {/* Bio */}
            <RevealOnScroll delay={0.2}>
              <div className="flex flex-col gap-6">
                <span className="text-caption font-inter text-accent uppercase tracking-[0.2em]">
                  About
                </span>
                <AnimatedText
                  text={siteConfig.author}
                  as="h1"
                  className="font-playfair text-display-md text-text-primary"
                />
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  I am a landscape and nature photographer based in{' '}
                  {siteConfig.location}. My work focuses on the quiet drama of
                  light — the way it lands on granite, filters through old growth,
                  and turns an ordinary forest floor into something worth returning
                  to.
                </p>
                <p className="text-body-md text-text-secondary leading-relaxed">
                  I shoot primarily in the Alps, Scandinavian forests, and
                  equatorial jungles. The photographs in this portfolio represent
                  roughly five years of field work across those environments.
                </p>
                <div className="flex gap-4 pt-2">
                  <Button as="a" href={`mailto:${siteConfig.email}`} variant="accent">
                    Get in touch
                  </Button>
                  <Button as="a" href="/gallery" variant="ghost">
                    View work
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </div>

      {/* Values */}
      <Section className="bg-[#111111] border-y border-[#222222]">
        <Container>
          <RevealOnScroll>
            <h2 className="font-playfair text-display-sm text-text-primary mb-12 text-center">
              What guides the work
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <RevealOnScroll key={v.label} delay={i * 0.1}>
                <div className="flex flex-col gap-3 p-6 border border-[#222222] rounded-card hover:border-accent/40 transition-colors duration-300">
                  <h3 className="font-playfair text-display-xs text-text-primary">{v.label}</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">{v.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <RevealOnScroll>
            <h2 className="font-playfair text-display-sm text-text-primary mb-12">Process</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 0.1}>
                <div className="flex flex-col gap-3">
                  <span className="font-inter text-body-sm text-accent tracking-[0.15em]">
                    {item.step}
                  </span>
                  <h3 className="font-playfair text-body-xl text-text-primary">{item.title}</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pull quote */}
      <Section className="bg-[#111111] border-t border-[#222222]">
        <Container>
          <RevealOnScroll>
            <blockquote className="max-w-2xl mx-auto text-center">
              <p className="font-lora text-display-xs text-text-primary italic leading-relaxed">
                "I am not a great photographer. I am a patient one."
              </p>
            </blockquote>
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  );
}
