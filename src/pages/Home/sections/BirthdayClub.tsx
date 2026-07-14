import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Calendar, Send } from "lucide-react";
import Swal from "sweetalert2";
import image7 from "@/assets/logo2/image7.png";

export function BirthdayClub() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const parentName = formData.get("parentName");
    const parentEmail = formData.get("parentEmail");
    const childName = formData.get("childName");
    const childDob = formData.get("childDob");
    const instructions = formData.get("instructions");

    // Simulate submission (e.g. to backend or formspree)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Constructing a mailto link as a fallback if no backend is present,
    // though typically this would be handled via an API route.
    const subject = encodeURIComponent(`New Birthday Club Signup: ${childName}`);
    const body = encodeURIComponent(`
Parent's Name: ${parentName}
Parent's Email: ${parentEmail}
Child's Name: ${childName}
Child's Date of Birth: ${childDob}

Special Instructions/Pronunciation:
${instructions}
    `);
    
    window.location.href = `mailto:angelisse@onemustardseed.com?subject=${subject}&body=${body}`;

    Swal.fire({
      title: "Success!",
      text: "You've successfully started the sign-up process for Rich's Birthday Club!",
      icon: "success",
      confirmButtonColor: "#cba052"
    });
    
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section id="birthday-club" className="relative overflow-hidden bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-elevated border border-cream/30">
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-80 lg:h-auto bg-forest-deep">
              <img 
                src={image7} 
                alt="Rich's Birthday Club" 
                className="absolute inset-0 h-full w-full object-cover object-center lg:object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content & Form Side */}
            <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="inline-flex items-center gap-2 rounded-full bg-forest-deep/10 px-4 py-2 text-sm font-semibold text-forest-deep mb-6 w-fit">
                <Gift className="h-4 w-4" />
                Join the Club
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-deep tracking-tight mb-4">
                Rich's <span className="text-gold italic font-light">Birthday Club</span>
              </h2>
              
              <p className="text-forest-deep/75 text-lg mb-8 max-w-xl leading-relaxed">
                Join Rich's Birthday Club and sign up your child to receive a special birthday video greeting from Rich each year on their big day!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="parentName" className="text-forest-deep font-semibold">Parent's Name</Label>
                    <Input id="parentName" name="parentName" required placeholder="John Doe" className="bg-cream/50 border-forest-deep/20 focus-visible:ring-gold transition-shadow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail" className="text-forest-deep font-semibold">Parent's Email</Label>
                    <Input id="parentEmail" name="parentEmail" type="email" required placeholder="john@example.com" className="bg-cream/50 border-forest-deep/20 focus-visible:ring-gold transition-shadow" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="childName" className="text-forest-deep font-semibold">Child's Name</Label>
                    <Input id="childName" name="childName" required placeholder="Jane" className="bg-cream/50 border-forest-deep/20 focus-visible:ring-gold transition-shadow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childDob" className="text-forest-deep font-semibold flex justify-between items-baseline">
                      <span>Date of Birth</span>
                      <span className="text-[10px] uppercase tracking-wider text-forest-deep/50">Incl. Year</span>
                    </Label>
                    <div className="relative">
                      <Input id="childDob" name="childDob" type="date" required className="bg-cream/50 border-forest-deep/20 focus-visible:ring-gold pl-10 transition-shadow block w-full" />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-deep/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-forest-deep font-semibold">Special Instructions</Label>
                  <Textarea 
                    id="instructions" 
                    name="instructions" 
                    placeholder="Any specific requests or pronunciation guides..."
                    className="bg-cream/50 border-forest-deep/20 focus-visible:ring-gold min-h-[100px] resize-y transition-shadow" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto mt-4 bg-gradient-gold text-gold-foreground hover:scale-[1.02] transition-transform rounded-full px-6 py-3.5 h-auto text-base font-bold shadow-glow border-0"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Signing up..." : "Sign Up Now"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
