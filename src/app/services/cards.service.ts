import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Card = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  image: {
    name: string;
    type: string;
    picture: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cards: Card[] = [];
  imageSrcArr: any[] = [];

  constructor(private http: HttpClient) {
    this.loadCards();
  }

  loadCards() {
    this.http
      .get('http://localhost:8080/api/v1/cards')
      .subscribe((res: any) => {
        console.log('🟢 response:', res);
        this.cards = res;

        Promise.all(
          this.cards.map(async (card: Card) => {
            const imgSrc = await this.getImage(card.image);
            this.imageSrcArr.push(imgSrc);
          })
        );
      });
  }

  async getImage(image: Card['image']) {
    const myBlob = image?.picture;
    const name = image.name;
    const type = image.type;
    const base64 = `data:${type};base64,${myBlob}`;
    const base64Res = await fetch(base64);
    const blob = await base64Res.blob();
    return URL.createObjectURL(blob);
  }
}
