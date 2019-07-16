# N-Puzzle

### 1. Project Presentation

The goal of this project is to solve the N-puzzle ("taquin" in French) game using the A* search algorithm or one of its variants.

### 2. My implementation

All calculations are done from NodeJS server.

Results are presented using a React client.

Search algorithm implemented :
- A* (informed)
- Greedy Search
- Uniform Cost
- Weighed A*

For applicable search algorithms, following heuristics are implemented :
- Hamming
- Manhattan
- Linear Conflict

### 3. Installation

To launch server, run following commands in root folder:
- `npm install`
- `npm start`

Server will be launched on port 3000

To launch client, run following commands in `./client` folder:
- `npm install`
- `npm start`

Client will be launched on port 8000
