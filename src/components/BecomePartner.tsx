import { ArrowRight, Briefcase, Hotel } from "lucide-react";
import { ActiveView } from "@/types";

export default function BecomePartnerPage({
  onNavigate,
}: {
  onNavigate: (view: ActiveView) => void;
}) {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Become a Partner
          </h1>
          <p className="text-xl text-slate-400">
            Join our rewards network and start earning with Fly Rewards
          </p>
        </div>

        {/* Partner Options Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Coworking Card */}
          <a href="/become-partner-coworking">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10">
              {/* Accent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-lg bg-teal-500/10 p-3 ring-1 ring-teal-500/20 group-hover:bg-teal-500/20 group-hover:ring-teal-500/40">
                  <Briefcase className="h-8 w-8 text-teal-400" />
                </div>

                {/* Content */}
                <h2 className="mb-3 text-2xl font-bold text-white">
                  Coworking Spaces
                </h2>
                <p className="mb-6 text-slate-400">
                  Register your coworking or office space and offer premium
                  benefits to our members.
                </p>

                {/* Features */}
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    Earn miles per membership
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    Network with digital nomads
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    Instant USD settlements
                  </li>
                </ul>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-teal-400 group-hover:gap-3 transition-all duration-300">
                  <span className="font-semibold">Register Now</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </a>

          {/* Hotel/Lodge Card */}
          <a href="/become-partner-hotel">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10">
              {/* Accent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-lg bg-teal-500/10 p-3 ring-1 ring-teal-500/20 group-hover:bg-teal-500/20 group-hover:ring-teal-500/40">
                  <Hotel className="h-8 w-8 text-teal-400" />
                </div>

                {/* Content */}
                <h2 className="mb-3 text-2xl font-bold text-white">
                  Hotels & Lodges
                </h2>
                <p className="mb-6 text-slate-400">
                  Offer luxury accommodations to our members and receive rewards
                  redemptions at competitive rates.
                </p>

                {/* Features */}
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    2× miles on stays
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    Premium member access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-teal-400">✓</span>
                    Flexible payment terms
                  </li>
                </ul>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-teal-400 group-hover:gap-3 transition-all duration-300">
                  <span className="font-semibold">Register Now</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
          <h3 className="mb-6 text-xl font-bold text-white">Have Questions?</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-300">
                Need more information?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Email us at{" "}
                <a
                  href="mailto:partners@flyrewards.com"
                  className="text-teal-400 hover:text-teal-300"
                >
                  partners@flyrewards.com
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-300">
                Partnership support
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Call us at{" "}
                <a
                  href="tel:+1234567890"
                  className="text-teal-400 hover:text-teal-300"
                >
                  +1 (234) 567-8900
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
