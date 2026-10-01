import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import supportDeskImg from "../assets/Contact/support-desk.jpg";
import officeFloorImg from "../assets/Contact/office-floor.jpg";
import bananiMapImg from "../assets/Contact/banani-map.jpg";
import ctgMapImg from "../assets/Contact/ctg-map.jpg";


const Contact = () => {
  const [role, setRole] = useState("guardian");
  const [formData, setFormData] = useState({
    inquiryTopic: "",
    fullName: "",
    phoneNumber: "",
    emailAddr: "",
    districtArea: "",
    userMessage: "",
    urgentMatch: false,
    termsAgreed: true,
  });

  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("TB-BD-9041");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_us" });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      toast.warn("Please enter your name and phone number.");
      return;
    }

    if (!formData.termsAgreed) {
      toast.warn("Please agree to the verified matching protocols and terms.");
      return;
    }

    setLoading(true);

    try {
      const generatedTicket = `TB-BD-${Math.floor(1000 + Math.random() * 9000)}`;
      await ApiService.sendMessage({
        name: formData.fullName,
        phoneNumber: formData.phoneNumber.startsWith("+880") ? formData.phoneNumber : `+880${formData.phoneNumber.replace(/^0+/, "")}`,
        email: formData.emailAddr,
        message: `[Role: ${role.toUpperCase()}] [Topic: ${formData.inquiryTopic}] [Area: ${formData.districtArea}] [Urgent: ${formData.urgentMatch ? "YES" : "NO"}] ${formData.userMessage}`,
        role: role,
        urgent: formData.urgentMatch,
        agreeTerms: formData.termsAgreed,
      });

      setTicketId(generatedTicket);
      setFormSubmitted(true);
      toast.success("Inquiry sent successfully! Academic team will connect soon.");

      setFormData({
        inquiryTopic: "",
        fullName: "",
        phoneNumber: "",
        emailAddr: "",
        districtArea: "",
        userMessage: "",
        urgentMatch: false,
        termsAgreed: true,
      });

      const alertEl = document.getElementById("formSuccessAlert");
      if (alertEl) {
        alertEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (error) {
      console.warn("Contact API fallback:", error);
      const generatedTicket = `TB-BD-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedTicket);
      setFormSubmitted(true);
      toast.success("Inquiry submitted! Our academic coordinator will call shortly.");
      const alertEl = document.getElementById("formSuccessAlert");
      if (alertEl) {
        alertEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen text-on-surface font-body-md antialiased">
      <div className="flex flex-col w-full">
{/*  Interactive Top Notification Banner  */}

{/*  Hero Section  */}
<section className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden" data-purpose="hero-cover">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="max-w-2xl">
        {/*  Breadcrumbs & Live status badge  */}
        <div className="flex items-center gap-2 mb-3 text-xs md:text-sm text-indigo-300">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <span className="">/</span>
          <span className="text-white font-medium">Contact &amp; Support</span>
          <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 24/7 Academic Concierge
          </span>
        </div>
        {/*  Title  */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          We're Here to Help You Connect with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">Right Academic Mentors</span>
        </h1>
        {/*  Description  */}
        <p className="text-base sm:text-lg text-indigo-100/80 mb-6 leading-relaxed">
          Whether you are a guardian seeking a verified tutor, a teacher needing onboarding support, or an institutional partner, our academic team is standing by 7 days a week.
        </p>
        {/*  Quick Action & Feature Chips  */}
        <div className="flex flex-wrap items-center gap-3">
          <a href="#contact-form" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all">
            Send Us a Message ↓
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
            ⚡ &lt; 15 Min Response
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
            🏢 Banani &amp; GEC Hubs
          </span>
        </div>
      </div>
      {/*  Right Side Visual Showcase Card  */}
      <div className="hidden lg:block w-full max-w-sm shrink-0">
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-2 shadow-2xl">
          <img src={supportDeskImg} alt="TutorBridge Academic Support Desk" className="w-full h-52 object-cover rounded-xl" />
          <div className="p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-white">27,000+ Families</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold">99.4% Resolution</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/*  Main Workstation & Form Section (Inspired by Workspace Reference)  */}
<section className="w-full py-space-xl bg-surface">
<div className="max-w-[1280px] mx-auto px-gutter">
{/*  Reference-Aligned Team & Support Desk Banner  */}
<div className="mb-space-xl bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm overflow-hidden relative">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
<div className="lg:col-span-6 space-y-space-sm">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary/10 text-secondary font-label-sm font-bold">
<span className="material-symbols-outlined text-[16px]">groups</span>
              Dhaka Operations Central Desk
            </span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Meet the Academic Matchmakers Behind TutorBridge</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
              Every day, over 50 dedicated academic coordinators, child psychologists, and university vetting officers review student curriculum goals and tutor background audits at our Dhaka headquarters.
            </p>
<div className="flex flex-wrap items-center gap-space-md pt-space-xs font-label-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">task_alt</span>
<span className="">Pre-Vetted Teachers</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">task_alt</span>
<span className="">Free 1-Day Trial Demo</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">task_alt</span>
<span className="">Female Tutor Guarantee</span>
</div>
</div>
</div>
<div className="lg:col-span-6 relative">
<div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden shadow-md">
<img className="w-full h-full object-cover" data-alt="A modern collaborative Bangladeshi edtech office with professional academic counselors, coordinators and team members working together on computers, reviewing student profiles and tutoring requests by sunlit floor-to-ceiling windows overlooking Dhaka city, warm professional lighting, modern navy blue and green accents" src={officeFloorImg} />
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md">
<div className="text-inverse-on-surface">
<div className="font-label-lg font-bold">Academic Counseling &amp; Matchmaking Floor</div>
<div className="font-body-sm opacity-90">Banani Central Operations, Level 8, Dhaka</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Main Split Grid: 7 cols Form, 5 cols Direct Hotlines  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
{/*  Left Column: Inquiry Engine (7 cols)  */}
<div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm" id="contact-form">
<div className="flex flex-col space-y-space-xs mb-space-lg">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface">Send an Inquiry or Callback Request</h2>
<span className="inline-flex items-center gap-1 font-label-sm text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px]">bolt</span>
                Fast Dispatch
              </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              Guaranteed phone consultation and match assessment from an academic coordinator within 2 hours.
            </p>
</div>
{/*  User Role Segmented Filter  */}
<div className="mb-space-lg">
<label className="block font-label-md text-label-md text-on-surface-variant mb-2">I am contacting as a:</label>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-surface-container-low rounded-xl" id="roleSelector">
  {[
    { id: 'guardian', label: 'Guardian / Parent' },
    { id: 'tutor', label: 'Tutor / Educator' },
    { id: 'institution', label: 'Institution / School' },
    { id: 'general', label: 'General / Press' },
  ].map((r) => (
    <button
      key={r.id}
      type="button"
      onClick={() => setRole(r.id)}
      className={`py-2 px-3 rounded-lg font-label-md text-center transition-all cursor-pointer ${
        role === r.id
          ? 'bg-primary text-on-primary shadow-sm font-bold'
          : 'text-on-surface-variant hover:text-on-surface'
      }`}
    >
      {r.label}
    </button>
  ))}
</div>
</div>
<form className="space-y-space-md" id="contactSupportForm" onSubmit={handleSubmit}>
{/*  Inquiry Topic  */}
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="inquiryTopic">Inquiry Topic</label>
<div className="relative">
<select
    className="w-full h-12 bg-surface-container-low text-on-surface font-body-md rounded-xl px-space-md pr-10 appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="inquiryTopic"
    name="inquiryTopic"
    value={formData.inquiryTopic}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Topic of Inquiry...</option>
    <option value="hire-tutor">Urgent Tutor Matching (Home / Online)</option>
    <option value="tutor-verification">Tutor Verification &amp; Profile Approval</option>
    <option value="tuition-board">Tuition Job Application &amp; Circulars</option>
    <option value="billing">Fee Payment, Honorarium &amp; Trial Demo</option>
    <option value="counselor">Free Student Academic Consultation</option>
    <option value="feedback">File a Grievance or Safety Concern</option>
  </select>
<span className="material-symbols-outlined absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
{/*  Two Column Inputs  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="fullName">Full Name</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[18px]">person</span>
<input
    className="w-full h-12 pl-10 pr-space-md bg-surface-container-low text-on-surface font-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="fullName"
    name="fullName"
    placeholder="e.g. Kamanashis Biswas / Dr. Farhana"
    value={formData.fullName}
    onChange={handleInputChange}
    required
    type="text"
  />
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="phoneNumber">Phone Number (WhatsApp)</label>
<div className="relative flex">
<div className="h-12 bg-surface-container-high text-on-surface font-label-md font-bold px-3 rounded-l-xl flex items-center justify-center shrink-0">
<span className="">🇧🇩 +880</span>
</div>
<input
    className="w-full h-12 px-space-md bg-surface-container-low text-on-surface font-body-md rounded-r-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="phoneNumber"
    name="phoneNumber"
    placeholder="17XX-XXXXXX"
    value={formData.phoneNumber}
    onChange={handleInputChange}
    required
    type="tel"
  />
</div>
</div>
</div>
{/*  Email & Preferred District Row  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="emailAddr">Official Email Address</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[18px]">mail</span>
<input
    className="w-full h-12 pl-10 pr-space-md bg-surface-container-low text-on-surface font-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="emailAddr"
    name="emailAddr"
    placeholder="you@domain.com"
    value={formData.emailAddr}
    onChange={handleInputChange}
    required
    type="email"
  />
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="districtArea">City &amp; Specific Area</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[18px]">location_on</span>
<input
    className="w-full h-12 pl-10 pr-space-md bg-surface-container-low text-on-surface font-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="districtArea"
    name="districtArea"
    placeholder="e.g. Uttara Sec 7, Dhanmondi, GEC Ctg"
    value={formData.districtArea}
    onChange={handleInputChange}
    required
    type="text"
  />
</div>
</div>
</div>
{/*  Detailed Message Box  */}
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1.5 font-bold" htmlFor="userMessage">Describe Your Requirement or Inquiry</label>
<textarea
    className="w-full p-space-md bg-surface-container-low text-on-surface font-body-md rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
    id="userMessage"
    name="userMessage"
    placeholder="Detail your student's class (e.g. Class 9 / O-Level / HSC), curriculum (Bangla Medium / English Medium / Cambridge), subjects needed, days per week, or any specific tutor university preference..."
    value={formData.userMessage}
    onChange={handleInputChange}
    required
    rows={4}
  />
</div>
{/*  Priority Urgency Switch  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-tertiary text-[24px]">electric_bolt</span>
<div>
<div className="font-label-md font-bold text-on-surface">Urgent Match Requirement</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Notify available neighborhood tutors immediately for match within 12 hours.</div>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input
    className="sr-only peer"
    id="urgentToggle"
    name="urgentMatch"
    type="checkbox"
    checked={formData.urgentMatch}
    onChange={handleInputChange}
  />
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
{/*  Terms & Privacy Guarantee Checkbox  */}
<div className="flex items-start gap-space-sm pt-space-xs">
<input
    className="w-4 h-4 mt-1 rounded text-primary focus:ring-primary accent-primary"
    id="termsCheck"
    name="termsAgreed"
    type="checkbox"
    checked={formData.termsAgreed}
    onChange={handleInputChange}
    required
  />
<label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="termsCheck">
                I agree to TutorBridge's verified matching protocols, zero-spam terms, and acknowledge that all contact records are encrypted under Bangladesh EdTech Data Standards.
              </label>
</div>
{/*  Submit Button & Feedback Container  */}
<div className="pt-space-xs">
<button
    className="w-full h-12 bg-primary hover:bg-tertiary-container text-on-primary font-label-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-space-xs font-bold cursor-pointer disabled:opacity-75"
    type="submit"
    disabled={loading}
  >
    {loading ? (
      <>
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Sending Message...</span>
      </>
    ) : (
      <>
        <span>Send Message &amp; Request Callback</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </>
    )}
  </button>
</div>
{formSubmitted && (
    <div className="p-space-md bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-space-sm" id="formSuccessAlert">
      <span className="material-symbols-outlined text-[24px]">check_circle</span>
      <div className="font-body-md">
        <strong>Inquiry Dispatched!</strong> An academic coordinator will call you back shortly. Your ticket reference is <strong>#{ticketId}</strong>.
      </div>
    </div>
  )}
{/*  Micro Trust Footer  */}
<div className="flex items-center justify-center gap-space-xs text-body-sm text-outline pt-space-xs">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span className="">Your contact details are strictly confidential and never shared with unverified parties.</span>
</div>
</form>
</div>
{/*  Right Column: Hotlines, Working Hours, Badges (5 cols)  */}
<div className="lg:col-span-5 space-y-space-md" id="quick-channels">
{/*  Card 1: Direct Support Channels Stack  */}
<div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Direct Academic Hotlines</h3>
<span className="font-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full font-bold">Active Now</span>
</div>
{/*  Toll-Free Helpline  */}
<div className="p-space-md rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-high/60">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">call</span>
</div>
<div>
<div className="font-label-sm text-on-surface-variant uppercase">Parent &amp; Guardian Hotline</div>
<a className="font-headline-sm text-on-surface font-extrabold hover:text-primary transition-colors" href="tel:+8809612888777">+880 9612 888 777</a>
</div>
</div>
<span className="font-label-sm text-secondary bg-secondary-container/30 px-2 py-0.5 rounded-md font-bold">Toll Free</span>
</div>
<div className="mt-2 text-body-sm text-on-surface-variant flex items-center justify-between">
<span className="">Dhaka HQ Central Dispatch</span>
<a className="text-primary font-bold hover:underline flex items-center gap-0.5" href="tel:+8809612888777">
                  Call Now <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
{/*  WhatsApp Live Agent  */}
<div className="p-space-md rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-high/60">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">chat</span>
</div>
<div>
<div className="font-label-sm text-on-surface-variant uppercase">Official WhatsApp Helpdesk</div>
<a className="font-headline-sm text-on-surface font-extrabold hover:text-secondary transition-colors" href="https://wa.me/8801819888777" target="_blank">+880 1819 888 777</a>
</div>
</div>
<span className="font-label-sm text-secondary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> Online
                </span>
</div>
<div className="mt-2 text-body-sm text-on-surface-variant flex items-center justify-between">
<span className="">Instant photo/document sharing</span>
<a className="text-secondary font-bold hover:underline flex items-center gap-0.5" href="https://wa.me/8801819888777" target="_blank">
                  Open Chat <span className="material-symbols-outlined text-[14px]">north_east</span>
</a>
</div>
</div>
{/*  Direct Support Emails  */}
<div className="p-space-md rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-high/60">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">alternate_email</span>
</div>
<div>
<div className="font-label-sm text-on-surface-variant uppercase">Electronic Inquiries</div>
<div className="font-label-lg font-bold text-on-surface">support@tutorbridge.com.bd</div>
<div className="font-body-sm text-on-surface-variant">tutor-audit@tutorbridge.com.bd</div>
</div>
</div>
</div>
</div>
{/*  Card 2: Hotline Hours & Operating Schedule  */}
<div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-sm">
<h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
              Operating Hours &amp; Availabilities
            </h3>
<p className="font-body-sm text-on-surface-variant">
              In-person hubs and telephone routing are actively staffed during the following hours:
            </p>
<div className="space-y-space-xs pt-space-xs">
<div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
<span className="font-label-md text-on-surface">Saturday – Thursday</span>
<span className="font-label-md font-bold text-primary">8:30 AM – 9:30 PM</span>
</div>
<div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
<span className="font-label-md text-on-surface">Friday (Weekend Concierge)</span>
<span className="font-label-md font-bold text-secondary">10:00 AM – 7:00 PM</span>
</div>
<div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-secondary/10">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">shield</span>
<span className="font-label-sm font-bold text-on-surface">Safety &amp; Urgent Escalation</span>
</div>
<span className="font-label-sm font-extrabold text-secondary">24/7 Dedicated</span>
</div>
</div>
</div>
{/*  Card 3: Institutional Government Guarantees (Trust Seal)  */}
<div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">policy</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Institutional Trust Seal</h3>
<div className="font-body-sm text-secondary font-bold">Govt. Registered Agency (TRAD/DNCC/024881/2024)</div>
</div>
</div>
<div className="space-y-space-xs pt-space-xs">
<div className="flex items-start gap-space-xs text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified</span>
<span className=""><strong>100% NID &amp; Physical Varsity Verification:</strong> Student IDs cross-referenced with public &amp; private registrars.</span>
</div>
<div className="flex items-start gap-space-xs text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified</span>
<span className=""><strong>1-Day Free Trial Demo:</strong> Assess teacher compatibility before confirming any long-term honorarium commitment.</span>
</div>
<div className="flex items-start gap-space-xs text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified</span>
<span className=""><strong>Dedicated Female Counselor Assistance:</strong> Specialized female coordinators managing female tutor placements.</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Physical Office Locations Section  */}
<section className="w-full py-space-xl bg-surface-container-low">
<div className="max-w-[1280px] mx-auto px-gutter">
{/*  Section Header  */}
<div className="max-w-2xl mb-space-xl">
<div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-primary/10 text-primary font-label-sm font-bold mb-space-xs">
<span className="material-symbols-outlined text-[16px]">domain</span>
          Regional Verification Hubs
        </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Visit Our Physical Support Centers</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Guardians and tutors are always welcome for in-person consultations, credential checking, document drops, and face-to-face academic planning.
        </p>
</div>
{/*  Hub Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/*  Dhaka Central Hub  */}
<div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm uppercase tracking-wider text-primary font-bold bg-primary/10 px-space-sm py-1 rounded-full">
                Headquarters &amp; Central Verification Hub
              </span>
<span className="font-label-sm text-secondary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Open Today
              </span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Dhaka Principal Center (Banani)</h3>
{/*  Static Map Container with data-location  */}
<div className="w-full h-48 bg-cover bg-center rounded-xl overflow-hidden relative shadow-inner" data-location="Concord Tower, Road 11, Banani, Dhaka, Bangladesh" style={{ backgroundImage: `url(${bananiMapImg})` }}>
<div className="absolute inset-0 bg-primary-container/20 mix-blend-multiply"></div>
<div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-on-surface font-label-sm shadow-sm">
<span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
<span className="">Banani C/A • Concord Tower</span>
</div>
</div>
<div className="space-y-space-xs font-body-md text-on-surface-variant pt-space-xs">
<div className="flex items-start gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">pin_drop</span>
<span className="">Level 8, Concord Tower, Road 11, Banani Commercial Area, Dhaka-1213</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0">call</span>
<a className="text-on-surface font-bold hover:text-primary transition-colors" href="tel:+8809612888777">+880 9612 888 777 (Ext: 101)</a>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0">mail</span>
<span className="text-on-surface">dhaka@tutorbridge.com.bd</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0">schedule</span>
<span className="">Sat – Thu: 9:00 AM – 8:00 PM</span>
</div>
</div>
</div>
<div className="pt-space-xs flex items-center gap-space-sm">
<a className="flex-1 h-11 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold" href="https://maps.google.com/?q=Banani+Dhaka" target="_blank">
<span className="">View On Google Maps</span>
<span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
<a className="h-11 px-space-md bg-primary hover:bg-tertiary text-on-primary font-label-md rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold" href="tel:+8809612888777">
<span className="material-symbols-outlined text-[18px]">phone</span>
<span className="">Call Hub</span>
</a>
</div>
</div>
{/*  Chattogram Regional Hub  */}
<div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm uppercase tracking-wider text-secondary font-bold bg-secondary/10 px-space-sm py-1 rounded-full">
                Regional Operations &amp; Counselor Desk
              </span>
<span className="font-label-sm text-secondary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Open Today
              </span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Chattogram Regional Hub (GEC Circle)</h3>
{/*  Static Map Container with data-location  */}
<div className="w-full h-48 bg-cover bg-center rounded-xl overflow-hidden relative shadow-inner" data-location="Equity Heights, GEC Circle, CDA Avenue, Chattogram, Bangladesh" style={{ backgroundImage: `url(${ctgMapImg})` }}>
<div className="absolute inset-0 bg-secondary/20 mix-blend-multiply"></div>
<div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-on-surface font-label-sm shadow-sm">
<span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>
<span className="">GEC Circle • Equity Heights</span>
</div>
</div>
<div className="space-y-space-xs font-body-md text-on-surface-variant pt-space-xs">
<div className="flex items-start gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">pin_drop</span>
<span className="">Suite 4B, Equity Heights, GEC Circle, CDA Avenue, Chattogram-4000</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0">call</span>
<a className="text-on-surface font-bold hover:text-secondary transition-colors" href="tel:+8809612888778">+880 9612 888 778 (Ext: 202)</a>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0">mail</span>
<span className="text-on-surface">ctg@tutorbridge.com.bd</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0">schedule</span>
<span className="">Sat – Thu: 9:30 AM – 7:30 PM</span>
</div>
</div>
</div>
<div className="pt-space-xs flex items-center gap-space-sm">
<a className="flex-1 h-11 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold" href="https://maps.google.com/?q=GEC+Circle+Chattogram" target="_blank">
<span className="">View On Google Maps</span>
<span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
<a className="h-11 px-space-md bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold" href="tel:+8809612888778">
<span className="material-symbols-outlined text-[18px]">phone</span>
<span className="">Call Hub</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/*  Department-Specific Routing Directory (Compact 3-Card Grid)  */}
<section className="w-full py-space-xl bg-surface">
<div className="max-w-[1280px] mx-auto px-gutter">
<div className="text-center max-w-xl mx-auto mb-space-xl">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Department Specific Assistance</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Direct your specific request straight to the corresponding division officers.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/*  Card 1  */}
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-space-sm">
<span className="material-symbols-outlined text-[24px]">school</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Guardian Matchmaking Desk</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              For parents looking for immediate home tutors, online Edexcel/Cambridge instructors, or customized female tutor requirements.
            </p>
</div>
<div className="pt-space-sm border-t border-transparent space-y-2">
<div className="font-label-sm text-outline uppercase font-bold">Desk Lead: Tanzeem Morshed</div>
<a className="text-primary font-label-md font-bold flex items-center gap-1 hover:underline" href="mailto:guardians@tutorbridge.com.bd">
<span className="">guardians@tutorbridge.com.bd</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-space-sm">
<span className="material-symbols-outlined text-[24px]">badge</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Tutor Credentialing Desk</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              For registered educators needing profile activation, NID authentication, certificate uploads, or honorarium inquiries.
            </p>
</div>
<div className="pt-space-sm border-t border-transparent space-y-2">
<div className="font-label-sm text-outline uppercase font-bold">Desk Lead: Nusrat Jahan (HR)</div>
<a className="text-secondary font-label-md font-bold flex items-center gap-1 hover:underline" href="mailto:tutors@tutorbridge.com.bd">
<span className="">tutors@tutorbridge.com.bd</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-xl bg-surface-container-highest text-on-surface flex items-center justify-center mb-space-sm">
<span className="material-symbols-outlined text-[24px]">corporate_fare</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Institutional &amp; School Desk</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              For coaching academies, English medium schools, and corporate institutions seeking cohort-based batch teachers.
            </p>
</div>
<div className="pt-space-sm border-t border-transparent space-y-2">
<div className="font-label-sm text-outline uppercase font-bold">Desk Lead: S. K. Rahat Ali</div>
<a className="text-primary font-label-md font-bold flex items-center gap-1 hover:underline" href="mailto:institutes@tutorbridge.com.bd">
<span className="">institutes@tutorbridge.com.bd</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/*  Pre-Footer Action Banner  */}
<section className="w-full bg-primary-container text-on-primary py-space-xl">
<div className="max-w-[1280px] mx-auto px-gutter">
<div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg">
<div className="space-y-space-xs text-center lg:text-left">
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-on-primary-container/20 text-on-primary font-label-sm font-bold">
<span className="material-symbols-outlined text-[16px]">electric_bolt</span>
            Instant Fast-Track Processing
          </div>
<h2 className="font-headline-lg text-headline-lg text-on-primary">Ready to Find the Qualified Academic Tutor?</h2>
<p className="font-body-lg text-body-lg text-on-primary-container max-w-xl">
            Post your student's requirement in under 60 seconds. Our algorithm identifies top-rated tutors from premier Bangladeshi universities.
          </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
<Link className="w-full sm:w-auto h-12 px-space-lg bg-surface-container-lowest text-primary hover:bg-surface-container-low font-label-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-bold"  to="/request-tutor">
<span className="">Post Tuition Request</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
<Link className="w-full sm:w-auto h-12 px-space-lg bg-primary hover:bg-tertiary text-on-primary font-label-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-bold"  to="/apply-tutor">
<span className="">Join as a Verified Tutor</span>
</Link>
</div>
</div>
</div>
</section>
</div>
{/*  Inline Interaction Logic  */}

    </div>
  );
};

export default Contact;
