

const app = {
     cursor: {
          ID: $('.cursor'),
          width: $('.cursor').width(),
          height: $('.cursor').height(),
          posX: $('.cursor').position().left,
          posY: $('.cursor').position().top,
     },
     content: {
          width: $('.content').width(),
          //these can be used, but is not live. needs to be reloaded. Acceptable for phones. resizing browzer... 
          windowPosLeft: $('.content').position().left,
          windowPosTop: $('.content').position().top,
          windowPosRight: $('.stop').position().left,
          windowPosBottom: $('.bottom').position().top,
     },



};

//This is just for me to remember. just logging cursor location and keys being pressed:
// const cursorLocation = `${app.cursor.posY}, ${app.cursor.posX}`;
// console.log(`The position is ${cursorLocation}`) //top: 0, left 0;
const runOnKeys = $('body').on('keydown', function(key){
     console.log(key['key'], key['keyCode']);

     console.log(`
     from Left:  ${app.content.windowPosLeft},  
     from Top: ${app.content.windowPosTop}, 
     from right: ${app.content.windowPosRight},  
     from bottom: ${app.content.windowPosBottom}`);
     
});

// functions below control movement of cursor.
//Right move
          app.cursor.rightMove = function(){
               $('body').on('keyup', function(key) {
                    if (key['key'] !== 'ArrowLeft' && key['key'] !== 'Backspace' && key['key'] !== 'Enter' && key['key'] !== 'ArrowUp' && key['key'] !== 'ArrowDown') {
               app.cursor.ID.css("left", () => app.cursor.posX += 18);
                         // console.log(app.cursor.posX, app.cursor.posY);

                    }
               });
          };
//Left Move
          app.cursor.leftMove = function() {
               $('body').on('keyup', function(key) {
               if (key['key'] === 'ArrowLeft'|| key['key'] === 'Backspace') {
                    app.cursor.ID.css("left", () => app.cursor.posX -= 18 );
                    // console.log(app.cursor.posX, app.cursor.posY);

               }
          });
          };

//up Move
          app.cursor.upMove = function() {
               $('body').on('keyup', function(key) {
                    if (key['key'] === 'ArrowUp' && key['key'] !== 'ArrowDown') {
                    app.cursor.ID.css("top", () => app.cursor.posY -= 25 );
                         // console.log(app.cursor.posX, app.cursor.posY);

               }
          });
          };
//down Move
          app.cursor.downMove = function() {
               $('body').on('keyup', function(key) {
                    if (key['key'] === 'ArrowDown' && key['key'] !== 'ArrowUp' && key['key']) {
                    app.cursor.ID.css("top", () => app.cursor.posY += 25 );
                         // console.log(app.cursor.posX, app.cursor.posY);

               }
          });
          };

//New Line
          app.cursor.newLine = function(){
               $('body').on('keydown', function (key) {
                    if (key['key'] === 'Enter') {
                         app.cursor.ID.css("left", function () {
                                   console.log(app.cursor.posX)
                                   app.cursor.posX = 0;
                                   return (app.cursor.posX);
                              });
                         app.cursor.ID.css("top", function () {
                                   app.cursor.posY = (app.cursor.posY + 20);
                                   // console.log(app.cursor.posX, app.cursor.posY);
                                   return (app.cursor.posY);
                              });
                    } 
               });
               };


// combined two cursor move functions
app.cursor.cursorMove = () => {
     
          app.cursor.leftMove();
          app.cursor.rightMove();
          app.cursor.newLine();
          app.cursor.upMove();
          app.cursor.downMove();
          // console.log(`The position is Top: ${app.cursor.posY} Left: ${app.cursor.posX}`) //top: 0, left 0;

}

     
     //when key is pressed
// if key is normal letter or number 
// find cursor on page (x, y)
// append div to ".paper". 
//with position absolute and position(x,y) of cursor
//div has content of whatever key was pressed.
// cursor move one cursor width to the right (add to left position)

// if key is enter
// bring cursor to left 0, current top position + 1 line height

//if key is arrow key
//move cursor in direction that the arrow key is pointing
//up = current top position - 1 line height
//down = current top position + 1 line height
//left = current left position - 1 cursor width
//right = current left position + 1 cursor width

//else nothing happens


//when on mobile, keyboard may not show because there is no input. when clicking on page, focus input that is placed absolutely off the page. having the input be focused should open the keyboard


//when font is adjusted
//all font classes removed
//section is given class that corresponds with selected font added. (.font1, .font2 .font3)

//when brokenness is adjusted
//value = number from 1 - 100
//take value and make valiable that $value/100
//min = (0tilt - (BrokenValue*0.1)) / Max = (0tilt + (broken value*0.1)
//pick random number between 

//Init function
     
app.typeInit = function(){
     app.cursor.cursorMove();
     console.log(`The position is Top: ${app.cursor.posY} Left: ${app.cursor.posX}`) //top: 0, left 0;
}
//Document ready, set GO!

$(function(){
     app.typeInit();
});