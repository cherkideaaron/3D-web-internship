"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Music,
  Users,
  Briefcase,
  Mic,
  Camera,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Building2,
  ChevronDown,
  Award,
} from "lucide-react";
import ThreeBackground from "@/components/three-background";

export default function HomePage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

    if (!accessKey) {
      console.error(
        "Web3Forms access key is missing. Please check your .env.local file."
      );
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Contact Form Submission - Truth Event & Promotion",
          from_name: name,
          email: email,
          phone: phone || "Not provided",
          message: message,
          to_email: "kevindeaaron@gmail.com",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ThreeBackground />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-accent-gold" />
                <span className="text-xl font-display font-semibold tracking-tight">
                  Truth Event & Promotion
                </span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("awards")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Awards
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </div>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-accent-gold hover:bg-accent-gold/90 text-background font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 flex items-center justify-center overflow-hidden">
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent-gold mb-6 font-medium">
                Since 2006
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-balance leading-[1.1]">
                Crafting Unforgettable
                <br />
                Events & Experiences
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
                Professional event management and promotion services for
                concerts, corporate events, and large-scale productions across
                Ethiopia
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("portfolio")}
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium"
                >
                  View Our Work
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-border/60 hover:bg-muted/50"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </button>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-32 bg-background/60 backdrop-blur-sm border-t border-border/40"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Excellence in Event Management
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Originally founded as Medal (Medaf) Entertainment between
                2006–2011, Truth Event and Promotion Company was independently
                established in 2011 E.C., bringing over 15 years of proven
                expertise in the event and entertainment industry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-card/50 border-border/60 backdrop-blur-sm hover:bg-card/70 transition-all group">
                <div className="text-5xl font-display font-bold text-accent-gold mb-4 group-hover:scale-110 transition-transform">
                  15+
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Years
                </div>
                <p className="text-foreground">
                  Of experience in event management and promotion
                </p>
              </Card>

              <Card className="p-8 bg-card/50 border-border/60 backdrop-blur-sm hover:bg-card/70 transition-all group">
                <div className="text-5xl font-display font-bold text-accent-gold mb-4 group-hover:scale-110 transition-transform">
                  30
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Team Members
                </div>
                <p className="text-foreground">
                  Experienced professionals dedicated to excellence
                </p>
              </Card>

              <Card className="p-8 bg-card/50 border-border/60 backdrop-blur-sm hover:bg-card/70 transition-all group">
                <div className="text-5xl font-display font-bold text-accent-gold mb-4 group-hover:scale-110 transition-transform">
                  1000+
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Events
                </div>
                <p className="text-foreground">
                  Successfully executed across Ethiopia
                </p>
              </Card>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
              <p className="text-base text-muted-foreground leading-relaxed">
                Based in Dire Dawa, we are a professional event management firm
                specializing in concerts, corporate events, promotional
                advertising, cultural performances, and large-scale public and
                government events.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-32 bg-muted/30 backdrop-blur-sm border-y border-border/40"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Comprehensive Event Solutions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From intimate gatherings to large-scale productions, we deliver
                exceptional experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Music,
                  title: "Music Concerts",
                  description:
                    "Professional organization and management of live music concerts and entertainment events",
                },
                {
                  icon: Mic,
                  title: "Comedy Shows",
                  description:
                    "Stand-up comedy events and entertainment shows with complete production support",
                },
                {
                  icon: Briefcase,
                  title: "Corporate Events",
                  description:
                    "Business conferences, seminars, product launches, and corporate gatherings",
                },
                {
                  icon: Users,
                  title: "Government Events",
                  description:
                    "Large-scale public and government events with professional coordination",
                },
                {
                  icon: TrendingUp,
                  title: "Promotional Advertising",
                  description:
                    "Brand activation, promotional campaigns, and marketing event execution",
                },
                {
                  icon: Camera,
                  title: "Production Services",
                  description:
                    "Photography, videography, and complete production consulting",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="p-8 bg-card/50 border-border/60 backdrop-blur-sm hover:bg-card/80 hover:border-accent-gold/50 transition-all duration-300 group"
                >
                  <service.icon className="h-10 w-10 text-accent-gold mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="awards"
          className="py-32 bg-background/60 backdrop-blur-sm border-y border-border/40"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="h-12 w-12 text-accent-gold" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Awards & Recognition
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Celebrating excellence and industry leadership
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 bg-card/50 border-border/60 backdrop-blur-sm hover:bg-card/70 transition-all group">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Certificate Image */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-muted/80 to-muted/50 rounded-lg overflow-hidden border border-accent-gold/20 group-hover:border-accent-gold/40 transition-colors">
                    <img
                      src="/IMG-11.png"
                      alt="Award Certificate"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-accent-gold" />
                        <span className="text-xs uppercase tracking-wider text-accent-gold font-medium">
                          Certificate of Excellence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-4 text-balance">
                        Excellence in Event Management
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Awarded to the owner and founder for outstanding
                        contributions to the event management industry and
                        exceptional leadership in creating memorable experiences
                        across Ethiopia.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full bg-accent-gold/30 rounded-full" />
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Recognition For
                          </p>
                          <p className="text-sm text-muted-foreground">
                            15+ years of professional excellence, innovation in
                            event production, and commitment to quality service
                            delivery
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full bg-accent-gold/30 rounded-full" />
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Industry Impact
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Leading transformation in Ethiopian event management
                            with professional standards and innovative
                            approaches
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full bg-accent-gold/30 rounded-full" />
                        <div>
                          <p className="text-sm font-medium mb-1">Legacy</p>
                          <p className="text-sm text-muted-foreground">
                            Building a lasting foundation for event excellence
                            and inspiring the next generation of event
                            professionals
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border/40">
                      <p className="text-xs text-muted-foreground italic">
                        This recognition reflects our unwavering commitment to
                        creating unforgettable experiences and setting new
                        standards in the event management industry.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Our Past Work
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A showcase of successful events and memorable experiences
                we&apos;ve created
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  category: "Concert",
                  title: "National Music Festival 2023",
                  desc: "Large-scale outdoor concert with 10,000+ attendees",
                },
                {
                  category: "Corporate",
                  title: "Ethiopian Airlines Gala",
                  desc: "Premium corporate event and awards ceremony",
                },
                {
                  category: "Government",
                  title: "Cultural Heritage Celebration",
                  desc: "National cultural event with government officials",
                },
                {
                  category: "Fashion",
                  title: "Addis Fashion Week",
                  desc: "International fashion show and brand showcase",
                },
                {
                  category: "Comedy",
                  title: "Stand-Up Comedy Series",
                  desc: "Monthly comedy shows with top Ethiopian comedians",
                },
                {
                  category: "Promotion",
                  title: "Brand Launch Campaign",
                  desc: "Multi-city promotional tour and activation",
                },
              ].map((project, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-card/30 border-border/60 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted/80 relative overflow-hidden">
                    <img
                      src={`/IMG-0${index + 1}.png`}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-gold/90 text-background rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-accent-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32 bg-background/60 backdrop-blur-sm border-t border-border/40"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                  Let&apos;s Create Something Amazing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Get in touch to discuss your next event
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <Card className="p-6 bg-card/50 border-border/60 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent-gold/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold mb-2">
                          Address
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Dire Dawa, Ethiopia
                          <br />
                          Kebele 02, House No. 10684
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card/50 border-border/60 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent-gold/10 rounded-lg">
                        <Phone className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold mb-2">
                          Phone
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          +251 25 111 2345
                          <br />
                          +251 91 234 5678
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card/50 border-border/60 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent-gold/10 rounded-lg">
                        <Mail className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold mb-2">
                          Email
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          info@truthevent.et
                          <br />
                          contact@truthevent.et
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Contact Form */}
                <Card className="p-8 bg-card/50 border-border/60 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="bg-background/50"
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="bg-background/50"
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+251 ..."
                        className="bg-background/50"
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your event..."
                        className="bg-background/50 resize-none"
                        disabled={formStatus === "loading"}
                      />
                    </div>

                    {formStatus === "success" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600 dark:text-green-400">
                        Thank you for your message! We&apos;ll get back to you
                        soon.
                      </div>
                    )}

                    {formStatus === "error" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                        Something went wrong. Please try again or contact us
                        directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-accent-gold hover:bg-accent-gold/90 text-background font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "loading" ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-background/80 backdrop-blur-sm border-t border-border/40">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent-gold" />
                <span className="font-display font-semibold">
                  Truth Event & Promotion Company
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} Truth Event & Promotion. Crafting
                unforgettable experiences since 2006.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
