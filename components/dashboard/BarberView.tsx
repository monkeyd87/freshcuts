"use client";
import React, { useEffect, useState } from "react";
import { BasicCard } from "@/components/ui/BasicCard";
import { motion } from "framer-motion";
import { IconCalendar, IconClock, IconUser, IconScissors, IconPlus } from "@tabler/icons-react";

interface Appointment {
    _id: string;
    client: {
        _id: string;
        name: string;
        email: string;
        avatarUrl?: string;
    };
    service: {
        _id: string;
        name: string;
        price: number;
        duration: number;
    };
    startTime: string;
    endTime: string;
    status: string;
    notes?: string;
}

export const BarberView = ({ barberId }: { barberId: string }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`/api/appointments?barberId=${barberId}`);
                const data = await res.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        if (barberId) {
            fetchAppointments();
        }
    }, [barberId]);

    if (loading) return <div className="p-8 text-neutral-500 animate-pulse">Loading schedule...</div>;

    const upcoming = appointments.filter(a => new Date(a.startTime) > new Date());

    // Stats
    const totalCompleted = appointments.filter(a => a.status === 'completed').length;
    const todayRevenue = appointments
        .filter(a => {
            const d = new Date(a.startTime);
            const today = new Date();
            return d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear() &&
                a.status === 'completed';
        })
        .reduce((acc, curr) => acc + curr.service.price, 0);

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-row justify-around items-baseline gap-4 w-full">
                <BasicCard title="Appointments Today" data={appointments.length.toString()} />
                <BasicCard title="Daily Revenue" data={`$${todayRevenue}`} />
                <BasicCard title="Completed Jobs" data={totalCompleted.toString()} />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Upcoming Schedule</h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <IconCalendar size={18} />
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {upcoming.map((apt, idx) => (
                            <motion.div
                                key={apt._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-black dark:hover:border-white transition-all duration-300"
                            >
                                {/* Time Indicator */}
                                <div className="flex flex-col justify-center items-center px-4 border-r border-neutral-100 dark:border-neutral-800 min-w-[100px]">
                                    <span className="text-2xl font-black">{new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Start</span>
                                </div>

                                {/* Client Info */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="relative">
                                        <img
                                            src={apt.client.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.client.name}`}
                                            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-neutral-100 dark:ring-neutral-800"
                                            alt={apt.client.name}
                                        />
                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            {apt.client.name}
                                            <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-normal text-neutral-500">#{apt._id.slice(-4)}</span>
                                        </h3>
                                        <p className="text-sm text-neutral-500 flex items-center gap-1">
                                            <IconUser size={14} /> {apt.client.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div className="flex flex-col justify-center gap-1 flex-1">
                                    <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                                        <IconScissors size={18} className="text-neutral-400" />
                                        <span className="font-bold text-lg">{apt.service.name}</span>
                                    </div>
                                    {apt.notes && (
                                        <div className="flex items-start gap-2 text-sm text-neutral-500">
                                            <IconPlus size={16} className="mt-0.5 text-blue-500" />
                                            <p className="italic">"Extras/Requests: {apt.notes}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions/Status */}
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end mr-4">
                                        <span className="text-lg font-black">${apt.service.price}</span>
                                        <span className="text-xs text-neutral-400 font-medium">{apt.service.duration} mins</span>
                                    </div>
                                    <button className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-neutral-200 dark:shadow-none">
                                        Start Session
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-neutral-50 dark:bg-neutral-900/30 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800">
                        <div className="h-16 w-16 mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <IconClock className="text-neutral-400" />
                        </div>
                        <p className="text-neutral-500 font-medium">No more appointments scheduled for today.</p>
                        <button className="mt-4 text-sm font-bold text-black dark:text-white hover:underline">View full calendar</button>
                    </div>
                )}
            </div>
        </div>
    );
};
