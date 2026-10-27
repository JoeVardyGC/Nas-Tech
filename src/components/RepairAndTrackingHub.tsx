'use client';

import React, { useState } from 'react';
import { REPAIR_SERVICES, SAMPLE_TICKETS, RepairServiceItem, RepairTicketLookup } from '@/data/servicesData';
import { useCart } from '@/context/CartContext';
import { useWhatsApp } from '@/context/WhatsAppContext';
import { Wrench, Search, Clock, ShieldCheck, MapPin, Info } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function RepairAndTrackingHub() {
  const { formatGHS } = useCart();
  const { requestWhatsApp } = useWhatsApp();
  const [selectedDevice, setSelectedDevice] = useState<string>('All');
  const [ticketInput, setTicketInput] = useState<string>('NT-REP-1048');
  const [lookedUpTicket, setLookedUpTicket] = useState<RepairTicketLookup | null>(SAMPLE_TICKETS['NT-REP-1048']);
  const [lookupError, setLookupError] = useState<string>('');

  const devices = ['All', 'Xbox Console', 'PlayStation Console', 'Gaming Laptop', 'Business Laptop'];

  const filteredRepairs = selectedDevice === 'All'
    ? REPAIR_SERVICES
    : REPAIR_SERVICES.filter((r) => r.deviceType === selectedDevice);

  const handleLookup = (codeToSearch?: string) => {
    const code = (codeToSearch || ticketInput).trim().toUpperCase();
    if (!code) return;

    if (SAMPLE_TICKETS[code]) {
      setLookedUpTicket(SAMPLE_TICKETS[code]);
      setLookupError('');
    } else {
      setLookedUpTicket(null);
      setLookupError(`No active repair found for "${code}". Try demo ticket NT-REP-1048 or NT-REP-2091.`);
    }
  };

  const stages = [
    'Intake Registered',
    'Diagnostics Complete',
    'Parts & Soldering',
    'Benchmarking Test',
    'Ready for Pickup',
  ];

  const handleBookRepair = (service: RepairServiceItem) => {
    requestWhatsApp({
      intent: `book a repair for my ${service.deviceType} at your Sawaba, Kumasi workshop`,
      lines: [
        {
          label: `${service.deviceType} Repair: ${service.issueTitle}`,
          quantity: 1,
          amountGHS: service.estimatedPriceGHS,
          details: [
            `Symptoms: ${service.symptoms}`,
            `Turnaround: ${service.turnaroundTime}`,
            `Parts: ${service.partsUsed}`,
            `Warranty: ${service.warrantyPeriod}`,
          ],
        },
      ],
      totalGHS: service.estimatedPriceGHS,
      note: 'I will bring my device to your shop at Sawaba near St. Patrick Hotel, Kumasi.',
    });
  };

  return (
    <section id="repairs" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-lg space-y-10">
      
      {/* Header & In-Person Logic */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-sans font-bold tracking-wide mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>MICRO-SOLDERING LAB • IN-PERSON REPAIRS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          CONSOLE, GAMEPAD & LAPTOP REPAIRS
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Faulty Xbox, PS5, controller, or laptop? <strong>Bring the faulty gear directly to our workshop in Sawaba near St. Patrick Hotel, Kumasi</strong>. We diagnose it on the bench, use genuine OEM parts, test under full gaming load, and provide a 90-day shop warranty.
        </p>
      </div>

      {/* In-Person Workshop Notice */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start space-x-3">
        <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Walk-in repair policy:</strong> Bring your console, controller, or laptop into our showroom. Diagnostics are done on the spot. If you already have a device with us, enter your ticket code below to check live status!
        </div>
      </div>

      {/* SECTION 1: LIVE REPAIR TRACKER LOOKUP */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Track Your In-Shop Repair Progress</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Enter the ticket reference code given to you when you dropped off your device.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 text-[11px]">Sample Tickets:</span>
            <button
              onClick={() => {
                setTicketInput('NT-REP-1048');
                handleLookup('NT-REP-1048');
              }}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-blue-700 font-sans text-[11px] font-bold hover:bg-slate-100"
            >
              NT-REP-1048 (Xbox)
            </button>
            <button
              onClick={() => {
                setTicketInput('NT-REP-2091');
                handleLookup('NT-REP-2091');
              }}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-blue-700 font-sans text-[11px] font-bold hover:bg-slate-100"
            >
              NT-REP-2091 (Laptop)
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 max-w-lg">
          <input
            type="text"
            placeholder="Enter Ticket (e.g. NT-REP-1048)"
            value={ticketInput}
            onChange={(e) => setTicketInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 uppercase font-sans tracking-wider focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={() => handleLookup()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            Track Status
          </button>
        </div>

        {lookupError && (
          <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl font-sans">
            {lookupError}
          </div>
        )}

        {/* Active Ticket Card */}
        {lookedUpTicket && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-sans text-blue-700 uppercase tracking-widest font-bold">
                  TICKET #{lookedUpTicket.ticketCode}
                </span>
                <h5 className="font-bold text-base text-slate-900">{lookedUpTicket.device}</h5>
                <p className="text-xs text-slate-500">{lookedUpTicket.issue}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-sans">Total Repair Bill:</span>
                <div className="text-lg font-sans font-black text-slate-900">
                  {formatGHS(lookedUpTicket.totalCostGHS)}
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  {lookedUpTicket.estimatedCompletion}
                </div>
              </div>
            </div>

            {/* 5-Stage Stepper */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2">
                {stages.map((stg, i) => {
                  const stepNum = i + 1;
                  const isDone = stepNum <= lookedUpTicket.stageIndex;
                  const isCurrent = stepNum === lookedUpTicket.stageIndex;
                  return (
                    <div key={stg} className="text-center space-y-1.5">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isDone
                            ? isCurrent
                              ? 'bg-blue-600 shadow-sm'
                              : 'bg-emerald-500'
                            : 'bg-slate-200'
                        }`}
                      />
                      <div
                        className={`text-[10px] font-medium leading-tight ${
                          isCurrent
                            ? 'text-blue-700 font-bold'
                            : isDone
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {stg}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bench & Parts Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 text-[11px]">Assigned Workshop Tech:</span>
                <div className="text-slate-800 font-semibold">{lookedUpTicket.assignedTechnician}</div>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Replacement Parts Used:</span>
                <div className="text-blue-700 font-sans text-[11px] font-medium">
                  {lookedUpTicket.partsConsumed.join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: COMMON REPAIRS & IN-SHOP RATES */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            In-Shop Repair Rates & Services:
          </label>
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {devices.map((dev) => (
              <button
                key={dev}
                onClick={() => setSelectedDevice(dev)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDevice === dev
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {dev}
              </button>
            ))}
          </div>
        </div>

        {/* Repair Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepairs.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-blue-700 font-sans font-bold">
                  <span>{service.deviceType}</span>
                  <span className="text-emerald-700 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{service.turnaroundTime}</span>
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{service.issueTitle}</h4>
                <p className="text-xs text-slate-500 leading-snug">{service.symptoms}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-[11px]">
                  <div>
                    <span className="text-slate-500">Genuine Part:</span>{' '}
                    <strong className="text-slate-800">{service.partsUsed}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Warranty:</span>{' '}
                    <strong className="text-emerald-700">{service.warrantyPeriod}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-sans">In-Shop Fee:</div>
                  <div className="text-lg font-sans font-black text-slate-900">
                    {formatGHS(service.estimatedPriceGHS)}
                  </div>
                </div>

                <button
                  onClick={() => handleBookRepair(service)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 shadow-xs"
                >
                  <WhatsAppIcon colored className="w-3.5 h-3.5 shrink-0" />
                  <span>Bring To Shop</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
