class Box 
  {
  constructor()
  {
    this.horizontal= 100;
    this.y=100;
    this.w=50;
    this.h=50;
  }
show()
{
  rect(this.horizontal,this.y,this.w,this.h)
}

setspeed(vel)
{
this.horizontal=this.horizontal+vel;
}

  }

  
