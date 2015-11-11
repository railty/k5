export default class Swipe {
  constructor(el, callback){
      this.touchsurface = el;

      this.threshold = 150, //required min distance traveled to be considered swipe
      this.restraint = 100, // maximum distance allowed at the same time in perpendicular direction
      this.allowedTime = 300, // maximum time allowed to travel that distance
      this.handleSwipe = callback || function(swipeDir){
        console.log("swipeDir = " + swipeDir);
      };
      this.create();
  }

  touchStart(e){
    console.log("touch start");
    var touchobj = e.changedTouches[0];
    this.swipedir = 'none';
    this.dist = 0;
    this.startX = touchobj.pageX;
    this.startY = touchobj.pageY;
    this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
  }

  touchMove(e){
    e.preventDefault(); // prevent scrolling when inside DIV
  }

  touchEnd(e){
    console.log("touch end");
    var touchobj = e.changedTouches[0];
    this.distX = touchobj.pageX - this.startX; // get horizontal dist traveled by finger while in contact with surface
    this.distY = touchobj.pageY - this.startY; // get vertical dist traveled by finger while in contact with surface
    this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
    if (this.elapsedTime <= this.allowedTime){ // first condition for awipe met
        if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint){ // 2nd condition for horizontal swipe met
            this.swipedir = (this.distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint){ // 2nd condition for vertical swipe met
            this.swipedir = (this.distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
    }
    console.log("touch end: " + this.swipedir);
    this.handleSwipe(this.swipedir);
    e.preventDefault();
  }

  create(){
    this.touchsurface.addEventListener('touchstart', this.touchStart.bind(this), false);
    this.touchsurface.addEventListener('touchmove', this.touchMove.bind(this), false);
    this.touchsurface.addEventListener('touchend', this.touchEnd.bind(this), false);
  }
  delete(){
    this.touchsurface.removeEventListener('touchstart', this.touchStart.bind(this), false);
    this.touchsurface.removeEventListener('touchmove', this.touchMove.bind(this), false);
    this.touchsurface.removeEventListener('touchend', this.touchEnd.bind(this), false);
  }
}
