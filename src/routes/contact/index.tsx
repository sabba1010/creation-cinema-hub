import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Mail, MessageCircle, MapPin, Phone, HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});

const API = "https://movie-backend-drab.vercel.app";

const CATEGORIES = [
  "General questions",
  "Donor inquiries",
  "Event/ticket support",
  "Shop/order questions",
  "School/church questions",
  "Media inquiries",
  "Partnership inquiries"
];

const FAQS = [
  {
    question: "Do you offer physical copies of your resources?",
    answer: "Currently, all our resources are digital downloads to ensure they remain free and instantly accessible worldwide. You are welcome to print them at home or locally!"
  },
  {
    question: "Is there a limit to how many resources I can download?",
    answer: "No! All our downloadable guides, devotions, and curricula are completely free. Download as many as you need to equip your family or ministry."
  },
  {
    question: "How can I support the One Mustard Seed ministry?",
    answer: "We are deeply grateful for your support. You can visit our Donations page to set up a one-time or recurring gift that helps us continue creating high-quality, free Christian media."
  },
  {
    question: "Are your films available outside the US?",
    answer: "Yes, our digital screening licenses and online streaming options are available globally."
  },
  {
    question: "Can we show your content at our church?",
    answer: "Yes! We offer specific licensing options for church screenings and events. Please select 'Event/ticket support' or 'School/church questions' in the contact form for more details."
  }
];

const TEAM = [
  {
    name: "Sarah Jenkins",
    role: "Executive Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    email: "sarah@onemustardseed.com"
  },
  {
    name: "David Chen",
    role: "Ministry Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    email: "david@onemustardseed.com"
  },
  {
    name: "Emily Rodriguez",
    role: "Media & Partnerships",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    email: "emily@onemustardseed.com"
  }
];

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.category || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all required fields before submitting.',
        confirmButtonColor: '#1a2f24'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for reaching out. We will get back to you shortly.',
          confirmButtonColor: '#D4AF37'
        });
        setFormData({ firstName: "", lastName: "", email: "", category: "", message: "" });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message || 'Something went wrong!',
          confirmButtonColor: '#1a2f24'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your connection and try again.',
        confirmButtonColor: '#1a2f24'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-forest-deep text-cream py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528312635006-8ea0bc49ecaa?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest-deep/90"></div>
          <div className="relative mx-auto max-w-7xl px-6 text-center space-y-6">
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              Get in <span className="italic text-gold">Touch</span>
            </h1>
            <p className="max-w-2xl mx-auto text-cream/80 text-lg leading-relaxed">
              Have a question or want to partner with us? Check our FAQ first—if you still need help, our team is ready to connect.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-16 items-start">

            {/* Left Column: FAQ & Team */}
            <div className="lg:col-span-6 space-y-8">

              {/* FAQ Section */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-display font-bold text-forest-deep flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-gold" /> Frequently Asked Questions
                  </h2>
                  <p className="text-forest-deep/60">Find quick answers to common questions about our ministry and resources.</p>
                </div>

                <div className="w-full space-y-4">
                  {FAQS.map((faq, idx) => (
                    <details key={idx} className="group bg-white rounded-2xl border-none shadow-sm px-2 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between px-4 py-5 font-bold text-forest-deep hover:text-primary transition-colors">
                        {faq.question}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-5 text-forest-deep/70 leading-relaxed text-sm">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Team Section */}
              <div className="space-y-6 pt-4 border-t border-cream/20">
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-forest-deep">Meet the Team</h3>
                  <p className="text-forest-deep/60 text-sm">Dedicated to equipping families with faithful media.</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {TEAM.map((member, i) => (
                    <div key={i} className="group bg-white rounded-3xl p-4 shadow-sm border border-cream/50 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-[#FAF7EE]">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-forest-deep text-sm">{member.name}</h4>
                      <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-3">{member.role}</p>
                      <a href={`mailto:${member.email}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-forest/5 text-forest hover:bg-forest hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6 relative">
              <div className="sticky top-24 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-cream/20">
                <div className="space-y-2 mb-8 text-center">
                  <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-forest">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-forest-deep">Send a Message</h3>
                  <p className="text-sm text-forest-deep/60">Select a category below to ensure your message reaches the right team member.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-forest-deep/60">First Name *</Label>
                      <Input
                        required
                        placeholder="John"
                        className="h-12 rounded-xl bg-forest/5 border-transparent focus:bg-white transition-colors"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Last Name *</Label>
                      <Input
                        required
                        placeholder="Doe"
                        className="h-12 rounded-xl bg-forest/5 border-transparent focus:bg-white transition-colors"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Email Address *</Label>
                    <Input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="h-12 rounded-xl bg-forest/5 border-transparent focus:bg-white transition-colors"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Inquiry Category *</Label>
                    <Select required value={formData.category} onValueChange={val => setFormData({ ...formData, category: val })}>
                      <SelectTrigger className="h-12 rounded-xl bg-forest/5 border-transparent font-medium">
                        <SelectValue placeholder="Select a topic..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Your Message *</Label>
                    <textarea
                      required
                      placeholder="How can we help you today?"
                      className="w-full min-h-[120px] p-4 rounded-xl bg-forest/5 border border-transparent focus:border-forest/20 focus:bg-white focus:outline-none transition-colors resize-y text-sm"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gold hover:bg-gold/90 text-forest-deep font-bold text-sm tracking-widest uppercase rounded-xl shadow-lg mt-4"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
