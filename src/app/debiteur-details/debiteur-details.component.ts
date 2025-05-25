import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debiteur-details',
  templateUrl: './debiteur-details.component.html',
  styleUrls: ['./debiteur-details.component.css']
})
export class DebiteurDetailsComponent {
  debiteurs: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.debiteurs = navigation?.extras.state?.['debiteurs'] || [];
  }

  goBack() {
    this.router.navigate(['/gestion-debiteur']);
  }
}