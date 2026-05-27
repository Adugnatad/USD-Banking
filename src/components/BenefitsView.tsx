import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActiveView, MileTransaction } from "../types";

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
      <div className="grid lg:grid-cols-3 gap-8">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Earnings Table */}
      <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-2xl font-bold font-headline text-on-surface">
            Mile Activity History
          </h3>
          <button
            onClick={() => onNavigate("load")}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-[13px] font-bold rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">
              local_mall
            </span>
            Transfer Points
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <th className="py-4">Transaction Details</th>
                <th className="py-4">Source Category</th>
                <th className="py-4 text-right">Loyalty Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">
                          {t.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">
                          {t.description}
                        </p>
                        <p className="text-xs text-outline font-medium">
                          {t.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 text-xs font-semibold capitalize bg-surface-container text-on-surface-variant rounded-full">
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 text-right font-bold font-mono text-sm ${t.amount >= 0 ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {t.amount >= 0
                      ? `+${t.amount.toLocaleString()}`
                      : t.amount.toLocaleString()}
                  </td>
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
