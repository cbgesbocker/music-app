import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
  // providers: [HttpService]
})
export class AdminDashboardComponent implements OnInit {
  musicData;

  constructor(private httpClient: HttpService) {}

  ngOnInit() {
    const endpoint = environment.apiConfig.endpoints.tracks;
    this.httpClient
      .getApiRequestSet(endpoint, {
        limit: 50
      })
      .subscribe((data: object) => {
        this.musicData = data;
      });
  }
}
