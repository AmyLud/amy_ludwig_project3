//For my own reference, and help to anyone reading this, here's a table of contents/anatomy of my code~~~

//-----APP OBJECT--- 
//-----FUNCTIONS----

      // 1) Prevent default of keystrokes (spacebar, single quote, etc.)
      // 2) Cursor moves 
            // a) right, left, up, down, new line
            // b) overall Cursor Move function
      // 3) Place letters function + ink dynamic change function
      // 4) keyboard functions
            // a) make clicking keys equal to keystrokes on keyboard
            // b) make keystrokes on board add styling to that key on virtual keyboard
      // 5) Font change function*************************************************************
      // 6) Clear page function

//---App Init and Doc ready---


//------------------END OF TABLE OF CONTENTS--------
//------------------START OF APP OBJECT-------------


const app = {
     cursor: {
          ID: $('.cursor'),
          width: $('.cursor').width(),
          height: $('.cursor').height(),
          posX: $('.cursor').position().left,
          posY: $('.cursor').position().top,
          windowPosLeft: $('.cursor').offset().left,
     },
     content: {
          width: $('.content').width(),
          height: $('.content').height(),
          //these can be used, but is not live. needs to be reloaded. Acceptable for phones. resizing browzer...
     },

     //checks if a value 
      isInArray: (value, array) => {
            return array.indexOf(value) > -1;
      },

      keys: {
            navKey: [
                  'Enter',
                  'ArrowLeft',
                  'ArrowRight',
                  'ArrowUp',
                  'ArrowDown',
                  'Backspace',
            ],
            funKeys: [
                  'Shift',
                  'Tab',
                  'Escape',
                  'Meta',
                  'Alt',
                  'Control',
                  'CapsLock',
                  'Delete',
            ]
      },

      input: {
            ink: $('.ink-slider'),
            inkValue: $('.ink-slider').val(),
            inkMax: 200,
            inkMin: 1,
            jank: $('.jank-slider'),
            jankValue: $('.jank-slider').val(),
            jankMax: 100,
            jankMin: 0,
      }
};

//------------------END APP OBJECT----------------------
//------------------Begin Functions----------------------



//------------------Prevent Default----------------------

//both spacebar and single quote have default browser functions (space is scroll and ' is search--I guess? I actually have no idea why this happens lol--so gotta stop those cause I want the page to become an 'input' and not default body. Tab still works as valid navigation as the page doesn't allow tabbing.)

app.preventKeyFunc = () => {document.documentElement.addEventListener('keydown', (key) => {
      if ((key.keycode || key.which) === 32) {
            key.preventDefault();}
      if ((key.keycode || key.which) === 222) {
            key.preventDefault();}
      if ((key.keycode || key.which) === 191) {
            key.preventDefault();}
      }, false);            
}

//------------------Prevent Default---------------------------------------------------
//------------------functions below control movement of cursor. ----------------------


//Right move function Allows cursor to move right unless at end of line.
          app.cursor.rightMove = () => {
               $('body').on('keyup', (key) => {
                     if (key['key'] !== 'ArrowLeft' 
                     && key['key'] !== 'Backspace' 
                     && key['key'] !== 'Enter' 
                     && key['key'] !== 'ArrowUp' 
                     && key['key'] !== 'ArrowDown' 
                     //Below are general Nav/Function keys
                     && ((app.isInArray(key['key'], app.keys.funKeys)) === false) 
                     //end general Nav/Function Keys
                     && app.cursor.posX < (app.content.width - 35)) {
               app.cursor.ID.css("left", () => app.cursor.posX += 18);
                         return(app.cursor.posX)

                    }
               });
          };
//Left Move function. Allows cursor to move left on backspace and left arrow unless at start of line.
          app.cursor.leftMove = () => {
               $('body').on('keyup', (key) => {
                     if ((key['key'] === 'ArrowLeft' || key['key'] === 'Backspace') 
                     && key['key'] !== 'Shift' 
                     && key['key'] !== 'Tab' 
                     && app.cursor.posX > 0) {
                    app.cursor.ID.css("left", () => app.cursor.posX -= 18 );
               }
          });
          };

//up Move Function. Allows cursor to move up unless at top.
          app.cursor.upMove = () => {
               $('body').on('keyup', (key) => {
                     if (key['key'] === 'ArrowUp' 
                     && key['key'] !== 'ArrowDown' 
                     && key['key'] !== 'Shift' 
                     && key['key'] !== 'Tab' 
                     && app.cursor.posY > 1) {
                    app.cursor.ID.css("top", () => app.cursor.posY -= 25 );

               }
          });
          };
//down Move Function. Allows cursor to move down unless at bottom.
          app.cursor.downMove = () => {
               $('body').on('keyup', (key) => {
                     if (key['key'] === 'ArrowDown' 
                     && key['key'] !== 'ArrowUp' 
                     && key['key'] !== 'Enter' 
                     && key['key'] !== 'Shift' 
                     && key['key'] !== 'Tab' 
                     && app.cursor.posY < (app.content.height - 50)) {
                    app.cursor.ID.css("top", () => app.cursor.posY += 25 );
               }
          });
          };

//New Line Function. Allows cursor to move to beginning of next line.
          app.cursor.newLine = () => {
               $('body').on('keyup', (key) => {
                     if ((key['key'] === 'Enter' 
                     && key['key'] !== 'Shift' 
                     && key['key'] !== 'Tab' 
                     && app.cursor.posY < (app.content.height - 50))
                     || (app.cursor.posX >= (app.content.width - 34))) {
                         app.cursor.ID.css("left", () => {
                                   app.cursor.posX = 0;
                                   return (app.cursor.posX);
                              });
                         app.cursor.ID.css("top", function () {
                                   app.cursor.posY = (app.cursor.posY + 25);
                                   return (app.cursor.posY);
                              });
                    } 
               });
               };

//------------------functions above control movement of cursor. --------------------
//------------------functions above control ALL movement of cursor. ----------------

// combined two cursor move functions
app.cursor.cursorMove = () => {
      app.cursor.rightMove();
      app.cursor.leftMove();
      app.cursor.upMove();
      app.cursor.downMove();
      app.cursor.newLine();
}
//------------------functions above control ALL movement of cursor. ----------------
//------------------functions below control letter placement. ----------------------

//when key is pressed, place DIV with text of 'this' key, position absolute, and same cursor.posX and cursor.posY on page. Aight. let's do this.


app.divPlace = () => {
      $('body').on('keyup', (key) => {
            if ((app.isInArray(key['key'], app.keys.navKey) === false ) 
            && (app.isInArray(key['key'], app.keys.funKeys) ===false )){
                  // console.log(key['key']) OMG IT woRKED!
                  // console.log(app.cursor.posY, app.cursor.posX)
                  if (key['keyCode'] !== 32) {
                        app.input.inkValue--;
                        app.input.ink.prop('value', (app.input.inkValue-1));
                  }
                  $('.content').append(`<div 
                  style="
                  opacity: ${(app.input.inkValue)/app.input.inkMax};
                  padding: 0;
                  width: 18px;
                  height: 25px;
                  text-align: center;
                  line-height: 25px;
                  position: absolute; 
                  left: ${app.cursor.posX}px;
                  top: ${app.cursor.posY}px;
                  ">
                  ${key['key']}</div>`)
            };
      })
}

//--------Broken idea:

//brokenness adjusts tilt of letters randomly between an absolute max of 5deg +/-. max = {0tilt - (app.input.brokenValue)/20}

//dividing each by 20 leads to a max/min of 5degrees +/- as 100(max value of brokenness)/20 = 5. lowest possible value is 0, goes up by 0.05degrees for each point of brokenness ****START HERE****

//also would take position top and move it by +/- 1px at min or +/- 2pxat mid or +/- 3px at max

//transform: rotate((*RANDOM NUMBER GENERATED ON JANK VALUE*)deg);




//Also, threw in these two little functions to update the Ink and Jank factor. this is called through the actual HTML (in the range input as an attribute) so it's fully dynamic :)

app.updateInkInput = (value) => {
      app.input.inkValue = value;
}
app.updateJankInput = (value) => {
      app.input.jankValue = value
}

//------------------functions above control letter placement. --------------
//------------------functions below control keyboard. ----------------------

//Let's make the typewriter keyboard ACTUALLY WORK lol

app.keyboardSim = function() {
      $('.key').on('click', function(evt) {
            app.keyClicked = $(this).attr('data-value');
            console.log(app.keyClicked)
            app.keyEventUp = $.Event('keyup'); //app.keyEvent = what happens when a keyboard key is released
            app.keyEventPress = $.Event('keypress'); //ibid
            app.keyEventUp['key'] = app.keyClicked; //key of clicked key be the indicator of which key event is it
            app.keyEventPress['key'] = app.keyClicked; //ibid
            if ((app.isInArray(app.keyClicked, app.keys.funKeys)) === true){
                  $(this).trigger(app.keyEventPress); // that key trigger that event
            }
            $(this).trigger(app.keyEventUp); // that key trigger that event
      });
}



//makes keyboard affect the typewriter
// $('body').on('keydown', function (e) {
//       app.pressedKey = getKey(e);
//       if (!key) {
//             return console.warn('No key for', e.keyCode);
//       }

//       key.setAttribute('data-pressed', 'on');
// });
// $('body').on('keyup', function (e) {
//       app.pressedKey = getKey(e);
//       key && key.removeAttribute('data-pressed');
// });



//------------------functions above control keyboard. ----------------------
//------------------functions below control font change. ----------------------






//------------------functions above control font change. ----------------------
//------------------functions below control clear screen. ----------------------


//nice to not have to refresh the page if you wanna start over. Almost the same as the newline, but also removes all child elements of .content and puts cursor.posY at 0 also:

app.clearAll = () => {
      $('.clear').on('click', ()=>{
            $('.content').empty(); //removes all child divs, below functions return cursor to starting position. 
            app.cursor.ID.css("left", () => {
                  app.cursor.posX = 0;
                  return (app.cursor.posX);
            });
            app.cursor.ID.css("top", () => {
                  app.cursor.posY = 0;
                  return (app.cursor.posY);
            });
            app.input.inkValue = app.input.inkMax;
            app.input.ink.prop('value', app.input.inkMax);
      });
}


//------------------functions above control clear screen. ----------------------
//------------------ Init function and Doc ready  ----------------------------

//Doc ready

app.typeInit = () => {
      app.preventKeyFunc();
      app.divPlace();
     app.cursor.cursorMove();
     app.keyboardSim();
     app.clearAll();

};

//Document ready, set GO!
 
$(() => {
     app.typeInit();
});