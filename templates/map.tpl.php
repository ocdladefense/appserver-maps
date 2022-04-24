<?php

/**
 * 
 * Template to render a map.
 */
?>

<nav id="toolbar" class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow">
	<div class="x-container">
		<div class="navbar-collapse d-sm-inline-flex flex-sm-row-reverse">

			<ul id="toolbarOptions" class="navbar-nav flex-grow-1">
				<div id="filters">

					<li class="nav-item dropdown">
						<a class="nav-link text-dark" data-toggle="dropdown">Members</a>
						<ul class="dropdown-menu">
							<li>
								<input type="checkbox" data-feature-name="nonlawyer/regular">
								<label>Professional</label>
								<!-- <a data-feature-name="nonlawyer/regular" class="nav-link text-dark">Professional</a> -->
							</li>
							<li>
								<input type="checkbox" data-feature-name="regular">
								<label>Regular</label>
							</li>
							<li>
								<input type="checkbox" data-feature-name="sustaining">
								<label>Sustaining</label>
							</li>
							<li>
								<input type="checkbox" data-feature-name="lifetime">
								<label>Lifetime</label>
							</li>
							<li>
								<input type="checkbox" data-feature-name="honored">
								<label>Honored</label>
							</li>
							<li>
								<input type="checkbox" data-feature-name="academic">
								<label>Law Students</label>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link text-dark" data-toggle="dropdown">Witnesses</a>
						<ul class="dropdown-menu">
							<li>
								<input type="checkbox" data-feature-name="expertWitness">
								<label>Expert Witness</label>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link text-dark" data-toggle="dropdown">Locations</a>
						<ul class="dropdown-menu">
							<li>
								<input type="checkbox" data-feature-name="circuitCourt">
								<label>Circuit Courts</label>
							</li>
						</ul>
					</li>
				</div>
			</ul>

		</div>
	</div>
</nav>


<div id="map">
</div>