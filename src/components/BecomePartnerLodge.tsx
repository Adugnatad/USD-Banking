"use client";

import { ActiveView } from "@/types";
import { useState } from "react";

export default function LodgePartnerPage({
  onNavigate,
}: {
  onNavigate: (view: ActiveView) => void;
}) {
  const [formData, setFormData] = useState({
    lodgeName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    lodgeType: "",
    rooms: "",
    amenities: "",
    milesRate: "",
    specialOffers: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lodge Partner Registration:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        lodgeName: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        lodgeType: "",
        rooms: "",
        amenities: "",
        milesRate: "",
        specialOffers: "",
      });
    }, 2000);
  };

  return (
    <div
      className="min-h-screen bg-[#0A1628]"
      style={{
        background: `linear-gradient(135deg, #0A1628 0%, #0F1E38 50%), 
        radial-gradient(ellipse 60% 40% at 10% 20%, rgba(0,123,110,0.15) 0%, transparent 60%),
        radial-gradient(ellipse 50% 30% at 90% 80%, rgba(201,168,76,0.08) 0%, transparent 50%)`,
      }}
    >
      {/* Hero Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-14 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-teal-600/15 border border-teal-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
              🌿 Dine for Ethiopia Initiative
            </span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
            Ethiopia&apos;s{" "}
            <em className="text-teal-400 not-italic">Most Breathtaking</em>
            <br />
            Lodges, Miles-Eligible
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            For lodge operators — join the ShebaMiles Nomad Escapes network.
            Receive special Nomad Card pricing, direct bookings, and earn 2×
            miles for your guests on every stay. For nomads — find your next
            workation.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/40 transition-all">
              Register Your Lodge →
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="flex-1 bg-white/5 px-6 py-6 text-center backdrop-blur-md">
            <div className="text-4xl font-bold text-teal-400 mb-2">2×</div>
            <div className="text-sm text-gray-300">
              Miles on every booking paid via Nomad Card
            </div>
          </div>
          <div className="flex-1 bg-white/5 px-6 py-6 text-center backdrop-blur-md border-l border-white/10">
            <div className="text-4xl font-bold text-teal-400 mb-2">6</div>
            <div className="text-sm text-gray-300">
              Partner lodges across Ethiopia
            </div>
          </div>
          <div className="flex-1 bg-white/5 px-6 py-6 text-center backdrop-blur-md border-l border-white/10">
            <div className="text-4xl font-bold text-teal-400 mb-2">4</div>
            <div className="text-sm text-gray-300">
              Domestic trips = 1 int&apos;l award ticket
            </div>
          </div>
          <div className="flex-1 bg-white/5 px-6 py-6 text-center backdrop-blur-md border-l border-white/10">
            <div className="text-4xl font-bold text-teal-400 mb-2">USD</div>
            <div className="text-sm text-gray-300">
              FX settlement for Nomad Card payments
            </div>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-14 pb-20">
        <div className="mb-12">
          <div className="text-xs font-semibold text-teal-400 tracking-widest uppercase mb-3">
            Lodge Partnership Perks
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            What Your Lodge Gets
          </h2>
          <p className="text-gray-300">
            This isn&apos;t just a referral scheme. It&apos;s a full partnership
            that solves real operational pain points.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              2× Miles on Bookings
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Every guest who books with their Nomad Card earns 2× ShebaMiles.
              Your lodge becomes a miles multiplier destination.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Automatic
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">💵</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              USD Settlement
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Get paid directly in USD via FX-enabled Nomad Card payments. No
              birr conversion headaches, just clean settlement.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Direct Payment
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              Nomad Escapes Feature
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your lodge featured in the ShebaMiles Nomad Escapes marketplace.
              Featured listing reaches thousands of remote workers.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Visibility
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              Partner Dashboard
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Real-time analytics on bookings, miles distributed, guest
              insights, and revenue performance tracking.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Analytics
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              Direct Bookings
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Nomad Card holders get priority booking access and preferred
              rates. Build direct relationships with quality guests.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Bookings
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-bold text-white mb-2 text-lg">
              Brand Partnership Status
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Become a verified ShebaMiles Nomad Escape — exclusive badge on all
              platforms and co-marketing opportunities.
            </p>
            <span className="inline-block mt-4 bg-teal-600/20 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold">
              Branding
            </span>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="relative z-10 max-w-5xl mx-auto px-14 pb-20">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Register Your Lodge
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Join the Nomad Escapes network and start earning 2× miles for
                your guests.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Registration Submitted!
                  </h3>
                  <p className="text-gray-400">
                    We&apos;ll review your application and contact you within 48
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Lodge Name
                      </label>
                      <input
                        type="text"
                        name="lodgeName"
                        value={formData.lodgeName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                        placeholder="Your lodge name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                        placeholder="+251..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-green-400 outline-none transition-colors"
                      placeholder="Region, Zone, Area"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Lodge Type
                      </label>
                      <select
                        name="lodgeType"
                        value={formData.lodgeType}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                      >
                        <option value="">Select type</option>
                        <option value="eco">Eco Lodge</option>
                        <option value="luxury">Luxury Resort</option>
                        <option value="heritage">Heritage Hotel</option>
                        <option value="boutique">Boutique Lodge</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Number of Rooms
                      </label>
                      <input
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                        placeholder="Total rooms"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Key Amenities & Features
                    </label>
                    <textarea
                      name="amenities"
                      value={formData.amenities}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-green-400 outline-none transition-colors"
                      placeholder="e.g., WiFi, AC, Restaurant, Hot springs, Spa..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Standard Nightly Rate (USD)
                      </label>
                      <input
                        type="number"
                        name="milesRate"
                        value={formData.milesRate}
                        onChange={handleChange}
                        placeholder="e.g., 120"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Special Nomad Card Offer
                      </label>
                      <input
                        type="text"
                        name="specialOffers"
                        value={formData.specialOffers}
                        onChange={handleChange}
                        placeholder="e.g., 15% discount on 3+ nights"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/40 transition-all mt-6"
                  >
                    Submit Registration
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    By registering, you agree to the ShebaMiles Lodge Partner
                    Agreement
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4 text-base">
                ⏱️ Partnership Timeline
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Application Review
                  </div>
                  <div className="text-xs text-gray-400">3-5 business days</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    MoU Signing
                  </div>
                  <div className="text-xs text-gray-400">2-3 business days</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    System Integration
                  </div>
                  <div className="text-xs text-gray-400">1-2 business days</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Live & Earning
                  </div>
                  <div className="text-xs text-gray-400">Ready to go</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4 text-base">
                📞 Need Help?
              </h4>
              <p className="text-sm text-gray-300 mb-4">
                Our partnership team is here to answer questions and guide you
                through the process.
              </p>
              <button className="w-full border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all">
                Contact Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
