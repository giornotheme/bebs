import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy{
  // @ViewChild('text', { static: false }) public text: ElementRef | undefined ;
  intervalId: any;

  text1: string = ""
  text2: string = "";
  text3: string = "";
  text4: string = "";
  text5: string = "";
  text6: string = "";
  text7: string = "";
  startDate: Date = new Date('2020-09-20');
  today: Date = new Date();
  timeDifference = 0
  tempsEnsemble: number = 0

  currentIndex: number = 0;


  ngOnInit(): void {


    this.timeDifference = this.today.getTime() - this.startDate.getTime();
    this.tempsEnsemble = Math.floor(this.timeDifference / (1000 * 60 * 60 * 24));

    this.text1 = "Bienvenue bebs...";
    this.text2 = `Voilà maintenant ${this.tempsEnsemble} jours que nous nous aimons`;
    this.text3 = "Je ne sais pas si tu es au courant...";
    this.text4 = "...mais une date spéciale approche...";

    this.intervalId = setInterval(() => {
      if (this.currentIndex < 4){
        this.currentIndex = this.currentIndex + 1
      }
      else {
        clearInterval(this.intervalId); // Arrêter l'intervalle à la fin du tableau
      }
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Nettoyer l'intervalle lorsque le composant est détruit
    }
  }

}
