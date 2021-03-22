import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Armor, ArmorRelations} from '../models';
import {Character} from '../models/character.model';
import {CharacterRepository} from './character.repository';

export class ArmorRepository extends DefaultCrudRepository<
  Armor,
  typeof Armor.prototype.id,
  ArmorRelations
> {

  public readonly character: BelongsToAccessor<
    Character,
    typeof Armor.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MysqlDataSource,
    @repository .getter('CharacterRepository')
    protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Armor, dataSource);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter);
  }
}
