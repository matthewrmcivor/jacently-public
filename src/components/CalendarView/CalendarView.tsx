import React, { useState, useMemo } from 'react';
import { Event } from '../../data/mockEvents';
import './CalendarView.css';

interface CalendarViewProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

type CalendarMode = 'month' | 'week';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarView: React.FC<CalendarViewProps> = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState<CalendarMode>('month');

  // Get events grouped by date
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    events.forEach(event => {
      const dateKey = event.startDate; // YYYY-MM-DD format
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  }, [events]);

  // Get days for month view
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Add days from next month to complete the grid (6 weeks)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  }, [currentDate]);

  // Get days for week view
  const weekDays = useMemo(() => {
    const days: Date[] = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }

    return days;
  }, [currentDate]);

  // Generate hours for week view
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (mode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (mode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderTitle = (): string => {
    if (mode === 'month') {
      return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
      } else {
        return `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTHS[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      }
    }
  };

  const renderMonthView = () => (
    <div className="calendar-month">
      <div className="calendar-weekdays">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {monthDays.map(({ date, isCurrentMonth }, index) => {
          const dateKey = formatDateKey(date);
          const dayEvents = eventsByDate[dateKey] || [];
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={index}
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday(date) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
            >
              <span className="day-number">{date.getDate()}</span>
              {hasEvents && (
                <div className="day-events">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="day-event"
                      onClick={() => onEventClick(event)}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="day-event-more">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="calendar-week">
      <div className="week-header">
        <div className="week-time-gutter"></div>
        {weekDays.map((date, index) => (
          <div key={index} className={`week-day-header ${isToday(date) ? 'today' : ''}`}>
            <span className="week-day-name">{DAYS_OF_WEEK[date.getDay()]}</span>
            <span className="week-day-number">{date.getDate()}</span>
          </div>
        ))}
      </div>
      <div className="week-body">
        <div className="week-time-column">
          {hours.map(hour => (
            <div key={hour} className="week-time-slot">
              <span className="week-time-label">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>
        <div className="week-days-grid">
          {weekDays.map((date, dayIndex) => {
            const dateKey = formatDateKey(date);
            const dayEvents = eventsByDate[dateKey] || [];

            return (
              <div key={dayIndex} className={`week-day-column ${isToday(date) ? 'today' : ''}`}>
                {hours.map(hour => (
                  <div key={hour} className="week-hour-cell"></div>
                ))}
                {dayEvents.map(event => {
                  const [hours, minutes] = event.startTime.split(':').map(Number);
                  const topPosition = (hours + minutes / 60) * 60; // 60px per hour

                  return (
                    <div
                      key={event.id}
                      className="week-event"
                      style={{ top: `${topPosition}px` }}
                      onClick={() => onEventClick(event)}
                      title={`${event.title} - ${event.startTime}`}
                    >
                      <div className="week-event-time">{event.startTime}</div>
                      <div className="week-event-title">{event.title}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={navigatePrevious}>
            &lt;
          </button>
          <button className="calendar-today-btn" onClick={goToToday}>
            Today
          </button>
          <button className="calendar-nav-btn" onClick={navigateNext}>
            &gt;
          </button>
        </div>

        <h2 className="calendar-title">{getHeaderTitle()}</h2>

        <div className="calendar-mode-toggle">
          <button
            className={`calendar-mode-btn ${mode === 'month' ? 'active' : ''}`}
            onClick={() => setMode('month')}
          >
            Month
          </button>
          <button
            className={`calendar-mode-btn ${mode === 'week' ? 'active' : ''}`}
            onClick={() => setMode('week')}
          >
            Week
          </button>
        </div>
      </div>

      <div className="calendar-content">
        {mode === 'month' ? renderMonthView() : renderWeekView()}
      </div>
    </div>
  );
};

export default CalendarView;
