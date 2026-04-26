import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome-step",
  imports: [],
  templateUrl: "./welcome-step.html",
  styleUrl: "./welcome-step.scss",
})
export class WelcomeStepComponent {
  private router = inject(Router);

  start() {
    this.router.navigate(["/weekly-form/step1"]);
  }
}
