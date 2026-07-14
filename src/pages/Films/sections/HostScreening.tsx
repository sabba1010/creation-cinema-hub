import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, ShieldCheck, Megaphone, Link as LinkIcon, Heart, Send, Star, Globe } from "lucide-react";
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

export function HostMovieNight() {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <feature.icon className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-xl font-bold text-cream mb-4">{feature.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PremierePartner() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const church = formData.get("church");
    const newsletter = formData.get("newsletter") ? "Yes" : "No";

    await new Promise(resolve => setTimeout(resolve, 800));
    
    const subject = encodeURIComponent(`New Premiere Partner Registration: ${church}`);
    const body = encodeURIComponent(`
Name: ${name}
Email: ${email}
Phone: ${phone}
Church: ${church}

Newsletter Opt-In: ${newsletter}
    `);
    
    window.location.href = `mailto:leo@onemustardseed.com?subject=${subject}&body=${body}`;
    
    Swal.fire({
      title: "Success!",
      text: "Thank you for registering your interest! Our team will contact you soon.",
      icon: "success",
      confirmButtonColor: "#cba052"
    });
    
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section className="pb-24 pt-4 bg-[#0a0f08] relative">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Registration Form Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gold/20">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070" alt="Cinematic Theater" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050704] via-[#050704]/95 to-forest-deep/90" />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10 p-8 md:p-12 lg:p-16 items-center">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Star className="w-3.5 h-3.5 fill-current" /> Premiere Partner Program
                </div>
                <h3 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight">
                  Become a <span className="text-gold italic font-light">Premiere Partner</span>
                </h3>
              </div>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-glow">
                    <Heart className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-cream font-bold text-xl mb-2 tracking-wide">Our Mission Is Simple</h4>
                    <p className="text-cream/70 leading-relaxed text-sm">
                      We create family-friendly, faith-filled movies that help lead children and families closer to Christ. Every film is rated G and designed to be fun, meaningful, and safe for all ages.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-glow">
                    <Globe className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-cream font-bold text-xl mb-2 tracking-wide">Help Us Bring These Movies to More Communities</h4>
                    <p className="text-cream/70 leading-relaxed text-sm">
                      We are building a worldwide network of churches that will serve as Premiere Partners for each new movie we release. Premiere Partners host an official screening during the movie’s premiere month, helping families enjoy wholesome entertainment while creating opportunities for fellowship, outreach, and ministry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-glow">
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-cream font-bold text-xl mb-2 tracking-wide">Could Your Church Be a Premiere Partner?</h4>
                    <p className="text-cream/70 leading-relaxed text-sm">
                      We are looking for churches that are excited about hosting family events and sharing positive, Christ-centered content with their communities.
                    </p>
                    <p className="text-cream/70 leading-relaxed text-sm mt-3">
                      Complete the form to register your interest, and our team will send you more information about upcoming films, screening opportunities, and how the Premiere Partner program works.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-forest-deep/40 rounded-full blur-3xl pointer-events-none" />
                
                <h4 className="text-3xl font-bold text-cream mb-8 font-display relative z-10">Register Interest</h4>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-cream/80 text-xs font-semibold uppercase tracking-wider">Your Name</Label>
                    <Input id="name" name="name" required placeholder="John Doe" className="bg-black/30 border-white/10 text-cream focus-visible:ring-gold focus-visible:border-gold h-14 rounded-xl transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cream/80 text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-black/30 border-white/10 text-cream focus-visible:ring-gold focus-visible:border-gold h-14 rounded-xl transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cream/80 text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className="bg-black/30 border-white/10 text-cream focus-visible:ring-gold focus-visible:border-gold h-14 rounded-xl transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="church" className="text-cream/80 text-xs font-semibold uppercase tracking-wider">Name of Church</Label>
                    <Input id="church" name="church" required placeholder="First Community Church" className="bg-black/30 border-white/10 text-cream focus-visible:ring-gold focus-visible:border-gold h-14 rounded-xl transition-all" />
                  </div>

                  <div className="flex items-start space-x-4 pt-2 p-5 bg-black/20 rounded-xl border border-white/5 mt-6">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      name="newsletter"
                      className="mt-0.5 h-5 w-5 rounded border-white/20 bg-black/40 text-gold focus:ring-gold focus:ring-offset-forest-deep transition-all cursor-pointer"
                    />
                    <Label htmlFor="newsletter" className="text-sm font-medium leading-relaxed text-cream/90 cursor-pointer select-none">
                      Sign me up for news and updates about upcoming movie releases!
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-gold text-forest-deep hover:scale-[1.02] transition-transform rounded-xl px-8 py-6 h-auto text-base font-bold shadow-glow border-0 mt-4"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Become a Partner"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
