import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActiveView, MileTransaction } from "../types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface BenefitsViewProps {
  milesBalance: number;
  onRedeemMiles: (amount: number, description: string) => void;
  transactions: MileTransaction[];
  shebaMilesNumber: string | null;
  onLinkShebaMiles: (num: string) => void;
  onNavigate: (view: ActiveView) => void;
}

export default function BenefitsView({
  milesBalance,
  onRedeemMiles,
  transactions,
  shebaMilesNumber,
  onLinkShebaMiles,
  onNavigate,
}: BenefitsViewProps) {
  const [memberIdInput, setMemberIdInput] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<{
    id: string;
    title: string;
    milesCost: number;
    partner: string;
    description: string;
  } | null>(null);

  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  const offers = [
    {
      id: "skylight",
      title: "Skylight Hotel Luxury Suite Stay",
      milesCost: 15000,
      partner: "Ethiopian Skylight Hotel",
      description:
        "One complimentary night stay in an Executive Suite including breakfast and luxury airport shuttle.",
    },
    {
      id: "haile",
      title: "Haile Resorts Weekend Escape",
      milesCost: 12000,
      partner: "Haile Resorts",
      description:
        "Two nights premium room stay at lakeside resort with complete access to fitness and wellness chambers.",
    },
    {
      id: "flight_up",
      title: "Business Class Upgrade ticket",
      milesCost: 8000,
      partner: "Ethiopian Airlines",
      description:
        "Upgrade your economy class ticket to Cloud Nine business class on any flight to/from Addis Ababa.",
    },
  ];

  const coWorkingSpaces = [
    {
      name: "Aurora Coworking",
      miles: "500 Miles",
      description:
        "Earn miles for monthly memberships and day passes at our premium co-working locations.",
      image: "Aurora_Coworking.png",
    },
    {
      name: "BlueSpace Ethiopia",
      miles: "450 Miles",
      description:
        "Get rewarded for your productivity with miles on every membership tier upgrade.",
      image: "BlueSpace_Coworking.png",
    },
    {
      name: "Ice Addis",
      miles: "600 Miles",
      description:
        "Dedicated desk and office space packages earn premium miles for business growth.",
      image: "Ice_Addis_Cowork.png",
    },
    {
      name: "Creative Hub",
      miles: "520 Miles",
      description:
        "Tech-focused co-working with meeting rooms and events membership benefits.",
      image: "Creative_Hub_Cowork.png",
    },
  ];

  const foreignDestinations = {
    africa: [
      {
        country: "Kenya",
        duration: "Visa-free 90 days",
        description:
          "Enjoy seamless travel to Nairobi and Mombasa with your Fly Rewards card.",
        Tags: "EA hub, tech scene",
      },
      {
        country: "Rwanda",
        duration: "Visa on arrival / eVisa",
        description:
          "Experience the beauty of Rwanda with your Fly Rewards card.",
        Tags: "90 days",
      },
      {
        country: "Ghana",
        duration: "Visa on arrival",
        description:
          "Explore the vibrant culture and rich history of Ghana with your Fly Rewards card.",
        Tags: "30 days",
      },
      {
        country: "Senegal",
        duration: "Visa on arrival",
        description:
          "Discover the rich cultural heritage and vibrant markets of Senegal with your Fly Rewards card.",
        Tags: "1 month",
      },
      {
        country: "Gambia",
        duration: "Visa-free 90 days",
        description:
          "Explore the lush landscapes and historical sites of Gambia with your Fly Rewards card.",
        Tags: "90 days",
      },
      {
        country: "Seychelles",
        duration: "Free permit on arrival",
        description:
          "Paradise permit on arrival. ET flies direct. 3 months of turquoise water and fast hotel WiFi — the ultimate aspirational workation.",
        Tags: "3 months, ET direct",
      },
      {
        country: "Djibouti",
        duration: "Visa-free 90 days",
        description:
          "Experience the strategic crossroads of Africa and Asia with your Fly Rewards card.",
        Tags: "90 days",
      },
      {
        country: "Mauritius",
        duration: "Visa on arrival",
        description:
          "Enjoy pristine beaches and diverse cultural experiences in Mauritius with your Fly Rewards card.",
        Tags: "60 days",
      },
      {
        country: "Tanzania",
        duration: "Visa on arrival / eVisa",
        description:
          "Discover the stunning natural wonders and wildlife of Tanzania with your Fly Rewards card.",
        Tags: "90 days",
      },
      {
        country: "Comoros",
        duration: "Visa on arrival",
        description:
          "Experience the untouched beauty and unique culture of the Comoros Islands with your Fly Rewards card.",
        Tags: "45 days",
      },
    ],
    asiaPacific: [
      {
        country: "Singapore",
        duration: "Visa-free 30 days",
        description:
          "Experience the vibrant culture and modern amenities of Singapore with your Fly Rewards card.",
        Tags: "Global digital hub",
      },
      {
        country: "Philippines",
        duration: "Visa-free 30 days",
        description:
          "Explore the beautiful archipelago and warm hospitality of the Philippines with your Fly Rewards card.",
        Tags: "30 days",
      },
      {
        country: "Thailand",
        duration: "eVisa / Visa on arrival",
        description:
          "Discover the rich culture and stunning landscapes of Thailand with your Fly Rewards card.",
        Tags: "15 days",
      },
      {
        country: "Maldives",
        duration: "Free visa on arrival",
        description:
          "Relax in paradise with your Fly Rewards card - visa-free access to the Maldives.",
        Tags: "30 days",
      },
      {
        country: "Cambodia",
        duration: "eVisa / Visa on arrival",
        description:
          "Uncover ancient temples and rich history in Cambodia with your Fly Rewards card.",
        Tags: "30 days",
      },
      {
        country: "Laos",
        duration: "eVisa / Visa on arrival",
        description:
          "Experience the serene landscapes and spiritual temples of Laos with your Fly Rewards card.",
        Tags: "30 days",
      },
      {
        country: "Palau",
        duration: "Free visa on arrival",
        description:
          "Discover world-class diving and pristine tropical beauty in Palau with your Fly Rewards card.",
        Tags: "30 days",
      },
      {
        country: "Sri Lanka",
        duration: "eTA on arrival",
        description:
          "Explore the stunning landscapes and rich heritage of Sri Lanka with your Fly Rewards card.",
        Tags: "30 days",
      },
    ],
    europe: [
      {
        country: "Turkey",
        duration: "eVisa",
        description:
          "Bridge two continents and experience the rich history of Turkey with your Fly Rewards card.",
        Tags: "90 days",
      },
      {
        country: "Georgia",
        duration: "Visa-free",
        description:
          "Discover the majestic Caucasus Mountains and warm hospitality of Georgia with your Fly Rewards card.",
        Tags: "365 days",
      },
      {
        country: "Albania",
        duration: "Visa-free",
        description:
          "Explore the unspoiled coastlines and historic cities of Albania with your Fly Rewards card.",
        Tags: "1 year",
      },
      {
        country: "Kosovo",
        duration: "Visa-free",
        description:
          "Experience the vibrant culture and emerging tech scene of Kosovo with your Fly Rewards card.",
        Tags: "1 year",
      },
      {
        country: "Bosnia",
        duration: "Visa-free",
        description:
          "Immerse yourself in the diverse culture and historical heritage of Bosnia with your Fly Rewards card.",
        Tags: "90 days",
      },
    ],
  };

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (memberIdInput.trim()) {
      onLinkShebaMiles(memberIdInput.trim());
      setSuccessMessage("ShebaMiles membership account successfully linked!");
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  const handleClaimReward = () => {
    if (!selectedOffer) return;
    if (milesBalance < selectedOffer.milesCost) {
      alert(
        "Insufficient ShebaMiles balance. Load more funds or complete flights to earn more!",
      );
      return;
    }

    onRedeemMiles(
      selectedOffer.milesCost,
      `Voucher for ${selectedOffer.title}`,
    );
    const randomCode = `${selectedOffer.id.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}-ELITE`;
    setClaimedCode(randomCode);
  };

  const closeOfferModal = () => {
    setSelectedOffer(null);
    setClaimedCode(null);
  };

  // Determine current milestone status
  const milestoneTarget = 50000;
  const progressPercent = Math.min(100, (milesBalance / milestoneTarget) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-outline-variant/20">
        <div>
          <span className="text-primary font-bold tracking-wider text-sm font-headline uppercase">
            Travel Benefits &amp; Rewards
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mt-1">
            Fly Rewards Dashboard
          </h1>
        </div>
      </div>

      {/* Main Grid: Balance & Tracker + Link Account */}
      <div className="grid  gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-[#001D34] text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-80 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,90,180,0.45)_0%,transparent_70%)]"></div>

          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium tracking-wide text-white/60 font-headline uppercase">
                Total ShebaMiles Rewards
              </p>
              <h2 className="text-5xl font-extrabold font-headline mt-2 text-white">
                {milesBalance.toLocaleString()}{" "}
                <span className="text-lg font-light text-white/80">Miles</span>
              </h2>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#005AB4]">
              flight_takeoff
            </span>
          </div>

          <div className="space-y-4 relative z-10 w-full mt-6">
            <div className="flex justify-between text-xs font-bold text-white/80 uppercase font-headline">
              <span>Goal Progress (Silver Member)</span>
              <span>{Math.round(progressPercent)}% to Gold Elite</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-[#005AB4] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>{milesBalance.toLocaleString()} Miles</span>
              <span>{milestoneTarget.toLocaleString()} Miles Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Layout Part 2: Rewards Partners */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold font-headline text-on-surface">
            Exclusive Partner Offers
          </h3>
          <span className="text-sm text-primary font-semibold hover:underline cursor-pointer">
            View All Partners
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const isAffordable = milesBalance >= offer.milesCost;
            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl p-6 border border-outline-variant/20 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 text-[11px] font-bold text-primary bg-primary/10 rounded-full font-headline uppercase">
                      {offer.partner}
                    </span>
                    <span className="text-sm font-bold text-emerald-600 font-headline bg-emerald-50 px-2 py-0.5 rounded-lg">
                      {offer.milesCost.toLocaleString()} Miles
                    </span>
                  </div>
                  <h4 className="font-bold text-on-surface text-lg font-headline mb-2 leading-snug">
                    {offer.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                    {offer.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Button
                    onClick={() => setSelectedOffer(offer)}
                    className={`w-full py-2 font-bold rounded-xl transition-all ${isAffordable ? "bg-primary text-on-primary hover:bg-primary-container" : "bg-surface-container text-on-surface opacity-60 cursor-not-allowed"}`}
                    disabled={!isAffordable}
                  >
                    {isAffordable ? "Redeem" : "Insufficient Miles"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Co-Working Space Partners - NEW SECTION */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Co-Working Space Partners
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Earn miles for every co-working membership and office space
              booking
            </p>
          </div>
          <span className="text-sm text-primary font-semibold hover:underline cursor-pointer">
            View All Partners
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
          {coWorkingSpaces.map((space, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img
                  src={`/assets/${space.image}`}
                  alt={space.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide mb-1">
                  {space.name}
                </p>
                <p className="text-base font-bold text-emerald-600 mb-3">
                  {space.miles}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {space.description}
                </p>
                <Button className="mt-4 w-full">Learn More</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* International Destinations */}
      <div className="mb-12 -mx-6 px-6 py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-lg">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-2">
              INTERNATIONAL REWARDS
            </p>
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-3">Explore the World.</h2>
              <p className="text-gray-300 leading-relaxed">
                Your Fly Rewards card opens doors to 40+ destinations worldwide.
                Enjoy visa-free or easy visa access to some of the world&apos;s
                most exciting destinations.
              </p>
            </div>
          </div>

          {/* Visa Stats */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            <div className="bg-green-600 rounded-lg p-6">
              <p className="text-3xl font-bold mb-1">12</p>
              <p className="text-sm font-semibold opacity-90">
                Visa-Free Countries
              </p>
            </div>
            <div className="bg-cyan-600 rounded-lg p-6">
              <p className="text-3xl font-bold mb-1">18</p>
              <p className="text-sm font-semibold opacity-90">
                Visa on Arrival
              </p>
            </div>
            <div className="bg-yellow-500 rounded-lg p-6">
              <p className="text-3xl font-bold mb-1">8</p>
              <p className="text-sm font-semibold opacity-90">
                eVisa Available
              </p>
            </div>
            <div className="bg-blue-600 rounded-lg p-6">
              <p className="text-3xl font-bold mb-1">5</p>
              <p className="text-sm font-semibold opacity-90">Europe Access</p>
            </div>
          </div>

          {/* Africa Region */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-16 bg-cyan-500 rounded-full"></div>
              <h3 className="text-2xl font-bold">Africa</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {foreignDestinations.africa.map((dest, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700/50 border border-slate-600 hover:border-cyan-500 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <p className="font-semibold text-white mb-1">
                    {dest.country}
                  </p>
                  <p className="text-sm text-cyan-400 font-semibold mb-2">
                    {dest.duration}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    {dest.description}
                  </p>
                  {dest.Tags && (
                    <p className="text-xs text-gray-400">{dest.Tags}</p>
                  )}
                  {dest.duration.includes("eVisa") && (
                    <button className="text-xs text-cyan-400 font-semibold mt-2 flex items-center gap-1 hover:gap-2 transition-all">
                      {dest.country} eVisa
                      <span>→</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Asia & Pacific Region */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-16 bg-orange-500 rounded-full"></div>
              <h3 className="text-2xl font-bold">Asia & Pacific</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {foreignDestinations.asiaPacific.map((dest, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700/50 border border-slate-600 hover:border-orange-500 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <p className="font-semibold text-white mb-1">
                    {dest.country}
                  </p>
                  <p className="text-sm text-orange-400 font-semibold mb-2">
                    {dest.duration}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    {dest.description}
                  </p>
                  {dest.Tags && (
                    <p className="text-xs text-gray-400">{dest.Tags}</p>
                  )}
                  {dest.duration.includes("eVisa") && (
                    <button className="text-xs text-orange-500 font-semibold mt-2 flex items-center gap-1 hover:gap-2 transition-all">
                      {dest.country} eVisa
                      <span>→</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Europe Region */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-16 bg-purple-500 rounded-full"></div>
              <h3 className="text-2xl font-bold">Europe</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {foreignDestinations.europe.map((dest, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700/50 border border-slate-600 hover:border-purple-500 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <p className="font-semibold text-white mb-1">
                    {dest.country}
                  </p>
                  <p className="text-sm text-purple-400 font-semibold mb-2">
                    {dest.duration}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    {dest.description}
                  </p>
                  {dest.Tags && (
                    <p className="text-xs text-gray-400">{dest.Tags}</p>
                  )}
                  {dest.duration.includes("eVisa") && (
                    <button className="text-xs text-purple-500 font-semibold mt-2 flex items-center gap-1 hover:gap-2 transition-all">
                      {dest.country} eVisa
                      <span>→</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Miles Mechanics Table */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 -mx-6 border border-slate-700/50 shadow-lg">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">
            Miles Mechanics
          </h3>
          <p className="text-sm text-slate-400">
            A customer receiving $1,500/month accumulates ~10,000 miles in 6
            months — enough for a domestic award ticket.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-4 text-slate-400">Activity</th>
                <th className="py-4 text-slate-400">Miles Earned</th>
                <th className="py-4 text-slate-400">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {[
                {
                  id: "fx_payment",
                  description: "FX payment received (per $100)",
                  display: "150 miles",
                  why: "Incentivizes using Coop as primary FX account",
                  color: "text-emerald-400",
                },
                {
                  id: "card_international",
                  description: "Card spend — international (per $10)",
                  display: "20 miles",
                  why: "Aligns with prepaid card structure",
                  color: "text-emerald-400",
                },
                {
                  id: "card_local",
                  description: "Card spend — local POS (per 100 ETB)",
                  display: "6 miles",
                  why: "Consistent with Awash co-brand benchmark",
                  color: "text-emerald-400",
                },
                {
                  id: "coworking",
                  description: "Coworking partner payment (monthly)",
                  display: "500 bonus miles",
                  why: "Drives partner merchant POS usage",
                  color: "text-amber-400",
                },
                {
                  id: "et_flight",
                  description: "ET domestic flight booked",
                  display: "2× status miles",
                  why: "Builds tier status faster — accelerates loyalty",
                  color: "text-amber-400",
                },
                {
                  id: "referral",
                  description: "New member referral",
                  display: "1,000 miles",
                  why: "Viral growth mechanism in tech communities",
                  color: "text-cyan-400",
                },
                {
                  id: "first_activation",
                  description: "First card activation",
                  display: "500 welcome miles",
                  why: "Low cost, high conversion incentive",
                  color: "text-cyan-400",
                },
              ].map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-4 text-slate-200 font-medium">
                    {t.description}
                  </td>
                  <td className="py-4">
                    <span className={`font-bold text-lg ${t.color}`}>
                      {t.display}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400 text-sm">{t.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Voucher Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={closeOfferModal}
                className="absolute top-6 right-6 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {!claimedCode ? (
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">
                      local_activity
                    </span>
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      Redeem ShebaMiles
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Are you sure you want to redeem loyalty rewards for this
                      premium gift?
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-outline uppercase font-semibold">
                        Offer
                      </span>
                      <span className="font-bold text-on-surface">
                        {selectedOffer.title}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-outline uppercase font-semibold">
                        Redemption Price
                      </span>
                      <span className="font-bold text-emerald-600 font-headline">
                        {selectedOffer.milesCost.toLocaleString()} Miles
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-dashed border-outline-variant/40 pt-2">
                      <span className="text-outline uppercase font-semibold">
                        Your Balance After
                      </span>
                      <span className="font-bold text-on-surface">
                        {(
                          milesBalance - selectedOffer.milesCost
                        ).toLocaleString()}{" "}
                        Miles
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleClaimReward}
                    className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  >
                    Confirm Redemption
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">
                      done_all
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      Voucher Redeemed!
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Show this unique code at reception/counter or booking desk
                      to activate your benefit.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f0f4f8] border-2 border-dashed border-primary/20 space-y-2 select-all">
                    <p className="text-xs uppercase text-primary/60 font-medium tracking-widest font-headline">
                      Unique Voucher Code
                    </p>
                    <p className="font-mono text-2xl font-extrabold text-on-background tracking-wider">
                      {claimedCode}
                    </p>
                  </div>

                  <p className="text-[11px] text-outline leading-tight">
                    Codes are automatically synced with Ethiopian Airlines
                    check-in desk system. You can retrieve details of voucher
                    transfers in email records.
                  </p>

                  <button
                    onClick={closeOfferModal}
                    className="w-full py-3 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
                  >
                    Close Dialog
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
