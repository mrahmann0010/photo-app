export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  title: string;
  author: string;
  description: string;
  url: string;
  ogImage: string;
  socials: SocialLink[];
  email: string;
  location: string;
}
