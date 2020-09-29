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

	// Testing here
	function getMemberData()
	{
		//$saleforce = new Salesforce();
		//return $saleforce->query("SELECT name, member_type__c, phone, email, mailingaddress, mailinglatitude, mailinglongitude FROM contact WHERE is_active__c = true");
	}
}
