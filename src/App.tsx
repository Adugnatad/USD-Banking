import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MileTransaction, UserProfile } from "./types";
import HomeView from "./components/HomeView";
import BenefitsView from "./components/BenefitsView";
import CardsView from "./components/CardsView";
import LoadFundsView from "./components/LoadFundsView";
import OpenAccountView from "./components/OpenAccountView";
import Dashboard from "./components/Dashboard";
import BecomePartnerPage from "./components/BecomePartner";
import CoworkingPartnerPage from "./components/BecomePartnerCoworking";
import LodgePartnerPage from "./components/BecomePartnerLodge";

type ViewPath =
  | "home"
  | "benefits"
  | "cards"
  | "load"
  | "open-account"
  | "login"
  | "Dashboard";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active authenticated user profile (pre-populate with elegant default, but supports logout/login/signup)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: "Abraham T. Getahun",
    email: "abraham@ethioglobal.com",
    userType: "premium",
    identityNumber: "ETH-KEB-3948520",
    residence: "Addis Ababa, Bole Subcity",
    nationality: "Ethiopian",
  });

  // Live state representing user portfolio
  const [milesBalance, setMilesBalance] = useState<number>(24500);
  const [savingsBalance, setSavingsBalance] = useState<number>(42500);
  const [cardBalance, setCardBalance] = useState<number>(12480.5);
  const [shebaMilesNumber, setShebaMilesNumber] = useState<string | null>(
    "ET-39487201",
  );
  const [applicantName, setApplicantName] =
    useState<string>("Abraham T. Getahun");

  const [transactions, setTransactions] = useState<MileTransaction[]>([
    {
      id: "tx-1",
      type: "flight",
      amount: 3400,
      description: "Addis Ababa to Washington Dulles Flight (Cloud Nine Class)",
      icon: "flight",
      date: "May 14, 2026",
    },
    {
      id: "tx-2",
      type: "hotel",
      amount: 1200,
      description: "Ethiopian Skylight Hotel Partner Booking",
      icon: "apartment",
      date: "Apr 28, 2026",
    },
    {
      id: "tx-3",
      type: "card spend",
      amount: 250,
      description: "Addis Ababa Bole Duty-Free shopping",
      icon: "local_mall",
      date: "Apr 12, 2026",
    },
    {
      id: "tx-4",
      type: "dining",
      amount: 85,
      description: "Kategna Cultural Restaurant Addis Ababa",
      icon: "restaurant",
      date: "Mar 24, 2026",
    },
  ]);

  // Handle funds load transaction
  const handleExecuteTransfer = (amount: number, milesEarned: number) => {
    // Deduct savings, add to card
    setSavingsBalance((prev) => prev - amount);
    setCardBalance((prev) => prev + amount);

    // Add rewards points & update balances
    setMilesBalance((prev) => prev + milesEarned);

    // Add activity record
    const newTx: MileTransaction = {
      id: `m-tx-${Date.now()}`,
      type: "transfer bonus",
      amount: milesEarned,
      description: `Card Load Transfer Promo (${applicantName})`,
      icon: "payments",
      date: "Today",
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Convert or redeem Miles for vouchers
  const handleRedeemMiles = (amount: number, description: string) => {
    setMilesBalance((prev) => prev - amount);

    const newTx: MileTransaction = {
      id: `claim-tx-${Date.now()}`,
      type: "redeem code",
      amount: -amount,
      description: description,
      icon: "local_activity",
      date: "Today",
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Link ShebaMiles
  const handleLinkShebaMiles = (num: string) => {
    setShebaMilesNumber(num);
  };

  // Handle onboarding completed successfully
  const handleCompleteOnboarding = (
    name: string,
    tier: "voyager" | "standard",
    shebaMiles: string,
  ) => {
    setApplicantName(name);
    setShebaMilesNumber(shebaMiles);

    const matchBonus = tier === "voyager" ? 10000 : 5000;
    setMilesBalance((prev) => prev + matchBonus);

    // Initial default savings assigned for premium balance initialization check
    setSavingsBalance(42500);

    const bonusTx: MileTransaction = {
      id: "bonus-sig",
      type: "onboarding bonus",
      amount: matchBonus,
      description: `Elite ${tier === "voyager" ? "Voyager" : "Standard"} Registration Welcome Bonus`,
      icon: "stars",
      date: "Today",
    };

    setTransactions((prev) => [bonusTx, ...prev]);
  };

  const navTo = (view: ViewPath | string) => {
    // Convert view names to paths for backward compatibility
    const pathMap: Record<ViewPath, string> = {
      home: "/",
      benefits: "/benefits",
      cards: "/cards",
      load: "/load",
      "open-account": "/open-account",
      login: "/",
      Dashboard: "/dashboard",
    };

    const path = pathMap[view as ViewPath] || view;
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans antialiased flex flex-col justify-between">
      {/* Navigation Top Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          {/* <div 
            onClick={() => navTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <img 
              alt="EthioGlobal Elite Logo" 
              referrerPolicy="no-referrer"
              className="h-9 w-auto" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugh5dAj4EVk0n-zUtJ1wd1zFuYM4W-GQc6bvbp1PSndiNhBXj1ZiLiNmL24xXqQ12rLbcvo8f8wunZEkwu85sdeGYQNEw93iIwBbvIR-Apo1b5jF3SBPYDE4zSK3__DojbOLqf9GCWo-aYRrtd_B9RgkaFe3ChVtj5Wm3MGF-PxfcozZoQJHqVVW0yu0X1IdaMcl0OH3rJYCSObX2RUDVQkrhO6PyPHiD-bkGKnPAOLgn1dUhpGFwy6qZSz"
            />
            <span className="font-headline font-extrabold text-[#001D34] text-lg tracking-wider hidden sm:inline">
              EthioGlobal <span className="text-primary font-bold">ELITE</span>
            </span>
          </div> */}

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-bold tracking-wide text-on-surface-variant font-headline">
            <button
              onClick={() => navTo("home")}
              className={`hover:text-primary transition-all cursor-pointer ${location.pathname === "/" ? "text-primary border-b-2 border-primary pb-1 mt-1" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => navTo("cards")}
              className={`hover:text-primary transition-all cursor-pointer ${location.pathname === "/cards" ? "text-primary border-b-2 border-primary pb-1 mt-1" : ""}`}
            >
              Cards Suite
            </button>
            <button
              onClick={() => navTo("benefits")}
              className={`hover:text-primary transition-all cursor-pointer ${location.pathname === "/benefits" ? "text-primary border-b-2 border-primary pb-1 mt-1" : ""}`}
            >
              Fly Rewards
            </button>
            <button
              onClick={() => navTo("load")}
              className={`hover:text-primary transition-all cursor-pointer ${location.pathname === "/load" ? "text-primary border-b-2 border-primary pb-1 mt-1" : ""}`}
            >
              Load Funds
            </button>
          </nav>

          {/* Mobile Right Bar: Balances & hamburger */}
          <div className="flex items-center gap-4">
            {/* Balances pills display */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Miles */}
              <div
                onClick={() => navTo("benefits")}
                className="px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-400/20 text-xs text-emerald-800 font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-600">
                  stars
                </span>
                <span>
                  Fly Miles:{" "}
                  <strong className="font-headline font-bold text-emerald-950">
                    {milesBalance.toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>

            {/* Core Apply CTA button */}
            <button
              onClick={() => navTo("become-partner")}
              className="bg-slate-100 hover:bg-slate-200 text-[#001D34] px-4 py-2 rounded-lg text-sm font-bold font-headline border border-slate-200 transition-all cursor-pointer"
            >
              Become Partner
            </button>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 text-on-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Nav */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-30 md:hidden bg-white/95 backdrop-blur-md border-b border-outline-variant/30 shadow-lg px-6 py-8 flex flex-col space-y-6 font-headline font-bold text-lg text-on-surface-variant">
          {/* Mobile Profile Display */}
          {currentUser ? (
            <div className="flex items-center justify-between p-4 bg-[#001D34]/5 border border-primary/5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-[#001D34]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-primary uppercase font-mono">
                    {currentUser.userType} Resident
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setApplicantName("Guest User");
                  setShebaMilesNumber(null);
                  setSavingsBalance(0);
                  setCardBalance(0);
                  setMilesBalance(0);
                  navTo("home");
                }}
                className="text-xs font-bold text-red-600 hover:underline px-2.5 py-1.5 bg-red-50 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navTo("home")}
              className="w-full bg-primary text-on-primary py-3 rounded-2xl text-center text-sm font-bold shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                login
              </span>
              <span>Sign In / Create Account</span>
            </button>
          )}

          {/* Quick Balances list */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-surface-container-low rounded-2xl border border-slate-100 text-center">
            <div
              onClick={() => navTo("/load")}
              className="space-y-1 cursor-pointer"
            >
              <span className="text-[10px] uppercase text-outline font-bold">
                Savings
              </span>
              <p className="font-mono text-sm font-bold text-on-surface">
                $
                {savingsBalance.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div
              onClick={() => navTo("/load")}
              className="space-y-1 cursor-pointer"
            >
              <span className="text-[10px] uppercase text-outline font-bold">
                Card
              </span>
              <p className="font-mono text-sm font-bold text-on-surface">
                $
                {cardBalance.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div
              onClick={() => navTo("benefits")}
              className="space-y-1 cursor-pointer"
            >
              <span className="text-[10px] uppercase text-outline font-bold">
                Miles
              </span>
              <p className="font-headline text-xs font-bold text-emerald-700">
                {milesBalance.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => navTo("home")}
            className={`w-full text-left py-2 hover:text-primary ${location.pathname === "/" ? "text-primary" : ""}`}
          >
            Home
          </button>
          <button
            onClick={() => navTo("cards")}
            className={`w-full text-left py-2 hover:text-primary ${location.pathname === "/cards" ? "text-primary" : ""}`}
          >
            Cards Suite
          </button>
          <button
            onClick={() => navTo("benefits")}
            className={`w-full text-left py-2 hover:text-primary ${location.pathname === "/benefits" ? "text-primary" : ""}`}
          >
            Fly Rewards
          </button>
          <button
            onClick={() => navTo("load")}
            className={`w-full text-left py-2 hover:text-primary ${location.pathname === "/load" ? "text-primary" : ""}`}
          >
            Load Funds
          </button>
        </div>
      )}

      {/* Main Interactive Screen Content */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                onNavigate={navTo}
                savingsBalance={savingsBalance}
                cardBalance={cardBalance}
              />
            }
          />
          <Route
            path="/benefits"
            element={
              <BenefitsView
                milesBalance={milesBalance}
                onRedeemMiles={handleRedeemMiles}
                transactions={transactions}
                shebaMilesNumber={shebaMilesNumber}
                onLinkShebaMiles={handleLinkShebaMiles}
                onNavigate={navTo}
              />
            }
          />
          <Route path="/cards" element={<CardsView onNavigate={navTo} />} />
          <Route
            path="/load"
            element={
              <LoadFundsView
                savingsBalance={savingsBalance}
                cardBalance={cardBalance}
                applicantName={applicantName}
                onExecuteTransfer={handleExecuteTransfer}
              />
            }
          />
          <Route
            path="/open-account"
            element={
              <OpenAccountView
                onCompleteOnboarding={handleCompleteOnboarding}
                onNavigate={navTo}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard onNavigate={navTo} />} />
          <Route
            path="/become-partner"
            element={<BecomePartnerPage onNavigate={navTo} />}
          />
          <Route
            path="/become-partner-coworking"
            element={<CoworkingPartnerPage onNavigate={navTo} />}
          />
          <Route
            path="/become-partner-hotel"
            element={<LodgePartnerPage onNavigate={navTo} />}
          />
        </Routes>
      </main>

      {/* Global Brand Footer */}
      <footer className="w-full bg-[#001D34] text-white py-8 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Copyright rules line */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8  text-xs text-white/40 font-light gap-4">
            <p>© 2026 Cooperative Bank of Oromia. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="hover:text-white"
              >
                Privacy Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
