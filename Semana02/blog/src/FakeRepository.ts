export interface Post {
    title: string,
    text: string
}


export class FakeRepository {

    private static posts: Array<Post> = [];

    static list(): Array<Post> {
        return FakeRepository.posts;
    }

    static add(post: Post): void {
        FakeRepository.posts.push(post);
    }

}