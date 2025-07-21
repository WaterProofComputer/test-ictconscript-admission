import { useState } from 'react';
import type { LogEntry } from '../types';

interface Props {
  onClose: () => void;
  onSubmit: (entry: Omit<LogEntry, 'id'>) => void;
}

export default function NewEntryModal({ onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isoTime, setIsoTime] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Omit<LogEntry, 'id'> = {
      title,
      body,
      isoTime: isoTime || new Date().toISOString(),
      lat: lat ? parseFloat(lat) : null,
      lon: lon ? parseFloat(lon) : null
    };
    onSubmit(newEntry);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Body"
            required
          />
          <input
            value={isoTime}
            onChange={e => setIsoTime(e.target.value)}
            placeholder="ISO time (optional)"
            type="datetime-local"
          />
          <input
            value={lat}
            onChange={e => setLat(e.target.value)}
            placeholder="Latitude (optional)"
            type="number"
            step="any"
          />
          <input
            value={lon}
            onChange={e => setLon(e.target.value)}
            placeholder="Longitude (optional)"
            type="number"
            step="any"
          />
          <button type="submit">Add Entry</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
