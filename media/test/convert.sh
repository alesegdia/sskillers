#!/usr/bin/env bash

cd base
for f in `ls *.png`
do
	basenm=${f%%.png}
	cp $f ../der/${basenm}_der.png
	convert $f -flop ../izq/${basenm}_izq.png
done
cd ..
