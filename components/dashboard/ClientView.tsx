"use client";
import React from "react";
import { BasicCard } from "@/components/ui/BasicCard";
import { AppointmentCard } from "@/components/ui/AppointmentCard";
import { MembershipCard } from "@/components/ui/MembershipCard";

export const ClientView = ({ user }: { user: any }) => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-row justify-around items-baseline gap-4">
                <BasicCard title="Total Hair cuts," data="12" />
                <BasicCard title="Money Saved." data="$120" />
                <BasicCard title="Credits left" data="3" />
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                    <h2 className="text-2xl font-semibold">Your next appointment</h2>
                    <h2 className="text-lg opacity-50">Membership</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <AppointmentCard />
                    <MembershipCard />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Top rated barbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder for top barbers */}
                    <p className="text-neutral-500 italic">Finding the best barbers near you...</p>
                </div>
            </div>
        </div>
    );
};
