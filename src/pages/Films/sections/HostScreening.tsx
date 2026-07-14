import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, ShieldCheck, Megaphone, Link as LinkIcon, Heart, Send } from "lucide-react";
import Swal from "sweetalert2";

const features = [
  {
    title: "Perfect for Churches, Schools, and Clubs",
    description: "Our films are especially well suited for churches, schools, Pathfinder clubs, and Adventurer clubs looking for a fun and meaningful way to bring people together and raise money. Invite families and community members, sell tickets and refreshments, and turn your screening into an exciting event that supports your organization.",
    icon: Users,
  },
  {
    title: "Safe, Fun, and Faith-Filled",
    description: "Every film is rated G and created to be family-friendly from beginning to end. There are no frightening villains or inappropriate content, just fun adventures, positive messages, and meaningful spiritual themes that kids and adults can enjoy together.",
    icon: ShieldCheck,
  },
  {
    title: "We Help You Promote It",
    description: "Once your screening is registered, our team will provide promotional resources such as posters, trailers, social media graphics, and helpful information to make planning and promoting your event easier.",
    icon: Megaphone,
  },
  {
    title: "Simple Digital Delivery",
    description: "Your movie will be delivered through a private electronic link. Please make sure your venue has a reliable, high-speed internet connection suitable for streaming.",
    icon: LinkIcon,
  },
  {
    title: "More Than a Movie",
    description: "Create a memorable experience that brings people together, shares a meaningful message, and raises funds for your church, school, or club.",
    icon: Heart,
  }
];

export function HostScreening() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    Swal.fire({
      title: "Success!",
      text: "Your screening registration has been submitted. Our team will contact you soon!",
      icon: "success",
      confirmButtonColor: "#cba052"
    });
    
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-[#0a0f08] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Main Info Section */}
        <div className="max-w-3xl mb-20">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-6">
            Host a Movie Night <span className="text-gold italic font-light">That Makes an Impact</span>
          </h2>
          <div className="space-y-4 text-cream/70 text-lg leading-relaxed">
            <p>
              Bring your church, school, Pathfinder club, Adventurer club, or community together with a fun, family-friendly film created for fellowship, outreach, and meaningful entertainment. Feature one of our movies to host a fundraiser, social event, family movie night, or community gathering.
            </p>
            <p>
              After paying the screening license fee, your group keeps <strong className="text-gold">100% of the proceeds</strong> from ticket sales, food, concessions, and other fundraising activities.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <feature.icon className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-xl font-bold text-cream mb-4">{feature.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Registration Form Section */}
        <div className="bg-gradient-to-br from-forest-deep to-[#050704] rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-5 gap-12 relative z-10">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-cream">
                Register Your <span className="text-gold italic font-light">Screening</span>
              </h3>
              <p className="text-cream/70 leading-relaxed">
                Fill out the form to register your screening event. Our team will review your request and get back to you with the screening license details, promotional resources, and your private digital delivery link.
              </p>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-cream/90">Organization Name</Label>
                    <Input id="orgName" required placeholder="Church, School, or Club" className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-cream/90">Contact Person</Label>
                    <Input id="contactName" required placeholder="John Doe" className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cream/90">Email Address</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cream/90">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="text-cream/90">Planned Event Date</Label>
                    <Input id="eventDate" type="date" required className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold block w-full [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedAttendees" className="text-cream/90">Est. Attendees</Label>
                    <Input id="estimatedAttendees" type="number" placeholder="50" className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-cream/90">Additional Details</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us a bit about your event..."
                    className="bg-black/40 border-white/10 text-cream focus-visible:ring-gold min-h-[100px]" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto mt-2 bg-gold text-forest-deep hover:bg-gold/90 transition-transform rounded-xl px-8 py-6 h-auto text-base font-bold"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
