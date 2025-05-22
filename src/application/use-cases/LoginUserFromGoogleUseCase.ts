import { CreateUserDTO, UserResponseDTO } from '@application/dtos/UserDTO';
import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';

export class LoginUserFromGoogleUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(payloadUser: CreateUserDTO): Promise<UserResponseDTO> {
    let ddbbUser = await this.userRepository.findByConditions({ email: payloadUser.email, googleId: payloadUser.googleId });

    if (ddbbUser) {
      if (payloadUser.googleId && !ddbbUser.id) {
        ddbbUser.id = payloadUser.googleId;
        ddbbUser.picture = payloadUser.picture || ddbbUser.picture;
        ddbbUser = await this.userRepository.update(ddbbUser);
      }

      return {
        id: ddbbUser.id,
        email: ddbbUser.email,
        name: ddbbUser.name || '',
        picture: ddbbUser.picture || '',
        createdAt: ddbbUser.createdAt,
        updatedAt: ddbbUser.updatedAt,
        role: ddbbUser.role,
      };
    } else {
      ddbbUser = await this.userRepository.create(
        new User({
          email: payloadUser.email,
          name: payloadUser.name,
          picture: payloadUser.picture,
          googleId: payloadUser.googleId,
          id: payloadUser.googleId || '',
        })
      );
    }

    return {
      id: ddbbUser.id,
      email: ddbbUser.email,
      name: ddbbUser.name || '',
      picture: ddbbUser.picture || '',
      createdAt: ddbbUser.createdAt,
      updatedAt: ddbbUser.updatedAt,
      role: ddbbUser.role,
    };
  }
}
