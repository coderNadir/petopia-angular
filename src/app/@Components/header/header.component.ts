import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AnimalService } from 'src/app/services/animal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // -- sign in form
  email: string = '';
  password: string = '';

  // -- card form
  name: string = '';
  dateOfBirth: string = '';
  description: string = '';
  size: string = '';
  image: File | null = null;
  sex: string = '';

  actionValue: string = 'create';
  animalID: number = 0;

  alertMessage: string = '';
  alertColor: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.check('token');
  }

  get messageColor() {
    return this.alertColor;
  }

  hideAlertMessage() {
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }

  onChangeFile(event: Event) {
    this.image = (event.target as HTMLInputElement)?.files?.item(0) ?? null;
  }

  submitCard(form: NgForm) {
    if (this.actionValue == 'create') this.addCard();
    if (this.actionValue == 'update') this.updateCard();
    if (this.actionValue == 'delete') this.deleteCard();
    this.hideAlertMessage();
    form.reset();
  }

  updateCard() {
    console.log('update card fn called');
    // console.log('add card fn called');
    const form = new FormData();
    form.append('name', this.name);
    form.append('date_of_birth', this.dateOfBirth);
    form.append('description', this.description);
    form.append('size', this.size);
    form.append('image', this.image!);
    form.append('sex', this.sex);
    form.append('token', this.cookieService.get('token'));
    form.append('email', this.cookieService.get('email'));

    console.log('animal id: ', this.animalID);
    console.log('formData:', form.getAll);

    this.http
      .patch(`http://localhost:8080/api/v1/animals/${this.animalID}`, form)
      .subscribe({
        next: (data) => {
          console.log('🟢 success update card:', data);
          this.alertMessage = 'card updated successfully';
          this.alertColor = 'green';
          this.animalService.loadAnimals();
        },
        error: (err) => {
          const { error } = err;
          console.log('🔴 error updating card:', err);
          this.alertColor = 'red';
          this.alertMessage = error.message;
        },
      });
  }

  deleteCard() {
    console.log('delete card fn called');

    this.http
      .delete(`http://localhost:8080/api/v1/animals/${this.animalID}`)
      .subscribe((res) => {
        console.log(' success delete card:', this.animalID);
        this.animalService.loadAnimals();
      });
  }

  addCard() {
    // console.log('add card fn called');
    const form = new FormData();
    form.append('name', this.name);
    form.append('date_of_birth', this.dateOfBirth);
    form.append('description', this.description);
    form.append('size', this.size);
    form.append('image', this.image!);
    form.append('sex', this.sex);
    form.append('token', this.cookieService.get('token'));
    form.append('email', this.cookieService.get('email'));

    this.http.post('http://localhost:8080/api/v1/animals', form).subscribe({
      next: (data) => {
        console.log('🟢 success card:', data);
        this.alertMessage = 'card added successfully';
        this.alertColor = 'green';
        this.animalService.loadAnimals();
      },
      error: (err) => {
        const { error } = err;
        console.log('🔴 error card:', err);
        this.alertColor = 'red';
        this.alertMessage = error.message;
      },
    });
  }

  signin() {
    this.http
      .post('http://localhost:8080/api/v1/users/signin', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          console.log('🟢🟢 res login:', res);
          this.cookieService.set('token', res.token);
          this.cookieService.set('email', this.email);
          this.alertMessage = 'success';
          this.alertColor = 'green';
          this.isLoggedIn = true;
          // clear fields
          this.email = this.password = '';
        },
        error: (err) => {
          const { error } = err;
          console.log('🔴🔴 error login', err);
          this.alertMessage = error.message;
          this.alertColor = 'red';
          this.isLoggedIn = false;
        },
      });
    this.hideAlertMessage();
  }

  signout() {
    this.http.post('http://localhost:8080/api/v1/users/signout', {}).subscribe({
      next: () => {
        this.cookieService.delete('token');
        this.cookieService.delete('email');
        this.isLoggedIn = false;
      },
      error: (err) => {
        this.alertColor = 'red';
        this.alertMessage = 'failed to sign out';
        this.isLoggedIn = false;
        this.hideAlertMessage();
      },
    });
  }
}
