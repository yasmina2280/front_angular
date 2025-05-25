import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `<h2 style="color:red;">❌ Accès refusé : vous n'avez pas les autorisations nécessaires.</h2>`
})
export class UnauthorizedComponent {}
