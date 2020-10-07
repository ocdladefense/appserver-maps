<?php

class MapTemplate extends Template
{

	// Component styles.
	private $css = array(
		/*
			array(
				"active" => true,
				"href" => "/modules/car/assets/css/carCreateStyles.css"
			)
			*/);

	/*
      <apex:stylesheet value="{!$Resource.MapStyles}" />
      <apex:stylesheet value="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      <apex:includeScript value="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"> </apex:includeScript> 
      <apex:includeScript value="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></apex:includeScript>
		*/


	// Core scripts,
	//   typically loaded from the framework and not a module.
	private $core = array(
		"User.js",
		"SiteLibraries.js"
	);


	private $module = array(
		"lib/Location.js",
		"lib/UrlMarker.js",
		"lib/CustomMarker.js",
		"lib/GoogleMarker.js",
		"lib/Marker.js",
		"lib/OCDLATheme.js",
		"lib/MapConfiguration.js",
		"lib/MapApplication.js",
		"lib/MapFeature.js",
		"lib/MapDatasources.js",
		"js/config.js",
		"lib/main.js"
	);

	private $moduleCore = array(
		// "Repository.js",
		// "Callout.js",
		"Member.js"
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
