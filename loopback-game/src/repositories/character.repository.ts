import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Armor, Character, CharacterRelations, Skill, Weapon} from '../models';
// Defining hasOne Model Relation in Repository
import {ArmorRepository} from './armor.repository';
import {SkillRepository} from './skill.repository';
import {WeaponRepository} from './weapon.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {

  // character may have one weapon, armor, and skill ID
  // able to find correct entity by that id
  public armor: HasOneRepositoryFactory<
    Armor,
    typeof Character.prototype.id
  >;

  public weapon: HasOneRepositoryFactory<
    Weapon,
    typeof Character.prototype.id
  >;

  public skill: HasOneRepositoryFactory<Skill, typeof Character.prototype.id>;

  // help to assign weapon, armor, and skill to character
  constructor(
    @inject('datasources.mongo') dataSource: MysqlDataSource,
    @repository.getter(ArmorRepository)
    protected armorRepositoryGetter: Getter<ArmorRepository>,
    @repository.getter(WeaponRepository)
    protected weaponRepositoryGetter: Getter<WeaponRepository>,
    @repository.getter(SkillRepository)
    protected skillRepositoryGetter: Getter<SkillRepository>,
  ) {
    super(Character, dataSource);
    this.armor = this.createHasOneRepositoryFactoryFor('armor', armorRepositoryGetter);
    this.weapon = this.createHasOneRepositoryFactoryFor('weapon', weaponRepositoryGetter);
    this.skill = this.createHasOneRepositoryFactoryFor('skill', skillRepositoryGetter);
  }
}
