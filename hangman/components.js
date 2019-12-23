class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setScore(score) {
        this.score = score;
    }

    getScore() {
        return this.score;
    }
}