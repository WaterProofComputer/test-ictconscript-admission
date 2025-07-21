export interface LogEntry {
  id: string;
  title: string;
  body: string;
  isoTime: string; // ISO timestamp
  lat: number | null;
  lon: number | null;
}
