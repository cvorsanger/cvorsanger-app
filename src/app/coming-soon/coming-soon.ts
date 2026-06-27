import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('bulldozerArea') bulldozerAreaEl!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  hideBubble: boolean = true;
  elementStyle: any = {};
  taunt: string = "Catch me if you can!";
  bulldozerSize: number = 75;
  buffer: number = 20;

  private naturalLeft: number = 0;
  private naturalTop: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.hideBubble = false;
      this.cdr.markForCheck();
    }, 2000);
  }

  ngAfterViewInit(): void {
    const rect = this.movableElement.nativeElement.getBoundingClientRect();
    this.naturalLeft = rect.left;
    this.naturalTop = rect.top;
    setTimeout(() => {
      this.elementStyle = { position: 'relative', transform: 'translate(0, 50px)' };
      this.cdr.markForCheck();
    }, 0);
  }

  onMouseEnter(): void {
    const rect = this.movableElement.nativeElement.getBoundingClientRect();
    const container = this.bulldozerAreaEl.nativeElement.getBoundingClientRect();

    const minX = container.left + this.buffer;
    const minY = container.top + this.buffer;
    const maxX = container.right - rect.width - this.buffer;
    const maxY = container.bottom - rect.height - this.buffer;

    const targetX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const targetY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

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
