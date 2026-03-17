import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, IndianRupee, Home, Layers, CheckCircle2, Bath, Sofa, Box, Maximize, ArrowUp, Paintbrush, Utensils, Sparkles, CarFront, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

export default function CostEstimator() {
  const [builtUpArea, setBuiltUpArea] = useState<string>('');
  const [gfRooms, setGfRooms] = useState<number>(2);
  const [ffRooms, setFfRooms] = useState<number>(1);
  const [roomSizeType, setRoomSizeType] = useState<'preset' | 'custom'>('preset');
  const [roomSizePreset, setRoomSizePreset] = useState<'Small' | 'Medium' | 'Big'>('Medium');
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('15');
  const [washrooms, setWashrooms] = useState<number>(2);
  const [kitchens, setKitchens] = useState<number>(1);
  
  const [hasStore, setHasStore] = useState<boolean>(false);
  const [hasLobby, setHasLobby] = useState<boolean>(true);
  const [hasDrawingRoom, setHasDrawingRoom] = useState<boolean>(true);
  const [hasFamilyLounge, setHasFamilyLounge] = useState<boolean>(false);
  const [hasPooja, setHasPooja] = useState<boolean>(false);
  const [hasPorch, setHasPorch] = useState<boolean>(true);
  const [hasStairs, setHasStairs] = useState<boolean>(true);
  
  const [quality, setQuality] = useState<'A' | 'B' | 'C'>('B');
  const [hasBasement, setHasBasement] = useState<boolean>(false);
  const [furnishing, setFurnishing] = useState<'None' | 'Interior' | 'Furnished'>('None');
  
  const [plotLength, setPlotLength] = useState<string>('');
  const [plotWidth, setPlotWidth] = useState<string>('');
  const [plotArea, setPlotArea] = useState<string>('');
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [estimate, setEstimate] = useState<{ min: number; max: number; area: number } | null>(null);

  useEffect(() => {
    calculateEstimate();
  }, [builtUpArea, gfRooms, ffRooms, roomSizeType, roomSizePreset, roomLength, roomWidth, washrooms, kitchens, hasStore, hasLobby, hasDrawingRoom, hasFamilyLounge, hasPooja, hasPorch, hasStairs, quality, hasBasement, furnishing]);

  const calculateEstimate = () => {
    const bArea = parseFloat(builtUpArea) || 0;
    
    const totalRooms = gfRooms + ffRooms;
    
    if (totalRooms === 0 && bArea === 0 && !hasStore && !hasLobby && !hasDrawingRoom && !hasFamilyLounge && !hasPooja && !hasPorch && !hasStairs && kitchens === 0 && washrooms === 0) {
      setEstimate(null);
      return;
    }

    const roomSizes = {
      'Small': 120,
      'Medium': 180,
      'Big': 250
    };
    const areaPerRoom = roomSizeType === 'preset' 
      ? roomSizes[roomSizePreset] 
      : (parseFloat(roomLength) || 0) * (parseFloat(roomWidth) || 0);
    
    const roomsArea = totalRooms * areaPerRoom;
    const drawingRoomArea = hasDrawingRoom ? 250 : 0;
    const washroomsArea = washrooms * 60;
    const kitchensArea = kitchens * 150;
    const storeArea = hasStore ? 80 : 0;
    const lobbyArea = hasLobby ? 315 : 0;
    const loungeArea = hasFamilyLounge ? 220 : 0;
    const poojaArea = hasPooja ? 40 : 0;
    const porchArea = hasPorch ? 220 : 0;
    const stairsArea = hasStairs ? 140 : 0;

    // Total functional area
    const functionalArea = roomsArea + drawingRoomArea + washroomsArea + kitchensArea + storeArea + lobbyArea + loungeArea + poojaArea + porchArea + stairsArea;
    
    // Add 10% for walls and circulation (corridors, etc.)
    const calculatedArea = functionalArea * 1.1;

    const effectiveBuiltUpArea = bArea > 0 ? bArea : calculatedArea;

    // Base construction rates per sq.ft (approximate current Indian market rates)
    const rates = {
      'A': { min: 2000, max: 2500 }, // Premium
      'B': { min: 1500, max: 1800 }, // Standard
      'C': { min: 1200, max: 1400 }, // Basic
    };

    const baseRate = rates[quality];
    
    let minCost = effectiveBuiltUpArea * baseRate.min;
    let maxCost = effectiveBuiltUpArea * baseRate.max;

    // Basement calculation (assuming basement is roughly the size of the ground floor)
    if (hasBasement) {
      const gfRatio = totalRooms > 0 ? (gfRooms / totalRooms) : 0.5;
      const basementArea = effectiveBuiltUpArea * gfRatio;
      const basementRate = 1000; // Approx rate for basement
      minCost += basementArea * basementRate;
      maxCost += basementArea * (basementRate + 200);
    }

    // Furnishing & Interior calculation
    const furnishingRates = {
      'None': { min: 0, max: 0 },
      'Interior': { min: 600, max: 900 }, // Modular kitchen, wardrobes, false ceiling
      'Furnished': { min: 1200, max: 1800 } // Complete interior + furniture
    };

    const fRate = furnishingRates[furnishing];
    minCost += effectiveBuiltUpArea * fRate.min;
    maxCost += effectiveBuiltUpArea * fRate.max;
    
    setEstimate({
      min: minCost,
      max: maxCost,
      area: effectiveBuiltUpArea
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lac`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  const handlePlotLengthChange = (val: string) => {
    setPlotLength(val);
    const l = parseFloat(val);
    const w = parseFloat(plotWidth);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setPlotArea((l * w).toString());
    }
  };

  const handlePlotWidthChange = (val: string) => {
    setPlotWidth(val);
    const l = parseFloat(plotLength);
    const w = parseFloat(val);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setPlotArea((l * w).toString());
    }
  };

  const handlePlotAreaChange = (val: string) => {
    setPlotArea(val);
    setPlotLength('');
    setPlotWidth('');
  };

  const getWhatsAppLink = () => {
    if (!estimate) return "https://wa.me/916283116822";

    const additionalSpaces = [];
    if (hasStore) additionalSpaces.push("Store Room");
    if (hasLobby) additionalSpaces.push("Lobby");
    if (hasDrawingRoom) additionalSpaces.push("Drawing Room");
    if (hasFamilyLounge) additionalSpaces.push("Family Lounge");
    if (hasPooja) additionalSpaces.push("Pooja Room");
    if (hasPorch) additionalSpaces.push("Porch / Parking");
    if (hasStairs) additionalSpaces.push("Staircase");

    const spacesText = additionalSpaces.length > 0 ? additionalSpaces.join(", ") : "None";
    const roomSizeText = roomSizeType === 'preset' ? roomSizePreset : `${roomLength}x${roomWidth} ft`;

    const message = `Hi, I would like to get a detailed quote for my construction project. Here are my requirements:

*Floor Plan:*
${plotArea ? `- Plot Area: ${plotArea} sq.ft ${plotLength && plotWidth ? `(${plotLength}x${plotWidth} ft)` : ''}\n` : ''}- Ground Floor Rooms: ${gfRooms}
- First Floor Rooms: ${ffRooms}
- Approx. Room Size: ${roomSizeText}
- Washrooms: ${washrooms}
- Kitchens: ${kitchens}

*Additional Spaces:*
- ${spacesText}

*Construction Details:*
- Quality Class: Class ${quality}
- Interior & Furnishing: ${furnishing}
- Basement: ${hasBasement ? 'Yes' : 'No'}
${builtUpArea ? `- Custom Built-up Area: ${builtUpArea} sq.ft\n` : ''}*Estimates:*
- Est. Built-up Area: ${estimate.area.toFixed(0)} sq.ft
- Estimated Cost: ${formatCurrency(estimate.min)} to ${formatCurrency(estimate.max)}

Please let me know the next steps!`;

    return `https://wa.me/916283116822?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto" id="cost-estimator">
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Construction Cost Estimator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Plan your budget with our intelligent cost calculator. Get an instant approximate estimate based on your requirements.
          </p>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-[#F2C94C] hover:bg-[#e5bc40] text-black font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Calculator className="w-5 h-5" />
            {isOpen ? 'Hide Calculator' : 'Open Cost Calculator'}
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-8">
              {/* Form Section */}
              <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Ground Floor Rooms */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Home className="w-4 h-4 text-[#F2C94C]" /> Ground Floor Rooms
              </label>
              <select 
                value={gfRooms}
                onChange={(e) => setGfRooms(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                  <option key={`gf-${num}`} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                ))}
              </select>
            </div>

            {/* First Floor Rooms */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <ArrowUp className="w-4 h-4 text-[#F2C94C]" /> First Floor Rooms
              </label>
              <select 
                value={ffRooms}
                onChange={(e) => setFfRooms(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                  <option key={`ff-${num}`} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                ))}
              </select>
            </div>

            {/* Room Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Maximize className="w-4 h-4 text-[#F2C94C]" /> Approx. Room Size
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setRoomSizeType('preset')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${roomSizeType === 'preset' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Standard
                  </button>
                  <button 
                    onClick={() => setRoomSizeType('custom')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${roomSizeType === 'custom' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Custom
                  </button>
                </div>
              </div>
              
              {roomSizeType === 'preset' ? (
                <select 
                  value={roomSizePreset}
                  onChange={(e) => setRoomSizePreset(e.target.value as 'Small' | 'Medium' | 'Big')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                >
                  <option value="Small">Small (~120 sq.ft)</option>
                  <option value="Medium">Medium (~180 sq.ft)</option>
                  <option value="Big">Big (~250 sq.ft)</option>
                </select>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="number" 
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                      placeholder="Length (ft)"
                    />
                  </div>
                  <div>
                    <input 
                      type="number" 
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                      placeholder="Width (ft)"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Washrooms */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Bath className="w-4 h-4 text-[#F2C94C]" /> Washrooms Quantity
              </label>
              <select 
                value={washrooms}
                onChange={(e) => setWashrooms(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={`bath-${num}`} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Kitchens */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Utensils className="w-4 h-4 text-[#F2C94C]" /> Kitchens Quantity
              </label>
              <select 
                value={kitchens}
                onChange={(e) => setKitchens(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={`kit-${num}`} value={num}>{num} {num === 1 ? 'Kitchen' : 'Kitchens'}</option>
                ))}
              </select>
            </div>

            {/* Additional Spaces */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Layers className="w-4 h-4 text-[#F2C94C]" /> Additional Spaces
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setHasDrawingRoom(!hasDrawingRoom)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasDrawingRoom ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasDrawingRoom ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Sofa className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Drawing Room</span>
                </button>

                <button
                  onClick={() => setHasStore(!hasStore)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasStore ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasStore ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Box className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Store Room</span>
                </button>

                <button
                  onClick={() => setHasLobby(!hasLobby)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasLobby ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasLobby ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Lobby</span>
                </button>

                <button
                  onClick={() => setHasFamilyLounge(!hasFamilyLounge)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasFamilyLounge ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasFamilyLounge ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Family Lounge</span>
                </button>

                <button
                  onClick={() => setHasPooja(!hasPooja)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasPooja ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasPooja ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Pooja Room</span>
                </button>

                <button
                  onClick={() => setHasPorch(!hasPorch)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasPorch ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasPorch ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <CarFront className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Porch / Parking</span>
                </button>

                <button
                  onClick={() => setHasStairs(!hasStairs)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasStairs ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasStairs ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Staircase</span>
                </button>
              </div>
            </div>

            {/* Quality of Construction */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#F2C94C]" /> Quality of Construction
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'A', name: 'Premium (Class A)', desc: 'Teak wood, Italian marble, premium fittings' },
                  { id: 'B', name: 'Standard (Class B)', desc: 'Vitrified tiles, flush doors, standard fittings' },
                  { id: 'C', name: 'Basic (Class C)', desc: 'Ceramic tiles, basic wood, economy fittings' }
                ].map((q) => (
                  <div 
                    key={q.id}
                    onClick={() => setQuality(q.id as 'A' | 'B' | 'C')}
                    className={`cursor-pointer border rounded-xl p-4 transition-all ${quality === q.id ? 'border-[#F2C94C] bg-[#F2C94C]/5 shadow-md' : 'border-gray-200 hover:border-[#F2C94C]/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{q.name}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${quality === q.id ? 'border-[#F2C94C]' : 'border-gray-300'}`}>
                        {quality === q.id && <div className="w-2 h-2 bg-[#F2C94C] rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{q.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Furnishing Level */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Paintbrush className="w-4 h-4 text-[#F2C94C]" /> Interior & Furnishing
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'None', name: 'Bare Shell', desc: 'Civil construction & basic finishing only' },
                  { id: 'Interior', name: 'Basic Interior', desc: 'Modular kitchen, wardrobes, false ceiling' },
                  { id: 'Furnished', name: 'Fully Furnished', desc: 'Complete interior + furniture & appliances' }
                ].map((f) => (
                  <div 
                    key={f.id}
                    onClick={() => setFurnishing(f.id as 'None' | 'Interior' | 'Furnished')}
                    className={`cursor-pointer border rounded-xl p-4 transition-all ${furnishing === f.id ? 'border-[#F2C94C] bg-[#F2C94C]/5 shadow-md' : 'border-gray-200 hover:border-[#F2C94C]/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{f.name}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${furnishing === f.id ? 'border-[#F2C94C]' : 'border-gray-300'}`}>
                        {furnishing === f.id && <div className="w-2 h-2 bg-[#F2C94C] rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Basement Toggle */}
            <div className="space-y-2 md:col-span-2 flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <label className="font-bold text-gray-900 block">Include Basement?</label>
                <span className="text-xs text-gray-500">Adds extra cost for excavation and retaining walls</span>
              </div>
              <button 
                onClick={() => setHasBasement(!hasBasement)}
                className={`w-14 h-8 rounded-full transition-colors relative ${hasBasement ? 'bg-[#F2C94C]' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${hasBasement ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            {/* Area Override */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Maximize className="w-4 h-4 text-[#F2C94C]" /> Area Details
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold block">Plot Area <span className="font-normal">(Optional)</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input 
                        type="number" 
                        value={plotLength}
                        onChange={(e) => handlePlotLengthChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="L (ft)"
                      />
                    </div>
                    <div>
                      <input 
                        type="number" 
                        value={plotWidth}
                        onChange={(e) => handlePlotWidthChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="W (ft)"
                      />
                    </div>
                    <div>
                      <input 
                        type="number" 
                        value={plotArea}
                        onChange={(e) => handlePlotAreaChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="Total sq.ft"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold block">Built-up Area Override</label>
                  <input 
                    type="number" 
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                    placeholder="Override calculated sq.ft"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Result Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1A1A1A] rounded-3xl p-6 md:p-8 shadow-2xl text-white lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#F2C94C]/20 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#F2C94C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold">Estimated Cost</h3>
          </div>

          {estimate ? (
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Approximate Range</p>
                <div className="text-3xl md:text-4xl font-bold text-[#F2C94C]">
                  {formatCurrency(estimate.min)}
                </div>
                <div className="text-xl text-gray-300 mt-1">
                  to {formatCurrency(estimate.max)}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                {plotArea && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Plot Area:</span>
                    <div className="text-right">
                      <span className="font-bold block">{plotArea} sq.ft</span>
                      {plotLength && plotWidth && (
                        <span className="text-xs text-gray-400">({plotLength} × {plotWidth} ft)</span>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Est. Built-up Area:</span>
                  <span className="font-bold">{estimate.area.toFixed(0)} sq.ft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quality Class:</span>
                  <span className="font-bold">Class {quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Furnishing:</span>
                  <span className="font-bold">{furnishing === 'None' ? 'Bare Shell' : furnishing === 'Interior' ? 'Basic Interior' : 'Fully Furnished'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Basement:</span>
                  <span className="font-bold">{hasBasement ? 'Included' : 'None'}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mt-6">
                <p className="text-xs text-gray-400 leading-relaxed">
                  *Disclaimer: This is a rough estimate based on current market rates. Actual costs may vary depending on location, material choices, soil conditions, and specific design requirements.
                </p>
              </div>

              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 bg-[#F2C94C] hover:bg-[#e5bc40] text-black text-center font-bold rounded-xl transition-colors mt-6"
              >
                Get a Detailed Quote
              </a>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <IndianRupee className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Select your requirements to see the estimated construction cost.</p>
            </div>
          )}
        </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
