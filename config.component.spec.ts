import { TestBed } from "@angular/core/testing";
import { ConfigComponent } from "./config.component";

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ConfigComponent]  // ✅ Only works when standalone: true is removed
  }).compileComponents();
});
