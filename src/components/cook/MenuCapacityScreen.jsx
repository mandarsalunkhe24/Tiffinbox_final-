import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  UtensilsCrossed,
  Save,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

export const MenuCapacityScreen = () => {
  const {
    currentActiveCook,
    updateCookCapacity,
    publishCookMenu,
    cookLanguage,
    addToast
  } = useTiffin();

  // Translations
  const labels = {
    en: {
      heading: 'Kitchen Menu & Daily Capacity',
      subheading: "Manage tomorrow's meal offerings and kitchen production limit",
      capacityTitle: 'Set Daily Kitchen Capacity (Tiffins)',
      capacityDesc: 'Maximum number of tiffins your kitchen can prepare and pack comfortably',
      currentOrders: 'Tomorrow Booked Orders:',
      saveCapacity: 'Save Capacity Limit',
      publishMenuTitle: "Publish Tomorrow's Menu",
      dishName: 'Thali Title / Specialty Name',
      category: 'Dietary Category',
      price: 'Price Per Extra Meal (₹)',
      dishesIncluded: 'Items Included in Thali:',
      publishBtn: "Publish Tomorrow's Menu to Subscribers",
      capacityWarning: "Warning: Booked orders exceed your kitchen's daily capacity!"
    },
    hi: {
      heading: 'रसोई मेन्यू एवं दैनिक क्षमता',
      subheading: 'कल का मेन्यू और रसोई की अधिकतम क्षमता निर्धारित करें',
      capacityTitle: 'दैनिक टिफिन क्षमता सेट करें',
      capacityDesc: 'आपकी रसोई प्रतिदिन कितने टिफिन तैयार कर सकती है',
      currentOrders: 'कल के बुक आर्डर:',
      saveCapacity: 'क्षमता सुरक्षित करें',
      publishMenuTitle: 'कल का मेन्यू प्रकाशित करें',
      dishName: 'थाली का नाम / विशेष व्यंजन',
      category: 'आहार प्रकार',
      price: 'अतिरिक्त भोजन मूल्य (₹)',
      dishesIncluded: 'थाली में शामिल वस्तुएं:',
      publishBtn: 'ग्राहकों के लिए मेन्यू प्रकाशित करें',
      capacityWarning: 'चेतावनी: बुक किए गए आर्डर आपकी रसोई क्षमता से अधिक हैं!'
    },
    mr: {
      heading: 'मेन्यू आणि रोजची क्षमता व्यवस्थापन',
      subheading: 'उद्याचा मेन्यू आणि स्वयंपाकघराची कमाल क्षमता ठरवा',
      capacityTitle: 'दैनिक डबे क्षमता सेट करा',
      capacityDesc: 'आपण एका दिवसात किती डबे तयार करू शकता',
      currentOrders: 'उद्याचे बुक केलेले डबे:',
      saveCapacity: 'क्षमता सेव्ह करा',
      publishMenuTitle: 'उद्याचा मेन्यू प्रसिद्ध करा',
      dishName: 'थाळीचे नाव / विशेष पदार्थ',
      category: 'प्रकार (शाकाहारी / मांसाहारी)',
      price: 'एका जेवणाचा दर (₹)',
      dishesIncluded: 'थाळीतील पदार्थ:',
      publishBtn: 'ग्राहकांसाठी मेन्यू प्रकाशित करा',
      capacityWarning: 'सावधान: बुक केलेले डबे स्वयंपाकघर क्षमतेपेक्षा जास्त आहेत!'
    }
  };

  const l = labels[cookLanguage] || labels.en;

  // Local state for capacity
  const [capacityInput, setCapacityInput] = useState(currentActiveCook.dailyCapacity || 50);

  // Local state for tomorrow's menu
  const [dishTitle, setDishTitle] = useState('Festive Puran Poli & Katachi Amti Thali');
  const [isVeg, setIsVeg] = useState(true);
  const [price, setPrice] = useState(currentActiveCook.pricePerMeal || 110);
  const [items, setItems] = useState([
    'Fresh Warm Puran Poli (2) with Pure Ghee',
    'Spicy Katachi Amti (Chana Dal)',
    'Indrayani Steamed Rice',
    'Crispy Kurdai & Batata Sukhi Bhaji',
    'Khamang Kakdi Koshimbir'
  ]);
  const [newItemText, setNewItemText] = useState('');

  const bookedOrders = 54; // Example booked count
  const isOverCapacity = bookedOrders > parseInt(capacityInput, 10);

  const handleSaveCapacity = (e) => {
    e.preventDefault();
    const val = parseInt(capacityInput, 10);
    if (!isNaN(val) && val > 0) {
      updateCookCapacity(currentActiveCook.id, val);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      setItems([...items, newItemText.trim()]);
      setNewItemText('');
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handlePublishMenu = (e) => {
    e.preventDefault();
    publishCookMenu(currentActiveCook.id, {
      title: dishTitle,
      isVeg,
      price: parseInt(price, 10),
      items
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-stone-900">
          {l.heading}
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          {l.subheading}
        </p>
      </div>

      {/* CAPACITY SETTING CARD */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <h2 className="font-heading font-bold text-base text-stone-900">
              {l.capacityTitle}
            </h2>
            <p className="text-xs text-stone-500">
              {l.capacityDesc}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-400 block">{l.currentOrders}</span>
            <span className="font-heading font-extrabold text-lg text-emerald-800">
              {bookedOrders} tiffins
            </span>
          </div>
        </div>

        {/* Warning Banner if orders exceed capacity */}
        {isOverCapacity && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-rose-950 flex items-start gap-3 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-rose-900">
                {l.capacityWarning}
              </h4>
              <p className="text-xs text-rose-800 mt-0.5">
                Tomorrow's booked orders (<strong>{bookedOrders}</strong>) exceed your set kitchen capacity of <strong>{capacityInput}</strong>! Please increase capacity or pause new subscriptions to avoid dispatch delays.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSaveCapacity} className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Max Tiffins / Day:
            </label>
            <input
              id="capacity-input"
              type="number"
              min={10}
              max={300}
              value={capacityInput}
              onChange={(e) => setCapacityInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 py-2.5 px-3.5 rounded-xl font-bold text-stone-900 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="mt-5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{l.saveCapacity}</span>
          </button>
        </form>
      </div>

      {/* TOMORROW'S MENU PUBLISHER */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="font-heading font-bold text-base text-stone-900">
              {l.publishMenuTitle}
            </h2>
            <p className="text-xs text-stone-500">
              Changes reflect instantly in all office workers' apps across Hinjewadi and Kothrud
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
            Tomorrow's Special
          </span>
        </div>

        <form onSubmit={handlePublishMenu} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dish Title */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {l.dishName}
              </label>
              <input
                type="text"
                value={dishTitle}
                onChange={(e) => setDishTitle(e.target.value)}
                placeholder="e.g. Maharashtrian Thali with Pithla Bhakri"
                className="w-full bg-stone-50 border border-stone-300 py-2.5 px-3.5 rounded-xl font-semibold text-stone-900 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {l.price}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 py-2.5 px-3.5 rounded-xl font-bold text-stone-900 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Veg / Non-Veg Toggle */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              {l.category}
            </label>
            <div className="flex gap-3">
              <label className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                isVeg
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}>
                <input
                  type="radio"
                  name="dishCategory"
                  checked={isVeg}
                  onChange={() => setIsVeg(true)}
                  className="accent-emerald-700"
                />
                <span>🥬 100% Pure Veg</span>
              </label>

              <label className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                !isVeg
                  ? 'bg-rose-50 border-rose-500 text-rose-900'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}>
                <input
                  type="radio"
                  name="dishCategory"
                  checked={!isVeg}
                  onChange={() => setIsVeg(false)}
                  className="accent-rose-700"
                />
                <span>🍗 Non-Veg Included</span>
              </label>
            </div>
          </div>

          {/* Included Items Checklist */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              {l.dishesIncluded}
            </label>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-stone-800">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Item Row */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add another item (e.g. Boondi Raita, Gulab Jamun)"
                className="flex-1 bg-white border border-stone-300 py-2 px-3 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-stone-800 hover:bg-black text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-stone-100 flex justify-end">
            <button
              id="publish-menu-btn"
              type="submit"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-700/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{l.publishBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
