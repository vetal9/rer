import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import AboutSection from "@/components/landing/AboutSection";
import GoogleReviewsSection from "@/components/landing/GoogleReviewsSection";
import ContactSection from "@/components/landing/ContactSection";
import GallerySection from "@/components/landing/GallerySection";
import ServiceAreasSection from "@/components/landing/ServiceAreasSection";
import FooterSection from "@/components/landing/FooterSection";
import FloatingQuoteWidget from "@/components/landing/FloatingQuoteWidget";

const HERO_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/5076d5f02_generated_1f82cce6.png";
const SERVICE_IMAGES = [
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/68d7d442b_generated_c3ad359d.png",
    alt: "Close-up of industrial moving straps and quilted blankets with cinematic blue and orange lighting",
    label: "Precision Equipment",
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/ca3708ff1_generated_a8d7dcca.png",
    alt: "Minimalist empty apartment interior with dramatic shadows and professional moving blankets",
    label: "Spatial Assessment",
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/ea542667b_generated_dc8afadd.png",
    alt: "Careful hands placing a delicate glass object with surgical precision during a professional move",
    label: "Expert Handling",
  },
];
const ABOUT_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/677caef5d_generated_a102306c.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingQuoteWidget />
      <Navbar />
      <HeroSection heroImage={HERO_IMAGE} />
      <ServicesSection images={SERVICE_IMAGES} />
      <ProcessSection />
      <AboutSection aboutImage={ABOUT_IMAGE} />
      <GoogleReviewsSection />
      <GallerySection />
      <ServiceAreasSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}