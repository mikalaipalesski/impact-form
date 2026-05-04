import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class HomeComponent {}
