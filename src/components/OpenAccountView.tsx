import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActiveView } from "../types";

interface OpenAccountViewProps {
  onCompleteOnboarding: (
    name: string,
    tier: "voyager" | "standard",
    shebaMiles: string,
  ) => void;
  onNavigate: (view: ActiveView) => void;
}

export default function OpenAccountView({
  onCompleteOnboarding,
  onNavigate,
}: OpenAccountViewProps) {
  const [step, setStep] = useState<number>(1);

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passportCountry: "Addis Ababa",
    livingIn: "Addis Ababa, Ethiopia",
    diasporaDocNumber: "",
    occupation: "",
    annualIncome: "Over $10,000",
    selectedTier: "voyager" as "voyager" | "standard",
    shebaMilesId: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "Sweden",
    "Norway",
    "Saudi Arabia",
    "United Arab Emirates",
    "South Africa",
    "Australia",
    "Kenya",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        setFormError(
          "Please fill in all standard identity fields before moving forward.",
        );
        return;
      }
    } else if (step === 2) {
      if (!formData.occupation) {
        setFormError(
          "Professional details and National Kebele ID card number details are needed.",
        );
        return;
      }
    }
    setStep((prev) => prev + 1);
    setFormError(null);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      handleNext();
      return;
    }

    // setApplicationCompleted(true);
    onNavigate("Dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 lg:px-12 py-12"
    >
      <div className="bg-white rounded-3xl p-8 lg:p-12 border border-outline-variant/30 shadow-lg">
        {!applicationCompleted ? (
          <div className="space-y-10">
            {/* Header Text */}
            <div className="text-center space-y-3">
              <span className="text-primary font-bold tracking-wider text-xs font-headline uppercase">
                Domestic Premier Account
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold font-headline">
                Open Your Foreign Currency Account
              </h1>
              <p className="text-on-surface-variant max-w-xl mx-auto text-sm">
                Enjoy a premier foreign-currency savings account, globally
                linked multi-currency premium cards, and instant access to
                personalized rewards.
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-4 lg:px-16">
              {[1, 2].map((num) => (
                <React.Fragment key={num}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-headline transition-colors ${
                        step >= num
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {num}
                    </div>
                    <span
                      className={`text-xs font-bold font-headline hidden sm:inline ${
                        step === num
                          ? "text-on-surface"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {num === 1
                        ? "Personal Profile"
                        : num === 2
                          ? "Identity Verification"
                          : "Miles & Tier"}
                    </span>
                  </div>
                  {num < 2 && (
                    <div
                      className={`flex-1 h-0.5 max-w-[80px] ${step > num ? "bg-primary" : "bg-surface-container"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 pt-4">
              {/* Step 1: Personal Profile */}
              {step === 1 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5 col-span-2">
                    <h3 className="text-lg font-bold font-headline border-b border-outline-variant/20 pb-2">
                      Identity Details
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      First Name (as in national ID)
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={"e.g. Samuel"}
                      className="w-full px-4 py-3 border border-outline-variant/50 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={"e.g. Kassa"}
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Phone (with country code)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+251 (911) 505-010"
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Residence Region
                    </label>

                    <input
                      type="text"
                      name="passportCountry"
                      value={formData.passportCountry}
                      onChange={handleInputChange}
                      placeholder="e.g. Addis Ababa"
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors font-medium text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Residential / Kebele Address
                    </label>
                    <input
                      type="text"
                      name="livingIn"
                      value={formData.livingIn}
                      onChange={handleInputChange}
                      placeholder={"e.g. Bole Subcity, Kebele 14"}
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional & Supporting */}
              {step === 2 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5 col-span-2">
                    <h3 className="text-lg font-bold font-headline border-b border-outline-variant/20 pb-2">
                      National Identity Verification
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      We require a valid national/local identity card to
                      activate your account. Provide your Kebele ID / National
                      Digital ID number below.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      National / Kebele ID Number
                    </label>
                    <input
                      type="text"
                      name="diasporaDocNumber"
                      value={formData.diasporaDocNumber}
                      onChange={handleInputChange}
                      placeholder={"e.g. KEB-893041-H"}
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="e.g. FinTech Consultant / Surgeon"
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-xs font-bold text-outline font-headline uppercase">
                      Estimated Annual Financial Volume (USD / ETB Equivalent)
                    </label>
                    <select
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-outline-variant/100 rounded-xl focus:border-primary outline-none bg-white font-medium"
                    >
                      <option value="$1,000 - $10,000">$1,000 - $10,000</option>
                      <option value="$10,000 - $50,000">
                        $10,000 - $50,000
                      </option>
                      <option value="$50,000 - $100,000">
                        $50,000 - $100,000
                      </option>
                      <option value="Over $100,000">Over $100,000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: ShebaMiles & Tier selection options */}
              {/* {step === 3 && (
                <div className="md:px-8 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-headline border-b border-outline-variant/20 pb-2">
                      Assign Your Tier &amp; Club Card
                    </h3>
                  </div>

                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedTier: "standard",
                        }))
                      }
                      className={`p-5 rounded-2xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                        formData.selectedTier === "standard"
                          ? "border-2 border-primary bg-primary/5 shadow-md"
                          : "border-outline-variant/30 hover:border-outline-variant"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-headline font-semibold text-sm">
                          Elite Standard
                        </span>
                        <span className="material-symbols-outlined text-primary text-sm font-bold">
                          {formData.selectedTier === "standard"
                            ? "radio_button_checked"
                            : "radio_button_unchecked"}
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-on-surface-variant">
                          Fee: $0 / Free
                        </p>
                        <p className="text-xs text-emerald-600 font-bold font-headline mt-1">
                          +5,000 Miles Signup Bonus
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedTier: "voyager",
                        }))
                      }
                      className={`p-5 rounded-2xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                        formData.selectedTier === "voyager"
                          ? "border-2 border-primary bg-primary/5 shadow-md"
                          : "border-outline-variant/30 hover:border-outline-variant"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-headline font-semibold text-sm">
                          Elite Voyager Premium
                        </span>
                        <span className="material-symbols-outlined text-primary text-sm font-bold">
                          {formData.selectedTier === "voyager"
                            ? "radio_button_checked"
                            : "radio_button_unchecked"}
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-on-surface-variant">
                          Fee: $15/month
                        </p>
                        <p className="text-xs text-emerald-600 font-bold font-headline mt-1">
                          +10,000 Miles Signup Bonus
                        </p>
                      </div>
                    </div>
                  </div>

                 
                  <div className="space-y-1.5 p-5 bg-[#fafbfd] border border-outline-variant/20 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        loyalty
                      </span>
                      <h4 className="font-bold text-sm text-on-surface font-headline">
                        Existing ShebaMiles Linkage
                      </h4>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-4 font-sans">
                      If you already hold an Ethiopian Airlines ShebaMiles
                      accounts membership ID, type it here to link your points.
                      If empty, we will auto-generate a new one for you
                      instantly.
                    </p>
                    <input
                      type="text"
                      name="shebaMilesId"
                      value={formData.shebaMilesId}
                      onChange={handleInputChange}
                      placeholder="ET 12345678"
                      className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl focus:border-primary outline-none uppercase font-mono tracking-widest text-[#001D34] font-bold text-sm"
                    />
                  </div>
                </div>
              )} */}

              {formError && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-medium">
                  {formError}
                </div>
              )}

              {/* Wizard Navigation Actions Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 border border-outline-variant hover:bg-slate-50 text-on-surface font-semibold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Previous Step
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-10 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl cursor-pointer hover:bg-primary-container transition-all"
                >
                  {step === 3 ? "Complete Application" : "Proceed Next"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Application complete congratulations card */
          <div className="text-center py-8 space-y-8 max-w-xl mx-auto">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-4xl font-bold">
                verified
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold font-headline text-on-background">
                Congratulations, {formData.firstName}!
              </h2>
              <p className="text-on-surface-variant text-lg">
                Account application has been approved.
              </p>
            </div>

            {/* <div className="p-6 bg-[#001D34] text-white rounded-3xl space-y-4 shadow-md text-left">
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Assigned Account Number</span>
                <span className="font-mono font-bold text-white">
                  1234 5678 9012 3456
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Initial Saving Balance</span>
                <span className="font-mono font-bold text-emerald-400">
                  $500
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">
                  Assigned Lounge Membership
                </span>
                <span className="font-bold text-white">
                  Bole Star Lounge (VIP Entry)
                </span>
              </div>
              <div className="flex justify-between text-xs border-t border-dashed border-white/20 pt-3">
                <span className="font-semibold text-emerald-400">
                  Signup Loyalty Award Claimed
                </span>
                <span className="font-bold text-[#E9C400] font-headline">
                  +{formData.selectedTier === "voyager" ? "10,000" : "5,000"}{" "}
                  ShebaMiles Verified
                </span>
              </div>
            </div> */}

            <div className="flex gap-4">
              {/* <button
                onClick={() => onNavigate("benefits")}
                className="flex-1 py-4 bg-primary text-on-primary font-bold rounded-xl cursor-pointer hover:bg-primary-container font-headline transition-colors"
              >
                Go to Fly Rewards
              </button> */}
              <button
                onClick={() => onNavigate("load")}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-on-background font-bold rounded-xl cursor-pointer font-headline transition-colors"
              >
                Load My Visa Card
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
