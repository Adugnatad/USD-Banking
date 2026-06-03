import { ActiveView } from "@/types";
import { useState } from "react";

export default function CoworkingPartnerPage({
  onNavigate,
}: {
  onNavigate: (view: ActiveView) => void;
}) {
  const [formData, setFormData] = useState({
    spaceName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    spaceType: "",
    capacity: "",
    amenities: "",
    milesRate: "",
    membershipTypes: "",
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
    console.log("Coworking Partner Registration:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        spaceName: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        spaceType: "",
        capacity: "",
        amenities: "",
        milesRate: "",
        membershipTypes: "",
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
      <div className="relative z-10 max-w-5xl mx-auto px-12 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full px-3.5 py-1.5 mb-6">
            <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase">
              Coworking Space Partner Programme
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Turn Your Space Into a{" "}
            <em className="text-teal-300 not-italic">Miles Engine</em>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the ShebaMiles Digital Nomad Network. Earn miles pools for
            every member you onboard, receive USD settlement on memberships, and
            get ShebaMiles Hub status as you scale.
          </p>
          <div className="flex gap-3 justify-center mb-12">
            <button className="bg-gradient-to-r from-teal-600 to-teal-400 text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
              Register Your Space →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl font-bold text-white mb-2">500</div>
            <div className="text-xs text-gray-400">
              Miles per member onboarded to Nomad Card
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl font-bold text-amber-300 mb-2">USD</div>
            <div className="text-xs text-gray-400">
              FX POS settlement — no more birr conversion headaches
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-xs text-gray-400">
              Members unlocks "ShebaMiles Hub" brand status
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="relative z-10 max-w-5xl mx-auto px-12 pb-20">
        <div className="mb-12">
          <div className="text-xs font-semibold text-teal-300 tracking-widest uppercase mb-2">
            The Partnership Model
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400">
            From signing up to earning miles — a seamless pipeline that turns
            every desk into a card acquisition touchpoint.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              num: "1",
              title: "Register & Sign MoU",
              desc: "Fill out the partner form. Coop Bank reviews & issues MoU within 5 business days. FX POS terminal installed at your front desk.",
            },
            {
              num: "2",
              title: "Get Miles Pool Allocated",
              desc: "Coop credits your space with a miles referral pool. For every member you onboard onto the Nomad Card, 500 miles are gifted to them as a welcome bonus.",
            },
            {
              num: "3",
              title: "Onboard Your Members",
              desc: "Use your partner dashboard to invite members, track sign-ups, and download the digital onboarding kit — QR codes, posters, app links.",
            },
            {
              num: "4",
              title: "Earn & Grow Tier",
              desc: "Collect USD POS settlements for monthly memberships. Hit 50 members to unlock ShebaMiles Hub status — your brand in the Coop SuperApp.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white font-bold text-sm mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="relative z-10 max-w-5xl mx-auto px-12 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all  max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            Register Your Coworking Space
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join the ShebaMiles partner network and start earning miles for your
            members.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Registration Submitted!
              </h3>
              <p className="text-gray-400">
                We'll review your application and contact you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Space Name
                  </label>
                  <input
                    type="text"
                    name="spaceName"
                    value={formData.spaceName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                    placeholder="Your coworking space name"
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
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                  placeholder="Full address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Space Type
                  </label>
                  <select
                    name="spaceType"
                    value={formData.spaceType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                  >
                    <option value="">Select type</option>
                    <option value="dedicated-desk">Dedicated Desk</option>
                    <option value="hot-desk">Hot Desk</option>
                    <option value="private-office">Private Office</option>
                    <option value="meeting-rooms">Meeting Rooms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                    placeholder="Number of seats"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Key Amenities
                </label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                  placeholder="e.g., High-speed WiFi, Meeting Rooms, Coffee Bar..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Miles Earning Rate (%)
                  </label>
                  <input
                    type="number"
                    name="milesRate"
                    value={formData.milesRate}
                    onChange={handleChange}
                    placeholder="e.g., 3% on memberships"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Membership Types Offered
                  </label>
                  <input
                    type="text"
                    name="membershipTypes"
                    value={formData.membershipTypes}
                    onChange={handleChange}
                    placeholder="e.g., Monthly, Quarterly, Annual"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-teal-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all mt-6"
              >
                Submit Registration
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                By registering, you agree to the ShebaMiles Partner Agreement
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
