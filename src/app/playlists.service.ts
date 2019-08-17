import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

import { environment } from "src/environments/environment";
import { ApiEndpointsService } from "./api-endpoints.service";

@Injectable({
  providedIn: "root"
})
export class PlaylistsService {
  playlistData = {};
  selectedPlaylist = {};

  constructor(
    private httpClient: HttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {
    const myPlaylistEndpoint = this.apiEndpointsService.getMyPlaylistsEndpoint();
    this.httpClient
      .getApiRequest(myPlaylistEndpoint, {
        params: {
          limit: 50
        }
      })
      .then(data => {
        this.playlistData = data;
      });
  }

  /**
   * Add the tracks that are currently selected to the playlist ID
   */
  postSelectedTracksToSelectedPlaylist(tracks, playlistId): void {
    this.httpClient.postTracksToPlaylist(tracks, playlistId);
  }
}
