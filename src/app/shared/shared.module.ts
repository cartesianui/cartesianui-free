import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { RouteGuard } from './services';

@NgModule({
  imports: [CommonModule, RouterModule, CartesianCommonModule, RouterModule],
  declarations: [],
  providers: [],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        RouteGuard
      ]
    };
  }
}
