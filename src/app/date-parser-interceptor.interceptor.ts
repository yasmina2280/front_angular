import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class DateParserInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.parseDates(event.body);
        }
        return event;
      })
    );
  }

  private parseDates(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase().includes('date')) {
        if (typeof obj[key] === 'string') {
          obj[key] = new Date(obj[key]);
        }
      }
      
      if (typeof obj[key] === 'object') {
        this.parseDates(obj[key]);
      }
    }
  }
}