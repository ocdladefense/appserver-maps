<?php

use Html\Html as Html;

class MapModule extends Module
{
	public function __construct()
	{
		parent::__construct();

		$this->name = "map";
	}

	function home()
	{
		$tpl = new MapTemplate("map");
		$tpl->addPath(__DIR__ . "/templates");

		return $tpl;
	}

	function getMemberData()
	{
		$query = "SELECT Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c, Ocdla_Is_Expert_Witness__c FROM Contact WHERE Ocdla_Current_Member_Flag__c = true";	
		
		$api = $this->loadForceApi();

		$result = $api->query($query);

		//  AND Ocdla_Member_Status__c = R

		return $result->getRecords();
	}

	function getWitnessData()
	{
		$query = "SELECT Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c, Ocdla_Is_Expert_Witness__c FROM Contact WHERE Ocdla_Is_Expert_Witness__c = true";	
		
		$api = $this->loadForceApi();

		$result = $api->query($query);

		//Testing Purposes
		/*var_dump($result);
		exit;*/
		return $result->getRecords();
	}

	/**
	 * Need to update courts to this method call,
	 * 	currently using Courts.js -> getCourts()
	 */
	function getCourtData()
	{
		$query = "SELECT JudicialDistrict, District, CourtName, streetAddress, city, state, zipcode, position FROM courts";	
		
		$api = $this->loadForceApi();

		$result = $api->query($query);

		//  AND Ocdla_Member_Status__c = R

		return $result->getRecords();
	}
}
