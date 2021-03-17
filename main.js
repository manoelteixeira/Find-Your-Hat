const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field = [[]]){
    this.field = field;
    this.playerPositionX = 0,
    this.playerPositionY = 0
  }
  print () {
    console.log("\n");
    for (const line of this.field){
      console.log(line.join(' '));
      }
    console.log("\n");
  }
  getDirection () {
      const res = prompt("Which way ? ").toLowerCase();
      let newX = this.playerPositionX;
      let newY = this.playerPositionY;
      switch(res){
          case 'u':
              newY -= 1;
              break;
          case 'd':
              newY += 1;
              break;
        case 'l':
            newX -= 1;
            break;
        case 'r':
            newX += 1;
            break;
        default:
            console.log("Enter \nU: Up \nD: Down \nL: Left \nR: Right");
            this.getDirection();
      }
      return {
          x: newX,
          y: newY
        };
  }
  isValidePosition (position){
      if((position.x < 0) || (position.x >= this.field[[position.x].length])){
          console.log("You moved out of the map Dude.");
          return false
      }else if((position.y < 0) || (position.y >= this.field[[position.y].length])){
        console.log("You moved out of the map. Dude");
        return false
    }else if(this.field[position.y][position.x] === hole){
        console.log("Ops! There was a hole on the ground here.");
        return false;
    }else {
        return true;
    }
  }

  static generateField (height, width, numberOfHoles){
      if(numberOfHoles >= (height * width)/2){
          throw Error("Too many Holes Dude !!!!");
      }
      // Create an empty field
      let field = [];
      for(let y = 0; y <= height; y++){
          let line = [];
          for(let x = 0; x <= width; x++){
              line.push(fieldCharacter);
          }
          field.push(line);
      }
      // Set Player initial position
      field[0][0] = pathCharacter;

      // Set Hat Position
      do{
          let hatX = Math.floor(Math.random() * (width));
          let hatY = Math.floor(Math.random() * (height));
          if(field[hatY][hatX] === fieldCharacter){
            field[hatY][hatX] = hat;
            break;
          }
        } while (true);
      // Set Holes on the Field
      let holesLeft = numberOfHoles;
      do{
        let holeX = Math.floor(Math.random() * (width));
        let holeY = Math.floor(Math.random() * (height)); 
        if((field[holeY][holeX] != hat) && (field[holeY][holeX] != hole) && (field[holeY][holeX] != pathCharacter)){
            field[holeY][holeX] = hole;
            holesLeft --;
        }
      } while(holesLeft >= 0);
      return field;

  }

  game (){
      let game = true;
      const msg = "\n=-=-=-=-=-=-=-=-=-=\nFind the Hat!!!!\n=-=-=Commands=-=-=\nU: to move Up\nD: to move Down\nL: to move Left\nU: to move Right\n=-=-=-=-=-=-=-=-=-=";
      console.log(msg);
      this.print();
      while(game){
          let newPosition = this.getDirection();
          if(this.isValidePosition(newPosition)){
              if(this.field[newPosition.y][newPosition.x] === hat){
                  console.log("You Won!!!!");
                  game = false;
              }else{
                this.field[newPosition.y][newPosition.x] = pathCharacter;
                this.playerPositionX = newPosition.x;
                this.playerPositionY = newPosition.y;
                this.print();
              }
          }else{
              console.log('You Lost! Better luck next time.');
              game = false;
          }
      }
  }
  
}

// const myField = new Field([
//   ['*', 'O', 'O'],
//   ['░', 'O', '░'],
//   ['░', '^', '░'],
// ]);

// myField.game();

const myField = new Field(Field.generateField(4, 4, 4));
myField.game();
