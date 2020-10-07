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

	/*
	 	Call to get member data here
	 	memberTypes = "null", A", "N", "R", "S", "L", "LL",
		null = Academic Members (typically law students), 
		A = Admin/Exec/Private Investigator (licensed) 
		N = NonLawyer (Professional Member)
		R = Regular Members (practicing lawyers)
		S = Sustaining Members (paid extra fee for annual perks)
		L = Lifetime Members (paid extra fee for lifetime membership)
		LL = Law Library (could have a membership)
	*/
	function getMemberData()
	{
		// From config/config.php
		global $oauth_config;

		$saleforce = new Salesforce($oauth_config);
		$assets = $saleforce->CreateQuery('SELECT Name, Ocdla_Member_Status__c, Phone, Email, MailingAddress, Ocdla_Current_Member_Flag__c ' .
			'FROM Contact WHERE Ocdla_Current_Member_Flag__c = true');	//  AND Ocdla_Member_Status__c = R

		return $assets;
	}
}
