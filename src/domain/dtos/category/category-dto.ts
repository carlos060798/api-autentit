
// objeto de tranferencia de datos que  verifica el contendioo delos datos recibidos y tambien la creacion del objeto esperado
export  class CreateCategoryDto{

    private constructor(
     public readonly name:string,
     public readonly available:boolean,
    ){}

    public static create(object:{[key:string]:any}):[string?,CreateCategoryDto?]{
        const {name, available} = object
        let  availableBoolean = available
         if (!name) return  [" name is required"]
         if (typeof available !== "boolean") {
            availableBoolean = ( available === 'true' )
         }

        return [undefined,new CreateCategoryDto(name,availableBoolean)]
    }
}