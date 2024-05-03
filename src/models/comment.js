export default class CommentModel {
    constructor(data) {
        this.id = data.id;
        this.text = data.text;
        this.emotion = data.emotion;
        this.author = data.author;
        this.date = data.date;
    }

    toRAW() {
        return {
            "id": this.id,
            "text": this.text,
            "emotion": this.emotion,
            "author": this.author,
            "date": this.date,
        };
    }

    static clone(data) {
        return new CommentModel(data.toRAW());
    }

    static parseComment(data) {
        return new CommentModel(data);
    }

    static parseComments(data) {
        return data.map(CommentModel.parseComment);
    }
}