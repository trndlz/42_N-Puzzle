
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";

function spiralFill(m): number[][] 
{ 
    // Initialize value to be filled  
    // in matrix 
    let val = 1;
    let a = new Array(Number);
  
    /* k - starting row index 
       m - ending row index 
       l - starting column index 
       n - ending column index */
    let k = 0; 
    let l = 0;
    let n = m;
    while (k < m && l < m) 
    { 
        /* Print the first row from 
        the remaining rows */
        for (let i = l; i < m; ++i) {
            a[k][i] = val++; 
        }
            
  
        k++; 
  
        /* Print the last column from 
        the remaining columns */
        for (let i = k; i < n; ++i) {
            a[i][m - 1] = val++; 
        }
            
        n--; 
  
        /* Print the last row from  
        the remaining rows */
        if (k < m) 
        { 
            for (let i = m - 1; i >= l; --i) {
                  a[m - 1][i] = val++; 
            }
                
            m--; 
        } 
  
        /* Print the first column from 
           the remaining columns */
        if (l < m) 
        { 
            for (let i = m - 1; i >= k; --i) {
                  a[i][l] = val++; 
            }
            l++; 
        }
        return a;
    } 
} 
// function spiralArray(test: number ): Array<number> {

//       const ids: Array<number> = [23, 34, 100, 124, 44]; 
//       return ids
// }

// const spiralArray2: Array<number> = (test: number ) => {

//       const ids: Array<number> = [23, 34, 100, 124, 44]; 
//       return ids
// }



const test = (hello) => {

      const st = hello.toString()
      return st;
}
   
//   // T E S T:
//   arr = spiralArray(edge = 5);
//   for (y= 0; y < edge; y++) console.log(arr[y].join(" "));

class App {

      public app: express.Application;
      
      constructor() {
            this.app = express();
            this.config();
            const a = spiralFill(5)
            a.forEach(i => console.log(i))
      }

      
      
      private config(): void {
            this.app.use(cors());
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({extended: false}));
            this.app.use("/api/v1", routes);
      }
}

export default new App().app;