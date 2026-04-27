import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const REVIEWS = [
  {
    name: "Marie-Claire Dubois",
    avatar: "MC",
    color: "#4285F4",
    rating: 5,
    date: { fr: "Il y a 2 semaines", en: "2 weeks ago" },
    text: {
      fr: "Absolument impeccable. Ils ont manipulé notre piano à queue et notre collection d'art comme des conservateurs de musée. Pas une égratignure, aucune inquiétude. Vraiment exceptionnel.",
      en: "Absolutely impeccable. They handled our grand piano and art collection like museum curators. Not a scratch, not a worry. Truly world-class service.",
    },
  },
  {
    name: "Jean-François Tremblay",
    avatar: "JF",
    color: "#EA4335",
    rating: 5,
    date: { fr: "Il y a 1 mois", en: "1 month ago" },
    text: {
      fr: "Nous avons déménagé notre bureau de 80 personnes en un week-end sans aucun temps d'arrêt. Le lundi matin, tout était installé et fonctionnel. Une coordination incroyable.",
      en: "We moved our 80-person office over a weekend with zero downtime. Monday morning, everything was set up and running. Incredible coordination.",
    },
  },
  {
    name: "Sophie Chen",
    avatar: "SC",
    color: "#34A853",
    rating: 5,
    date: { fr: "Il y a 3 semaines", en: "3 weeks ago" },
    text: {
      fr: "Troisième fois avec Kostas. Ils se souviennent de nos préférences, gèrent tout avec soin et arrivent toujours à l'heure. Les seuls déménageurs que j'utiliserai jamais.",
      en: "Third time using Kostas. They remember our preferences, handle everything with care, and always arrive on time. The only movers I'll ever use.",
    },
  },
  {
    name: "Philippe Gagnon",
    avatar: "PG",
    color: "#FBBC04",
    rating: 5,
    date: { fr: "Il y a 2 mois", en: "2 months ago" },
    text: {
      fr: "Service professionnel du début à la fin. L'équipe était ponctuelle, efficace et très soigneuse avec mes affaires. Je recommande vivement Kostas à tous!",
      en: "Professional service from start to finish. The team was punctual, efficient and very careful with my belongings. I highly recommend Kostas to everyone!",
    },
  },
  {
    name: "Isabelle Moreau",
    avatar: "IM",
    color: "#9C27B0",
    rating: 5,
    date: { fr: "Il y a 5 semaines", en: "5 weeks ago" },
    text: {
      fr: "Déménagement longue distance Montréal–Toronto sans aucun stress. Tout est arrivé intact, à l'heure. Prix très compétitif pour la qualité du service.",
      en: "Long-distance move Montreal–Toronto with zero stress. Everything arrived intact and on time. Very competitive price for the quality of service.",
    },
  },
  {
    name: "David Lapointe",
    avatar: "DL",
    color: "#FF5722",
    rating: 5,
    date: { fr: "Il y a 1 semaine", en: "1 week ago" },
    text: {
      fr: "Équipe fantastique ! Rapide, soigneux et agréable. Mon déménagement de dernière minute a été géré à la perfection. Merci Kostas !",
      en: "Fantastic team! Fast, careful and pleasant. My last-minute move was handled perfectly. Thank you Kostas!",
    },
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function GoogleReviewsSection() {
  const { lang } = useLanguage();
  const [expanded, setExpanded] = useState({});

  const phase = lang === "fr" ? "Phase_04: Avis Google" : "Phase_04: Google Reviews";
  const heading = lang === "fr" ? "Ce que disent nos clients" : "What Our Clients Say";
  const sub = lang === "fr"
    ? "Plus de 200 avis vérifiés sur Google Maps — une réputation bâtie sur la confiance."
    : "200+ verified reviews on Google Maps — a reputation built on trust.";
  const viewAll = lang === "fr" ? "Voir tous les avis sur Google" : "See all reviews on Google";

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5"
          style={{ background: "radial-gradient(ellipse, #4285F4, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">{phase}</span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-orange mx-auto mt-6 mb-6" />
          <p className="font-inter text-base text-foreground/60 max-w-xl mx-auto">{sub}</p>
        </motion.div>

        {/* Overall rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-border bg-muted/20">
            <GoogleLogo />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="font-inter font-black text-2xl text-foreground">4.9</span>
                <Stars />
              </div>
              <span className="font-mono text-[10px] text-foreground/40 tracking-widest uppercase">
                {lang === "fr" ? "Basé sur 200+ avis Google" : "Based on 200+ Google reviews"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((review, i) => {
            const isExpanded = expanded[i];
            const text = review.text[lang];
            const isLong = text.length > 140;
            const displayText = isLong && !isExpanded ? text.slice(0, 140) + "…" : text;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-5 rounded-2xl border border-border bg-muted/20 hover:border-orange/20 hover:bg-orange/5 transition-all flex flex-col gap-4"
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: review.color }}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm text-foreground leading-tight">{review.name}</p>
                      <p className="font-mono text-[10px] text-foreground/40 tracking-wide">{review.date[lang]}</p>
                    </div>
                  </div>
                  <GoogleLogo />
                </div>

                {/* Stars */}
                <Stars count={review.rating} />

                {/* Text */}
                <p className="font-inter text-sm text-foreground/70 leading-relaxed flex-1">
                  {displayText}
                  {isLong && (
                    <button
                      onClick={() => setExpanded(e => ({ ...e, [i]: !isExpanded }))}
                      className="ml-1 text-orange hover:text-orange-light font-semibold transition-colors"
                    >
                      {isExpanded
                        ? (lang === "fr" ? " Moins" : " Less")
                        : (lang === "fr" ? " Plus" : " More")}
                    </button>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to Google */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://www.google.com/maps/search/Kostas+Demenagement+Montreal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-muted/20 hover:border-orange/30 hover:bg-orange/5 transition-all font-mono text-xs tracking-widest text-foreground/60 hover:text-orange uppercase"
          >
            <GoogleLogo />
            {viewAll}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}