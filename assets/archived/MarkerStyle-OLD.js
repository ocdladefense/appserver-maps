const MarkerStyle = (function () {

	let DEFAULT_MARKER_PATH = 'M 0,0  C -0.7,-9 -3,-14 -5.5,-18.5 ' +
		'A 16,16 0 0,1 -11,-29 ' +
		'A 11,11 0 1,1 11,-29 ' +
		'A 16,16 0 0,1 5.5,-18.5 ' +
		'C 3,-14 0.7,-9 0,0 z ' +
		['', 'M -2,-28 ' +
			'a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0'];

	let DEFAULT_STROKE_WEIGHT = 2;

	let DEFAULT_FILL_COLOR = "#ffffff";

	let DEFAULT_STROKE_COLOR = "rgba(255,255,255,1.0)";

	function MarkerStyle(label, color, config) {
		config = arguments.length === 1 ? config : (!config ? { label: label, color: color } : config);
		this.path = config.path || DEFAULT_MARKER_PATH;
		this.color = config.color || DEFAULT_FILL_COLOR;
		this.opacity = config.opacity || 1;
		this.strokeWight = config.strokeWeight || DEFAULT_STROKE_WEIGHT;
		this.strokeColor = config.strokeColor || DEFAULT_STROKE_COLOR;
		this.scale = config.scale || 1;
	}

	function getVendorObject(vendor) {
		vendor = vendor || "google.maps.Marker";

		return {
			path: this.path,
			fillColor: this.color || "#ffffff",
			fillOpacity: 1,
			strokeColor: this.strokeColor,
			strokeWeight: this.strokeWeight,
			scale: this.scale
		};
	}


	MarkerStyle.prototype = {
		getVendorObject: getVendorObject
	};

	return MarkerStyle;
})();