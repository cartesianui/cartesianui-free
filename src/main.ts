import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@app/app.module';

const bootstrap = () => {
  console.log('🚀 Bootstrapping ...');
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};

console.log('▶ Regular Bootstrap!');
bootstrap();
