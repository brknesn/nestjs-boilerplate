import { BaseRepository } from "@common/database";
import { User } from "@entities";
import { createMock } from "@golevelup/ts-jest";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { mockedUser } from "@mocks";
import { Test, TestingModule } from "@nestjs/testing";

import { ProfileService } from "./profile.service";

describe("ProfileService", () => {
	let service: ProfileService;

	const mockUserRepo = createMock<BaseRepository<User>>();

	// default mocks

	mockUserRepo.findOne.mockImplementation((options: any) =>
		Promise.resolve({
			...mockedUser,
			username: options.username,
		} as any),
	);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProfileService,

				{
					provide: getRepositoryToken(User),
					useValue: mockUserRepo,
				},
			],
		}).compile();

		service = module.get<ProfileService>(ProfileService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should getProfileByUsername", () => {
		service.getProfileByUsername("username").subscribe(result => {
			expect(result).toStrictEqual(mockedUser);
			expect(mockUserRepo.findOne).toBeCalledWith(
				{ username: "username", isObsolete: false, isActive: true },
				{ populate: [] },
			);
		});
	});
});
