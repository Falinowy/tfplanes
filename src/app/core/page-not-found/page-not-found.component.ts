import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PageNotFoundComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  backToLogin(){
    this.route.navigateByUrl('/login');
  }
}
