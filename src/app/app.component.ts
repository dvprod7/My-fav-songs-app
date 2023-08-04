import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Song } from './song.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newSongUrl = '';
  songs: Song[] = [
    {
      code: '0Vec7Je8jAYk17kqlW6l1A',
    },
    {
      code: '1KTJmfwrk5pYqsi9mkY3nT',
    },
    {
      code: '6CGMZijOAZvTXG21T8t6R0',
    },
  ];
  constructor(private sanitizer: DomSanitizer) {}
  getSafeUrl(songCode: string) {
    const spotifyUrl = `https://open.spotify.com/embed/track/${songCode}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(spotifyUrl);
  }
  extractTrackIdFromUrl(url: string): string | null {
    const trackIdRegex = /track\/([\w\d]+)/;
    const match = url.match(trackIdRegex);
    return match && match.length >= 2 ? match[1] : null;
  }
  addSong(newSongUrl: string) {
    if (newSongUrl.trim() !== '') {
      const trackId = this.extractTrackIdFromUrl(newSongUrl);
      if (trackId) {
        this.songs.push({
          code: trackId,
        });
      }
    }
    this.newSongUrl = '';
  }
  deleteSong(index: number) {
    this.songs.splice(index, 1);
  }
  moveUp(index: number): void {
    if (index > 0 && index < this.songs.length) {
      const songToMove = this.songs.splice(index, 1)[0];
      this.songs.splice(index - 1, 0, songToMove);
    }
  }
  moveDown(index: number): void {
    if (index >= 0 && index < this.songs.length - 1) {
      const songToMove = this.songs.splice(index, 1)[0];
      this.songs.splice(index + 1, 0, songToMove);
    }
  }
}
