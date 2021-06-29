import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import * as confetti from 'canvas-confetti';
import { environment } from "../environments/environment";

declare var anime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  showText: boolean = false;
  birthdayName: string = environment.birthdayName;

  public constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.surprise();
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    for (let i = 0; i < 3; i++) {
      canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
      setTimeout(() => { this.myConfetti(canvas); }, 1000);
      setTimeout(() => { this.myConfetti(canvas); }, 3000);
      setTimeout(() => { this.myConfetti(canvas); }, 5000);
      setTimeout(() => { this.myConfetti(canvas); }, 7000);
      setTimeout(() => { this.myConfetti(canvas); }, 9000);
      setTimeout(() => { this.myConfetti(canvas); }, 11000);
      setTimeout(() => {
        // this.renderer2.removeChild(this.elementRef.nativeElement, canvas);
        this.renderer2.addClass(canvas, 'hidden');
        this.myTextAnimation();
      }, 14300);
    }
  }

  public myConfetti(canvas: any): void {
    const myConfetti = canvas.confetti({
      angle: this.randomInRange(55, 125),
      spread: this.randomInRange(50, 70),
      particleCount: this.randomInRange(50, 100),
      origin: { y: 0.6 }
    });
  }

  public randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public myTextAnimation(): void {
    this.showText = true;
    const textWrapper = document.querySelector('.an-1');
    const innetHtml = textWrapper ? textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>") : null;
    if(innetHtml) {
      textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

      anime.timeline({loop: true})
        .add({
          targets: '.an-1 .letter',
          scale: [4,1],
          opacity: [0,1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el: any, i: any) => 70*i
        }).add({
        targets: '.an-1',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
    }
  }

}
