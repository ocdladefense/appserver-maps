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


	function getCourtData()
	{
		$query = "SELECT Name, Judicial_District__c, District_Name__c, Address__c, City__c, State__c, Zipcode__c, Position__c FROM Court__c Where Position__latitude__s != null";	
		
		$api = $this->loadForceApi();

		$result = $api->query($query);



		return $result->getRecords();
	}
}
