// modelo de datos para el usuario del modelo para la base de datos

import { CustomError } from "../error/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValided: boolean,
    public password: string,
    public role: string[],
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValided, password, role, img } = object;

    if (!id && !_id) throw CustomError.badRequest("Id is required");
    if (!name) throw CustomError.badRequest("Name is required");
    if (!email) throw CustomError.badRequest("Email is required");
    if (emailValided=== undefined ) throw CustomError.badRequest("EmailValided is required");
    if (!password) throw CustomError.badRequest("Password is required");
    if (!role) throw CustomError.badRequest("Role is required");

    return new UserEntity(
      id || _id,
      name,
      email,
      emailValided,
      password,
      role,
      img
    );
  }
}
