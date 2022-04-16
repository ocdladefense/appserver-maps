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
		"lib/Location.js",
		"lib/markers/UrlMarker.js",
		"lib/markers/CustomMarker.js",
		"lib/markers/GoogleMarker.js",
		"lib/markers/Marker.js",
		"js/OCDLATheme.js",
		"lib/MapConfiguration.js",
		"lib/MapApplication.js",
		"lib/MapFeature.js",
		"lib/MapDatasources.js",
		"js/config.js",
		"js/main.js"
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


		$this->addScripts($scripts);
	}
}
