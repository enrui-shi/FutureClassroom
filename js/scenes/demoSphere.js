let DemoSphere = function() {

    this.init = (model) => {
       this.start = true;
       this.name = "sphere";
       this.model = model;
       this.model.move(0,1.5,0).scale(0.2).turnX(1.8);
       this.sphere = this.model.add('sphere').color(1,1,1).texture('media/textures/ball.jpg');
    }
    
    this.display = () => {
       this.model.animate(() => {
          this.sphere.identity().turnZ(1 * this.model.time);
       });
    }
 }
 
 export let demoSphere
  = new DemoSphere();
 