
// 1. Interfaces
export interface Game {
  id: string;
  title: string;
  publisher: string;
  year: number;
  genre: string;
  romUrl: string;
  description: string;
  gradientClass: string;
  icon: string;
  coverImage?: string;
  system: 'n64' | 'snes' | 'gba';
}
