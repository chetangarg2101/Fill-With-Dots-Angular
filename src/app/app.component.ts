import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  dots = Array.from(Array(160).keys());
  colors = [
    'red',
    'green',
    'blue',
    'pink',
    'purple',
    'orange',
    'yellow',
    'cyan',
    'grey',
    'magenta',
  ];
  randomColorIndex = 0;
  counter = 25;
  myInterval: any;
  isGameStarted = false;
  isGameEnded = false;
  isWon = false;
  cleanCount = 0;
  dirtyCount = 0;

  @ViewChildren('dotRefs') dotRefs: QueryList<any> | undefined;

  changeStyle(dot: any) {
    this.randomColorIndex = Math.floor(Math.random() * this.colors.length);
    if (!this.isGameEnded) {
      dot.classList.add(this.colors[this.randomColorIndex]);
      this.checkGameStatus();
    }
  }

  startTimer() {
    this.isGameStarted = true;
    this.myInterval = setInterval(() => {
      if (this.counter > 1) {
        this.counter--;
      } else {
        this.isGameEnded = true;
        clearInterval(this.myInterval);
      }
    }, 1000);
  }

  checkGameStatus() {
    this.cleanCount = 0;
    this.dirtyCount = 0;
    this.dotRefs?.forEach((dot) => {
      if (dot.nativeElement.classList.length > 1) {
        this.dirtyCount++;
      } else {
        this.cleanCount++;
      }
    });
    if (!this.isGameStarted) {
      this.startTimer();
    }
    if (this.dirtyCount === 160) {
      this.isWon = true;
      this.isGameEnded = true;
      clearInterval(this.myInterval);
    }
  }

  restartGame() {
    this.isGameStarted = false;
    this.isGameEnded = false;
    this.isWon = false;
    this.counter = 25;
    clearInterval(this.myInterval);

    // Reset all dot styles
    this.dotRefs?.forEach((dot) => {
      this.colors.forEach(color => dot.nativeElement.classList.remove(color));
    });

    this.cleanCount = 0;
    this.dirtyCount = 0;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }
}
