import React from "react";
import { motion } from "motion/react";
import { ActiveView } from "../types";

interface HomeViewProps {
  onNavigate: (view: ActiveView) => void;
  savingsBalance: number;
  cardBalance: number;
}

export default function HomeView({
  onNavigate,
  savingsBalance,
  cardBalance,
}: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_55%,rgba(0,90,180,0.06)_0%,rgba(249,249,255,0)_100%)]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-[1.1] text-on-background tracking-tight">
              Spend <span className="text-[#217dff]">Globally</span>,<br />
              Grow Locally.
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-xl">
              The premier banking experience in Ethiopia. Empowering local
              residents, elite corporate clients, and premium savers with
              premium cards and airline miles rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("open-account")}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl active:scale-95 transition-all duration-150 font-headline"
              >
                Open Account
              </button>
              <button
                onClick={() => onNavigate("cards")}
                className="bg-surface-container-high text-on-surface px-8 py-4 rounded-lg font-bold text-lg hover:bg-surface-variant active:scale-95 transition-all duration-150 font-headline"
              >
                View Cards
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 gap-6">
              <motion.div
                whileHover={{ rotateY: -10, rotateX: 5, z: 50 }}
                transition={{ duration: 0.4 }}
                onClick={() => onNavigate("cards")}
                className="transform -rotate-3 hover:-rotate-1 transition-transform duration-500 cursor-pointer"
              >
                <div className="voyager-gradient w-full max-w-md mx-auto h-64 rounded-2xl shadow-2xl p-8 text-white flex flex-col justify-between overflow-hidden relative border border-white/10">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl"></div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold font-headline">
                      DIGITAL NOMAD
                    </span>
                    <span className="material-symbols-outlined text-3xl">
                      contactless
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-white/60 font-mono tracking-widest text-sm mb-4">
                      •••• •••• •••• 8892
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-headline font-semibold tracking-wide uppercase">
                        ABEBE BALCHA
                      </p>
                      <img
                        alt="Logo small"
                        className="h-6 brightness-0 invert opacity-80"
                        src="https://lh3.googleusercontent.com/aida/ADBb0ugh5dAj4EVk0n-zUtJ1wd1zFuYM4W-GQc6bvbp1PSndiNhBXj1ZiLiNmL24xXqQ12rLbcvo8f8wunZEkwu85sdeGYQNEw93iIwBbvIR-Apo1b5jF3SBPYDE4zSK3__DojbOLqf9GCWo-aYRrtd_B9RgkaFe3ChVtj5Wm3MGF-PxfcozZoQJHqVVW0yu0X1IdaMcl0OH3rJYCSObX2RUDVQkrhO6PyPHiD-bkGKnPAOLgn1dUhpGFwy6qZSz"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Rewards */}
      <section className="py-24 bg-on-background text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">
                Elite Rewards:
                <br />
                Elevate Your Journey
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Turn your everyday spending into extraordinary experiences.
                Designed specifically for the frequent flyer, our rewards
                program offers unparalleled value across Africa and beyond.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl mb-4">
                    flight
                  </span>
                  <h4 className="font-bold text-xl mb-2 font-headline">
                    Miles Bonus
                  </h4>
                  <p className="text-white/60 text-sm">
                    Earn 3 ShebaMiles for every $1 spent on international
                    flights.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl mb-4">
                    meeting_room
                  </span>
                  <h4 className="font-bold text-xl mb-2 font-headline">
                    Lounge Access
                  </h4>
                  <p className="text-white/60 text-sm">
                    Complimentary entry to 1,200+ lounges globally including
                    Addis Ababa Bole.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl mb-4">
                    apartment
                  </span>
                  <h4 className="font-bold text-xl mb-2 font-headline">
                    Hotel Perks
                  </h4>
                  <p className="text-white/60 text-sm">
                    Exclusive rates and room upgrades at Marriott and Hilton
                    properties.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl mb-4">
                    support_agent
                  </span>
                  <h4 className="font-bold text-xl mb-2 font-headline">
                    Elite Desk
                  </h4>
                  <p className="text-white/60 text-sm">
                    A dedicated relationship manager for all your premier
                    banking needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img
                alt="Elite Lounge"
                className="rounded-3xl shadow-2xl relative z-10 w-full h-[600px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd9F9F3B7tVVUNJ2CFVoBJlJO5yB_5uQpnbZEPPYfAm7OOPMbIkKjGcMFHjtk8US5J_8Savjtl9IaLe9X-cYVYNa39pQn41MtLhCZoohXgmqMttWOd9KaiR7RRYS7ZdIOzxmaiDREGpTlmwK4efBEP3d9QY_Ony-s0u6GnEom_9ZSGV1dVA8KDgxAQjH6orRMjCq7aw77TbWRgqZMwLt79ZXKNhXhqEEItPD1OCQGN3crcPr-QlHsZOVr9BmiU0Dil4JjxNdazMxq5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="bg-primary-container/10 rounded-[3rem] p-12 lg:p-24 border border-primary-container/20 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-8 text-on-surface">
            Ready for World-Class Banking?
          </h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
            Join thousands of premium Ethiopian professionals who have already
            secured their financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate("open-account")}
              className="bg-primary text-on-primary px-10 py-5 rounded-xl font-bold text-xl hover:shadow-xl active:scale-95 transition-all duration-150 font-headline cursor-pointer"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
