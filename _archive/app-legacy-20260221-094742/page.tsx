"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, Check, Award, Star, Shield, Zap } from "lucide-react";
import casinosData from "@/data/casinos.json";

type Casino = {
  id: string;
  rank: number;
  name: string;
  logo: string;
  bonusHeadline: string;
  wagering: string;
  minDeposit: string;
  maxCashout: string;
  features: string[];
  ctaLink: string;
  color: string;
};

type Offer = {
  id: string;
  title: string;
  description: string;
  casino: string;
  expires: string;
  featured: boolean;
};

const faqs = [
  {
    question: "How do I claim a casino bonus?",
    answer: "To claim a casino bonus, simply click on the casino of your choice, register an account, make a deposit (if required), and the bonus will be automatically credited to your account. No code is needed!"
  },
  {
    question: "Are these casinos safe for South African players?",
    answer: "Yes! All casinos on our site are licensed and regulated by reputable authorities. We prioritize safety and only list casinos that are known for fairness and reliable payouts."
  },
  {
    question: "What are wagering requirements?",
    answer: "Wagering requirements are the number of times you need to play through your bonus amount before you can withdraw any winnings. Lower wagering requirements mean easier bonus conversion."
  },
  {
    question: "Can I play at multiple casinos at once?",
    answer: "Absolutely! There's no restriction on playing at multiple casinos. In fact, we encourage exploring different options to find the best games and bonuses for your preferences."
  },
  {
    question: "How often are the bonuses updated?",
    answer: "We review and update all bonuses weekly to ensure you always have access to the latest and greatest offers from South Africa's top casinos."
  }
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* WHITE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Hamburger Menu */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎰</span>
              <span className="font-bold text-xl text-gray-900 hidden sm:inline">FreeSpinsSA</span>
            </Link>

            {/* Sign Up Button (Blue) */}
            <Link
              href="/signup"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign Up
            </Link>

            {/* Mobile Sign Up */}
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden">
                <Link
                  href="/signup"
                  className="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="space-y-1">
                {[
                  { label: "All Casinos", href: "/all-casinos" },
                  { label: "Free Spins", href: "/free-spins" },
                  { label: "No Deposit", href: "/no-deposit" },
                  { label: "Mobile", href: "/mobile" },
                  { label: "Payment Methods", href: "/payment-methods" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Best Free Spins Casinos in <span className="text-yellow-300">South Africa</span> (2026)
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Compare top online casinos for free spins offers. No code needed, instant payouts, and the best bonuses in the industry.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#top-casinos"
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                See Top Casinos
              </Link>
              <Link
                href="/bonuses/free-spins"
                className="w-full sm:w-auto px-8 py-4 bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400/50 rounded-full font-semibold text-lg hover:bg-blue-500/40 transition-colors"
              >
                Browse All Bonuses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOP CASINOS */}
      <section id="top-casinos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Top Rated Casinos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've ranked the best casinos based on bonuses, payout speed, game selection, and player safety.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(casinosData as Casino[]).map((casino) => (
              <div
                key={casino.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg">
                    <span className="text-white font-bold text-lg">#{casino.rank}</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Casino Logo */}
                  <div className="mb-6">
                    <div className="h-16 flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <img
                        src={casino.logo}
                        alt={casino.name}
                        className="max-h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Bonus Headline */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {casino.bonusHeadline}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {casino.wagering} wagering • Min deposit {casino.minDeposit}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {casino.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={casino.ctaLink}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 py-3.5 font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md group-hover:shadow-lg"
                  >
                    PLAY NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/all-casinos"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-blue-600 font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View All Casinos
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WELCOME BONUS WORKS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How to Claim Your Welcome Bonus
              </h2>
              <p className="text-gray-600">Follow these simple steps to get started</p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Choose a Casino",
                  description: "Browse our top-rated casinos and select the one that suits your preferences."
                },
                {
                  step: "02",
                  title: "Create an Account",
                  description: "Sign up with your email and verify your identity. It takes just 2 minutes."
                },
                {
                  step: "03",
                  title: "Make a Deposit",
                  description: "Fund your account using any of the secure payment methods available."
                },
                {
                  step: "04",
                  title: "Start Playing",
                  description: "Your bonus is automatically credited. Start winning with extra funds!"
                }
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl z-10">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <div className="mt-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to start winning?</h3>
              <p className="mb-6 opacity-90">Join one of our top-rated casinos and claim your bonus today!</p>
              <Link
                href="#top-casinos"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Claim Your Bonus Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST BONUSES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Best Bonuses Available
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've selected the most attractive offers for South African players
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "No Deposit Bonus: Get R25 free just for signing up",
              "First Deposit Match: Up to 200% on your first deposit",
              "Weekly Free Spins: 25 spins every Friday at selected casinos",
              "Cashback Offers: Get 10% of your losses back every week",
              "High Roller Bonus: Exclusive offers for high-stakes players",
              "Mobile-Only Bonus: Special promotions for mobile gamers"
            ].map((bonus, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mt-1 min-w-[32px]">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600 fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{bonus}</h4>
                  <p className="text-sm text-gray-600">Available at participating casinos • Terms apply</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/bonuses"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-blue-600 font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View All Bonuses
            </Link>
          </div>
        </div>
      </section>

      {/* WHY USE US */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Use FreeSpinsSA?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to helping South African players find the best casino bonuses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted & Licensed</h3>
                  <p className="text-gray-600">
                    We only list casinos that are fully licensed and regulated. Your safety is our priority.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Code Needed</h3>
                  <p className="text-gray-600">
                    Our bonuses are automatically applied. No complex codes to remember or enter.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fastest Payouts</h3>
                  <p className="text-gray-600">
                    We recommend casinos known for quick and reliable withdrawals. Get your money fast.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Best Bonuses</h3>
                  <p className="text-gray-600">
                    We scour the market to find the most generous bonuses and promotions available.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Player-Focused</h3>
                  <p className="text-gray-600">
                    Our reviews are based on real player experiences, not casino marketing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Updated Daily</h3>
                  <p className="text-gray-600">
                    We verify all bonuses daily to ensure accuracy. What you see is what you get.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedFaq === index ? "max-h-96 py-4 border-t border-gray-100" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Have more questions?</p>
              <a
                href="mailto:support@freespinsa.co.za"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Our Support Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🎰</span>
                <span className="font-bold text-xl">FreeSpinsSA</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate destination for South African casino players. We help you find the best free spins, bonuses, and promotions from trusted online casinos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/all-casinos" className="hover:text-blue-400 transition-colors">
                    All Casinos
                  </Link>
                </li>
                <li>
                  <Link href="/free-spins" className="hover:text-blue-400 transition-colors">
                    Free Spins
                  </Link>
                </li>
                <li>
                  <Link href="/no-deposit" className="hover:text-blue-400 transition-colors">
                    No Deposit Bonus
                  </Link>
                </li>
                <li>
                  <Link href="/mobile" className="hover:text-blue-400 transition-colors">
                    Mobile Casinos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gambling" className="hover:text-blue-400 transition-colors">
                    Responsible Gambling
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-auto bg-gray-800 rounded border border-gray-700 flex items-center justify-center px-3 text-sm text-gray-400">
                  Ozow
                </div>
                <div className="h-10 w-auto bg-gray-800 rounded border border-gray-700 flex items-center justify-center px-3 text-sm text-gray-400">
                  SID
                </div>
                <div className="h-10 w-auto bg-gray-800 rounded border border-gray-700 flex items-center justify-center px-3 text-sm text-gray-400">
                  Visa
                </div>
                <div className="h-10 w-auto bg-gray-800 rounded border border-gray-700 flex items-center justify-center px-3 text-sm text-gray-400">
                  Mastercard
                </div>
                <div className="h-10 w-auto bg-gray-800 rounded border border-gray-700 flex items-center justify-center px-3 text-sm text-gray-400">
                  BTC
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © 2026 FreeSpinsCasinoZA.co.za — All rights reserved. 18+ only. Play responsibly.
              </p>
              <p className="text-sm text-gray-500 text-center md:text-right">
                This site contains affiliate links. We may receive a commission if you sign up via our links.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
