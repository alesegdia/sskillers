
<?php


function isPNG($var)
{
	return preg_match('/png/', $var);
}

$files = scandir('.');
$pngfiles = array_filter($files, "isPNG");
$outfile = fopen('gfx.js', 'w');
fwrite( $outfile, "SSK.namespace(\"SSK.game.gfx\");\n\n" );
fwrite( $outfile, "SSK.game.gfx.SpriteCache = {};\n\n" );

foreach( $pngfiles as $file )
{
	$pats = array();
	$pats[0] = '/.png/';
	$pats[1] = '/-/';
	$sust = array();
	$sust[0] = '';
	$sust[1] = '_';
	$varname = "SSK.game.gfx.SpriteCache.SP_" . strtoupper(preg_replace($pats, $sust, $file));
	fwrite( $outfile, $varname . " = new Image();\n" );
	fwrite( $outfile, $varname . ".src = \"../../media/img/$file\";\n\n" );
}
fclose($outfile);

copy( "gfx.js", "../../game/asset/gfx.js" );

?>
