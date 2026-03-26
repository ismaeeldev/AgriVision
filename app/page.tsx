import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { CropSolutions } from "@/components/sections/CropSolutions";
import { Products } from "@/components/sections/Products";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { AIChatbotFeature } from "@/components/sections/AIChatbotFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { ChatFAQ } from "@/components/sections/ChatFAQ";
import { Contact } from "@/components/sections/Contact";
import { ScrollStack } from '@/components/animation/scrollStack';


export default function Home() {
  return (
    <>
      <Hero />

      {/* 🔥 STACK EXPERIENCE START */}
      <ScrollStack>
        <Categories />
        <Products />
        <WhyChoose />
      </ScrollStack>
      {/* 🔥 STACK EXPERIENCE END */}

      {/* <AIChatbotFeature /> */}
      <CropSolutions />
      <Testimonials />
      <ChatFAQ />
      <Newsletter />
      <Contact />
    </>
  );
}
