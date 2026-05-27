import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Building,
  Wallet,
  ChevronRight,
  X,
  Copy,
  Check,
  CheckCircle2,
  Info,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  CreditCard,
  Lock,
  Unlock,
  Sparkles,
} from "lucide-react";
import { ActiveView } from "../types";

interface VirtualCard {
  id: string;
  number: string;
  cvv: string;
  expiry: string;
  holder: string;
  color: "gold" | "charcoal" | "indigo" | "emerald";
  cardType: "Elite Standard" | "Elite Voyager";
  status: "active" | "frozen";
  createdAt: string;
}

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number; // Positive = inflow, Negative = outflow
  date: string;
  type: "add" | "send" | "receive" | "card_fee" | "spend";
}

function UsdFlagSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-100 shrink-0"
    >
      <rect width="24" height="24" fill="#FFFFFF" />
      {/* Stripes */}
      <rect y="0" width="24" height="1.8" fill="#B22234" />
      <rect y="3.6" width="24" height="1.8" fill="#B22234" />
      <rect y="7.2" width="24" height="1.8" fill="#B22234" />
      <rect y="10.8" width="24" height="1.8" fill="#B22234" />
      <rect y="14.4" width="24" height="1.8" fill="#B22234" />
      <rect y="18" width="24" height="1.8" fill="#B22234" />
      <rect y="21.6" width="24" height="1.8" fill="#B22234" />
      {/* Blue Canton */}
      <rect width="11" height="11" fill="#3C3B6E" />
      <circle cx="2.5" cy="2.5" r="0.45" fill="#FFFFFF" />
      <circle cx="5.5" cy="2.5" r="0.45" fill="#FFFFFF" />
      <circle cx="8.5" cy="2.5" r="0.45" fill="#FFFFFF" />
      <circle cx="4" cy="5.5" r="0.45" fill="#FFFFFF" />
      <circle cx="7" cy="5.5" r="0.45" fill="#FFFFFF" />
      <circle cx="2.5" cy="8.5" r="0.45" fill="#FFFFFF" />
      <circle cx="5.5" cy="8.5" r="0.45" fill="#FFFFFF" />
      <circle cx="8.5" cy="8.5" r="0.45" fill="#FFFFFF" />
    </svg>
  );
}

export default function Dashboard({
  onNavigate,
}: {
  onNavigate: (view: ActiveView) => void;
}) {
  // Account core state focused solely on USD
  const [usdBalance, setUsdBalance] = useState<number>(12480.0);
  const [hideBalances, setHideBalances] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Seed Lists of Active Cards - styled matching the elegant Wise minimalist vibe
  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: "card-1",
      number: "4519 8295 1092 8492",
      cvv: "821",
      expiry: "09/30",
      holder: "Abraham T. Getahun",
      color: "charcoal",
      cardType: "Elite Voyager",
      status: "active",
      createdAt: "May 12, 2026",
    },
    {
      id: "card-2",
      number: "4218 3920 1821 7381",
      cvv: "442",
      expiry: "11/29",
      holder: "Abraham T. Getahun",
      color: "gold",
      cardType: "Elite Standard",
      status: "active",
      createdAt: "April 02, 2026",
    },
  ]);

  // Selected Card for the interactive preview & actions
  const [selectedCardId, setSelectedCardId] = useState<string>("card-1");
  const [revealCardDigits, setRevealCardDigits] = useState<boolean>(false);

  // USD transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      title: "To your USD balance",
      subtitle: "Added from Oromia Sweep",
      amount: 1500.0,
      date: "Today",
      type: "add",
    },
    {
      id: "tx-2",
      title: "AWS Ingress Cloud Bill",
      subtitle: "Card spend (•• 8492)",
      amount: -45.0,
      date: "Today",
      type: "spend",
    },
    {
      id: "tx-3",
      title: "Cooperative Bank Sweep Transfer",
      subtitle: "Inflow wire",
      amount: 10000.0,
      date: "Yesterday",
      type: "receive",
    },
    {
      id: "tx-4",
      title: "Card Creation Fee",
      subtitle: "Provisioning Cost",
      amount: -5.0,
      date: "May 20, 2026",
      type: "card_fee",
    },
  ]);

  // Modal Action handler states
  // 'add' | 'send' | 'receive' | 'new_card' | 'more' | null
  const [interactiveMode, setInteractiveMode] = useState<
    "add" | "send" | "receive" | "new_card" | "more" | null
  >(null);

  // Forms & Filter inputs
  const [inputAmount, setInputAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientBankCode, setRecipientBankCode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<"all" | "inflow" | "outflow">(
    "all",
  );
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  // New card forms state
  const [newCardHolder, setNewCardHolder] =
    useState<string>("Abraham T. Getahun");
  const [newCardColor, setNewCardColor] = useState<
    "gold" | "charcoal" | "indigo" | "emerald"
  >("charcoal");
  const [newCardType, setNewCardType] = useState<
    "Elite Standard" | "Elite Voyager"
  >("Elite Voyager");

  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Money
  const handleAddConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputAmount);
    if (isNaN(val) || val <= 0) {
      alert("Kindly fill in a valid numeric amount.");
      return;
    }

    setUsdBalance((prev) => prev + val);

    // Log transaction
    const newTx: Transaction = {
      id: `add-${Date.now()}`,
      title: "To your USD balance",
      subtitle: "Added",
      amount: val,
      date: "Today",
      type: "add",
    };
    setTransactions((prev) => [newTx, ...prev]);

    triggerToast(
      `Added $${val.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD successfully!`,
    );
    setInteractiveMode(null);
    setInputAmount("");
  };

  // Send Money
  const handleSendConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputAmount);
    if (isNaN(val) || val <= 0) {
      alert("Must state a valid numeric amount.");
      return;
    }
    if (val > usdBalance) {
      alert("Insufficient USD balance to complete transaction.");
      return;
    }
    if (!recipientName.trim()) {
      alert("Please specify a receiver name.");
      return;
    }

    setUsdBalance((prev) => prev - val);

    const newTx: Transaction = {
      id: `send-${Date.now()}`,
      title: `Transfer to ${recipientName.trim()}`,
      subtitle: recipientBankCode.trim() || "Direct payout link",
      amount: -val,
      date: "Today",
      type: "send",
    };
    setTransactions((prev) => [newTx, ...prev]);

    triggerToast(
      `Successfully dispatched $${val.toLocaleString()} USD to ${recipientName}!`,
    );
    setInteractiveMode(null);
    setInputAmount("");
    setRecipientName("");
    setRecipientBankCode("");
  };

  // Create Virtual Card
  const handleCreateCardConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardHolder.trim()) {
      alert("Please enter a Cardholder Name.");
      return;
    }

    const price = newCardType === "Elite Voyager" ? 15.0 : 5.0;
    if (usdBalance < price) {
      alert(
        `Insufficient USD balance to pay the $${price} registration & network fee.`,
      );
      return;
    }

    // Generate random mock credentials
    const bin = newCardType === "Elite Standard" ? "4218" : "4519";
    const numPart = Array.from({ length: 3 }, () =>
      Math.floor(1000 + Math.random() * 9000).toString(),
    ).join(" ");
    const finalNumber = `${bin} ${numPart}`;
    const randCvv = Math.floor(100 + Math.random() * 900).toString();
    const expMonth = String(Math.floor(1 + Math.random() * 12)).padStart(
      2,
      "0",
    );
    const expYear = String(new Date().getFullYear() + 4).substring(2);
    const finalExpiry = `${expMonth}/${expYear}`;

    const newCard: VirtualCard = {
      id: `card-${Date.now()}`,
      number: finalNumber,
      cvv: randCvv,
      expiry: finalExpiry,
      holder: newCardHolder.trim(),
      color: newCardColor,
      cardType: newCardType,
      status: "active",
      createdAt: "Just now",
    };

    setUsdBalance((prev) => prev - price);
    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newCard.id);

    // Charge Transaction
    const chargeTx: Transaction = {
      id: `fee-${Date.now()}`,
      title: `Virtual Card Fee (${newCardType})`,
      subtitle: "Instant Provisioning",
      amount: -price,
      date: "Today",
      type: "card_fee",
    };
    setTransactions((prev) => [chargeTx, ...prev]);

    triggerToast(`Order successful! Charged $${price} USD & provisioned Card.`);
    setInteractiveMode(null);
  };

  // Freeze / Unfreeze toggle
  const toggleCardLock = (id: string, currentStatus: "active" | "frozen") => {
    const nextStatus = currentStatus === "active" ? "frozen" : "active";
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c)),
    );
    triggerToast(
      nextStatus === "frozen"
        ? "Card frozen. Purchases locked."
        : "Card unfrozen and live!",
    );
  };

  // Copy card digits
  const copyTextToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ""));
    triggerToast(`Copied ${label} to clipboard!`);
  };

  // Transaction searches
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchQuery =
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchQuery) return false;

      if (filterType === "inflow") return tx.amount > 0;
      if (filterType === "outflow") return tx.amount < 0;
      return true;
    });
  }, [transactions, searchQuery, filterType]);

  const cardGradientStyle = {
    gold: "linear-gradient(135deg, #d4af37 0%, #aa800a 100%)",
    charcoal: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    indigo: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
    emerald: "linear-gradient(135deg, #047857 0%, #064e3b 100%)",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-[#cbf7b2] selection:text-slate-950">
      {/* Dynamic Wise Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-semibold text-xs py-3.5 px-6 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10"
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Dashboard layout */}
      <main className="max-w-4xl w-full mx-auto px-6 py-8 flex-grow space-y-6">
        {/* Main interactive Wise Board Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-8">
          {/* Top segment: Flag, label and large balance display */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-2">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <UsdFlagSVG />
                <span className="text-base font-bold text-slate-800 tracking-tight">
                  USD balance
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
                {hideBalances ? (
                  <span>•••••• USD</span>
                ) : (
                  <span>
                    {usdBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    USD
                  </span>
                )}
              </h1>
            </div>

            {/* Circular Action Circles - Wise Styled with beautiful green */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-7 shrink-0">
              {/* Add Button */}
              <button
                onClick={() => {
                  setInteractiveMode("add");
                  setInputAmount("");
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#006dda] hover:bg-[#005ab4] text-slate-900 font-extrabold flex items-center justify-center shadow-sm transition-all transform active:scale-95">
                  <Plus className="w-5.5 h-5.5 stroke-[2.5]" color="#fff" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                  Add
                </span>
              </button>

              {/* Send Button */}
              <button
                onClick={() => {
                  setInteractiveMode("send");
                  setInputAmount("");
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#006dda] hover:bg-[#005ab4] text-slate-900 font-semibold flex items-center justify-center shadow-sm transition-all transform active:scale-95">
                  <ArrowUp className="w-5.5 h-5.5 stroke-[2.5]" color="#fff" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                  Send
                </span>
              </button>

              {/* Receive Button */}
              <button
                onClick={() => {
                  setInteractiveMode("receive");
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#006dda] hover:bg-[#005ab4] text-slate-900 font-semibold flex items-center justify-center shadow-sm transition-all transform active:scale-95">
                  <ArrowDown
                    className="w-5.5 h-5.5 stroke-[2.5]"
                    color="#fff"
                  />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                  Receive
                </span>
              </button>

              {/* Cards Button - anchor/scroll directly to card module */}
              <button
                onClick={() => {
                  const el = document.getElementById("cards-vault-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else triggerToast("Inspecting cards layout below");
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#1e293b] text-[#006dda] hover:bg-slate-850 font-semibold flex items-center justify-center shadow-sm transition-all transform active:scale-95">
                  <CreditCard className="w-5.5 h-5.5 stroke-[2]" color="#fff" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                  Cards
                </span>
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Balance information and Accordions */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest text-left font-mono">
              Balance information
            </h3>

            <div className="space-y-2.5">
              {/* Row 1: Account Details trigger */}
              <button
                onClick={() => setInteractiveMode("receive")}
                className="w-full bg-white hover:bg-slate-50 border border-slate-100/80 rounded-2xl p-4 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                    <Building className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Your USD account details
                    </h4>
                    <p className="text-xs text-slate-500 font-medium pt-0.5">
                      JP Morgan Chase N.Y. • Swift Code: CHASUS33XX • Account
                      No: 4452-901-82910
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-750 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Row 2: Asset Type */}
              <div className="w-full bg-white border border-slate-100/85 rounded-2xl p-4 text-left flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                    <Wallet className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Asset type
                    </h4>
                    <p className="text-xs text-slate-500 font-medium pt-0.5">
                      Liquid cash reserves (fully vaulted & registered)
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] font-bold rounded-md">
                  USD CASH
                </div>
              </div>
            </div>
          </div>

          {/* PLACE FOR VIEWING CARDS - Requested: "a place for viewing cards" */}
          <div id="cards-vault-section" className="pt-2 space-y-5 scroll-mt-20">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-0.5">
                <h3 className="text-xs font-extrabold text-[#4f46e5] uppercase tracking-wider font-mono">
                  Your Virtual Cards Portfolio
                </h3>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Active Debit Cards
                </h2>
              </div>

              <button
                onClick={() => onNavigate("cards")}
                className="flex items-center gap-1.5 text-xs text-indigo-650 hover:text-indigo-800 font-bold border border-indigo-100 hover:border-indigo-200 bg-indigo-50/40 rounded-full px-3.5 py-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Issue Card</span>
              </button>
            </div>

            {/* Selected Card visual interface block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 rounded-2.5xl p-6 border border-slate-100">
              {/* Left Column: Visual card model and switcher list */}
              <div className="md:col-span-7 flex flex-col items-center justify-between space-y-6">
                {/* Visual Debit card container */}
                <div
                  style={{
                    background:
                      cardGradientStyle[activeCard?.color || "charcoal"],
                  }}
                  className="w-full aspect-[1.58/1] max-w-[340px] rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden select-none transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl"></div>

                  {/* Top: Card class and type */}
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <span className="text-[9px] font-black text-white/50 tracking-wider block uppercase">
                        ETHIOGLOBAL
                      </span>
                      <p className="font-mono text-[10px] font-extrabold tracking-tight text-white/90">
                        {activeCard?.cardType.toUpperCase()}
                      </p>
                    </div>
                    {/* Tiny Visa/Master icon mockup */}
                    <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center font-mono text-[9px] font-extrabold text-white">
                      VISA
                    </div>
                  </div>

                  {/* Middle representation: Numbers code */}
                  <div className="my-auto z-10 py-1">
                    <p className="font-mono tracking-widest text-[#ffffff] text-base font-semibold">
                      {revealCardDigits
                        ? activeCard?.number
                        : `•••• •••• •••• ${activeCard?.number.slice(-4)}`}
                    </p>
                  </div>

                  {/* Bottom details */}
                  <div className="flex items-end justify-between mt-auto z-10 w-full text-xs">
                    <div>
                      <span className="text-[7px] text-white/40 uppercase block leading-none pb-0.5">
                        Holder
                      </span>
                      <p className="font-medium tracking-wide uppercase truncate max-w-[130px]">
                        {activeCard?.holder}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <span className="text-[7px] text-white/40 uppercase block leading-none pb-0.5">
                          Expires
                        </span>
                        <p className="font-mono tracking-wide">
                          {activeCard?.expiry}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase block leading-none pb-0.5">
                          CVV
                        </span>
                        <p className="font-mono tracking-wide">
                          {revealCardDigits ? activeCard?.cvv : "•••"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Frozen shadow overlays if locked */}
                  {activeCard?.status === "frozen" && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] flex flex-col items-center justify-center text-white z-20 transition-all">
                      <Lock className="w-7 h-7 text-amber-400 mb-1" />
                      <span className="text-xs font-bold tracking-wider uppercase font-mono text-slate-200">
                        Card Frozen
                      </span>
                    </div>
                  )}
                </div>

                {/* Switcher Carousel list: Clicking selects active card */}
                <div className="flex items-center gap-2 max-w-full overflow-x-auto py-1">
                  {cards.map((c) => {
                    const isSelected = c.id === selectedCardId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCardId(c.id);
                          setRevealCardDigits(false);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {c.cardType} (•• {c.number.slice(-4)})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Actions controls for the actively showing card */}
              <div className="md:col-span-5 flex flex-col justify-center space-y-3.5 text-left">
                <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-405 font-mono uppercase">
                      Card Status
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-wide ${
                        activeCard?.status === "active"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                          : "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}
                    >
                      {activeCard?.status}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-slate-500 leading-normal font-medium">
                    This virtual card is directly linked sweep-style to your USD
                    balance. Charges deduct instantly.
                  </p>
                </div>

                {/* Options button grid */}
                <div className="grid grid-cols-1 gap-2">
                  {/* Reveal CVV / Numbers details */}
                  <button
                    onClick={() => setRevealCardDigits(!revealCardDigits)}
                    className="w-full bg-white hover:bg-slate-50/80 p-2.5 px-3 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {revealCardDigits ? (
                      <>
                        <EyeOff className="w-4 h-4 text-slate-500" />
                        <span>Hide Sensitive Info</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-slate-500" />
                        <span>Reveal details & CVV</span>
                      </>
                    )}
                  </button>

                  {/* Toggle Lock status */}
                  <button
                    onClick={() =>
                      toggleCardLock(activeCard?.id, activeCard?.status)
                    }
                    className="w-full bg-white hover:bg-slate-50/80 p-2.5 px-3 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-850 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {activeCard?.status === "active" ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-500" />
                        <span>Freeze / Block purchases</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-emerald-500" />
                        <span>Activate Card</span>
                      </>
                    )}
                  </button>

                  {/* Copy digits to clipboard */}
                  <button
                    onClick={() =>
                      copyTextToClipboard(activeCard?.number, "Card digits")
                    }
                    className="w-full bg-white hover:bg-slate-50/80 p-2.5 px-3 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Card Number</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Transactions section focusing exclusively on USD transactions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-950 tracking-tight text-left">
                Transactions
              </h3>

              {/* Search filter text row */}
              <div className="flex items-center gap-2 w-full sm:w-auto self-end">
                <div className="relative flex-1 sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 w-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 rounded-full focus:outline-none focus:border-slate-450 focus:ring-1 focus:ring-slate-300 transition-all placeholder-slate-400"
                  />
                </div>

                {/* Filters Dropdown trigger */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                      filterType !== "all"
                        ? "bg-[#006dda] text-slate-900 border-[#006dda]"
                        : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters</span>
                  </button>

                  <AnimatePresence>
                    {showFilterDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 z-30 bg-white border border-slate-200 p-2 rounded-xl shadow-lg w-40 text-left"
                      >
                        <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 font-mono">
                          Transaction Range
                        </div>
                        <button
                          onClick={() => {
                            setFilterType("all");
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "all" ? "bg-slate-100 text-[#000000]" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                          All activities
                        </button>
                        <button
                          onClick={() => {
                            setFilterType("inflow");
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "inflow" ? "bg-slate-100 text-[#000000]" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                          Inflows (+)
                        </button>
                        <button
                          onClick={() => {
                            setFilterType("outflow");
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "outflow" ? "bg-slate-100 text-[#000000]" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                          Outflows (-)
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* List block */}
            <div className="text-left">
              <span className="text-xs font-bold text-slate-400 block pb-3">
                {searchQuery ? "Search matches" : "Today"}
              </span>

              <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {filteredTransactions.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200"
                    >
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-slate-500">
                        No transactions found matching this query.
                      </p>
                    </motion.div>
                  ) : (
                    filteredTransactions.map((tx) => {
                      const isPositive = tx.amount > 0;
                      return (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between p-3 px-1 hover:bg-slate-50/55 rounded-2xl transition-colors select-none"
                        >
                          <div className="flex items-center gap-4">
                            {/* Round Action Icon identifier */}
                            <div className="w-10 h-10 rounded-full bg-slate-100/95 flex items-center justify-center text-slate-700 shrink-0">
                              {tx.type === "add" && (
                                <Plus className="w-4.5 h-4.5" />
                              )}
                              {tx.type === "send" && (
                                <ArrowUp className="w-4.5 h-4.5" />
                              )}
                              {tx.type === "receive" && (
                                <ArrowDown className="w-4.5 h-4.5" />
                              )}
                              {tx.type === "card_fee" && (
                                <CreditCard className="w-4.5 h-4.5 text-indigo-600" />
                              )}
                              {tx.type === "spend" && (
                                <Wallet className="w-4.5 h-4.5" />
                              )}
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                {tx.title}
                              </h4>
                              <p className="text-xs text-slate-500 font-semibold">
                                {tx.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`font-semibold tracking-tight text-sm font-mono ${
                                isPositive
                                  ? "text-emerald-700"
                                  : "text-slate-900"
                              }`}
                            >
                              {isPositive
                                ? `+ $${tx.amount.toLocaleString()}`
                                : `- $${Math.abs(tx.amount).toLocaleString()}`}{" "}
                              USD
                            </span>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAY DIALOGS SYSTEM */}
      <AnimatePresence>
        {interactiveMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInteractiveMode(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200/80 z-10 text-left space-y-5"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-slate-400">
                  {interactiveMode === "add" && "Load USD balance"}
                  {interactiveMode === "send" && "Send USD transfer"}
                  {interactiveMode === "receive" && "USD coordinates"}
                  {interactiveMode === "new_card" && "Issue New Elite Card"}
                  {interactiveMode === "more" && "Instant help & options"}
                </span>
                <button
                  onClick={() => setInteractiveMode(null)}
                  className="p-1 px-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ACTION CONTENT: Add Funds */}
              {interactiveMode === "add" && (
                <form onSubmit={handleAddConfirm} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Add to USD balance
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Instantly load funds securely via your linked Treasury
                      Reserve details.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold font-mono text-slate-600 block uppercase">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0.00"
                        value={inputAmount}
                        onChange={(e) => setInputAmount(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#006dda] font-mono font-bold"
                        required
                        autoFocus
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-slate-400">
                        USD
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#006dda] hover:bg-[#005ab4] text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirm Deposit Load
                  </button>
                </form>
              )}

              {/* ACTION CONTENT: Send Funds */}
              {interactiveMode === "send" && (
                <form onSubmit={handleSendConfirm} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Send USD Externally
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium font-semibold">
                      Initiate direct wire instructions from your USD account
                      balance.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Amount Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold font-mono text-[#000000] block uppercase">
                        Transfer Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 200.00"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#006dda] font-mono font-bold"
                          required
                          max={usdBalance}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-slate-400">
                          USD
                        </span>
                      </div>
                    </div>

                    {/* Recipient Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold font-mono text-slate-600 block uppercase">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Abraham T. Getahun"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none"
                        required
                      />
                    </div>

                    {/* Swift routing */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold font-mono text-slate-600 block uppercase">
                        Routing / SWIFT (Code)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CHASUS33XX"
                        value={recipientBankCode}
                        onChange={(e) => setRecipientBankCode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#006dda] hover:bg-[#005ab4] text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirm Transfer Discharge
                  </button>
                </form>
              )}

              {/* ACTION CONTENT: Receive / View account credentials coordinates */}
              {interactiveMode === "receive" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Your USD Bank Details
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                      Use these routing numbers to deposit external wire
                      transfers into your verified portfolio balance.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Bank Name */}
                    <div
                      onClick={() =>
                        copyTextToClipboard("JP Morgan Chase N.Y.", "Bank Name")
                      }
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="text-[8px] font-mono text-slate-400 block uppercase">
                          Bank Name
                        </span>
                        <span className="font-bold text-slate-800">
                          JP Morgan Chase N.Y.
                        </span>
                      </div>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Account Number */}
                    <div
                      onClick={() =>
                        copyTextToClipboard("4452-901-82910", "Account Number")
                      }
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="text-[8px] font-mono text-slate-400 block uppercase">
                          Account Number
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          445290182910
                        </span>
                      </div>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Routing Number */}
                    <div
                      onClick={() =>
                        copyTextToClipboard("021000021", "Routing Identifier")
                      }
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="text-[8px] font-mono text-slate-400 block uppercase">
                          ABA Routing transit
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          021000021
                        </span>
                      </div>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION CONTENT: Issue card dynamically */}
              {interactiveMode === "new_card" && (
                <form onSubmit={handleCreateCardConfirm} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Issue Virtual Debit Card
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Pay design fee, instantly bind digits, and add to your
                      live viewing portfolio.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Cardholder name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold font-mono text-slate-650 block uppercase">
                        Cardholder label
                      </label>
                      <input
                        type="text"
                        value={newCardHolder}
                        onChange={(e) => setNewCardHolder(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none"
                        required
                        maxLength={26}
                      />
                    </div>

                    {/* Finishes and Theme color */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold font-mono text-slate-650 block uppercase">
                        Form & Finish Selection
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { key: "charcoal", class: "bg-slate-900" },
                          { key: "gold", class: "bg-amber-500" },
                          { key: "indigo", class: "bg-indigo-650" },
                          { key: "emerald", class: "bg-emerald-700" },
                        ].map((theme) => (
                          <button
                            key={theme.key}
                            type="button"
                            onClick={() => setNewCardColor(theme.key as any)}
                            className={`p-2.5 rounded-xl border transition-all ${
                              newCardColor === theme.key
                                ? "border-indigo-600 bg-indigo-50/15"
                                : "border-slate-100 bg-slate-50"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full mx-auto ${theme.class} border border-white`}
                            ></div>
                            <span className="text-[8px] font-bold text-slate-500 block text-center mt-1 uppercase tracking-tight">
                              {theme.key}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card class Type selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold font-mono text-slate-650 block uppercase">
                        Elite Class Card Tier
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            key: "Elite Standard",
                            label: "Elite Standard",
                            fee: "$5 fee",
                          },
                          {
                            key: "Elite Voyager",
                            label: "Elite Voyager",
                            fee: "$15 fee",
                          },
                        ].map((tier) => (
                          <button
                            key={tier.key}
                            type="button"
                            onClick={() => setNewCardType(tier.key as any)}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              newCardType === tier.key
                                ? "border-slate-900 bg-slate-50"
                                : "border-slate-150 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xs font-bold block">
                              {tier.label}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                              {tier.fee}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#006dda] hover:bg-[#005ab4] text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Pay &amp; Deploy Card (Fee: $
                    {newCardType === "Elite Voyager" ? "15.00" : "5.00"})
                  </button>
                </form>
              )}

              {/* ACTION CONTENT: More options */}
              {interactiveMode === "more" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">
                      Direct Portal Quick Help
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Frequently accessed administrative resources:
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs font-semibold">
                    <button
                      onClick={() =>
                        alert(
                          "Regulations: Fully registered cash indices. Multi-layered hardware vaulting.",
                        )
                      }
                      className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl block cursor-pointer transition-colors"
                    >
                      Inspect Regulatory Compliance Info
                    </button>
                    <button
                      onClick={() => {
                        setInteractiveMode("new_card");
                      }}
                      className="w-full text-left p-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-100 rounded-xl block cursor-pointer transition-colors"
                    >
                      Apply &amp; Order Live Virtual Debit Card
                    </button>
                    <button
                      onClick={() => {
                        setInteractiveMode(null);
                        setUsdBalance(12480.0);
                        triggerToast("Demo state account balance reset!");
                      }}
                      className="w-full text-left p-2.5 text-center text-rose-650 hover:text-rose-800 border border-rose-100 hover:border-rose-200 rounded-xl block cursor-pointer transition-colors"
                    >
                      Reset Account Balance State
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
