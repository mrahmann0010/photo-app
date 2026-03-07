import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import Button from '../components/ui/Button';
import { siteConfig } from '../data/site';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.enum(['landscape', 'portrait', 'editorial', 'commercial', 'personal', 'other'] as const, {
    error: 'Please select a project type',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormValues = z.infer<typeof schema>;

const PROJECT_TYPES = [
  { value: 'landscape', label: 'Landscape / Nature' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'personal', label: 'Personal project' },
  { value: 'other', label: 'Other' },
] as const;

const fieldClass =
  'w-full bg-[#111111] border border-[#333333] text-text-primary placeholder:text-text-tertiary rounded-card px-4 py-3 text-body-sm font-inter outline-none focus:border-accent transition-colors duration-200';
const errorClass = 'text-[0.75rem] text-red-400 mt-1';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    // Replace with your actual form submission logic (e.g. fetch to API route / Formspree)
    await new Promise((r) => setTimeout(r, 800));
    console.log('Form submitted', data);
    reset();
  }

  return (
    <>
      <Helmet>
        <title>Contact — {siteConfig.title}</title>
        <meta name="description" content={`Get in touch with ${siteConfig.author} for print orders, licensing, or commissions.`} />
      </Helmet>

      {/* Page header */}
      <div className="pt-32 pb-10 bg-[#0A0A0A] border-b border-[#222222]">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-caption font-inter text-accent uppercase tracking-[0.2em]">
                Say hello
              </span>
              <h1 className="font-playfair text-display-lg text-text-primary">Contact</h1>
              <p className="text-body-md text-text-secondary mt-1">
                For print orders, licensing enquiries, or potential collaboration.
                I respond within two business days.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </div>

      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <RevealOnScroll delay={0.1}>
              {isSubmitSuccessful ? (
                <div className="flex flex-col gap-4 py-12 text-center">
                  <p className="font-playfair text-display-xs text-text-primary">
                    Thank you — message received.
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    I'll be in touch within two business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-body-sm text-text-secondary mb-1.5 font-inter" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={fieldClass}
                      {...register('name')}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-body-sm text-text-secondary mb-1.5 font-inter" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={fieldClass}
                      {...register('email')}
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>

                  {/* Project type */}
                  <div>
                    <label className="block text-body-sm text-text-secondary mb-1.5 font-inter" htmlFor="projectType">
                      Project type
                    </label>
                    <select
                      id="projectType"
                      className={fieldClass}
                      {...register('projectType')}
                    >
                      <option value="">Select a type…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    {errors.projectType && <p className={errorClass}>{errors.projectType.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-body-sm text-text-secondary mb-1.5 font-inter" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your project…"
                      className={`${fieldClass} resize-none`}
                      {...register('message')}
                    />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="self-start"
                  >
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </form>
              )}
            </RevealOnScroll>

            {/* Sidebar info */}
            <RevealOnScroll delay={0.2}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="font-playfair text-display-xs text-text-primary">Email</h2>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-body-md text-accent hover:underline underline-offset-4 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="font-playfair text-display-xs text-text-primary">Based in</h2>
                  <p className="text-body-md text-text-secondary">{siteConfig.location}</p>
                </div>

                {siteConfig.socials.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h2 className="font-playfair text-display-xs text-text-primary">Elsewhere</h2>
                    <ul className="flex flex-col gap-2">
                      {siteConfig.socials.map((social) => (
                        <li key={social.name}>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-sm text-text-secondary hover:text-accent transition-colors"
                          >
                            {social.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-2 p-6 border border-[#222222] rounded-card">
                  <h3 className="font-inter text-body-sm text-text-secondary uppercase tracking-widest">
                    Response time
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    I typically respond within 2 business days. For urgent enquiries,
                    email directly.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>
    </>
  );
}
