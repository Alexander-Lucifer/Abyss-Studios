"use client";

import { useState } from "react";

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+381", name: "Serbia", flag: "🇷🇸" },
  { code: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "+220", name: "Gambia", flag: "🇬🇲" },
  { code: "+221", name: "Senegal", flag: "🇸🇳" },
  { code: "+222", name: "Mauritania", flag: "🇲🇷" },
  { code: "+223", name: "Mali", flag: "🇲🇱" },
  { code: "+224", name: "Guinea", flag: "🇬🇳" },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "+227", name: "Niger", flag: "🇳🇪" },
  { code: "+228", name: "Togo", flag: "🇹🇬" },
  { code: "+229", name: "Benin", flag: "🇧🇯" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { code: "+231", name: "Liberia", flag: "🇱🇷" },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "+235", name: "Chad", flag: "🇹🇩" },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { code: "+239", name: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+241", name: "Gabon", flag: "🇬🇦" },
  { code: "+242", name: "Republic of the Congo", flag: "🇨🇬" },
  { code: "+243", name: "Democratic Republic of the Congo", flag: "🇨🇩" },
  { code: "+244", name: "Angola", flag: "🇦🇴" },
  { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+246", name: "British Indian Ocean Territory", flag: "🇬🇧" },
  { code: "+247", name: "Ascension Island", flag: "🇬🇧" },
  { code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { code: "+249", name: "Sudan", flag: "🇸🇩" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+257", name: "Burundi", flag: "🇧🇮" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { code: "+262", name: "Réunion", flag: "🇫🇷" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { code: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "+268", name: "Eswatini", flag: "🇸🇿" },
  { code: "+269", name: "Comoros", flag: "🇰🇲" },
  { code: "+290", name: "Saint Helena", flag: "🇬🇧" },
  { code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { code: "+297", name: "Aruba", flag: "🇦🇼" },
  { code: "+298", name: "Greenland", flag: "🇬🇱" },
  { code: "+299", name: "Faroe Islands", flag: "🇫🇴" },
  { code: "+350", name: "Gibraltar", flag: "🇬🇮" },
  { code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { code: "+371", name: "Latvia", flag: "🇱🇻" },
  { code: "+372", name: "Estonia", flag: "🇪🇪" },
  { code: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+376", name: "Andorra", flag: "🇦🇩" },
  { code: "+377", name: "Monaco", flag: "🇲🇨" },
  { code: "+378", name: "San Marino", flag: "🇸🇲" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰" },
  { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰" },
  { code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CountryCodeSelector({ value, onChange, className = "" }: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedCountry = countries.find(c => c.code === value) || countries[0];
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toString().includes(searchTerm)
  );

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-3 py-3 text-white outline-none focus:border-[#ff7f9a] flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.code}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-black/95 border border-[#dc143c]/30 rounded-xl backdrop-blur-xl max-h-60 overflow-y-auto min-w-[150px]">
          <div className="sticky top-0 bg-black/95 border-b border-[#dc143c]/20 p-2">
            <input
              type="text"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-black/50 px-3 py-2 text-white text-sm outline-none focus:border-[#ff7f9a] border border-[#dc143c]/30"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={`${country.code}-${country.name}`}
                type="button"
                onClick={() => {
                  onChange(country.code.toString());
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="w-full px-4 py-2 text-left hover:bg-[#dc143c]/20 flex items-center gap-3 transition-colors"
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{country.name}</div>
                  <div className="text-white/60 text-xs">{country.code}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
