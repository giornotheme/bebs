import {AfterViewInit, Component, HostListener, NgZone, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit {

  text1: string = ""
  text2: string = "";
  text3: string = "";
  text4: string = "";
  startDate: Date = new Date('2020-09-20');
  today: Date = new Date();
  timeDifference = 0
  tempsEnsemble: number = 0

  currentIndex: number = 0;
  timeoutId: any;
  showImage: boolean = false;
  isQuestion: boolean = false;
  isOui: boolean = false;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {


    this.timeDifference = this.today.getTime() - this.startDate.getTime();
    this.tempsEnsemble = Math.floor(this.timeDifference / (1000 * 60 * 60 * 24));

    this.text1 = "Bienvenue bebs...";
    this.text2 = `Voilà maintenant ${this.tempsEnsemble} jours que nous sommes ensemble`;
    this.text3 = "Je ne sais pas si tu es au courant...";
    this.text4 = "...mais une date spéciale approche...";
  }

  ngAfterViewInit(): void {
    this.runInterval();
  }

  runInterval(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.currentIndex < 4) {
        this.timeoutId = setTimeout(() => {
          this.ngZone.run(() => {
            this.currentIndex += 1;
            this.runInterval();
          });
        }, 4000);
      } else {
        this.ngZone.run(() => {
          this.showImage = true;
        });

        setTimeout(() => {
          this.ngZone.run(() => {
            this.isQuestion = true;
          });
        }, 4000);
      }
    });
  }

  teleportButton(): void {
    const btnNo = document.getElementById('btn-no');
    const btnDecoy = document.getElementById('btn-decoy');

    // @ts-ignore
    btnDecoy.style.display = 'flex';
    if (btnNo) {
      const randomX = Math.floor(Math.random() * (500 - (-200) + 1)) + (-100);
      const randomY = Math.floor(Math.random() * (500 - (-200) + 1)) + (-100);

      btnNo.style.position = 'absolute';
      btnNo.style.left = `${randomX}px`;
      btnNo.style.top = `${randomY}px`;
    }
  }


  @HostListener('document:click', ['$event'])
  onUserClick(event: Event): void {

    clearTimeout(this.timeoutId);

    if (this.currentIndex < 4) {
      this.currentIndex += 1;
      this.runInterval();
    }
  }

  accept(){
    this.isOui = true;

  }

}
