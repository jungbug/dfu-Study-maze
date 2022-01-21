const table = document.querySelector("#table")
const createmaze = (x,y) => {
    const maze = []
    const size = {x,y}
    const coord = [[-1,0],[1,0],[0,-1],[0,1]]

    const init = () => {
        for(let i = 0; i<y * 2 - 1;i++){
            maze.push([])
            for(let j = 0;j<x * 2 - 1;j++){
                maze[i].push(1) // 1 -> 벽 / 0 -> 길
            }
        }
    }


    // 방향 한군데를 랜덤으로 정해서 방문
    const dfs = (x,y) => {
        maze[y][x]= 0;
        // const [wayX, wayY] = getRandCoord(coord)
        coord.sort((a,b) => 0.5-Math.random())
        for(let i = 0; i<coord.length;i++){
            const X = x + coord[i][0]
            const Y = y + coord[i][1]

            if(maze[Y + coord[i][1]]?.[X + coord[i][0]] === 1){
                maze[Y][X] = 0 // 방문표시
                dfs(X+coord[i][0], Y + coord[i][1])
            }
        }
        
    }   

    const createOutWall = () => {
        maze.unshift(new Array(size.x * 2-1).fill(1))
        maze.push(new Array(size.x * 2-1).fill(1))
        for(let i = 0; i<maze.length;i++){
            maze[i].unshift(1)
            maze[i].push(1)
        }
    }

    const render = () => {
        maze.forEach((row,y) => {
            const tr = document.createElement("tr")
            row.forEach(data => {
                const td = document.createElement("td")
                td.style.background = ["white", "black","red","blue"][data]
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }

    const searchPathDFS = (x, y) => {
        maze[x][y] = 2 // 가본길

        if(x === 1 && y === 1){
            maze[maze.length - 2][maze[maze.length-1].length -2] = 3
            maze[1][1] = 3
            return true
        }

        if(maze[x-1][y] === 0 && searchPathDFS(x-1, y)){
            maze[x-1][y] = 3 // 정답인 경로
            return true
        }
        if(maze[x+1][y] === 0 && searchPathDFS(x+1, y)){
            maze[x+1][y] = 3 // 정답인 경로
            return true
        }
        if(maze[x][y-1] === 0 && searchPathDFS(x, y-1)){
            maze[x][y-1] = 3 // 정답인 경로
            return true
        }
        if(maze[x][y+1] === 0 && searchPathDFS(x, y+1)){
            maze[x][y+1] = 3 // 정답인 경로
            return true
        }
        return false
    }

    init()
    dfs(0,0)
    createOutWall()
    
    searchPathDFS(maze.length - 2,maze[0].length-2)
    render()
}

createmaze(40,40)