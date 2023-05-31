import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Animal = {
  id: number;
  name: string;
  date_of_birth: Date;
  description: string;
  size: String;
  animal_type: string;
  picture: String;
  image: {
    name: string;
    type: string;
    picture: string;
  };
  sex: String;
};

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animals: Animal[] = [];
  imageSrcArr: any[] = [];
  cats: Animal[] = [];
  dogs: Animal[] = [];

  constructor(private http: HttpClient) {
    this.loadAnimals();
  }

  loadAnimals() {
    this.http
      .get('http://localhost:8080/api/v1/animals')
      .subscribe(async (res: any) => {
        console.log('🟢 response:', res);
        this.animals = [] = res;
        this.dogs = [];
        this.cats = [];

        this.animals = await Promise.all(
          this.animals.map(async (animal: Animal) => {
            const imgSrc = await this.getImage(animal.image);
            console.log(animal.animal_type);
            if (animal.animal_type == 'dog') this.dogs.push(animal);
            if (animal.animal_type == 'cat') this.cats.push(animal);
            animal.picture = imgSrc;
            return animal;
          })
        );
        console.log('🟢🟢 animals:', this.animals);
        console.log('🟢🟢 cats:', this.cats);
        console.log('🟢🟢 dogs:', this.dogs);
      });
  }

  async getImage(image: Animal['image']) {
    const myBlob = image?.picture;
    const name = image.name;
    const type = image.type;
    const base64 = `data:${type};base64,${myBlob}`;
    const base64Res = await fetch(base64);
    const blob = await base64Res.blob();
    return URL.createObjectURL(blob);
  }
}
