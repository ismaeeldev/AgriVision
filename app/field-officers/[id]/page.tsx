import React from "react";
import { notFound } from "next/navigation";
import { FIELD_OFFICERS } from "@/data/experts";
import { MapPin, ShieldCheck, MessageCircle, PhoneCall, Star, Clock, HeartHandshake, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import Image from "next/image";

interface ProfileProps {
  params: Promise<{ id: string }>;
}

export default async function FieldOfficerProfile({ params }: ProfileProps) {
  const { id } = await params;

  const expert = FIELD_OFFICERS.find((e) => e.id === id);
  // console.log(expert);

  if (!expert) return notFound();

  const handleWhatsAppHref = `https://wa.me/${expert.whatsapp}?text=${encodeURIComponent(`Hello ${expert.name}, I need your agricultural expertise.`)}`;

  return (
    <div className="min-h-screen pt-28 pb-32 bg-zinc-50 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#4CAF50]/10 to-transparent pointer-events-none" />

      <Container>
        {/* Back Navigation */}
        <div className="mb-6 relative z-10 w-full max-w-3xl mx-auto">
          <Link href="/nearby-help" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#1B5E20] font-bold text-sm transition-colors py-2 px-3 rounded-lg hover:bg-zinc-100">
            <ArrowLeft className="w-4 h-4" />
            Back to Map
          </Link>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 bg-white shadow-xl rounded-[2.5rem] border border-zinc-200 overflow-hidden">

          {/* Cover Header Area */}
          <div className="h-32 sm:h-48 bg-[#1B5E20] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/5766/3342.png')] bg-cover opacity-20 mix-blend-overlay" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="px-6 sm:px-12 pb-12 relative">

            {/* Avatar Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-8 gap-4">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-zinc-100 rounded-[2.5rem] border-4 border-white shadow-lg flex-shrink-0 flex items-center justify-center text-[#1B5E20] text-5xl font-black">
                {/* {expert.name.charAt(0)} */}
                <Image src={expert.image} alt={expert.name} width={100} height={100} className="object-cover rounded-2xl" />

                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-zinc-100">
                  <div className={`w-5 h-5 rounded-full ${expert.availability === 'Available Now' ? 'bg-green-500' : expert.availability === 'Busy' ? 'bg-yellow-500' : 'bg-red-500'} border border-white`} />
                </div>
              </div>

              {/* Action Buttons Top */}
              <div className="flex gap-3 mt-4 sm:mt-0">
                <a href={handleWhatsAppHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#25D366] text-white font-bold tracking-wide hover:bg-[#20BE5A] transition-colors shadow-sm">
                  <MessageCircle className="w-5 h-5 drop-shadow-sm" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 transition-colors shadow-sm border border-zinc-200">
                  <PhoneCall className="w-5 h-5" />
                  <span className="hidden sm:inline">Call Office</span>
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">{expert.name}</h1>
                {expert.isVerified && <ShieldCheck className="w-8 h-8 text-[#4CAF50]" />}
              </div>
              <p className="text-lg text-zinc-500 font-medium">{expert.role}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-zinc-50 border border-zinc-100/80">
                <Star className="w-6 h-6 text-yellow-500 mb-2" />
                <span className="text-xl font-bold text-foreground">{expert.rating}/5</span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">{expert.reviewsCount} Reviews</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-zinc-50 border border-zinc-100/80">
                <Clock className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-xl font-bold text-foreground">{expert.experience}</span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-zinc-50 border border-zinc-100/80">
                <HeartHandshake className="w-6 h-6 text-rose-500 mb-2" />
                <span className="text-xl font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap w-full text-center">
                  Trust
                </span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Tier 1 Expert</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-green-50 border border-green-100/80">
                <MapPin className="w-6 h-6 text-[#4CAF50] mb-2" />
                <span className="text-base font-bold text-[#1B5E20] text-center">{expert.availability}</span>
                <span className="text-xs text-green-700/60 font-bold uppercase tracking-wider mt-1">Status</span>
              </div>
            </div>

            {/* Specializations Map */}
            <div>
              <h3 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4CAF50]" />
                Verified Specialist In
              </h3>
              <div className="flex flex-wrap gap-3">
                {expert.specializations.map(spec => (
                  <div key={spec} className="px-5 py-2.5 rounded-full bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-sm shadow-sm hover:border-[#4CAF50] hover:text-[#2E7D32] transition-colors">
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            {/* Huge CTA Area */}
            <div className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(27,94,32,0.3)]">
              <div className="flex flex-col gap-2 max-w-sm">
                <h4 className="text-2xl font-black">Need instant farm support?</h4>
                <p className="text-green-100 font-medium">Ahmed is currently in your region. Book a physical field visit or consult immediately via WhatsApp.</p>
              </div>
              <a href={handleWhatsAppHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl bg-white text-[#1B5E20] font-black hover:bg-zinc-100 transition-transform hover:scale-105 active:scale-95 shadow-md">
                Connect Now
              </a>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
