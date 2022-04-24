<?php

class MapTemplate extends Template
{

	// Component styles.
	private $css = array(

		array(
			"active" => true,
			"href" => "/modules/maps/assets/css/mapStyles.css"
		)
	);


	// Core scripts,
	//   typically loaded from the framework and not a module.
	private $core = array(
		"User.js"
	);


	private $module = array(
        "js/mapkey.js",
		"js/OCDLATheme.js",
        "js/config.js",
	);

    private $main = array(
		"main.js",
		"UrlMarker.js"
	);

	private $moduleCore = array(
		"Member.js",
		"Court.js"
	);


	public function __construct()
	{
		parent::__construct("map");

		$this->addStyles($this->css);

		$scripts = array();

		foreach ($this->core as $name) {
			$scripts[] = array("src" => "/content/libraries/core/" . $name);
		}
		foreach ($this->moduleCore as $name) {
			$scripts[] = array("src" => "/modules/maps/assets/core/" . $name);
		}
		foreach ($this->module as $name) {
			$scripts[] = array("src" => "/modules/maps/assets/" . $name);
		}
        foreach ($this->main as $name) {
			$scripts[] = array("src" => "/modules/maps/assets/js/" . $name, "type" => "module");
		}


		$this->addScripts($scripts);
	}
}
