import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  private readonly  fb = inject(FormBuilder);

  isSubmitted = false;

  orderForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.min(18), Validators.max(65)]],
    agreeToTerms: [true, [Validators.requiredTrue]]
  });


  public get f(){
    return this.orderForm.controls;
  }

  public showError(controlName: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  isValid(controlName: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!(control && control.valid && (control.touched || control.dirty));
  }

  public onSubmit(): void {
    if (this.orderForm.valid){
      console.log('Данные формы успешно отправлены:', this.orderForm.value);

      this.isSubmitted = true;

      this.orderForm.reset({
        firstName: '',
        lastName: '',
        email: '',
        age: null,
        agreeToTerms: true,
      });

      setTimeout(() => {
        this.isSubmitted = false;
      }, 4000);
    }
  }


}
