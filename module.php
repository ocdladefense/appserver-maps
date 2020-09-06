<?php 

use Html\Html as Html;


class MapModule extends Module {


	public $routes = array(
			"maps" => array(
					"callback" => "home",
					"content-type" => "text/html",
			)
	);
	
	protected $files =  array(
		"MapTemplate.php"
	);
	
	



	public function __construct(){
			parent::__construct();

			$this->name = "map";
	}
		
	function home() {

		$tpl = new MapTemplate("map");
		$tpl->addPath(__DIR__ . "/templates");
		
		return $tpl;
	}
	
}

