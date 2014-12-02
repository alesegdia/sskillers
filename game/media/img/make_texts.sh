
#!/usr/bin/env bash

function doit {
	[[ $1 =~ "(\[(*)\]) (*)" ]]
	outfile=`echo "$1" | sed -e 's/ //g'`
	./fontgen "fivepx.png" $outfile"-0.png" "$1" 1
	./fontgen "fivepx.png" $outfile"-1.png" "$1" 2
}

while read p; do
	doit "$p"
done < texts.txt
