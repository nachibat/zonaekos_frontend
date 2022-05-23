import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '944817279217-9ucf835t234itsh1flbj511v9o8p2b0k.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '704703900407622'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
