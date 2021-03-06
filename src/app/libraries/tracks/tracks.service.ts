import { Injectable, OnDestroy } from "@angular/core";
import { HttpService } from "../../http.service";
import { TrackItem } from "../track";
import { Store } from "@ngrx/store";

import { ApiEndpointsService } from "../../api-endpoints.service";
import * as TrackActions from "./store/track-list.actions";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TracksService {
  public selectedTrackItems: TrackItem[] = [];
  public selectedTrackItem: TrackItem;
  constructor(
    private store: Store<{
      libraries: { tracks: { myRecentTracks: TrackItem[] } };
    }>
  ) {}

  fetchMyRecentTracks() {
    this.store.dispatch(new TrackActions.FetchTracks());
  }

  getFeatureStoreObservable(key: string): Observable<any> {
    return this.store.select("libraries", "tracks", key);
  }

  isSelectedTrack(trackItem: TrackItem): boolean {
    return (
      this.selectedTrackItem &&
      this.selectedTrackItem.track.id === trackItem.track.id
    );
  }

  hasSelectedTrack(trackItem: TrackItem): boolean {
    return (
      this.selectedTrackItems.find(
        (t: TrackItem) => t.track.id === trackItem.track.id
      ) !== undefined
    );
  }

  updateTrackList(trackItem: TrackItem) {
    if (!this.hasSelectedTrack(trackItem)) {
      this.selectedTrackItems = [...this.selectedTrackItems, trackItem];
    } else {
      this.selectedTrackItems = this.selectedTrackItems.filter(
        (item: TrackItem) => item.track.id !== trackItem.track.id
      );
    }
  }

  /**
   * update list of selected track IDs when clicking on a track
   */

  toggleSelectedTrack(trackItem: TrackItem, selected: boolean): void {
    if (selected) {
      if (this.selectedTrackItems.length === 0) {
        this.selectedTrackItems = [trackItem];
      } else {
        this.selectedTrackItems = [...this.selectedTrackItems, trackItem];
      }
    } else {
      this.selectedTrackItems = this.selectedTrackItems.filter(
        $trackItem => $trackItem.track.id !== trackItem.track.id
      );
    }
  }

  updateCurrentTrack(trackItem: TrackItem) {
    this.selectedTrackItem = trackItem;
  }

  postTracks() {}
}
