import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common'

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [ NgOptimizedImage, NgStyle ],
  templateUrl: './coming-soon.html',
  styleUrl: './coming-soon.scss'
})
export class ComingSoon implements AfterViewInit {
  @ViewChild('bulldozer') movableElement!: ElementRef;

  hideBubble: boolean = true;
  elementStyle: any = {};
  taunt: string = "Catch me if you can!";
  bulldozerSize: number = 75;

  private naturalLeft: number = 0;
  private naturalTop: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.hideBubble = false;
    }, 2000);
  }

  ngAfterViewInit(): void {
    const rect = this.movableElement.nativeElement.getBoundingClientRect();
    this.naturalLeft = rect.left;
    this.naturalTop = rect.top;
  }

  onMouseEnter(): void {
    const rect = this.movableElement.nativeElement.getBoundingClientRect();

    const buffer = 20;
    const maxX = window.innerWidth - rect.width - buffer;
    const maxY = window.innerHeight - rect.height - buffer;

    const targetX = Math.floor(Math.random() * (maxX - buffer + 1)) + buffer;
    const targetY = Math.floor(Math.random() * (maxY - buffer + 1)) + buffer;

    // Always compute relative to the stored natural position so mid-animation
    // getBoundingClientRect() values can't corrupt the offset.
    const tx = targetX - this.naturalLeft;
    const ty = targetY - this.naturalTop;

    this.elementStyle = {
      position: 'relative',
      transform: `translate(${tx}px, ${ty}px)`,
      transition: 'transform 0.5s ease-in-out'
    };
  }

  onMouseOver(): void {
    this.taunt = "Ahhh you caught me!!!!"
  }

  onMouseLeave(): void {
    this.taunt = "Got to be quicker than that"
  }
}
