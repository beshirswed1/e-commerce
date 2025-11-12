'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bell, ChevronDown } from 'lucide-react';
import flagImg from '../../../public/images/flag.png';
import adminImg from '../../../public/images/admin.png';

const Header = ({ adminName = 'Admin Name', adminAvatar = adminImg }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // "notifications", "userMenu", "language"
  const [selectedLang, setSelectedLang] = useState('English');

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const notifications = [
    { id: 1, text: 'New order received' },
    { id: 2, text: 'Server restarted successfully' },
    { id: 3, text: 'New user registered' },
  ];

  const languages = ['English', 'Arabic', 'Turkish'];

  return (
    <header className="bg-[#101F30] shadow-lg border-b border-[#2B1A0F] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        {/* عنوان الصفحة */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#F3EEE8]">
          Dashboard
        </h1>

        {/* الجهة اليمنى */}
        <div className="flex items-center space-x-3 sm:space-x-6 relative">
          {/* اختيار اللغة */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('language')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-[#D8C2A7]/20 transition"
            >
              <Image
                src={flagImg}
                alt="country flag"
                width={25}
                height={18}
                className="rounded-sm"
              />
              <span className="text-[#F3EEE8] text-sm hidden sm:block">
                {selectedLang}
              </span>
              <ChevronDown className="w-4 h-4 text-[#F3EEE8]" />
            </button>

            {openDropdown === 'language' && (
              <ul className="absolute right-0 mt-2 w-40 bg-[#101F30] border border-[#2B1A0F] rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setOpenDropdown(null);
                    }}
                    className={`px-4 py-2 text-[#F3EEE8] hover:bg-[#D8C2A7]/20 cursor-pointer ${
                      selectedLang === lang ? 'bg-[#D8C2A7]/20 font-semibold' : ''
                    }`}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* الإشعارات */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('notifications')}
              className="relative p-2 rounded-full hover:bg-[#D8C2A7]/20 transition"
            >
              <Bell className="w-6 h-6 text-[#F3EEE8]" />
              <span className="absolute top-1 right-1 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>

            {openDropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-72 bg-[#101F30] border border-[#2B1A0F] rounded-lg shadow-lg z-50 overflow-hidden">
                <ul>
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="px-4 py-3 text-[#F3EEE8] text-sm hover:bg-[#D8C2A7]/20 cursor-pointer transition"
                    >
                      {n.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* حساب الأدمن */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('userMenu')}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#D8C2A7]/20 transition"
            >
              <Image
                src={adminAvatar}
                alt="admin"
                width={35}
                height={35}
                className="rounded-full border border-[#2B1A0F] hover:ring-2 hover:ring-[#D8C2A7] transition"
              />
              <span className="hidden sm:block text-[#F3EEE8] font-medium">
                {adminName}
              </span>
              <ChevronDown className="w-4 h-4 text-[#F3EEE8]" />
            </button>

            {openDropdown === 'userMenu' && (
              <ul className="absolute right-0 mt-2 w-40 bg-[#101F30] border border-[#2B1A0F] rounded-lg shadow-lg z-50">
                <li className="px-4 py-2 text-[#F3EEE8] hover:bg-[#D8C2A7]/20 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 text-[#F3EEE8] hover:bg-[#D8C2A7]/20 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 text-[#F3EEE8] hover:bg-[#D8C2A7]/20 cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
