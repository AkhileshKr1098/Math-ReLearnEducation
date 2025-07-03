import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paint-clone',
  templateUrl: './paint-clone.component.html',
  styleUrls: ['./paint-clone.component.scss']
})
export class PaintCloneComponent implements AfterViewInit {
  @ViewChild('paintCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  drawing = false;
  selectedColor = '#000000';
  brushSize = 5;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineCap = 'round';

    this.resizeCanvas();

    // Use Pointer Events for mouse, touch, stylus, tablet support
    canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    canvas.addEventListener('pointerup', () => this.drawing = false);
    canvas.addEventListener('pointerout', () => this.drawing = false);
    canvas.addEventListener('pointermove', (e) => this.draw(e));
  }

  @HostListener('window:resize')
resizeCanvas() {
  const canvas = this.canvasRef.nativeElement;
  const oldWidth = canvas.width;
  const oldHeight = canvas.height;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = oldWidth;
  tempCanvas.height = oldHeight;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.drawImage(canvas, 0, 0);

  // Set both CSS and pixel resolution together
  canvas.width = canvas.parentElement!.clientWidth;
  canvas.height = canvas.parentElement!.clientHeight;

  this.ctx.drawImage(tempCanvas, 0, 0, oldWidth, oldHeight, 0, 0, canvas.width, canvas.height);
  this.ctx.beginPath();
}

  onPointerDown(e: PointerEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.draw(e);
  }

  draw(e: PointerEvent) {
    if (!this.drawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pressure = e.pressure || 0.5;
    const dynamicBrushSize = this.brushSize * pressure;

    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.lineWidth = dynamicBrushSize;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
  }
}
