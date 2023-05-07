const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._row = 0;
    this._col = 0;
  }

  print() {
    let output = "";
    for (let row of this._field) {
      output += row.join(" ") + "\n";
    }
    console.log(output);
  }

  playGame() {
    while (true) {
      this.print();

      const direction = prompt(
        "Which direction would you like to move? (u/d/l/r): "
      );

      if (direction === "u") {
        this._row--;
      } else if (direction === "d") {
        this._row++;
      } else if (direction === "l") {
        this._col--;
      } else if (direction === "r") {
        this._col++;
      }

      if (
        this._row < 0 ||
        this._row >= this._field.length ||
        this._col < 0 ||
        this._col >= this._field[0].length ||
        this._field[this._row][this._col] === hole
      ) {
        console.log("You lose!");
        break;
      }

      if (this._field[this._row][this._col] === hat) {
        console.log("You win!");
        break;
      }

      this._field[this._row][this._col] = pathCharacter;
    }
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height)
      .fill(0)
      .map(() => new Array(width).fill(fieldCharacter));
    field[0][0] = pathCharacter;
    const numHoLes = Math.floor((height * width * percentage) / 100);
    let holesPlaced = 0;

    while (holesPlaced < numHoLes) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);
      if (field[randomRow][randomCol] === fieldCharacter) {
        field[randomRow][randomCol] = hole;
        holesPlaced++;
      }
    }

    let hatPlaced = false;
    while (!hatPlaced) {
        const randomRow = Math.floor(Math.random() * height);
        const randomCol = Math.floor(Math.random() * width);
        if (field[randomRow][randomCol] === fieldCharacter) {
            field[randomRow][randomCol] = hat;
            hatPlaced = true;
        }
    }
    return field;
  }
}
const myField = new Field(Field.generateField(10, 10, 20));

myField.playGame();
