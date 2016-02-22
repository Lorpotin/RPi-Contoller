<?php


$hex = (string)$_POST['hex'];

if(isset($_POST['hex'])) {
	
	echo "#".$_POST['hex'];
	// Now send to raspberry python server stuffs
	
}
else
	echo "Oops, something went wrong.";
	


?>