const board=(()=>{
    let rows=3, cols=3
    let matrix = Array.from({ length: rows }, () => Array(cols).fill('_'));
    const poss=['X', 'Y']
    let turn=0
    let status='P' //P for pending
    const fill=(row, col)=>{
        if (status=='P'){
        if (matrix[row][col]=='_'){
            matrix[row][col]=poss[turn]
            if (isWin(row, col)){
                status=poss[turn]
            }
            turn=(turn+1)%2
        }
        else {
            console.log("square already occupied")
        }}
        else {
            console.log("game over can't modify, reset board")
        }
    }
    let check=(a, b, c)=>{
        return (a==b && b==c)
    }
    let isWin=(lr, lc)=>{
        // only need to check last modified row/col/diagonal
           isColFull= check(matrix[0][lc], matrix[1][lc], matrix[2][lc])
           isRowFull= check(matrix[lr][0], matrix[lr][1], matrix[lr][2])
           isDiagFull=false
           if (lr==lc){
                isDiagFull=check(matrix[lr][lc], matrix[(lr+1)%3][(lc+1)%3], matrix[(lr+2)%3][(lc+2)%3])
           }
           return (isColFull || isRowFull || isDiagFull)
    }
    const getMatrix=()=>matrix 
    const reset=()=>{
        turn=0; status='P'
        matrix = Array.from({ length: rows }, () => Array(cols).fill('_'));
    }
    const getStatus=()=>status
    return {getMatrix, reset, getStatus, fill}
    
    
})()
// ------------------------------------------------------
//forgot to read the instructions lollz they wanted highly modularized code even for something as simple as this, will do some other day