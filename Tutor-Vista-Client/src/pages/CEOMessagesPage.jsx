import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import founderPortraitImg from "../assets/ceo/founder-portrait-hd.jpg";

const CEOMessagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "founders_message_view" });
  }, []);

  return (
    <div className="w-full bg-surface text-on-surface font-body-md antialiased min-h-screen">
      <div className="flex flex-col w-full">
{/*  Top Navigation & Hero Section  */}
<section className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden" data-purpose="hero-cover">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
  <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="max-w-2xl">
        {/*  Breadcrumbs & Leadership status badge  */}
        <div className="flex items-center gap-2 mb-3 text-xs md:text-sm text-indigo-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="">/</span>
          <span className="text-white font-medium">Founder's Message</span>
          <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Executive Perspective &amp; Academic Vision
          </span>
        </div>
        {/*  Title  */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Building Bangladesh’s Most Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">1-on-1 Mentorship</span> Ecosystem
        </h1>
        {/*  Description  */}
        <p className="text-base sm:text-lg text-indigo-100/80 mb-6 leading-relaxed">
          A personal note from Syed Tanvir Rahman on why we started TutorBridge: reforming private tuition ethics, safeguarding students, and empowering varsity scholars nationwide.
        </p>
        {/*  CTAs & Trust Chips  */}
        <div className="flex flex-wrap items-center gap-3">
          <a href="#letter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all">
            Read Open Letter ↓
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
            🎓 BUET &amp; DU Alumni Founded
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
            🏛️ Govt. Reg #024881
          </span>
        </div>
      </div>
      {/*  Right Side Impact Card  */}
      <div className="hidden lg:block w-full max-w-sm shrink-0">
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Nationwide Mandate</span>
            <span className="text-xs text-indigo-300">Active 2026</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-white">100,000+</div>
            <div className="text-xs text-indigo-200">Students empowered across all 64 districts in Bangladesh</div>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-indigo-200 border-t border-white/10">
            <span className="">🛡️ 0% Advance Deposit</span>
            <span className="text-emerald-400 font-semibold">100% Vetted Tutors</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/*  Editorial Leadership Section (Asymmetric 2-Column Split)  */}
<section className="w-full py-12 lg:py-20 bg-surface" id="letter">
<div className="container mx-auto px-4 sm:px-6 lg:px-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
{/*  Left Column: Executive Bio & Verified Trust Card (5 Cols)  */}
<div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md transition-all hover:shadow-xl">
{/*  Portrait Image Frame  */}
<div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container mb-6 shadow-inner">
<img alt="Syed Tanvir Rahman, Founder &amp; CEO of TutorBridge BD" className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700" src={founderPortraitImg} />
{/*  Verified Overlay Badge  */}
<div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2.5 rounded-lg shadow-md flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[16px]">verified</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Verified EdTech Leader</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Govt Reg. #024881</span>
</div>
</div>
{/*  Profile Metadata Info  */}
<div className="space-y-3">
<div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Syed Tanvir Rahman
                </h3>
<p className="font-label-lg text-label-lg text-primary font-semibold">
                  Founder &amp; Chief Executive Officer, TutorBridge BD
                </p>
</div>
{/*  Qualifications & Credentials Tags  */}
<div className="p-3.5 rounded-lg bg-surface-container-low space-y-1.5">
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px] text-primary">school</span>
<span className="">B.Sc (Engr.), MBA (IBA, University of Dhaka)</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px] text-secondary">workspace_premium</span>
<span className="">Former University Lecturer &amp; EdTech Strategist</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px] text-tertiary">location_city</span>
<span className="">Dhaka, Bangladesh</span>
</div>
</div>
{/*  Direct Contact Buttons  */}
<div className="pt-2 flex flex-col gap-2">
<a className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-tertiary-container shadow-sm hover:shadow transition-all" href="mailto:tanvir@tutorbridgebd.com">
<span className="material-symbols-outlined text-[18px]">mail</span>
<span className="">Email Office of CEO: tanvir@tutorbridgebd.com</span>
</a>
<div className="grid grid-cols-2 gap-2">
<a className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" href="#">
<span className="material-symbols-outlined text-[16px]">link</span>
<span className="">LinkedIn Profile</span>
</a>
<a className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" href="#">
<span className="material-symbols-outlined text-[16px]">article</span>
<span className="">Founder's Notes</span>
</a>
</div>
</div>
</div>
</div>
{/*  Highlight Accent Quote Card  */}
<div className="p-6 rounded-xl bg-gradient-to-br from-primary-container to-tertiary text-on-primary shadow-lg relative overflow-hidden">
<span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[100px] text-on-primary/10 select-none pointer-events-none">format_quote</span>
<div className="relative z-10 space-y-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed">Cultural Reality</span>
<p className="font-headline-sm text-headline-sm font-semibold italic leading-snug">
                "In Bangladesh, a tutor is never just an instructor—they are an elder brother, a mentor, an academic anchor, and a guiding beacon for whole families."
              </p>
</div>
</div>
</div>
{/*  Right Column: The Founder's Letter & Manifesto (7 Cols)  */}
<div className="lg:col-span-7 space-y-8">
{/*  Editorial Pull Quote  */}
<div className="p-8 rounded-xl bg-surface-container-low shadow-sm relative">
<span className="material-symbols-outlined text-primary-container text-5xl leading-none block mb-3">format_quote</span>
<blockquote className="font-headline-md text-headline-md text-on-surface font-semibold leading-relaxed">
              "Education is far more than just test scores and GPA-5. It is the bridge between a student’s undiscovered potential and their lifelong confidence. When a learner is paired with an inspiring, empathetic mentor, learning ceases to be a burden and becomes a catalyst for transformation."
            </blockquote>
</div>
{/*  Letter Chapter 1  */}
<div className="space-y-4">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold font-label-md text-label-md">01</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">The Disconnect That Sparked TutorBridge</h2>
</div>
<div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
<p className="">
                In early 2021, while mentoring university students in Dhaka and speaking with countless parents, I uncovered an uncomfortable paradox in Bangladesh’s academic fabric. Guardians spent endless weeks anxiously sifting through unverified Facebook group postings, dubious neighbourhood flyers, and unvetted local brokers—often with zero verification, zero background accountability, and immense fear for student safety.
              </p>
<p className="">
                Simultaneously, brilliant undergraduates from institutions like BUET, Dhaka University, DMC, and IBA were being ruthlessly exploited. Unlicensed coaching middlemen regularly extracted up to 60-80% of an undergraduate’s first-month honorarium, treating exceptional academic talent like cheap commodities. Both sides—worried guardians and dedicated young scholars—were being failed by an outdated, opaque ecosystem.
              </p>
<p className="">
                We asked ourselves a simple yet audacious question: <em>What if finding a vetted, dignified private mentor in Bangladesh could be as reliable, transparent, and structured as booking an international flight or choosing an accredited academy?</em> That singular question gave birth to TutorBridge BD.
              </p>
</div>
</div>
{/*  Letter Chapter 2  */}
<div className="space-y-4 pt-4">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold font-label-md text-label-md">02</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Our Three Unshakable Pillars</h2>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              From our very first matched tuition in Dhanmondi to over 100,000 learning interactions nationwide today, we have refused to compromise on three foundational tenets:
            </p>
<div className="grid grid-cols-1 gap-4 pt-2">
{/*  Pillar Card 1  */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]">verified_user</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">100% Background-Vetted Mentors</h4>
<p className="font-body-md text-body-md text-on-surface-variant">
                    Every tutor on our platform undergoes national identity (NID) screening, university enrollment cross-checks, and our proprietary pedagogical readiness interview before ever stepping foot into a family's home or virtual classroom.
                  </p>
</div>
</div>
{/*  Pillar Card 2  */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Zero Exploitation &amp; Fair Pay</h4>
<p className="font-body-md text-body-md text-on-surface-variant">
                    We abolished exorbitant broker commissions. Our tutors retain transparent honorariums on predictable schedules, allowing them to tutor with pride, financial peace, and genuine emotional investment in their pupils.
                  </p>
</div>
</div>
{/*  Pillar Card 3  */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]">family_restroom</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Guardian Peace of Mind &amp; 1-Day Trial</h4>
<p className="font-body-md text-body-md text-on-surface-variant">
                    We know that chemistry matters. Parents can evaluate a matched tutor in a live trial session with zero obligation. If the rapport isn't magical, our team re-matches immediately without friction or cost.
                  </p>
</div>
</div>
</div>
</div>
{/*  Letter Chapter 3  */}
<div className="space-y-4 pt-4">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold font-label-md text-label-md">03</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Looking Forward to 2026 and Beyond</h2>
</div>
<div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
<p className="">
                Today, our vision reaches far beyond major hubs like Dhaka and Chattogram. Through intelligent, proximity-based matching algorithms and low-latency virtual whiteboard integration, we are actively closing the urban-rural academic divide, bringing master-level instruction in Calculus, Physics, English, and Programming to students in Sylhet, Rajshahi, Barishal, Khulna, and beyond.
              </p>
<p className="">
                To our respected parents: thank you for welcoming us into your homes and placing your trust in our educators. To our tutors: you are the heartbeat of this institution; your passion shapes the future engineers, scientists, and changemakers of Bangladesh.
              </p>
</div>
</div>
{/*  Sign-Off & Handwritten Stylized Signature  */}
<div className="pt-8 space-y-4">
<p className="font-body-lg text-body-lg text-on-surface font-medium">Warmly and respectfully yours,</p>
<div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="space-y-1">
{/*  Handwritten Stylized Display Signature  */}
<div className="text-3xl font-extrabold text-primary tracking-wide italic select-none" style={{ fontFamily: "'Plus Jakarta Sans', cursive" }}>
                  Syed Tanvir Rahman
                </div>
<p className="font-label-lg text-label-lg font-semibold text-on-surface">Syed Tanvir Rahman</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Founder &amp; Chief Executive Officer • TutorBridge BD</p>
</div>
<div className="flex flex-col sm:items-end text-on-surface-variant">
<span className="font-label-md text-label-md font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">verified</span> Corporate Seal
                </span>
<span className="font-label-sm text-label-sm">Dhaka, Bangladesh • Academic Year 2026</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Interactive 3-Card Bento Grid: Our Guiding Pillars  */}
<section className="w-full py-16 bg-surface-container-low">
<div className="container mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
<div className="text-center max-w-2xl mx-auto space-y-3">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Our Philosophy</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">The Foundations of Every Match We Make</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Engineered to create lasting academic outcomes while maintaining absolute safety and empathy.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/*  Pillar Card 1  */}
<div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[24px]">school</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Universal Educational Access</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Connecting students across all 64 districts with verified subject-specialists tailored for Bangla Medium, English Medium &amp; Version, and Competitive Varsity Admissions.
            </p>
</div>
<div className="pt-6 mt-6 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Active Learners</span>
<span className="font-headline-sm text-headline-sm font-extrabold text-primary">100,000+</span>
</div>
</div>
{/*  Pillar Card 2  */}
<div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[24px]">favorite</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Compassionate &amp; Dignified Mentorship</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Empowering mentors to nurture critical thinking, problem-solving habits, and emotional self-confidence well beyond rote textbook memorization.
            </p>
</div>
<div className="pt-6 mt-6 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Vetted Scholars</span>
<span className="font-headline-sm text-headline-sm font-extrabold text-secondary">24,000+</span>
</div>
</div>
{/*  Pillar Card 3  */}
<div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
<div className="space-y-4">
<div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[24px]">security</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Institutional Safety &amp; Zero Risk</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Government-registered protection, 1-day free trial sessions, 100% honorarium security, and a dedicated 24/7 guardian and female tutor safety concierge.
            </p>
</div>
<div className="pt-6 mt-6 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Guardian Trust</span>
<span className="font-headline-sm text-headline-sm font-extrabold text-primary-container">99.2%</span>
</div>
</div>
</div>
</div>
</section>
{/*  Real Impact Metric Ribbon: By The Numbers  */}
<section className="w-full py-16 bg-surface">
<div className="container mx-auto px-4 sm:px-6 lg:px-12">
<div className="p-8 lg:p-12 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed font-bold">Empirical Proof</span>
<h3 className="font-headline-lg text-headline-lg font-bold text-inverse-on-surface mt-1">
              By the Numbers — Real Impact Across Bangladesh
            </h3>
</div>
<div className="flex items-center gap-3">
<span className="px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">trending_up</span> Real-time Verified Audit
            </span>
</div>
</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
{/*  Metric 1  */}
<div className="space-y-2">
<div className="font-display-hero text-display-hero font-extrabold text-surface-lowest tracking-tight">
              100K<span className="text-secondary-fixed">+</span>
</div>
<p className="font-headline-sm text-headline-sm font-semibold text-surface-container-highest">Students Mentored</p>
<p className="font-body-sm text-body-sm text-surface-variant/80">From Class 1 through HSC, O/A Levels, and University Admissions.</p>
</div>
{/*  Metric 2  */}
<div className="space-y-2">
<div className="font-display-hero text-display-hero font-extrabold text-surface-lowest tracking-tight">
              24,000<span className="text-primary-fixed">+</span>
</div>
<p className="font-headline-sm text-headline-sm font-semibold text-surface-container-highest">University Educators</p>
<p className="font-body-sm text-body-sm text-surface-variant/80">BUET, DU, IBA, DMC, RUET, CUET, SUST, and leading top-tier scholars.</p>
</div>
{/*  Metric 3  */}
<div className="space-y-2">
<div className="font-display-hero text-display-hero font-extrabold text-surface-lowest tracking-tight">
              ৳4.8<span className="text-secondary-fixed">Cr+</span>
</div>
<p className="font-headline-sm text-headline-sm font-semibold text-surface-container-highest">Paid to Scholars</p>
<p className="font-body-sm text-body-sm text-surface-variant/80">Direct honorariums channeled with zero exploitative agent cuts.</p>
</div>
{/*  Metric 4  */}
<div className="space-y-2">
<div className="font-display-hero text-display-hero font-extrabold text-surface-lowest tracking-tight">
              64<span className="text-primary-fixed">/64</span>
</div>
<p className="font-headline-sm text-headline-sm font-semibold text-surface-container-highest">Districts Reached</p>
<p className="font-body-sm text-body-sm text-surface-variant/80">Bridging the academic divide from metropolitan hubs to upazilas.</p>
</div>
</div>
</div>
</div>
</section>
{/*  Open Door & Direct Engagement CTA Banner  */}
<section className="w-full py-16 lg:py-24 bg-surface-container-low">
<div className="container mx-auto px-4 sm:px-6 lg:px-12">
<div className="p-8 lg:p-14 rounded-xl bg-gradient-to-r from-surface-container to-surface-container-highest shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
<div className="space-y-3 max-w-2xl text-left">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm">
<span className="material-symbols-outlined text-[16px]">door_front</span>
            Open Leadership Policy
          </div>
<h3 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            Have a question or proposal for our leadership team?
          </h3>
<p className="font-body-lg text-body-lg text-on-surface-variant">
            Whether you are a school principal seeking curriculum partnerships, a concerned guardian with feedback, or a student leader from any university—our office doors are always open.
          </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
<Link className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-tertiary-container shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"  to="/contact">
<span className="">Schedule Conversation with Academic Team</span>
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
</Link>
<Link className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"  to="/apply-tutor">
<span className="">Apply as Verified Tutor</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>
</div>
    </div>
  );
};

export default CEOMessagesPage;
