import { Validators } from "../../../config/validators";

export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ) { }
   
    static create(object:{[key:string]:any}): [string?,CreateProductDto?] {
        const { name, available, price, description, user, category } = object;
        if (!name ) return ['name is required'];
        if (!user ) return ['user is required'];
        if (!Validators.isMongoId(user)) return ['user is not valid'];
        if (!category ) return ['category is required'];
        if (!Validators.isMongoId(category)) return ['category is not valid'];
        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];
    }

}