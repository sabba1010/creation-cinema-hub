import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Mail, Phone, MapPin, MessageSquare, HelpCircle, Users, Heart, Calendar, Briefcase, ChevronDown, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});

function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const FAQS = [
    { q: "How can I support One Mustard Seed?", a: "You can support us through one-time or monthly donations on our Support page, or by becoming a corporate sponsor for our film projects." },
    { q: "Is KidsBibleFlix safe for all ages?", a: "Yes! Every piece of content is hand-vetted by our pastoral and educational teams to ensure it is 100% safe, ad-free, and rooted in Scripture." },
    { q: "Can we host a screening of your films?", a: "Absolutely! We offer community and church screening licenses for all our major releases. Contact our Event Support team for details." },
    { q: "Where can I find study guides for the films?", a: "Study guides and curriculum resources are available in our Resources hub. Many are free to download!" },
  ];

  const TEAM = [
    { name: "Dr. Elias Thorne", role: "Executive Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Sarah Jenkins", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
    { name: "Pastor Mark Chen", role: "Spiritual Oversight", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Elena Rodriguez", role: "Head of Kids Content", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-24 bg-forest-deep text-cream overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000" alt="Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-transparent" />
           </div>
           <div className="relative mx-auto max-w-7xl px-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">We're Here for You</span>
              <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight mb-8">
                 Get in <span className="italic text-gold">Touch</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-cream/70 leading-relaxed">
                 Whether you have a question about our films, want to partner with us, or just need prayer, we'd love to hear from you.
              </p>
           </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[400px_1fr] gap-20 items-start">
              {/* Left Side: Info */}
              <div className="space-y-12">
                 <div className="space-y-8">
                    <div className="flex items-start gap-6">
                       <div className="h-12 w-12 rounded-2xl bg-forest-deep text-gold flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5" />
                       </div>
                       <div>
                          <h3 className="font-bold text-forest-deep uppercase tracking-widest text-xs mb-1">Email Us</h3>
                          <p className="text-forest-deep/60">hello@onemustardseed.com</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="h-12 w-12 rounded-2xl bg-forest-deep text-gold flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5" />
                       </div>
                       <div>
                          <h3 className="font-bold text-forest-deep uppercase tracking-widest text-xs mb-1">Call Us</h3>
                          <p className="text-forest-deep/60">+1 (800) 555-SEED</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="h-12 w-12 rounded-2xl bg-forest-deep text-gold flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5" />
                       </div>
                       <div>
                          <h3 className="font-bold text-forest-deep uppercase tracking-widest text-xs mb-1">Visit Us</h3>
                          <p className="text-forest-deep/60">Luminara Plaza, OMS Square<br />San Francisco, CA 94103</p>
                       </div>
                    </div>
                 </div>

                 <div className="p-8 rounded-3xl bg-forest-deep/5 border border-forest-deep/10">
                    <h4 className="font-bold text-forest-deep mb-4 flex items-center gap-2">
                       <MessageSquare className="h-4 w-4 text-gold" />
                       Response Time
                    </h4>
                    <p className="text-sm text-forest-deep/60 leading-relaxed">
                       Our team typically responds within 24-48 business hours. For urgent media inquiries, please use the specialized form.
                    </p>
                 </div>
              </div>

              {/* Right Side: Form */}
              <div className="relative p-10 rounded-[3rem] bg-white border border-forest-deep/5 shadow-2xl">
                 {formSubmitted && (
                   <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-12 animate-in fade-in zoom-in duration-500">
                      <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                         <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-3xl font-display font-medium text-forest-deep mb-4">Message Sent!</h3>
                      <p className="text-forest-deep/60">Thank you for reaching out. We've received your inquiry and will be in touch soon.</p>
                      <button onClick={() => setFormSubmitted(false)} className="mt-8 text-xs font-bold uppercase tracking-widest text-gold hover:text-forest-deep transition">Send another message</button>
                   </div>
                 )}

                 <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40 ml-1">Your Name</label>
                          <input required type="text" className="w-full bg-[#FAF7EE] border border-forest-deep/5 rounded-2xl px-6 py-4 text-forest-deep focus:outline-none focus:border-gold/50 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40 ml-1">Email Address</label>
                          <input required type="email" className="w-full bg-[#FAF7EE] border border-forest-deep/5 rounded-2xl px-6 py-4 text-forest-deep focus:outline-none focus:border-gold/50 transition-all" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40 ml-1">Inquiry Type</label>
                       <select className="w-full bg-[#FAF7EE] border border-forest-deep/5 rounded-2xl px-6 py-4 text-forest-deep focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer">
                          <option>General Inquiry</option>
                          <option>Donor Inquiry</option>
                          <option>Event Support</option>
                          <option>Partnership Inquiry</option>
                          <option>Media/Press</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40 ml-1">Your Message</label>
                       <textarea required rows={5} className="w-full bg-[#FAF7EE] border border-forest-deep/5 rounded-2xl px-6 py-4 text-forest-deep focus:outline-none focus:border-gold/50 transition-all resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full py-5 rounded-2xl bg-forest-deep text-gold font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                       Send Message <Send className="h-4 w-4" />
                    </button>
                 </form>
              </div>
           </div>
        </section>

        {/* Inquiry Hubs */}
        <section className="py-24 bg-forest-deep/5">
           <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-16">
                 <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight mb-4">Specific <span className="italic text-gold font-medium">Inquiries</span></h2>
                 <p className="text-forest-deep/60">Connect directly with our specialized teams.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-8">
                 {[
                   { title: "Donor Support", icon: Heart, desc: "Inquiries regarding donations, receipts, and legacy giving." },
                   { title: "Event Support", icon: Calendar, desc: "Planning a screening or live event at your church or school?" },
                   { title: "Partnerships", icon: Briefcase, desc: "Discuss co-branding, sponsorship, or distribution opportunities." },
                 ].map((hub, i) => (
                   <div key={i} className="p-10 rounded-[3rem] bg-white border border-forest-deep/5 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                      <div className="h-16 w-16 rounded-2xl bg-forest-deep/5 text-forest-deep flex items-center justify-center mb-6 group-hover:bg-forest-deep group-hover:text-gold transition-colors">
                         <hub.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-forest-deep mb-3">{hub.title}</h3>
                      <p className="text-sm text-forest-deep/60 leading-relaxed mb-6">{hub.desc}</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold group-hover:translate-x-2 transition-transform inline-block">Learn More &rarr;</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Team Profiles */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-end justify-between mb-16">
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">Our Leadership</span>
                    <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight">Meet the <span className="italic text-gold font-medium">Team</span></h2>
                 </div>
                 <button className="text-sm font-bold text-forest-deep/40 hover:text-gold flex items-center gap-2 transition-colors">
                    All Staff <Users className="h-4 w-4" />
                 </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {TEAM.map((member, i) => (
                   <div key={i} className="group">
                      <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-6 shadow-card">
                         <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-all" />
                      </div>
                      <h3 className="text-xl font-bold text-forest-deep">{member.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mt-1">{member.role}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white border-t border-forest-deep/5">
           <div className="mx-auto max-w-3xl px-6">
              <div className="text-center mb-16">
                 <div className="h-16 w-16 rounded-full bg-forest-deep/5 text-forest-deep flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="h-8 w-8" />
                 </div>
                 <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight mb-4">Frequently Asked <span className="italic text-gold font-medium">Questions</span></h2>
              </div>
              <div className="space-y-4">
                 {FAQS.map((faq, i) => (
                   <div key={i} className="rounded-3xl border border-forest-deep/5 overflow-hidden transition-all">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#FAF7EE] transition-colors"
                      >
                         <span className="font-bold text-forest-deep">{faq.q}</span>
                         <ChevronDown className={`h-5 w-5 text-gold transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`transition-all duration-500 ease-in-out ${activeFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                         <div className="px-8 pb-8 text-forest-deep/60 text-sm leading-relaxed">
                            {faq.a}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
