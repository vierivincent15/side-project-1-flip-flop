class Tile {
    constructor(state=0) {
        this.state = state
    }

    changeState() {
        if (this.state == 1) {
            this.state = 0
        }
        else if (this.state == 0) {
            this.state = 1
        }
    }

    getClassState() {
        if (this.state == 1) {
            return "primary"
        }
        else if (this.state == 0) {
            return "secondary"
        }

    }

}

class Board {
    createGrid(n, start_config) {
        var start = start_config.split(',').map(Number)
        var grid = []
            for (var i=0; i<n; i++){
                var ls = []
                for (var j=1; j<n+1; j++){
                    if (start.includes(i*n+j)) {
                        ls[j-1] = new Tile(1)
                    }else{
                        ls[j-1] = new Tile(0)
                    }
                }
                grid[i] = ls
            }
            return grid
    }
    constructor(size, start_config){
        this.size = size
        this.grid = this.createGrid(size, start_config)
    }

    changeBoardOnTileClick(clicked_pos) {
        var x = clicked_pos[1]
        var y = clicked_pos[0]

        this.grid[y][x].changeState()
        if(y-1 >= 0) {
            this.grid[y-1][x].changeState()
        }
        if(y+1 < this.size) {
            this.grid[y+1][x].changeState()
        }
        if(x-1 >= 0) {
            this.grid[y][x-1].changeState()
        }
        if(x+1 < this.size) {
            this.grid[y][x+1].changeState()
        }

    }

    checkWinCondition() {
        for(var i=0; i<this.size; i++){
            for(var j=0; j<this.size; j++){
                if(this.grid[i][j].state == 0){
                    return false
                }
            }
        }
        return true
    }
}

function renderGameGrid(board) {
    var dim = board.size

    var htmlGrid = ""
    for(var i=0; i<dim; i++){
        row = "<tr>\n"
        for(var j=0; j<dim; j++){
            cellClass = board.grid[i][j].getClassState()
            row += "<td id='["+i+","+j+"]' class='table-"+cellClass+"' onClick='tileClicked(this.id)'></td>\n"
        }
        row += "</tr>\n"
        htmlGrid += row
    }

    var html = "<table class='table table-borderless playing-grid'> \
    <tbody>\n" +
    htmlGrid + 
    "</tbody> \
    </table>"
    $('#gameGrid').html(html)

}

function updateGameGrid(board, gridID) {
    board.changeBoardOnTileClick(gridID)
    renderGameGrid(board)
    if (board.checkWinCondition()){
        console.log("WIN")
    }

}