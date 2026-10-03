import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  MapPin,
  Search,
  Star,
  ShieldCheck,
  ChevronRight,
  Filter,
  Flame,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

export const HomeScreen = ({ onSelectCook, onNavigateToPlan }) => {
  const { cooks, selectedArea, setSelectedArea, puneAreas, subscription } = useTiffin();
  
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [searchPincode, setSearchPincode] = useState('');

  // Determine active area details
  const activeAreaObj = puneAreas.find((a) => a.id === selectedArea) || puneAreas[0];

  // If user searched for custom unsupported pincode
  const isCustomPincode = searchPincode.trim().length > 0;
  const matchingPincodeArea = puneAreas.find(
    (a) => a.pincode === searchPincode.trim() || a.name.toLowerCase().includes(searchPincode.toLowerCase())
  );

  // Filter cooks based on selected area and dietary preference
  const filteredCooks = cooks.filter((cook) => {
    // Area match
    let areaMatch = false;
    if (isCustomPincode) {
      if (matchingPincodeArea) {
        areaMatch = cook.areasServed.includes(matchingPincodeArea.id);
      } else {
        areaMatch = false; // Unsupported pincode!
      }
    } else {
      areaMatch = cook.areasServed.includes(selectedArea);
    }

    // Diet match
    let dietMatch = true;
    if (dietFilter === 'veg') {
      dietMatch = cook.isVegOnly === true;
    } else if (dietFilter === 'non-veg') {
      dietMatch = cook.isVegOnly === false;
    }

    return areaMatch && dietMatch;
  });

  return (
    <div className="flex-1 flex flex-col pb-20 overflow-y-auto">
      {/* Top Pune Location Header */}
      <div className="bg-gradient-to-b from-orange-500 to-amber-500 text-white p-4 pt-2 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-orange-100">
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivering to Pune</span>
          </div>
          <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium">
            Office Lunch & Dinner
          </span>
        </div>

        {/* Pune Area Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 pl-3 border border-white/20">
          <select
            value={isCustomPincode && matchingPincodeArea ? matchingPincodeArea.id : selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setSearchPincode('');
            }}
            className="bg-transparent text-white font-heading font-bold text-sm focus:outline-none cursor-pointer flex-1 appearance-none"
          >
            {puneAreas.map((area) => (
              <option key={area.id} value={area.id} className="text-stone-900 bg-white font-sans font-medium">
                {area.name} ({area.pincode}) - {area.landmark}
              </option>
            ))}
          </select>
          <span className="text-xs text-white/70 pr-2 pointer-events-none">▼</span>
        </div>

        {/* Search / Pincode Input */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Try pincode '411057' or unsupported '411001'..."
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
            className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs py-2.5 pl-9 pr-8 rounded-xl focus:outline-none shadow-inner"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          {searchPincode && (
            <button
              onClick={() => setSearchPincode('')}
              className="absolute right-2.5 top-2.5 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        {/* Active Plan Shortcut Banner if user already has an active subscription */}
        {subscription && subscription.status === 'Active' && (
          <div
            onClick={onNavigateToPlan}
            className="p-3 bg-gradient-to-r from-emerald-800 to-[#166534] text-white rounded-2xl shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm">
                🍱
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded">
                    Active Plan
                  </span>
                  <span className="text-xs font-semibold">{subscription.cookName}</span>
                </div>
                <p className="text-[11px] text-emerald-100/80">
                  {subscription.mealsUsed} of {subscription.totalMealDays} meals used • Pause or Skip anytime
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-200" />
          </div>
        )}

        {/* Dietary Filter Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 p-1 bg-stone-200/60 rounded-xl text-xs font-medium w-full">
            <button
              onClick={() => setDietFilter('all')}
              className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
                dietFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Kitchens
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                dietFilter === 'veg'
                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🥬</span> Veg Only
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                dietFilter === 'non-veg'
                  ? 'bg-amber-700 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🍗</span> Non-Veg
            </button>
          </div>
        </div>

        {/* Section Heading with Pune Cooks Count */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="font-heading font-bold text-stone-900 text-base">
              Verified Home Cooks
            </h2>
            <p className="text-[11px] text-stone-500">
              Showing {filteredCooks.length} kitchen{filteredCooks.length === 1 ? '' : 's'} serving {matchingPincodeArea ? matchingPincodeArea.name : activeAreaObj.name}
            </p>
          </div>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> FSSAI Checked
          </span>
        </div>

        {/* Cooks List or Empty State */}
        {filteredCooks.length > 0 ? (
          <div className="space-y-4">
            {filteredCooks.map((cook) => (
              <div
                key={cook.id}
                onClick={() => onSelectCook(cook.id)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Card Banner Image & Tags */}
                <div className="h-36 relative overflow-hidden bg-stone-100">
                  <img
                    src={cook.coverImage}
                    alt={cook.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Serves Your Area Badge */}
                  <span className="absolute top-2.5 left-2.5 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3 h-3" /> Serves Your Area
                  </span>

                  {/* Veg / Non-Veg badge */}
                  <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs shadow-sm ${
                    cook.isVegOnly
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/40'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-400/40'
                  }`}>
                    {cook.isVegOnly ? '🟢 100% Pure Veg' : '🔴 Veg & Non-Veg'}
                  </span>

                  {/* Price per meal badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-orange-600 text-white font-bold text-xs px-2.5 py-1 rounded-xl shadow-md">
                    ₹{cook.pricePerMeal} <span className="text-[10px] font-normal">/meal</span>
                  </div>

                  {/* Cook details bottom left */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2">
                    <img
                      src={cook.avatar}
                      alt={cook.owner}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow"
                    />
                    <div className="text-white">
                      <h3 className="font-heading font-bold text-sm leading-tight drop-shadow-sm">
                        {cook.name}
                      </h3>
                      <p className="text-[10px] text-stone-200">
                        by {cook.owner} ({cook.experienceYears} yrs)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-md text-[11px] border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {cook.rating}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        ({cook.reviewCount}+ reviews)
                      </span>
                    </div>

                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {cook.kitchenScore}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-1 italic">
                    "{cook.specialty}"
                  </p>

                  {/* Monday Special Preview */}
                  <div className="p-2 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Today's Thali:</span>
                    <span className="font-semibold text-stone-800 truncate max-w-[200px]">
                      {cook.menu.monday.title}
                    </span>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      Free delivery to office desks
                    </span>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>View Menu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for unsupported area or pincode */
          <div className="p-6 bg-white rounded-3xl border border-stone-200 text-center space-y-4 my-4 animate-fade-in shadow-xs">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl mx-auto flex items-center justify-center text-3xl">
              🥘
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-900 text-base">
                No cooks in your area yet
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                We haven’t launched verified home cooks in pincode <strong>{searchPincode || selectedArea}</strong> yet.
              </p>
            </div>

            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100 text-xs text-stone-700 text-left space-y-1.5">
              <span className="font-bold text-orange-950 block">💡 Try these supported Pune hubs:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {puneAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      setSelectedArea(area.id);
                      setSearchPincode('');
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-orange-100 text-orange-800 rounded-lg text-xs font-medium border border-orange-200 transition-colors"
                  >
                    📍 {area.name} ({area.pincode})
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSearchPincode('');
                setSelectedArea('hinjewadi');
              }}
              className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Reset to Hinjewadi Tech Park
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
