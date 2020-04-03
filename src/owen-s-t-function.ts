// eslint-disable-next-line @typescript-eslint/no-var-requires
let erf = require("math-erf");

let { SQRT2, abs, atan, exp } = Math;

function znorm1(z: number): number {
	return 0.5 * erf(z / SQRT2);
}

function znorm2(z: number): number {
	return 0.5 * (1 - erf(z / SQRT2));
}

function tfun(h: number, a: number, ah: number): number {
	let arange = [0.025, 0.09, 0.15, 0.36, 0.5, 0.9, 0.99999];
	let c2 = [
		0.9999999999999998751,
		-0.99999999999988796462,
		0.99999999998290743652,
		-0.99999999896282500134,
		0.99999996660459362918,
		-0.9999993398627247676,
		0.99999125611136965852,
		-0.99991777624463387686,
		0.99942835555870132569,
		-0.99697311720723000295,
		0.98751448037275303682,
		-0.95915857980572882813,
		0.89246305511006708555,
		-0.76893425990463999675,
		0.5889352846848469325,
		-0.38380345160440256652,
		0.20317601701045299653,
		-0.82813631607004984866e-1,
		0.24167984735759576523e-1,
		-0.44676566663971825242e-2,
		0.39141169402373836468e-3
	];
	let iaint = 8;
	let ihint = 15;
	let hrange = [0.02, 0.06, 0.09, 0.125, 0.26, 0.4, 0.6, 1.6, 1.7, 2.33, 2.4, 3.36, 3.4, 4.8];
	let meth = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4, 4, 5, 6];
	let ord = [2, 3, 4, 5, 7, 10, 12, 18, 10, 20, 30, 20, 4, 7, 8, 20, 13, 0];
	let pts = [
		0.35082039676451715489e-2,
		0.3127904233803075374e-1,
		0.8526682628321945109e-1,
		0.16245071730812277011,
		0.25851196049125434828,
		0.36807553840697533536,
		0.48501092905604697475,
		0.60277514152618576821,
		0.71477884217753226516,
		0.81475510988760098605,
		0.89711029755948965867,
		0.95723808085944261843,
		0.99178832974629703586
	];
	let rrtpi = 0.39894228040143267794;
	let rtwopi = 0.15915494309189533577;
	/* eslint-disable no-multi-spaces */
	// prettier-ignore
	let select = [
		1, 1, 2, 13, 13, 13, 13, 13, 13, 13, 13, 16, 16, 16,  9,
		1, 2, 2,  3,  3,  5,  5, 14, 14, 15, 15, 16, 16, 16,  9,
		2, 2, 3,  3,  3,  5,  5, 15, 15, 15, 15, 16, 16, 16, 10,
		2, 2, 3,  5,  5,  5,  5,  7,  7, 16, 16, 16, 16, 16, 10,
		2, 3, 3,  5,  5,  6,  6,  8,  8, 17, 17, 17, 12, 12, 11,
		2, 3, 5,  5,  5,  6,  6,  8,  8, 17, 17, 17, 12, 12, 12,
		2, 3, 4,  4,  6,  6,  8,  8, 17, 17, 17, 17, 17, 12, 12,
		2, 3, 4,  4,  6,  6, 18, 18, 18, 18, 17, 17, 17, 12, 12 ];
	/* eslint-enable no-multi-spaces */
	let value = 0;
	let wts = [
		0.18831438115323502887e-1,
		0.18567086243977649478e-1,
		0.18042093461223385584e-1,
		0.17263829606398753364e-1,
		0.1624321997598985673e-1,
		0.14994592034116704829e-1,
		0.13535474469662088392e-1,
		0.11886351605820165233e-1,
		0.10070377242777431897e-1,
		0.81130545742299586629e-2,
		0.60419009528470238773e-2,
		0.38862217010742057883e-2,
		0.16793031084546090448e-2
	];
	let ai, aj, as, dhs, dj, gj, hs, i, ii, j, jj, maxii, normh, r, vi, y, yi, z, zi;

	//  Determine appropriate method from t1...t6
	for(i = 1; i <= 14; i++) {
		if(h <= hrange[i - 1]) {
			ihint = i;
			break;
		}
	}

	for(i = 1; i <= 7; i++) {
		if(a <= arange[i - 1]) {
			iaint = i;
			break;
		}
	}

	let icode = select[ihint - 1 + (iaint - 1) * 15];
	let m = ord[icode - 1];

	//  t1(h, a, m) ; m = 2, 3, 4, 5, 7, 10, 12 or 18
	//  jj = 2j - 1 ; gj = exp(-h*h/2) * (-h*h/2)**j / j//
	//  aj = a**(2j-1) / (2*pi)
	if(meth[icode - 1] === 1) {
		hs = -0.5 * h * h;
		dhs = exp(hs);
		as = a * a;
		j = 1;
		jj = 1;
		aj = rtwopi * a;
		value = rtwopi * atan(a);
		dj = dhs - 1.0;
		gj = hs * dhs;

		for(;;) {
			value = value + (dj * aj) / jj;

			if(m <= j) return value;

			j = j + 1;
			jj = jj + 2;
			aj = aj * as;
			dj = gj - dj;
			gj = (gj * hs) / j;
		}
	}

	//  t2(h, a, m) ; m = 10, 20 or 30
	//  z = (-1)**(i-1) * zi ; ii = 2i - 1
	//  vi = (-1)**(i-1) * a**(2i-1) * exp[-(a*h)**2/2] / sqrt(2*pi)
	if(meth[icode - 1] === 2) {
		maxii = m + m + 1;
		ii = 1;
		value = 0.0;
		hs = h * h;
		as = -a * a;
		vi = rrtpi * a * exp(-0.5 * ah * ah);
		z = znorm1(ah) / h;
		y = 1.0 / hs;

		for(;;) {
			value = value + z;

			if(maxii <= ii) {
				value = value * rrtpi * exp(-0.5 * hs);
				return value;
			}
			z = y * (vi - ii * z);
			vi = as * vi;
			ii = ii + 2;
		}
	}

	//  t3(h, a, m) ; m = 20
	//  ii = 2i - 1
	//  vi = a**(2i-1) * exp[-(a*h)**2/2] / sqrt(2*pi)
	if(meth[icode - 1] === 3) {
		i = 1;
		ii = 1;
		value = 0.0;
		hs = h * h;
		as = a * a;
		vi = rrtpi * a * exp(-0.5 * ah * ah);
		zi = znorm1(ah) / h;
		y = 1.0 / hs;

		for(;;) {
			value = value + zi * c2[i - 1];

			if(m < i) {
				value = value * rrtpi * exp(-0.5 * hs);
				return value;
			}
			zi = y * (ii * zi - vi);
			vi = as * vi;
			i = i + 1;
			ii = ii + 2;
		}
	}

	//  t4(h, a, m) ; m = 4, 7, 8 or 20;  ii = 2i + 1
	//  ai = a * exp[-h*h*(1+a*a)/2] * (-a*a)**i / (2*pi)
	if(meth[icode - 1] === 4) {
		maxii = m + m + 1;
		ii = 1;
		hs = h * h;
		as = -a * a;
		value = 0.0;
		ai = rtwopi * a * exp(-0.5 * hs * (1.0 - as));
		yi = 1.0;

		for(;;) {
			value = value + ai * yi;

			if(maxii <= ii) return value;

			ii = ii + 2;
			yi = (1.0 - hs * yi) / ii;
			ai = ai * as;
		}
	}

	//  t5(h, a, m) ; m = 13
	//  2m - point gaussian quadrature
	if(meth[icode - 1] === 5) {
		value = 0.0;
		as = a * a;
		hs = -0.5 * h * h;
		for(i = 1; i <= m; i++) {
			r = 1.0 + as * pts[i - 1];
			value = value + (wts[i - 1] * exp(hs * r)) / r;
		}
		return a * value;
	}

	//  t6(h, a);  approximation for a near 1, (a<=1)
	normh = znorm2(h);
	value = 0.5 * normh * (1.0 - normh);
	y = 1.0 - a;
	r = atan(y / (1.0 + a));

	if(r !== 0.0) value = value - rtwopi * r * exp((-0.5 * y * h * h) / r);

	return value;
}

export function T(h: number, a: number): number {
	let absa;
	let absh;
	let ah;
	let cut = 0.67;
	let normah;
	let normh;
	let value;

	absh = abs(h);
	absa = abs(a);
	ah = absa * absh;

	if(absa <= 1.0) value = tfun(absh, absa, ah);
	else if(absh <= cut) value = 0.25 - znorm1(absh) * znorm1(ah) - tfun(ah, 1.0 / absa, absh);
	else {
		normh = znorm2(absh);
		normah = znorm2(ah);
		value = 0.5 * (normh + normah) - normh * normah - tfun(ah, 1.0 / absa, absh);
	}

	if(a < 0.0) value = -value;

	return value;
}
