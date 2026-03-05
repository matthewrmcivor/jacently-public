import React from 'react';
import { Event } from '../../data/mockEvents';
import './EventCard.css';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Markets & Fairs': '🎪',
      'Entertainment & Nightlife': '🎤',
      'Community & Social': '🎯',
      'Food & Drink': '🍔',
      'Arts & Culture': '🎨',
      'Sports & Recreation': '⚽',
      'Educational & Workshops': '📚',
      'Family & Kids': '👨‍👩‍👧‍👦'
    };
    return icons[category] || '📅';
  };

  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <div className="event-card-header">
        <span className="event-card-icon">{getCategoryIcon(event.category)}</span>
        <div className="event-card-title-section">
          <h3 className="event-card-title">{event.title}</h3>
          <div className="event-card-meta">
            <span className="event-card-date">
              {formatDate(event.startDate)}, {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
            {event.distance !== undefined && (
              <span className="event-card-distance">📍 {event.distance.toFixed(1)} mi away</span>
            )}
          </div>
        </div>
      </div>
      <div className="event-card-tags">
        {event.isFree && <span className="tag tag-free">Free</span>}
        {event.isFamilyFriendly && <span className="tag tag-family">Family-Friendly</span>}
        {event.ageRestriction && <span className="tag tag-age">{event.ageRestriction}</span>}
        {!event.isFree && event.price && (
          <span className="tag tag-paid">${event.price}</span>
        )}
      </div>
    </div>
  );
};

export default EventCard;

