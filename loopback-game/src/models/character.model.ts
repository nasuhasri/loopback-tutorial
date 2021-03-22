import {Entity, hasOne, model, property} from '@loopback/repository';
import {Armor} from './armor.model';
import {Skill} from './skill.model';
import {Weapon} from './weapon.model';

@model()
export class Character extends Entity {
  @property({
    type: 'string',
    id: true,
    useDefaultIdType: false,
    defaultFn: 'uuidv4'
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    default: 1,
  })
  level?: number;

  // Create relationship between models
  // Each character may have one weapon, armor and skill
  @hasOne(() => Armor)
  armor?: Armor;

  @hasOne(() => Weapon)
  weapon?: Weapon;

  @hasOne(() => Skill)
  skill?: Skill;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}

export interface CharacterRelations {
  // describe navigational properties here
}

export type CharacterWithRelations = Character & CharacterRelations;
