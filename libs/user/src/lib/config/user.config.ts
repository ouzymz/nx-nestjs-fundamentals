import { registerAs } from '@nestjs/config';
import { Nationality } from '../entities/nationality.entity';

export default registerAs('users', () => ({
  users: [
    {
      id: 1,
      name: 'Shipwreck Roast',
      sirname: 'Buddy Brew',
      likes: 0,
      nationalities: [{ id: 1, name: 'turkish', users: [] }] as Nationality[],
    },
  ],
}));
