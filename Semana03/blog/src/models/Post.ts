import { FakeRepository } from "../FakeRepository";

export interface IPost {
    title: string,
    text: string
}

export class Post implements IPost {
    
    title: string;
    text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }

    save(): void {
        FakeRepository.add(this);
    }

    static listAll(): IPost[] {
        return FakeRepository.list();
    }

}