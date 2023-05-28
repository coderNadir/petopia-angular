import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './@Components/header/header.component';
import { FooterComponent } from './@Components/footer/footer.component';
import { CardsComponent } from './@Components/cards/cards.component';
import { CarrouselComponent } from './@Components/carrousel/carrousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    CarrouselComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
