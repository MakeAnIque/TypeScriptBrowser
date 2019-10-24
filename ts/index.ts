class Myfile {
    //field
    engine: string;

    //constructor
    constructor(engine: string) {
        this.engine = engine;
    }

    //function
    disp(): void {
        console.log("Engine is  :   " + this.engine);
    }
}
let c: any = new Myfile("file");

c.disp();
