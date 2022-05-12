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
		//Check for a post request
		//If this is received you extract the data and send it to custom feature object
		$req = $this->getRequest();
        $data = $req->getBody();
		$_SESSION["searchQuery"] = $data->query;
		//$_SESSION["searchQuery"] = "SELECT Id, Name, Phone, MailingAddress FROM Contact WHERE LastName like '%Smith'";
		$tpl = new MapTemplate("map");
		$tpl->addPath(__DIR__ . "/templates");

		return $tpl;
	}

	function getMemberData()
	{
		$query = "SELECT Id, Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c, Ocdla_Is_Expert_Witness__c FROM Contact WHERE Ocdla_Current_Member_Flag__c = true";	

		$api = $this->loadForceApi();

		$result = $api->query($query);

		//  AND Ocdla_Member_Status__c = R

		return $result->getRecords();			

	}


	function getSearchData() {

		$request = $this->getRequest();
		$body = $request->getBody();

		
		$where = $body->where;
		$limit = $body->limit;
		$query = "SELECT Id, Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c, Ocdla_Is_Expert_Witness__c FROM Contact ";

		if($where != null)
		{
            //null position and limit bug fixed
            //unsure if we can persist feature on map and change its datasource
            //may need to update library, mapfeature class
			$query.="WHERE MailingLatitude != null AND ";
			$struct = [];
			foreach($where as $obj)
			{
				$struct[]= $obj->field." ".$obj->op." '".$obj->value."'";
			}
			$query.= implode(" AND ",$struct);
		}
        if($limit != null)
		{
			$query.=" LIMIT ".$limit;
		}
        //var_dump($query);

		$api = $this->loadForceApi();

		$result = $api->query($query);
        $myResult = array();
        $myResult["query"] = $query;
        $myResult["results"] = $result->getRecords();	

		return $myResult;		
	}

	function getWitnessData()
	{
		$query = "SELECT Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c, Ocdla_Is_Expert_Witness__c, Ocdla_Expert_Witness_Primary__c, Ocdla_Expert_Witness_Other_Areas__c FROM Contact WHERE Ocdla_Is_Expert_Witness__c = true";	
		
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
