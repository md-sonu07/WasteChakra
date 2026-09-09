import { useState } from 'react';
import { Icon } from '../components/AppIcons';

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const contactInfo = [
    { icon: 'call', label: 'Phone', value: '+1 (800) CHAKRA-ECO', detail: '24/7 dispatch line' },
    { icon: 'mail', label: 'Email', value: 'support@wastechakra.org', detail: 'Response within 2 hours' },
    { icon: 'location_on', label: 'Address', value: '104 Greenloop Way, Eco District, Metro 94016', detail: 'Walk-ins welcome' },
    { icon: 'schedule', label: 'Hours', value: '24/7 On-Demand Dispatch', detail: 'Office: Mon–Fri 8am–6pm' },
  ];

  const faqs = [
    {
      question: 'What services does WasteChakra offer?',
      answer: 'We provide residential composting, commercial bulk collection, e-waste and hazardous disposal, zero-landfill audits, resource recovery, RDF conditioning, community cleanup events, and AI-powered waste analytics. Each service is backed by digital tracking and ESG reporting.',
    },
    {
      question: 'How is pricing structured?',
      answer: 'Pricing is based on waste volume, service frequency, and material type. Residential plans start at $29/month. Commercial and industrial clients receive custom quotes based on waste-stream audits. All pricing is transparent with no hidden fees.',
    },
    {
      question: 'How do you handle hazardous and e-waste?',
      answer: 'All hazardous and electronic waste is processed through R2v3 certified downstream partners. We provide chain-of-custody documentation and certificates of destruction for every batch. Data-bearing devices undergo DoD-standard sanitization before material recovery.',
    },
    {
      question: 'How do I report illegal dumping or bulk waste?',
      answer: 'Use the Report Waste feature in the app or call our 24/7 dispatch line. Include the location, estimated volume, and material type if possible. Our eco-crew typically responds within 4–6 hours for priority reports.',
    },
    {
      question: 'Can I get a certificate for my waste diversion?',
      answer: 'Yes. Every pickup and processing batch generates a digital waste passport with full material tracking. Businesses receive ESG-compliant diversion certificates suitable for sustainability reports, TRUE certification, and regulatory filings.',
    },
  ];

  return (
    <div className="grow w-full max-w-container-max mx-auto px-gutter py-16 md:py-space-3xl">
      <header className="mb-20 md:mb-space-4xl">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
          <span>✳</span>
          <span>Get In Touch</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary font-bold tracking-tight max-w-4xl leading-tight">
          Let us build your circular waste <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-secondary">solution</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
          Whether you are a homeowner, business operator, or city planner — our team is ready to design a waste program that fits your exact needs.
        </p>
      </header>

      <section className="mb-20 md:mb-space-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {contactInfo.map((info) => (
            <div key={info.label} className="bg-surface-container-lowest p-space-lg rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                <Icon name={info.icon} className="text-[26px]" />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider mb-space-xxs">{info.label}</span>
              <span className="font-title-md text-title-md text-primary font-bold mb-space-xxs break-words">{info.value}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{info.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20 md:mb-space-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-2xl">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Send a Message</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-space-md">
              We would love to hear from you.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl max-w-lg">
              Fill out the form and a member of our team will reach out within one business day. For urgent matters, call our 24/7 dispatch line.
            </p>
            <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 p-space-xl">
              <form className="flex flex-col gap-space-md" action="contact" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" name="name" placeholder="e.g. Sarah Lindqvist" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Email Address</label>
                  <input type="email" name="email" placeholder="e.g. sarah@example.com" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Subject</label>
                  <div className="relative">
                    <select name="subject" className="appearance-none w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300 cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Residential Service</option>
                      <option>Commercial Partnership</option>
                      <option>E-Waste &amp; Hazardous</option>
                      <option>Community Event</option>
                      <option>Waste Report Support</option>
                    </select>
                    <Icon name="expand_more" className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Message</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your waste management needs..." className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300 resize-none"></textarea>
                </div>
                <button type="submit" className="group mt-2 cursor-pointer inline-flex items-center justify-center gap-3 w-full px-6 md:px-8 py-3 md:py-4 rounded-xl bg-secondary-container text-primary font-bold hover:bg-[#bbfb64] hover:-translate-y-1 hover:shadow-[0_8px_24px_-6px_rgba(171,248,84,0.4)] transition-all duration-300 border border-secondary-container">
                  <span className="text-sm md:text-base tracking-wide">Send Message</span>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name="north_east" className="text-[16px] md:text-[18px] group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Frequently Asked</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-space-xl">
              Common Questions
            </h2>
            <div className="flex flex-col gap-space-sm">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl border border-surface-container-high/70 overflow-hidden transition-all duration-300 hover:border-secondary/50">
                  <button
                    className="w-full flex items-center justify-between gap-space-sm p-space-md text-left cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-title-md text-title-md text-primary font-bold">{faq.question}</span>
                    <Icon name="expand_more" className={`text-[20px] text-on-surface-variant shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-space-md pb-space-md font-body-md text-body-md text-on-surface-variant border-t border-surface-container-high/50 pt-space-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 md:mb-space-3xl">
        <div className="bg-forest rounded-[28px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
              <span>✳</span>
              <span>Ready to Start?</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
              Join 120+ cities already running circular waste systems.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
              From first pickup to full ESG compliance — WasteChakra handles the entire journey so you can focus on what matters.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
              <a href="tel:1800242572" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg">
                <Icon name="call" className="text-[18px]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
