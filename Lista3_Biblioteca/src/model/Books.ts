export class Book{
    title: string;
    author: string;
    publishedDate: string;
    isbn: string;
    pages: number;
    language: string;
    publisher: string;



    constructor(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string ){
        this.title = title || '';
        this.author = author || '';
        this.publishedDate = publishedDate || '';
        this.isbn = isbn || '';
        this.pages = pages || 0;
        this.language = language || '';
        this.publisher = publisher || '';

    }

}
