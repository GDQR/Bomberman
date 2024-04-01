let enumComponentsLenght = 0;
export const eComp = {
    vec2: enumComponentsLenght++,
    offsetImage: enumComponentsLenght++,
    animation: enumComponentsLenght++,
    collider: enumComponentsLenght++,
    grid: enumComponentsLenght++,
    move: enumComponentsLenght++,
};

class Component{
    value = [];
};

class EntityManager{
    id=0;
    entities = [];
    deadEntities=[];
    components = [];

    create(){
        if(this.deadEntities.length === 0){
            // console.log("created id: "+this.id);
            this.entities.push(this.id);
            this.components.push(new Component);
            return this.id++;
        }
        let id = this.deadEntities.shift();
        this.entities[id] = id;
        return id;
    };

    destroy(id){
        this.deadEntities.push(id);
        delete this.entities[id];
    };
};

export let manEntity = new EntityManager;

class ComponentManager{
    sparce = [];
    packed = [];

    constructor(){
        for(let i=0; i< enumComponentsLenght; i++){
            this.sparce[i] = new Component();
            this.packed[i] = new Component();
        }
    }

    create(id, componentID, value){
        // console.log(value);
        // console.log(componentID);
        // console.log(id);
        this.sparce[componentID].value[id] = this.packed[componentID].value.length;
        this.packed[componentID].value.push(value);
        manEntity.components[id].value.push(componentID);
    };


    get(componentID){
        return this.packed[componentID];
    }

    getByID(id,componentID){
        return this.packed[componentID].value[this.sparce[componentID].value[id]];
    }

    destroyID(id){
        // console.log(this.sparce);
        // console.log(this.packed);
        // console.log("destruir id: "+id);
        // console.log("cantidad de componentes: "+manEntity.components[id].value.length);
        // for(let i=0; i< manEntity.components[id].value.length; i++){
        //     console.log("borrar componente: "+ manEntity.components[id].value[i]);
        //     this.destroy(id,manEntity.components[id].value[i]);
        // }
        while(manEntity.components[id].value.length != 0){
            // console.log("borrar componente: "+ manEntity.components[id].value[0]);
            this.destroy(id,manEntity.components[id].value.shift());
            // console.log("pase");
        }
        // console.log(manEntity.components[id]);
        // console.log(this.sparce);
        // console.log(this.packed);
    };

    destroy(id, componentID){

        for(let i=0; i<this.sparce[componentID].value.length;i++){
            if(this.sparce[componentID].value[i] > this.sparce[componentID].value[id]){
                // console.log("posicion restada: "+i);
                this.sparce[componentID].value[i]--;
            }
        }

        this.packed[componentID].value.splice(this.sparce[componentID].value[id],1);
        delete this.sparce[componentID].value[id];
    };
};

export let manComp = new ComponentManager;
