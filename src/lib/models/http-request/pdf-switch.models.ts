export class PageSwitch {

  fromIndex: number;
  toIndex: number;

  constructor(from: number, to: number) {
    this.fromIndex = from;
    this.toIndex = to;
  }

}

export class PageNumber {
  index: number;

  constructor(index: number) {
    this.index = index;
  }

}
