import { connectDB } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";
import { Service } from "@/models/Service";
import { BarberCard } from "@/components/ui/BarberCard";
import { User } from "@/models/User";

export default async function ShopPage({ params }: { params: { shopId: string } }) {
    await connectDB();
    const shop = await Shop.findById(params.shopId).lean();
    const services = await Service.find({ shop: params.shopId }).lean();

    // Fetch barbers (in a real app, you'd associate barbers with shops)
    const barbers = await User.find({ role: "barber" }).limit(4).lean();

    if (!shop) {
        return <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-neutral-500">Shop not found</h1>
        </div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <div className="h-[40vh] relative overflow-hidden bg-neutral-900">
                {shop.images && shop.images.length > 0 ? (
                    <img
                        src={shop.images[0]}
                        alt={shop.name}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">
                        <span className="text-neutral-700 text-9xl font-bold opacity-20">{shop.name}</span>
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">{shop.name}</h1>
                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">{shop.address}</p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
                {/* Services */}
                <section>
                    <div className="flex items-end justify-between mb-12">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 italic">Premium Services</h2>
                            <p className="text-neutral-500 text-lg">Choose your style from our expert services</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service: any) => (
                            <div key={service._id.toString()} className="group relative p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm hover:border-black dark:hover:border-white transition-all duration-300">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{service.name}</h3>
                                        <p className="text-sm text-neutral-400 font-medium uppercase tracking-widest">{service.category || 'Standard'}</p>
                                    </div>
                                    <span className="text-2xl font-black text-black dark:text-white">${service.price}</span>
                                </div>
                                <p className="text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-8">{service.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        {service.duration} mins
                                    </span>
                                    <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold transform hover:scale-105 transition-transform active:scale-95">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Barbers */}
                <section>
                    <div className="flex flex-col items-center text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold tracking-tight">Our Master Barbers</h2>
                        <div className="h-1 w-20 bg-black dark:bg-white rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {barbers.map((barber: any) => (
                            <div key={barber._id.toString()} className="flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none">
                                <div className="relative mb-6">
                                    <img
                                        src={barber.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${barber.name}`}
                                        className="h-32 w-32 rounded-2xl object-cover ring-4 ring-neutral-50 dark:ring-neutral-800"
                                        alt={barber.name}
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                                        ★ 5.0
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{barber.name}</h3>
                                <p className="text-sm text-neutral-500 mt-1 uppercase tracking-tighter font-semibold">Master Stylist</p>
                                <button className="mt-6 text-sm font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                                    View Schedule →
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
