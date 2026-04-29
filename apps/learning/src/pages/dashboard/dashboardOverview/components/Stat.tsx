
import React from 'react';
import { 
  Rocket, Calendar, BookOpen, Clock, 
  CheckCircle2, ChevronRight, Star 
} from 'lucide-react';
import ActivityChart from "./ActivityChart";

// --- Sub-components ---
const StatBox = ({ icon, value, label, color, className }: any) => (
  <div className={`text-center group cursor-default ${className}`}>
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="font-black text-lg text-[#3D4071]">{value}</div>
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</div>
  </div>
);

const EventItem = ({ icon, title }: { icon: string, title: string }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-white shrink-0">
        <img src={icon} alt={title} className="w-6 h-6 object-contain" />
      </div>
    </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">{title}</h4>
        {/* <p className="text-[10px] text-gray-400 font-medium uppercase">Google meet</p> */}
      </div>
      <div className="min-w-0">
        {/* <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">{title}</h4> */}
        <p className="text-[10px] text-gray-400 font-medium uppercase">Google meet</p>
      </div>
    {/* <ChevronRight size={16} className="text-gray-300 shrink-0" /> */}
  </div>
);

const ChallengeCard = ({ title, price, due }: { title: string, price: string, due: string }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col h-full transition-all hover:shadow-md">
    <div className="flex flex-col items-center text-center flex-1">
      <div className="w-14 h-14 bg-[#635BFF] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-100">
        <Rocket className="text-white" size={24} />
      </div>
      <h3 className="font-bold text-[#3D4071] text-sm leading-tight mb-1">{title}</h3>
      <p className="text-purple-400 text-xs mb-4">Deep Trade</p>
      
      <div className="flex -space-x-2 mb-6">
        {[20, 21, 22].map((i) => (
          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="user" />
        ))}
      </div>
    </div>

    <div className="w-full flex items-center justify-between pt-4 border-t border-gray-50">
      <span className="font-black text-gray-900 text-lg">{price}</span>
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Due in {due}</span>
        <Star size={12} className="text-orange-400 fill-orange-400" />
      </div>
    </div>
  </div>
);

const Stat = () => {
  return (
		<>
			{/* 1. Activity & Events (L-Column) */}
			<div className="col-span-1 lg:col-span-5 space-y-8">
				<ActivityChart />

				<div className="bg-neutral-50 p-6 md:p-8 rounded-[2.5rem]">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-bold">Upcoming Events</h2>
						<button className="text-xs font-bold text-gray-400 uppercase hover:text-purple-600 transition-colors">
							View All
						</button>
					</div>
					<div className="space-y-3">
						<EventItem
							icon="https://www.huawei.com/favicon.ico"
							title="How to navigate tech world."
						/>
						<EventItem
							icon="https://www.huawei.com/favicon.ico"
							title="Networking for designers."
						/>
						<EventItem
							icon="https://www.huawei.com/favicon.ico"
							title="Blockdag Hackathon 2026."
						/>
					</div>
				</div>
			</div>

			{/* 2. Stats & Featured (M-Column) */}
			<div className="col-span-1 lg:col-span-4 space-y-8">
				<div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
					<h2 className="font-bold mb-6">Progress statistics</h2>
					<div className="text-5xl font-black mb-8">
						56%{" "}
						<span className="text-xs font-medium text-gray-400 block mt-1 uppercase">
							Total activity
						</span>
					</div>

					<div className="flex h-2.5 w-full rounded-full overflow-hidden mb-10 bg-gray-100">
						<div className="bg-[#635BFF] w-[20%]" />
						<div className="bg-[#78C56F] w-[40%] ml-1" />
						<div className="bg-[#FF9C65] w-[40%] ml-1" />
					</div>

					<div className="grid grid-cols-3 gap-2 bg-neutral-50 p-4 rounded-xl">
						<StatBox
							className="border-r border-gray-200"
							icon={<Clock size={18} />}
							value="8"
							label="In progress"
							color="bg-[#635BFF]"
						/>
						<StatBox
							className="border-r border-gray-200"
							icon={<CheckCircle2 size={18} />}
							value="16"
							label="Completed"
							color="bg-[#78C56F]"
						/>
						<StatBox
							icon={<Calendar size={18} />}
							value="16"
							label="Upcoming"
							color="bg-[#FF9C65]"
						/>
					</div>
				</div>

				<div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
					<div className="flex gap-2 mb-4 flex-wrap">
						<span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
							Group course
						</span>
						<span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
							Advanced
						</span>
					</div>

					<h2 className="text-xl font-black mb-4 leading-tight">
						Easy way to understand design rules
					</h2>
					<p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
						Punctuation-learn the basics without the pain. People will never
						laugh at your punctuation again.
					</p>

					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
						<div className="shrink-0">
							<p className="text-[10px] font-bold text-gray-400 uppercase mb-3">
								Participants
							</p>
							<div className="flex -space-x-3">
								{[50, 51, 52].map((i) => (
									<img
										key={i}
										src={`https://i.pravatar.cc/100?u=${i}`}
										className="w-9 h-9 rounded-full border-4 border-white shadow-sm"
										alt="user"
									/>
								))}
							</div>
						</div>
						<div className="flex-1 w-full">
							<p className="text-[10px] font-bold text-gray-400 uppercase mb-3">
								Course progress
							</p>
							<div className="relative h-8 w-full bg-yellow-50 rounded-lg flex items-center px-4 overflow-hidden border border-yellow-100">
								<div className="absolute left-0 top-0 h-full bg-yellow-400 w-[87%] transition-all duration-700" />
								<span className="relative z-10 text-[11px] font-black text-gray-900">
									87%
								</span>
							</div>
						</div>
					</div>

					<button className="w-full bg-[#6D11B1] text-white py-4 rounded-2xl font-bold hover:bg-[#5A0E94] transition-all shadow-lg shadow-purple-50 flex items-center justify-center gap-2">
						Continue learning
					</button>
				</div>
			</div>

			{/* 3. Challenges (R-Column) */}
			<div className="col-span-1 lg:col-span-3 space-y-8">
				<div>
					<div className="flex justify-between items-center mb-6 px-2">
						<h2 className="font-bold">Challenges</h2>
						<button className="text-xs font-bold text-gray-400 uppercase hover:text-purple-600 transition-colors">
							View All
						</button>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
						<ChallengeCard
							title="Bear Build-a-Bear Hackathon"
							price="$5,00"
							due="4 days"
						/>
						<ChallengeCard
							title="Visual Identity Design Blitz"
							price="$2,50"
							due="12 hrs"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Stat;