import { Component, Input, OnInit } from '@angular/core';
import { Operation } from '../model/operation.model';
import { OperationService } from '../services/operation.service';
import { ToastrService } from 'ngx-toastr';
import { Risque } from '../model/risque.model';

@Component({
  selector: 'app-risque-operations',
  templateUrl: './risque-operations.component.html',
  styleUrls: ['./risque-operations.component.css']
})
export class RisqueOperationsComponent implements OnInit {
  @Input() risque!: Risque; // Déclaration non-null avec !
  
  operations: Operation[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private operationService: OperationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.risque && this.risque.id) {
      this.loadOperations();
    } else {
      this.errorMessage = 'Aucun risque valide fourni';
      this.toastr.warning(this.errorMessage);
    }
  }

  loadOperations(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.operations = []; // Réinitialisation avant nouveau chargement

    this.operationService.getOperationsByRisque(this.risque.id!)
      .subscribe({
        next: (ops) => {
          this.operations = ops;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Échec du chargement des opérations';
          this.toastr.error(this.errorMessage);
          console.error('Erreur:', err);
          this.isLoading = false;
        }
      });
  }
}