<?php
/**
 * 
 * Template to render a map.
 */
?>
<style type="text/css">
	#stage-content {
		height: 800px;
	}

	#map {
		height: 100%;
	}
	
	#container-left {
		
	}

</style>
<nav id="toolbar" class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow">
	<div class="x-container">

		<div class="navbar-collapse d-sm-inline-flex flex-sm-row-reverse">
			<ul id="toolbarOptions" class="navbar-nav flex-grow-1">
					<li class="nav-item dropdown">
							<a class="nav-link text-dark" data-toggle="dropdown">Members</a>
							<ul class="dropdown-menu">
									<li>
										<a data-feature-name="lifetime" class="nav-link text-dark">Regular</a>
									</li>
									<li>
										<a data-feature-name="sustaining"  class="nav-link text-dark">Sustaining</a>
									</li>
									<li>
										<a data-feature-name="honored" class="nav-link text-dark">Honored</a>
									</li>
									<li>
										<a data-feature-name="lifetime" class="nav-link text-dark">Lifetime</a>
									</li>
							</ul>
					</li>
					<li class="nav-item dropdown">
							<a class="nav-link text-dark" data-toggle="dropdown">Locations</a>
							<ul class="dropdown-menu">
									<li><a data-feature-name="courts"  class="nav-link text-dark">Circuit Courts</a></li>
							</ul>
					</li>
			</ul>
			
		</div>
	</div>
</nav>


<div id="map">
</div>