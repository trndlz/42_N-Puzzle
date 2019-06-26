#!/bin/bash
solvablepath=generatePuzzlesInput/solvable
unsolvablepath=generatePuzzlesInput/unsolvable
mkdir -p $unsolvablepath;
mkdir -p $solvablepath;
for i in {1..30}
do
   for j in {3..7}
   do
      python ./npuzzle-gen.py $j -u > "$unsolvablepath/$i-size$j"
      python ./npuzzle-gen.py $j -s > "$solvablepath/$i-size$j"
   done
done
echo "🦊	Puzzle generation done !"


