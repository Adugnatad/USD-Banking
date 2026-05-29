import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadFundsProps {
  savingsBalance: number;
  cardBalance: number;
  applicantName: string;
  onExecuteTransfer: (amount: number, milesEarned: number) => void;
}

export default function LoadFundsView({
  savingsBalance,
  cardBalance,
  applicantName,
  onExecuteTransfer,
}: LoadFundsProps) {
  const [loadAmount, setLoadAmount] = useState<string>("1000");
  const [selectedCard, setSelectedCard] = useState<"voyager" | "standard">(
    "voyager",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<{
    txId: string;
    amount: number;
    milesEarned: number;
    date: string;
  } | null>(null);

  const quickAdds = [500, 1000, 2500, 5000];

  const handleQuickAdd = (val: number) => {
    const current = parseFloat(loadAmount) || 0;
    setLoadAmount((current + val).toString());
    setErrorMessage(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadAmount(e.target.value);
    setErrorMessage(null);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(loadAmount);

    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid transfer amount greater than $0.");
      return;
    }

    if (amount > savingsBalance) {
      setErrorMessage(
        `Insufficient savings balance. You only have $${savingsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} left in your Savings account.`,
      );
      return;
    }

    // Standard points conversion: 1 ShebaMile per $5 loaded to card for elite activation!
    const milesEarned = Math.floor(amount / 5);

    onExecuteTransfer(amount, milesEarned);

    // Create a mock but stable receipt transaction ID
    const refId = `TX-${Math.floor(10000000 + Math.random() * 90000000)}`;

    setSuccessReceipt({
      txId: refId,
      amount: amount,
      milesEarned: milesEarned,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  const closeReceipt = () => {
    setSuccessReceipt(null);
    setLoadAmount("1000");
  };

  const currentAmount = parseFloat(loadAmount) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-outline-variant/20 mb-12">
        <div>
          <span className="text-primary font-bold tracking-wider text-sm font-headline uppercase">
            USD Account Portal
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mt-1">
            Load Funds to Elite Card
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Intermediary Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <form onSubmit={handleConfirm} className="space-y-6">
            {/* Source Wallet selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase font-headline">
                Source Asset Account
              </label>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      monetization_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm font-headline">
                      USD Global Savings
                    </h4>
                    <p className="text-[11px] text-outline font-medium">
                      Bole Financial Center Branch
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-outline font-medium uppercase font-headline">
                    Available Balance
                  </p>
                  <p className="font-mono font-bold text-on-surface text-lg">
                    $
                    {savingsBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination Card Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase font-headline">
                Select Target Elite Card
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Voyager Card Option */}
                <div
                  onClick={() => setSelectedCard("voyager")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                    selectedCard === "voyager"
                      ? "border-2 border-primary bg-primary/5"
                      : "border-outline-variant/30 hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-600">
                      flight_takeoff
                    </span>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm font-headline">
                        Digital Nomad Visa
                      </h4>
                      <p className="text-[11px] text-outline font-medium">
                        Ending in 8892
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-sm font-bold">
                    {selectedCard === "voyager"
                      ? "radio_button_checked"
                      : "radio_button_unchecked"}
                  </span>
                </div>

                {/* Standard Card Option */}
                <div
                  onClick={() => setSelectedCard("standard")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                    selectedCard === "standard"
                      ? "border-2 border-primary bg-primary/5"
                      : "border-outline-variant/30 hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      payments
                    </span>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm font-headline">
                        Elite Standard Visa
                      </h4>
                      <p className="text-[11px] text-outline font-medium">
                        Ending in 4410
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-sm font-bold">
                    {selectedCard === "standard"
                      ? "radio_button_checked"
                      : "radio_button_unchecked"}
                  </span>
                </div>
              </div>
            </div>

            {/* Load Input Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-outline uppercase font-headline">
                  Enter USD Amount to Load
                </label>
                <span className="text-xs font-semibold text-primary">
                  Daily Limit: $50,000
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-on-surface-variant font-headline">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={loadAmount}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-20 py-4 text-2xl font-extrabold font-headline bg-surface-container-low rounded-2xl text-on-surface border border-outline-variantFocus focus:border-primary outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold font-headline text-outline">
                  USD
                </span>
              </div>

              {/* Quick Load presets */}
              <div className="grid grid-cols-4 gap-2.5 pt-2">
                {quickAdds.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleQuickAdd(val)}
                    className="py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs rounded-xl cursor-pointer transition-colors font-headline"
                  >
                    +${val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Loading transfer submit CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-bold text-lg rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              Confirm Instant Transfer
            </button>
          </form>
        </div>

        {/* Right Side: Interactive Live Card Preview & Details */}
        <div className="lg:col-span-5 space-y-8">
          {/* Card Preview display */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,120,250,0.15)_0%,transparent_70%)]"></div>

            <h3 className="text-sm font-semibold font-headline uppercase text-white/50 relative z-10">
              Live Visa Balance
            </h3>

            {/* Simulated credit card face */}
            <div
              className={`p-6 rounded-2xl ${selectedCard === "voyager" ? "voyager-gradient" : "elite-gradient"} h-44 flex flex-col justify-between border border-white/15 relative overflow-hidden shadow-2xl`}
            >
              <div className="flex justify-between items-start">
                <span className="font-headline font-bold text-sm tracking-wide">
                  {selectedCard === "voyager"
                    ? "DIGITAL NOMAD"
                    : "ELITE STANDARD"}
                </span>
                <span className="material-symbols-outlined text-white/85">
                  contactless
                </span>
              </div>
              <div className="my-auto">
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-headline font-medium">
                  Card Balance
                </p>
                <p className="font-mono text-2xl font-extrabold text-white">
                  $
                  {(cardBalance + currentAmount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-xs font-bold leading-none font-headline uppercase truncate w-2/3">
                  {applicantName ? applicantName : "ABRAHAM GETAHUN"}
                </p>
                <img
                  alt="Elite Logo"
                  className="h-4 brightness-0 invert opacity-60"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugh5dAj4EVk0n-zUtJ1wd1zFuYM4W-GQc6bvbp1PSndiNhBXj1ZiLiNmL24xXqQ12rLbcvo8f8wunZEkwu85sdeGYQNEw93iIwBbvIR-Apo1b5jF3SBPYDE4zSK3__DojbOLqf9GCWo-aYRrtd_B9RgkaFe3ChVtj5Wm3MGF-PxfcozZoQJHqVVW0yu0X1IdaMcl0OH3rJYCSObX2RUDVQkrhO6PyPHiD-bkGKnPAOLgn1dUhpGFwy6qZSz"
                />
              </div>
            </div>

            {/* Info and pricing metrics list */}
            <div className="divide-y divide-white/10 text-xs font-medium pt-2 relative z-10">
              <div className="flex justify-between py-2.5">
                <span className="text-white/60">Processing SLA</span>
                <span className="font-bold text-emerald-400">
                  Instant / Automatic
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-white/60">Transfer Commissions</span>
                <span className="font-bold text-emerald-400">
                  Free ($0.00 Commission)
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-white/60">
                  Fly Rewards Earned (1 point per $5)
                </span>
                <span className="font-bold text-cyan-400">
                  +{Math.floor(currentAmount / 5).toLocaleString()} ShebaMiles
                </span>
              </div>
              <div className="flex justify-between py-2.5 text-sm border-t border-white/20 pt-3">
                <span className="text-white font-bold">Total funds to add</span>
                <span className="font-bold text-white font-mono">
                  $
                  {currentAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 border border-outline-variant/30 rounded-2xl bg-surface-container-low text-xs leading-relaxed text-on-surface-variant flex gap-3">
            <span className="material-symbols-outlined text-primary text-xl">
              info
            </span>
            <p>
              Funding your visa card from global savings instantly credits your
              Visa network balance. This allows you to transact immediately
              globally with no processing delays of any kind.
            </p>
          </div>
        </div>
      </div>

      {/* Success Receipt Dialog modal */}
      <AnimatePresence>
        {successReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">
                  check_box
                </span>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-extrabold font-headline text-on-surface">
                  Transfer Successful!
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Your card has been credited instantly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-slate-100 space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-outline uppercase font-semibold">
                    Reference ID
                  </span>
                  <span className="font-mono font-bold text-on-surface">
                    {successReceipt.txId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase font-semibold">
                    Timestamp
                  </span>
                  <span className="font-bold text-on-surface">
                    {successReceipt.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase font-semibold">
                    Loaded Amount
                  </span>
                  <span className="font-bold text-on-surface font-mono">
                    $
                    {successReceipt.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase font-semibold">
                    Destination Wallet
                  </span>
                  <span className="font-bold text-on-surface">
                    Card ending in{" "}
                    {selectedCard === "voyager" ? "8892" : "4410"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-outline-variant/30 pt-2.5">
                  <span className="font-semibold text-primary">
                    Loyalty Rewards Issued
                  </span>
                  <span className="font-bold text-emerald-600 font-headline">
                    +{successReceipt.milesEarned.toLocaleString()} ShebaMiles
                  </span>
                </div>
              </div>

              <button
                onClick={closeReceipt}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container cursor-pointer transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
