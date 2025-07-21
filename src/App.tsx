import { useEffect, useState } from 'react';
import './index.css';
import type { LogEntry } from './types';
import NewEntryModal from './components/NewEntryModal';
import MapThumbnail from './components/MapThumbnail';  // <--- import it here

function App() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('./sample-data/entries.json')
      .then(res => res.json())
      .then((data: LogEntry[]) => setEntries(data))
      .catch(err => console.error(err));
  }, []);

  const addNewEntry = (newEntry: Omit<LogEntry, 'id'>) => {
    const entryWithId: LogEntry = {
      id: (Date.now()).toString(),
      ...newEntry
    };
    setEntries(prev => [...prev, entryWithId]);
    setShowModal(false);
  };

  return (
    <div className="app">
      <h1>Log Entries</h1>
      <button onClick={() => setShowModal(true)}>New Entry</button>

      <div className="entries">
        {[...entries]
          .sort((a, b) => new Date(b.isoTime).getTime() - new Date(a.isoTime).getTime())
          .map(entry => (
            <div className="entry" key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <p><small>{new Date(entry.isoTime).toLocaleString()}</small></p>

              {/* Replace lat/lon text with MapThumbnail */}
              {entry.lat != null && entry.lon != null && (
                <MapThumbnail lat={entry.lat} lon={entry.lon} />
              )}
            </div>
          ))}
      </div>

      {showModal && (
        <NewEntryModal onClose={() => setShowModal(false)} onSubmit={addNewEntry} />
      )}
    </div>
  );
}

export default App;