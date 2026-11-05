export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  whatItIs: string;
  howItHelps: string;
  whatWeProvide: string[];
  ctaLabel: string;
  category: string;
  iconType: 'code' | 'search' | 'share' | 'target' | 'ad' | 'linkedin' | 'email' | 'local';
  image: string;
  deliverables: string[];
  technologies: string[];
  metricFocus: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WhyUsReason {
  id: number;
  title: string;
  description: string;
  highlight: string;
  badge: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  projectDetails: string;
  budgetRange?: string;
}
