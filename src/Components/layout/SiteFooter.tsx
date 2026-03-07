import { Link } from 'react-router-dom';
import Container from './Container';
import { siteConfig } from '../../data/site';

const footerLinks = [
  {
    header: 'Navigate',
    links: [
      { name: 'Home',     href: '/' },
      { name: 'Gallery',  href: '/gallery' },
      { name: 'About',    href: '/about' },
      { name: 'Contact',  href: '/contact' },
    ],
  },
  {
    header: 'Elsewhere',
    links: siteConfig.socials.map((s) => ({ name: s.name, href: s.url })),
  },
  {
    header: 'Contact',
    links: [{ name: siteConfig.email, href: `mailto:${siteConfig.email}` }],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#222222] bg-[#0A0A0A]">
      <Container>
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <span className="font-playfair text-heading-lg text-text-primary">
              {siteConfig.author}
            </span>
            <p className="text-body-sm text-text-secondary leading-relaxed max-w-[200px]">
              {siteConfig.description}
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.header} className="flex flex-col gap-4">
              <h6 className="text-caption font-inter font-semibold uppercase tracking-widest text-text-tertiary">
                {group.header}
              </h6>
              <ul className="flex flex-col gap-2">
                {group.links.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith('http') || item.href.startsWith('mailto') ? (
                      <a
                        href={item.href}
                        className="text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-caption text-text-tertiary">
            © {year} {siteConfig.author}. All rights reserved.
          </span>
          <span className="text-caption text-text-tertiary">
            {siteConfig.location}
          </span>
        </div>
      </Container>
    </footer>
  );
}
