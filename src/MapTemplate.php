<?php

class MapTemplate extends Template {

		// Component styles.
		private $css = array(
			/*
			array(
				"active" => true,
				"href" => "/modules/car/assets/css/carCreateStyles.css"
			)
			*/
		);
		
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
			"Repository.js",
			"Callout.js",
			"Member.js",
			"Location.js",
			"MarkerStyle.js",
			"Marker.js",
			"CustomMapTheme.js",
			"MapConfiguration.js",
			"MapApplication.js",
			"MapFeature.js",
			"MapDatasources.js",
			"main.js"
		);



		public function __construct() {
			parent::__construct("map");
			
			$this->addStyles($this->css);

			$scripts = array();
			
			foreach($this->core as $name) {
				$scripts [] = array("src" => "/content/libraries/core/".$name);			
			}
			foreach($this->module as $name) {
				$scripts [] = array("src" => "/modules/map/assets/lib/".$name);			
			}
			
			
			$this->addScripts($scripts);
		}
	

		
		public function formatResults($results, $config) {
			
			// Number of words to display in the teaser
			$teaserWordLength = $config['teaserWordLength'];
			
			// Minimun number of characters
			$teaserCutoff = $config['teaserCutoff'];
			
			// Whether to use teasers, or not.
			$useTeasers = $config['useTeasers'];
		
			$cases = [];



			foreach($results as $result) {

				$case = $result;

				$case["month"] = substr($case["month"], 0, 3);
				$case["month"] .= ".";

				$summaryArray =  explode(" " , $case["summary"]);
				$case['useTeaser'] = $useTeasers === true && strlen($case["summary"]) > $teaserCutoff;

				$case['teaser'] = implode(" ", array_slice($summaryArray, 0, $teaserWordLength));
				$case['readMore'] = implode(" ", array_slice($summaryArray, $teaserWordLength));

				$cases[] = $case;
			} 


			return $this->bind("cases",$cases);
		}
}