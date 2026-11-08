import { Blog } from "@/components/home/Blog";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { IntroTestimonials } from "@/components/sections/IntroTestimonials";
import { DividerStrip } from "@/components/ui/DividerStrip";

/** Home (AUDIT.md §3 `/`). */
export default function Home() {
  return (
    <>
      <Hero />
      <IntroTestimonials />
      <DividerStrip />
      <ProjectsSection />
      <DividerStrip />
      <HowItWorks />
      <DividerStrip />
      <Services />
      <DividerStrip />
      <Testimonials />
      <DividerStrip />
      <Blog />
      <DividerStrip />
      <Faq />
      <DividerStrip />
    </>
  );
}
