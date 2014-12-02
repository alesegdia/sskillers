
<?php

$file = fopen( "texts.txt", "r" );
$pat = '/\[(*)\] (*)/';

while( ($line = fgets($file)) !== false )
{
	preg_match($pat, $line, $mat);
	print_r($mat);
}

?>
