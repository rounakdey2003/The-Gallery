
export default class LiquidCursor {
  private cursor!: HTMLElement;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private cursorX: number = 0;
  private cursorY: number = 0;

  constructor() {
    this.createCursor();
    this.addEventListeners();
    this.animate();
  }

  private createCursor(): void {
    this.cursor = document.createElement('div');
    this.cursor.className = 'liquid-cursor';
    document.body.appendChild(this.cursor);
  }

  private addEventListeners(): void {
    
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
    });

    
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
    });

    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .frame__title, .text__1, .text__2, .text__3');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hovering');
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hovering');
      });
    });

    
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('clicking');
    });

    
    window.addEventListener('resize', () => {
      this.updateCursorPosition();
    });
  }

  private animate(): void {
    
    const ease = 0.12;
    this.cursorX += (this.mouseX - this.cursorX) * ease;
    this.cursorY += (this.mouseY - this.cursorY) * ease;

    this.updateCursorPosition();
    requestAnimationFrame(() => this.animate());
  }

  private updateCursorPosition(): void {
    this.cursor.style.left = `${this.cursorX}px`;
    this.cursor.style.top = `${this.cursorY}px`;
  }

  public destroy(): void {
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }
  }
}
