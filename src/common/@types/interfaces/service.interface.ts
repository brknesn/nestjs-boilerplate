import { BaseEntity } from "@common/database";
import { PageOptionsDto } from "@common/dtos/pagination.dto";
import { User } from "@entities";
import { Pagination } from "@lib/pagination";
import { EntityData, RequiredEntityData } from "@mikro-orm/core";
import { Observable } from "rxjs";

/**
 * common service interface that enforces common methods
 */
export interface IBaseService<
	Entity extends BaseEntity = BaseEntity,
	CreateDto extends RequiredEntityData<Entity> = RequiredEntityData<Entity>,
	UpdateDto extends EntityData<Entity> = EntityData<Entity>,
> {
	create(dto: CreateDto, user?: User): Promise<Entity> | Observable<Entity>;
	findAll(dto: PageOptionsDto): Observable<Pagination<Entity>>;
	findOne(index: string): Observable<Entity>;
	update(index: string, dto: UpdateDto): Observable<Entity>;
	remove(index: string): Observable<Entity>;
}
