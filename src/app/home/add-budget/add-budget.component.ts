import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onAddBudget(): void {
    if (this.budgetForm.invalid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        type: this.budgetForm.value['type'],
        amount: this.budgetForm.value['amount'],
      },
      'confirm'
    );
  }

  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
