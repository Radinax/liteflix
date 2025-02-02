import React, { useState } from "react";
import CheckIcon from "@/assets/check.svg";
import ArrowIcon from "@/assets/arrow.svg";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  items: string[];
  onSelect: (selectedItem: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(items[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="bg-transparent text-white px-4 py-2 flex items-center justify-start gap-4 w-fit hover:cursor-pointer"
      >
        <span>{selectedItem || "Select an item"}</span>
        <img
          src={ArrowIcon}
          alt="arrow"
          className={`h-2 w-3 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bg-primary text-white shadow-lg z-100 px-6 py-7 w-60 right-0">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className={twMerge(
                  "px-4 py-2 hover:bg-gray-500 cursor-pointer flex items-center justify-between gap-4",
                  selectedItem === item ? "font-bold" : "font-normal"
                )}
              >
                <span>{item}</span>
                {selectedItem === item && (
                  <img src={CheckIcon} className="w-3 h-2" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
