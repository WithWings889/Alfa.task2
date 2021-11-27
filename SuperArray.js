function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export default class SuperArray {
    #row;
    #column;
    #marker;
    #matrix = null;

    constructor(n, m, options) {
        this.#row = n;
        this.#column = m;
        this.#createMatrixWithRandom(options);
    }

    goTo(point) {
        if(this.#marker) {
            this.#marker = {
                x : point.x,
                y : point.y
            }
        }
    }

    setMarker(point) {
        if(!this.#marker) {
            this.#marker = {
                x : point.x,
                y : point.y
            }
        }
    }

    clear(direction, k) {
        switch (direction) {
            case 'row':
                this.#matrix.map((value, index) => {if(index === k) value.fill(0)});
                break;

            case 'column':
                this.#matrix.map(value => value[k] = 0);
                break;

            default:
                console.log('This direction not found, available: row, column');
        }
    }

    shift(direction) {
        if(this.#marker)
        switch (direction) {
            case 'left':
                this.#marker.x = Math.max(this.#marker.x - 1, this.#column - 1);
                break;

            case 'right':
                this.#marker.x = Math.min(this.#marker.x + 1, this.#column - 1);
                break;

            case 'top':
                this.#marker.x = Math.max(this.#marker.y - 1, this.#row - 1);
                break;

            case 'bottom':
                this.#marker.x = Math.min(this.#marker.y + 1, this.#row - 1);
                break;

            default:
                console.log('This direction not found, available: left, right, top, bottom');
        }
    }

    #createMatrixWithRandom(options) {
        this.#matrix = [];

        for (let i = 0; i < this.#row; i++){
            this.#matrix[i] = [];
            for (let j = 0; j < this.#column; j++){
                this.#matrix[i][j] = getRandomInt(options.min, options.max);
            }
        }

    }

    toHTML() {
        let stringMatrix = ``;
        for (let i = 0; i < this.#row; ++i) {
            for (let j = 0; j < this.#column; ++j) {
                if(this.#marker && j === this.#marker.x && i === this.#marker.y) {
                    stringMatrix += `&`;
                } else {
                    stringMatrix += this.#matrix[i][j];
                }
                stringMatrix += ` `;
            }
            stringMatrix += `<br>`;
        }
        return stringMatrix;
    }

    render(selector, separator) {
      document.querySelector(selector).innerHTML = this.toHTML() + `<br>${separator}`;
    }
}