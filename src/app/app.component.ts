import { Component } from '@angular/core';
import { AppSandbox } from './app.sandbox';
import { iconSubset } from './shared/icon-subset';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  providers: [AppSandbox]
})
export class AppComponent {
  constructor(private iconSetService: IconSetService) {
    iconSetService.icons = { ...iconSubset };
  }
}
