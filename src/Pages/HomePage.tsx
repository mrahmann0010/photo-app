import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import HeroSection from '../components/layout/HeroSection';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import AnimatedText from '../components/ui/AnimatedText';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import CollectionCard from '../components/gallery/CollectionCard';
import Button from '../components/ui/Button';
import { collections } from '../data/collections';
import { siteConfig } from '../data/site';

export default function HomePage() {
  const featured = collections.slice(0, 3);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <HeroSection
        backgroundImage="/main/hero-bg-3.jpg"
        minHeight="100svh"
        kenBurns
        parallax
        className="font-playfair"
      >
        <Container className="pb-20 md:pb-28">
          <motion.div
            className="flex flex-col gap-6 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Eyebrow */}
            <span className="text-caption font-inter text-accent uppercase tracking-[0.25em]">
              Photography Portfolio
            </span>

            {/* Hero headline */}
            <h1 className="font-playfair text-display-xl text-text-primary leading-tight">
              <AnimatedText
                text="The proper function of man is to"
                splitBy="words"
                delay={0.5}
              />
              {' '}
              <span className="italic text-accent">
                <AnimatedText text="live, not to exist." splitBy="words" delay={0.9} />
              </span>
            </h1>

            <motion.p
              className="text-body-lg text-text-secondary max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Curated collections of light, landscape, and life — captured across alpine peaks,
              ancient forests, and tropical jungles.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 mt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/gallery">
                <Button variant="primary" size="lg">View Gallery</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg">About Me</Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </HeroSection>

      {/* ── Featured Collections ────────────────────────────── */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <RevealOnScroll>
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-caption font-inter text-accent uppercase tracking-[0.2em]">
                  Collections
                </span>
                <h2 className="font-playfair text-display-lg text-text-primary mt-2">
                  Featured Work
                </h2>
              </div>
              <Link to="/gallery">
                <Button variant="ghost" size="sm">View all →</Button>
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featured.map((col, i) => (
              <RevealOnScroll key={col.id} delay={i * 0.1}>
                <CollectionCard collection={col} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Philosophy Statement ────────────────────────────── */}
      <Section className="bg-[#0A0A0A] border-t border-[#222222]">
        <Container>
          <RevealOnScroll>
            <blockquote className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
              <div className="w-8 h-[1px] bg-accent" />
              <p
                className="font-playfair italic text-text-primary leading-snug"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
              >
                &ldquo;I shall not waste my days in trying to prolong them. I shall use my time.&rdquo;
              </p>
              <footer className="text-caption font-inter text-text-secondary uppercase tracking-widest">
                — Jack London
              </footer>
            </blockquote>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* ── Contact CTA ─────────────────────────────────────── */}
      <Section className="bg-[#111111]">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-playfair text-heading-xl text-text-primary">
                  Let&apos;s work together
                </h2>
                <p className="text-body-md text-text-secondary mt-2">
                  Commissions, collaborations, or just a conversation about photography.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="primary" size="lg">Get in touch</Button>
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  );
}
