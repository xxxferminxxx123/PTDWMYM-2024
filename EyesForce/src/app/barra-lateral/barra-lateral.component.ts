import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  pageTitle: string = 'Datos generales de paises';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  updateTitle(title: string) {
    this.pageTitle = title;
  }
}
