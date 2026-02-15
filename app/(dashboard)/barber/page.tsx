import { connectDB } from "@/lib/mongoose";
import { Appointment } from "@/models/Appointment";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { User } from "@/models/User";

export default async function BarberPage() {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;
    if (!token) {
        return <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h1 className="text-3xl font-bold">Unauthorized</h1>
            <p className="text-neutral-500">Please log in as a barber to access this dashboard.</p>
            <a href="/login" className="px-6 py-2 bg-black text-white rounded-full">Login</a>
        </div>;
    }

    let payload;
    try {
        payload = verifyToken(token);
    } catch (e) {
        return <div className="flex items-center justify-center min-h-screen font-bold">Session expired. Please login again.</div>;
    }

    const user = await User.findById(payload.id).lean();

    if (user?.role !== "barber") {
        return <div className="p-20 text-center space-y-4">
            <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
            <p className="text-xl text-neutral-500">This area is reserved for barbers only.</p>
            <a href="/" className="inline-block mt-4 text-neutral-400 hover:underline">Return Home</a>
        </div>;
    }

    const appointments = await Appointment.find({ barber: payload.id })
        .populate("client", "name email avatarUrl")
        .populate("service", "name price duration")
        .sort({ startTime: 1 })
        .lean();

    // Group appointments by status for quick stats
    const stats = {
        total: appointments.length,
        pending: appointments.filter((a: any) => a.status === 'pending').length,
        confirmed: appointments.filter((a: any) => a.status === 'confirmed').length,
        completed: appointments.filter((a: any) => a.status === 'completed').length,
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black tracking-tighter text-neutral-900 dark:text-neutral-100">Barber Dashboard</h1>
                        <p className="text-xl text-neutral-500">Welcome back, {user.name}. You have {stats.pending} pending requests today.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col items-center min-w-[100px]">
                            <span className="text-3xl font-black">{stats.total}</span>
                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Total</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col items-center min-w-[100px]">
                            <span className="text-3xl font-black text-yellow-500">{stats.pending}</span>
                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Pending</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col items-center min-w-[100px]">
                            <span className="text-3xl font-black text-green-500">{stats.confirmed}</span>
                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Confirmed</span>
                        </div>
                    </div>
                </header>

                {/* Appointment List */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                        <button className="text-sm font-bold bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                            View Calendar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {appointments.map((apt: any) => (
                            <div key={apt._id.toString()} className="group flex flex-col p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-2xl hover:shadow-neutral-200 dark:hover:shadow-none transition-all duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                        }`}>
                                        {apt.status}
                                    </span>
                                    <span className="text-xs font-bold text-neutral-300">#{apt._id.toString().slice(-4)}</span>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={apt.client.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.client.name}`}
                                        className="h-12 w-12 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800"
                                        alt={apt.client.name}
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{apt.client.name}</h3>
                                        <p className="text-sm text-neutral-500">{apt.client.email}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Service</span>
                                        <span className="font-bold">{apt.service.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Date</span>
                                        <span className="font-bold">{new Date(apt.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Time</span>
                                        <span className="font-bold">{new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    {apt.status === 'pending' && (
                                        <>
                                            <button className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl text-sm font-black transform hover:scale-[1.02] transition-transform active:scale-95">
                                                Confirm
                                            </button>
                                            <button className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </>
                                    )}
                                    {apt.status === 'confirmed' && (
                                        <button className="flex-1 bg-green-500 text-white py-3 rounded-xl text-sm font-black hover:bg-green-600 transition-colors">
                                            Mark Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {appointments.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800">
                            <span className="text-6xl mb-4">📅</span>
                            <h3 className="text-xl font-bold">No appointments found</h3>
                            <p className="text-neutral-500">When clients book your services, they will appear here.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
