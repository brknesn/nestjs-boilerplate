import { PostState } from "@common/@types";
import { BaseEntity } from "@common/database";
import {
	BeforeCreate,
	BeforeUpdate,
	Collection,
	Entity,
	Enum,
	EventArgs,
	ManyToMany,
	ManyToOne,
	OneToMany,
	Property,
	Rel,
} from "@mikro-orm/core";
import { slugify } from "helper-fns";

import { Comment, Tag, User } from "./index";

@Entity()
export class Post extends BaseEntity {
	@Property()
	slug?: string;

	@Property()
	title!: string;

	@Property({ type: "text" })
	description!: string;

	@Property({ type: "text" })
	content!: string;

	@Enum({ items: () => PostState })
	state = PostState.DRAFT;

	@Property()
	readingTime = 0;

	@Property()
	readCount = 0;

	@Property()
	favoritesCount = 0;

	@ManyToOne({ eager: false })
	author: Rel<User>;

	@OneToMany(() => Comment, comment => comment.post, {
		eager: false,
		orphanRemoval: true,
	})
	comments = new Collection<Comment>(this);

	@ManyToMany(() => Tag, "posts", { owner: true })
	tags = new Collection<Tag>(this);

	@BeforeCreate()
	@BeforeUpdate()
	async generateSlug(arguments_: EventArgs<this>) {
		if (arguments_.changeSet?.payload?.title) {
			this.slug = slugify(this.title);
		}
		this.readingTime = this.getReadingTime(this.content);
	}

	getReadingTime(content: string) {
		const avgWordsPerMin = 250;
		const count = content.match(/\w+/g).length;

		return Math.ceil(count / avgWordsPerMin);
	}

	constructor(partial?: Partial<Post>) {
		super();
		Object.assign(this, partial);
	}
}
