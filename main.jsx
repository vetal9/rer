import React from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Route, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const CITIES = [
{ name: "Montréal", region: { fr: "Île-de-Montréal", en: "Island of Montreal" } },
{ name: "Québec", region: { fr: "Capitale-Nationale", en: "National Capital" } },
{ name: "Laval", region: { fr: "Laval", en: "Laval" } },
{ name: "Longueuil", region: { fr: "Rive-Sud", en: "South Shore" } },
{ name: "Ottawa", region: { fr: "Ontario", en: "Ontario" } },
{ name: "Toronto", region: { fr: "Ontario", en: "Ontario" } },
{ name: "Sherbrooke", region: { fr: "Estrie", en: "Eastern Townships" } },
{ name: "Gatineau", region: { fr: "Outaouais", en: "Outaouais" } }];


const ROUTES = [
{
  from: "Montréal",
  to: { fr: "Québec", en: "Québec" },
  km: "250 km"
},
{
  from: "Montréal",
  to: { fr: "Ottawa", en: "Ottawa" },
  km: "200 km"
},
{
  from: "Montréal",
  to: { fr: "Toronto", en: "Toronto" },
  km: "540 km"
}];


export default function ServiceAreasSection() {
  const { lang } = useLanguage();

  const phase = lang === "fr" ? "Phase_06: Zones de Service" : "Phase_06: Service Areas";
  const heading = lang === "fr" ? "Partout où vous allez" : "Wherever You're Going";
  const sub = lang === "fr" ?
  "Déménagements locaux, interprovinciaux ou longue distance — notre flotte couvre tout le Québec et au-delà." :
  "Local, inter-provincial or long-distance moves — our fleet covers all of Québec and beyond.";
  const citiesLabel = lang === "fr" ? "Villes desservies" : "Cities We Service";
  const routesLabel = lang === "fr" ? "Trajets populaires" : "Popular Routes";

  return (
    <section id="areas" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
        style={{ background: "radial-gradient(ellipse, #FF4F00, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">{phase}</span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-orange mx-auto mt-6 mb-6" />
          <p className="font-inter text-base text-foreground/60 max-w-xl mx-auto">{sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Cities Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-orange uppercase mb-6 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />{citiesLabel}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group p-4 rounded-xl border border-border bg-muted/20 hover:border-orange/30 hover:bg-orange/5 transition-all cursor-default"
                >
                  <p className="font-inter font-bold text-sm text-foreground group-hover:text-orange transition-colors">{city.name}</p>
                  <p className="font-mono text-[10px] text-foreground/40 mt-1 tracking-wide">{city.region[lang]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>




























          

          {/* Right: Popular Routes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-orange uppercase mb-6 flex items-center gap-2">
              <Route className="w-3.5 h-3.5" />{routesLabel}
            </p>
            <div className="space-y-4">
              {ROUTES.map((route, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-muted/20 hover:border-orange/30 hover:bg-orange/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-inter font-bold text-sm text-foreground">{route.from}</span>
                      <ArrowRight className="w-4 h-4 text-orange flex-shrink-0" />
                      <span className="font-inter font-bold text-sm text-foreground">{route.to[lang]}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-foreground/50 bg-muted/50 px-3 py-1 rounded-full flex-shrink-0">{route.km}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-5 rounded-xl border border-orange/20 bg-orange/5">
              <p className="font-inter text-sm text-foreground/70 leading-relaxed">
                {lang === "fr"
                  ? "Vous ne voyez pas votre ville ? Contactez-nous — nous couvrons toute la province."
                  : "Don't see your city? Contact us — we cover the entire province and beyond."}
              </p>
              <a href="#contact" className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-orange uppercase mt-3 hover:gap-3 transition-all">
                {lang === "fr" ? "Nous contacter" : "Get in touch"} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>



























































          
        </div>
      </div>
    </section>);

}