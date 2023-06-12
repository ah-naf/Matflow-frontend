import React, { useState, useEffect, useRef } from 'react';

function DropdownMenu() {
  const [filter, setFilter] = useState('');
  const [menuItems, setMenuItems] = useState([
    'Apple',
    'Banana',
    'Cherry',
    'Durian',
    'Elderberry',
    'Fig',
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setIsOpen(true);
  };

  const filteredItems = menuItems.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div ref={dropdownRef}>
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && (
        <ul>
          {filteredItems.map((item) => (
            <li key={item} onClick={() => console.log('first')}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default DropdownMenu