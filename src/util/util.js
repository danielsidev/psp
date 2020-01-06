class Util{

    constructor(){
        this.invalidValues= [null, undefined, "", "null", "undefined"];
        this.result = [];
    }

     listConstruct(obj) {
        for (var property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
              this.listConstruct(obj[property]);
            } else {
              this.result.push(obj[property]);
            }
          }
        }
        return this.result;
      }
    checkInvalidList(values){
        let response = false;
        if(values && values.length > 0){
            values.map(value => {
                if(this.invalidValues.includes(value)){
                    response =  this.invalidValues.includes(value);
                }
            });
        }else{
            console.log(`value: ${values}`);
            if(this.invalidValues.includes(values)){
                response =  this.invalidValues.includes(values);
            }
        }

        return response;
    }
}

module.exports = Util