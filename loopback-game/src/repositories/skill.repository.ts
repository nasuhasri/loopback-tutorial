import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Skill, SkillRelations} from '../models';
import {Character} from '../models/character.model';
import {CharacterRepository} from './character.repository';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {

  public readonly character: BelongsToAccessor<
    Character,
    typeof Skill.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MysqlDataSource,
    @repository .getter('CharacterRepository')
    protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Skill, dataSource);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter);
  }
}
