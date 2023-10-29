import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';
import * as _ from 'lodash';

@Component({
  selector: 'account-languages',
  templateUrl: './account-languages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountLanguagesComponent extends BaseComponent implements OnInit {
  languages: cartesian.localization.ILanguageInfo[];
  currentLanguage: cartesian.localization.ILanguageInfo;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.languages = _.filter(this.localization.languages, (l) => !l.isDisabled);
    this.currentLanguage = this.localization.currentLanguage;
  }

  changeLanguage(languageName: string): void {
    cartesian.utils.setCookieValue(
      'Cartesian.Localization.CultureName',
      languageName,
      new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
      cartesian.appPath
    );

    location.reload();
  }
}
