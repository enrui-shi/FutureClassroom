let DemoDoor = function() {

   this.init = (model) => {
      this.start = true;
      this.name = "cube";
      this.model = model;
      this.model.move(-0.5,1.2,0).scale(0.15).turnY(3.1415/2);
      this.cube1 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube2 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube3 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube4 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube5 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube6 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube7 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube8 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube9 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube10 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube11 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube12 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube13 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.cube14 = this.model.add('cube').color(1,1,1).texture('media/textures/minecraft.png');
      this.nether1 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.nether2 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.nether3 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.nether4 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.nether5 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.nether6 = this.model.add('cube').color(1,1,1).texture('media/textures/nether.png');
      this.cube1.identity().move(0,0,0);
      this.cube2.identity().move(0,2,0);
      this.cube3.identity().move(0,4,0);
      this.cube4.identity().move(0,6,0);
      this.cube5.identity().move(0,8,0);
      this.cube6.identity().move(0,8,2);
      this.cube7.identity().move(0,8,4);
      this.cube8.identity().move(0,8,6);
      this.cube9.identity().move(0,6,6);
      this.cube10.identity().move(0,4,6);
      this.cube11.identity().move(0,2,6);
      this.cube12.identity().move(0,0,6);
      this.cube13.identity().move(0,0,4);
      this.cube14.identity().move(0,0,2);
      this.nether1.identity().move(0,2,2).scale(0.1,1,1);
      this.nether2.identity().move(0,4,2).scale(0.1,1,1);
      this.nether3.identity().move(0,6,2).scale(0.1,1,1);
      this.nether4.identity().move(0,2,4).scale(0.1,1,1);
      this.nether5.identity().move(0,4,4).scale(0.1,1,1);
      this.nether6.identity().move(0,6,4).scale(0.1,1,1);
   }
   
   this.display = () => {
      this.model.animate(() => {
      });
   }
}

export let demoDoor
 = new DemoDoor();
