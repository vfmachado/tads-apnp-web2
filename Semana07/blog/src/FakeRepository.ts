import { IPost } from "./models/Post";

export class FakeRepository {

    private static posts: Array<IPost> = [];

    static list(): Array<IPost> {
        return FakeRepository.posts;
    }

    static add(post: IPost): void {
        FakeRepository.posts.push(post);
    }

}