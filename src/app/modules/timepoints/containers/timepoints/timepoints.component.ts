import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import { ServerService } from "src/app/services/server.service";
import { AutoUnsubscribe, takeWhileAlive } from "take-while-alive";

@Component({
  templateUrl: "./timepoints.component.html",
  styleUrls: ["./timepoints.component.scss"],
})
@AutoUnsubscribe()
export class TimepointsComponent implements OnInit {
  timepointOptions = Array.from(Array(31).keys()).map((k) => k + 1);

  selectedTimepoints: number[] = [];

  constructor(
    private serverService: ServerService,
    private activatedRoute: ActivatedRoute
  ) {}

  get accountId() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.serverService
      .getTimepoints(this.accountId)
      .pipe(
        takeWhileAlive(this),
        tap(
          (timepoints) =>
            (this.selectedTimepoints = timepoints.map((tp) => tp.date))
        )
      )
      .subscribe();
  }

  isSelected(number: number) {
    return this.selectedTimepoints.includes(number);
  }

  toggle(number: number) {
    if (this.isSelected(number)) {
      this.selectedTimepoints = this.selectedTimepoints.filter(
        (n) => n !== number
      );
    } else {
      this.selectedTimepoints = [...this.selectedTimepoints, number];
    }

    this.serverService
      .updateTimepoints(this.selectedTimepoints, this.accountId)
      .subscribe();
  }
}
