import { ServiceItem, WhyUsReason, ProcessStep, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: 'MR Miracle Digital Marketing Pvt. Ltd.',
  brandName: 'MR Miracle',
  legalName: 'MR MIRACLE DIGITAL MARKETING (OPC) PRIVATE LIMITED',
  tagline: 'More Than Marketing. We Build Brands.',
  subtitle: 'Creative strategies. Powerful digital experiences. Measurable business growth.',
  domain: 'https://mrmiracle.in',
  location: 'Tamil Nadu, India',
  pincode: '627809',
  country: 'India',
  contactEmail: 'contact@mrmiracle.in',
  hours: 'Monday – Saturday: 9:30 AM – 6:30 PM IST',
  overview:
    'MR Miracle Digital Marketing Pvt. Ltd. is a digital growth and brand engineering agency. We partner with visionary enterprises, startups, and established businesses to build enduring brand value, engineering high-performance web systems and targeted digital marketing engines that convert curiosity into quantifiable business equity.'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    name: 'Website Development',
    shortDesc:
      'Modern, blazing-fast, and responsive web platforms engineered to capture attention, tell your brand story, and drive conversions.',
    fullDesc:
      'We design and engineer bespoke web presences from the ground up. Combining clean architecture, responsive UX/UI design, interactive 3D elements, and robust codebases, our websites ensure lightning-fast load times, seamless accessibility across all devices, and an unforgettable brand identity.',
    whatItIs:
      'Bespoke, full-stack web engineering and conversion-focused UI/UX design tailored to your brand identity and business model.',
    howItHelps:
      'Eliminates slow load times and confusing navigation, turning casual visitors into qualified inquiries with a credible, high-converting digital storefront.',
    whatWeProvide: [
      'Custom responsive layouts engineered for desktop, tablet, and mobile viewports',
      'Clean semantic code, fast page-load performance, and technical SEO readiness',
      'Clear conversion pathways, lead capture forms, and analytics integration'
    ],
    ctaLabel: 'Build Your Website',
    category: 'Engineering & Web',
    iconType: 'code',
    image: '/src/assets/images/service_web_development_1793850200984.jpg',
    deliverables: [
      'Custom Responsive Architecture (Desktop, Tablet, Mobile)',
      'High-Conversion UI/UX Design & Brand Aesthetics',
      'Performance Optimization & Core Web Vitals Mastery',
      'Seamless CMS & Third-Party API Integrations',
      'Security Hardening & Enterprise Reliability'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js'],
    metricFocus: 'High Speed Scores, Low Bounce Rate & Flawless Cross-Device Experience'
  },
  {
    id: 'seo',
    name: 'Search Engine Optimization (SEO)',
    shortDesc:
      'Data-led organic search visibility strategies that place your business in front of customers actively searching for your solutions.',
    fullDesc:
      'SEO is not merely about keywords; it is about establishing digital authority and matching searcher intent. We optimize site architecture, technical crawlability, on-page content structures, and topical relevance to earn sustainable, high-ranking positions across Google and Bing.',
    whatItIs:
      'Comprehensive technical, on-page, and authority-building search optimization designed to improve your organic rankings on major search engines.',
    howItHelps:
      'Captures high-intent buyers at the exact moment they search for your products or services, building compounding organic traffic without paying for every click.',
    whatWeProvide: [
      'Technical site audits, crawlability fixes, and structured schema implementation',
      'High-intent keyword research and search-intent content architecture',
      'On-page metadata optimization, internal linking, and authority building'
    ],
    ctaLabel: 'Grow Organic Rankings',
    category: 'Organic & SEO',
    iconType: 'search',
    image: '/src/assets/images/service_seo_1793850201434.jpg',
    deliverables: [
      'In-Depth Technical Crawl & Site Health Audits',
      'Competitive Gap Analysis & High-Intent Keyword Mapping',
      'On-Page Optimization & Semantic Schema Markups',
      'Content Strategy & Topical Authority Building',
      'High-Caliber Link Equity & Digital PR Foundations'
    ],
    technologies: ['Google Search Console', 'Ahrefs / SEMrush Data', 'Schema.org', 'Lighthouse'],
    metricFocus: 'Organic Traffic Volume, Keyword Rankings & Qualified Search Leads'
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    shortDesc:
      'Strategic content creation, consistent storytelling, and proactive community engagement to elevate your brand presence.',
    fullDesc:
      'Transform your brand channels from static noticeboards into vibrant digital communities. We craft tailored visual aesthetics, compelling copywriting, and narrative arcs that resonate with your target demographic and foster genuine engagement and brand loyalty.',
    whatItIs:
      'End-to-end social channel strategy, visual content production, editorial scheduling, and active community management across key platforms.',
    howItHelps:
      'Builds consistent brand recall, humanizes your business, and nurtures audience trust so prospects think of you first when they are ready to buy.',
    whatWeProvide: [
      'Cohesive visual grid design, short-form reels, and brand storytelling copy',
      'Structured monthly content calendars aligned with product and seasonal goals',
      'Proactive community engagement, comment management, and performance insights'
    ],
    ctaLabel: 'Elevate Social Presence',
    category: 'Social & Branding',
    iconType: 'share',
    image: '/src/assets/images/service_social_media_1793850201976.jpg',
    deliverables: [
      'Brand Social Identity & Visual Content Grid Strategy',
      'High-Impact Graphic Design, Reels & Motion Assets',
      'Editorial Calendar Planning & Timely Publishing',
      'Active Community Management & Audience Interaction',
      'Monthly Engagement Metrics & Sentiment Analysis'
    ],
    technologies: ['Meta Business Suite', 'LinkedIn Brand Hub', 'Instagram Creator Studio', 'Adobe Creative'],
    metricFocus: 'Audience Growth, High Engagement Rate & Brand Sentiment'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    shortDesc:
      'Hyper-targeted ad campaigns across Facebook and Instagram engineered for precision audience reach and scalable customer acquisition.',
    fullDesc:
      'Harness the immense machine-learning capabilities of Meta Ads. From creative testing frameworks and custom lookalike audiences to dynamic retargeting funnels, we construct ad campaigns designed to lower Customer Acquisition Cost (CAC) and scale Return on Ad Spend (ROAS).',
    whatItIs:
      'Full-funnel paid social advertising across Facebook and Instagram combining direct-response creative with precision audience targeting.',
    howItHelps:
      'Generates immediate visibility, qualified leads, and e-commerce sales by reaching ideal customer segments and retargeting interested prospects.',
    whatWeProvide: [
      'Full-funnel campaign architecture (awareness, consideration, and retargeting)',
      'Scroll-stopping ad creatives, video hooks, and direct-response copywriting',
      'Pixel & Conversion API (CAPI) tracking with continuous A/B creative testing'
    ],
    ctaLabel: 'Launch Meta Campaigns',
    category: 'Paid Ads',
    iconType: 'target',
    image: '/src/assets/images/service_meta_ads_1793850202484.jpg',
    deliverables: [
      'Full-Funnel Campaign Architecture (Top, Mid & Bottom of Funnel)',
      'High-Converting Ad Creatives & Direct-Response Copywriting',
      'Custom Audience Segmentation & High-Value Lookalikes',
      'Conversion API (CAPI) & Pixel Setup with Event Deduplication',
      'Daily Budget Pacing & Systematic A/B Creative Testing'
    ],
    technologies: ['Meta Ads Manager', 'Conversions API', 'Server-Side Tagging', 'Dynamic Creative Ads'],
    metricFocus: 'Cost Per Acquisition (CPA), Return on Ad Spend (ROAS) & Lead Volume'
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    shortDesc:
      'High-intent search, display, and Performance Max campaigns that intercept high-value prospects at the exact moment of commercial intent.',
    fullDesc:
      'When buyers want a solution now, they search Google. We construct razor-sharp Search, Display, and Performance Max campaigns with precision negative keyword matrices, quality score optimization, and high-converting landing page experiences that maximize marketing budget efficiency.',
    whatItIs:
      'Intent-driven paid search, display, and Performance Max advertising managed for maximum conversion efficiency and budget control.',
    howItHelps:
      'Places your offer at the top of Google search results immediately, capturing ready-to-buy customers while filtering out wasted clicks.',
    whatWeProvide: [
      'Granular keyword structuring and strict negative keyword filtering',
      'High-CTR Responsive Search Ads, extensions, and Performance Max asset groups',
      'GA4 & Google Tag Manager conversion tracking with ongoing bid optimization'
    ],
    ctaLabel: 'Capture Search Demand',
    category: 'Paid Ads',
    iconType: 'ad',
    image: '/src/assets/images/service_google_ads_1793850202492.jpg',
    deliverables: [
      'High-Intent Search Campaign Structure & Negative Keyword Lists',
      'Compelling Responsive Search Ads (RSAs) & Ad Extensions',
      'Performance Max (PMax) Asset Optimization',
      'Conversion Tracking, Enhanced Conversions & Value Rules',
      'Smart Bidding Strategy Deployment & Continuous Bid Tuning'
    ],
    technologies: ['Google Ads', 'Google Tag Manager', 'GA4 Analytics', 'Performance Max'],
    metricFocus: 'Click-Through Rate (CTR), Cost Per Conversion & Qualified Pipeline Value'
  },
  {
    id: 'linkedin-branding',
    name: 'LinkedIn Personal Branding',
    shortDesc:
      'Executive positioning, thought-leadership content, and strategic network expansion that turn founders and leaders into industry authorities.',
    fullDesc:
      'People trust people before they trust logos. We transform executive and founder LinkedIn profiles into high-converting authority hubs—combining profile architecture, ghostwritten thought-leadership posts, visual carousels, and targeted B2B relationship building.',
    whatItIs:
      'Strategic executive positioning and B2B content management that transforms founder and leadership LinkedIn profiles into inbound authority channels.',
    howItHelps:
      'Builds credibility with decision-makers, attracts B2B partnerships and inbound leads, and strengthens your company brand through authentic leadership.',
    whatWeProvide: [
      'Complete profile positioning, headline/banner overhaul, and featured funnel setup',
      'Weekly thought-leadership ghostwriting, industry insights, and visual carousels',
      'Targeted B2B network growth and meaningful engagement with key decision-makers'
    ],
    ctaLabel: 'Build Executive Authority',
    category: 'Social & Branding',
    iconType: 'linkedin',
    image: '/src/assets/images/service_linkedin_branding_1793850202463.jpg',
    deliverables: [
      'Executive Profile Positioning & Banner/Headline Optimization',
      'Weekly Thought-Leadership Ghostwriting & Storytelling',
      'Custom B2B Carousel & Infographics Production',
      'Strategic Industry Network & Decision-Maker Engagement',
      'Inbound Lead Magnet & Profile Funnel Integration'
    ],
    technologies: ['LinkedIn Creator Mode', 'Sales Navigator', 'B2B Content Systems', 'Social Analytics'],
    metricFocus: 'Executive Authority, Inbound B2B Inquiries & Network Growth'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    shortDesc:
      'Automated lifecycle sequences, high-converting newsletters, and segmented retention campaigns that nurture leads into loyal buyers.',
    fullDesc:
      'Own your audience relationship directly in the inbox. We design bespoke, mobile-responsive email templates, behavioral drip automations, welcome sequences, and segmented promotional campaigns that maximize open rates, click-throughs, and customer lifetime value.',
    whatItIs:
      'Automated lifecycle email flows, segmented campaigns, and conversion-focused newsletters engineered to nurture leads and retain customers.',
    howItHelps:
      'Converts warm prospects who are not ready to buy on day one and increases repeat purchases without relying solely on rising ad costs.',
    whatWeProvide: [
      'Automated welcome, lead-nurture, and re-engagement email sequences',
      'Custom responsive email templates with persuasive copy and clear CTAs',
      'Audience segmentation, deliverability setup (SPF/DKIM/DMARC), and A/B testing'
    ],
    ctaLabel: 'Automate Email Growth',
    category: 'Email & Automation',
    iconType: 'email',
    image: '/src/assets/images/service_email_marketing_1793850202807.jpg',
    deliverables: [
      'Automated Welcome, Nurture & Cart/Lead Recovery Flows',
      'Bespoke Responsive Newsletter Design & Copywriting',
      'Audience Segmentation & Behavioral Trigger Architecture',
      'Deliverability Optimization (SPF, DKIM, DMARC) & List Hygiene',
      'A/B Subject Line Testing & Revenue Attribution Tracking'
    ],
    technologies: ['Klaviyo', 'Mailchimp', 'HubSpot', 'Brevo', 'Customer.io'],
    metricFocus: 'Open Rate, Click-Through Rate (CTR) & Retention Revenue'
  },
  {
    id: 'local-seo',
    name: 'Local SEO',
    shortDesc:
      'Google Business Profile mastery, local map-pack rankings, and geo-targeted citations that drive foot traffic and regional calls.',
    fullDesc:
      'Dominate your local market when nearby customers search for your services. We optimize your Google Business Profile, build consistent local citations, manage review generation workflows, and engineer geo-targeted landing pages to capture top map-pack visibility.',
    whatItIs:
      'Location-focused search optimization centered on Google Business Profile, local map-pack rankings, and regional directory authority.',
    howItHelps:
      'Puts your business in front of nearby customers actively looking for immediate solutions, driving phone calls, direction requests, and walk-in visits.',
    whatWeProvide: [
      'Complete Google Business Profile optimization, categories, and regular updates',
      'NAP (Name, Address, Phone) consistency and high-authority local citations',
      'Review generation workflows and geo-targeted local landing pages'
    ],
    ctaLabel: 'Dominate Local Search',
    category: 'Organic & SEO',
    iconType: 'local',
    image: '/src/assets/images/service_local_seo_1793850203175.jpg',
    deliverables: [
      'Google Business Profile (GBP) Complete Optimization & Posts',
      'Local Map-Pack Ranking Strategy & Geo-Grid Tracking',
      'NAP Consistency & High-Authority Local Directory Citations',
      'Customer Review Generation & Reputation Management Systems',
      'Location-Specific Landing Pages & Local Schema Markup'
    ],
    technologies: ['Google Business Profile', 'Local Schema', 'Geo-Grid Trackers', 'Citation Networks'],
    metricFocus: 'Map Pack Top-3 Rankings, Direction Requests & Local Phone Calls'
  }
];

export const FEATURED_HIGHLIGHTS = [
  {
    id: 'web-plus-seo',
    tag: 'Foundation & Discovery',
    title: 'High-Speed Web Architecture + Technical SEO',
    description:
      'A great website is invisible without search authority, and SEO fails if visitors land on a slow page. We engineer both together so every page loads fast and ranks for commercial intent.',
    outcomes: ['Mobile-first responsive UX', 'Clean semantic schema markup', 'Conversion-ready landing pages'],
    serviceName: 'Website Development'
  },
  {
    id: 'paid-plus-retention',
    tag: 'Acquisition & Retention',
    title: 'Meta & Google Ads + Automated Email Nurture',
    description:
      'Capture immediate demand with precision Google and Meta campaigns, then nurture every lead through automated email sequences that maximize customer lifetime value.',
    outcomes: ['Full-funnel ad targeting', 'Conversion API & GA4 tracking', 'Automated follow-up flows'],
    serviceName: 'Google Ads'
  },
  {
    id: 'authority-plus-local',
    tag: 'Brand & Regional Reach',
    title: 'LinkedIn Personal Branding + Local SEO',
    description:
      'Position founders as trusted industry voices on LinkedIn while capturing high-intent regional searches and Google Map-Pack visibility for your physical or service areas.',
    outcomes: ['Executive thought leadership', 'Google Business Profile mastery', 'Consistent inbound inquiries'],
    serviceName: 'LinkedIn Personal Branding'
  }
];

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'What types of businesses does MR Miracle Digital Marketing work with?',
    answer:
      'We partner with startups, growing small-to-medium enterprises, B2B service providers, and established brands across India and globally. Whether you need a new website from scratch or a full-funnel paid and organic growth engine, we tailor our strategy to your business model.'
  },
  {
    question: 'Can we combine multiple services into a single integrated growth plan?',
    answer:
      'Yes. In fact, our strongest results come from combining complementary channels—such as Website Development with SEO and Local SEO, or Meta and Google Ads paired with Email Marketing. We build a unified roadmap so every channel reinforces the others.'
  },
  {
    question: 'How soon can we expect to see results from digital marketing?',
    answer:
      'Paid advertising channels like Google Ads and Meta Ads can begin generating targeted traffic and inquiries within days of launch. Organic channels like SEO, Local SEO, and LinkedIn Personal Branding build compounding authority over 3 to 6 months.'
  },
  {
    question: 'How does MR Miracle measure and report campaign performance?',
    answer:
      'We focus on business-critical metrics—qualified leads, conversion rates, cost per acquisition, and organic search visibility—rather than vanity impressions. You receive clear, transparent reporting and direct communication with our team.'
  },
  {
    question: 'How do we get started with MR Miracle?',
    answer:
      'Simply reach out through our Contact page or email contact@mrmiracle.in with your business goals. We review your current digital presence, schedule a discovery conversation, and propose a customized strategy.'
  }
];

export const CONTACT_FAQS: FAQItem[] = [
  {
    question: 'Is there any obligation when submitting a project enquiry?',
    answer:
      'None at all. Your initial enquiry and diagnostic conversation are completely complimentary and designed to help you understand your digital opportunities.'
  },
  {
    question: 'What information should I include in my enquiry?',
    answer:
      'Sharing your website URL (if you have one), your primary products or services, your target audience, and your main growth goals helps us prepare a much more relevant initial assessment.'
  },
  {
    question: 'How quickly will the MR Miracle team respond?',
    answer:
      'Our strategy desk operates Monday through Saturday, 9:30 AM – 6:30 PM IST, and we typically respond to all new business enquiries within one business day.'
  },
  {
    question: 'Do you work with clients outside Tamil Nadu or outside India?',
    answer:
      'Yes. While MR Miracle Digital Marketing Pvt. Ltd. is registered in Tamil Nadu, India, our digital engineering, SEO, social media, and paid advertising workflows are built for seamless remote collaboration with clients anywhere.'
  }
];

export const POST_ENQUIRY_STEPS = [
  {
    step: '01',
    title: 'Enquiry Review & Footprint Audit',
    description:
      'Our strategists review your submission and perform an initial check of your website, search presence, and current digital channels.'
  },
  {
    step: '02',
    title: 'Discovery & Goal Alignment',
    description:
      'We connect with you to understand your business model, target customers, margins, and specific growth bottlenecks.'
  },
  {
    step: '03',
    title: 'Tailored Strategy & Scope Proposal',
    description:
      'You receive a clear, customized roadmap outlining recommended services, deliverables, timelines, and transparent pricing.'
  },
  {
    step: '04',
    title: 'Kickoff & Dedicated Execution',
    description:
      'Once aligned, our engineering, content, and performance teams begin building, launching, and optimizing your campaigns.'
  }
];

export const WHY_US_REASONS: WhyUsReason[] = [
  {
    id: 1,
    title: 'Creative Thinking',
    badge: 'Originality & Spark',
    iconName: 'Sparkles',
    highlight: 'Bold ideas that command attention in overcrowded digital spaces.',
    description:
      'We reject formulaic templates. Every campaign, website, and creative asset is conceived from original strategic insight tailored to your brand personality, allowing you to stand out distinctly against competitors.'
  },
  {
    id: 2,
    title: 'Customized Strategies',
    badge: 'No One-Size-Fits-All',
    iconName: 'Sliders',
    highlight: 'Bespoke roadmaps matched to your unique business model.',
    description:
      'Your business is unique; your digital roadmap should be too. We analyze your industry landscape, margins, audience segments, and competitive moats before recommending any channel or budget allocation.'
  },
  {
    id: 3,
    title: 'Results-Focused Approach',
    badge: 'Measurable Impact',
    iconName: 'TrendingUp',
    highlight: 'Focusing on metrics that impact your bottom line, not vanity numbers.',
    description:
      'We do not celebrate hollow vanity metrics like raw impressions unless they translate into real business impact: qualified leads, customer acquisitions, lower CPA, and enduring brand affinity.'
  },
  {
    id: 4,
    title: 'Complete Digital Solutions',
    badge: 'Integrated Ecosystem',
    iconName: 'Layers',
    highlight: 'Full-spectrum synergy from web engineering to paid media.',
    description:
      'From technical website engineering to search optimization, social engagement, and paid ad funnels, having all disciplines working cohesively eliminates friction and creates compounding synergy.'
  },
  {
    id: 5,
    title: 'Transparent Communication',
    badge: 'Honesty & Clarity',
    iconName: 'MessageSquare',
    highlight: 'Clear reporting, truthful feedback, and accessible updates.',
    description:
      'No marketing jargon or confusing reports. You get direct access, honest assessments of what is working, proactive recommendations for optimization, and clear accountability at every milestone.'
  },
  {
    id: 6,
    title: 'Long-Term Partnership',
    badge: 'Enduring Commitment',
    iconName: 'ShieldCheck',
    highlight: 'Dedicated to your ongoing evolution and sustained market leadership.',
    description:
      'We view ourselves as an extension of your leadership team. As your company evolves and scale demands change, we continuously test, refine, and advance your digital capabilities.'
  }
];

export const DIGITAL_GROWTH_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Analyze',
    description:
      'Deep diagnostic of your current digital footprint, competitor maneuvers, and target audience behavior.',
    detail:
      'We evaluate technical baseline performance, customer search trends, channel gaps, and historic data to identify key leverage points.'
  },
  {
    step: '02',
    title: 'Strategize',
    description:
      'Crafting the blueprint: messaging hierarchy, channel prioritization, and custom conversion paths.',
    detail:
      'We outline the exact media mix, budget pacing, creative angles, and tech stack needed to capture market demand efficiently.'
  },
  {
    step: '03',
    title: 'Execute',
    description:
      'Deploying high-performance websites, creative campaigns, and ad structures with surgical precision.',
    detail:
      'Our engineering and creative teams bring campaigns live with immaculate quality, robust tracking, and pristine brand aesthetics.'
  },
  {
    step: '04',
    title: 'Optimize',
    description:
      'Continuous A/B testing, bid management, search query refinement, and conversion rate enhancement.',
    detail:
      'We analyze daily and weekly conversion telemetry, shedding underperforming creative variations and doubling down on winning assets.'
  },
  {
    step: '05',
    title: 'Grow',
    description:
      'Scaling budgets profitably, expanding into new digital channels, and locking in market authority.',
    detail:
      'With verified unit economics established, we systematically scale reach to capture compound business growth and brand dominance.'
  }
];
