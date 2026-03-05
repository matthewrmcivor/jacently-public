import React from 'react';
import { Event } from '../../data/mockEvents';
import './EventDetail.css';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleGetDirections = () => {
    const address = `${event.address.street}, ${event.address.city}, ${event.address.state} ${event.address.zipCode}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="event-detail-overlay" onClick={onClose}>
      <div className="event-detail" onClick={(e) => e.stopPropagation()}>
        <button className="event-detail-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {event.thumbnail && (
          <div className="event-detail-image">
            <img src={event.thumbnail} alt={event.title} />
          </div>
        )}

        <div className="event-detail-content">
          <div className="event-detail-header">
            <span className="event-detail-icon">{getCategoryIcon(event.category)}</span>
            <div>
              <h1 className="event-detail-title">{event.title}</h1>
              <p className="event-detail-category">{event.category}</p>
            </div>
          </div>

          <div className="event-detail-info">
            <div className="info-item">
              <span className="info-label">📍 Location</span>
              <span className="info-value">
                {event.address.street}, {event.address.city}, {event.address.state} {event.address.zipCode}
              </span>
              {event.distance !== undefined && (
                <span className="info-distance">{event.distance.toFixed(1)} miles away</span>
              )}
            </div>

            <div className="info-item">
              <span className="info-label">📅 Date & Time</span>
              <span className="info-value">
                {formatDate(event.startDate)}
              </span>
              <span className="info-value">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">💰 Cost</span>
              <span className="info-value">
                {event.isFree ? 'Free' : `$${event.price || 'TBD'}`}
              </span>
            </div>
          </div>

          <div className="event-detail-tags">
            {event.isFree && <span className="tag tag-free">Free</span>}
            {event.isFamilyFriendly && <span className="tag tag-family">Family-Friendly</span>}
            {event.ageRestriction && <span className="tag tag-age">{event.ageRestriction}</span>}
          </div>

          <div className="event-detail-description">
            <h2>About</h2>
            <p>{event.description}</p>
          </div>

          <div className="event-detail-contact">
            <h2>Contact</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Organizer:</span>
                <span className="contact-value">{event.organizer.name}</span>
              </div>
              {event.organizer.email && (
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href={`mailto:${event.organizer.email}`} className="contact-value">
                    {event.organizer.email}
                  </a>
                </div>
              )}
              {event.organizer.phone && (
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <a href={`tel:${event.organizer.phone}`} className="contact-value">
                    {event.organizer.phone}
                  </a>
                </div>
              )}
              {event.organizer.website && (
                <div className="contact-item">
                  <span className="contact-label">Website:</span>
                  <a href={event.organizer.website} target="_blank" rel="noopener noreferrer" className="contact-value">
                    {event.organizer.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="event-detail-actions">
            <button className="btn btn-primary" onClick={handleGetDirections}>
              Get Directions
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

