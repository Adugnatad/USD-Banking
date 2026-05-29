import React, { useState } from "react";
import { motion } from "motion/react";
import { ActiveView } from "../types";

interface CardsViewProps {
  onNavigate: (view: ActiveView) => void;
}

export default function CardsView({ onNavigate }: CardsViewProps) {
  // Simple interactive rotation state for cards
  const [rotateStandard, setRotateStandard] = useState({ x: 0, y: 0 });
  const [rotateVoyager, setRotateVoyager] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setRotation: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalize to max +-15deg rotation
    const rotX = -(y / (rect.height / 2)) * 15;
    const rotY = (x / (rect.width / 2)) * 15;

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = (
    setRotation: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-16"
    >
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-primary font-bold tracking-wider text-sm font-headline uppercase">
          Select Your Card
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold font-headline leading-tight">
          Elite Card Suite
        </h1>
        <p className="text-on-surface-variant text-lg">
          Masterfully crafted visa cards designed to integrate financial
          accessibility with exclusive premier benefits.
        </p>
      </div>

      {/* Cards 3D Display Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
        {/* Elite Standard Card */}
        <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-full px-3 py-1 uppercase font-headline">
              Standard Membership
            </span>
            <h3 className="text-3xl font-extrabold font-headline">
              Standard Card
            </h3>
            <p className="text-on-surface-variant text-sm">
              Digital-first daily essentials for global payments. Convert USD to
              Ethiopian Birr at priority interbank market rates.
            </p>
          </div>

          {/* Interactive Card Presentation */}
          <div className="card-perspective py-8 flex justify-center">
            <motion.div
              onMouseMove={(e) => handleMouseMove(e, setRotateStandard)}
              onMouseLeave={() => handleMouseLeave(setRotateStandard)}
              style={{
                transformStyle: "preserve-3d",
                rotateX: rotateStandard.x,
                rotateY: rotateStandard.y,
              }}
              className="elite-gradient w-80 h-48 rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between overflow-hidden relative cursor-grab active:cursor-grabbing border border-white/20 transition-all duration-150"
            >
              <div
                className="absolute inset-0 card-gloss"
                style={{ transform: "translateZ(1px)" }}
              ></div>
              <div
                className="flex justify-between items-start"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="text-sm font-bold tracking-wider uppercase font-headline">
                  ELITE STANDARD
                </span>
                <span className="material-symbols-outlined text-2xl">
                  payments
                </span>
              </div>

              <div
                className="mt-auto"
                style={{ transform: "translateZ(15px)" }}
              >
                <p className="text-white/60 font-mono tracking-widest text-xs mb-3">
                  •••• •••• •••• 4410
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-headline font-semibold text-xs tracking-wide uppercase">
                    ELITE MEMBER
                  </p>
                  <img
                    alt="Logo tiny"
                    className="h-5 brightness-0 invert opacity-70"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugh5dAj4EVk0n-zUtJ1wd1zFuYM4W-GQc6bvbp1PSndiNhBXj1ZiLiNmL24xXqQ12rLbcvo8f8wunZEkwu85sdeGYQNEw93iIwBbvIR-Apo1b5jF3SBPYDE4zSK3__DojbOLqf9GCWo-aYRrtd_B9RgkaFe3ChVtj5Wm3MGF-PxfcozZoQJHqVVW0yu0X1IdaMcl0OH3rJYCSObX2RUDVQkrhO6PyPHiD-bkGKnPAOLgn1dUhpGFwy6qZSz"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <button
            onClick={() => onNavigate("open-account")}
            className="w-full py-3.5 bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold rounded-xl cursor-pointer transition-colors"
          >
            Apply Standard Card
          </button>
        </div>

        {/* Elite Voyager Card */}
        <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-lg flex flex-col justify-between space-y-8 relative">
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <span className="bg-primary text-on-primary font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest font-headline shadow-md">
              Highest Yield
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-[11px] font-bold text-[#E9C400] bg-[#E9C400]/10 rounded-full px-3 py-1 uppercase font-headline">
              Travel &amp; Mile Elite
            </span>
            <h3 className="text-3xl font-extrabold font-headline">
              Digital Nomad Card
            </h3>
            <p className="text-on-surface-variant text-sm">
              Tailored for premium frequent flyers. Earn double ShebaMiles
              directly, enter VIP lounges globally, and enjoy 24/7 personal
              banking assistance.
            </p>
          </div>

          {/* Interactive Card Presentation */}
          <div className="card-perspective py-8 flex justify-center">
            <motion.div
              onMouseMove={(e) => handleMouseMove(e, setRotateVoyager)}
              onMouseLeave={() => handleMouseLeave(setRotateVoyager)}
              style={{
                transformStyle: "preserve-3d",
                rotateX: rotateVoyager.x,
                rotateY: rotateVoyager.y,
              }}
              className="voyager-gradient w-80 h-48 rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between overflow-hidden relative cursor-grab active:cursor-grabbing border border-emerald-400/25 transition-all duration-150"
            >
              <div
                className="absolute inset-0 card-gloss"
                style={{ transform: "translateZ(1px)" }}
              ></div>
              <div
                className="flex justify-between items-start"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="text-sm font-bold tracking-wider uppercase font-headline">
                  DIGITAL NOMAD
                </span>
                <span className="material-symbols-outlined text-2xl text-[#E9C400]">
                  flight_takeoff
                </span>
              </div>

              <div
                className="mt-auto"
                style={{ transform: "translateZ(15px)" }}
              >
                <p className="text-white/60 font-mono tracking-widest text-xs mb-3">
                  •••• •••• •••• 8892
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-headline font-semibold text-xs tracking-wide uppercase">
                    VOYAGER ADVANCED
                  </p>
                  <img
                    alt="Logo tiny"
                    className="h-5 brightness-0 invert opacity-70"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugh5dAj4EVk0n-zUtJ1wd1zFuYM4W-GQc6bvbp1PSndiNhBXj1ZiLiNmL24xXqQ12rLbcvo8f8wunZEkwu85sdeGYQNEw93iIwBbvIR-Apo1b5jF3SBPYDE4zSK3__DojbOLqf9GCWo-aYRrtd_B9RgkaFe3ChVtj5Wm3MGF-PxfcozZoQJHqVVW0yu0X1IdaMcl0OH3rJYCSObX2RUDVQkrhO6PyPHiD-bkGKnPAOLgn1dUhpGFwy6qZSz"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <button
            onClick={() => onNavigate("open-account")}
            className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            Upgrade to Voyager Card
          </button>
        </div>
      </div>

      {/* Structured Comparison Grid */}
      <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold font-headline mb-6 text-center">
          Feature Checklist
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-outline uppercase font-semibold text-xs tracking-wider">
                <th className="pb-4">Features Overview</th>
                <th className="pb-4">Elite Standard</th>
                <th className="pb-4">Digital Nomad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 font-bold text-on-surface-variant">
                  Instant Local Bank Sweep Out
                </td>
                <td className="py-4">Available (standard)</td>
                <td className="py-4 font-bold text-primary">
                  Priority Instant Clearance
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-on-surface-variant">
                  Ethiopian Airlines booking multiplier
                </td>
                <td className="py-4">No miles (Standard cashback)</td>
                <td className="py-4 font-bold text-primary">
                  3x Flight miles conversion
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-on-surface-variant">
                  Airport Lounge Admission
                </td>
                <td className="py-4 text-outline-variant">
                  Lounge Key (Charges Apply)
                </td>
                <td className="py-4 font-bold text-emerald-600">
                  Bole Star VIP &amp; 1,200+ Free
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-on-surface-variant">
                  Virtual Card Custom Limits
                </td>
                <td className="py-4">Up to 3 active</td>
                <td className="py-4 font-bold text-emerald-600">
                  Unlimited cards and sub-keys
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-on-surface-variant font-headline">
                  Concierge &amp; Personal Advisor
                </td>
                <td className="py-4 text-outline-variant">—</td>
                <td className="py-4 font-bold text-emerald-600 font-headline">
                  Dedicated Diaspora Desk VIP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Segment: Security and standard excellence credentials */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center p-6 space-y-3 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-primary">
            verified_user
          </span>
          <h4 className="font-bold text-lg font-headline">
            Elite Security Standards
          </h4>
          <p className="text-on-surface-variant text-sm">
            Every card is certified with standard 3D Secure 2.0 (3DS) and
            advanced tokenization to lock security.
          </p>
        </div>
        <div className="text-center p-6 space-y-3 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-primary">
            credit_card
          </span>
          <h4 className="font-bold text-lg font-headline">
            Instant Virtual Issuance
          </h4>
          <p className="text-on-surface-variant text-sm">
            Once onboarding is approved, create virtual standard and voyager
            visa cards directly within minutes.
          </p>
        </div>
        <div className="text-center p-6 space-y-3 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-primary">
            public
          </span>
          <h4 className="font-bold text-lg font-headline">
            Global Visa Acceptance
          </h4>
          <p className="text-on-surface-variant text-sm">
            Accepted in over 200 countries and regions at tens of millions of
            POS machines and retail outlets worldwide.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
