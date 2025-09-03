import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  onChange?: (dates: { start: Date | null; end: Date | null }) => void;
  darkMode?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    display,
  onChange,
  darkMode = true,
  submit
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: Date[] = [];
    
    // Add previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };
  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };
  const handleDateClick = (date: Date) => {
    if (isFutureDate(date)) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
        onChange?.({ start: startDate, end: date });
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !hoverDate) return false;
    return date > startDate && date <= hoverDate;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    isOpen&&
    <div className="relative font-sans">
      <div
        className={`flex items-center gap-3 p-4 rounded cursor-pointer transition-all duration-200 DateRangePickerHeader ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* <Calendar className={darkMode ? 'text-blue-400' : 'text-blue-500'} /> */}
        <span className="flex-1 " style={{backgroundColor:'#0a8120'}}>
          {startDate ? (
            <>
            SELECT DATE<br/>
              {formatDate(startDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </>
          ) : (
            'SELECT DATE'
          )}
        </span>
      </div>

      {isOpen && (
        <div className={`absolute mt-2 p-4 rounded shadow-lg z-50 w-[360px] ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <button
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            >
              ←
            </button>
            <span className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {monthYear}
            </span>
            <button
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div
                key={`header-${day}-${index}`}
                className={`text-center text-sm font-medium py-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isSelected = startDate?.toDateString() === date.toDateString() ||
                               endDate?.toDateString() === date.toDateString();
              const isInRange = startDate && endDate &&
                               date > startDate && date < endDate;
              const isHoverRange = !endDate && isDateInRange(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={`${date.toISOString()}-${index}`}
                  className={`
                    relative text-center py-2 text-sm cursor-pointer transition-all duration-200
                    ${!isCurrentMonth 
                      ? (darkMode ? 'text-gray-600' : 'text-gray-400') 
                      : darkMode ? 'text-gray-100' : 'text-gray-900'
                    }
                    ${isSelected 
                      ? (darkMode ? 'bg-green-600 text-white rounded-full' : 'bg-blue-500 text-white')
                      : ''
                    }
                    ${(isInRange || isHoverRange)
                      ? (darkMode ? 'bg-green-900/30 selectedInBetweenElementsDatePicker' : 'bg-blue-50')
                      : ''
                    }
                    ${!isSelected && isCurrentMonth 
                      ? (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                      : ''
                    }
                    ${isToday && !isSelected
                      ? (darkMode ? 'border border-blue-400' : 'border border-blue-500')
                      : ''
                    }
                  `}
                  onClick={() => isCurrentMonth && handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}

              style={{backgroundColor:'#000000',color:'green'}}
            >
              CANCEL
            </button>
            <button
              onClick={() => {submit(true);setIsOpen(false)}}
              className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors ${
                darkMode 
                  ? 'bg-black-600 hover:bg-black-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={!startDate || !endDate}
              style={{backgroundColor:'#000000',color:(!startDate || !endDate)?'#030303':'green'}}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};