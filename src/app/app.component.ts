import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Henri Potier shop';
  nbNotif: number;
  ref;

  onActivate(componentReference) {
    this.ref = componentReference;

    //workaround nul
    this.ref.notifCart$?.pipe(delay(100)).subscribe((nb: number) => {
      this.nbNotif = nb;
    });
  }
  onDestroy() {
    this.ref.notifCart$?.unsubscribe();
  }
}
