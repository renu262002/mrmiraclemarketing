import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mail,
  MapPin,
  Clock,
  Globe,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Phone,
  Building,
  User,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Compass
} from 'lucide-react';
import { ContactCommScene } from '../components/3d/ContactCommScene';
import { FaqAccordion } from '../components/FaqAccordion';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  POST_ENQUIRY_STEPS,
  CONTACT_FAQS
} from '../data/companyData';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get('service') || '';

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: prefilledService || 'Website Development',
    projectDetails: '',
    budgetRange: 'Standard Growth Project'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please provide brief details about your project or business goals';
    } else if (formData.projectDetails.trim().length < 15) {
      newErrors.projectDetails = 'Please provide at least 15 characters describing your requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/mr.miraclemktg@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Website Enquiry | MR Miracle Digital Marketing',
          _template: 'table',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          service: formData.service,
          message: formData.projectDetails,
          submittedAt: new Date().toISOString()
        })
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Submission was not accepted');
      }
      setSubmittedData({ ...formData });
      setSubmitted(true);
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B5003A', '#D41450', '#D99A24', '#FFD36A']
        });
      } catch {
        // Confetti optional
      }
    } catch {
      setSubmitError('We could not submit your enquiry. Please try again or email mr.miraclemktg@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitError('');
    setSubmitted(false);
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      service: 'Website Development',
      projectDetails: '',
      budgetRange: 'Standard Growth Project'
    });
    setErrors({});
  };

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Subtle Golden Light Trails */}
      <motion.div
        animate={{ x: ['-15%', '115%'] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'linear' }}
        className="pointer-events-none fixed top-28 left-0 w-72 h-px bg-gradient-to-r from-transparent via-[#D99A24]/60 to-transparent z-0"
        aria-hidden="true"
      />

      {/* 1. WELCOMING INTRODUCTION */}
      <section className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
            </motion.span>
            <span>Connect With MR Miracle</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-tight text-balance">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
              Remarkable.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4A3B41] font-normal max-w-2xl mx-auto leading-relaxed">
            Whether you are launching a new brand, rebuilding your website, or scaling customer acquisition across search and social channels, our strategists are ready to help.
          </p>
        </motion.div>
      </section>

      {/* 2. MAIN SPLIT SECTION: 3D COMM SCENE + CONTACT DETAILS + ENQUIRY FORM */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3D Transmitter & Verified Company Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="rounded-3xl bg-gradient-to-br from-[#2B0714] to-[#16040A] p-4 overflow-hidden border border-[#D99A24]/45 relative shadow-lg">
              <div className="text-xs font-semibold text-[#FFD36A] px-4 pt-2 flex items-center justify-between">
                <span>Direct Signal Line</span>
                <span className="text-[#FFD36A]">Active</span>
              </div>
              <ContactCommScene />
              <div className="text-center text-xs text-stone-300 pb-2">
                Direct Brand Communication &bull; {COMPANY_INFO.location}
              </div>
            </div>

            {/* Verified Company Information Box */}
            <div className="p-8 rounded-3xl glass-panel space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B5003A] font-semibold">
                <Building className="w-4 h-4 text-[#D99A24]" />
                <span>Official Entity Information</span>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-[#1A1115]">
                  {COMPANY_INFO.name}
                </h2>
                <div className="text-xs text-[#6E5B62] mt-0.5">
                  Legal: {COMPANY_INFO.legalName}
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#4A3B41]">
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  >
                    <MapPin className="w-5 h-5 text-[#B5003A] shrink-0 mt-0.5" />
                  </motion.div>
                  <div>
                    <div className="font-medium text-[#1A1115]">Registered Jurisdiction</div>
                    <div className="text-[#6E5B62] text-xs">
                      {COMPANY_INFO.location} &bull; PIN Code: {COMPANY_INFO.pincode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                  >
                    <Mail className="w-5 h-5 text-[#D41450] shrink-0 mt-0.5" />
                  </motion.div>
                  <div>
                    <div className="font-medium text-[#1A1115]">Direct Inquiries</div>
                    <a
                      href={`mailto:${'mr.miraclemktg@gmail.com'}`}
                      className="text-[#B5003A] hover:text-[#D41450] font-medium text-xs transition-colors"
                    >
                      {'mr.miraclemktg@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#B87B0E] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1A1115]">Official Web Portal</div>
                    <a
                      href={COMPANY_INFO.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B5003A] hover:text-[#D41450] font-medium text-xs flex items-center gap-1 transition-colors"
                    >
                      mrmiracle.in
                      <ArrowUpRight className="w-3 h-3 text-[#6E5B62]" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#6E5B62] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1A1115]">Strategy Desk Hours</div>
                    <div className="text-[#6E5B62] text-xs">{COMPANY_INFO.hours}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/35 text-xs text-[#1A1115] leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B5003A] shrink-0 mt-0.5" />
                <span>
                  All client consultations and strategic assessments are handled with strict corporate confidentiality.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow relative">
              {submitted ? (
                <div className="space-y-6 text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-[#FAF3E6] border-2 border-[#B5003A] flex items-center justify-center mx-auto text-[#B5003A] shadow-[0_8px_24px_rgba(181,0,58,0.2)]">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#B5003A] uppercase tracking-widest">
                      Enquiry Submitted
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-[#1A1115]">
                      Thank You, {submittedData?.fullName}!
                    </h2>
                    <p className="text-[#4A3B41] text-base max-w-md mx-auto">
                      Your consultation details for{' '}
                      <span className="text-[#B5003A] font-semibold">{submittedData?.service}</span> have been submitted. Our team will review your enquiry.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/35 text-left text-xs space-y-2 max-w-md mx-auto text-[#1A1115]">
                    <div>
                      <span className="text-[#6E5B62]">Company:</span> {submittedData?.companyName}
                    </div>
                    <div>
                      <span className="text-[#6E5B62]">Email:</span> {submittedData?.email}
                    </div>
                    <div>
                      <span className="text-[#6E5B62]">Phone:</span> {submittedData?.phone}
                    </div>
                    <div>
                      <span className="text-[#6E5B62]">Project Focus:</span> {submittedData?.projectDetails}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={`mailto:${'mr.miraclemktg@gmail.com'}?subject=${encodeURIComponent(
                        `Project Inquiry from ${submittedData?.fullName} (${submittedData?.companyName})`
                      )}&body=${encodeURIComponent(
                        `Hello MR Miracle Team,\n\nName: ${submittedData?.fullName}\nCompany: ${submittedData?.companyName}\nEmail: ${submittedData?.email}\nPhone: ${submittedData?.phone}\nService: ${submittedData?.service}\n\nProject Details:\n${submittedData?.projectDetails}`
                      )}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] shadow-[0_6px_20px_rgba(181,0,58,0.28)]"
                    >
                      <span>Email Us Directly</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-[#B5003A] uppercase tracking-wider block mb-1">
                      Start Your Project
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1115]">
                      Tell Us About Your Goals
                    </h2>
                    <p className="text-[#4A3B41] text-sm mt-1">
                      Complete the details below and our team will prepare a tailored assessment of your digital footprint.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#B5003A]" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={e => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-sm text-[#1A1115] placeholder-[#8C7A80] focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-[#D41450] focus:border-[#B5003A]'
                            : 'border-[#D99A24]/40 focus:border-[#B5003A]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-[#B5003A] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-[#D41450]" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#B5003A]" />
                        Business Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-sm text-[#1A1115] placeholder-[#8C7A80] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-[#D41450] focus:border-[#B5003A]'
                            : 'border-[#D99A24]/40 focus:border-[#B5003A]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#B5003A] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-[#D41450]" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#B5003A]" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-sm text-[#1A1115] placeholder-[#8C7A80] focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-[#D41450] focus:border-[#B5003A]'
                            : 'border-[#D99A24]/40 focus:border-[#B5003A]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#B5003A] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-[#D41450]" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#B5003A]" />
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={e => {
                          setFormData({ ...formData, companyName: e.target.value });
                          if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                        }}
                        placeholder="Acme Brands Pvt. Ltd."
                        className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-sm text-[#1A1115] placeholder-[#8C7A80] focus:outline-none transition-colors ${
                          errors.companyName
                            ? 'border-[#D41450] focus:border-[#B5003A]'
                            : 'border-[#D99A24]/40 focus:border-[#B5003A]'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-[#B5003A] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-[#D41450]" />
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#D41450]" />
                      Primary Service Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#D99A24]/40 text-sm text-[#1A1115] focus:outline-none focus:border-[#B5003A] transition-colors"
                    >
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.name} className="bg-[#FFFDF9] text-[#1A1115]">
                          {s.name} ({s.category})
                        </option>
                      ))}
                      <option value="Complete Omnichannel Growth" className="bg-[#FFFDF9] text-[#1A1115]">
                        Complete Omnichannel Growth (All Services)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1115] mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#B5003A]" />
                      Project Details & Current Challenges *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.projectDetails}
                      onChange={e => {
                        setFormData({ ...formData, projectDetails: e.target.value });
                        if (errors.projectDetails) setErrors({ ...errors, projectDetails: undefined });
                      }}
                      placeholder="Tell us about your brand, current website/marketing challenges, target audience, and primary growth objective..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-sm text-[#1A1115] placeholder-[#8C7A80] focus:outline-none transition-colors resize-none ${
                        errors.projectDetails
                          ? 'border-[#D41450] focus:border-[#B5003A]'
                          : 'border-[#D99A24]/40 focus:border-[#B5003A]'
                      }`}
                    />
                    {errors.projectDetails && (
                      <p className="mt-1 text-xs text-[#B5003A] font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-[#D41450]" />
                        {errors.projectDetails}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p role="alert" className="text-sm text-[#B5003A]">{submitError}</p>
                  )}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_8px_24px_rgba(181,0,58,0.28)] hover:shadow-[0_12px_30px_rgba(212,20,80,0.38)] transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-[11px] text-[#6E5B62]">
                    Your enquiry will be submitted directly to {'mr.miraclemktg@gmail.com'}.
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT HAPPENS AFTER YOU SUBMIT AN ENQUIRY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/70 to-transparent mt-12">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-[#D99A24]" />
              Clear Next Steps
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              What Happens After You Submit an Enquiry
            </h2>
            <p className="text-[#4A3B41] text-base">
              We value your time. Here is our straightforward four-step process from your initial message to launching your digital strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POST_ENQUIRY_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 rounded-3xl glass-panel space-y-4 hover:border-[#B5003A]/45 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B5003A] to-[#D41450] text-white font-heading font-bold text-sm flex items-center justify-center tabular-nums">
                  {item.step}
                </div>
                <h3 className="text-lg font-heading font-bold text-[#1A1115]">{item.title}</h3>
                <p className="text-[#4A3B41] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS ABOUT GETTING STARTED */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D99A24]" />
              Getting Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1115] text-balance">
              Frequently Asked Questions About Starting a Project
            </h2>
          </div>

          <FaqAccordion items={CONTACT_FAQS} />
        </div>
      </section>
    </div>
  );
};
