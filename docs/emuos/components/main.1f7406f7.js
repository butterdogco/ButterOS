(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) {
		return;
	}
	for (const h of document.querySelectorAll('link[rel="modulepreload"]')) {
		l(h);
	}
	new MutationObserver(h => {
		for (const v of h) {
			if (v.type === "childList") {
				for (const g of v.addedNodes) {
					g.tagName === "LINK" && g.rel === "modulepreload" && l(g)
				}
			}
		}
	}).observe(document, {childList: !0, subtree: !0});

	function s(h) {
		const v = {};
		return h.integrity && (v.integrity = h.integrity), h.referrerpolicy && (v.referrerPolicy = h.referrerpolicy), h.crossorigin === "use-credentials" ? v.credentials = "include" : h.crossorigin === "anonymous" ? v.credentials = "omit" : v.credentials = "same-origin", v
	}

	function l(h) {
		if (h.ep) {
			return;
		}
		h.ep = !0;
		const v = s(h);
		fetch(h.href, v)
	}
})();

function Z() {
}

const _t = o => o;

function re(o, t) {
	for (const s in t) {
		o[s] = t[s];
	}
	return o
}

function fi(o) {
	return o()
}

function jo() {
	return Object.create(null)
}

function Ze(o) {
	o.forEach(fi)
}

function st(o) {
	return typeof o == "function"
}

function De(o, t) {
	return o != o ? t == t : o !== t || o && typeof o == "object" || typeof o == "function"
}

let ur;

function es(o, t) {
	return ur || (ur = document.createElement("a")), ur.href = t, o === ur.href
}

function vl(o) {
	return Object.keys(o).length === 0
}

function ts(o, ...t) {
	if (o == null) {
		return Z;
	}
	const s = o.subscribe(...t);
	return s.unsubscribe ? () => s.unsubscribe() : s
}

function ns(o, t, s) {
	o.$$.on_destroy.push(ts(t, s))
}

function xe(o) {
	const t = {};
	for (const s in o) {
		s[0] !== "$" && (t[s] = o[s]);
	}
	return t
}

function be(o, t) {
	const s = {};
	t = new Set(t);
	for (const l in o) {
		!t.has(l) && l[0] !== "$" && (s[l] = o[l]);
	}
	return s
}

function bl(o, t, s) {
	return o.set(s), t
}

const rs = typeof window < "u";
let kn = rs ? () => window.performance.now() : () => Date.now(), di = rs ? o => requestAnimationFrame(o) : Z;
const qt = new Set;

function is(o) {
	qt.forEach(t => {
		t.c(o) || (qt.delete(t), t.f())
	}), qt.size !== 0 && di(is)
}

function Pn(o) {
	let t;
	return qt.size === 0 && di(is), {
		promise: new Promise(s => {
			qt.add(t = {c: o, f: s})
		}), abort() {
			qt.delete(t)
		}
	}
}

let mr = !1;

function yl() {
	mr = !0
}

function _l() {
	mr = !1
}

function wl(o, t, s, l) {
	for (; o < t;) {
		const h = o + (t - o >> 1);
		s(h) <= l ? o = h + 1 : t = h
	}
	return o
}

function xl(o) {
	if (o.hydrate_init) {
		return;
	}
	o.hydrate_init = !0;
	let t = o.childNodes;
	if (o.nodeName === "HEAD") {
		const m = [];
		for (let y = 0; y < t.length; y++) {
			const T = t[y];
			T.claim_order !== void 0 && m.push(T)
		}
		t = m
	}
	const s = new Int32Array(t.length + 1), l = new Int32Array(t.length);
	s[0] = -1;
	let h = 0;
	for (let m = 0; m < t.length; m++) {
		const y = t[m].claim_order, T = (h > 0 && t[s[h]].claim_order <= y ? h + 1 : wl(1, h, x => t[s[x]].claim_order, y)) - 1;
		l[m] = s[T] + 1;
		const O = T + 1;
		s[O] = m, h = Math.max(O, h)
	}
	const v = [], g = [];
	let f = t.length - 1;
	for (let m = s[h] + 1; m != 0; m = l[m - 1]) {
		for (v.push(t[m - 1]); f >= m; f--) {
			g.push(t[f]);
		}
		f--
	}
	for (; f >= 0; f--) {
		g.push(t[f]);
	}
	v.reverse(), g.sort((m, y) => m.claim_order - y.claim_order);
	for (let m = 0, y = 0; m < g.length; m++) {
		for (; y < v.length && g[m].claim_order >= v[y].claim_order;) {
			y++;
		}
		const T = y < v.length ? v[y] : null;
		o.insertBefore(g[m], T)
	}
}

function El(o, t) {
	o.appendChild(t)
}

function os(o) {
	if (!o) {
		return document;
	}
	const t = o.getRootNode ? o.getRootNode() : o.ownerDocument;
	return t && t.host ? t : o.ownerDocument
}

function Ol(o) {
	const t = G("style");
	return Tl(os(o), t), t.sheet
}

function Tl(o, t) {
	El(o.head || o, t)
}

function H(o, t) {
	if (mr) {
		for (xl(o), (o.actual_end_child === void 0 || o.actual_end_child !== null && o.actual_end_child.parentElement !== o) && (o.actual_end_child = o.firstChild); o.actual_end_child !== null && o.actual_end_child.claim_order === void 0;) {
			o.actual_end_child = o.actual_end_child.nextSibling;
		}
		t !== o.actual_end_child ? (t.claim_order !== void 0 || t.parentNode !== o) && o.insertBefore(t, o.actual_end_child) : o.actual_end_child = t.nextSibling
	} else {
		(t.parentNode !== o || t.nextSibling !== null) && o.appendChild(t)
	}
}

function kl(o, t, s) {
	o.insertBefore(t, s || null)
}

function ie(o, t, s) {
	mr && !s ? H(o, t) : (t.parentNode !== o || t.nextSibling != s) && o.insertBefore(t, s || null)
}

function B(o) {
	o.parentNode.removeChild(o)
}

function G(o) {
	return document.createElement(o)
}

function Pl(o) {
	return document.createElementNS("http://www.w3.org/2000/svg", o)
}

function Ge(o) {
	return document.createTextNode(o)
}

function Te() {
	return Ge(" ")
}

function Le() {
	return Ge("")
}

function We(o, t, s, l) {
	return o.addEventListener(t, s, l), () => o.removeEventListener(t, s, l)
}

function Ml(o) {
	return function (t) {
		return t.preventDefault(), o.call(this, t)
	}
}

function U(o, t, s) {
	s == null ? o.removeAttribute(t) : o.getAttribute(t) !== s && o.setAttribute(t, s)
}

function ye(o, t) {
	const s = Object.getOwnPropertyDescriptors(o.__proto__);
	for (const l in t) {
		t[l] == null ? o.removeAttribute(l) : l === "style" ? o.style.cssText = t[l] : l === "__value" ? o.value = o[l] = t[l] : s[l] && s[l].set ? o[l] = t[l] : U(o, l, t[l])
	}
}

function Co(o, t, s) {
	t in o ? o[t] = typeof o[t] == "boolean" && s === "" ? !0 : s : U(o, t, s)
}

function $(o) {
	return Array.from(o.childNodes)
}

function ss(o) {
	o.claim_info === void 0 && (o.claim_info = {last_index: 0, total_claimed: 0})
}

function as(o, t, s, l, h = !1) {
	ss(o);
	const v = (() => {
		for (let g = o.claim_info.last_index; g < o.length; g++) {
			const f = o[g];
			if (t(f)) {
				const m = s(f);
				return m === void 0 ? o.splice(g, 1) : o[g] = m, h || (o.claim_info.last_index = g), f
			}
		}
		for (let g = o.claim_info.last_index - 1; g >= 0; g--) {
			const f = o[g];
			if (t(f)) {
				const m = s(f);
				return m === void 0 ? o.splice(g, 1) : o[g] = m, h ? m === void 0 && o.claim_info.last_index-- : o.claim_info.last_index = g, f
			}
		}
		return l()
	})();
	return v.claim_order = o.claim_info.total_claimed, o.claim_info.total_claimed += 1, v
}

function Sl(o, t, s, l) {
	return as(o, h => h.nodeName === t, h => {
		const v = [];
		for (let g = 0; g < h.attributes.length; g++) {
			const f = h.attributes[g];
			s[f.name] || v.push(f.name)
		}
		v.forEach(g => h.removeAttribute(g))
	}, () => l(t))
}

function q(o, t, s) {
	return Sl(o, t, s, G)
}

function et(o, t) {
	return as(o, s => s.nodeType === 3, s => {
		const l = "" + t;
		if (s.data.startsWith(l)) {
			if (s.data.length !== l.length) {
				return s.splitText(l.length)
			}
		} else {
			s.data = l
		}
	}, () => Ge(t), !0)
}

function ke(o) {
	return et(o, " ")
}

function Do(o, t, s) {
	for (let l = s; l < o.length; l += 1) {
		const h = o[l];
		if (h.nodeType === 8 && h.textContent.trim() === t) {
			return l
		}
	}
	return o.length
}

function jl(o, t) {
	const s = Do(o, "HTML_TAG_START", 0), l = Do(o, "HTML_TAG_END", s);
	if (s === l) {
		return new si(void 0, t);
	}
	ss(o);
	const h = o.splice(s, l - s + 1);
	B(h[0]), B(h[h.length - 1]);
	const v = h.slice(1, h.length - 1);
	for (const g of v) {
		g.claim_order = o.claim_info.total_claimed, o.claim_info.total_claimed += 1;
	}
	return new si(v, t)
}

function Mn(o, t) {
	t = "" + t, o.wholeText !== t && (o.data = t)
}

function it(o, t, s, l) {
	s === null ? o.style.removeProperty(t) : o.style.setProperty(t, s, l ? "important" : "")
}

function ae(o, t, s) {
	o.classList[s ? "add" : "remove"](t)
}

function ls(o, t, {bubbles: s = !1, cancelable: l = !1} = {}) {
	const h = document.createEvent("CustomEvent");
	return h.initCustomEvent(o, s, l, t), h
}

class Cl {
	constructor(t = !1) {
		this.is_svg = !1, this.is_svg = t, this.e = this.n = null
	}

	c(t) {
		this.h(t)
	}

	m(t, s, l = null) {
		this.e || (this.is_svg ? this.e = Pl(s.nodeName) : this.e = G(s.nodeName), this.t = s, this.c(t)), this.i(l)
	}

	h(t) {
		this.e.innerHTML = t, this.n = Array.from(this.e.childNodes)
	}

	i(t) {
		for (let s = 0; s < this.n.length; s += 1) {
			kl(this.t, this.n[s], t)
		}
	}

	p(t) {
		this.d(), this.h(t), this.i(this.a)
	}

	d() {
		this.n.forEach(B)
	}
}

class si extends Cl {
	constructor(t, s = !1) {
		super(s), this.e = this.n = null, this.l = t
	}

	c(t) {
		this.l ? this.n = this.l : super.c(t)
	}

	i(t) {
		for (let s = 0; s < this.n.length; s += 1) {
			ie(this.t, this.n[s], t)
		}
	}
}

function Ae(o) {
	const t = {};
	for (const s of o) {
		t[s.name] = s.value;
	}
	return t
}

const pr = new Map;
let gr = 0;

function Dl(o) {
	let t = 5381, s = o.length;
	for (; s--;) {
		t = (t << 5) - t ^ o.charCodeAt(s);
	}
	return t >>> 0
}

function Il(o, t) {
	const s = {stylesheet: Ol(t), rules: {}};
	return pr.set(o, s), s
}

function xn(o, t, s, l, h, v, g, f = 0) {
	const m = 16.666 / l;
	let y = `{
`;
	for (let R = 0; R <= 1; R += m) {
		const j = t + (s - t) * v(R);
		y += R * 100 + `%{${g(j, 1 - j)}}
`
	}
	const T = y + `100% {${g(s, 1 - s)}}
}`, O = `__svelte_${Dl(T)}_${f}`, x = os(o), {stylesheet: k, rules: C} = pr.get(x) || Il(x, o);
	C[O] || (C[O] = !0, k.insertRule(`@keyframes ${O} ${T}`, k.cssRules.length));
	const D = o.style.animation || "";
	return o.style.animation = `${D ? `${D}, ` : ""}${O} ${l}ms linear ${h}ms 1 both`, gr += 1, O
}

function En(o, t) {
	const s = (o.style.animation || "").split(", "), l = s.filter(t ? v => v.indexOf(t) < 0 : v => v.indexOf("__svelte") === -1), h = s.length - l.length;
	h && (o.style.animation = l.join(", "), gr -= h, gr || Al())
}

function Al() {
	di(() => {
		gr || (pr.forEach(o => {
			const {stylesheet: t} = o;
			let s = t.cssRules.length;
			for (; s--;) {
				t.deleteRule(s);
			}
			o.rules = {}
		}), pr.clear())
	})
}

function Rl(o, t, s, l) {
	if (!t) {
		return Z;
	}
	const h = o.getBoundingClientRect();
	if (t.left === h.left && t.right === h.right && t.top === h.top && t.bottom === h.bottom) {
		return Z;
	}
	const {delay: v = 0, duration: g = 300, easing: f = _t, start: m = kn() + v, end: y = m + g, tick: T = Z, css: O} = s(o, {from: t, to: h}, l);
	let x = !0, k = !1, C;

	function D() {
		O && (C = xn(o, 0, 1, g, v, f, O)), v || (k = !0)
	}

	function R() {
		O && En(o, C), x = !1
	}

	return Pn(j => {
		if (!k && j >= m && (k = !0), k && j >= y && (T(1, 0), R()), !x) {
			return !1;
		}
		if (k) {
			const V = j - m, Q = 0 + 1 * f(V / g);
			T(Q, 1 - Q)
		}
		return !0
	}), D(), T(0, 1), R
}

function zl(o) {
	const t = getComputedStyle(o);
	if (t.position !== "absolute" && t.position !== "fixed") {
		const {width: s, height: l} = t, h = o.getBoundingClientRect();
		o.style.position = "absolute", o.style.width = s, o.style.height = l, us(o, h)
	}
}

function us(o, t) {
	const s = o.getBoundingClientRect();
	if (t.left !== s.left || t.top !== s.top) {
		const l = getComputedStyle(o), h = l.transform === "none" ? "" : l.transform;
		o.style.transform = `${h} translate(${t.left - s.left}px, ${t.top - s.top}px)`
	}
}

let On;

function _n(o) {
	On = o
}

function Sn() {
	if (!On) {
		throw new Error("Function called outside component initialization");
	}
	return On
}

function Bl(o) {
	Sn().$$.before_update.push(o)
}

function vr(o) {
	Sn().$$.on_mount.push(o)
}

function Ll(o) {
	Sn().$$.after_update.push(o)
}

function hi(o) {
	Sn().$$.on_destroy.push(o)
}

function Wl() {
	const o = Sn();
	return (t, s, {cancelable: l = !1} = {}) => {
		const h = o.$$.callbacks[t];
		if (h) {
			const v = ls(t, s, {cancelable: l});
			return h.slice().forEach(g => {
				g.call(o, v)
			}), !v.defaultPrevented
		}
		return !0
	}
}

const yn = [], Zt = [], fr = [], Io = [], Nl = Promise.resolve();
let ai = !1;

function Vl() {
	ai || (ai = !0, Nl.then(N))
}

function wt(o) {
	fr.push(o)
}

const ni = new Set;
let cr = 0;

function N() {
	const o = On;
	do {
		for (; cr < yn.length;) {
			const t = yn[cr];
			cr++, _n(t), Fl(t.$$)
		}
		for (_n(null), yn.length = 0, cr = 0; Zt.length;) {
			Zt.pop()();
		}
		for (let t = 0; t < fr.length; t += 1) {
			const s = fr[t];
			ni.has(s) || (ni.add(s), s())
		}
		fr.length = 0
	} while (yn.length);
	for (; Io.length;) {
		Io.pop()();
	}
	ai = !1, ni.clear(), _n(o)
}

function Fl(o) {
	if (o.fragment !== null) {
		o.update(), Ze(o.before_update);
		const t = o.dirty;
		o.dirty = [-1], o.fragment && o.fragment.p(o.ctx, t), o.after_update.forEach(wt)
	}
}

let bn;

function pi() {
	return bn || (bn = Promise.resolve(), bn.then(() => {
		bn = null
	})), bn
}

function It(o, t, s) {
	o.dispatchEvent(ls(`${t ? "intro" : "outro"}${s}`))
}

const dr = new Set;
let ot;

function Qe() {
	ot = {r: 0, c: [], p: ot}
}

function $e() {
	ot.r || Ze(ot.c), ot = ot.p
}

function ne(o, t) {
	o && o.i && (dr.delete(o), o.i(t))
}

function de(o, t, s, l) {
	if (o && o.o) {
		if (dr.has(o)) {
			return;
		}
		dr.add(o), ot.c.push(() => {
			dr.delete(o), l && (s && o.d(1), l())
		}), o.o(t)
	} else {
		l && l()
	}
}

const gi = {duration: 0};

function Hl(o, t, s) {
	let l = t(o, s), h = !1, v, g, f = 0;

	function m() {
		v && En(o, v)
	}

	function y() {
		const {delay: O = 0, duration: x = 300, easing: k = _t, tick: C = Z, css: D} = l || gi;
		D && (v = xn(o, 0, 1, x, O, k, D, f++)), C(0, 1);
		const R = kn() + O, j = R + x;
		g && g.abort(), h = !0, wt(() => It(o, !0, "start")), g = Pn(V => {
			if (h) {
				if (V >= j) {
					return C(1, 0), It(o, !0, "end"), m(), h = !1;
				}
				if (V >= R) {
					const Q = k((V - R) / x);
					C(Q, 1 - Q)
				}
			}
			return h
		})
	}

	let T = !1;
	return {
		start() {
			T || (T = !0, En(o), st(l) ? (l = l(), pi().then(y)) : y())
		}, invalidate() {
			T = !1
		}, end() {
			h && (m(), h = !1)
		}
	}
}

function Ul(o, t, s) {
	let l = t(o, s), h = !0, v;
	const g = ot;
	g.r += 1;

	function f() {
		const {delay: m = 0, duration: y = 300, easing: T = _t, tick: O = Z, css: x} = l || gi;
		x && (v = xn(o, 1, 0, y, m, T, x));
		const k = kn() + m, C = k + y;
		wt(() => It(o, !1, "start")), Pn(D => {
			if (h) {
				if (D >= C) {
					return O(0, 1), It(o, !1, "end"), --g.r || Ze(g.c), !1;
				}
				if (D >= k) {
					const R = T((D - k) / y);
					O(1 - R, R)
				}
			}
			return h
		})
	}

	return st(l) ? pi().then(() => {
		l = l(), f()
	}) : f(), {
		end(m) {
			m && l.tick && l.tick(1, 0), h && (v && En(o, v), h = !1)
		}
	}
}

function Ao(o, t, s, l) {
	let h = t(o, s), v = l ? 0 : 1, g = null, f = null, m = null;

	function y() {
		m && En(o, m)
	}

	function T(x, k) {
		const C = x.b - v;
		return k *= Math.abs(C), {a: v, b: x.b, d: C, duration: k, start: x.start, end: x.start + k, group: x.group}
	}

	function O(x) {
		const {delay: k = 0, duration: C = 300, easing: D = _t, tick: R = Z, css: j} = h || gi, V = {start: kn() + k, b: x};
		x || (V.group = ot, ot.r += 1), g || f ? f = V : (j && (y(), m = xn(o, v, x, C, k, D, j)), x && R(0, 1), g = T(V, C), wt(() => It(o, x, "start")), Pn(Q => {
			if (f && Q > f.start && (g = T(f, C), f = null, It(o, g.b, "start"), j && (y(), m = xn(o, v, g.b, g.duration, 0, D, h.css))), g) {
				if (Q >= g.end) {
					R(v = g.b, 1 - v), It(o, g.b, "end"), f || (g.b ? y() : --g.group.r || Ze(g.group.c)), g = null;
				} else if (Q >= g.start) {
					const L = Q - g.start;
					v = g.a + g.d * D(L / g.duration), R(v, 1 - v)
				}
			}
			return !!(g || f)
		}))
	}

	return {
		run(x) {
			st(h) ? pi().then(() => {
				h = h(), O(x)
			}) : O(x)
		}, end() {
			y(), g = f = null
		}
	}
}

const cs = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;

function Gl(o, t) {
	de(o, 1, 1, () => {
		t.delete(o.key)
	})
}

function Xl(o, t) {
	o.f(), Gl(o, t)
}

function Yl(o, t, s, l, h, v, g, f, m, y, T, O) {
	let x = o.length, k = v.length, C = x;
	const D = {};
	for (; C--;) {
		D[o[C].key] = C;
	}
	const R = [], j = new Map, V = new Map;
	for (C = k; C--;) {
		const J = O(h, v, C), S = s(J);
		let z = g.get(S);
		z ? l && z.p(J, t) : (z = y(S, J), z.c()), j.set(S, R[C] = z), S in D && V.set(S, Math.abs(C - D[S]))
	}
	const Q = new Set, L = new Set;

	function F(J) {
		ne(J, 1), J.m(f, T), g.set(J.key, J), T = J.first, k--
	}

	for (; x && k;) {
		const J = R[k - 1], S = o[x - 1], z = J.key, le = S.key;
		J === S ? (T = J.first, x--, k--) : j.has(le) ? !g.has(z) || Q.has(z) ? F(J) : L.has(le) ? x-- : V.get(z) > V.get(le) ? (L.add(z), F(J)) : (Q.add(le), x--) : (m(S, g), x--)
	}
	for (; x--;) {
		const J = o[x];
		j.has(J.key) || m(J, g)
	}
	for (; k;) {
		F(R[k - 1]);
	}
	return R
}

function Ne(o, t) {
	const s = {}, l = {}, h = {$$scope: 1};
	let v = o.length;
	for (; v--;) {
		const g = o[v], f = t[v];
		if (f) {
			for (const m in g) {
				m in f || (l[m] = 1);
			}
			for (const m in f) {
				h[m] || (s[m] = f[m], h[m] = 1);
			}
			o[v] = f
		} else {
			for (const m in g) {
				h[m] = 1
			}
		}
	}
	for (const g in l) {
		g in s || (s[g] = void 0);
	}
	return s
}

function ql(o) {
	return typeof o == "object" && o !== null ? o : {}
}

function Ke(o) {
	o && o.c()
}

function tt(o, t) {
	o && o.l(t)
}

function He(o, t, s, l) {
	const {fragment: h, on_mount: v, on_destroy: g, after_update: f} = o.$$;
	h && h.m(t, s), l || wt(() => {
		const m = v.map(fi).filter(st);
		g ? g.push(...m) : Ze(m), o.$$.on_mount = []
	}), f.forEach(wt)
}

function Ue(o, t) {
	const s = o.$$;
	s.fragment !== null && (Ze(s.on_destroy), s.fragment && s.fragment.d(t), s.on_destroy = s.fragment = null, s.ctx = [])
}

function Kl(o, t) {
	o.$$.dirty[0] === -1 && (yn.push(o), Vl(), o.$$.dirty.fill(0)), o.$$.dirty[t / 31 | 0] |= 1 << t % 31
}

function Re(o, t, s, l, h, v, g, f = [-1]) {
	const m = On;
	_n(o);
	const y = o.$$ = {fragment: null, ctx: null, props: v, update: Z, not_equal: h, bound: jo(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(t.context || (m ? m.$$.context : [])), callbacks: jo(), dirty: f, skip_bound: !1, root: t.target || m.$$.root};
	g && g(y.root);
	let T = !1;
	if (y.ctx = s ? s(o, t.props || {}, (O, x, ...k) => {
		const C = k.length ? k[0] : x;
		return y.ctx && h(y.ctx[O], y.ctx[O] = C) && (!y.skip_bound && y.bound[O] && y.bound[O](C), T && Kl(o, O)), x
	}) : [], y.update(), T = !0, Ze(y.before_update), y.fragment = l ? l(y.ctx) : !1, t.target) {
		if (t.hydrate) {
			yl();
			const O = $(t.target);
			y.fragment && y.fragment.l(O), O.forEach(B)
		} else {
			y.fragment && y.fragment.c();
		}
		t.intro && ne(o.$$.fragment), He(o, t.target, t.anchor, t.customElement), _l(), N()
	}
	_n(m)
}

let Ie;
typeof HTMLElement == "function" && (Ie = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({mode: "open"})
	}

	connectedCallback() {
		const {on_mount: o} = this.$$;
		this.$$.on_disconnect = o.map(fi).filter(st);
		for (const t in this.$$.slotted) {
			this.appendChild(this.$$.slotted[t])
		}
	}

	attributeChangedCallback(o, t, s) {
		this[o] = s
	}

	disconnectedCallback() {
		Ze(this.$$.on_disconnect)
	}

	$destroy() {
		Ue(this, 1), this.$destroy = Z
	}

	$on(o, t) {
		const s = this.$$.callbacks[o] || (this.$$.callbacks[o] = []);
		return s.push(t), () => {
			const l = s.indexOf(t);
			l !== -1 && s.splice(l, 1)
		}
	}

	$set(o) {
		this.$$set && !vl(o) && (this.$$.skip_bound = !0, this.$$set(o), this.$$.skip_bound = !1)
	}
});
const Zl = () => typeof globalThis == "object" && globalThis ? globalThis : typeof window == "object" && window ? window : typeof global == "object" && global ? global : typeof self == "object" && self ? self : function () {
	return this
}() || Function("return this")(), fs = o => document.querySelector ? document.querySelector(o) : o.charAt(0) === "." && document.getElementsByClassName ? document.getElementsByClassName(o.substr(1))[0] : o.charAt(0) !== "." && o.charAt(0) !== "#" && document.getElementsByTagName ? document.getElementsByTagName(o)[0] : o.charAt(0) === "#" && document.getElementById ? document.getElementById(o.substr(1)) : null, mi = o => document.querySelectorAll ? document.querySelectorAll(o) : o.charAt(0) === "." && document.getElementsByClassName ? document.getElementsByClassName(o.substr(1)) : o.charAt(0) !== "." && o.charAt(0) !== "#" && document.getElementsByTagName ? document.getElementsByTagName(o) : o.charAt(0) === "#" && document.getElementById ? document.getElementById(o.substr(1)) : null, ds = (o, t) => {
	if (o.classList) {
		if (o.classList.contains(t)) {
			return !0
		}
	} else if (o.className.match(new RegExp(`(?:^|\\s)${t}(?!\\S)`))) {
		return !0;
	}
	return !1
}, yt = (o, t) => {
	o.classList ? o.classList.add(t) : o.className.match(new RegExp(`(?:^|\\s)${t}(?!\\S)`)) || (o.className += ` ${t}`)
}, Kt = (o, t) => {
	o.classList ? o.classList.remove(t) : o.className = o.className.replace(new RegExp(`(?:^|\\s)${t}(?!\\S)`, "g"), "")
}, Ro = (o, t) => {
	const s = o.getBoundingClientRect(), l = t.getBoundingClientRect();
	return s.x < l.x + l.width && s.x + s.width > l.x && s.y < l.y + l.height && s.y + s.height > l.y
}, Jl = o => {
	const t = o.getBoundingClientRect();
	return {left: t.left + window.scrollX, top: t.top + window.scrollY}
}, Pe = o => (o = (o == null ? void 0 : o.toString()) || 0, typeof o == "string" && o !== "" && o !== "max-content" && o !== "min-content" && o !== "auto" && o !== "inherit" && o !== "initial" && o !== "revert" && o !== "revert-layer" && o !== "unset" && !o.startsWith("fit-content") && !o.endsWith("cm") && !o.endsWith("mm") && !o.endsWith("Q") && !o.endsWith("in") && !o.endsWith("pc") && !o.endsWith("pt") && !o.endsWith("px") && !o.endsWith("em") && !o.endsWith("ex") && !o.endsWith("ch") && !o.endsWith("rem") && !o.endsWith("lh") && !o.endsWith("rlh") && !o.endsWith("vw") && !o.endsWith("vh") && !o.endsWith("vmin") && !o.endsWith("vmax") && !o.endsWith("vb") && !o.endsWith("vi") && !o.endsWith("svw") && !o.endsWith("svh") && !o.endsWith("lvw") && !o.endsWith("lvh") && !o.endsWith("dvw") && !o.endsWith("dvh") && (o += "px"), o), qe = (o, t) => {
	var s;
	return parseFloat((s = getComputedStyle(o)) == null ? void 0 : s.getPropertyValue(`--${t}`))
}, Jt = (o, t, s) => {
	var l;
	return (l = o == null ? void 0 : o.style) == null || l.setProperty(`--${t}`, Pe(s)), o
}, Tn = (o, t, s) => (Jt(o, "x", t), Jt(o, "y", s), o), Ql = (o, t, s) => (Jt(o, "width", t), Jt(o, "height", s), o), Fe = {MODE: "production", DEV: !1, PROD: !0, BASE_URL: "/", GLOBAL_DEBUG: ("true" == null ? void 0 : "true".toLowerCase()) === "true", USE_WEBCOMPONENTS: ("true" == null ? void 0 : "true".toLowerCase()) === "true"};
Fe != null && Fe.GLOBAL_DEBUG && console.log(Fe);
const $l = 5e3, eu = 3, tu = 100, nu = o => new Promise(t => setTimeout(() => t(), o)), ru = async (o, t = {}, s) => {
	let l = null, h;
	if (typeof AbortController == "function") {
		const {timeout: v = $l} = t, g = new AbortController;
		l = setTimeout(() => g.abort(), v), typeof s == "function" ? h = await s(o, {...t, signal: g.signal}) : h = await fetch(o, {...t, signal: g.signal})
	} else {
		typeof s == "function" ? h = await s(o, t) : h = await fetch(o, t);
	}
	return l !== null && clearTimeout(l), h
}, hs = async (o, t = {}, s, l = eu) => {
	try {
		return await ru(o, t, s)
	} catch (h) {
		if (console.error(h), l === 1) {
			throw h;
		}
		return await nu(tu), hs(o, t, s, l - 1)
	}
}, iu = (o, t) => hs(Fe != null && Fe.DEV ? "https://emuos.emupedia.net/emuos/version.json" : "/emuos/version.json", t, o), ou = 1 * 60 * 1e3;
let ri = 0, ii = 0, zo;
const Bo = o => {
	ri = (o == null ? void 0 : o.version) || 0, clearInterval(zo), typeof (o == null ? void 0 : o.clear) > "u" && (zo = setInterval(async () => {
		let t = await iu().catch(l => console.error(l)), s = await (t == null ? void 0 : t.json().catch(l => console.error(l)));
		typeof (s == null ? void 0 : s.version) < "u" && (s == null ? void 0 : s.version) !== null && (s == null ? void 0 : s.version) !== "" && (ii = (s == null ? void 0 : s.version) || 0, ii !== ri && typeof (o == null ? void 0 : o.callback) == "function" && (o == null || o.callback({currentVersion: ri, checkedVersion: ii})))
	}, (o == null ? void 0 : o.interval) || ou))
}, {window: oi} = cs;

function su(o) {
	let t, s, l, h, v, g = [{class: l = "desktop " + (o[6].class || "")}, {build: o[2]}, o[7]], f = {};
	for (let m = 0; m < g.length; m += 1) {
		f = re(f, g[m]);
	}
	return {
		c() {
			t = G("main"), s = G("slot"), this.c = Z, this.h()
		}, l(m) {
			t = q(m, "MAIN", {class: !0, build: !0});
			var y = $(t);
			s = q(y, "SLOT", {}), $(s).forEach(B), y.forEach(B), this.h()
		}, h() {
			ye(t, f), ae(t, "debug", o[0])
		}, m(m, y) {
			ie(m, t, y), H(t, s), o[9](t), h || (v = [We(oi, "mouseup", o[5]), We(oi, "mousedown", o[3]), We(oi, "mousemove", o[4])], h = !0)
		}, p(m, [y]) {
			ye(t, f = Ne(g, [y & 64 && l !== (l = "desktop " + (m[6].class || "")) && {class: l}, y & 4 && {build: m[2]}, y & 128 && m[7]])), ae(t, "debug", m[0])
		}, i: Z, o: Z, d(m) {
			m && B(t), o[9](null), h = !1, Ze(v)
		}
	}
}

function au(o, t, s) {
	const l = ["version", "debug"];
	let h = be(t, l), {version: v = 0} = t, {debug: g = !1} = t;
	const f = Wl(), m = {x: 0, y: 0, startX: 0, startY: 0};
	let y, T, O;
	vr(() => {
		Bo({
			version: v, callback: ({currentVersion: j, checkedVersion: V}) => {
				j !== V && f("updated")
			}
		})
	}), hi(() => Bo({clear: !0}));

	function x(j) {
		if (ds(j.target, "icons")) {
			const V = [...y.querySelectorAll(".selection")];
			if (V) {
				for (const Q of V) {
					y.removeChild(Q);
				}
			}
			D(j), m.startX = m.x, m.startY = m.y, T = document.createElement("div"), T.className = "selection", T.style.left = m.x + "px", T.style.top = m.y + "px", y.appendChild(T)
		}
	}

	function k(j) {
		D(j), T && (T.style.width = Math.abs(m.x - m.startX) + "px", T.style.height = Math.abs(m.y - m.startY) + "px", T.style.left = m.x - m.startX < 0 ? m.x + "px" : m.startX + "px", T.style.top = m.y - m.startY < 0 ? m.y + "px" : m.startY + "px")
	}

	function C() {
		T = null;
		const j = y.querySelector(".selection"), V = [...y.querySelectorAll(".icon:not(.ghost)")];
		if (j) {
			const Q = [];
			for (const L of V) {
				Ro(j, L) ? Q.push(L) : Kt(L, "selected");
			}
			if (Q.length > 0) {
				for (const L of Q) {
					yt(L, "selected");
				}
			}
			y.removeChild(y.querySelector(".selection"))
		}
	}

	function D(j) {
		j = j || window.event, j.pageX ? (m.x = j.pageX + window.pageXOffset + y.scrollLeft, m.y = j.pageY + window.pageYOffset + y.scrollTop) : j.clientX && (m.x = j.clientX + document.body.scrollLeft + y.scrollLeft, m.y = j.clientY + document.body.scrollTop + y.scrollTop);
		const V = y.querySelector(".selection"), Q = [...y.querySelectorAll(".icon:not(.ghost)")];
		if (V) {
			const L = [];
			for (const F of Q) {
				Ro(V, F) ? L.push(F) : Kt(F, "selected");
			}
			if (L.length > 0) {
				for (const F of L) {
					yt(F, "selected")
				}
			}
		}
	}

	function R(j) {
		Zt[j ? "unshift" : "push"](() => {
			y = j, s(1, y)
		})
	}

	return o.$$set = j => {
		s(6, t = re(re({}, t), xe(j))), s(7, h = be(t, l)), "version" in j && s(8, v = j.version), "debug" in j && s(0, g = j.debug)
	}, o.$$.update = () => {
		o.$$.dirty & 256 && s(2, O = `EmuOS v2.0 Alpha\r
Build ${v}\r
${new Date(parseInt(v)).toLocaleString()}`)
	}, t = xe(t), [g, y, O, x, k, C, t, h, v, R]
}

class lu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.desktop{background-color:var(--color-background-desktop);height:100%;left:0;position:absolute;top:0;width:100%}.desktop.debug{outline:1px solid var(--color-debug);outline-offset:-1px}.desktop :global(.selection){outline:1px dotted #ffff7f;outline-offset:-1px;pointer-events:none;position:absolute;z-index:1}@supports (mix-blend-mode:difference){.desktop :global(.selection){mix-blend-mode:difference;outline-color:#fff}}.desktop:after{bottom:28px;color:#fff;content:attr(build);pointer-events:none;position:absolute;right:0;text-align:right;white-space:pre}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, au, su, De, {version: 8, debug: 0}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["version", "debug"]
	}

	get version() {
		return this.$$.ctx[8]
	}

	set version(t) {
		this.$$set({version: t}), N()
	}

	get debug() {
		return this.$$.ctx[0]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-desktop", lu);

function uu(o) {
	let t, s, l, h, v;
	return {
		c() {
			t = G("aside"), s = G("nav"), l = G("slot"), h = Ge("TaskBar"), this.c = Z, this.h()
		}, l(g) {
			t = q(g, "ASIDE", {class: !0});
			var f = $(t);
			s = q(f, "NAV", {});
			var m = $(s);
			l = q(m, "SLOT", {});
			var y = $(l);
			h = et(y, "TaskBar"), y.forEach(B), m.forEach(B), f.forEach(B), this.h()
		}, h() {
			U(t, "class", v = "taskbar " + o[0]), ae(t, "debug", o[1])
		}, m(g, f) {
			ie(g, t, f), H(t, s), H(s, l), H(l, h)
		}, p(g, [f]) {
			f & 1 && v !== (v = "taskbar " + g[0]) && U(t, "class", v), f & 3 && ae(t, "debug", g[1])
		}, i: Z, o: Z, d(g) {
			g && B(t)
		}
	}
}

function cu(o, t, s) {
	let {type: l = "bottom"} = t, {debug: h = !1} = t;
	return o.$$set = v => {
		"type" in v && s(0, l = v.type), "debug" in v && s(1, h = v.debug)
	}, [l, h]
}

class fu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>aside.taskbar{background-color:var(--color-background-taskbar);color:#fff;overflow:hidden;position:absolute;z-index:3}aside.taskbar.top{border-bottom-style:solid;border-bottom:1px ridge var(--color-white);height:27px;left:0;right:0;top:0}aside.taskbar.bottom{border-top-style:solid;border-top:1px ridge var(--color-white);bottom:0;height:28px;left:0;right:0}aside.taskbar.left{border-right-style:solid;border-right:1px ridge var(--color-white);bottom:0;left:0;top:0;width:100px}aside.taskbar.right{border-left-style:solid;border-left:1px ridge var(--color-white);bottom:0;right:0;top:0;width:100px}aside.taskbar.debug{outline:1px solid var(--color-debug);outline-offset:-1px}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, cu, uu, De, {type: 0, debug: 1}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["type", "debug"]
	}

	get type() {
		return this.$$.ctx[0]
	}

	set type(t) {
		this.$$set({type: t}), N()
	}

	get debug() {
		return this.$$.ctx[1]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-taskbar", fu);

function ps(o) {
	const t = o - 1;
	return t * t * t + 1
}

function li(o, {delay: t = 0, duration: s = 400, easing: l = _t} = {}) {
	const h = +getComputedStyle(o).opacity;
	return {delay: t, duration: s, easing: l, css: v => `opacity: ${v * h}`}
}

function du(o, {delay: t = 0, duration: s = 400, easing: l = ps, x: h = 0, y: v = 0, opacity: g = 0} = {}) {
	const f = getComputedStyle(o), m = +f.opacity, y = f.transform === "none" ? "" : f.transform, T = m * (1 - g);
	return {
		delay: t, duration: s, easing: l, css: (O, x) => `
			transform: ${y} translate(${(1 - O) * h}px, ${(1 - O) * v}px);
			opacity: ${m - T * x}`
	}
}

const {window: Lo} = cs;

function hu(o) {
	let t, s, l, h, v, g, f, m, y, T, O = [{class: v = "menu " + (o[14].class || "")}, {style: g = "--x: " + o[0] + "; --y: " + o[1] + "; --width: " + o[4] + "; --height: " + o[5] + "; --min-width: " + o[2] + "; --min-height: " + o[3] + ";"}, o[15]], x = {};
	for (let k = 0; k < O.length; k += 1) {
		x = re(x, O[k]);
	}
	return {
		c() {
			t = G("nav"), s = G("menu"), l = G("slot"), h = Ge(o[6]), this.c = Z, this.h()
		}, l(k) {
			t = q(k, "NAV", {class: !0, style: !0});
			var C = $(t);
			s = q(C, "MENU", {});
			var D = $(s);
			l = q(D, "SLOT", {});
			var R = $(l);
			h = et(R, o[6]), R.forEach(B), D.forEach(B), C.forEach(B), this.h()
		}, h() {
			ye(t, x), ae(t, "show", o[11]), ae(t, "transform", o[7]), ae(t, "transform-3d", o[8]), ae(t, "debug", o[9])
		}, m(k, C) {
			ie(k, t, C), H(t, s), H(s, l), H(l, h), o[16](t), m = !0, y || (T = [We(Lo, "contextmenu", Ml(o[12])), We(Lo, "mousedown", o[13])], y = !0)
		}, p(k, [C]) {
			(!m || C & 64) && Mn(h, k[6]), ye(t, x = Ne(O, [(!m || C & 16384 && v !== (v = "menu " + (k[14].class || ""))) && {class: v}, (!m || C & 63 && g !== (g = "--x: " + k[0] + "; --y: " + k[1] + "; --width: " + k[4] + "; --height: " + k[5] + "; --min-width: " + k[2] + "; --min-height: " + k[3] + ";")) && {style: g}, C & 32768 && k[15]])), ae(t, "show", k[11]), ae(t, "transform", k[7]), ae(t, "transform-3d", k[8]), ae(t, "debug", k[9])
		}, i(k) {
			m || (wt(() => {
				f || (f = Ao(t, li, {duration: 100}, !0)), f.run(1)
			}), m = !0)
		}, o(k) {
			f || (f = Ao(t, li, {duration: 100}, !1)), f.run(0), m = !1
		}, d(k) {
			k && B(t), o[16](null), k && f && f.end(), y = !1, Ze(T)
		}
	}
}

function pu(o, t, s) {
	const l = ["x", "y", "minWidth", "minHeight", "width", "height", "content", "useTransform", "useTransform3D", "debug"];
	let h = be(t, l), {x: v = 0} = t, {y: g = 0} = t, {minWidth: f = 118} = t, {minHeight: m = 22} = t, {width: y = f} = t, {height: T = "auto"} = t, {content: O = "No Content"} = t, {useTransform: x = !1} = t, {useTransform3D: k = !0} = t, {debug: C = !1} = t;
	v = Pe(v), g = Pe(g), y = Pe(y), T = Pe(T), f = Pe(f), m = Pe(m);
	let D, R = !1;

	function j(L) {
		s(0, v = L.clientX), s(1, g = L.clientY), s(11, R = !0)
	}

	function V(L) {
		L.target === D || D.contains(L.target) || s(11, R = !1)
	}

	function Q(L) {
		Zt[L ? "unshift" : "push"](() => {
			D = L, s(10, D)
		})
	}

	return o.$$set = L => {
		s(14, t = re(re({}, t), xe(L))), s(15, h = be(t, l)), "x" in L && s(0, v = L.x), "y" in L && s(1, g = L.y), "minWidth" in L && s(2, f = L.minWidth), "minHeight" in L && s(3, m = L.minHeight), "width" in L && s(4, y = L.width), "height" in L && s(5, T = L.height), "content" in L && s(6, O = L.content), "useTransform" in L && s(7, x = L.useTransform), "useTransform3D" in L && s(8, k = L.useTransform3D), "debug" in L && s(9, C = L.debug)
	}, o.$$.update = () => {
		if (o.$$.dirty & 1027 && D) {
			const L = D.getBoundingClientRect();
			v > window.innerWidth - L.width && s(0, v -= L.width), s(0, v = Pe(v)), s(1, g = Pe(Math.min(window.innerHeight - L.height, g)))
		}
	}, t = xe(t), [v, g, f, m, y, T, O, x, k, C, D, R, j, V, t, h, Q]
}

class gu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.menu{background-color:var(--color-background-window-panel);box-shadow:inset -1px -1px 0 #000,inset 1px 1px 0 silver,inset -2px -2px 0 grey,inset 2px 2px 0 #fff;height:var(--height);left:var(--x);min-height:var(--min-height);min-width:var(--min-width);overflow:hidden;padding:3px;position:absolute;top:var(--y);visibility:hidden;width:var(--width);z-index:2}.menu menu{list-style-type:none;margin:0;padding:0}.menu.show{visibility:visible}.menu.transform{left:0;top:0;transform:translate(var(--x),var(--y))}.menu.transform-3d{left:0;top:0;transform:translate3d(var(--x),var(--y),0)}.menu.debug{outline:1px solid var(--color-debug);outline-offset:-1px}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, pu, hu, De, {x: 0, y: 1, minWidth: 2, minHeight: 3, width: 4, height: 5, content: 6, useTransform: 7, useTransform3D: 8, debug: 9}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["x", "y", "minWidth", "minHeight", "width", "height", "content", "useTransform", "useTransform3D", "debug"]
	}

	get x() {
		return this.$$.ctx[0]
	}

	set x(t) {
		this.$$set({x: t}), N()
	}

	get y() {
		return this.$$.ctx[1]
	}

	set y(t) {
		this.$$set({y: t}), N()
	}

	get minWidth() {
		return this.$$.ctx[2]
	}

	set minWidth(t) {
		this.$$set({minWidth: t}), N()
	}

	get minHeight() {
		return this.$$.ctx[3]
	}

	set minHeight(t) {
		this.$$set({minHeight: t}), N()
	}

	get width() {
		return this.$$.ctx[4]
	}

	set width(t) {
		this.$$set({width: t}), N()
	}

	get height() {
		return this.$$.ctx[5]
	}

	set height(t) {
		this.$$set({height: t}), N()
	}

	get content() {
		return this.$$.ctx[6]
	}

	set content(t) {
		this.$$set({content: t}), N()
	}

	get useTransform() {
		return this.$$.ctx[7]
	}

	set useTransform(t) {
		this.$$set({useTransform: t}), N()
	}

	get useTransform3D() {
		return this.$$.ctx[8]
	}

	set useTransform3D(t) {
		this.$$set({useTransform3D: t}), N()
	}

	get debug() {
		return this.$$.ctx[9]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-contextmenu", gu);

function mu(o) {
	let t, s, l, h, v, g, f = [{class: h = "menu-item " + (o[4].class || "")}, o[5]], m = {};
	for (let y = 0; y < f.length; y += 1) {
		m = re(m, f[y]);
	}
	return {
		c() {
			t = G("li"), s = G("slot"), l = Ge(o[0]), this.c = Z, this.h()
		}, l(y) {
			t = q(y, "LI", {class: !0});
			var T = $(t);
			s = q(T, "SLOT", {});
			var O = $(s);
			l = et(O, o[0]), O.forEach(B), T.forEach(B), this.h()
		}, h() {
			ye(t, m), ae(t, "disabled", o[1]), ae(t, "debug", o[2])
		}, m(y, T) {
			ie(y, t, T), H(t, s), H(s, l), v || (g = We(t, "click", function () {
				st(o[3]) && o[3].apply(this, arguments)
			}), v = !0)
		}, p(y, [T]) {
			o = y, T & 1 && Mn(l, o[0]), ye(t, m = Ne(f, [T & 16 && h !== (h = "menu-item " + (o[4].class || "")) && {class: h}, T & 32 && o[5]])), ae(t, "disabled", o[1]), ae(t, "debug", o[2])
		}, i: Z, o: Z, d(y) {
			y && B(t), v = !1, g()
		}
	}
}

function vu(o, t, s) {
	const l = ["name", "disabled", "debug", "onClick"];
	let h = be(t, l), {name: v = "MenuItem"} = t, {disabled: g = !1} = t, {debug: f = !1} = t, {
		onClick: m = () => {
		}
	} = t;
	return o.$$set = y => {
		s(4, t = re(re({}, t), xe(y))), s(5, h = be(t, l)), "name" in y && s(0, v = y.name), "disabled" in y && s(1, g = y.disabled), "debug" in y && s(2, f = y.debug), "onClick" in y && s(3, m = y.onClick)
	}, t = xe(t), [v, g, f, m, t, h]
}

class bu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.menu-item{color:#000;height:16px;line-height:16px;padding-left:20px;padding-right:20px}.menu-item:hover{background-color:navy;color:#fff}.menu-item.disabled{color:grey}.menu-item.disabled:hover{background-color:navy;color:grey}.menu-item.debug{outline:1px solid var(--color-debug);outline-offset:-1px}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, vu, mu, De, {name: 0, disabled: 1, debug: 2, onClick: 3}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["name", "disabled", "debug", "onClick"]
	}

	get name() {
		return this.$$.ctx[0]
	}

	set name(t) {
		this.$$set({name: t}), N()
	}

	get disabled() {
		return this.$$.ctx[1]
	}

	set disabled(t) {
		this.$$set({disabled: t}), N()
	}

	get debug() {
		return this.$$.ctx[2]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}

	get onClick() {
		return this.$$.ctx[3]
	}

	set onClick(t) {
		this.$$set({onClick: t}), N()
	}
}

customElements.define("emuos-contextmenu-item", bu);

function yu(o) {
	let t, s, l, h = [{class: l = "menu-separator " + (o[0].class || "")}, o[1]], v = {};
	for (let g = 0; g < h.length; g += 1) {
		v = re(v, h[g]);
	}
	return {
		c() {
			t = G("li"), s = G("hr"), this.c = Z, this.h()
		}, l(g) {
			t = q(g, "LI", {class: !0});
			var f = $(t);
			s = q(f, "HR", {}), f.forEach(B), this.h()
		}, h() {
			ye(t, v)
		}, m(g, f) {
			ie(g, t, f), H(t, s)
		}, p(g, [f]) {
			ye(t, v = Ne(h, [f & 1 && l !== (l = "menu-separator " + (g[0].class || "")) && {class: l}, f & 2 && g[1]]))
		}, i: Z, o: Z, d(g) {
			g && B(t)
		}
	}
}

function _u(o, t, s) {
	const l = [];
	let h = be(t, l);
	return o.$$set = v => {
		s(0, t = re(re({}, t), xe(v))), s(1, h = be(t, l))
	}, t = xe(t), [t, h]
}

class wu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.menu-separator{margin-bottom:3px;margin-top:3px}.menu-separator hr{border-bottom:1px solid #fff;border-top:1px solid grey}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, _u, yu, De, {}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}
}

customElements.define("emuos-contextmenu-separator", wu);

function xu(o) {
	let t, s, l, h = [{class: l = "icons " + (o[0].class || "")}, o[1]], v = {};
	for (let g = 0; g < h.length; g += 1) {
		v = re(v, h[g]);
	}
	return {
		c() {
			t = G("ul"), s = G("slot"), this.c = Z, this.h()
		}, l(g) {
			t = q(g, "UL", {class: !0});
			var f = $(t);
			s = q(f, "SLOT", {}), $(s).forEach(B), f.forEach(B), this.h()
		}, h() {
			ye(t, v)
		}, m(g, f) {
			ie(g, t, f), H(t, s)
		}, p(g, [f]) {
			ye(t, v = Ne(h, [f & 1 && l !== (l = "icons " + (g[0].class || "")) && {class: l}, f & 2 && g[1]]))
		}, i: Z, o: Z, d(g) {
			g && B(t)
		}
	}
}

function Eu(o, t, s) {
	const l = [];
	let h = be(t, l);
	return o.$$set = v => {
		s(0, t = re(re({}, t), xe(v))), s(1, h = be(t, l))
	}, t = xe(t), [t, h]
}

class Ou extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.icons{display:grid;grid-auto-flow:column;grid-template-columns:repeat(auto-fill,70px);grid-template-rows:repeat(auto-fill,70px);height:calc(100% - 28px);margin:0;overflow:hidden;overflow-x:hidden;overflow-y:auto;padding:0;position:absolute;width:100%}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, Eu, xu, De, {}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}
}

customElements.define("emuos-icons", Ou);
const Yt = [];

function vi(o, t = Z) {
	let s;
	const l = new Set;

	function h(f) {
		if (De(o, f) && (o = f, s)) {
			const m = !Yt.length;
			for (const y of l) {
				y[1](), Yt.push(y, o);
			}
			if (m) {
				for (let y = 0; y < Yt.length; y += 2) {
					Yt[y][0](Yt[y + 1]);
				}
				Yt.length = 0
			}
		}
	}

	function v(f) {
		h(f(o))
	}

	function g(f, m = Z) {
		const y = [f, m];
		return l.add(y), l.size === 1 && (s = t(h) || Z), f(o), () => {
			l.delete(y), l.size === 0 && (s(), s = null)
		}
	}

	return {set: h, update: v, subscribe: g}
}

function Tu(o) {
	return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o
}

var hr = {};
(function (o) {
	o.defaults = {}, o.set = function (t, s, l) {
		var h = l || {}, v = o.defaults, g = h.expires || v.expires, f = h.domain || v.domain, m = h.path !== void 0 ? h.path : v.path !== void 0 ? v.path : "/", y = h.secure !== void 0 ? h.secure : v.secure, T = h.httponly !== void 0 ? h.httponly : v.httponly, O = h.samesite !== void 0 ? h.samesite : v.samesite, x = g ? new Date(typeof g == "number" ? new Date().getTime() + g * 864e5 : g) : 0;
		document.cookie = t.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + s.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (x && x.getTime() >= 0 ? ";expires=" + x.toUTCString() : "") + (f ? ";domain=" + f : "") + (m ? ";path=" + m : "") + (y ? ";secure" : "") + (T ? ";httponly" : "") + (O ? ";samesite=" + O : "")
	}, o.get = function (t) {
		for (var s = document.cookie.split(";"); s.length;) {
			var l = s.pop(), h = l.indexOf("=");
			h = h < 0 ? l.length : h;
			var v = decodeURIComponent(l.slice(0, h).replace(/^\s+/, ""));
			if (v === t) {
				return decodeURIComponent(l.slice(h + 1))
			}
		}
		return null
	}, o.erase = function (t, s) {
		o.set(t, "", {expires: -1, domain: s && s.domain, path: s && s.path, secure: 0, httponly: 0})
	}, o.all = function () {
		for (var t = {}, s = document.cookie.split(";"); s.length;) {
			var l = s.pop(), h = l.indexOf("=");
			h = h < 0 ? l.length : h;
			var v = decodeURIComponent(l.slice(0, h).replace(/^\s+/, ""));
			t[v] = decodeURIComponent(l.slice(h + 1))
		}
		return t
	}
})(hr);
const ku = o => {
	var t;
	typeof process < "u" && ((t = process.env) == null || t.NODE_ENV)
}, bi = o => ku(), gs = o => typeof o > "u" ? "undefined" : JSON.stringify(o), ui = o => {
	if (typeof o != "string") {
		return o;
	}
	if (o !== "undefined") {
		if (o != null) {
			try {
				return JSON.parse(o)
			} catch {
			}
		}
		return o
	}
};

function Pu(o, t, s) {
	const l = t.getValue(s);
	return l !== null && o.set(l), t.addListener && t.addListener(s, h => o.set(h)), o.subscribe(h => t.setValue(s, h)), {
		...o, delete() {
			t.deleteValue(s)
		}
	}
}

Su();
vs();
Mu();

function ms(o, t = !1) {
	const s = [], l = g => {
		const f = g.key;
		g.storageArea === o && s.filter(({key: m}) => m === f).forEach(({listener: m}) => m(ui(g.newValue)))
	}, h = () => {
		t && typeof window < "u" && (window == null ? void 0 : window.addEventListener) && window.addEventListener("storage", l)
	}, v = () => {
		t && typeof window < "u" && (window == null ? void 0 : window.removeEventListener) && window.removeEventListener("storage", l)
	};
	return {
		addListener(g, f) {
			s.push({key: g, listener: f}), s.length === 1 && h()
		}, removeListener(g, f) {
			const m = s.indexOf({key: g, listener: f});
			m !== -1 && s.splice(m, 1), s.length === 0 && v()
		}, getValue(g) {
			const f = o.getItem(g);
			return ui(f)
		}, deleteValue(g) {
			o.removeItem(g)
		}, setValue(g, f) {
			o.setItem(g, gs(f))
		}
	}
}

function vs(o = !1) {
	return typeof window < "u" && (window == null ? void 0 : window.localStorage) ? ms(window.localStorage, o) : (bi(), yi())
}

function Mu(o = !1) {
	return typeof window < "u" && (window == null ? void 0 : window.sessionStorage) ? ms(window.sessionStorage, o) : (bi(), yi())
}

function Su() {
	return typeof document > "u" || typeof (document == null ? void 0 : document.cookie) != "string" ? (bi(), yi()) : {
		getValue(o) {
			const t = hr.get(o);
			return ui(t)
		}, deleteValue(o) {
			hr.erase(o, {samesite: "Strict"})
		}, setValue(o, t) {
			hr.set(o, gs(t), {samesite: "Strict"})
		}
	}
}

function yi() {
	return {
		getValue() {
			return null
		}, deleteValue() {
		}, setValue() {
		}
	}
}

const ju = `[{
	"name": "My Computer"
} , {
	"name": "Network Neighborhood"
} , {
	"name": "Recycle Bin"
} , {
	"name": "(C)",
	"shortcut": true
} , {
	"name": "Control Panel",
	"shortcut": true
} , {
	"name": "System",
	"shortcut": true
}]`;
let bs = {};
try {
	bs = JSON.parse(ju)
} catch (o) {
	console.error(o)
}
const ys = {locale: "en", desktop: {icons: bs || []}, settings: {}, version: 0, user: null, dev: !1};
Fe != null && Fe.GLOBAL_DEBUG && console.log(ys);
const Wo = Pu(vi(ys), vs(), "db"), _s = {duration: 4e3, initial: 1, next: 0, pausable: !1, dismissable: !0, reversed: !1, intro: {x: 256}, close: "\u2715"}, wn = (() => {
	const {subscribe: o, update: t} = vi([]);
	let s = 0;
	const l = {};
	return {
		subscribe: o, open: (m, y = {}) => {
			const T = {target: "default", ...m instanceof Object ? m : {...y, msg: m}}, O = l[T.target] || {}, x = {..._s, ...O, ...T, theme: {...O.theme, ...T.theme}, classes: [...O.classes || [], ...T.classes || []], id: T.id || ++s};
			return t(k => {
				const C = k.findIndex(D => D.id === T.id);
				return C === -1 ? x.reversed ? [...k, x] : [x, ...k] : (C > -1 && (k[C] = {...k[C], ...x}), k)
			}), s
		}, close: m => {
			t(y => {
				if (!y.length || m === 0) {
					return [];
				}
				if (m instanceof Object) {
					return y.filter(O => m(O));
				}
				const T = m || Math.max(...y.map(O => O.id));
				return y.filter(O => O.id !== T)
			})
		}, set: (m, y = {}) => {
			const T = m instanceof Object ? {...m} : {...y, id: m};
			t(O => {
				const x = O.findIndex(k => k.id === T.id);
				return x > -1 && (O[x] = {...O[x], ...T}), O
			})
		}, init: (m = "default", y = {}) => (l[m] = y, l)
	}
})();
var ws = {exports: {}};
(function (o, t) {
	(function (s) {
		o.exports = s()
	})(function () {
		var s = {};
		Object.defineProperty(s, "__esModule", {value: !0}), s.default = void 0, s.default = function (e) {
			return !(!e || !e.Window) && e instanceof e.Window
		};
		var l = {};
		Object.defineProperty(l, "__esModule", {value: !0}), l.getWindow = function (e) {
			return (0, s.default)(e) ? e : (e.ownerDocument || e).defaultView || v.window
		}, l.init = g, l.window = l.realWindow = void 0;
		var h = void 0;
		l.realWindow = h;
		var v = void 0;

		function g(e) {
			l.realWindow = h = e;
			var n = e.document.createTextNode("");
			n.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(n) === n && (e = e.wrap(e)), l.window = v = e
		}

		l.window = v, typeof window < "u" && window && g(window);
		var f = {};

		function m(e) {
			return m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, m(e)
		}

		Object.defineProperty(f, "__esModule", {value: !0}), f.default = void 0;
		var y = function (e) {
			return !!e && m(e) === "object"
		}, T = function (e) {
			return typeof e == "function"
		}, O = {
			window: function (e) {
				return e === l.window || (0, s.default)(e)
			}, docFrag: function (e) {
				return y(e) && e.nodeType === 11
			}, object: y, func: T, number: function (e) {
				return typeof e == "number"
			}, bool: function (e) {
				return typeof e == "boolean"
			}, string: function (e) {
				return typeof e == "string"
			}, element: function (e) {
				if (!e || m(e) !== "object") {
					return !1;
				}
				var n = l.getWindow(e) || l.window;
				return /object|function/.test(typeof Element > "u" ? "undefined" : m(Element)) ? e instanceof Element || e instanceof n.Element : e.nodeType === 1 && typeof e.nodeName == "string"
			}, plainObject: function (e) {
				return y(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString())
			}, array: function (e) {
				return y(e) && e.length !== void 0 && T(e.splice)
			}
		};
		f.default = O;
		var x = {};

		function k(e) {
			var n = e.interaction;
			if (n.prepared.name === "drag") {
				var r = n.prepared.axis;
				r === "x" ? (n.coords.cur.page.y = n.coords.start.page.y, n.coords.cur.client.y = n.coords.start.client.y, n.coords.velocity.client.y = 0, n.coords.velocity.page.y = 0) : r === "y" && (n.coords.cur.page.x = n.coords.start.page.x, n.coords.cur.client.x = n.coords.start.client.x, n.coords.velocity.client.x = 0, n.coords.velocity.page.x = 0)
			}
		}

		function C(e) {
			var n = e.iEvent, r = e.interaction;
			if (r.prepared.name === "drag") {
				var i = r.prepared.axis;
				if (i === "x" || i === "y") {
					var a = i === "x" ? "y" : "x";
					n.page[a] = r.coords.start.page[a], n.client[a] = r.coords.start.client[a], n.delta[a] = 0
				}
			}
		}

		Object.defineProperty(x, "__esModule", {value: !0}), x.default = void 0;
		var D = {
			id: "actions/drag", install: function (e) {
				var n = e.actions, r = e.Interactable, i = e.defaults;
				r.prototype.draggable = D.draggable, n.map.drag = D, n.methodDict.drag = "draggable", i.actions.drag = D.defaults
			}, listeners: {
				"interactions:before-action-move": k, "interactions:action-resume": k, "interactions:action-move": C, "auto-start:check": function (e) {
					var n = e.interaction, r = e.interactable, i = e.buttons, a = r.options.drag;
					if (a && a.enabled && (!n.pointerIsDown || !/mouse|pointer/.test(n.pointerType) || (i & r.options.drag.mouseButtons) != 0)) {
						return e.action = {name: "drag", axis: a.lockAxis === "start" ? a.startAxis : a.lockAxis}, !1
					}
				}
			}, draggable: function (e) {
				return f.default.object(e) ? (this.options.drag.enabled = e.enabled !== !1, this.setPerAction("drag", e), this.setOnEvents("drag", e), /^(xy|x|y|start)$/.test(e.lockAxis) && (this.options.drag.lockAxis = e.lockAxis), /^(xy|x|y)$/.test(e.startAxis) && (this.options.drag.startAxis = e.startAxis), this) : f.default.bool(e) ? (this.options.drag.enabled = e, this) : this.options.drag
			}, beforeMove: k, move: C, defaults: {startAxis: "xy", lockAxis: "xy"}, getCursor: function () {
				return "move"
			}
		}, R = D;
		x.default = R;
		var j = {};
		Object.defineProperty(j, "__esModule", {value: !0}), j.default = void 0;
		var V = {
			init: function (e) {
				var n = e;
				V.document = n.document, V.DocumentFragment = n.DocumentFragment || Q, V.SVGElement = n.SVGElement || Q, V.SVGSVGElement = n.SVGSVGElement || Q, V.SVGElementInstance = n.SVGElementInstance || Q, V.Element = n.Element || Q, V.HTMLElement = n.HTMLElement || V.Element, V.Event = n.Event, V.Touch = n.Touch || Q, V.PointerEvent = n.PointerEvent || n.MSPointerEvent
			}, document: null, DocumentFragment: null, SVGElement: null, SVGSVGElement: null, SVGElementInstance: null, Element: null, HTMLElement: null, Event: null, Touch: null, PointerEvent: null
		};

		function Q() {
		}

		var L = V;
		j.default = L;
		var F = {};
		Object.defineProperty(F, "__esModule", {value: !0}), F.default = void 0;
		var J = {
			init: function (e) {
				var n = j.default.Element, r = e.navigator || {};
				J.supportsTouch = "ontouchstart" in e || f.default.func(e.DocumentTouch) && j.default.document instanceof e.DocumentTouch, J.supportsPointerEvent = r.pointerEnabled !== !1 && !!j.default.PointerEvent, J.isIOS = /iP(hone|od|ad)/.test(r.platform), J.isIOS7 = /iP(hone|od|ad)/.test(r.platform) && /OS 7[^\d]/.test(r.appVersion), J.isIe9 = /MSIE 9/.test(r.userAgent), J.isOperaMobile = r.appName === "Opera" && J.supportsTouch && /Presto/.test(r.userAgent), J.prefixedMatchesSelector = "matches" in n.prototype ? "matches" : "webkitMatchesSelector" in n.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in n.prototype ? "mozMatchesSelector" : "oMatchesSelector" in n.prototype ? "oMatchesSelector" : "msMatchesSelector", J.pEventTypes = J.supportsPointerEvent ? j.default.PointerEvent === e.MSPointerEvent ? {up: "MSPointerUp", down: "MSPointerDown", over: "mouseover", out: "mouseout", move: "MSPointerMove", cancel: "MSPointerCancel"} : {up: "pointerup", down: "pointerdown", over: "pointerover", out: "pointerout", move: "pointermove", cancel: "pointercancel"} : null, J.wheelEvent = j.default.document && "onmousewheel" in j.default.document ? "mousewheel" : "wheel"
			}, supportsTouch: null, supportsPointerEvent: null, isIOS7: null, isIOS: null, isIe9: null, isOperaMobile: null, prefixedMatchesSelector: null, pEventTypes: null, wheelEvent: null
		}, S = J;
		F.default = S;
		var z = {};

		function le(e) {
			var n = e.parentNode;
			if (f.default.docFrag(n)) {
				for (; (n = n.host) && f.default.docFrag(n);) {
					;
				}
				return n
			}
			return n
		}

		function oe(e, n) {
			return l.window !== l.realWindow && (n = n.replace(/\/deep\//g, " ")), e[F.default.prefixedMatchesSelector](n)
		}

		Object.defineProperty(z, "__esModule", {value: !0}), z.closest = function (e, n) {
			for (; f.default.element(e);) {
				if (oe(e, n)) {
					return e;
				}
				e = le(e)
			}
			return null
		}, z.getActualElement = function (e) {
			return e.correspondingUseElement || e
		}, z.getElementClientRect = fe, z.getElementRect = function (e) {
			var n = fe(e);
			if (!F.default.isIOS7 && n) {
				var r = Ee(l.getWindow(e));
				n.left += r.x, n.right += r.x, n.top += r.y, n.bottom += r.y
			}
			return n
		}, z.getPath = function (e) {
			for (var n = []; e;) {
				n.push(e), e = le(e);
			}
			return n
		}, z.getScrollXY = Ee, z.indexOfDeepestElement = function (e) {
			for (var n, r = [], i = 0; i < e.length; i++) {
				var a = e[i], u = e[n];
				if (a && i !== n) {
					if (u) {
						var p = _e(a), c = _e(u);
						if (p !== a.ownerDocument) {
							if (c !== a.ownerDocument) {
								if (p !== c) {
									r = r.length ? r : nt(u);
									var d = void 0;
									if (u instanceof j.default.HTMLElement && a instanceof j.default.SVGElement && !(a instanceof j.default.SVGSVGElement)) {
										if (a === c) {
											continue;
										}
										d = a.ownerSVGElement
									} else {
										d = a;
									}
									for (var b = nt(d, u.ownerDocument), _ = 0; b[_] && b[_] === r[_];) {
										_++;
									}
									var w = [b[_ - 1], b[_], r[_]];
									if (w[0]) {
										for (var P = w[0].lastChild; P;) {
											if (P === w[1]) {
												n = i, r = b;
												break
											}
											if (P === w[2]) {
												break;
											}
											P = P.previousSibling
										}
									}
								} else {
									M = a, E = u, (parseInt(l.getWindow(M).getComputedStyle(M).zIndex, 10) || 0) >= (parseInt(l.getWindow(E).getComputedStyle(E).zIndex, 10) || 0) && (n = i);
								}
							} else {
								n = i
							}
						}
					} else {
						n = i
					}
				}
			}
			var M, E;
			return n
		}, z.matchesSelector = oe, z.matchesUpTo = function (e, n, r) {
			for (; f.default.element(e);) {
				if (oe(e, n)) {
					return !0;
				}
				if ((e = le(e)) === r) {
					return oe(e, n)
				}
			}
			return !1
		}, z.nodeContains = function (e, n) {
			if (e.contains) {
				return e.contains(n);
			}
			for (; n;) {
				if (n === e) {
					return !0;
				}
				n = n.parentNode
			}
			return !1
		}, z.parentNode = le, z.trySelector = function (e) {
			return !!f.default.string(e) && (j.default.document.querySelector(e), !0)
		};
		var _e = function (e) {
			return e.parentNode || e.host
		};

		function nt(e, n) {
			for (var r, i = [], a = e; (r = _e(a)) && a !== n && r !== a.ownerDocument;) {
				i.unshift(a), a = r;
			}
			return i
		}

		function Ee(e) {
			return {x: (e = e || l.window).scrollX || e.document.documentElement.scrollLeft, y: e.scrollY || e.document.documentElement.scrollTop}
		}

		function fe(e) {
			var n = e instanceof j.default.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
			return n && {left: n.left, right: n.right, top: n.top, bottom: n.bottom, width: n.width || n.right - n.left, height: n.height || n.bottom - n.top}
		}

		var X = {};
		Object.defineProperty(X, "__esModule", {value: !0}), X.default = function (e, n) {
			for (var r in n) {
				e[r] = n[r];
			}
			return e
		};
		var ue = {};

		function zt(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		function _i(e, n, r) {
			return e === "parent" ? (0, z.parentNode)(r) : e === "self" ? n.getRect(r) : (0, z.closest)(r, e)
		}

		Object.defineProperty(ue, "__esModule", {value: !0}), ue.addEdges = function (e, n, r) {
			e.left && (n.left += r.x), e.right && (n.right += r.x), e.top && (n.top += r.y), e.bottom && (n.bottom += r.y), n.width = n.right - n.left, n.height = n.bottom - n.top
		}, ue.getStringOptionResult = _i, ue.rectToXY = function (e) {
			return e && {x: "x" in e ? e.x : e.left, y: "y" in e ? e.y : e.top}
		}, ue.resolveRectLike = function (e, n, r, i) {
			var a, u = e;
			return f.default.string(u) ? u = _i(u, n, r) : f.default.func(u) && (u = u.apply(void 0, function (p) {
				if (Array.isArray(p)) {
					return zt(p)
				}
			}(a = i) || function (p) {
				if (typeof Symbol < "u" && p[Symbol.iterator] != null || p["@@iterator"] != null) {
					return Array.from(p)
				}
			}(a) || function (p, c) {
				if (p) {
					if (typeof p == "string") {
						return zt(p, c);
					}
					var d = Object.prototype.toString.call(p).slice(8, -1);
					return d === "Object" && p.constructor && (d = p.constructor.name), d === "Map" || d === "Set" ? Array.from(p) : d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? zt(p, c) : void 0
				}
			}(a) || function () {
				throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
			}())), f.default.element(u) && (u = (0, z.getElementRect)(u)), u
		}, ue.tlbrToXywh = function (e) {
			return !e || "x" in e && "y" in e || ((e = (0, X.default)({}, e)).x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e
		}, ue.xywhToTlbr = function (e) {
			return !e || "left" in e && "top" in e || ((e = (0, X.default)({}, e)).left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e
		};
		var xt = {};
		Object.defineProperty(xt, "__esModule", {value: !0}), xt.default = function (e, n, r) {
			var i = e.options[r], a = i && i.origin || e.options.origin, u = (0, ue.resolveRectLike)(a, e, n, [e && n]);
			return (0, ue.rectToXY)(u) || {x: 0, y: 0}
		};
		var Bt = {};

		function wi(e) {
			return e.trim().split(/ +/)
		}

		Object.defineProperty(Bt, "__esModule", {value: !0}), Bt.default = function e(n, r, i) {
			if (i = i || {}, f.default.string(n) && n.search(" ") !== -1 && (n = wi(n)), f.default.array(n)) {
				return n.reduce(function (d, b) {
					return (0, X.default)(d, e(b, r, i))
				}, i);
			}
			if (f.default.object(n) && (r = n, n = ""), f.default.func(r)) {
				i[n] = i[n] || [], i[n].push(r);
			} else if (f.default.array(r)) {
				for (var a = 0; a < r.length; a++) {
					var u;
					u = r[a], e(n, u, i)
				}
			} else if (f.default.object(r)) {
				for (var p in r) {
					var c = wi(p).map(function (d) {
						return "".concat(n).concat(d)
					});
					e(c, r[p], i)
				}
			}
			return i
		};
		var pt = {};
		Object.defineProperty(pt, "__esModule", {value: !0}), pt.default = void 0, pt.default = function (e, n) {
			return Math.sqrt(e * e + n * n)
		};
		var jn = {};
		Object.defineProperty(jn, "__esModule", {value: !0}), jn.default = function (e, n) {
			e.__set || (e.__set = {});
			var r = function (a) {
				typeof e[a] != "function" && a !== "__set" && Object.defineProperty(e, a, {
					get: function () {
						return a in e.__set ? e.__set[a] : e.__set[a] = n[a]
					}, set: function (u) {
						e.__set[a] = u
					}, configurable: !0
				})
			};
			for (var i in n) {
				r(i);
			}
			return e
		};
		var K = {};

		function br(e) {
			return e instanceof j.default.Event || e instanceof j.default.Touch
		}

		function Qt(e, n, r) {
			return e = e || "page", (r = r || {}).x = n[e + "X"], r.y = n[e + "Y"], r
		}

		function xi(e, n) {
			return n = n || {x: 0, y: 0}, F.default.isOperaMobile && br(e) ? (Qt("screen", e, n), n.x += window.scrollX, n.y += window.scrollY) : Qt("page", e, n), n
		}

		function Ei(e, n) {
			return n = n || {}, F.default.isOperaMobile && br(e) ? Qt("screen", e, n) : Qt("client", e, n), n
		}

		function Cn(e) {
			var n = [];
			return f.default.array(e) ? (n[0] = e[0], n[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (n[0] = e.touches[0], n[1] = e.changedTouches[0]) : e.touches.length === 0 && (n[0] = e.changedTouches[0], n[1] = e.changedTouches[1]) : (n[0] = e.touches[0], n[1] = e.touches[1]), n
		}

		function Oi(e) {
			for (var n = {pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0}, r = 0; r < e.length; r++) {
				var i = e[r];
				for (var a in n) {
					n[a] += i[a]
				}
			}
			for (var u in n) {
				n[u] /= e.length;
			}
			return n
		}

		Object.defineProperty(K, "__esModule", {value: !0}), K.coordsToEvent = function (e) {
			return {
				coords: e, get page() {
					return this.coords.page
				}, get client() {
					return this.coords.client
				}, get timeStamp() {
					return this.coords.timeStamp
				}, get pageX() {
					return this.coords.page.x
				}, get pageY() {
					return this.coords.page.y
				}, get clientX() {
					return this.coords.client.x
				}, get clientY() {
					return this.coords.client.y
				}, get pointerId() {
					return this.coords.pointerId
				}, get target() {
					return this.coords.target
				}, get type() {
					return this.coords.type
				}, get pointerType() {
					return this.coords.pointerType
				}, get buttons() {
					return this.coords.buttons
				}, preventDefault: function () {
				}
			}
		}, K.copyCoords = function (e, n) {
			e.page = e.page || {}, e.page.x = n.page.x, e.page.y = n.page.y, e.client = e.client || {}, e.client.x = n.client.x, e.client.y = n.client.y, e.timeStamp = n.timeStamp
		}, K.getClientXY = Ei, K.getEventTargets = function (e) {
			var n = f.default.func(e.composedPath) ? e.composedPath() : e.path;
			return [z.getActualElement(n ? n[0] : e.target), z.getActualElement(e.currentTarget)]
		}, K.getPageXY = xi, K.getPointerId = function (e) {
			return f.default.number(e.pointerId) ? e.pointerId : e.identifier
		}, K.getPointerType = function (e) {
			return f.default.string(e.pointerType) ? e.pointerType : f.default.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : /touch/.test(e.type || "") || e instanceof j.default.Touch ? "touch" : "mouse"
		}, K.getTouchPair = Cn, K.getXY = Qt, K.isNativePointer = br, K.newCoords = function () {
			return {page: {x: 0, y: 0}, client: {x: 0, y: 0}, timeStamp: 0}
		}, K.pointerAverage = Oi, Object.defineProperty(K, "pointerExtend", {
			enumerable: !0, get: function () {
				return jn.default
			}
		}), K.setCoordDeltas = function (e, n, r) {
			e.page.x = r.page.x - n.page.x, e.page.y = r.page.y - n.page.y, e.client.x = r.client.x - n.client.x, e.client.y = r.client.y - n.client.y, e.timeStamp = r.timeStamp - n.timeStamp
		}, K.setCoordVelocity = function (e, n) {
			var r = Math.max(n.timeStamp / 1e3, .001);
			e.page.x = n.page.x / r, e.page.y = n.page.y / r, e.client.x = n.client.x / r, e.client.y = n.client.y / r, e.timeStamp = r
		}, K.setCoords = function (e, n, r) {
			var i = n.length > 1 ? Oi(n) : n[0];
			xi(i, e.page), Ei(i, e.client), e.timeStamp = r
		}, K.setZeroCoords = function (e) {
			e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0
		}, K.touchAngle = function (e, n) {
			var r = n + "X", i = n + "Y", a = Cn(e), u = a[1][r] - a[0][r], p = a[1][i] - a[0][i];
			return 180 * Math.atan2(p, u) / Math.PI
		}, K.touchBBox = function (e) {
			if (!e.length) {
				return null;
			}
			var n = Cn(e), r = Math.min(n[0].pageX, n[1].pageX), i = Math.min(n[0].pageY, n[1].pageY), a = Math.max(n[0].pageX, n[1].pageX), u = Math.max(n[0].pageY, n[1].pageY);
			return {x: r, y: i, left: r, top: i, right: a, bottom: u, width: a - r, height: u - i}
		}, K.touchDistance = function (e, n) {
			var r = n + "X", i = n + "Y", a = Cn(e), u = a[0][r] - a[1][r], p = a[0][i] - a[1][i];
			return (0, pt.default)(u, p)
		};
		var Lt = {};

		function ks(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Ti(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(Lt, "__esModule", {value: !0}), Lt.BaseEvent = void 0;
		var ki = function () {
			function e(i) {
				(function (a, u) {
					if (!(a instanceof u)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Ti(this, "immediatePropagationStopped", !1), Ti(this, "propagationStopped", !1), this._interaction = i
			}

			var n, r;
			return n = e, (r = [{
				key: "preventDefault", value: function () {
				}
			}, {
				key: "stopPropagation", value: function () {
					this.propagationStopped = !0
				}
			}, {
				key: "stopImmediatePropagation", value: function () {
					this.immediatePropagationStopped = this.propagationStopped = !0
				}
			}]) && ks(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();
		Lt.BaseEvent = ki, Object.defineProperty(ki.prototype, "interaction", {
			get: function () {
				return this._interaction._proxy
			}, set: function () {
			}
		});
		var pe = {};
		Object.defineProperty(pe, "__esModule", {value: !0}), pe.remove = pe.merge = pe.from = pe.findIndex = pe.find = pe.contains = void 0, pe.contains = function (e, n) {
			return e.indexOf(n) !== -1
		}, pe.remove = function (e, n) {
			return e.splice(e.indexOf(n), 1)
		};
		var Pi = function (e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.push(i)
			}
			return e
		};
		pe.merge = Pi, pe.from = function (e) {
			return Pi([], e)
		};
		var Mi = function (e, n) {
			for (var r = 0; r < e.length; r++) {
				if (n(e[r], r, e)) {
					return r;
				}
			}
			return -1
		};
		pe.findIndex = Mi, pe.find = function (e, n) {
			return e[Mi(e, n)]
		};
		var at = {};

		function yr(e) {
			return yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, yr(e)
		}

		function Ps(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function _r(e, n) {
			return _r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, i) {
				return r.__proto__ = i, r
			}, _r(e, n)
		}

		function Ms(e, n) {
			if (n && (yr(n) === "object" || typeof n == "function")) {
				return n;
			}
			if (n !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return Et(e)
		}

		function Et(e) {
			if (e === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return e
		}

		function Dn(e) {
			return Dn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (n) {
				return n.__proto__ || Object.getPrototypeOf(n)
			}, Dn(e)
		}

		function Wt(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(at, "__esModule", {value: !0}), at.DropEvent = void 0;
		var Ss = function (e) {
			(function (c, d) {
				if (typeof d != "function" && d !== null) {
					throw new TypeError("Super expression must either be null or a function");
				}
				c.prototype = Object.create(d && d.prototype, {constructor: {value: c, writable: !0, configurable: !0}}), Object.defineProperty(c, "prototype", {writable: !1}), d && _r(c, d)
			})(p, e);
			var n, r, i, a, u = (i = p, a = function () {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) {
					return !1;
				}
				if (typeof Proxy == "function") {
					return !0;
				}
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
					})), !0
				} catch {
					return !1
				}
			}(), function () {
				var c, d = Dn(i);
				if (a) {
					var b = Dn(this).constructor;
					c = Reflect.construct(d, arguments, b)
				} else {
					c = d.apply(this, arguments);
				}
				return Ms(this, c)
			});

			function p(c, d, b) {
				var _;
				(function (E, I) {
					if (!(E instanceof I)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, p), Wt(Et(_ = u.call(this, d._interaction)), "dropzone", void 0), Wt(Et(_), "dragEvent", void 0), Wt(Et(_), "relatedTarget", void 0), Wt(Et(_), "draggable", void 0), Wt(Et(_), "propagationStopped", !1), Wt(Et(_), "immediatePropagationStopped", !1);
				var w = b === "dragleave" ? c.prev : c.cur, P = w.element, M = w.dropzone;
				return _.type = b, _.target = P, _.currentTarget = P, _.dropzone = M, _.dragEvent = d, _.relatedTarget = d.target, _.draggable = d.interactable, _.timeStamp = d.timeStamp, _
			}

			return n = p, (r = [{
				key: "reject", value: function () {
					var c = this, d = this._interaction.dropState;
					if (this.type === "dropactivate" || this.dropzone && d.cur.dropzone === this.dropzone && d.cur.element === this.target) {
						if (d.prev.dropzone = this.dropzone, d.prev.element = this.target, d.rejected = !0, d.events.enter = null, this.stopImmediatePropagation(), this.type === "dropactivate") {
							var b = d.activeDrops, _ = pe.findIndex(b, function (P) {
								var M = P.dropzone, E = P.element;
								return M === c.dropzone && E === c.target
							});
							d.activeDrops.splice(_, 1);
							var w = new p(d, this.dragEvent, "dropdeactivate");
							w.dropzone = this.dropzone, w.target = this.target, this.dropzone.fire(w)
						} else {
							this.dropzone.fire(new p(d, this.dragEvent, "dragleave"))
						}
					}
				}
			}, {
				key: "preventDefault", value: function () {
				}
			}, {
				key: "stopPropagation", value: function () {
					this.propagationStopped = !0
				}
			}, {
				key: "stopImmediatePropagation", value: function () {
					this.immediatePropagationStopped = this.propagationStopped = !0
				}
			}]) && Ps(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), p
		}(Lt.BaseEvent);
		at.DropEvent = Ss;
		var In = {};

		function Si(e, n) {
			for (var r = 0; r < e.slice().length; r++) {
				var i = e.slice()[r], a = i.dropzone, u = i.element;
				n.dropzone = a, n.target = u, a.fire(n), n.propagationStopped = n.immediatePropagationStopped = !1
			}
		}

		function wr(e, n) {
			for (var r = function (u, p) {
				for (var c = u.interactables, d = [], b = 0; b < c.list.length; b++) {
					var _ = c.list[b];
					if (_.options.drop.enabled) {
						var w = _.options.drop.accept;
						if (!(f.default.element(w) && w !== p || f.default.string(w) && !z.matchesSelector(p, w) || f.default.func(w) && !w({dropzone: _, draggableElement: p}))) {
							for (var P = f.default.string(_.target) ? _._context.querySelectorAll(_.target) : f.default.array(_.target) ? _.target : [_.target], M = 0; M < P.length; M++) {
								var E = P[M];
								E !== p && d.push({dropzone: _, element: E, rect: _.getRect(E)})
							}
						}
					}
				}
				return d
			}(e, n), i = 0; i < r.length; i++) {
				var a = r[i];
				a.rect = a.dropzone.getRect(a.element)
			}
			return r
		}

		function ji(e, n, r) {
			for (var i = e.dropState, a = e.interactable, u = e.element, p = [], c = 0; c < i.activeDrops.length; c++) {
				var d = i.activeDrops[c], b = d.dropzone, _ = d.element, w = d.rect;
				p.push(b.dropCheck(n, r, a, u, _, w) ? _ : null)
			}
			var P = z.indexOfDeepestElement(p);
			return i.activeDrops[P] || null
		}

		function xr(e, n, r) {
			var i = e.dropState, a = {enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null};
			return r.type === "dragstart" && (a.activate = new at.DropEvent(i, r, "dropactivate"), a.activate.target = null, a.activate.dropzone = null), r.type === "dragend" && (a.deactivate = new at.DropEvent(i, r, "dropdeactivate"), a.deactivate.target = null, a.deactivate.dropzone = null), i.rejected || (i.cur.element !== i.prev.element && (i.prev.dropzone && (a.leave = new at.DropEvent(i, r, "dragleave"), r.dragLeave = a.leave.target = i.prev.element, r.prevDropzone = a.leave.dropzone = i.prev.dropzone), i.cur.dropzone && (a.enter = new at.DropEvent(i, r, "dragenter"), r.dragEnter = i.cur.element, r.dropzone = i.cur.dropzone)), r.type === "dragend" && i.cur.dropzone && (a.drop = new at.DropEvent(i, r, "drop"), r.dropzone = i.cur.dropzone, r.relatedTarget = i.cur.element), r.type === "dragmove" && i.cur.dropzone && (a.move = new at.DropEvent(i, r, "dropmove"), a.move.dragmove = r, r.dropzone = i.cur.dropzone)), a
		}

		function Er(e, n) {
			var r = e.dropState, i = r.activeDrops, a = r.cur, u = r.prev;
			n.leave && u.dropzone.fire(n.leave), n.enter && a.dropzone.fire(n.enter), n.move && a.dropzone.fire(n.move), n.drop && a.dropzone.fire(n.drop), n.deactivate && Si(i, n.deactivate), r.prev.dropzone = a.dropzone, r.prev.element = a.element
		}

		function Ci(e, n) {
			var r = e.interaction, i = e.iEvent, a = e.event;
			if (i.type === "dragmove" || i.type === "dragend") {
				var u = r.dropState;
				n.dynamicDrop && (u.activeDrops = wr(n, r.element));
				var p = i, c = ji(r, p, a);
				u.rejected = u.rejected && !!c && c.dropzone === u.cur.dropzone && c.element === u.cur.element, u.cur.dropzone = c && c.dropzone, u.cur.element = c && c.element, u.events = xr(r, 0, p)
			}
		}

		Object.defineProperty(In, "__esModule", {value: !0}), In.default = void 0;
		var Di = {
			id: "actions/drop", install: function (e) {
				var n = e.actions, r = e.interactStatic, i = e.Interactable, a = e.defaults;
				e.usePlugin(x.default), i.prototype.dropzone = function (u) {
					return function (p, c) {
						if (f.default.object(c)) {
							if (p.options.drop.enabled = c.enabled !== !1, c.listeners) {
								var d = (0, Bt.default)(c.listeners), b = Object.keys(d).reduce(function (_, w) {
									return _[/^(enter|leave)/.test(w) ? "drag".concat(w) : /^(activate|deactivate|move)/.test(w) ? "drop".concat(w) : w] = d[w], _
								}, {});
								p.off(p.options.drop.listeners), p.on(b), p.options.drop.listeners = b
							}
							return f.default.func(c.ondrop) && p.on("drop", c.ondrop), f.default.func(c.ondropactivate) && p.on("dropactivate", c.ondropactivate), f.default.func(c.ondropdeactivate) && p.on("dropdeactivate", c.ondropdeactivate), f.default.func(c.ondragenter) && p.on("dragenter", c.ondragenter), f.default.func(c.ondragleave) && p.on("dragleave", c.ondragleave), f.default.func(c.ondropmove) && p.on("dropmove", c.ondropmove), /^(pointer|center)$/.test(c.overlap) ? p.options.drop.overlap = c.overlap : f.default.number(c.overlap) && (p.options.drop.overlap = Math.max(Math.min(1, c.overlap), 0)), "accept" in c && (p.options.drop.accept = c.accept), "checker" in c && (p.options.drop.checker = c.checker), p
						}
						return f.default.bool(c) ? (p.options.drop.enabled = c, p) : p.options.drop
					}(this, u)
				}, i.prototype.dropCheck = function (u, p, c, d, b, _) {
					return function (w, P, M, E, I, W, A) {
						var Y = !1;
						if (!(A = A || w.getRect(W))) {
							return !!w.options.drop.checker && w.options.drop.checker(P, M, Y, w, W, E, I);
						}
						var ee = w.options.drop.overlap;
						if (ee === "pointer") {
							var se = (0, xt.default)(E, I, "drag"), he = K.getPageXY(P);
							he.x += se.x, he.y += se.y;
							var ve = he.x > A.left && he.x < A.right, ce = he.y > A.top && he.y < A.bottom;
							Y = ve && ce
						}
						var me = E.getRect(I);
						if (me && ee === "center") {
							var Ye = me.left + me.width / 2, ht = me.top + me.height / 2;
							Y = Ye >= A.left && Ye <= A.right && ht >= A.top && ht <= A.bottom
						}
						return me && f.default.number(ee) && (Y = Math.max(0, Math.min(A.right, me.right) - Math.max(A.left, me.left)) * Math.max(0, Math.min(A.bottom, me.bottom) - Math.max(A.top, me.top)) / (me.width * me.height) >= ee), w.options.drop.checker && (Y = w.options.drop.checker(P, M, Y, w, W, E, I)), Y
					}(this, u, p, c, d, b, _)
				}, r.dynamicDrop = function (u) {
					return f.default.bool(u) ? (e.dynamicDrop = u, r) : e.dynamicDrop
				}, (0, X.default)(n.phaselessTypes, {dragenter: !0, dragleave: !0, dropactivate: !0, dropdeactivate: !0, dropmove: !0, drop: !0}), n.methodDict.drop = "dropzone", e.dynamicDrop = !1, a.actions.drop = Di.defaults
			}, listeners: {
				"interactions:before-action-start": function (e) {
					var n = e.interaction;
					n.prepared.name === "drag" && (n.dropState = {cur: {dropzone: null, element: null}, prev: {dropzone: null, element: null}, rejected: null, events: null, activeDrops: []})
				}, "interactions:after-action-start": function (e, n) {
					var r = e.interaction, i = (e.event, e.iEvent);
					if (r.prepared.name === "drag") {
						var a = r.dropState;
						a.activeDrops = null, a.events = null, a.activeDrops = wr(n, r.element), a.events = xr(r, 0, i), a.events.activate && (Si(a.activeDrops, a.events.activate), n.fire("actions/drop:start", {interaction: r, dragEvent: i}))
					}
				}, "interactions:action-move": Ci, "interactions:after-action-move": function (e, n) {
					var r = e.interaction, i = e.iEvent;
					r.prepared.name === "drag" && (Er(r, r.dropState.events), n.fire("actions/drop:move", {interaction: r, dragEvent: i}), r.dropState.events = {})
				}, "interactions:action-end": function (e, n) {
					if (e.interaction.prepared.name === "drag") {
						var r = e.interaction, i = e.iEvent;
						Ci(e, n), Er(r, r.dropState.events), n.fire("actions/drop:end", {interaction: r, dragEvent: i})
					}
				}, "interactions:stop": function (e) {
					var n = e.interaction;
					if (n.prepared.name === "drag") {
						var r = n.dropState;
						r && (r.activeDrops = null, r.events = null, r.cur.dropzone = null, r.cur.element = null, r.prev.dropzone = null, r.prev.element = null, r.rejected = !1)
					}
				}
			}, getActiveDrops: wr, getDrop: ji, getDropEvents: xr, fireDropEvents: Er, defaults: {enabled: !1, accept: null, overlap: "pointer"}
		}, js = Di;
		In.default = js;
		var An = {};

		function Or(e) {
			var n = e.interaction, r = e.iEvent, i = e.phase;
			if (n.prepared.name === "gesture") {
				var a = n.pointers.map(function (b) {
					return b.pointer
				}), u = i === "start", p = i === "end", c = n.interactable.options.deltaSource;
				if (r.touches = [a[0], a[1]], u) {
					r.distance = K.touchDistance(a, c), r.box = K.touchBBox(a), r.scale = 1, r.ds = 0, r.angle = K.touchAngle(a, c), r.da = 0, n.gesture.startDistance = r.distance, n.gesture.startAngle = r.angle;
				} else if (p) {
					var d = n.prevEvent;
					r.distance = d.distance, r.box = d.box, r.scale = d.scale, r.ds = 0, r.angle = d.angle, r.da = 0
				} else {
					r.distance = K.touchDistance(a, c), r.box = K.touchBBox(a), r.scale = r.distance / n.gesture.startDistance, r.angle = K.touchAngle(a, c), r.ds = r.scale - n.gesture.scale, r.da = r.angle - n.gesture.angle;
				}
				n.gesture.distance = r.distance, n.gesture.angle = r.angle, f.default.number(r.scale) && r.scale !== 1 / 0 && !isNaN(r.scale) && (n.gesture.scale = r.scale)
			}
		}

		Object.defineProperty(An, "__esModule", {value: !0}), An.default = void 0;
		var Tr = {
			id: "actions/gesture", before: ["actions/drag", "actions/resize"], install: function (e) {
				var n = e.actions, r = e.Interactable, i = e.defaults;
				r.prototype.gesturable = function (a) {
					return f.default.object(a) ? (this.options.gesture.enabled = a.enabled !== !1, this.setPerAction("gesture", a), this.setOnEvents("gesture", a), this) : f.default.bool(a) ? (this.options.gesture.enabled = a, this) : this.options.gesture
				}, n.map.gesture = Tr, n.methodDict.gesture = "gesturable", i.actions.gesture = Tr.defaults
			}, listeners: {
				"interactions:action-start": Or, "interactions:action-move": Or, "interactions:action-end": Or, "interactions:new": function (e) {
					e.interaction.gesture = {angle: 0, distance: 0, scale: 1, startAngle: 0, startDistance: 0}
				}, "auto-start:check": function (e) {
					if (!(e.interaction.pointers.length < 2)) {
						var n = e.interactable.options.gesture;
						if (n && n.enabled) {
							return e.action = {name: "gesture"}, !1
						}
					}
				}
			}, defaults: {}, getCursor: function () {
				return ""
			}
		}, Cs = Tr;
		An.default = Cs;
		var Rn = {};

		function Ds(e, n, r, i, a, u, p) {
			if (!n) {
				return !1;
			}
			if (n === !0) {
				var c = f.default.number(u.width) ? u.width : u.right - u.left, d = f.default.number(u.height) ? u.height : u.bottom - u.top;
				if (p = Math.min(p, Math.abs((e === "left" || e === "right" ? c : d) / 2)), c < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), d < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
					var b = c >= 0 ? u.left : u.right;
					return r.x < b + p
				}
				if (e === "top") {
					var _ = d >= 0 ? u.top : u.bottom;
					return r.y < _ + p
				}
				if (e === "right") {
					return r.x > (c >= 0 ? u.right : u.left) - p;
				}
				if (e === "bottom") {
					return r.y > (d >= 0 ? u.bottom : u.top) - p
				}
			}
			return !!f.default.element(i) && (f.default.element(n) ? n === i : z.matchesUpTo(i, n, a))
		}

		function Ii(e) {
			var n = e.iEvent, r = e.interaction;
			if (r.prepared.name === "resize" && r.resizeAxes) {
				var i = n;
				r.interactable.options.resize.square ? (r.resizeAxes === "y" ? i.delta.x = i.delta.y : i.delta.y = i.delta.x, i.axes = "xy") : (i.axes = r.resizeAxes, r.resizeAxes === "x" ? i.delta.y = 0 : r.resizeAxes === "y" && (i.delta.x = 0))
			}
		}

		Object.defineProperty(Rn, "__esModule", {value: !0}), Rn.default = void 0;
		var lt = {
			id: "actions/resize", before: ["actions/drag"], install: function (e) {
				var n = e.actions, r = e.browser, i = e.Interactable, a = e.defaults;
				lt.cursors = function (u) {
					return u.isIe9 ? {x: "e-resize", y: "s-resize", xy: "se-resize", top: "n-resize", left: "w-resize", bottom: "s-resize", right: "e-resize", topleft: "se-resize", bottomright: "se-resize", topright: "ne-resize", bottomleft: "ne-resize"} : {x: "ew-resize", y: "ns-resize", xy: "nwse-resize", top: "ns-resize", left: "ew-resize", bottom: "ns-resize", right: "ew-resize", topleft: "nwse-resize", bottomright: "nwse-resize", topright: "nesw-resize", bottomleft: "nesw-resize"}
				}(r), lt.defaultMargin = r.supportsTouch || r.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function (u) {
					return function (p, c, d) {
						return f.default.object(c) ? (p.options.resize.enabled = c.enabled !== !1, p.setPerAction("resize", c), p.setOnEvents("resize", c), f.default.string(c.axis) && /^x$|^y$|^xy$/.test(c.axis) ? p.options.resize.axis = c.axis : c.axis === null && (p.options.resize.axis = d.defaults.actions.resize.axis), f.default.bool(c.preserveAspectRatio) ? p.options.resize.preserveAspectRatio = c.preserveAspectRatio : f.default.bool(c.square) && (p.options.resize.square = c.square), p) : f.default.bool(c) ? (p.options.resize.enabled = c, p) : p.options.resize
					}(this, u, e)
				}, n.map.resize = lt, n.methodDict.resize = "resizable", a.actions.resize = lt.defaults
			}, listeners: {
				"interactions:new": function (e) {
					e.interaction.resizeAxes = "xy"
				}, "interactions:action-start": function (e) {
					(function (n) {
						var r = n.iEvent, i = n.interaction;
						if (i.prepared.name === "resize" && i.prepared.edges) {
							var a = r, u = i.rect;
							i._rects = {start: (0, X.default)({}, u), corrected: (0, X.default)({}, u), previous: (0, X.default)({}, u), delta: {left: 0, right: 0, width: 0, top: 0, bottom: 0, height: 0}}, a.edges = i.prepared.edges, a.rect = i._rects.corrected, a.deltaRect = i._rects.delta
						}
					})(e), Ii(e)
				}, "interactions:action-move": function (e) {
					(function (n) {
						var r = n.iEvent, i = n.interaction;
						if (i.prepared.name === "resize" && i.prepared.edges) {
							var a = r, u = i.interactable.options.resize.invert, p = u === "reposition" || u === "negate", c = i.rect, d = i._rects, b = d.start, _ = d.corrected, w = d.delta, P = d.previous;
							if ((0, X.default)(P, _), p) {
								if ((0, X.default)(_, c), u === "reposition") {
									if (_.top > _.bottom) {
										var M = _.top;
										_.top = _.bottom, _.bottom = M
									}
									if (_.left > _.right) {
										var E = _.left;
										_.left = _.right, _.right = E
									}
								}
							} else {
								_.top = Math.min(c.top, b.bottom), _.bottom = Math.max(c.bottom, b.top), _.left = Math.min(c.left, b.right), _.right = Math.max(c.right, b.left);
							}
							for (var I in _.width = _.right - _.left, _.height = _.bottom - _.top, _) {
								w[I] = _[I] - P[I];
							}
							a.edges = i.prepared.edges, a.rect = _, a.deltaRect = w
						}
					})(e), Ii(e)
				}, "interactions:action-end": function (e) {
					var n = e.iEvent, r = e.interaction;
					if (r.prepared.name === "resize" && r.prepared.edges) {
						var i = n;
						i.edges = r.prepared.edges, i.rect = r._rects.corrected, i.deltaRect = r._rects.delta
					}
				}, "auto-start:check": function (e) {
					var n = e.interaction, r = e.interactable, i = e.element, a = e.rect, u = e.buttons;
					if (a) {
						var p = (0, X.default)({}, n.coords.cur.page), c = r.options.resize;
						if (c && c.enabled && (!n.pointerIsDown || !/mouse|pointer/.test(n.pointerType) || (u & c.mouseButtons) != 0)) {
							if (f.default.object(c.edges)) {
								var d = {left: !1, right: !1, top: !1, bottom: !1};
								for (var b in d) {
									d[b] = Ds(b, c.edges[b], p, n._latestPointer.eventTarget, i, a, c.margin || lt.defaultMargin);
								}
								d.left = d.left && !d.right, d.top = d.top && !d.bottom, (d.left || d.right || d.top || d.bottom) && (e.action = {name: "resize", edges: d})
							} else {
								var _ = c.axis !== "y" && p.x > a.right - lt.defaultMargin, w = c.axis !== "x" && p.y > a.bottom - lt.defaultMargin;
								(_ || w) && (e.action = {name: "resize", axes: (_ ? "x" : "") + (w ? "y" : "")})
							}
							return !e.action && void 0
						}
					}
				}
			}, defaults: {square: !1, preserveAspectRatio: !1, axis: "xy", margin: NaN, edges: null, invert: "none"}, cursors: null, getCursor: function (e) {
				var n = e.edges, r = e.axis, i = e.name, a = lt.cursors, u = null;
				if (r) {
					u = a[i + r];
				} else if (n) {
					for (var p = "", c = ["top", "bottom", "left", "right"], d = 0; d < c.length; d++) {
						var b = c[d];
						n[b] && (p += b)
					}
					u = a[p]
				}
				return u
			}, defaultMargin: null
		}, Is = lt;
		Rn.default = Is;
		var $t = {};
		Object.defineProperty($t, "__esModule", {value: !0}), $t.default = void 0;
		var As = {
			id: "actions", install: function (e) {
				e.usePlugin(An.default), e.usePlugin(Rn.default), e.usePlugin(x.default), e.usePlugin(In.default)
			}
		};
		$t.default = As;
		var Je = {};
		Object.defineProperty(Je, "__esModule", {value: !0}), Je.default = void 0;
		var ut, Ot, Ai = 0, Rs = {
			request: function (e) {
				return ut(e)
			}, cancel: function (e) {
				return Ot(e)
			}, init: function (e) {
				if (ut = e.requestAnimationFrame, Ot = e.cancelAnimationFrame, !ut) {
					for (var n = ["ms", "moz", "webkit", "o"], r = 0; r < n.length; r++) {
						var i = n[r];
						ut = e["".concat(i, "RequestAnimationFrame")], Ot = e["".concat(i, "CancelAnimationFrame")] || e["".concat(i, "CancelRequestAnimationFrame")]
					}
				}
				ut = ut && ut.bind(e), Ot = Ot && Ot.bind(e), ut || (ut = function (a) {
					var u = Date.now(), p = Math.max(0, 16 - (u - Ai)), c = e.setTimeout(function () {
						a(u + p)
					}, p);
					return Ai = u + p, c
				}, Ot = function (a) {
					return clearTimeout(a)
				})
			}
		};
		Je.default = Rs;
		var ct = {};
		Object.defineProperty(ct, "__esModule", {value: !0}), ct.default = void 0, ct.getContainer = zn, ct.getScroll = en, ct.getScrollSize = function (e) {
			return f.default.window(e) && (e = window.document.body), {x: e.scrollWidth, y: e.scrollHeight}
		}, ct.getScrollSizeDelta = function (e, n) {
			var r = e.interaction, i = e.element, a = r && r.interactable.options[r.prepared.name].autoScroll;
			if (!a || !a.enabled) {
				return n(), {x: 0, y: 0};
			}
			var u = zn(a.container, r.interactable, i), p = en(u);
			n();
			var c = en(u);
			return {x: c.x - p.x, y: c.y - p.y}
		};
		var te = {
			defaults: {enabled: !1, margin: 60, container: null, speed: 300}, now: Date.now, interaction: null, i: 0, x: 0, y: 0, isScrolling: !1, prevTime: 0, margin: 0, speed: 0, start: function (e) {
				te.isScrolling = !0, Je.default.cancel(te.i), e.autoScroll = te, te.interaction = e, te.prevTime = te.now(), te.i = Je.default.request(te.scroll)
			}, stop: function () {
				te.isScrolling = !1, te.interaction && (te.interaction.autoScroll = null), Je.default.cancel(te.i)
			}, scroll: function () {
				var e = te.interaction, n = e.interactable, r = e.element, i = e.prepared.name, a = n.options[i].autoScroll, u = zn(a.container, n, r), p = te.now(), c = (p - te.prevTime) / 1e3, d = a.speed * c;
				if (d >= 1) {
					var b = {x: te.x * d, y: te.y * d};
					if (b.x || b.y) {
						var _ = en(u);
						f.default.window(u) ? u.scrollBy(b.x, b.y) : u && (u.scrollLeft += b.x, u.scrollTop += b.y);
						var w = en(u), P = {x: w.x - _.x, y: w.y - _.y};
						(P.x || P.y) && n.fire({type: "autoscroll", target: r, interactable: n, delta: P, interaction: e, container: u})
					}
					te.prevTime = p
				}
				te.isScrolling && (Je.default.cancel(te.i), te.i = Je.default.request(te.scroll))
			}, check: function (e, n) {
				var r;
				return (r = e.options[n].autoScroll) == null ? void 0 : r.enabled
			}, onInteractionMove: function (e) {
				var n = e.interaction, r = e.pointer;
				if (n.interacting() && te.check(n.interactable, n.prepared.name)) {
					if (n.simulation) {
						te.x = te.y = 0;
					} else {
						var i, a, u, p, c = n.interactable, d = n.element, b = n.prepared.name, _ = c.options[b].autoScroll, w = zn(_.container, c, d);
						if (f.default.window(w)) {
							p = r.clientX < te.margin, i = r.clientY < te.margin, a = r.clientX > w.innerWidth - te.margin, u = r.clientY > w.innerHeight - te.margin;
						} else {
							var P = z.getElementClientRect(w);
							p = r.clientX < P.left + te.margin, i = r.clientY < P.top + te.margin, a = r.clientX > P.right - te.margin, u = r.clientY > P.bottom - te.margin
						}
						te.x = a ? 1 : p ? -1 : 0, te.y = u ? 1 : i ? -1 : 0, te.isScrolling || (te.margin = _.margin, te.speed = _.speed, te.start(n))
					}
				}
			}
		};

		function zn(e, n, r) {
			return (f.default.string(e) ? (0, ue.getStringOptionResult)(e, n, r) : e) || (0, l.getWindow)(r)
		}

		function en(e) {
			return f.default.window(e) && (e = window.document.body), {x: e.scrollLeft, y: e.scrollTop}
		}

		var zs = {
			id: "auto-scroll", install: function (e) {
				var n = e.defaults, r = e.actions;
				e.autoScroll = te, te.now = function () {
					return e.now()
				}, r.phaselessTypes.autoscroll = !0, n.perAction.autoScroll = te.defaults
			}, listeners: {
				"interactions:new": function (e) {
					e.interaction.autoScroll = null
				}, "interactions:destroy": function (e) {
					e.interaction.autoScroll = null, te.stop(), te.interaction && (te.interaction = null)
				}, "interactions:stop": te.stop, "interactions:action-move": function (e) {
					return te.onInteractionMove(e)
				}
			}
		}, Bs = zs;
		ct.default = Bs;
		var Ve = {};
		Object.defineProperty(Ve, "__esModule", {value: !0}), Ve.copyAction = function (e, n) {
			return e.name = n.name, e.axis = n.axis, e.edges = n.edges, e
		}, Ve.sign = void 0, Ve.warnOnce = function (e, n) {
			var r = !1;
			return function () {
				return r || (l.window.console.warn(n), r = !0), e.apply(this, arguments)
			}
		}, Ve.sign = function (e) {
			return e >= 0 ? 1 : -1
		};
		var Bn = {};

		function Ls(e) {
			return f.default.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor
		}

		function Ws(e) {
			return f.default.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker
		}

		Object.defineProperty(Bn, "__esModule", {value: !0}), Bn.default = void 0;
		var Ns = {
			id: "auto-start/interactableMethods", install: function (e) {
				var n = e.Interactable;
				n.prototype.getAction = function (r, i, a, u) {
					var p = function (c, d, b, _, w) {
						var P = c.getRect(_), M = {action: null, interactable: c, interaction: b, element: _, rect: P, buttons: d.buttons || {0: 1, 1: 4, 3: 8, 4: 16}[d.button]};
						return w.fire("auto-start:check", M), M.action
					}(this, i, a, u, e);
					return this.options.actionChecker ? this.options.actionChecker(r, i, p, this, u, a) : p
				}, n.prototype.ignoreFrom = (0, Ve.warnOnce)(function (r) {
					return this._backCompatOption("ignoreFrom", r)
				}, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), n.prototype.allowFrom = (0, Ve.warnOnce)(function (r) {
					return this._backCompatOption("allowFrom", r)
				}, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), n.prototype.actionChecker = Ws, n.prototype.styleCursor = Ls
			}
		};
		Bn.default = Ns;
		var Nt = {};

		function Ri(e, n, r, i, a) {
			return n.testIgnoreAllow(n.options[e.name], r, i) && n.options[e.name].enabled && Ln(n, r, e, a) ? e : null
		}

		function Vs(e, n, r, i, a, u, p) {
			for (var c = 0, d = i.length; c < d; c++) {
				var b = i[c], _ = a[c], w = b.getAction(n, r, e, _);
				if (w) {
					var P = Ri(w, b, _, u, p);
					if (P) {
						return {action: P, interactable: b, element: _}
					}
				}
			}
			return {action: null, interactable: null, element: null}
		}

		function zi(e, n, r, i, a) {
			var u = [], p = [], c = i;

			function d(_) {
				u.push(_), p.push(c)
			}

			for (; f.default.element(c);) {
				u = [], p = [], a.interactables.forEachMatch(c, d);
				var b = Vs(e, n, r, u, p, i, a);
				if (b.action && !b.interactable.options[b.action.name].manualStart) {
					return b;
				}
				c = z.parentNode(c)
			}
			return {action: null, interactable: null, element: null}
		}

		function Bi(e, n, r) {
			var i = n.action, a = n.interactable, u = n.element;
			i = i || {name: null}, e.interactable = a, e.element = u, (0, Ve.copyAction)(e.prepared, i), e.rect = a && i.name ? a.getRect(u) : null, Wi(e, r), r.fire("autoStart:prepared", {interaction: e})
		}

		function Ln(e, n, r, i) {
			var a = e.options, u = a[r.name].max, p = a[r.name].maxPerElement, c = i.autoStart.maxInteractions, d = 0, b = 0, _ = 0;
			if (!(u && p && c)) {
				return !1;
			}
			for (var w = 0; w < i.interactions.list.length; w++) {
				var P = i.interactions.list[w], M = P.prepared.name;
				if (P.interacting() && (++d >= c || P.interactable === e && ((b += M === r.name ? 1 : 0) >= u || P.element === n && (_++, M === r.name && _ >= p)))) {
					return !1
				}
			}
			return c > 0
		}

		function Li(e, n) {
			return f.default.number(e) ? (n.autoStart.maxInteractions = e, this) : n.autoStart.maxInteractions
		}

		function kr(e, n, r) {
			var i = r.autoStart.cursorElement;
			i && i !== e && (i.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = n, e.style.cursor = n, r.autoStart.cursorElement = n ? e : null
		}

		function Wi(e, n) {
			var r = e.interactable, i = e.element, a = e.prepared;
			if (e.pointerType === "mouse" && r && r.options.styleCursor) {
				var u = "";
				if (a.name) {
					var p = r.options[a.name].cursorChecker;
					u = f.default.func(p) ? p(a, r, i, e._interacting) : n.actions.map[a.name].getCursor(a)
				}
				kr(e.element, u || "", n)
			} else {
				n.autoStart.cursorElement && kr(n.autoStart.cursorElement, "", n)
			}
		}

		Object.defineProperty(Nt, "__esModule", {value: !0}), Nt.default = void 0;
		var Fs = {
			id: "auto-start/base", before: ["actions"], install: function (e) {
				var n = e.interactStatic, r = e.defaults;
				e.usePlugin(Bn.default), r.base.actionChecker = null, r.base.styleCursor = !0, (0, X.default)(r.perAction, {manualStart: !1, max: 1 / 0, maxPerElement: 1, allowFrom: null, ignoreFrom: null, mouseButtons: 1}), n.maxInteractions = function (i) {
					return Li(i, e)
				}, e.autoStart = {maxInteractions: 1 / 0, withinInteractionLimit: Ln, cursorElement: null}
			}, listeners: {
				"interactions:down": function (e, n) {
					var r = e.interaction, i = e.pointer, a = e.event, u = e.eventTarget;
					r.interacting() || Bi(r, zi(r, i, a, u, n), n)
				}, "interactions:move": function (e, n) {
					(function (r, i) {
						var a = r.interaction, u = r.pointer, p = r.event, c = r.eventTarget;
						a.pointerType !== "mouse" || a.pointerIsDown || a.interacting() || Bi(a, zi(a, u, p, c, i), i)
					})(e, n), function (r, i) {
						var a = r.interaction;
						if (a.pointerIsDown && !a.interacting() && a.pointerWasMoved && a.prepared.name) {
							i.fire("autoStart:before-start", r);
							var u = a.interactable, p = a.prepared.name;
							p && u && (u.options[p].manualStart || !Ln(u, a.element, a.prepared, i) ? a.stop() : (a.start(a.prepared, u, a.element), Wi(a, i)))
						}
					}(e, n)
				}, "interactions:stop": function (e, n) {
					var r = e.interaction, i = r.interactable;
					i && i.options.styleCursor && kr(r.element, "", n)
				}
			}, maxInteractions: Li, withinInteractionLimit: Ln, validateAction: Ri
		}, Hs = Fs;
		Nt.default = Hs;
		var Wn = {};
		Object.defineProperty(Wn, "__esModule", {value: !0}), Wn.default = void 0;
		var Us = {
			id: "auto-start/dragAxis", listeners: {
				"autoStart:before-start": function (e, n) {
					var r = e.interaction, i = e.eventTarget, a = e.dx, u = e.dy;
					if (r.prepared.name === "drag") {
						var p = Math.abs(a), c = Math.abs(u), d = r.interactable.options.drag, b = d.startAxis, _ = p > c ? "x" : p < c ? "y" : "xy";
						if (r.prepared.axis = d.lockAxis === "start" ? _[0] : d.lockAxis, _ !== "xy" && b !== "xy" && b !== _) {
							r.prepared.name = null;
							for (var w = i, P = function (E) {
								if (E !== r.interactable) {
									var I = r.interactable.options.drag;
									if (!I.manualStart && E.testIgnoreAllow(I, w, i)) {
										var W = E.getAction(r.downPointer, r.downEvent, r, w);
										if (W && W.name === "drag" && function (A, Y) {
											if (!Y) {
												return !1;
											}
											var ee = Y.options.drag.startAxis;
											return A === "xy" || ee === "xy" || ee === A
										}(_, E) && Nt.default.validateAction(W, E, w, i, n)) {
											return E
										}
									}
								}
							}; f.default.element(w);) {
								var M = n.interactables.forEachMatch(w, P);
								if (M) {
									r.prepared.name = "drag", r.interactable = M, r.element = w;
									break
								}
								w = (0, z.parentNode)(w)
							}
						}
					}
				}
			}
		};
		Wn.default = Us;
		var Nn = {};

		function Pr(e) {
			var n = e.prepared && e.prepared.name;
			if (!n) {
				return null;
			}
			var r = e.interactable.options;
			return r[n].hold || r[n].delay
		}

		Object.defineProperty(Nn, "__esModule", {value: !0}), Nn.default = void 0;
		var Gs = {
			id: "auto-start/hold", install: function (e) {
				var n = e.defaults;
				e.usePlugin(Nt.default), n.perAction.hold = 0, n.perAction.delay = 0
			}, listeners: {
				"interactions:new": function (e) {
					e.interaction.autoStartHoldTimer = null
				}, "autoStart:prepared": function (e) {
					var n = e.interaction, r = Pr(n);
					r > 0 && (n.autoStartHoldTimer = setTimeout(function () {
						n.start(n.prepared, n.interactable, n.element)
					}, r))
				}, "interactions:move": function (e) {
					var n = e.interaction, r = e.duplicate;
					n.autoStartHoldTimer && n.pointerWasMoved && !r && (clearTimeout(n.autoStartHoldTimer), n.autoStartHoldTimer = null)
				}, "autoStart:before-start": function (e) {
					var n = e.interaction;
					Pr(n) > 0 && (n.prepared.name = null)
				}
			}, getHoldDuration: Pr
		}, Xs = Gs;
		Nn.default = Xs;
		var tn = {};
		Object.defineProperty(tn, "__esModule", {value: !0}), tn.default = void 0;
		var Ys = {
			id: "auto-start", install: function (e) {
				e.usePlugin(Nt.default), e.usePlugin(Nn.default), e.usePlugin(Wn.default)
			}
		};
		tn.default = Ys;
		var Tt = {};

		function qs(e) {
			return /^(always|never|auto)$/.test(e) ? (this.options.preventDefault = e, this) : f.default.bool(e) ? (this.options.preventDefault = e ? "always" : "never", this) : this.options.preventDefault
		}

		function Ks(e) {
			var n = e.interaction, r = e.event;
			n.interactable && n.interactable.checkAndPreventDefault(r)
		}

		function Ni(e) {
			var n = e.Interactable;
			n.prototype.preventDefault = qs, n.prototype.checkAndPreventDefault = function (r) {
				return function (i, a, u) {
					var p = i.options.preventDefault;
					if (p !== "never") {
						if (p !== "always") {
							if (a.events.supportsPassive && /^touch(start|move)$/.test(u.type)) {
								var c = (0, l.getWindow)(u.target).document, d = a.getDocOptions(c);
								if (!d || !d.events || d.events.passive !== !1) {
									return
								}
							}
							/^(mouse|pointer|touch)*(down|start)/i.test(u.type) || f.default.element(u.target) && (0, z.matchesSelector)(u.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || u.preventDefault()
						} else {
							u.preventDefault()
						}
					}
				}(this, e, r)
			}, e.interactions.docEvents.push({
				type: "dragstart", listener: function (r) {
					for (var i = 0; i < e.interactions.list.length; i++) {
						var a = e.interactions.list[i];
						if (a.element && (a.element === r.target || (0, z.nodeContains)(a.element, r.target))) {
							return void a.interactable.checkAndPreventDefault(r)
						}
					}
				}
			})
		}

		Object.defineProperty(Tt, "__esModule", {value: !0}), Tt.default = void 0, Tt.install = Ni;
		var Zs = {
			id: "core/interactablePreventDefault", install: Ni, listeners: ["down", "move", "up", "cancel"].reduce(function (e, n) {
				return e["interactions:".concat(n)] = Ks, e
			}, {})
		};
		Tt.default = Zs;
		var Mr = {};
		Object.defineProperty(Mr, "__esModule", {value: !0}), Mr.default = void 0, Mr.default = {};
		var nn, Vn = {};
		Object.defineProperty(Vn, "__esModule", {value: !0}), Vn.default = void 0, function (e) {
			e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners"
		}(nn || (nn = {})), nn.touchAction, nn.boxSizing, nn.noListeners;
		var Js = {
			id: "dev-tools", install: function () {
			}
		};
		Vn.default = Js;
		var kt = {};
		Object.defineProperty(kt, "__esModule", {value: !0}), kt.default = function e(n) {
			var r = {};
			for (var i in n) {
				var a = n[i];
				f.default.plainObject(a) ? r[i] = e(a) : f.default.array(a) ? r[i] = pe.from(a) : r[i] = a
			}
			return r
		};
		var Pt = {};

		function Vi(e, n) {
			return function (r) {
				if (Array.isArray(r)) {
					return r
				}
			}(e) || function (r, i) {
				var a = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
				if (a != null) {
					var u, p, c = [], d = !0, b = !1;
					try {
						for (a = a.call(r); !(d = (u = a.next()).done) && (c.push(u.value), !i || c.length !== i); d = !0) {
							;
						}
					} catch (_) {
						b = !0, p = _
					} finally {
						try {
							d || a.return == null || a.return()
						} finally {
							if (b) {
								throw p
							}
						}
					}
					return c
				}
			}(e, n) || function (r, i) {
				if (r) {
					if (typeof r == "string") {
						return Fi(r, i);
					}
					var a = Object.prototype.toString.call(r).slice(8, -1);
					return a === "Object" && r.constructor && (a = r.constructor.name), a === "Map" || a === "Set" ? Array.from(r) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? Fi(r, i) : void 0
				}
			}(e, n) || function () {
				throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
			}()
		}

		function Fi(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		function Qs(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Mt(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(Pt, "__esModule", {value: !0}), Pt.default = void 0, Pt.getRectOffset = Hi;
		var $s = function () {
			function e(i) {
				(function (a, u) {
					if (!(a instanceof u)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Mt(this, "states", []), Mt(this, "startOffset", {left: 0, right: 0, top: 0, bottom: 0}), Mt(this, "startDelta", void 0), Mt(this, "result", void 0), Mt(this, "endResult", void 0), Mt(this, "edges", void 0), Mt(this, "interaction", void 0), this.interaction = i, this.result = Fn()
			}

			var n, r;
			return n = e, (r = [{
				key: "start", value: function (i, a) {
					var u = i.phase, p = this.interaction, c = function (b) {
						var _ = b.interactable.options[b.prepared.name], w = _.modifiers;
						return w && w.length ? w : ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map(function (P) {
							var M = _[P];
							return M && M.enabled && {options: M, methods: M._methods}
						}).filter(function (P) {
							return !!P
						})
					}(p);
					this.prepareStates(c), this.edges = (0, X.default)({}, p.edges), this.startOffset = Hi(p.rect, a), this.startDelta = {x: 0, y: 0};
					var d = this.fillArg({phase: u, pageCoords: a, preEnd: !1});
					return this.result = Fn(), this.startAll(d), this.result = this.setAll(d)
				}
			}, {
				key: "fillArg", value: function (i) {
					var a = this.interaction;
					return i.interaction = a, i.interactable = a.interactable, i.element = a.element, i.rect = i.rect || a.rect, i.edges = this.edges, i.startOffset = this.startOffset, i
				}
			}, {
				key: "startAll", value: function (i) {
					for (var a = 0; a < this.states.length; a++) {
						var u = this.states[a];
						u.methods.start && (i.state = u, u.methods.start(i))
					}
				}
			}, {
				key: "setAll", value: function (i) {
					var a = i.phase, u = i.preEnd, p = i.skipModifiers, c = i.rect;
					i.coords = (0, X.default)({}, i.pageCoords), i.rect = (0, X.default)({}, c);
					for (var d = p ? this.states.slice(p) : this.states, b = Fn(i.coords, i.rect), _ = 0; _ < d.length; _++) {
						var w, P = d[_], M = P.options, E = (0, X.default)({}, i.coords), I = null;
						(w = P.methods) != null && w.set && this.shouldDo(M, u, a) && (i.state = P, I = P.methods.set(i), ue.addEdges(this.interaction.edges, i.rect, {x: i.coords.x - E.x, y: i.coords.y - E.y})), b.eventProps.push(I)
					}
					b.delta.x = i.coords.x - i.pageCoords.x, b.delta.y = i.coords.y - i.pageCoords.y, b.rectDelta.left = i.rect.left - c.left, b.rectDelta.right = i.rect.right - c.right, b.rectDelta.top = i.rect.top - c.top, b.rectDelta.bottom = i.rect.bottom - c.bottom;
					var W = this.result.coords, A = this.result.rect;
					if (W && A) {
						var Y = b.rect.left !== A.left || b.rect.right !== A.right || b.rect.top !== A.top || b.rect.bottom !== A.bottom;
						b.changed = Y || W.x !== b.coords.x || W.y !== b.coords.y
					}
					return b
				}
			}, {
				key: "applyToInteraction", value: function (i) {
					var a = this.interaction, u = i.phase, p = a.coords.cur, c = a.coords.start, d = this.result, b = this.startDelta, _ = d.delta;
					u === "start" && (0, X.default)(this.startDelta, d.delta);
					for (var w = 0; w < [[c, b], [p, _]].length; w++) {
						var P = Vi([[c, b], [p, _]][w], 2), M = P[0], E = P[1];
						M.page.x += E.x, M.page.y += E.y, M.client.x += E.x, M.client.y += E.y
					}
					var I = this.result.rectDelta, W = i.rect || a.rect;
					W.left += I.left, W.right += I.right, W.top += I.top, W.bottom += I.bottom, W.width = W.right - W.left, W.height = W.bottom - W.top
				}
			}, {
				key: "setAndApply", value: function (i) {
					var a = this.interaction, u = i.phase, p = i.preEnd, c = i.skipModifiers, d = this.setAll(this.fillArg({preEnd: p, phase: u, pageCoords: i.modifiedCoords || a.coords.cur.page}));
					if (this.result = d, !d.changed && (!c || c < this.states.length) && a.interacting()) {
						return !1;
					}
					if (i.modifiedCoords) {
						var b = a.coords.cur.page, _ = {x: i.modifiedCoords.x - b.x, y: i.modifiedCoords.y - b.y};
						d.coords.x += _.x, d.coords.y += _.y, d.delta.x += _.x, d.delta.y += _.y
					}
					this.applyToInteraction(i)
				}
			}, {
				key: "beforeEnd", value: function (i) {
					var a = i.interaction, u = i.event, p = this.states;
					if (p && p.length) {
						for (var c = !1, d = 0; d < p.length; d++) {
							var b = p[d];
							i.state = b;
							var _ = b.options, w = b.methods, P = w.beforeEnd && w.beforeEnd(i);
							if (P) {
								return this.endResult = P, !1;
							}
							c = c || !c && this.shouldDo(_, !0, i.phase, !0)
						}
						c && a.move({event: u, preEnd: !0})
					}
				}
			}, {
				key: "stop", value: function (i) {
					var a = i.interaction;
					if (this.states && this.states.length) {
						var u = (0, X.default)({states: this.states, interactable: a.interactable, element: a.element, rect: null}, i);
						this.fillArg(u);
						for (var p = 0; p < this.states.length; p++) {
							var c = this.states[p];
							u.state = c, c.methods.stop && c.methods.stop(u)
						}
						this.states = null, this.endResult = null
					}
				}
			}, {
				key: "prepareStates", value: function (i) {
					this.states = [];
					for (var a = 0; a < i.length; a++) {
						var u = i[a], p = u.options, c = u.methods, d = u.name;
						this.states.push({options: p, methods: c, index: a, name: d})
					}
					return this.states
				}
			}, {
				key: "restoreInteractionCoords", value: function (i) {
					var a = i.interaction, u = a.coords, p = a.rect, c = a.modification;
					if (c.result) {
						for (var d = c.startDelta, b = c.result, _ = b.delta, w = b.rectDelta, P = [[u.start, d], [u.cur, _]], M = 0; M < P.length; M++) {
							var E = Vi(P[M], 2), I = E[0], W = E[1];
							I.page.x -= W.x, I.page.y -= W.y, I.client.x -= W.x, I.client.y -= W.y
						}
						p.left -= w.left, p.right -= w.right, p.top -= w.top, p.bottom -= w.bottom
					}
				}
			}, {
				key: "shouldDo", value: function (i, a, u, p) {
					return !(!i || i.enabled === !1 || p && !i.endOnly || i.endOnly && !a || u === "start" && !i.setStart)
				}
			}, {
				key: "copyFrom", value: function (i) {
					this.startOffset = i.startOffset, this.startDelta = i.startDelta, this.edges = i.edges, this.states = i.states.map(function (a) {
						return (0, kt.default)(a)
					}), this.result = Fn((0, X.default)({}, i.result.coords), (0, X.default)({}, i.result.rect))
				}
			}, {
				key: "destroy", value: function () {
					for (var i in this) {
						this[i] = null
					}
				}
			}]) && Qs(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();

		function Fn(e, n) {
			return {rect: n, coords: e, delta: {x: 0, y: 0}, rectDelta: {left: 0, right: 0, top: 0, bottom: 0}, eventProps: [], changed: !0}
		}

		function Hi(e, n) {
			return e ? {left: n.x - e.left, top: n.y - e.top, right: e.right - n.x, bottom: e.bottom - n.y} : {left: 0, top: 0, right: 0, bottom: 0}
		}

		Pt.default = $s;
		var Se = {};

		function Hn(e) {
			var n = e.iEvent, r = e.interaction.modification.result;
			r && (n.modifiers = r.eventProps)
		}

		Object.defineProperty(Se, "__esModule", {value: !0}), Se.addEventModifiers = Hn, Se.default = void 0, Se.makeModifier = function (e, n) {
			var r = e.defaults, i = {start: e.start, set: e.set, beforeEnd: e.beforeEnd, stop: e.stop}, a = function (u) {
				var p = u || {};
				for (var c in p.enabled = p.enabled !== !1, r) {
					c in p || (p[c] = r[c]);
				}
				var d = {
					options: p, methods: i, name: n, enable: function () {
						return p.enabled = !0, d
					}, disable: function () {
						return p.enabled = !1, d
					}
				};
				return d
			};
			return n && typeof n == "string" && (a._defaults = r, a._methods = i), a
		};
		var ea = {
			id: "modifiers/base", before: ["actions"], install: function (e) {
				e.defaults.perAction.modifiers = []
			}, listeners: {
				"interactions:new": function (e) {
					var n = e.interaction;
					n.modification = new Pt.default(n)
				}, "interactions:before-action-start": function (e) {
					var n = e.interaction.modification;
					n.start(e, e.interaction.coords.start.page), e.interaction.edges = n.edges, n.applyToInteraction(e)
				}, "interactions:before-action-move": function (e) {
					return e.interaction.modification.setAndApply(e)
				}, "interactions:before-action-end": function (e) {
					return e.interaction.modification.beforeEnd(e)
				}, "interactions:action-start": Hn, "interactions:action-move": Hn, "interactions:action-end": Hn, "interactions:after-action-start": function (e) {
					return e.interaction.modification.restoreInteractionCoords(e)
				}, "interactions:after-action-move": function (e) {
					return e.interaction.modification.restoreInteractionCoords(e)
				}, "interactions:stop": function (e) {
					return e.interaction.modification.stop(e)
				}
			}
		}, ta = ea;
		Se.default = ta;
		var rn = {};
		Object.defineProperty(rn, "__esModule", {value: !0}), rn.defaults = void 0, rn.defaults = {base: {preventDefault: "auto", deltaSource: "page"}, perAction: {enabled: !1, origin: {x: 0, y: 0}}, actions: {}};
		var on = {};

		function Sr(e) {
			return Sr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, Sr(e)
		}

		function na(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function jr(e, n) {
			return jr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, i) {
				return r.__proto__ = i, r
			}, jr(e, n)
		}

		function ra(e, n) {
			if (n && (Sr(n) === "object" || typeof n == "function")) {
				return n;
			}
			if (n !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return ge(e)
		}

		function ge(e) {
			if (e === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return e
		}

		function Un(e) {
			return Un = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (n) {
				return n.__proto__ || Object.getPrototypeOf(n)
			}, Un(e)
		}

		function we(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(on, "__esModule", {value: !0}), on.InteractEvent = void 0;
		var Ui = function (e) {
			(function (c, d) {
				if (typeof d != "function" && d !== null) {
					throw new TypeError("Super expression must either be null or a function");
				}
				c.prototype = Object.create(d && d.prototype, {constructor: {value: c, writable: !0, configurable: !0}}), Object.defineProperty(c, "prototype", {writable: !1}), d && jr(c, d)
			})(p, e);
			var n, r, i, a, u = (i = p, a = function () {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) {
					return !1;
				}
				if (typeof Proxy == "function") {
					return !0;
				}
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
					})), !0
				} catch {
					return !1
				}
			}(), function () {
				var c, d = Un(i);
				if (a) {
					var b = Un(this).constructor;
					c = Reflect.construct(d, arguments, b)
				} else {
					c = d.apply(this, arguments);
				}
				return ra(this, c)
			});

			function p(c, d, b, _, w, P, M) {
				var E;
				(function (ve, ce) {
					if (!(ve instanceof ce)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, p), we(ge(E = u.call(this, c)), "relatedTarget", null), we(ge(E), "screenX", void 0), we(ge(E), "screenY", void 0), we(ge(E), "button", void 0), we(ge(E), "buttons", void 0), we(ge(E), "ctrlKey", void 0), we(ge(E), "shiftKey", void 0), we(ge(E), "altKey", void 0), we(ge(E), "metaKey", void 0), we(ge(E), "page", void 0), we(ge(E), "client", void 0), we(ge(E), "delta", void 0), we(ge(E), "rect", void 0), we(ge(E), "x0", void 0), we(ge(E), "y0", void 0), we(ge(E), "t0", void 0), we(ge(E), "dt", void 0), we(ge(E), "duration", void 0), we(ge(E), "clientX0", void 0), we(ge(E), "clientY0", void 0), we(ge(E), "velocity", void 0), we(ge(E), "speed", void 0), we(ge(E), "swipe", void 0), we(ge(E), "axes", void 0), we(ge(E), "preEnd", void 0), w = w || c.element;
				var I = c.interactable, W = (I && I.options || rn.defaults).deltaSource, A = (0, xt.default)(I, w, b), Y = _ === "start", ee = _ === "end", se = Y ? ge(E) : c.prevEvent, he = Y ? c.coords.start : ee ? {page: se.page, client: se.client, timeStamp: c.coords.cur.timeStamp} : c.coords.cur;
				return E.page = (0, X.default)({}, he.page), E.client = (0, X.default)({}, he.client), E.rect = (0, X.default)({}, c.rect), E.timeStamp = he.timeStamp, ee || (E.page.x -= A.x, E.page.y -= A.y, E.client.x -= A.x, E.client.y -= A.y), E.ctrlKey = d.ctrlKey, E.altKey = d.altKey, E.shiftKey = d.shiftKey, E.metaKey = d.metaKey, E.button = d.button, E.buttons = d.buttons, E.target = w, E.currentTarget = w, E.preEnd = P, E.type = M || b + (_ || ""), E.interactable = I, E.t0 = Y ? c.pointers[c.pointers.length - 1].downTime : se.t0, E.x0 = c.coords.start.page.x - A.x, E.y0 = c.coords.start.page.y - A.y, E.clientX0 = c.coords.start.client.x - A.x, E.clientY0 = c.coords.start.client.y - A.y, E.delta = Y || ee ? {x: 0, y: 0} : {x: E[W].x - se[W].x, y: E[W].y - se[W].y}, E.dt = c.coords.delta.timeStamp, E.duration = E.timeStamp - E.t0, E.velocity = (0, X.default)({}, c.coords.velocity[W]), E.speed = (0, pt.default)(E.velocity.x, E.velocity.y), E.swipe = ee || _ === "inertiastart" ? E.getSwipe() : null, E
			}

			return n = p, (r = [{
				key: "getSwipe", value: function () {
					var c = this._interaction;
					if (c.prevEvent.speed < 600 || this.timeStamp - c.prevEvent.timeStamp > 150) {
						return null;
					}
					var d = 180 * Math.atan2(c.prevEvent.velocityY, c.prevEvent.velocityX) / Math.PI;
					d < 0 && (d += 360);
					var b = 112.5 <= d && d < 247.5, _ = 202.5 <= d && d < 337.5;
					return {up: _, down: !_ && 22.5 <= d && d < 157.5, left: b, right: !b && (292.5 <= d || d < 67.5), angle: d, speed: c.prevEvent.speed, velocity: {x: c.prevEvent.velocityX, y: c.prevEvent.velocityY}}
				}
			}, {
				key: "preventDefault", value: function () {
				}
			}, {
				key: "stopImmediatePropagation", value: function () {
					this.immediatePropagationStopped = this.propagationStopped = !0
				}
			}, {
				key: "stopPropagation", value: function () {
					this.propagationStopped = !0
				}
			}]) && na(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), p
		}(Lt.BaseEvent);
		on.InteractEvent = Ui, Object.defineProperties(Ui.prototype, {
			pageX: {
				get: function () {
					return this.page.x
				}, set: function (e) {
					this.page.x = e
				}
			}, pageY: {
				get: function () {
					return this.page.y
				}, set: function (e) {
					this.page.y = e
				}
			}, clientX: {
				get: function () {
					return this.client.x
				}, set: function (e) {
					this.client.x = e
				}
			}, clientY: {
				get: function () {
					return this.client.y
				}, set: function (e) {
					this.client.y = e
				}
			}, dx: {
				get: function () {
					return this.delta.x
				}, set: function (e) {
					this.delta.x = e
				}
			}, dy: {
				get: function () {
					return this.delta.y
				}, set: function (e) {
					this.delta.y = e
				}
			}, velocityX: {
				get: function () {
					return this.velocity.x
				}, set: function (e) {
					this.velocity.x = e
				}
			}, velocityY: {
				get: function () {
					return this.velocity.y
				}, set: function (e) {
					this.velocity.y = e
				}
			}
		});
		var sn = {};

		function Gi(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function ia(e, n, r) {
			return n && Gi(e.prototype, n), r && Gi(e, r), Object.defineProperty(e, "prototype", {writable: !1}), e
		}

		function an(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(sn, "__esModule", {value: !0}), sn.PointerInfo = void 0;
		var oa = ia(function e(n, r, i, a, u) {
			(function (p, c) {
				if (!(p instanceof c)) {
					throw new TypeError("Cannot call a class as a function")
				}
			})(this, e), an(this, "id", void 0), an(this, "pointer", void 0), an(this, "event", void 0), an(this, "downTime", void 0), an(this, "downTarget", void 0), this.id = n, this.pointer = r, this.event = i, this.downTime = a, this.downTarget = u
		});
		sn.PointerInfo = oa;
		var Gn, Xn, Be = {};

		function sa(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Oe(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(Be, "__esModule", {value: !0}), Be.Interaction = void 0, Object.defineProperty(Be, "PointerInfo", {
			enumerable: !0, get: function () {
				return sn.PointerInfo
			}
		}), Be.default = Be._ProxyValues = Be._ProxyMethods = void 0, Be._ProxyValues = Gn, function (e) {
			e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = ""
		}(Gn || (Be._ProxyValues = Gn = {})), Be._ProxyMethods = Xn, function (e) {
			e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = ""
		}(Xn || (Be._ProxyMethods = Xn = {}));
		var aa = 0, Xi = function () {
			function e(i) {
				var a = this, u = i.pointerType, p = i.scopeFire;
				(function (P, M) {
					if (!(P instanceof M)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Oe(this, "interactable", null), Oe(this, "element", null), Oe(this, "rect", null), Oe(this, "_rects", void 0), Oe(this, "edges", null), Oe(this, "_scopeFire", void 0), Oe(this, "prepared", {name: null, axis: null, edges: null}), Oe(this, "pointerType", void 0), Oe(this, "pointers", []), Oe(this, "downEvent", null), Oe(this, "downPointer", {}), Oe(this, "_latestPointer", {pointer: null, event: null, eventTarget: null}), Oe(this, "prevEvent", null), Oe(this, "pointerIsDown", !1), Oe(this, "pointerWasMoved", !1), Oe(this, "_interacting", !1), Oe(this, "_ending", !1), Oe(this, "_stopped", !0), Oe(this, "_proxy", null), Oe(this, "simulation", null), Oe(this, "doMove", (0, Ve.warnOnce)(function (P) {
					this.move(P)
				}, "The interaction.doMove() method has been renamed to interaction.move()")), Oe(this, "coords", {start: K.newCoords(), prev: K.newCoords(), cur: K.newCoords(), delta: K.newCoords(), velocity: K.newCoords()}), Oe(this, "_id", aa++), this._scopeFire = p, this.pointerType = u;
				var c = this;
				this._proxy = {};
				var d = function (P) {
					Object.defineProperty(a._proxy, P, {
						get: function () {
							return c[P]
						}
					})
				};
				for (var b in Gn) {
					d(b);
				}
				var _ = function (P) {
					Object.defineProperty(a._proxy, P, {
						value: function () {
							return c[P].apply(c, arguments)
						}
					})
				};
				for (var w in Xn) {
					_(w);
				}
				this._scopeFire("interactions:new", {interaction: this})
			}

			var n, r;
			return n = e, r = [{
				key: "pointerMoveTolerance", get: function () {
					return 1
				}
			}, {
				key: "pointerDown", value: function (i, a, u) {
					var p = this.updatePointer(i, a, u, !0), c = this.pointers[p];
					this._scopeFire("interactions:down", {pointer: i, event: a, eventTarget: u, pointerIndex: p, pointerInfo: c, type: "down", interaction: this})
				}
			}, {
				key: "start", value: function (i, a, u) {
					return !(this.interacting() || !this.pointerIsDown || this.pointers.length < (i.name === "gesture" ? 2 : 1) || !a.options[i.name].enabled) && ((0, Ve.copyAction)(this.prepared, i), this.interactable = a, this.element = u, this.rect = a.getRect(u), this.edges = this.prepared.edges ? (0, X.default)({}, this.prepared.edges) : {left: !0, right: !0, top: !0, bottom: !0}, this._stopped = !1, this._interacting = this._doPhase({interaction: this, event: this.downEvent, phase: "start"}) && !this._stopped, this._interacting)
				}
			}, {
				key: "pointerMove", value: function (i, a, u) {
					this.simulation || this.modification && this.modification.endResult || this.updatePointer(i, a, u, !1);
					var p, c, d = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
					this.pointerIsDown && !this.pointerWasMoved && (p = this.coords.cur.client.x - this.coords.start.client.x, c = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = (0, pt.default)(p, c) > this.pointerMoveTolerance);
					var b = this.getPointerIndex(i), _ = {pointer: i, pointerIndex: b, pointerInfo: this.pointers[b], event: a, type: "move", eventTarget: u, dx: p, dy: c, duplicate: d, interaction: this};
					d || K.setCoordVelocity(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", _), d || this.simulation || (this.interacting() && (_.type = null, this.move(_)), this.pointerWasMoved && K.copyCoords(this.coords.prev, this.coords.cur))
				}
			}, {
				key: "move", value: function (i) {
					i && i.event || K.setZeroCoords(this.coords.delta), (i = (0, X.default)({pointer: this._latestPointer.pointer, event: this._latestPointer.event, eventTarget: this._latestPointer.eventTarget, interaction: this}, i || {})).phase = "move", this._doPhase(i)
				}
			}, {
				key: "pointerUp", value: function (i, a, u, p) {
					var c = this.getPointerIndex(i);
					c === -1 && (c = this.updatePointer(i, a, u, !1));
					var d = /cancel$/i.test(a.type) ? "cancel" : "up";
					this._scopeFire("interactions:".concat(d), {pointer: i, pointerIndex: c, pointerInfo: this.pointers[c], event: a, eventTarget: u, type: d, curEventTarget: p, interaction: this}), this.simulation || this.end(a), this.removePointer(i, a)
				}
			}, {
				key: "documentBlur", value: function (i) {
					this.end(i), this._scopeFire("interactions:blur", {event: i, type: "blur", interaction: this})
				}
			}, {
				key: "end", value: function (i) {
					var a;
					this._ending = !0, i = i || this._latestPointer.event, this.interacting() && (a = this._doPhase({event: i, interaction: this, phase: "end"})), this._ending = !1, a === !0 && this.stop()
				}
			}, {
				key: "currentAction", value: function () {
					return this._interacting ? this.prepared.name : null
				}
			}, {
				key: "interacting", value: function () {
					return this._interacting
				}
			}, {
				key: "stop", value: function () {
					this._scopeFire("interactions:stop", {interaction: this}), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null
				}
			}, {
				key: "getPointerIndex", value: function (i) {
					var a = K.getPointerId(i);
					return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : pe.findIndex(this.pointers, function (u) {
						return u.id === a
					})
				}
			}, {
				key: "getPointerInfo", value: function (i) {
					return this.pointers[this.getPointerIndex(i)]
				}
			}, {
				key: "updatePointer", value: function (i, a, u, p) {
					var c = K.getPointerId(i), d = this.getPointerIndex(i), b = this.pointers[d];
					return p = p !== !1 && (p || /(down|start)$/i.test(a.type)), b ? b.pointer = i : (b = new sn.PointerInfo(c, i, a, null, null), d = this.pointers.length, this.pointers.push(b)), K.setCoords(this.coords.cur, this.pointers.map(function (_) {
						return _.pointer
					}), this._now()), K.setCoordDeltas(this.coords.delta, this.coords.prev, this.coords.cur), p && (this.pointerIsDown = !0, b.downTime = this.coords.cur.timeStamp, b.downTarget = u, K.pointerExtend(this.downPointer, i), this.interacting() || (K.copyCoords(this.coords.start, this.coords.cur), K.copyCoords(this.coords.prev, this.coords.cur), this.downEvent = a, this.pointerWasMoved = !1)), this._updateLatestPointer(i, a, u), this._scopeFire("interactions:update-pointer", {pointer: i, event: a, eventTarget: u, down: p, pointerInfo: b, pointerIndex: d, interaction: this}), d
				}
			}, {
				key: "removePointer", value: function (i, a) {
					var u = this.getPointerIndex(i);
					if (u !== -1) {
						var p = this.pointers[u];
						this._scopeFire("interactions:remove-pointer", {pointer: i, event: a, eventTarget: null, pointerIndex: u, pointerInfo: p, interaction: this}), this.pointers.splice(u, 1), this.pointerIsDown = !1
					}
				}
			}, {
				key: "_updateLatestPointer", value: function (i, a, u) {
					this._latestPointer.pointer = i, this._latestPointer.event = a, this._latestPointer.eventTarget = u
				}
			}, {
				key: "destroy", value: function () {
					this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null
				}
			}, {
				key: "_createPreparedEvent", value: function (i, a, u, p) {
					return new on.InteractEvent(this, i, this.prepared.name, a, this.element, u, p)
				}
			}, {
				key: "_fireEvent", value: function (i) {
					var a;
					(a = this.interactable) == null || a.fire(i), (!this.prevEvent || i.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = i)
				}
			}, {
				key: "_doPhase", value: function (i) {
					var a = i.event, u = i.phase, p = i.preEnd, c = i.type, d = this.rect;
					if (d && u === "move" && (ue.addEdges(this.edges, d, this.coords.delta[this.interactable.options.deltaSource]), d.width = d.right - d.left, d.height = d.bottom - d.top), this._scopeFire("interactions:before-action-".concat(u), i) === !1) {
						return !1;
					}
					var b = i.iEvent = this._createPreparedEvent(a, u, p, c);
					return this._scopeFire("interactions:action-".concat(u), i), u === "start" && (this.prevEvent = b), this._fireEvent(b), this._scopeFire("interactions:after-action-".concat(u), i), !0
				}
			}, {
				key: "_now", value: function () {
					return Date.now()
				}
			}], r && sa(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();
		Be.Interaction = Xi;
		var la = Xi;
		Be.default = la;
		var gt = {};

		function Yi(e) {
			e.pointerIsDown && (Dr(e.coords.cur, e.offset.total), e.offset.pending.x = 0, e.offset.pending.y = 0)
		}

		function qi(e) {
			Cr(e.interaction)
		}

		function Cr(e) {
			if (!function (r) {
				return !(!r.offset.pending.x && !r.offset.pending.y)
			}(e)) {
				return !1;
			}
			var n = e.offset.pending;
			return Dr(e.coords.cur, n), Dr(e.coords.delta, n), ue.addEdges(e.edges, e.rect, n), n.x = 0, n.y = 0, !0
		}

		function ua(e) {
			var n = e.x, r = e.y;
			this.offset.pending.x += n, this.offset.pending.y += r, this.offset.total.x += n, this.offset.total.y += r
		}

		function Dr(e, n) {
			var r = e.page, i = e.client, a = n.x, u = n.y;
			r.x += a, r.y += u, i.x += a, i.y += u
		}

		Object.defineProperty(gt, "__esModule", {value: !0}), gt.addTotal = Yi, gt.applyPending = Cr, gt.default = void 0, Be._ProxyMethods.offsetBy = "";
		var ca = {
			id: "offset", before: ["modifiers", "pointer-events", "actions", "inertia"], install: function (e) {
				e.Interaction.prototype.offsetBy = ua
			}, listeners: {
				"interactions:new": function (e) {
					e.interaction.offset = {total: {x: 0, y: 0}, pending: {x: 0, y: 0}}
				}, "interactions:update-pointer": function (e) {
					return Yi(e.interaction)
				}, "interactions:before-action-start": qi, "interactions:before-action-move": qi, "interactions:before-action-end": function (e) {
					var n = e.interaction;
					if (Cr(n)) {
						return n.move({offset: !0}), n.end(), !1
					}
				}, "interactions:stop": function (e) {
					var n = e.interaction;
					n.offset.total.x = 0, n.offset.total.y = 0, n.offset.pending.x = 0, n.offset.pending.y = 0
				}
			}
		}, fa = ca;
		gt.default = fa;
		var St = {};

		function da(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Me(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(St, "__esModule", {value: !0}), St.default = St.InertiaState = void 0;
		var Ki = function () {
			function e(i) {
				(function (a, u) {
					if (!(a instanceof u)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Me(this, "active", !1), Me(this, "isModified", !1), Me(this, "smoothEnd", !1), Me(this, "allowResume", !1), Me(this, "modification", void 0), Me(this, "modifierCount", 0), Me(this, "modifierArg", void 0), Me(this, "startCoords", void 0), Me(this, "t0", 0), Me(this, "v0", 0), Me(this, "te", 0), Me(this, "targetOffset", void 0), Me(this, "modifiedOffset", void 0), Me(this, "currentOffset", void 0), Me(this, "lambda_v0", 0), Me(this, "one_ve_v0", 0), Me(this, "timeout", void 0), Me(this, "interaction", void 0), this.interaction = i
			}

			var n, r;
			return n = e, (r = [{
				key: "start", value: function (i) {
					var a = this.interaction, u = Yn(a);
					if (!u || !u.enabled) {
						return !1;
					}
					var p = a.coords.velocity.client, c = (0, pt.default)(p.x, p.y), d = this.modification || (this.modification = new Pt.default(a));
					if (d.copyFrom(a.modification), this.t0 = a._now(), this.allowResume = u.allowResume, this.v0 = c, this.currentOffset = {x: 0, y: 0}, this.startCoords = a.coords.cur.page, this.modifierArg = d.fillArg({pageCoords: this.startCoords, preEnd: !0, phase: "inertiastart"}), this.t0 - a.coords.cur.timeStamp < 50 && c > u.minSpeed && c > u.endSpeed) {
						this.startInertia();
					} else {
						if (d.result = d.setAll(this.modifierArg), !d.result.changed) {
							return !1;
						}
						this.startSmoothEnd()
					}
					return a.modification.result.rect = null, a.offsetBy(this.targetOffset), a._doPhase({interaction: a, event: i, phase: "inertiastart"}), a.offsetBy({x: -this.targetOffset.x, y: -this.targetOffset.y}), a.modification.result.rect = null, this.active = !0, a.simulation = this, !0
				}
			}, {
				key: "startInertia", value: function () {
					var i = this, a = this.interaction.coords.velocity.client, u = Yn(this.interaction), p = u.resistance, c = -Math.log(u.endSpeed / this.v0) / p;
					this.targetOffset = {x: (a.x - c) / p, y: (a.y - c) / p}, this.te = c, this.lambda_v0 = p / this.v0, this.one_ve_v0 = 1 - u.endSpeed / this.v0;
					var d = this.modification, b = this.modifierArg;
					b.pageCoords = {x: this.startCoords.x + this.targetOffset.x, y: this.startCoords.y + this.targetOffset.y}, d.result = d.setAll(b), d.result.changed && (this.isModified = !0, this.modifiedOffset = {x: this.targetOffset.x + d.result.delta.x, y: this.targetOffset.y + d.result.delta.y}), this.onNextFrame(function () {
						return i.inertiaTick()
					})
				}
			}, {
				key: "startSmoothEnd", value: function () {
					var i = this;
					this.smoothEnd = !0, this.isModified = !0, this.targetOffset = {x: this.modification.result.delta.x, y: this.modification.result.delta.y}, this.onNextFrame(function () {
						return i.smoothEndTick()
					})
				}
			}, {
				key: "onNextFrame", value: function (i) {
					var a = this;
					this.timeout = Je.default.request(function () {
						a.active && i()
					})
				}
			}, {
				key: "inertiaTick", value: function () {
					var i, a, u, p, c, d = this, b = this.interaction, _ = Yn(b).resistance, w = (b._now() - this.t0) / 1e3;
					if (w < this.te) {
						var P, M = 1 - (Math.exp(-_ * w) - this.lambda_v0) / this.one_ve_v0;
						this.isModified ? (i = this.targetOffset.x, a = this.targetOffset.y, u = this.modifiedOffset.x, p = this.modifiedOffset.y, P = {x: Zi(c = M, 0, i, u), y: Zi(c, 0, a, p)}) : P = {x: this.targetOffset.x * M, y: this.targetOffset.y * M};
						var E = {x: P.x - this.currentOffset.x, y: P.y - this.currentOffset.y};
						this.currentOffset.x += E.x, this.currentOffset.y += E.y, b.offsetBy(E), b.move(), this.onNextFrame(function () {
							return d.inertiaTick()
						})
					} else {
						b.offsetBy({x: this.modifiedOffset.x - this.currentOffset.x, y: this.modifiedOffset.y - this.currentOffset.y}), this.end()
					}
				}
			}, {
				key: "smoothEndTick", value: function () {
					var i = this, a = this.interaction, u = a._now() - this.t0, p = Yn(a).smoothEndDuration;
					if (u < p) {
						var c = {x: Ji(u, 0, this.targetOffset.x, p), y: Ji(u, 0, this.targetOffset.y, p)}, d = {x: c.x - this.currentOffset.x, y: c.y - this.currentOffset.y};
						this.currentOffset.x += d.x, this.currentOffset.y += d.y, a.offsetBy(d), a.move({skipModifiers: this.modifierCount}), this.onNextFrame(function () {
							return i.smoothEndTick()
						})
					} else {
						a.offsetBy({x: this.targetOffset.x - this.currentOffset.x, y: this.targetOffset.y - this.currentOffset.y}), this.end()
					}
				}
			}, {
				key: "resume", value: function (i) {
					var a = i.pointer, u = i.event, p = i.eventTarget, c = this.interaction;
					c.offsetBy({x: -this.currentOffset.x, y: -this.currentOffset.y}), c.updatePointer(a, u, p, !0), c._doPhase({interaction: c, event: u, phase: "resume"}), (0, K.copyCoords)(c.coords.prev, c.coords.cur), this.stop()
				}
			}, {
				key: "end", value: function () {
					this.interaction.move(), this.interaction.end(), this.stop()
				}
			}, {
				key: "stop", value: function () {
					this.active = this.smoothEnd = !1, this.interaction.simulation = null, Je.default.cancel(this.timeout)
				}
			}]) && da(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();

		function Yn(e) {
			var n = e.interactable, r = e.prepared;
			return n && n.options && r.name && n.options[r.name].inertia
		}

		St.InertiaState = Ki;
		var ha = {
			id: "inertia", before: ["modifiers", "actions"], install: function (e) {
				var n = e.defaults;
				e.usePlugin(gt.default), e.usePlugin(Se.default), e.actions.phases.inertiastart = !0, e.actions.phases.resume = !0, n.perAction.inertia = {enabled: !1, resistance: 10, minSpeed: 100, endSpeed: 10, allowResume: !0, smoothEndDuration: 300}
			}, listeners: {
				"interactions:new": function (e) {
					var n = e.interaction;
					n.inertia = new Ki(n)
				}, "interactions:before-action-end": function (e) {
					var n = e.interaction, r = e.event;
					return (!n._interacting || n.simulation || !n.inertia.start(r)) && null
				}, "interactions:down": function (e) {
					var n = e.interaction, r = e.eventTarget, i = n.inertia;
					if (i.active) {
						for (var a = r; f.default.element(a);) {
							if (a === n.element) {
								i.resume(e);
								break
							}
							a = z.parentNode(a)
						}
					}
				}, "interactions:stop": function (e) {
					var n = e.interaction.inertia;
					n.active && n.stop()
				}, "interactions:before-action-resume": function (e) {
					var n = e.interaction.modification;
					n.stop(e), n.start(e, e.interaction.coords.cur.page), n.applyToInteraction(e)
				}, "interactions:before-action-inertiastart": function (e) {
					return e.interaction.modification.setAndApply(e)
				}, "interactions:action-resume": Se.addEventModifiers, "interactions:action-inertiastart": Se.addEventModifiers, "interactions:after-action-inertiastart": function (e) {
					return e.interaction.modification.restoreInteractionCoords(e)
				}, "interactions:after-action-resume": function (e) {
					return e.interaction.modification.restoreInteractionCoords(e)
				}
			}
		};

		function Zi(e, n, r, i) {
			var a = 1 - e;
			return a * a * n + 2 * a * e * r + e * e * i
		}

		function Ji(e, n, r, i) {
			return -r * (e /= i) * (e - 2) + n
		}

		var pa = ha;
		St.default = pa;
		var ln = {};

		function ga(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function un(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		function Qi(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				if (e.immediatePropagationStopped) {
					break;
				}
				i(e)
			}
		}

		Object.defineProperty(ln, "__esModule", {value: !0}), ln.Eventable = void 0;
		var ma = function () {
			function e(i) {
				(function (a, u) {
					if (!(a instanceof u)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), un(this, "options", void 0), un(this, "types", {}), un(this, "propagationStopped", !1), un(this, "immediatePropagationStopped", !1), un(this, "global", void 0), this.options = (0, X.default)({}, i || {})
			}

			var n, r;
			return n = e, (r = [{
				key: "fire", value: function (i) {
					var a, u = this.global;
					(a = this.types[i.type]) && Qi(i, a), !i.propagationStopped && u && (a = u[i.type]) && Qi(i, a)
				}
			}, {
				key: "on", value: function (i, a) {
					var u = (0, Bt.default)(i, a);
					for (i in u) {
						this.types[i] = pe.merge(this.types[i] || [], u[i])
					}
				}
			}, {
				key: "off", value: function (i, a) {
					var u = (0, Bt.default)(i, a);
					for (i in u) {
						var p = this.types[i];
						if (p && p.length) {
							for (var c = 0; c < u[i].length; c++) {
								var d = u[i][c], b = p.indexOf(d);
								b !== -1 && p.splice(b, 1)
							}
						}
					}
				}
			}, {
				key: "getRect", value: function (i) {
					return null
				}
			}]) && ga(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();
		ln.Eventable = ma;
		var cn = {};
		Object.defineProperty(cn, "__esModule", {value: !0}), cn.default = function (e, n) {
			if (n.phaselessTypes[e]) {
				return !0;
			}
			for (var r in n.map) {
				if (e.indexOf(r) === 0 && e.substr(r.length) in n.phases) {
					return !0;
				}
			}
			return !1
		};
		var Ir = {};
		Object.defineProperty(Ir, "__esModule", {value: !0}), Ir.createInteractStatic = function (e) {
			var n = function r(i, a) {
				var u = e.interactables.get(i, a);
				return u || ((u = e.interactables.new(i, a)).events.global = r.globalEvents), u
			};
			return n.getPointerAverage = K.pointerAverage, n.getTouchBBox = K.touchBBox, n.getTouchDistance = K.touchDistance, n.getTouchAngle = K.touchAngle, n.getElementRect = z.getElementRect, n.getElementClientRect = z.getElementClientRect, n.matchesSelector = z.matchesSelector, n.closest = z.closest, n.globalEvents = {}, n.version = "1.10.17", n.scope = e, n.use = function (r, i) {
				return this.scope.usePlugin(r, i), this
			}, n.isSet = function (r, i) {
				return !!this.scope.interactables.get(r, i && i.context)
			}, n.on = (0, Ve.warnOnce)(function (r, i, a) {
				if (f.default.string(r) && r.search(" ") !== -1 && (r = r.trim().split(/ +/)), f.default.array(r)) {
					for (var u = 0; u < r.length; u++) {
						var p = r[u];
						this.on(p, i, a)
					}
					return this
				}
				if (f.default.object(r)) {
					for (var c in r) {
						this.on(c, r[c], i);
					}
					return this
				}
				return (0, cn.default)(r, this.scope.actions) ? this.globalEvents[r] ? this.globalEvents[r].push(i) : this.globalEvents[r] = [i] : this.scope.events.add(this.scope.document, r, i, {options: a}), this
			}, "The interact.on() method is being deprecated"), n.off = (0, Ve.warnOnce)(function (r, i, a) {
				if (f.default.string(r) && r.search(" ") !== -1 && (r = r.trim().split(/ +/)), f.default.array(r)) {
					for (var u = 0; u < r.length; u++) {
						var p = r[u];
						this.off(p, i, a)
					}
					return this
				}
				if (f.default.object(r)) {
					for (var c in r) {
						this.off(c, r[c], i);
					}
					return this
				}
				var d;
				return (0, cn.default)(r, this.scope.actions) ? r in this.globalEvents && (d = this.globalEvents[r].indexOf(i)) !== -1 && this.globalEvents[r].splice(d, 1) : this.scope.events.remove(this.scope.document, r, i, a), this
			}, "The interact.off() method is being deprecated"), n.debug = function () {
				return this.scope
			}, n.supportsTouch = function () {
				return F.default.supportsTouch
			}, n.supportsPointerEvent = function () {
				return F.default.supportsPointerEvent
			}, n.stop = function () {
				for (var r = 0; r < this.scope.interactions.list.length; r++) {
					this.scope.interactions.list[r].stop();
				}
				return this
			}, n.pointerMoveTolerance = function (r) {
				return f.default.number(r) ? (this.scope.interactions.pointerMoveTolerance = r, this) : this.scope.interactions.pointerMoveTolerance
			}, n.addDocument = function (r, i) {
				this.scope.addDocument(r, i)
			}, n.removeDocument = function (r) {
				this.scope.removeDocument(r)
			}, n
		};
		var qn = {};

		function va(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function ft(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(qn, "__esModule", {value: !0}), qn.Interactable = void 0;
		var ba = function () {
			function e(i, a, u, p) {
				(function (c, d) {
					if (!(c instanceof d)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), ft(this, "options", void 0), ft(this, "_actions", void 0), ft(this, "target", void 0), ft(this, "events", new ln.Eventable), ft(this, "_context", void 0), ft(this, "_win", void 0), ft(this, "_doc", void 0), ft(this, "_scopeEvents", void 0), ft(this, "_rectChecker", void 0), this._actions = a.actions, this.target = i, this._context = a.context || u, this._win = (0, l.getWindow)((0, z.trySelector)(i) ? this._context : i), this._doc = this._win.document, this._scopeEvents = p, this.set(a)
			}

			var n, r;
			return n = e, (r = [{
				key: "_defaults", get: function () {
					return {base: {}, perAction: {}, actions: {}}
				}
			}, {
				key: "setOnEvents", value: function (i, a) {
					return f.default.func(a.onstart) && this.on("".concat(i, "start"), a.onstart), f.default.func(a.onmove) && this.on("".concat(i, "move"), a.onmove), f.default.func(a.onend) && this.on("".concat(i, "end"), a.onend), f.default.func(a.oninertiastart) && this.on("".concat(i, "inertiastart"), a.oninertiastart), this
				}
			}, {
				key: "updatePerActionListeners", value: function (i, a, u) {
					(f.default.array(a) || f.default.object(a)) && this.off(i, a), (f.default.array(u) || f.default.object(u)) && this.on(i, u)
				}
			}, {
				key: "setPerAction", value: function (i, a) {
					var u = this._defaults;
					for (var p in a) {
						var c = p, d = this.options[i], b = a[c];
						c === "listeners" && this.updatePerActionListeners(i, d.listeners, b), f.default.array(b) ? d[c] = pe.from(b) : f.default.plainObject(b) ? (d[c] = (0, X.default)(d[c] || {}, (0, kt.default)(b)), f.default.object(u.perAction[c]) && "enabled" in u.perAction[c] && (d[c].enabled = b.enabled !== !1)) : f.default.bool(b) && f.default.object(u.perAction[c]) ? d[c].enabled = b : d[c] = b
					}
				}
			}, {
				key: "getRect", value: function (i) {
					return i = i || (f.default.element(this.target) ? this.target : null), f.default.string(this.target) && (i = i || this._context.querySelector(this.target)), (0, z.getElementRect)(i)
				}
			}, {
				key: "rectChecker", value: function (i) {
					var a = this;
					return f.default.func(i) ? (this._rectChecker = i, this.getRect = function (u) {
						var p = (0, X.default)({}, a._rectChecker(u));
						return "width" in p || (p.width = p.right - p.left, p.height = p.bottom - p.top), p
					}, this) : i === null ? (delete this.getRect, delete this._rectChecker, this) : this.getRect
				}
			}, {
				key: "_backCompatOption", value: function (i, a) {
					if ((0, z.trySelector)(a) || f.default.object(a)) {
						for (var u in this.options[i] = a, this._actions.map) {
							this.options[u][i] = a;
						}
						return this
					}
					return this.options[i]
				}
			}, {
				key: "origin", value: function (i) {
					return this._backCompatOption("origin", i)
				}
			}, {
				key: "deltaSource", value: function (i) {
					return i === "page" || i === "client" ? (this.options.deltaSource = i, this) : this.options.deltaSource
				}
			}, {
				key: "context", value: function () {
					return this._context
				}
			}, {
				key: "inContext", value: function (i) {
					return this._context === i.ownerDocument || (0, z.nodeContains)(this._context, i)
				}
			}, {
				key: "testIgnoreAllow", value: function (i, a, u) {
					return !this.testIgnore(i.ignoreFrom, a, u) && this.testAllow(i.allowFrom, a, u)
				}
			}, {
				key: "testAllow", value: function (i, a, u) {
					return !i || !!f.default.element(u) && (f.default.string(i) ? (0, z.matchesUpTo)(u, i, a) : !!f.default.element(i) && (0, z.nodeContains)(i, u))
				}
			}, {
				key: "testIgnore", value: function (i, a, u) {
					return !(!i || !f.default.element(u)) && (f.default.string(i) ? (0, z.matchesUpTo)(u, i, a) : !!f.default.element(i) && (0, z.nodeContains)(i, u))
				}
			}, {
				key: "fire", value: function (i) {
					return this.events.fire(i), this
				}
			}, {
				key: "_onOff", value: function (i, a, u, p) {
					f.default.object(a) && !f.default.array(a) && (p = u, u = null);
					var c = i === "on" ? "add" : "remove", d = (0, Bt.default)(a, u);
					for (var b in d) {
						b === "wheel" && (b = F.default.wheelEvent);
						for (var _ = 0; _ < d[b].length; _++) {
							var w = d[b][_];
							(0, cn.default)(b, this._actions) ? this.events[i](b, w) : f.default.string(this.target) ? this._scopeEvents["".concat(c, "Delegate")](this.target, this._context, b, w, p) : this._scopeEvents[c](this.target, b, w, p)
						}
					}
					return this
				}
			}, {
				key: "on", value: function (i, a, u) {
					return this._onOff("on", i, a, u)
				}
			}, {
				key: "off", value: function (i, a, u) {
					return this._onOff("off", i, a, u)
				}
			}, {
				key: "set", value: function (i) {
					var a = this._defaults;
					for (var u in f.default.object(i) || (i = {}), this.options = (0, kt.default)(a.base), this._actions.methodDict) {
						var p = u, c = this._actions.methodDict[p];
						this.options[p] = {}, this.setPerAction(p, (0, X.default)((0, X.default)({}, a.perAction), a.actions[p])), this[c](i[p])
					}
					for (var d in i) {
						f.default.func(this[d]) && this[d](i[d]);
					}
					return this
				}
			}, {
				key: "unset", value: function () {
					if (f.default.string(this.target)) {
						for (var i in this._scopeEvents.delegatedEvents) {
							for (var a = this._scopeEvents.delegatedEvents[i], u = a.length - 1; u >= 0; u--) {
								var p = a[u], c = p.selector, d = p.context, b = p.listeners;
								c === this.target && d === this._context && a.splice(u, 1);
								for (var _ = b.length - 1; _ >= 0; _--) {
									this._scopeEvents.removeDelegate(this.target, this._context, i, b[_][0], b[_][1])
								}
							}
						}
					} else {
						this._scopeEvents.remove(this.target, "all")
					}
				}
			}]) && va(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();
		qn.Interactable = ba;
		var Kn = {};

		function ya(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Ar(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(Kn, "__esModule", {value: !0}), Kn.InteractableSet = void 0;
		var _a = function () {
			function e(i) {
				var a = this;
				(function (u, p) {
					if (!(u instanceof p)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Ar(this, "list", []), Ar(this, "selectorMap", {}), Ar(this, "scope", void 0), this.scope = i, i.addListeners({
					"interactable:unset": function (u) {
						var p = u.interactable, c = p.target, d = p._context, b = f.default.string(c) ? a.selectorMap[c] : c[a.scope.id], _ = pe.findIndex(b, function (w) {
							return w.context === d
						});
						b[_] && (b[_].context = null, b[_].interactable = null), b.splice(_, 1)
					}
				})
			}

			var n, r;
			return n = e, (r = [{
				key: "new", value: function (i, a) {
					a = (0, X.default)(a || {}, {actions: this.scope.actions});
					var u = new this.scope.Interactable(i, a, this.scope.document, this.scope.events), p = {context: u._context, interactable: u};
					return this.scope.addDocument(u._doc), this.list.push(u), f.default.string(i) ? (this.selectorMap[i] || (this.selectorMap[i] = []), this.selectorMap[i].push(p)) : (u.target[this.scope.id] || Object.defineProperty(i, this.scope.id, {value: [], configurable: !0}), i[this.scope.id].push(p)), this.scope.fire("interactable:new", {target: i, options: a, interactable: u, win: this.scope._win}), u
				}
			}, {
				key: "get", value: function (i, a) {
					var u = a && a.context || this.scope.document, p = f.default.string(i), c = p ? this.selectorMap[i] : i[this.scope.id];
					if (!c) {
						return null;
					}
					var d = pe.find(c, function (b) {
						return b.context === u && (p || b.interactable.inContext(i))
					});
					return d && d.interactable
				}
			}, {
				key: "forEachMatch", value: function (i, a) {
					for (var u = 0; u < this.list.length; u++) {
						var p = this.list[u], c = void 0;
						if ((f.default.string(p.target) ? f.default.element(i) && z.matchesSelector(i, p.target) : i === p.target) && p.inContext(i) && (c = a(p)), c !== void 0) {
							return c
						}
					}
				}
			}]) && ya(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();
		Kn.InteractableSet = _a;
		var Zn = {};

		function wa(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Rr(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		function zr(e, n) {
			return function (r) {
				if (Array.isArray(r)) {
					return r
				}
			}(e) || function (r, i) {
				var a = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
				if (a != null) {
					var u, p, c = [], d = !0, b = !1;
					try {
						for (a = a.call(r); !(d = (u = a.next()).done) && (c.push(u.value), !i || c.length !== i); d = !0) {
							;
						}
					} catch (_) {
						b = !0, p = _
					} finally {
						try {
							d || a.return == null || a.return()
						} finally {
							if (b) {
								throw p
							}
						}
					}
					return c
				}
			}(e, n) || function (r, i) {
				if (r) {
					if (typeof r == "string") {
						return $i(r, i);
					}
					var a = Object.prototype.toString.call(r).slice(8, -1);
					return a === "Object" && r.constructor && (a = r.constructor.name), a === "Map" || a === "Set" ? Array.from(r) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? $i(r, i) : void 0
				}
			}(e, n) || function () {
				throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
			}()
		}

		function $i(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		Object.defineProperty(Zn, "__esModule", {value: !0}), Zn.default = void 0;
		var xa = function () {
			function e(i) {
				(function (a, u) {
					if (!(a instanceof u)) {
						throw new TypeError("Cannot call a class as a function")
					}
				})(this, e), Rr(this, "currentTarget", void 0), Rr(this, "originalEvent", void 0), Rr(this, "type", void 0), this.originalEvent = i, (0, jn.default)(this, i)
			}

			var n, r;
			return n = e, (r = [{
				key: "preventOriginalDefault", value: function () {
					this.originalEvent.preventDefault()
				}
			}, {
				key: "stopPropagation", value: function () {
					this.originalEvent.stopPropagation()
				}
			}, {
				key: "stopImmediatePropagation", value: function () {
					this.originalEvent.stopImmediatePropagation()
				}
			}]) && wa(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), e
		}();

		function fn(e) {
			if (!f.default.object(e)) {
				return {capture: !!e, passive: !1};
			}
			var n = (0, X.default)({}, e);
			return n.capture = !!e.capture, n.passive = !!e.passive, n
		}

		var Ea = {
			id: "events", install: function (e) {
				var n, r = [], i = {}, a = [], u = {
					add: p, remove: c, addDelegate: function (_, w, P, M, E) {
						var I = fn(E);
						if (!i[P]) {
							i[P] = [];
							for (var W = 0; W < a.length; W++) {
								var A = a[W];
								p(A, P, d), p(A, P, b, !0)
							}
						}
						var Y = i[P], ee = pe.find(Y, function (se) {
							return se.selector === _ && se.context === w
						});
						ee || (ee = {selector: _, context: w, listeners: []}, Y.push(ee)), ee.listeners.push([M, I])
					}, removeDelegate: function (_, w, P, M, E) {
						var I, W = fn(E), A = i[P], Y = !1;
						if (A) {
							for (I = A.length - 1; I >= 0; I--) {
								var ee = A[I];
								if (ee.selector === _ && ee.context === w) {
									for (var se = ee.listeners, he = se.length - 1; he >= 0; he--) {
										var ve = zr(se[he], 2), ce = ve[0], me = ve[1], Ye = me.capture, ht = me.passive;
										if (ce === M && Ye === W.capture && ht === W.passive) {
											se.splice(he, 1), se.length || (A.splice(I, 1), c(w, P, d), c(w, P, b, !0)), Y = !0;
											break
										}
									}
									if (Y) {
										break
									}
								}
							}
						}
					}, delegateListener: d, delegateUseCapture: b, delegatedEvents: i, documents: a, targets: r, supportsOptions: !1, supportsPassive: !1
				};

				function p(_, w, P, M) {
					var E = fn(M), I = pe.find(r, function (W) {
						return W.eventTarget === _
					});
					I || (I = {eventTarget: _, events: {}}, r.push(I)), I.events[w] || (I.events[w] = []), _.addEventListener && !pe.contains(I.events[w], P) && (_.addEventListener(w, P, u.supportsOptions ? E : E.capture), I.events[w].push(P))
				}

				function c(_, w, P, M) {
					var E = fn(M), I = pe.findIndex(r, function (he) {
						return he.eventTarget === _
					}), W = r[I];
					if (W && W.events) {
						if (w !== "all") {
							var A = !1, Y = W.events[w];
							if (Y) {
								if (P === "all") {
									for (var ee = Y.length - 1; ee >= 0; ee--) {
										c(_, w, Y[ee], E);
									}
									return
								}
								for (var se = 0; se < Y.length; se++) {
									if (Y[se] === P) {
										_.removeEventListener(w, P, u.supportsOptions ? E : E.capture), Y.splice(se, 1), Y.length === 0 && (delete W.events[w], A = !0);
										break
									}
								}
							}
							A && !Object.keys(W.events).length && r.splice(I, 1)
						} else {
							for (w in W.events) {
								W.events.hasOwnProperty(w) && c(_, w, "all")
							}
						}
					}
				}

				function d(_, w) {
					for (var P = fn(w), M = new xa(_), E = i[_.type], I = zr(K.getEventTargets(_), 1)[0], W = I; f.default.element(W);) {
						for (var A = 0; A < E.length; A++) {
							var Y = E[A], ee = Y.selector, se = Y.context;
							if (z.matchesSelector(W, ee) && z.nodeContains(se, I) && z.nodeContains(se, W)) {
								var he = Y.listeners;
								M.currentTarget = W;
								for (var ve = 0; ve < he.length; ve++) {
									var ce = zr(he[ve], 2), me = ce[0], Ye = ce[1], ht = Ye.capture, ti = Ye.passive;
									ht === P.capture && ti === P.passive && me(M)
								}
							}
						}
						W = z.parentNode(W)
					}
				}

				function b(_) {
					return d(_, !0)
				}

				return (n = e.document) == null || n.createElement("div").addEventListener("test", null, {
					get capture() {
						return u.supportsOptions = !0
					}, get passive() {
						return u.supportsPassive = !0
					}
				}), e.events = u, u
			}
		};
		Zn.default = Ea;
		var Jn = {};
		Object.defineProperty(Jn, "__esModule", {value: !0}), Jn.default = void 0;
		var Qn = {
			methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"], search: function (e) {
				for (var n = 0; n < Qn.methodOrder.length; n++) {
					var r;
					r = Qn.methodOrder[n];
					var i = Qn[r](e);
					if (i) {
						return i
					}
				}
				return null
			}, simulationResume: function (e) {
				var n = e.pointerType, r = e.eventType, i = e.eventTarget, a = e.scope;
				if (!/down|start/i.test(r)) {
					return null;
				}
				for (var u = 0; u < a.interactions.list.length; u++) {
					var p = a.interactions.list[u], c = i;
					if (p.simulation && p.simulation.allowResume && p.pointerType === n) {
						for (; c;) {
							if (c === p.element) {
								return p;
							}
							c = z.parentNode(c)
						}
					}
				}
				return null
			}, mouseOrPen: function (e) {
				var n, r = e.pointerId, i = e.pointerType, a = e.eventType, u = e.scope;
				if (i !== "mouse" && i !== "pen") {
					return null;
				}
				for (var p = 0; p < u.interactions.list.length; p++) {
					var c = u.interactions.list[p];
					if (c.pointerType === i) {
						if (c.simulation && !eo(c, r)) {
							continue;
						}
						if (c.interacting()) {
							return c;
						}
						n || (n = c)
					}
				}
				if (n) {
					return n;
				}
				for (var d = 0; d < u.interactions.list.length; d++) {
					var b = u.interactions.list[d];
					if (!(b.pointerType !== i || /down/i.test(a) && b.simulation)) {
						return b
					}
				}
				return null
			}, hasPointer: function (e) {
				for (var n = e.pointerId, r = e.scope, i = 0; i < r.interactions.list.length; i++) {
					var a = r.interactions.list[i];
					if (eo(a, n)) {
						return a
					}
				}
				return null
			}, idle: function (e) {
				for (var n = e.pointerType, r = e.scope, i = 0; i < r.interactions.list.length; i++) {
					var a = r.interactions.list[i];
					if (a.pointers.length === 1) {
						var u = a.interactable;
						if (u && (!u.options.gesture || !u.options.gesture.enabled)) {
							continue
						}
					} else if (a.pointers.length >= 2) {
						continue;
					}
					if (!a.interacting() && n === a.pointerType) {
						return a
					}
				}
				return null
			}
		};

		function eo(e, n) {
			return e.pointers.some(function (r) {
				return r.id === n
			})
		}

		var Oa = Qn;
		Jn.default = Oa;
		var $n = {};

		function Br(e) {
			return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, Br(e)
		}

		function to(e, n) {
			return function (r) {
				if (Array.isArray(r)) {
					return r
				}
			}(e) || function (r, i) {
				var a = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
				if (a != null) {
					var u, p, c = [], d = !0, b = !1;
					try {
						for (a = a.call(r); !(d = (u = a.next()).done) && (c.push(u.value), !i || c.length !== i); d = !0) {
							;
						}
					} catch (_) {
						b = !0, p = _
					} finally {
						try {
							d || a.return == null || a.return()
						} finally {
							if (b) {
								throw p
							}
						}
					}
					return c
				}
			}(e, n) || function (r, i) {
				if (r) {
					if (typeof r == "string") {
						return no(r, i);
					}
					var a = Object.prototype.toString.call(r).slice(8, -1);
					return a === "Object" && r.constructor && (a = r.constructor.name), a === "Map" || a === "Set" ? Array.from(r) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? no(r, i) : void 0
				}
			}(e, n) || function () {
				throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
			}()
		}

		function no(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		function Ta(e, n) {
			if (!(e instanceof n)) {
				throw new TypeError("Cannot call a class as a function")
			}
		}

		function ka(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Lr(e, n) {
			return Lr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, i) {
				return r.__proto__ = i, r
			}, Lr(e, n)
		}

		function Pa(e, n) {
			if (n && (Br(n) === "object" || typeof n == "function")) {
				return n;
			}
			if (n !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return function (r) {
				if (r === void 0) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}
				return r
			}(e)
		}

		function er(e) {
			return er = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (n) {
				return n.__proto__ || Object.getPrototypeOf(n)
			}, er(e)
		}

		Object.defineProperty($n, "__esModule", {value: !0}), $n.default = void 0;
		var Wr = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];

		function ro(e, n) {
			return function (r) {
				var i = n.interactions.list, a = K.getPointerType(r), u = to(K.getEventTargets(r), 2), p = u[0], c = u[1], d = [];
				if (/^touch/.test(r.type)) {
					n.prevTouchTime = n.now();
					for (var b = 0; b < r.changedTouches.length; b++) {
						var _ = r.changedTouches[b], w = {pointer: _, pointerId: K.getPointerId(_), pointerType: a, eventType: r.type, eventTarget: p, curEventTarget: c, scope: n}, P = io(w);
						d.push([w.pointer, w.eventTarget, w.curEventTarget, P])
					}
				} else {
					var M = !1;
					if (!F.default.supportsPointerEvent && /mouse/.test(r.type)) {
						for (var E = 0; E < i.length && !M; E++) {
							M = i[E].pointerType !== "mouse" && i[E].pointerIsDown;
						}
						M = M || n.now() - n.prevTouchTime < 500 || r.timeStamp === 0
					}
					if (!M) {
						var I = {pointer: r, pointerId: K.getPointerId(r), pointerType: a, eventType: r.type, curEventTarget: c, eventTarget: p, scope: n}, W = io(I);
						d.push([I.pointer, I.eventTarget, I.curEventTarget, W])
					}
				}
				for (var A = 0; A < d.length; A++) {
					var Y = to(d[A], 4), ee = Y[0], se = Y[1], he = Y[2];
					Y[3][e](ee, r, se, he)
				}
			}
		}

		function io(e) {
			var n = e.pointerType, r = e.scope, i = {interaction: Jn.default.search(e), searchDetails: e};
			return r.fire("interactions:find", i), i.interaction || r.interactions.new({pointerType: n})
		}

		function Nr(e, n) {
			var r = e.doc, i = e.scope, a = e.options, u = i.interactions.docEvents, p = i.events, c = p[n];
			for (var d in i.browser.isIOS && !a.events && (a.events = {passive: !1}), p.delegatedEvents) {
				c(r, d, p.delegateListener), c(r, d, p.delegateUseCapture, !0);
			}
			for (var b = a && a.events, _ = 0; _ < u.length; _++) {
				var w = u[_];
				c(r, w.type, w.listener, b)
			}
		}

		var Ma = {
			id: "core/interactions", install: function (e) {
				for (var n = {}, r = 0; r < Wr.length; r++) {
					var i = Wr[r];
					n[i] = ro(i, e)
				}
				var a, u = F.default.pEventTypes;

				function p() {
					for (var c = 0; c < e.interactions.list.length; c++) {
						var d = e.interactions.list[c];
						if (d.pointerIsDown && d.pointerType === "touch" && !d._interacting) {
							for (var b = function () {
								var w = d.pointers[_];
								e.documents.some(function (P) {
									var M = P.doc;
									return (0, z.nodeContains)(M, w.downTarget)
								}) || d.removePointer(w.pointer, w.event)
							}, _ = 0; _ < d.pointers.length; _++) {
								b()
							}
						}
					}
				}

				(a = j.default.PointerEvent ? [{type: u.down, listener: p}, {type: u.down, listener: n.pointerDown}, {type: u.move, listener: n.pointerMove}, {type: u.up, listener: n.pointerUp}, {type: u.cancel, listener: n.pointerUp}] : [{type: "mousedown", listener: n.pointerDown}, {type: "mousemove", listener: n.pointerMove}, {type: "mouseup", listener: n.pointerUp}, {type: "touchstart", listener: p}, {type: "touchstart", listener: n.pointerDown}, {type: "touchmove", listener: n.pointerMove}, {type: "touchend", listener: n.pointerUp}, {type: "touchcancel", listener: n.pointerUp}]).push({
					type: "blur", listener: function (c) {
						for (var d = 0; d < e.interactions.list.length; d++) {
							e.interactions.list[d].documentBlur(c)
						}
					}
				}), e.prevTouchTime = 0, e.Interaction = function (c) {
					(function (E, I) {
						if (typeof I != "function" && I !== null) {
							throw new TypeError("Super expression must either be null or a function");
						}
						E.prototype = Object.create(I && I.prototype, {constructor: {value: E, writable: !0, configurable: !0}}), Object.defineProperty(E, "prototype", {writable: !1}), I && Lr(E, I)
					})(M, c);
					var d, b, _, w, P = (_ = M, w = function () {
						if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) {
							return !1;
						}
						if (typeof Proxy == "function") {
							return !0;
						}
						try {
							return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
							})), !0
						} catch {
							return !1
						}
					}(), function () {
						var E, I = er(_);
						if (w) {
							var W = er(this).constructor;
							E = Reflect.construct(I, arguments, W)
						} else {
							E = I.apply(this, arguments);
						}
						return Pa(this, E)
					});

					function M() {
						return Ta(this, M), P.apply(this, arguments)
					}

					return d = M, (b = [{
						key: "pointerMoveTolerance", get: function () {
							return e.interactions.pointerMoveTolerance
						}, set: function (E) {
							e.interactions.pointerMoveTolerance = E
						}
					}, {
						key: "_now", value: function () {
							return e.now()
						}
					}]) && ka(d.prototype, b), Object.defineProperty(d, "prototype", {writable: !1}), M
				}(Be.default), e.interactions = {
					list: [], new: function (c) {
						c.scopeFire = function (b, _) {
							return e.fire(b, _)
						};
						var d = new e.Interaction(c);
						return e.interactions.list.push(d), d
					}, listeners: n, docEvents: a, pointerMoveTolerance: 1
				}, e.usePlugin(Tt.default)
			}, listeners: {
				"scope:add-document": function (e) {
					return Nr(e, "add")
				}, "scope:remove-document": function (e) {
					return Nr(e, "remove")
				}, "interactable:unset": function (e, n) {
					for (var r = e.interactable, i = n.interactions.list.length - 1; i >= 0; i--) {
						var a = n.interactions.list[i];
						a.interactable === r && (a.stop(), n.fire("interactions:destroy", {interaction: a}), a.destroy(), n.interactions.list.length > 2 && n.interactions.list.splice(i, 1))
					}
				}
			}, onDocSignal: Nr, doOnInteractions: ro, methodNames: Wr
		}, Sa = Ma;
		$n.default = Sa;
		var dn = {};

		function Vr(e) {
			return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, Vr(e)
		}

		function hn() {
			return hn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function (e, n, r) {
				var i = ja(e, n);
				if (i) {
					var a = Object.getOwnPropertyDescriptor(i, n);
					return a.get ? a.get.call(arguments.length < 3 ? e : r) : a.value
				}
			}, hn.apply(this, arguments)
		}

		function ja(e, n) {
			for (; !Object.prototype.hasOwnProperty.call(e, n) && (e = mt(e)) !== null;) {
				;
			}
			return e
		}

		function Fr(e, n) {
			return Fr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, i) {
				return r.__proto__ = i, r
			}, Fr(e, n)
		}

		function Ca(e, n) {
			if (n && (Vr(n) === "object" || typeof n == "function")) {
				return n;
			}
			if (n !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return function (r) {
				if (r === void 0) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}
				return r
			}(e)
		}

		function mt(e) {
			return mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (n) {
				return n.__proto__ || Object.getPrototypeOf(n)
			}, mt(e)
		}

		function oo(e, n) {
			if (!(e instanceof n)) {
				throw new TypeError("Cannot call a class as a function")
			}
		}

		function so(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function ao(e, n, r) {
			return n && so(e.prototype, n), r && so(e, r), Object.defineProperty(e, "prototype", {writable: !1}), e
		}

		function je(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(dn, "__esModule", {value: !0}), dn.Scope = void 0, dn.initScope = lo;
		var Da = function () {
			function e() {
				var n = this;
				oo(this, e), je(this, "id", "__interact_scope_".concat(Math.floor(100 * Math.random()))), je(this, "isInitialized", !1), je(this, "listenerMaps", []), je(this, "browser", F.default), je(this, "defaults", (0, kt.default)(rn.defaults)), je(this, "Eventable", ln.Eventable), je(this, "actions", {map: {}, phases: {start: !0, move: !0, end: !0}, methodDict: {}, phaselessTypes: {}}), je(this, "interactStatic", (0, Ir.createInteractStatic)(this)), je(this, "InteractEvent", on.InteractEvent), je(this, "Interactable", void 0), je(this, "interactables", new Kn.InteractableSet(this)), je(this, "_win", void 0), je(this, "document", void 0), je(this, "window", void 0), je(this, "documents", []), je(this, "_plugins", {list: [], map: {}}), je(this, "onWindowUnload", function (i) {
					return n.removeDocument(i.target)
				});
				var r = this;
				this.Interactable = function (i) {
					(function (d, b) {
						if (typeof b != "function" && b !== null) {
							throw new TypeError("Super expression must either be null or a function");
						}
						d.prototype = Object.create(b && b.prototype, {constructor: {value: d, writable: !0, configurable: !0}}), Object.defineProperty(d, "prototype", {writable: !1}), b && Fr(d, b)
					})(c, i);
					var a, u, p = (a = c, u = function () {
						if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) {
							return !1;
						}
						if (typeof Proxy == "function") {
							return !0;
						}
						try {
							return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
							})), !0
						} catch {
							return !1
						}
					}(), function () {
						var d, b = mt(a);
						if (u) {
							var _ = mt(this).constructor;
							d = Reflect.construct(b, arguments, _)
						} else {
							d = b.apply(this, arguments);
						}
						return Ca(this, d)
					});

					function c() {
						return oo(this, c), p.apply(this, arguments)
					}

					return ao(c, [{
						key: "_defaults", get: function () {
							return r.defaults
						}
					}, {
						key: "set", value: function (d) {
							return hn(mt(c.prototype), "set", this).call(this, d), r.fire("interactable:set", {options: d, interactable: this}), this
						}
					}, {
						key: "unset", value: function () {
							hn(mt(c.prototype), "unset", this).call(this);
							var d = r.interactables.list.indexOf(this);
							d < 0 || (hn(mt(c.prototype), "unset", this).call(this), r.interactables.list.splice(d, 1), r.fire("interactable:unset", {interactable: this}))
						}
					}]), c
				}(qn.Interactable)
			}

			return ao(e, [{
				key: "addListeners", value: function (n, r) {
					this.listenerMaps.push({id: r, map: n})
				}
			}, {
				key: "fire", value: function (n, r) {
					for (var i = 0; i < this.listenerMaps.length; i++) {
						var a = this.listenerMaps[i].map[n];
						if (a && a(r, this, n) === !1) {
							return !1
						}
					}
				}
			}, {
				key: "init", value: function (n) {
					return this.isInitialized ? this : lo(this, n)
				}
			}, {
				key: "pluginIsInstalled", value: function (n) {
					return this._plugins.map[n.id] || this._plugins.list.indexOf(n) !== -1
				}
			}, {
				key: "usePlugin", value: function (n, r) {
					if (!this.isInitialized) {
						return this;
					}
					if (this.pluginIsInstalled(n)) {
						return this;
					}
					if (n.id && (this._plugins.map[n.id] = n), this._plugins.list.push(n), n.install && n.install(this, r), n.listeners && n.before) {
						for (var i = 0, a = this.listenerMaps.length, u = n.before.reduce(function (c, d) {
							return c[d] = !0, c[uo(d)] = !0, c
						}, {}); i < a; i++) {
							var p = this.listenerMaps[i].id;
							if (u[p] || u[uo(p)]) {
								break
							}
						}
						this.listenerMaps.splice(i, 0, {id: n.id, map: n.listeners})
					} else {
						n.listeners && this.listenerMaps.push({id: n.id, map: n.listeners});
					}
					return this
				}
			}, {
				key: "addDocument", value: function (n, r) {
					if (this.getDocIndex(n) !== -1) {
						return !1;
					}
					var i = l.getWindow(n);
					r = r ? (0, X.default)({}, r) : {}, this.documents.push({doc: n, options: r}), this.events.documents.push(n), n !== this.document && this.events.add(i, "unload", this.onWindowUnload), this.fire("scope:add-document", {doc: n, window: i, scope: this, options: r})
				}
			}, {
				key: "removeDocument", value: function (n) {
					var r = this.getDocIndex(n), i = l.getWindow(n), a = this.documents[r].options;
					this.events.remove(i, "unload", this.onWindowUnload), this.documents.splice(r, 1), this.events.documents.splice(r, 1), this.fire("scope:remove-document", {doc: n, window: i, scope: this, options: a})
				}
			}, {
				key: "getDocIndex", value: function (n) {
					for (var r = 0; r < this.documents.length; r++) {
						if (this.documents[r].doc === n) {
							return r;
						}
					}
					return -1
				}
			}, {
				key: "getDocOptions", value: function (n) {
					var r = this.getDocIndex(n);
					return r === -1 ? null : this.documents[r].options
				}
			}, {
				key: "now", value: function () {
					return (this.window.Date || Date).now()
				}
			}]), e
		}();

		function lo(e, n) {
			return e.isInitialized = !0, f.default.window(n) && l.init(n), j.default.init(n), F.default.init(n), Je.default.init(n), e.window = n, e.document = n.document, e.usePlugin($n.default), e.usePlugin(Zn.default), e
		}

		function uo(e) {
			return e && e.replace(/\/.*$/, "")
		}

		dn.Scope = Da;
		var Ce = {};
		Object.defineProperty(Ce, "__esModule", {value: !0}), Ce.default = void 0;
		var co = new dn.Scope, Ia = co.interactStatic;
		Ce.default = Ia;
		var Aa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : void 0;
		co.init(Aa);
		var tr = {};
		Object.defineProperty(tr, "__esModule", {value: !0}), tr.default = void 0, tr.default = function () {
		};
		var nr = {};
		Object.defineProperty(nr, "__esModule", {value: !0}), nr.default = void 0, nr.default = function () {
		};
		var rr = {};

		function fo(e, n) {
			return function (r) {
				if (Array.isArray(r)) {
					return r
				}
			}(e) || function (r, i) {
				var a = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
				if (a != null) {
					var u, p, c = [], d = !0, b = !1;
					try {
						for (a = a.call(r); !(d = (u = a.next()).done) && (c.push(u.value), !i || c.length !== i); d = !0) {
							;
						}
					} catch (_) {
						b = !0, p = _
					} finally {
						try {
							d || a.return == null || a.return()
						} finally {
							if (b) {
								throw p
							}
						}
					}
					return c
				}
			}(e, n) || function (r, i) {
				if (r) {
					if (typeof r == "string") {
						return ho(r, i);
					}
					var a = Object.prototype.toString.call(r).slice(8, -1);
					return a === "Object" && r.constructor && (a = r.constructor.name), a === "Map" || a === "Set" ? Array.from(r) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? ho(r, i) : void 0
				}
			}(e, n) || function () {
				throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
			}()
		}

		function ho(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		Object.defineProperty(rr, "__esModule", {value: !0}), rr.default = void 0, rr.default = function (e) {
			var n = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter(function (i) {
				var a = fo(i, 2), u = a[0], p = a[1];
				return u in e || p in e
			}), r = function (i, a) {
				for (var u = e.range, p = e.limits, c = p === void 0 ? {left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0} : p, d = e.offset, b = d === void 0 ? {x: 0, y: 0} : d, _ = {range: u, grid: e, x: null, y: null}, w = 0; w < n.length; w++) {
					var P = fo(n[w], 2), M = P[0], E = P[1], I = Math.round((i - b.x) / e[M]), W = Math.round((a - b.y) / e[E]);
					_[M] = Math.max(c.left, Math.min(c.right, I * e[M] + b.x)), _[E] = Math.max(c.top, Math.min(c.bottom, W * e[E] + b.y))
				}
				return _
			};
			return r.grid = e, r.coordFields = n, r
		};
		var pn = {};
		Object.defineProperty(pn, "__esModule", {value: !0}), Object.defineProperty(pn, "edgeTarget", {
			enumerable: !0, get: function () {
				return tr.default
			}
		}), Object.defineProperty(pn, "elements", {
			enumerable: !0, get: function () {
				return nr.default
			}
		}), Object.defineProperty(pn, "grid", {
			enumerable: !0, get: function () {
				return rr.default
			}
		});
		var ir = {};
		Object.defineProperty(ir, "__esModule", {value: !0}), ir.default = void 0;
		var Ra = {
			id: "snappers", install: function (e) {
				var n = e.interactStatic;
				n.snappers = (0, X.default)(n.snappers || {}, pn), n.createSnapGrid = n.snappers.grid
			}
		}, za = Ra;
		ir.default = za;
		var Vt = {};

		function po(e, n) {
			var r = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var i = Object.getOwnPropertySymbols(e);
				n && (i = i.filter(function (a) {
					return Object.getOwnPropertyDescriptor(e, a).enumerable
				})), r.push.apply(r, i)
			}
			return r
		}

		function Hr(e) {
			for (var n = 1; n < arguments.length; n++) {
				var r = arguments[n] != null ? arguments[n] : {};
				n % 2 ? po(Object(r), !0).forEach(function (i) {
					Ba(e, i, r[i])
				}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : po(Object(r)).forEach(function (i) {
					Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i))
				})
			}
			return e
		}

		function Ba(e, n, r) {
			return n in e ? Object.defineProperty(e, n, {value: r, enumerable: !0, configurable: !0, writable: !0}) : e[n] = r, e
		}

		Object.defineProperty(Vt, "__esModule", {value: !0}), Vt.default = Vt.aspectRatio = void 0;
		var go = {
			start: function (e) {
				var n = e.state, r = e.rect, i = e.edges, a = e.pageCoords, u = n.options.ratio, p = n.options, c = p.equalDelta, d = p.modifiers;
				u === "preserve" && (u = r.width / r.height), n.startCoords = (0, X.default)({}, a), n.startRect = (0, X.default)({}, r), n.ratio = u, n.equalDelta = c;
				var b = n.linkedEdges = {top: i.top || i.left && !i.bottom, left: i.left || i.top && !i.right, bottom: i.bottom || i.right && !i.top, right: i.right || i.bottom && !i.left};
				if (n.xIsPrimaryAxis = !(!i.left && !i.right), n.equalDelta) {
					var _ = (b.left ? 1 : -1) * (b.top ? 1 : -1);
					n.edgeSign = {x: _, y: _}
				} else {
					n.edgeSign = {x: b.left ? -1 : 1, y: b.top ? -1 : 1};
				}
				if ((0, X.default)(e.edges, b), d && d.length) {
					var w = new Pt.default(e.interaction);
					w.copyFrom(e.interaction.modification), w.prepareStates(d), n.subModification = w, w.startAll(Hr({}, e))
				}
			}, set: function (e) {
				var n = e.state, r = e.rect, i = e.coords, a = (0, X.default)({}, i), u = n.equalDelta ? La : Wa;
				if (u(n, n.xIsPrimaryAxis, i, r), !n.subModification) {
					return null;
				}
				var p = (0, X.default)({}, r);
				(0, ue.addEdges)(n.linkedEdges, p, {x: i.x - a.x, y: i.y - a.y});
				var c = n.subModification.setAll(Hr(Hr({}, e), {}, {rect: p, edges: n.linkedEdges, pageCoords: i, prevCoords: i, prevRect: p})), d = c.delta;
				return c.changed && (u(n, Math.abs(d.x) > Math.abs(d.y), c.coords, c.rect), (0, X.default)(i, c.coords)), c.eventProps
			}, defaults: {ratio: "preserve", equalDelta: !1, modifiers: [], enabled: !1}
		};

		function La(e, n, r) {
			var i = e.startCoords, a = e.edgeSign;
			n ? r.y = i.y + (r.x - i.x) * a.y : r.x = i.x + (r.y - i.y) * a.x
		}

		function Wa(e, n, r, i) {
			var a = e.startRect, u = e.startCoords, p = e.ratio, c = e.edgeSign;
			if (n) {
				var d = i.width / p;
				r.y = u.y + (d - a.height) * c.y
			} else {
				var b = i.height * p;
				r.x = u.x + (b - a.width) * c.x
			}
		}

		Vt.aspectRatio = go;
		var Na = (0, Se.makeModifier)(go, "aspectRatio");
		Vt.default = Na;
		var jt = {};
		Object.defineProperty(jt, "__esModule", {value: !0}), jt.default = void 0;
		var mo = function () {
		};
		mo._defaults = {};
		var Va = mo;
		jt.default = Va;
		var Ur = {};
		Object.defineProperty(Ur, "__esModule", {value: !0}), Object.defineProperty(Ur, "default", {
			enumerable: !0, get: function () {
				return jt.default
			}
		});
		var ze = {};

		function Gr(e, n, r) {
			return f.default.func(e) ? ue.resolveRectLike(e, n.interactable, n.element, [r.x, r.y, n]) : ue.resolveRectLike(e, n.interactable, n.element)
		}

		Object.defineProperty(ze, "__esModule", {value: !0}), ze.default = void 0, ze.getRestrictionRect = Gr, ze.restrict = void 0;
		var vo = {
			start: function (e) {
				var n = e.rect, r = e.startOffset, i = e.state, a = e.interaction, u = e.pageCoords, p = i.options, c = p.elementRect, d = (0, X.default)({left: 0, top: 0, right: 0, bottom: 0}, p.offset || {});
				if (n && c) {
					var b = Gr(p.restriction, a, u);
					if (b) {
						var _ = b.right - b.left - n.width, w = b.bottom - b.top - n.height;
						_ < 0 && (d.left += _, d.right += _), w < 0 && (d.top += w, d.bottom += w)
					}
					d.left += r.left - n.width * c.left, d.top += r.top - n.height * c.top, d.right += r.right - n.width * (1 - c.right), d.bottom += r.bottom - n.height * (1 - c.bottom)
				}
				i.offset = d
			}, set: function (e) {
				var n = e.coords, r = e.interaction, i = e.state, a = i.options, u = i.offset, p = Gr(a.restriction, r, n);
				if (p) {
					var c = ue.xywhToTlbr(p);
					n.x = Math.max(Math.min(c.right - u.right, n.x), c.left + u.left), n.y = Math.max(Math.min(c.bottom - u.bottom, n.y), c.top + u.top)
				}
			}, defaults: {restriction: null, elementRect: null, offset: null, endOnly: !1, enabled: !1}
		};
		ze.restrict = vo;
		var Fa = (0, Se.makeModifier)(vo, "restrict");
		ze.default = Fa;
		var rt = {};
		Object.defineProperty(rt, "__esModule", {value: !0}), rt.restrictEdges = rt.default = void 0;
		var bo = {top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0}, yo = {top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0};

		function _o(e, n) {
			for (var r = ["top", "left", "bottom", "right"], i = 0; i < r.length; i++) {
				var a = r[i];
				a in e || (e[a] = n[a])
			}
			return e
		}

		var wo = {
			noInner: bo, noOuter: yo, start: function (e) {
				var n, r = e.interaction, i = e.startOffset, a = e.state, u = a.options;
				if (u) {
					var p = (0, ze.getRestrictionRect)(u.offset, r, r.coords.start.page);
					n = ue.rectToXY(p)
				}
				n = n || {x: 0, y: 0}, a.offset = {top: n.y + i.top, left: n.x + i.left, bottom: n.y - i.bottom, right: n.x - i.right}
			}, set: function (e) {
				var n = e.coords, r = e.edges, i = e.interaction, a = e.state, u = a.offset, p = a.options;
				if (r) {
					var c = (0, X.default)({}, n), d = (0, ze.getRestrictionRect)(p.inner, i, c) || {}, b = (0, ze.getRestrictionRect)(p.outer, i, c) || {};
					_o(d, bo), _o(b, yo), r.top ? n.y = Math.min(Math.max(b.top + u.top, c.y), d.top + u.top) : r.bottom && (n.y = Math.max(Math.min(b.bottom + u.bottom, c.y), d.bottom + u.bottom)), r.left ? n.x = Math.min(Math.max(b.left + u.left, c.x), d.left + u.left) : r.right && (n.x = Math.max(Math.min(b.right + u.right, c.x), d.right + u.right))
				}
			}, defaults: {inner: null, outer: null, offset: null, endOnly: !1, enabled: !1}
		};
		rt.restrictEdges = wo;
		var Ha = (0, Se.makeModifier)(wo, "restrictEdges");
		rt.default = Ha;
		var Ft = {};
		Object.defineProperty(Ft, "__esModule", {value: !0}), Ft.restrictRect = Ft.default = void 0;
		var Ua = (0, X.default)({
			get elementRect() {
				return {top: 0, left: 0, bottom: 1, right: 1}
			}, set elementRect(e) {
			}
		}, ze.restrict.defaults), xo = {start: ze.restrict.start, set: ze.restrict.set, defaults: Ua};
		Ft.restrictRect = xo;
		var Ga = (0, Se.makeModifier)(xo, "restrictRect");
		Ft.default = Ga;
		var Ht = {};
		Object.defineProperty(Ht, "__esModule", {value: !0}), Ht.restrictSize = Ht.default = void 0;
		var Xa = {width: -1 / 0, height: -1 / 0}, Ya = {width: 1 / 0, height: 1 / 0}, Eo = {
			start: function (e) {
				return rt.restrictEdges.start(e)
			}, set: function (e) {
				var n = e.interaction, r = e.state, i = e.rect, a = e.edges, u = r.options;
				if (a) {
					var p = ue.tlbrToXywh((0, ze.getRestrictionRect)(u.min, n, e.coords)) || Xa, c = ue.tlbrToXywh((0, ze.getRestrictionRect)(u.max, n, e.coords)) || Ya;
					r.options = {endOnly: u.endOnly, inner: (0, X.default)({}, rt.restrictEdges.noInner), outer: (0, X.default)({}, rt.restrictEdges.noOuter)}, a.top ? (r.options.inner.top = i.bottom - p.height, r.options.outer.top = i.bottom - c.height) : a.bottom && (r.options.inner.bottom = i.top + p.height, r.options.outer.bottom = i.top + c.height), a.left ? (r.options.inner.left = i.right - p.width, r.options.outer.left = i.right - c.width) : a.right && (r.options.inner.right = i.left + p.width, r.options.outer.right = i.left + c.width), rt.restrictEdges.set(e), r.options = u
				}
			}, defaults: {min: null, max: null, endOnly: !1, enabled: !1}
		};
		Ht.restrictSize = Eo;
		var qa = (0, Se.makeModifier)(Eo, "restrictSize");
		Ht.default = qa;
		var Xr = {};
		Object.defineProperty(Xr, "__esModule", {value: !0}), Object.defineProperty(Xr, "default", {
			enumerable: !0, get: function () {
				return jt.default
			}
		});
		var vt = {};
		Object.defineProperty(vt, "__esModule", {value: !0}), vt.snap = vt.default = void 0;
		var Oo = {
			start: function (e) {
				var n, r = e.interaction, i = e.interactable, a = e.element, u = e.rect, p = e.state, c = e.startOffset, d = p.options, b = d.offsetWithOrigin ? function (P) {
					var M = P.interaction.element;
					return (0, ue.rectToXY)((0, ue.resolveRectLike)(P.state.options.origin, null, null, [M])) || (0, xt.default)(P.interactable, M, P.interaction.prepared.name)
				}(e) : {x: 0, y: 0};
				if (d.offset === "startCoords") {
					n = {x: r.coords.start.page.x, y: r.coords.start.page.y};
				} else {
					var _ = (0, ue.resolveRectLike)(d.offset, i, a, [r]);
					(n = (0, ue.rectToXY)(_) || {x: 0, y: 0}).x += b.x, n.y += b.y
				}
				var w = d.relativePoints;
				p.offsets = u && w && w.length ? w.map(function (P, M) {
					return {index: M, relativePoint: P, x: c.left - u.width * P.x + n.x, y: c.top - u.height * P.y + n.y}
				}) : [{index: 0, relativePoint: null, x: n.x, y: n.y}]
			}, set: function (e) {
				var n = e.interaction, r = e.coords, i = e.state, a = i.options, u = i.offsets, p = (0, xt.default)(n.interactable, n.element, n.prepared.name), c = (0, X.default)({}, r), d = [];
				a.offsetWithOrigin || (c.x -= p.x, c.y -= p.y);
				for (var b = 0; b < u.length; b++) {
					for (var _ = u[b], w = c.x - _.x, P = c.y - _.y, M = 0, E = a.targets.length; M < E; M++) {
						var I, W = a.targets[M];
						(I = f.default.func(W) ? W(w, P, n._proxy, _, M) : W) && d.push({x: (f.default.number(I.x) ? I.x : w) + _.x, y: (f.default.number(I.y) ? I.y : P) + _.y, range: f.default.number(I.range) ? I.range : a.range, source: W, index: M, offset: _})
					}
				}
				for (var A = {target: null, inRange: !1, distance: 0, range: 0, delta: {x: 0, y: 0}}, Y = 0; Y < d.length; Y++) {
					var ee = d[Y], se = ee.range, he = ee.x - c.x, ve = ee.y - c.y, ce = (0, pt.default)(he, ve), me = ce <= se;
					se === 1 / 0 && A.inRange && A.range !== 1 / 0 && (me = !1), A.target && !(me ? A.inRange && se !== 1 / 0 ? ce / se < A.distance / A.range : se === 1 / 0 && A.range !== 1 / 0 || ce < A.distance : !A.inRange && ce < A.distance) || (A.target = ee, A.distance = ce, A.range = se, A.inRange = me, A.delta.x = he, A.delta.y = ve)
				}
				return A.inRange && (r.x = A.target.x, r.y = A.target.y), i.closest = A, A
			}, defaults: {range: 1 / 0, targets: null, offset: null, offsetWithOrigin: !0, origin: null, relativePoints: null, endOnly: !1, enabled: !1}
		};
		vt.snap = Oo;
		var Ka = (0, Se.makeModifier)(Oo, "snap");
		vt.default = Ka;
		var dt = {};

		function To(e, n) {
			(n == null || n > e.length) && (n = e.length);
			for (var r = 0, i = Array(n); r < n; r++) {
				i[r] = e[r];
			}
			return i
		}

		Object.defineProperty(dt, "__esModule", {value: !0}), dt.snapSize = dt.default = void 0;
		var ko = {
			start: function (e) {
				var n = e.state, r = e.edges, i = n.options;
				if (!r) {
					return null;
				}
				e.state = {options: {targets: null, relativePoints: [{x: r.left ? 0 : 1, y: r.top ? 0 : 1}], offset: i.offset || "self", origin: {x: 0, y: 0}, range: i.range}}, n.targetFields = n.targetFields || [["width", "height"], ["x", "y"]], vt.snap.start(e), n.offsets = e.state.offsets, e.state = n
			}, set: function (e) {
				var n, r, i = e.interaction, a = e.state, u = e.coords, p = a.options, c = a.offsets, d = {x: u.x - c[0].x, y: u.y - c[0].y};
				a.options = (0, X.default)({}, p), a.options.targets = [];
				for (var b = 0; b < (p.targets || []).length; b++) {
					var _ = (p.targets || [])[b], w = void 0;
					if (w = f.default.func(_) ? _(d.x, d.y, i) : _) {
						for (var P = 0; P < a.targetFields.length; P++) {
							var M = (n = a.targetFields[P], r = 2, function (A) {
								if (Array.isArray(A)) {
									return A
								}
							}(n) || function (A, Y) {
								var ee = A == null ? null : typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
								if (ee != null) {
									var se, he, ve = [], ce = !0, me = !1;
									try {
										for (ee = ee.call(A); !(ce = (se = ee.next()).done) && (ve.push(se.value), !Y || ve.length !== Y); ce = !0) {
											;
										}
									} catch (Ye) {
										me = !0, he = Ye
									} finally {
										try {
											ce || ee.return == null || ee.return()
										} finally {
											if (me) {
												throw he
											}
										}
									}
									return ve
								}
							}(n, r) || function (A, Y) {
								if (A) {
									if (typeof A == "string") {
										return To(A, Y);
									}
									var ee = Object.prototype.toString.call(A).slice(8, -1);
									return ee === "Object" && A.constructor && (ee = A.constructor.name), ee === "Map" || ee === "Set" ? Array.from(A) : ee === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(ee) ? To(A, Y) : void 0
								}
							}(n, r) || function () {
								throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
							}()), E = M[0], I = M[1];
							if (E in w || I in w) {
								w.x = w[E], w.y = w[I];
								break
							}
						}
						a.options.targets.push(w)
					}
				}
				var W = vt.snap.set(e);
				return a.options = p, W
			}, defaults: {range: 1 / 0, targets: null, offset: null, endOnly: !1, enabled: !1}
		};
		dt.snapSize = ko;
		var Za = (0, Se.makeModifier)(ko, "snapSize");
		dt.default = Za;
		var Ut = {};
		Object.defineProperty(Ut, "__esModule", {value: !0}), Ut.snapEdges = Ut.default = void 0;
		var Po = {
			start: function (e) {
				var n = e.edges;
				return n ? (e.state.targetFields = e.state.targetFields || [[n.left ? "left" : "right", n.top ? "top" : "bottom"]], dt.snapSize.start(e)) : null
			}, set: dt.snapSize.set, defaults: (0, X.default)((0, kt.default)(dt.snapSize.defaults), {targets: null, range: null, offset: {x: 0, y: 0}})
		};
		Ut.snapEdges = Po;
		var Ja = (0, Se.makeModifier)(Po, "snapEdges");
		Ut.default = Ja;
		var Yr = {};
		Object.defineProperty(Yr, "__esModule", {value: !0}), Object.defineProperty(Yr, "default", {
			enumerable: !0, get: function () {
				return jt.default
			}
		});
		var qr = {};
		Object.defineProperty(qr, "__esModule", {value: !0}), Object.defineProperty(qr, "default", {
			enumerable: !0, get: function () {
				return jt.default
			}
		});
		var Gt = {};
		Object.defineProperty(Gt, "__esModule", {value: !0}), Gt.default = void 0;
		var Qa = {aspectRatio: Vt.default, restrictEdges: rt.default, restrict: ze.default, restrictRect: Ft.default, restrictSize: Ht.default, snapEdges: Ut.default, snap: vt.default, snapSize: dt.default, spring: Yr.default, avoid: Ur.default, transform: qr.default, rubberband: Xr.default};
		Gt.default = Qa;
		var gn = {};
		Object.defineProperty(gn, "__esModule", {value: !0}), gn.default = void 0;
		var $a = {
			id: "modifiers", install: function (e) {
				var n = e.interactStatic;
				for (var r in e.usePlugin(Se.default), e.usePlugin(ir.default), n.modifiers = Gt.default, Gt.default) {
					var i = Gt.default[r], a = i._defaults, u = i._methods;
					a._methods = u, e.defaults.perAction[r] = a
				}
			}
		}, el = $a;
		gn.default = el;
		var Ct = {};

		function Kr(e) {
			return Kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, Kr(e)
		}

		function tl(e, n) {
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function Zr(e, n) {
			return Zr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, i) {
				return r.__proto__ = i, r
			}, Zr(e, n)
		}

		function nl(e, n) {
			if (n && (Kr(n) === "object" || typeof n == "function")) {
				return n;
			}
			if (n !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return Jr(e)
		}

		function Jr(e) {
			if (e === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return e
		}

		function or(e) {
			return or = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (n) {
				return n.__proto__ || Object.getPrototypeOf(n)
			}, or(e)
		}

		Object.defineProperty(Ct, "__esModule", {value: !0}), Ct.default = Ct.PointerEvent = void 0;
		var rl = function (e) {
			(function (c, d) {
				if (typeof d != "function" && d !== null) {
					throw new TypeError("Super expression must either be null or a function");
				}
				c.prototype = Object.create(d && d.prototype, {constructor: {value: c, writable: !0, configurable: !0}}), Object.defineProperty(c, "prototype", {writable: !1}), d && Zr(c, d)
			})(p, e);
			var n, r, i, a, u = (i = p, a = function () {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) {
					return !1;
				}
				if (typeof Proxy == "function") {
					return !0;
				}
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
					})), !0
				} catch {
					return !1
				}
			}(), function () {
				var c, d = or(i);
				if (a) {
					var b = or(this).constructor;
					c = Reflect.construct(d, arguments, b)
				} else {
					c = d.apply(this, arguments);
				}
				return nl(this, c)
			});

			function p(c, d, b, _, w, P) {
				var M;
				if (function (W, A) {
					if (!(W instanceof A)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}(this, p), M = u.call(this, w), K.pointerExtend(Jr(M), b), b !== d && K.pointerExtend(Jr(M), d), M.timeStamp = P, M.originalEvent = b, M.type = c, M.pointerId = K.getPointerId(d), M.pointerType = K.getPointerType(d), M.target = _, M.currentTarget = null, c === "tap") {
					var E = w.getPointerIndex(d);
					M.dt = M.timeStamp - w.pointers[E].downTime;
					var I = M.timeStamp - w.tapTime;
					M.double = !!w.prevTap && w.prevTap.type !== "doubletap" && w.prevTap.target === M.target && I < 500
				} else {
					c === "doubletap" && (M.dt = d.timeStamp - w.tapTime, M.double = !0);
				}
				return M
			}

			return n = p, (r = [{
				key: "_subtractOrigin", value: function (c) {
					var d = c.x, b = c.y;
					return this.pageX -= d, this.pageY -= b, this.clientX -= d, this.clientY -= b, this
				}
			}, {
				key: "_addOrigin", value: function (c) {
					var d = c.x, b = c.y;
					return this.pageX += d, this.pageY += b, this.clientX += d, this.clientY += b, this
				}
			}, {
				key: "preventDefault", value: function () {
					this.originalEvent.preventDefault()
				}
			}]) && tl(n.prototype, r), Object.defineProperty(n, "prototype", {writable: !1}), p
		}(Lt.BaseEvent);
		Ct.PointerEvent = Ct.default = rl;
		var mn = {};
		Object.defineProperty(mn, "__esModule", {value: !0}), mn.default = void 0;
		var sr = {
			id: "pointer-events/base", before: ["inertia", "modifiers", "auto-start", "actions"], install: function (e) {
				e.pointerEvents = sr, e.defaults.actions.pointerEvents = sr.defaults, (0, X.default)(e.actions.phaselessTypes, sr.types)
			}, listeners: {
				"interactions:new": function (e) {
					var n = e.interaction;
					n.prevTap = null, n.tapTime = 0
				}, "interactions:update-pointer": function (e) {
					var n = e.down, r = e.pointerInfo;
					!n && r.hold || (r.hold = {duration: 1 / 0, timeout: null})
				}, "interactions:move": function (e, n) {
					var r = e.interaction, i = e.pointer, a = e.event, u = e.eventTarget;
					e.duplicate || r.pointerIsDown && !r.pointerWasMoved || (r.pointerIsDown && Qr(e), bt({interaction: r, pointer: i, event: a, eventTarget: u, type: "move"}, n))
				}, "interactions:down": function (e, n) {
					(function (r, i) {
						for (var a = r.interaction, u = r.pointer, p = r.event, c = r.eventTarget, d = r.pointerIndex, b = a.pointers[d].hold, _ = z.getPath(c), w = {interaction: a, pointer: u, event: p, eventTarget: c, type: "hold", targets: [], path: _, node: null}, P = 0; P < _.length; P++) {
							var M = _[P];
							w.node = M, i.fire("pointerEvents:collect-targets", w)
						}
						if (w.targets.length) {
							for (var E = 1 / 0, I = 0; I < w.targets.length; I++) {
								var W = w.targets[I].eventable.options.holdDuration;
								W < E && (E = W)
							}
							b.duration = E, b.timeout = setTimeout(function () {
								bt({interaction: a, eventTarget: c, pointer: u, event: p, type: "hold"}, i)
							}, E)
						}
					})(e, n), bt(e, n)
				}, "interactions:up": function (e, n) {
					Qr(e), bt(e, n), function (r, i) {
						var a = r.interaction, u = r.pointer, p = r.event, c = r.eventTarget;
						a.pointerWasMoved || bt({interaction: a, eventTarget: c, pointer: u, event: p, type: "tap"}, i)
					}(e, n)
				}, "interactions:cancel": function (e, n) {
					Qr(e), bt(e, n)
				}
			}, PointerEvent: Ct.PointerEvent, fire: bt, collectEventTargets: Mo, defaults: {holdDuration: 600, ignoreFrom: null, allowFrom: null, origin: {x: 0, y: 0}}, types: {down: !0, move: !0, up: !0, cancel: !0, tap: !0, doubletap: !0, hold: !0}
		};

		function bt(e, n) {
			var r = e.interaction, i = e.pointer, a = e.event, u = e.eventTarget, p = e.type, c = e.targets, d = c === void 0 ? Mo(e, n) : c, b = new Ct.PointerEvent(p, i, a, u, r, n.now());
			n.fire("pointerEvents:new", {pointerEvent: b});
			for (var _ = {interaction: r, pointer: i, event: a, eventTarget: u, targets: d, type: p, pointerEvent: b}, w = 0; w < d.length; w++) {
				var P = d[w];
				for (var M in P.props || {}) {
					b[M] = P.props[M];
				}
				var E = (0, xt.default)(P.eventable, P.node);
				if (b._subtractOrigin(E), b.eventable = P.eventable, b.currentTarget = P.node, P.eventable.fire(b), b._addOrigin(E), b.immediatePropagationStopped || b.propagationStopped && w + 1 < d.length && d[w + 1].node !== b.currentTarget) {
					break
				}
			}
			if (n.fire("pointerEvents:fired", _), p === "tap") {
				var I = b.double ? bt({interaction: r, pointer: i, event: a, eventTarget: u, type: "doubletap"}, n) : b;
				r.prevTap = I, r.tapTime = I.timeStamp
			}
			return b
		}

		function Mo(e, n) {
			var r = e.interaction, i = e.pointer, a = e.event, u = e.eventTarget, p = e.type, c = r.getPointerIndex(i), d = r.pointers[c];
			if (p === "tap" && (r.pointerWasMoved || !d || d.downTarget !== u)) {
				return [];
			}
			for (var b = z.getPath(u), _ = {interaction: r, pointer: i, event: a, eventTarget: u, type: p, path: b, targets: [], node: null}, w = 0; w < b.length; w++) {
				var P = b[w];
				_.node = P, n.fire("pointerEvents:collect-targets", _)
			}
			return p === "hold" && (_.targets = _.targets.filter(function (M) {
				var E;
				return M.eventable.options.holdDuration === ((E = r.pointers[c]) == null ? void 0 : E.hold.duration)
			})), _.targets
		}

		function Qr(e) {
			var n = e.interaction, r = e.pointerIndex, i = n.pointers[r].hold;
			i && i.timeout && (clearTimeout(i.timeout), i.timeout = null)
		}

		var il = sr;
		mn.default = il;
		var ar = {};

		function ol(e) {
			var n = e.interaction;
			n.holdIntervalHandle && (clearInterval(n.holdIntervalHandle), n.holdIntervalHandle = null)
		}

		Object.defineProperty(ar, "__esModule", {value: !0}), ar.default = void 0;
		var sl = {
			id: "pointer-events/holdRepeat", install: function (e) {
				e.usePlugin(mn.default);
				var n = e.pointerEvents;
				n.defaults.holdRepeatInterval = 0, n.types.holdrepeat = e.actions.phaselessTypes.holdrepeat = !0
			}, listeners: ["move", "up", "cancel", "endall"].reduce(function (e, n) {
				return e["pointerEvents:".concat(n)] = ol, e
			}, {
				"pointerEvents:new": function (e) {
					var n = e.pointerEvent;
					n.type === "hold" && (n.count = (n.count || 0) + 1)
				}, "pointerEvents:fired": function (e, n) {
					var r = e.interaction, i = e.pointerEvent, a = e.eventTarget, u = e.targets;
					if (i.type === "hold" && u.length) {
						var p = u[0].eventable.options.holdRepeatInterval;
						p <= 0 || (r.holdIntervalHandle = setTimeout(function () {
							n.pointerEvents.fire({interaction: r, eventTarget: a, type: "hold", pointer: i, event: i}, n)
						}, p))
					}
				}
			})
		}, al = sl;
		ar.default = al;
		var lr = {};

		function ll(e) {
			return (0, X.default)(this.events.options, e), this
		}

		Object.defineProperty(lr, "__esModule", {value: !0}), lr.default = void 0;
		var ul = {
			id: "pointer-events/interactableTargets", install: function (e) {
				var n = e.Interactable;
				n.prototype.pointerEvents = ll;
				var r = n.prototype._backCompatOption;
				n.prototype._backCompatOption = function (i, a) {
					var u = r.call(this, i, a);
					return u === this && (this.events.options[i] = a), u
				}
			}, listeners: {
				"pointerEvents:collect-targets": function (e, n) {
					var r = e.targets, i = e.node, a = e.type, u = e.eventTarget;
					n.interactables.forEachMatch(i, function (p) {
						var c = p.events, d = c.options;
						c.types[a] && c.types[a].length && p.testIgnoreAllow(d, i, u) && r.push({node: i, eventable: c, props: {interactable: p}})
					})
				}, "interactable:new": function (e) {
					var n = e.interactable;
					n.events.getRect = function (r) {
						return n.getRect(r)
					}
				}, "interactable:set": function (e, n) {
					var r = e.interactable, i = e.options;
					(0, X.default)(r.events.options, n.pointerEvents.defaults), (0, X.default)(r.events.options, i.pointerEvents || {})
				}
			}
		}, cl = ul;
		lr.default = cl;
		var vn = {};
		Object.defineProperty(vn, "__esModule", {value: !0}), vn.default = void 0;
		var fl = {
			id: "pointer-events", install: function (e) {
				e.usePlugin(mn), e.usePlugin(ar.default), e.usePlugin(lr.default)
			}
		}, dl = fl;
		vn.default = dl;
		var Xt = {};

		function So(e) {
			var n = e.Interactable;
			e.actions.phases.reflow = !0, n.prototype.reflow = function (r) {
				return function (i, a, u) {
					for (var p = f.default.string(i.target) ? pe.from(i._context.querySelectorAll(i.target)) : [i.target], c = u.window.Promise, d = c ? [] : null, b = function () {
						var w = p[_], P = i.getRect(w);
						if (!P) {
							return "break";
						}
						var M = pe.find(u.interactions.list, function (Y) {
							return Y.interacting() && Y.interactable === i && Y.element === w && Y.prepared.name === a.name
						}), E = void 0;
						if (M) {
							M.move(), d && (E = M._reflowPromise || new c(function (Y) {
								M._reflowResolve = Y
							}));
						} else {
							var I = (0, ue.tlbrToXywh)(P), W = {page: {x: I.x, y: I.y}, client: {x: I.x, y: I.y}, timeStamp: u.now()}, A = K.coordsToEvent(W);
							E = function (Y, ee, se, he, ve) {
								var ce = Y.interactions.new({pointerType: "reflow"}), me = {interaction: ce, event: ve, pointer: ve, eventTarget: se, phase: "reflow"};
								ce.interactable = ee, ce.element = se, ce.prevEvent = ve, ce.updatePointer(ve, ve, se, !0), K.setZeroCoords(ce.coords.delta), (0, Ve.copyAction)(ce.prepared, he), ce._doPhase(me);
								var Ye = Y.window.Promise, ht = Ye ? new Ye(function (ti) {
									ce._reflowResolve = ti
								}) : void 0;
								return ce._reflowPromise = ht, ce.start(he, ee, se), ce._interacting ? (ce.move(me), ce.end(ve)) : (ce.stop(), ce._reflowResolve()), ce.removePointer(ve, ve), ht
							}(u, i, w, a, A)
						}
						d && d.push(E)
					}, _ = 0; _ < p.length && b() !== "break"; _++) {
						;
					}
					return d && c.all(d).then(function () {
						return i
					})
				}(this, r, e)
			}
		}

		Object.defineProperty(Xt, "__esModule", {value: !0}), Xt.default = void 0, Xt.install = So;
		var hl = {
			id: "reflow", install: So, listeners: {
				"interactions:stop": function (e, n) {
					var r = e.interaction;
					r.pointerType === "reflow" && (r._reflowResolve && r._reflowResolve(), pe.remove(n.interactions.list, r))
				}
			}
		}, pl = hl;
		Xt.default = pl;
		var Xe = {exports: {}};

		function $r(e) {
			return $r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, $r(e)
		}

		Object.defineProperty(Xe.exports, "__esModule", {value: !0}), Xe.exports.default = void 0, Ce.default.use(Tt.default), Ce.default.use(gt.default), Ce.default.use(vn.default), Ce.default.use(St.default), Ce.default.use(gn.default), Ce.default.use(tn.default), Ce.default.use($t.default), Ce.default.use(ct.default), Ce.default.use(Xt.default);
		var gl = Ce.default;
		if (Xe.exports.default = gl, $r(Xe) === "object" && Xe) {
			try {
				Xe.exports = Ce.default
			} catch {
			}
		}
		Ce.default.default = Ce.default, $t.default, ct.default, tn.default, Tt.default, Vn.default, St.default, Ce.default, gn.default, gt.default, vn.default, Xt.default, Xe = Xe.exports;
		var Dt = {exports: {}};

		function ei(e) {
			return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) {
				return typeof n
			} : function (n) {
				return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			}, ei(e)
		}

		Object.defineProperty(Dt.exports, "__esModule", {value: !0}), Dt.exports.default = void 0;
		var ml = Xe.default;
		if (Dt.exports.default = ml, ei(Dt) === "object" && Dt) {
			try {
				Dt.exports = Xe.default
			} catch {
			}
		}
		return Xe.default.default = Xe.default, Dt.exports
	})
})(ws);
const At = Tu(ws.exports), Cu = (o, t) => {
	let s = [], l = [];
	return At(o).draggable({
		listeners: {
			start: h => {
				const v = fs(".icons");
				s = mi(".selected");
				for (const g of s) {
					if (t.useGhost) {
						l.push(g.cloneNode(!0));
						let f = l[l.length - 1], m = Jl(g);
						Jt(f, "x", m.left || 0), Jt(f, "y", m.top || 0), Kt(f, "selected"), yt(f, "ghost"), yt(f, "dragging"), v == null || v.appendChild(f)
					} else {
						yt(g, "dragging"), Kt(g, "selected");
					}
				}
				typeof t.onStart == "function" && t.onStart(h, s)
			}, move: h => {
				let v = t.useGhost && l.length > 0 ? l : s;
				for (const g of v) {
					const f = (qe(g, "x") || 0) + h.dx, m = (qe(g, "y") || 0) + h.dy;
					Tn(g, f, m)
				}
				typeof t.onMove == "function" && t.onMove(h, s)
			}, end: h => {
				var v;
				if (t.useGhost && l.length > 0) {
					for (const [g, f] of s.entries()) {
						Tn(f, qe(l[g], "x") - f.offsetLeft || 0, qe(l[g], "y") - f.offsetTop || 0), (v = l[g]) == null || v.remove();
					}
				} else {
					for (const g of s) {
						Kt(g, "dragging"), yt(g, "selected");
					}
				}
				typeof t.onEnd == "function" && t.onEnd(h, s), s = [], l = []
			}
		}, modifiers: [At.modifiers.restrictRect({restriction: "parent", endOnly: !1})], autoScroll: !1, inertia: !1
	}), o
};

function No(o) {
	let t, s, l, h, v, g, f, m, y;
	return {
		c() {
			t = G("picture"), s = G("source"), l = Te(), h = G("source"), v = Te(), g = G("source"), f = Te(), m = G("img"), this.h()
		}, l(T) {
			t = q(T, "PICTURE", {style: !0});
			var O = $(t);
			s = q(O, "SOURCE", {media: !0, srcset: !0, type: !0}), l = ke(O), h = q(O, "SOURCE", {media: !0, srcset: !0, type: !0}), v = ke(O), g = q(O, "SOURCE", {srcset: !0, type: !0}), f = ke(O), m = q(O, "IMG", {width: !0, height: !0, alt: !0, loading: !0, decoding: !0, draggable: !0, fetchpriority: !0, src: !0, srcset: !0}), O.forEach(B), this.h()
		}, h() {
			U(s, "media", "(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)"), U(s, "srcset", "/assets/images/icons/overlay/shortcut.png 3x"), U(s, "type", "image/png"), U(h, "media", "(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)"), U(h, "srcset", "/assets/images/icons/overlay/shortcut.png 2x"), U(h, "type", "image/png"), U(g, "srcset", "/assets/images/icons/overlay/shortcut.png"), U(g, "type", "image/png"), U(m, "width", o[3]), U(m, "height", o[4]), U(m, "alt", ""), U(m, "loading", "eager"), U(m, "decoding", "async"), U(m, "draggable", "false"), U(m, "fetchpriority", "high"), es(m.src, y = "/assets/images/icons/overlay/shortcut.png") || U(m, "src", y), U(m, "srcset", "/assets/images/icons/overlay/shortcut.png, /assets/images/icons/overlay/shortcut.png 2x, /assets/images/icons/overlay/shortcut.png 3x"), it(t, "width", o[3] + "px"), it(t, "height", o[4] + "px")
		}, m(T, O) {
			ie(T, t, O), H(t, s), H(t, l), H(t, h), H(t, v), H(t, g), H(t, f), H(t, m)
		}, p(T, O) {
			O & 8 && U(m, "width", T[3]), O & 16 && U(m, "height", T[4]), O & 8 && it(t, "width", T[3] + "px"), O & 16 && it(t, "height", T[4] + "px")
		}, d(T) {
			T && B(t)
		}
	}
}

function Du(o) {
	let t, s, l, h, v, g, f, m, y, T, O, x, k, C, D, R, j, V, Q, L, F, J, S = o[6] && No(o), z = [{class: Q = "icon " + (o[13].class || "")}, {style: L = "--x: " + o[0] + "; --y: " + o[1] + ";"}, o[14]], le = {};
	for (let oe = 0; oe < z.length; oe += 1) {
		le = re(le, z[oe]);
	}
	return {
		c() {
			t = G("li"), s = G("button"), l = G("figure"), h = G("picture"), v = G("source"), g = Te(), f = G("source"), m = Te(), y = G("source"), T = Te(), O = G("img"), k = Te(), S && S.c(), C = Te(), D = G("figcaption"), R = G("span"), j = G("slot"), V = Ge(o[2]), this.c = Z, this.h()
		}, l(oe) {
			t = q(oe, "LI", {class: !0, style: !0});
			var _e = $(t);
			s = q(_e, "BUTTON", {type: !0, title: !0});
			var nt = $(s);
			l = q(nt, "FIGURE", {});
			var Ee = $(l);
			h = q(Ee, "PICTURE", {style: !0});
			var fe = $(h);
			v = q(fe, "SOURCE", {media: !0, srcset: !0, type: !0}), g = ke(fe), f = q(fe, "SOURCE", {media: !0, srcset: !0, type: !0}), m = ke(fe), y = q(fe, "SOURCE", {srcset: !0, type: !0}), T = ke(fe), O = q(fe, "IMG", {width: !0, height: !0, alt: !0, loading: !0, decoding: !0, draggable: !0, fetchpriority: !0, src: !0, srcset: !0}), fe.forEach(B), k = ke(Ee), S && S.l(Ee), C = ke(Ee), D = q(Ee, "FIGCAPTION", {});
			var X = $(D);
			R = q(X, "SPAN", {});
			var ue = $(R);
			j = q(ue, "SLOT", {name: !0});
			var zt = $(j);
			V = et(zt, o[2]), zt.forEach(B), ue.forEach(B), X.forEach(B), Ee.forEach(B), nt.forEach(B), _e.forEach(B), this.h()
		}, h() {
			U(v, "media", "(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)"), U(v, "srcset", "/assets/images/icons/default.png 3x"), U(v, "type", "image/webp"), U(f, "media", "(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)"), U(f, "srcset", "/assets/images/icons/default.png 2x"), U(f, "type", "image/webp"), U(y, "srcset", "/assets/images/icons/default.png"), U(y, "type", "image/png"), U(O, "width", o[3]), U(O, "height", o[4]), U(O, "alt", ""), U(O, "loading", "eager"), U(O, "decoding", "async"), U(O, "draggable", "false"), U(O, "fetchpriority", "high"), es(O.src, x = "/assets/images/icons/default.png") || U(O, "src", x), U(O, "srcset", "/assets/images/icons/default.png, /assets/images/icons/default.png 2x, /assets/images/icons/default.png 3x"), it(h, "width", o[3] + "px"), it(h, "height", o[4] + "px"), U(j, "name", "name"), U(s, "type", "button"), U(s, "title", o[5]), ye(t, le), ae(t, "move", !o[7] && !o[8]), ae(t, "transform", o[7]), ae(t, "transform-3d", o[8])
		}, m(oe, _e) {
			ie(oe, t, _e), H(t, s), H(s, l), H(l, h), H(h, v), H(h, g), H(h, f), H(h, m), H(h, y), H(h, T), H(h, O), H(l, k), S && S.m(l, null), H(l, C), H(l, D), H(D, R), H(R, j), H(j, V), o[16](R), o[17](t), F || (J = [We(t, "mousedown", o[12]), We(t, "click", function () {
				st(o[9]) && o[9].apply(this, arguments)
			})], F = !0)
		}, p(oe, [_e]) {
			o = oe, _e & 8 && U(O, "width", o[3]), _e & 16 && U(O, "height", o[4]), _e & 8 && it(h, "width", o[3] + "px"), _e & 16 && it(h, "height", o[4] + "px"), o[6] ? S ? S.p(o, _e) : (S = No(o), S.c(), S.m(l, C)) : S && (S.d(1), S = null), _e & 4 && Mn(V, o[2]), _e & 32 && U(s, "title", o[5]), ye(t, le = Ne(z, [_e & 8192 && Q !== (Q = "icon " + (o[13].class || "")) && {class: Q}, _e & 3 && L !== (L = "--x: " + o[0] + "; --y: " + o[1] + ";") && {style: L}, _e & 16384 && o[14]])), ae(t, "move", !o[7] && !o[8]), ae(t, "transform", o[7]), ae(t, "transform-3d", o[8])
		}, i: Z, o: Z, d(oe) {
			oe && B(t), S && S.d(), o[16](null), o[17](null), F = !1, Ze(J)
		}
	}
}

function Iu(o, t, s) {
	const l = ["x", "y", "width", "height", "name", "title", "shortcut", "useTransform", "useTransform3D", "useGhost", "onClick"];
	let h = be(t, l), v;
	ns(o, Wo, S => s(18, v = S));
	let {x: g = 0} = t, {y: f = 0} = t, {width: m = 32} = t, {height: y = 32} = t, {name: T = "Icon"} = t, {title: O = ""} = t, {shortcut: x = !1} = t, {useTransform: k = !1} = t, {useTransform3D: C = !0} = t, {useGhost: D = !0} = t, {
		onClick: R = () => {
			console.log("Icon.onClick")
		}
	} = t, j, V;
	Bl(() => {
		console.log("Icon.beforeUpdate"), g && s(0, g = Pe(g || 0)), f && s(1, f = Pe(f || 0))
	}), vr(() => {
		console.log("Icon.onMount"), (typeof T > "u" || T === "Icon") && s(2, T = V.innerText), Cu(j, {useGhost: D, onEnd: L})
	}), Ll(() => {
		console.log("Icon.afterUpdate")
	}), hi(() => {
		console.log("Icon.onDestroy")
	});

	function Q() {
		if (console.log("Icon.onMouseDown"), !ds(j, "selected")) {
			let S = mi(".selected");
			for (const z of S) {
				Kt(z, "selected");
			}
			yt(j, "selected")
		}
	}

	function L(S, z) {
		console.log("Icon.onMouseUp"), typeof z < "u" && (z == null ? void 0 : z.length) > 0 && (z == null || z.forEach(le => {
			v.desktop.icons.forEach((oe, _e) => {
				oe.name === le.innerText && (oe.x = qe(le, "x") || 0, oe.y = qe(le, "y") || 0, bl(Wo, v.desktop.icons[_e] = oe, v))
			})
		}))
	}

	function F(S) {
		Zt[S ? "unshift" : "push"](() => {
			V = S, s(11, V)
		})
	}

	function J(S) {
		Zt[S ? "unshift" : "push"](() => {
			j = S, s(10, j)
		})
	}

	return o.$$set = S => {
		s(13, t = re(re({}, t), xe(S))), s(14, h = be(t, l)), "x" in S && s(0, g = S.x), "y" in S && s(1, f = S.y), "width" in S && s(3, m = S.width), "height" in S && s(4, y = S.height), "name" in S && s(2, T = S.name), "title" in S && s(5, O = S.title), "shortcut" in S && s(6, x = S.shortcut), "useTransform" in S && s(7, k = S.useTransform), "useTransform3D" in S && s(8, C = S.useTransform3D), "useGhost" in S && s(15, D = S.useGhost), "onClick" in S && s(9, R = S.onClick)
	}, t = xe(t), [g, f, T, m, y, O, x, k, C, R, j, V, Q, t, h, D, F, J]
}

class Au extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = '<style>.icon{align-items:center;color:#fff;display:flex;flex-direction:column;height:-webkit-min-content;height:-moz-min-content;height:min-content;justify-content:center;padding:2px;width:70px}.icon button{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:inherit;border:none;color:inherit;cursor:inherit;outline:none;position:relative;touch-action:none;width:100%}.icon button figure{display:flex;flex-direction:column;place-items:center}.icon button figure picture{margin:0 auto 4px}.icon button figure picture:not(:first-of-type){position:absolute}.icon button figure figcaption span{display:block;padding-left:3px;padding-right:2px;position:relative}.icon.move{left:var(--x);top:var(--y)}.icon.transform{left:0;top:0;transform:translate(var(--x),var(--y))}.icon.transform-3d{left:0;top:0;transform:translate3d(var(--x),var(--y),0)}.icon.dragging{opacity:.5;pointer-events:none;z-index:1}.icon.dragging button figure figcaption span{color:#000}.icon:global(.ghost){left:0;position:absolute;top:0}.icon:global(.selected){z-index:1}.icon:global(.selected) button figure picture{filter:grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(.8)}.icon:global(.selected) button figure figcaption span{background-color:navy}.icon:global(.selected) button figure figcaption span:after{content:"";height:100%;left:0;outline:1px dotted #ffff7f;outline-offset:-1px;position:absolute;top:0;width:100%}@supports (mix-blend-mode:difference){.icon:global(.selected) button figure figcaption span:after{mix-blend-mode:difference;outline-color:#fff}}</style>', Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, Iu, Du, De, {x: 0, y: 1, width: 3, height: 4, name: 2, title: 5, shortcut: 6, useTransform: 7, useTransform3D: 8, useGhost: 15, onClick: 9}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["x", "y", "width", "height", "name", "title", "shortcut", "useTransform", "useTransform3D", "useGhost", "onClick"]
	}

	get x() {
		return this.$$.ctx[0]
	}

	set x(t) {
		this.$$set({x: t}), N()
	}

	get y() {
		return this.$$.ctx[1]
	}

	set y(t) {
		this.$$set({y: t}), N()
	}

	get width() {
		return this.$$.ctx[3]
	}

	set width(t) {
		this.$$set({width: t}), N()
	}

	get height() {
		return this.$$.ctx[4]
	}

	set height(t) {
		this.$$set({height: t}), N()
	}

	get name() {
		return this.$$.ctx[2]
	}

	set name(t) {
		this.$$set({name: t}), N()
	}

	get title() {
		return this.$$.ctx[5]
	}

	set title(t) {
		this.$$set({title: t}), N()
	}

	get shortcut() {
		return this.$$.ctx[6]
	}

	set shortcut(t) {
		this.$$set({shortcut: t}), N()
	}

	get useTransform() {
		return this.$$.ctx[7]
	}

	set useTransform(t) {
		this.$$set({useTransform: t}), N()
	}

	get useTransform3D() {
		return this.$$.ctx[8]
	}

	set useTransform3D(t) {
		this.$$set({useTransform3D: t}), N()
	}

	get useGhost() {
		return this.$$.ctx[15]
	}

	set useGhost(t) {
		this.$$set({useGhost: t}), N()
	}

	get onClick() {
		return this.$$.ctx[9]
	}

	set onClick(t) {
		this.$$set({onClick: t}), N()
	}
}

customElements.define("emuos-icon", Au);

function Vo(o) {
	return Object.prototype.toString.call(o) === "[object Date]"
}

function ci(o, t) {
	if (o === t || o !== o) {
		return () => o;
	}
	const s = typeof o;
	if (s !== typeof t || Array.isArray(o) !== Array.isArray(t)) {
		throw new Error("Cannot interpolate values of different type");
	}
	if (Array.isArray(o)) {
		const l = t.map((h, v) => ci(o[v], h));
		return h => l.map(v => v(h))
	}
	if (s === "object") {
		if (!o || !t) {
			throw new Error("Object cannot be null");
		}
		if (Vo(o) && Vo(t)) {
			o = o.getTime(), t = t.getTime();
			const v = t - o;
			return g => new Date(o + g * v)
		}
		const l = Object.keys(t), h = {};
		return l.forEach(v => {
			h[v] = ci(o[v], t[v])
		}), v => {
			const g = {};
			return l.forEach(f => {
				g[f] = h[f](v)
			}), g
		}
	}
	if (s === "number") {
		const l = t - o;
		return h => o + h * l
	}
	throw new Error(`Cannot interpolate ${s} values`)
}

function Fo(o, t = {}) {
	const s = vi(o);
	let l, h = o;

	function v(g, f) {
		if (o == null) {
			return s.set(o = g), Promise.resolve();
		}
		h = g;
		let m = l, y = !1, {delay: T = 0, duration: O = 400, easing: x = _t, interpolate: k = ci} = re(re({}, t), f);
		if (O === 0) {
			return m && (m.abort(), m = null), s.set(o = h), Promise.resolve();
		}
		const C = kn() + T;
		let D;
		return l = Pn(R => {
			if (R < C) {
				return !0;
			}
			y || (D = k(o, g), typeof O == "function" && (O = O(o, g)), y = !0), m && (m.abort(), m = null);
			const j = R - C;
			return j > O ? (s.set(o = g), !1) : (s.set(o = D(x(j / O))), !0)
		}), l.promise
	}

	return {set: v, update: (g, f) => v(g(h, o), f), subscribe: s.subscribe}
}

function Ru(o) {
	let t, s = o[0].msg + "", l;
	return {
		c() {
			t = new si(!1), l = Le(), this.h()
		}, l(h) {
			t = jl(h, !1), l = Le(), this.h()
		}, h() {
			t.a = l
		}, m(h, v) {
			t.m(s, h, v), ie(h, l, v)
		}, p(h, v) {
			v & 1 && s !== (s = h[0].msg + "") && t.p(s)
		}, i: Z, o: Z, d(h) {
			h && B(l), h && t.d()
		}
	}
}

function zu(o) {
	let t, s, l;
	const h = [o[7]()];
	var v = o[0].component.src;

	function g(f) {
		let m = {};
		for (let y = 0; y < h.length; y += 1) {
			m = re(m, h[y]);
		}
		return {props: m}
	}

	return v && (t = new v(g())), {
		c() {
			t && Ke(t.$$.fragment), s = Le()
		}, l(f) {
			t && tt(t.$$.fragment, f), s = Le()
		}, m(f, m) {
			t && He(t, f, m), ie(f, s, m), l = !0
		}, p(f, m) {
			const y = m & 128 ? Ne(h, [ql(f[7]())]) : {};
			if (v !== (v = f[0].component.src)) {
				if (t) {
					Qe();
					const T = t;
					de(T.$$.fragment, 1, 0, () => {
						Ue(T, 1)
					}), $e()
				}
				v ? (t = new v(g()), Ke(t.$$.fragment), ne(t.$$.fragment, 1), He(t, s.parentNode, s)) : t = null
			} else {
				v && t.$set(y)
			}
		}, i(f) {
			l || (t && ne(t.$$.fragment, f), l = !0)
		}, o(f) {
			t && de(t.$$.fragment, f), l = !1
		}, d(f) {
			f && B(s), t && Ue(t, f)
		}
	}
}

function Ho(o) {
	let t, s = o[0].close + "", l, h;
	return {
		c() {
			t = G("button"), this.h()
		}, l(v) {
			t = q(v, "BUTTON", {class: !0, type: !0, tabindex: !0});
			var g = $(t);
			g.forEach(B), this.h()
		}, h() {
			U(t, "class", "toast-button pe"), U(t, "type", "button"), U(t, "tabindex", "-1")
		}, m(v, g) {
			ie(v, t, g), t.innerHTML = s, l || (h = We(t, "click", o[4]), l = !0)
		}, p(v, g) {
			g & 1 && s !== (s = v[0].close + "") && (t.innerHTML = s)
		}, d(v) {
			v && B(t), l = !1, h()
		}
	}
}

function Bu(o) {
	let t, s, l, h, v, g, f, m, y, T;
	const O = [zu, Ru], x = [];

	function k(D, R) {
		return D[0].component ? 0 : 1
	}

	l = k(o), h = x[l] = O[l](o);
	let C = o[0].dismissable && Ho(o);
	return {
		c() {
			t = G("div"), s = G("div"), h.c(), v = Te(), C && C.c(), g = Te(), f = G("progress"), this.c = Z, this.h()
		}, l(D) {
			t = q(D, "DIV", {class: !0});
			var R = $(t);
			s = q(R, "DIV", {role: !0, class: !0});
			var j = $(s);
			h.l(j), j.forEach(B), v = ke(R), C && C.l(R), g = ke(R), f = q(R, "PROGRESS", {class: !0}), $(f).forEach(B), R.forEach(B), this.h()
		}, h() {
			U(s, "role", "status"), U(s, "class", "toast-message"), ae(s, "pe", o[0].component || typeof o[0].onclick == "function"), U(f, "class", "toast-progress"), f.value = o[2], U(t, "class", "toast"), ae(t, "pe", o[0].pausable || o[0].dismissable || typeof o[0].onclick == "function")
		}, m(D, R) {
			ie(D, t, R), H(t, s), x[l].m(s, null), H(t, v), C && C.m(t, null), H(t, g), H(t, f), m = !0, y || (T = [We(s, "click", o[3]), We(t, "mouseenter", o[5]), We(t, "mouseleave", o[6])], y = !0)
		}, p(D, [R]) {
			let j = l;
			l = k(D), l === j ? x[l].p(D, R) : (Qe(), de(x[j], 1, 1, () => {
				x[j] = null
			}), $e(), h = x[l], h ? h.p(D, R) : (h = x[l] = O[l](D), h.c()), ne(h, 1), h.m(s, null)), R & 1 && ae(s, "pe", D[0].component || typeof D[0].onclick == "function"), D[0].dismissable ? C ? C.p(D, R) : (C = Ho(D), C.c(), C.m(t, g)) : C && (C.d(1), C = null), (!m || R & 4) && (f.value = D[2]), R & 1 && ae(t, "pe", D[0].pausable || D[0].dismissable || typeof D[0].onclick == "function")
		}, i(D) {
			m || (ne(h), m = !0)
		}, o(D) {
			de(h), m = !1
		}, d(D) {
			D && B(t), x[l].d(), C && C.d(), y = !1, Ze(T)
		}
	}
}

function Lu(o, t, s) {
	let l, h = Z, v = () => (h(), h = ts(T, V => s(2, l = V)), T);
	o.$$.on_destroy.push(() => h());
	let {item: g = _s} = t;
	const f = () => {
		typeof g.onclick == "function" ? g.onclick(g.id) : g.dismissable && m()
	}, m = () => wn.close(g.id), y = () => {
		(l === 1 || l === 0) && m()
	};
	let T = Fo(g.initial, {duration: g.duration, easing: _t});
	v();
	let O = g.initial, x = O, k = !1, C = !1;
	const D = () => {
		g.pausable && !k && l !== O && (T.set(l, {duration: 0}), k = !0)
	}, R = () => {
		if (k) {
			const V = g.duration, Q = V - V * ((l - x) / (O - x));
			T.set(O, {duration: Q}).then(y), k = !1
		}
	}, j = () => {
		const {props: V = {}, sendIdTo: Q} = g.component;
		return Q && (V[Q] = g.id), V
	};
	return vr(() => {
		v(s(1, T = Fo(g.initial, {duration: g.duration, easing: _t}))), s(8, O = g.initial), x = O, s(9, C = !0)
	}), hi(() => {
		typeof g.onclose == "function" && g.onclose(g.id)
	}), o.$$set = V => {
		"item" in V && s(0, g = V.item)
	}, o.$$.update = () => {
		o.$$.dirty & 775 && O !== g.next && C && (s(8, O = g.next), x = l, k = !1, T.set(O).then(y))
	}, [g, T, l, f, m, D, R, j, O, C]
}

class xs extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.toast{align-items:center;background:var(--toastBackground,rgba(66,66,66,.9));border:var(--toastBorder,none);border-radius:var(--toastBorderRadius,.125rem);box-shadow:var(--toastBoxShadow,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06));color:var(--toastColor,#fff);display:flex;flex-direction:row;gap:var(--toastGap,0);height:var(--toastHeight,auto);margin:var(--toastMargin,0 0 .5rem 0);min-height:var(--toastMinHeight,3.5rem);overflow:hidden;padding:var(--toastPadding,0);position:relative;width:var(--toastWidth,16rem)}.toast.pe{pointer-events:auto}.toast-message{cursor:pointer;flex:1 1 0;padding:var(--toastMessagePadding,.75rem .5rem)}.toast-button{align-items:center;background:var(--toastButtonBackground,rgba(66,66,66,.9));border:var(--toastButtonBorder,none);border-radius:var(--toastButtonBorderRadius,0);box-shadow:var(--toastButtonBoxShadow,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06));color:var(--toastButtonColor,#fff);cursor:pointer;display:flex;font:1rem sans-serif;height:var(--toastButtonHeight,100%);justify-content:center;margin:var(--toastButtonMargin,0);outline:none;padding:var(--toastButtonPadding,0);width:var(--toastButtonWidth,2rem)}.toast-button:active{background:var(--toastButtonBackgroundActive,rgba(66,66,66,.9));border:var(--toastButtonBorderActive,none);border-radius:var(--toastButtonBorderRadiusActive,0);box-shadow:var(--toastButtonBoxShadowActive,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06));color:var(--toastButtonColorActive,#fff);margin:var(--toastButtonMarginActive,0);padding:var(--toastButtonPaddingActive,0)}.toast-button.pe{pointer-events:auto}.toast-progress{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;border:none;bottom:var(--toastProgressBottom,0);display:block;height:var(--toastProgressHeight,6px);left:var(--toastProgressLeft,0);pointer-events:none;position:absolute;right:var(--toastProgressRight,auto);top:var(--toastProgressTop,auto);width:var(--toastProgressWidth,100%)}.toast-progress::-webkit-progress-bar{background:transparent}.toast-progress::-webkit-progress-value{background:var(--toastProgressBackground,rgba(33,150,243,.75))}.toast-progress::-moz-progress-bar{background:var(--toastProgressBackground,rgba(33,150,243,.75))}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, Lu, Bu, De, {item: 0}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["item"]
	}

	get item() {
		return this.$$.ctx[0]
	}

	set item(t) {
		this.$$set({item: t}), N()
	}
}

customElements.define("emuos-toast", xs);

function Wu(o, {from: t, to: s}, l = {}) {
	const h = getComputedStyle(o), v = h.transform === "none" ? "" : h.transform, [g, f] = h.transformOrigin.split(" ").map(parseFloat), m = t.left + t.width * g / s.width - (s.left + g), y = t.top + t.height * f / s.height - (s.top + f), {delay: T = 0, duration: O = k => Math.sqrt(k) * 120, easing: x = ps} = l;
	return {
		delay: T, duration: st(O) ? O(Math.sqrt(m * m + y * y)) : O, easing: x, css: (k, C) => {
			const D = C * m, R = C * y, j = k + C * t.width / s.width, V = k + C * t.height / s.height;
			return `transform: ${v} translate(${D}px, ${R}px) scale(${j}, ${V});`
		}
	}
}

function Uo(o, t, s) {
	const l = o.slice();
	return l[6] = t[s], l
}

function Nu(o) {
	let t, s;
	return t = new xs({props: {item: o[6]}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, p(l, h) {
			const v = {};
			h & 2 && (v.item = l[6]), t.$set(v)
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function Vu(o) {
	let t, s;
	return {
		c() {
			t = G("emuos-toast"), this.h()
		}, l(l) {
			t = q(l, "EMUOS-TOAST", {item: !0}), $(t).forEach(B), this.h()
		}, h() {
			Co(t, "item", s = o[6])
		}, m(l, h) {
			ie(l, t, h)
		}, p(l, h) {
			h & 2 && s !== (s = l[6]) && Co(t, "item", s)
		}, i: Z, o: Z, d(l) {
			l && B(t)
		}
	}
}

function Go(o, t) {
	let s, l, h, v, g, f, m, y, T, O = Z, x;
	const k = [Vu, Nu], C = [];

	function D(R, j) {
		return Fe != null && Fe.USE_WEBCOMPONENTS ? 0 : 1
	}

	return l = D(), h = C[l] = k[l](t), {
		key: o, first: null, c() {
			s = G("li"), h.c(), v = Te(), this.h()
		}, l(R) {
			s = q(R, "LI", {class: !0, style: !0});
			var j = $(s);
			h.l(j), v = ke(j), j.forEach(B), this.h()
		}, h() {
			U(s, "class", g = t[6].classes.join(" ")), U(s, "style", f = t[2](t[6].theme)), this.first = s
		}, m(R, j) {
			ie(R, s, j), C[l].m(s, null), H(s, v), x = !0
		}, p(R, j) {
			t = R, h.p(t, j), (!x || j & 2 && g !== (g = t[6].classes.join(" "))) && U(s, "class", g), (!x || j & 2 && f !== (f = t[2](t[6].theme))) && U(s, "style", f)
		}, r() {
			T = s.getBoundingClientRect()
		}, f() {
			zl(s), O(), us(s, T)
		}, a() {
			O(), O = Rl(s, T, Wu, {duration: 200})
		}, i(R) {
			x || (ne(h), wt(() => {
				y && y.end(1), m = Hl(s, du, t[6].intro), m.start()
			}), x = !0)
		}, o(R) {
			de(h), m && m.invalidate(), y = Ul(s, li, {}), x = !1
		}, d(R) {
			R && B(s), C[l].d(), R && y && y.end()
		}
	}
}

function Fu(o) {
	let t, s = [], l = new Map, h, v = o[1];
	const g = f => f[6].id;
	for (let f = 0; f < v.length; f += 1) {
		let m = Uo(o, v, f), y = g(m);
		l.set(y, s[f] = Go(y, m))
	}
	return {
		c() {
			t = G("ul");
			for (let f = 0; f < s.length; f += 1) {
				s[f].c();
			}
			this.c = Z, this.h()
		}, l(f) {
			t = q(f, "UL", {class: !0});
			var m = $(t);
			for (let y = 0; y < s.length; y += 1) {
				s[y].l(m);
			}
			m.forEach(B), this.h()
		}, h() {
			U(t, "class", "toasts")
		}, m(f, m) {
			ie(f, t, m);
			for (let y = 0; y < s.length; y += 1) {
				s[y].m(t, null);
			}
			h = !0
		}, p(f, [m]) {
			if (m & 6) {
				v = f[1], Qe();
				for (let y = 0; y < s.length; y += 1) {
					s[y].r();
				}
				s = Yl(s, m, g, 1, f, v, l, t, Xl, Go, null, Uo);
				for (let y = 0; y < s.length; y += 1) {
					s[y].a();
				}
				$e()
			}
		}, i(f) {
			if (!h) {
				for (let m = 0; m < v.length; m += 1) {
					ne(s[m]);
				}
				h = !0
			}
		}, o(f) {
			for (let m = 0; m < s.length; m += 1) {
				de(s[m]);
			}
			h = !1
		}, d(f) {
			f && B(t);
			for (let m = 0; m < s.length; m += 1) {
				s[m].d()
			}
		}
	}
}

function Hu(o, t, s) {
	let l, h = Z;
	ns(o, wn, y => s(5, l = y)), o.$$.on_destroy.push(() => h());
	let {options: v = {}} = t, {target: g = "default"} = t, f;
	const m = y => Object.keys(y).reduce((T, O) => `${T}${O}:${y[O]};`, "");
	return o.$$set = y => {
		"options" in y && s(3, v = y.options), "target" in y && s(4, g = y.target)
	}, o.$$.update = () => {
		o.$$.dirty & 24 && wn.init(g, v), o.$$.dirty & 48 && s(1, f = l.filter(y => y.target === g))
	}, [wn, f, m, v, g, l]
}

class Uu extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.toasts{bottom:var(--toastsBottom,auto);left:var(--toastsLeft,auto);list-style-type:none;margin:0;padding:0;pointer-events:none;position:fixed;right:var(--toastsRight,2rem);top:var(--toastsTop,1.5rem);z-index:var(--toastsZIndex,auto)}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, Hu, Fu, De, {toast: 0, options: 3, target: 4}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["toast", "options", "target"]
	}

	get toast() {
		return wn
	}

	get options() {
		return this.$$.ctx[3]
	}

	set options(t) {
		this.$$set({options: t}), N()
	}

	get target() {
		return this.$$.ctx[4]
	}

	set target(t) {
		this.$$set({target: t}), N()
	}
}

customElements.define("emuos-toasts", Uu);

function Gu(o) {
	let t, s, l, h, v, g = [{class: v = "panel " + (o[3].class || "")}, o[4]], f = {};
	for (let m = 0; m < g.length; m += 1) {
		f = re(f, g[m]);
	}
	return {
		c() {
			t = G("article"), s = G("section"), l = G("slot"), h = Ge("Panel"), this.c = Z, this.h()
		}, l(m) {
			t = q(m, "ARTICLE", {class: !0});
			var y = $(t);
			s = q(y, "SECTION", {class: !0, style: !0, contenteditable: !0});
			var T = $(s);
			l = q(T, "SLOT", {});
			var O = $(l);
			h = et(O, "Panel"), O.forEach(B), T.forEach(B), y.forEach(B), this.h()
		}, h() {
			U(s, "class", "content"), it(s, "--padding", o[0]), U(s, "contenteditable", o[1]), ye(t, f), ae(t, "debug", o[2])
		}, m(m, y) {
			ie(m, t, y), H(t, s), H(s, l), H(l, h)
		}, p(m, [y]) {
			y & 1 && it(s, "--padding", m[0]), y & 2 && U(s, "contenteditable", m[1]), ye(t, f = Ne(g, [y & 8 && v !== (v = "panel " + (m[3].class || "")) && {class: v}, y & 16 && m[4]])), ae(t, "debug", m[2])
		}, i: Z, o: Z, d(m) {
			m && B(t)
		}
	}
}

function Xu(o, t, s) {
	const l = ["padding", "isContentEditable", "debug"];
	let h = be(t, l), {padding: v = 1} = t, {isContentEditable: g = !1} = t, {debug: f = !1} = t;
	return v = Pe(v), o.$$set = m => {
		s(3, t = re(re({}, t), xe(m))), s(4, h = be(t, l)), "padding" in m && s(0, v = m.padding), "isContentEditable" in m && s(1, g = m.isContentEditable), "debug" in m && s(2, f = m.debug)
	}, t = xe(t), [v, g, f, t, h]
}

class Es extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>article.panel{background-color:var(--color-background-window-panel);color:#000;height:100%;overflow:hidden}article.panel section.content{background-color:var(--color-white);border-bottom:1px solid var(--color-white);border-left:1px solid #7b7b7b;border-right:1px solid var(--color-white);border-top:1px solid #7b7b7b;height:100%;overflow:auto;padding:var(--padding)}article.panel.has-title-bar section.content,article.panel.has-title-bar.has-status-bar section.content{height:calc(100% - 18px);margin-top:18px}article.panel.has-status-bar{padding-bottom:18px}article.panel.debug{outline:1px solid var(--color-debug);outline-offset:-1px}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, Xu, Gu, De, {padding: 0, isContentEditable: 1, debug: 2}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["padding", "isContentEditable", "debug"]
	}

	get padding() {
		return this.$$.ctx[0]
	}

	set padding(t) {
		this.$$set({padding: t}), N()
	}

	get isContentEditable() {
		return this.$$.ctx[1]
	}

	set isContentEditable(t) {
		this.$$set({isContentEditable: t}), N()
	}

	get debug() {
		return this.$$.ctx[2]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-panel", Es);
const Yu = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M3 8h6M3 9h6" />
</svg>`, qu = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M2 1h9M2 2h9M2 3h1M10 3h1M2 4h1M10 4h1M2 5h1M10 5h1M2 6h1M10 6h1M2 7h1M10 7h1M2 8h1M10 8h1M2 9h9" />
</svg>`, Ku = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M4 1h6M4 2h6M4 3h1M9 3h1M2 4h6M9 4h1M2 5h6M9 5h1M2 6h1M7 6h3M2 7h1M7 7h1M2 8h1M7 8h1M2 9h6" />
</svg>`, Zu = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M3 2h2M9 2h2M4 3h2M8 3h2M5 4h4M6 5h2M5 6h4M4 7h2M8 7h2M3 8h2M9 8h2" />
</svg>`, Ju = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000000" d="M5 1h4M4 2h2M8 2h2M4 3h2M8 3h2M7 4h2M6 5h2M6 6h2M6 8h2M6 9h2" />
</svg>`, Qu = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M3 2h3M8 2h3M3 3h2M9 3h2M3 4h1M5 4h1M8 4h1M10 4h1M6 5h2M6 6h2M3 7h1M5 7h1M8 7h1M10 7h1M3 8h2M9 8h2M3 9h3M8 9h3" />
</svg>`, $u = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 11" shape-rendering="crispEdges">
	<path stroke="#000" d="M5 2h5M7 3h3M2 4h3M7 4h3M2 5h1M6 5h1M9 5h1M2 6h1M5 6h1M9 6h1M2 7h1M4 7h1M7 7h1M2 8h1M7 8h1M2 9h6" />
	<path stroke="#838383" d="M6 4h1M5 5h1M7 5h1M4 6h1M6 6h1M5 7h1" />
</svg>`;

function ec(o) {
	let t, s, l, h, v = [{class: o[3]}, {style: o[4]}, {type: "button"}, {title: o[0]}, o[5]], g = {};
	for (let f = 0; f < v.length; f += 1) {
		g = re(g, v[f]);
	}
	return {
		c() {
			t = G("button"), s = G("slot"), this.c = Z, this.h()
		}, l(f) {
			t = q(f, "BUTTON", {class: !0, style: !0, type: !0, title: !0});
			var m = $(t);
			s = q(m, "SLOT", {}), $(s).forEach(B), m.forEach(B), this.h()
		}, h() {
			ye(t, g), ae(t, "button-icon", o[1] === "icon")
		}, m(f, m) {
			ie(f, t, m), H(t, s), t.autofocus && t.focus(), l || (h = We(t, "click", function () {
				st(o[2]) && o[2].apply(this, arguments)
			}), l = !0)
		}, p(f, [m]) {
			o = f, ye(t, g = Ne(v, [m & 8 && {class: o[3]}, m & 16 && {style: o[4]}, {type: "button"}, m & 1 && {title: o[0]}, m & 32 && o[5]])), ae(t, "button-icon", o[1] === "icon")
		}, i: Z, o: Z, d(f) {
			f && B(t), l = !1, h()
		}
	}
}

function tc(o, t, s) {
	const l = ["title", "icon", "type", "onClick"];
	let h = be(t, l), {title: v = !1} = t, {icon: g = !1} = t, {type: f = ""} = t, {
		onClick: m = () => {
		}
	} = t;
	const y = Zl();
	let T = !1, O = !1, x = "";
	switch (g && (T = g.toLowerCase()), v || (v = g), g) {
		case"Minimize":
			x = y.btoa(Yu);
			break;
		case"Maximize":
			x = y.btoa(qu);
			break;
		case"Restore":
			x = y.btoa(Ku);
			break;
		case"Close":
			x = y.btoa(Zu);
			break;
		case"Help":
			x = y.btoa(Ju);
			break;
		case"Fullscreen":
			x = y.btoa(Qu);
			break;
		case"NewTab":
			T = "new-tab", x = y.btoa($u);
			break
	}
	return g && (O = `--icon: url('data:image/svg+xml;base64,${x}');`), o.$$set = k => {
		t = re(re({}, t), xe(k)), s(5, h = be(t, l)), "title" in k && s(0, v = k.title), "icon" in k && s(6, g = k.icon), "type" in k && s(1, f = k.type), "onClick" in k && s(2, m = k.onClick)
	}, [v, f, m, T, O, h, g]
}

class Rt extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>button{-webkit-tap-highlight-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color-background-panel);background-image:var(--icon);background-position:1px 1px;background-repeat:no-repeat;background-size:13px 11px;border:none;box-shadow:inset -1px -1px 0 #000,inset 1px 1px 0 #fff,inset -2px -2px 0 grey,inset 2px 2px 0 #dfdfdf;cursor:pointer!important;overflow:hidden;padding:6px;-webkit-user-select:none;-moz-user-select:none;user-select:none}button:active{box-shadow:inset -1px -1px 0 #fff,inset 1px 1px 0 #000,inset -2px -2px 0 #dfdfdf,inset 2px 2px 0 grey}button.button-icon{height:14px;padding:0;text-indent:-99999px;width:16px}button.close,button.minimize{margin-left:2px}button:not(:disabled){cursor:pointer}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, tc, ec, De, {title: 0, icon: 6, type: 1, onClick: 2}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["title", "icon", "type", "onClick"]
	}

	get title() {
		return this.$$.ctx[0]
	}

	set title(t) {
		this.$$set({title: t}), N()
	}

	get icon() {
		return this.$$.ctx[6]
	}

	set icon(t) {
		this.$$set({icon: t}), N()
	}

	get type() {
		return this.$$.ctx[1]
	}

	set type(t) {
		this.$$set({type: t}), N()
	}

	get onClick() {
		return this.$$.ctx[2]
	}

	set onClick(t) {
		this.$$set({onClick: t}), N()
	}
}

customElements.define("emuos-button", Rt);
const nc = (o, t) => {
	let s;
	return At(o).draggable({
		allowFrom: t.handle, ignoreFrom: t.ignore, listeners: {
			start: l => {
				var h;
				t.useGhostWhileDragging && (s = l.target.cloneNode(!0), yt(s, "ghost"), (h = fs(".desktop")) == null || h.appendChild(s))
			}, move: l => {
				let h = l.target;
				t.useGhostWhileDragging && s && (h = s);
				const v = (qe(h, "x") || 0) + l.dx, g = (qe(h, "y") || 0) + l.dy;
				Tn(h, v, g)
			}, end: l => {
				t.useGhostWhileDragging && s && (Tn(l.target, qe(s, "x") || 0, qe(s, "y") || 0), s == null || s.remove())
			}
		}, modifiers: [At.modifiers.restrictRect({restriction: "parent", endOnly: !1})], autoScroll: !1, inertia: !1
	}), o
}, rc = (o, t) => (At(o).resizable({
	edges: {top: !0, left: !0, right: !0, bottom: !0}, margin: t.margin, listeners: {
		move: s => {
			const {target: l} = s, h = (qe(l, "x") || 0) + s.deltaRect.left, v = (qe(l, "y") || 0) + s.deltaRect.top;
			Tn(l, h, v), Ql(l, s.rect.width, s.rect.height)
		}
	}, modifiers: [At.modifiers.restrictEdges({outer: "parent"}), At.modifiers.restrictSize({min: {width: t.minWidth, height: t.minHeight}, max: "parent"})], inertia: !1
}), o);

function ic(o) {
	let t, s, l, h = [{class: l = "windows " + (o[0].class || "")}, o[1]], v = {};
	for (let g = 0; g < h.length; g += 1) {
		v = re(v, h[g]);
	}
	return {
		c() {
			t = G("nav"), s = G("slot"), this.c = Z, this.h()
		}, l(g) {
			t = q(g, "NAV", {class: !0});
			var f = $(t);
			s = q(f, "SLOT", {}), $(s).forEach(B), f.forEach(B), this.h()
		}, h() {
			ye(t, v)
		}, m(g, f) {
			ie(g, t, f), H(t, s)
		}, p(g, [f]) {
			ye(t, v = Ne(h, [f & 1 && l !== (l = "windows " + (g[0].class || "")) && {class: l}, f & 2 && g[1]]))
		}, i: Z, o: Z, d(g) {
			g && B(t)
		}
	}
}

const oc = !0, sc = !0, ac = 112, lc = 27;

function uc(o, t, s) {
	const l = [];
	let h = be(t, l);
	return vr(() => {
		const v = [...mi(".window")];
		if (v) {
			for (const g of v) {
				nc(g, {handle: ".title-bar", ignore: ".title-bar button, .resize-handles", useGhostWhileDragging: oc}), rc(g, {handles: {top: ".resize-handles .top", left: ".resize-handles .left", right: ".resize-handles .right", bottom: ".resize-handles .bottom"}, margin: 5, minWidth: ac, minHeight: lc, useGhostWhileResizing: sc})
			}
		}
	}), o.$$set = v => {
		s(0, t = re(re({}, t), xe(v))), s(1, h = be(t, l))
	}, t = xe(t), [t, h]
}

class cc extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>nav{height:calc(100% - 28px);left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:2}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, uc, ic, De, {}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}
}

customElements.define("emuos-windows", cc);

function Xo(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "Help"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function Yo(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "Fullscreen"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function qo(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "NewTab"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function Ko(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "Minimize"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function Zo(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "Maximize"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function Jo(o) {
	let t, s;
	return t = new Rt({props: {type: "icon", icon: "Close"}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function fc(o) {
	let t, s, l, h, v, g = o[0].includes("help"), f, m = o[0].includes("fullscreen"), y, T = o[0].includes("newtab"), O, x = o[0].includes("minimize"), k, C = o[0].includes("maximize"), D, R = o[0].includes("close"), j, V, Q, L, F = g && Xo(), J = m && Yo(), S = T && qo(), z = x && Ko(), le = C && Zo(), oe = R && Jo(), _e = [{class: j = "title-bar " + (o[2].class || "")}, o[3]], nt = {};
	for (let Ee = 0; Ee < _e.length; Ee += 1) {
		nt = re(nt, _e[Ee]);
	}
	return {
		c() {
			t = G("header"), s = G("slot"), l = Ge("TitleBar"), h = Te(), v = G("nav"), F && F.c(), f = Le(), J && J.c(), y = Le(), S && S.c(), O = Le(), z && z.c(), k = Le(), le && le.c(), D = Le(), oe && oe.c(), this.c = Z, this.h()
		}, l(Ee) {
			t = q(Ee, "HEADER", {class: !0});
			var fe = $(t);
			s = q(fe, "SLOT", {});
			var X = $(s);
			l = et(X, "TitleBar"), X.forEach(B), h = ke(fe), v = q(fe, "NAV", {});
			var ue = $(v);
			F && F.l(ue), f = Le(), J && J.l(ue), y = Le(), S && S.l(ue), O = Le(), z && z.l(ue), k = Le(), le && le.l(ue), D = Le(), oe && oe.l(ue), ue.forEach(B), fe.forEach(B), this.h()
		}, h() {
			ye(t, nt)
		}, m(Ee, fe) {
			ie(Ee, t, fe), H(t, s), H(s, l), H(t, h), H(t, v), F && F.m(v, null), H(v, f), J && J.m(v, null), H(v, y), S && S.m(v, null), H(v, O), z && z.m(v, null), H(v, k), le && le.m(v, null), H(v, D), oe && oe.m(v, null), V = !0, Q || (L = We(t, "mousedown", function () {
				st(o[1]) && o[1].apply(this, arguments)
			}), Q = !0)
		}, p(Ee, [fe]) {
			o = Ee, fe & 1 && (g = o[0].includes("help")), g ? F ? fe & 1 && ne(F, 1) : (F = Xo(), F.c(), ne(F, 1), F.m(v, f)) : F && (Qe(), de(F, 1, 1, () => {
				F = null
			}), $e()), fe & 1 && (m = o[0].includes("fullscreen")), m ? J ? fe & 1 && ne(J, 1) : (J = Yo(), J.c(), ne(J, 1), J.m(v, y)) : J && (Qe(), de(J, 1, 1, () => {
				J = null
			}), $e()), fe & 1 && (T = o[0].includes("newtab")), T ? S ? fe & 1 && ne(S, 1) : (S = qo(), S.c(), ne(S, 1), S.m(v, O)) : S && (Qe(), de(S, 1, 1, () => {
				S = null
			}), $e()), fe & 1 && (x = o[0].includes("minimize")), x ? z ? fe & 1 && ne(z, 1) : (z = Ko(), z.c(), ne(z, 1), z.m(v, k)) : z && (Qe(), de(z, 1, 1, () => {
				z = null
			}), $e()), fe & 1 && (C = o[0].includes("maximize")), C ? le ? fe & 1 && ne(le, 1) : (le = Zo(), le.c(), ne(le, 1), le.m(v, D)) : le && (Qe(), de(le, 1, 1, () => {
				le = null
			}), $e()), fe & 1 && (R = o[0].includes("close")), R ? oe ? fe & 1 && ne(oe, 1) : (oe = Jo(), oe.c(), ne(oe, 1), oe.m(v, null)) : oe && (Qe(), de(oe, 1, 1, () => {
				oe = null
			}), $e()), ye(t, nt = Ne(_e, [(!V || fe & 4 && j !== (j = "title-bar " + (o[2].class || ""))) && {class: j}, fe & 8 && o[3]]))
		}, i(Ee) {
			V || (ne(F), ne(J), ne(S), ne(z), ne(le), ne(oe), V = !0)
		}, o(Ee) {
			de(F), de(J), de(S), de(z), de(le), de(oe), V = !1
		}, d(Ee) {
			Ee && B(t), F && F.d(), J && J.d(), S && S.d(), z && z.d(), le && le.d(), oe && oe.d(), Q = !1, L()
		}
	}
}

function dc(o, t, s) {
	const l = ["buttons", "onMouseDown"];
	let h = be(t, l), {buttons: v = ["minimize", "maximize", "close"]} = t, {
		onMouseDown: g = () => {
		}
	} = t;
	return o.$$set = f => {
		s(2, t = re(re({}, t), xe(f))), s(3, h = be(t, l)), "buttons" in f && s(0, v = f.buttons), "onMouseDown" in f && s(1, g = f.onMouseDown)
	}, t = xe(t), [v, g, t, h]
}

class Os extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.title-bar{background-color:navy;color:#fff;height:18px;line-height:18px;overflow:hidden;position:absolute;text-indent:4px;width:calc(100% - 8px);z-index:1}.title-bar nav{position:absolute;right:1px;top:1px}.title-bar.dragging{-webkit-user-select:none;-moz-user-select:none;user-select:none}.title-bar.dragging.debug{border-bottom:1px solid var(--color-debug-muted)}.title-bar.debug{border-bottom:1px solid var(--color-debug)}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, dc, fc, De, {buttons: 0, onMouseDown: 1}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["buttons", "onMouseDown"]
	}

	get buttons() {
		return this.$$.ctx[0]
	}

	set buttons(t) {
		this.$$set({buttons: t}), N()
	}

	get onMouseDown() {
		return this.$$.ctx[1]
	}

	set onMouseDown(t) {
		this.$$set({onMouseDown: t}), N()
	}
}

customElements.define("emuos-titlebar", Os);

function hc(o) {
	let t, s, l, h, v = [{class: h = "status-bar " + (o[1].class || "")}, o[2]], g = {};
	for (let f = 0; f < v.length; f += 1) {
		g = re(g, v[f]);
	}
	return {
		c() {
			t = G("footer"), s = G("slot"), l = Ge("StatusBar"), this.c = Z, this.h()
		}, l(f) {
			t = q(f, "FOOTER", {class: !0});
			var m = $(t);
			s = q(m, "SLOT", {});
			var y = $(s);
			l = et(y, "StatusBar"), y.forEach(B), m.forEach(B), this.h()
		}, h() {
			ye(t, g), ae(t, "debug", o[0])
		}, m(f, m) {
			ie(f, t, m), H(t, s), H(s, l)
		}, p(f, [m]) {
			ye(t, g = Ne(v, [m & 2 && h !== (h = "status-bar " + (f[1].class || "")) && {class: h}, m & 4 && f[2]])), ae(t, "debug", f[0])
		}, i: Z, o: Z, d(f) {
			f && B(t)
		}
	}
}

function pc(o, t, s) {
	const l = ["debug"];
	let h = be(t, l), {debug: v = !1} = t;
	return o.$$set = g => {
		s(1, t = re(re({}, t), xe(g))), s(2, h = be(t, l)), "debug" in g && s(0, v = g.debug)
	}, t = xe(t), [v, t, h]
}

class Ts extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.status-bar{background-image:url(/assets/images/corner-resize.svg);background-position:100% 100%;background-repeat:no-repeat;background-size:12px;bottom:5px;box-shadow:inset -1px -1px 0 #fff,inset 1px 1px 0 #7b7b7b;color:#000;height:16px;image-rendering:-moz-crisp-edges;image-rendering:pixelated;line-height:13px;overflow:hidden;padding:2px;position:absolute;width:calc(100% - 8px)}.status-bar.debug{border-top:1px solid var(--color-debug)}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, pc, hc, De, {debug: 0}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["debug"]
	}

	get debug() {
		return this.$$.ctx[0]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-statusbar", Ts);

function Qo(o) {
	let t, s;
	return t = new Os({props: {class: "title-bar " + (o[15] ? "debug" : ""), buttons: o[9], $$slots: {default: [gc]}, $$scope: {ctx: o}}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, p(l, h) {
			const v = {};
			h & 32768 && (v.class = "title-bar " + (l[15] ? "debug" : "")), h & 512 && (v.buttons = l[9]), h & 1048704 && (v.$$scope = {dirty: h, ctx: l}), t.$set(v)
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function gc(o) {
	let t;
	return {
		c() {
			t = Ge(o[7])
		}, l(s) {
			t = et(s, o[7])
		}, m(s, l) {
			ie(s, t, l)
		}, p(s, l) {
			l & 128 && Mn(t, s[7])
		}, d(s) {
			s && B(t)
		}
	}
}

function mc(o) {
	let t, s;
	return {
		c() {
			t = G("slot"), s = Ge(o[8])
		}, l(l) {
			t = q(l, "SLOT", {});
			var h = $(t);
			s = et(h, o[8]), h.forEach(B)
		}, m(l, h) {
			ie(l, t, h), H(t, s)
		}, p(l, h) {
			h & 256 && Mn(s, l[8])
		}, d(l) {
			l && B(t)
		}
	}
}

function $o(o) {
	let t, s;
	return t = new Ts({props: {class: "status-bar " + (o[15] ? "debug" : ""), $$slots: {default: [vc]}, $$scope: {ctx: o}}}), {
		c() {
			Ke(t.$$.fragment)
		}, l(l) {
			tt(t.$$.fragment, l)
		}, m(l, h) {
			He(t, l, h), s = !0
		}, p(l, h) {
			const v = {};
			h & 32768 && (v.class = "status-bar " + (l[15] ? "debug" : "")), h & 1048576 && (v.$$scope = {dirty: h, ctx: l}), t.$set(v)
		}, i(l) {
			s || (ne(t.$$.fragment, l), s = !0)
		}, o(l) {
			de(t.$$.fragment, l), s = !1
		}, d(l) {
			Ue(t, l)
		}
	}
}

function vc(o) {
	let t;
	return {
		c() {
			t = Ge(o[16])
		}, l(s) {
			t = et(s, o[16])
		}, m(s, l) {
			ie(s, t, l)
		}, p: Z, d(s) {
			s && B(t)
		}
	}
}

function bc(o) {
	let t, s, l, h, v, g, f, m = o[10] && Qo(o);
	l = new Es({props: {class: "panel " + (o[10] ? "has-title-bar" : "") + " " + (o[11] ? "has-status-bar" : "") + " " + (o[15] ? "debug" : ""), isContentEditable: o[12], padding: o[6], $$slots: {default: [mc]}, $$scope: {ctx: o}}});
	let y = o[11] && $o(o), T = [{class: v = "window " + (o[17].class || "")}, {style: g = "--x: " + o[0] + "; --y: " + o[1] + "; --width: " + o[4] + "; --height: " + o[5] + "; --min-width: " + o[2] + "; --min-height: " + o[3] + ";"}, o[18]], O = {};
	for (let x = 0; x < T.length; x += 1) {
		O = re(O, T[x]);
	}
	return {
		c() {
			t = G("section"), m && m.c(), s = Te(), Ke(l.$$.fragment), h = Te(), y && y.c(), this.c = Z, this.h()
		}, l(x) {
			t = q(x, "SECTION", {class: !0, style: !0});
			var k = $(t);
			m && m.l(k), s = ke(k), tt(l.$$.fragment, k), h = ke(k), y && y.l(k), k.forEach(B), this.h()
		}, h() {
			ye(t, O), ae(t, "debug", o[15]), ae(t, "move", !o[13] && !o[14]), ae(t, "transform", o[13]), ae(t, "transform-3d", o[14])
		}, m(x, k) {
			ie(x, t, k), m && m.m(t, null), H(t, s), He(l, t, null), H(t, h), y && y.m(t, null), f = !0
		}, p(x, [k]) {
			x[10] ? m ? (m.p(x, k), k & 1024 && ne(m, 1)) : (m = Qo(x), m.c(), ne(m, 1), m.m(t, s)) : m && (Qe(), de(m, 1, 1, () => {
				m = null
			}), $e());
			const C = {};
			k & 35840 && (C.class = "panel " + (x[10] ? "has-title-bar" : "") + " " + (x[11] ? "has-status-bar" : "") + " " + (x[15] ? "debug" : "")), k & 4096 && (C.isContentEditable = x[12]), k & 64 && (C.padding = x[6]), k & 1048832 && (C.$$scope = {dirty: k, ctx: x}), l.$set(C), x[11] ? y ? (y.p(x, k), k & 2048 && ne(y, 1)) : (y = $o(x), y.c(), ne(y, 1), y.m(t, null)) : y && (Qe(), de(y, 1, 1, () => {
				y = null
			}), $e()), ye(t, O = Ne(T, [(!f || k & 131072 && v !== (v = "window " + (x[17].class || ""))) && {class: v}, (!f || k & 63 && g !== (g = "--x: " + x[0] + "; --y: " + x[1] + "; --width: " + x[4] + "; --height: " + x[5] + "; --min-width: " + x[2] + "; --min-height: " + x[3] + ";")) && {style: g}, k & 262144 && x[18]])), ae(t, "debug", x[15]), ae(t, "move", !x[13] && !x[14]), ae(t, "transform", x[13]), ae(t, "transform-3d", x[14])
		}, i(x) {
			f || (ne(m), ne(l.$$.fragment, x), ne(y), f = !0)
		}, o(x) {
			de(m), de(l.$$.fragment, x), de(y), f = !1
		}, d(x) {
			x && B(t), m && m.d(), Ue(l), y && y.d()
		}
	}
}

function yc(o, t, s) {
	const l = ["x", "y", "minWidth", "minHeight", "width", "height", "padding", "title", "status", "content", "buttons", "showTitleBar", "showStatusBar", "isContentEditable", "useTransform", "useTransform3D", "debug"];
	let h = be(t, l), {x: v = 0} = t, {y: g = 0} = t, {minWidth: f = 112} = t, {minHeight: m = 27} = t, {width: y = f} = t, {height: T = m} = t, {padding: O = 1} = t, {title: x = "Untitled\xA0Window"} = t, {status: k = "No Status"} = t, {content: C = "No Content"} = t, {buttons: D = ["minimize", "maximize", "close"]} = t, {showTitleBar: R = !0} = t, {showStatusBar: j = !1} = t, {isContentEditable: V = !1} = t, {useTransform: Q = !1} = t, {useTransform3D: L = !0} = t, {debug: F = !1} = t;
	v = Pe(v), g = Pe(g), y = Pe(y), T = Pe(T), f = Pe(f), m = Pe(m), O = Pe(O);
	let J = k;
	return o.$$set = S => {
		s(17, t = re(re({}, t), xe(S))), s(18, h = be(t, l)), "x" in S && s(0, v = S.x), "y" in S && s(1, g = S.y), "minWidth" in S && s(2, f = S.minWidth), "minHeight" in S && s(3, m = S.minHeight), "width" in S && s(4, y = S.width), "height" in S && s(5, T = S.height), "padding" in S && s(6, O = S.padding), "title" in S && s(7, x = S.title), "status" in S && s(19, k = S.status), "content" in S && s(8, C = S.content), "buttons" in S && s(9, D = S.buttons), "showTitleBar" in S && s(10, R = S.showTitleBar), "showStatusBar" in S && s(11, j = S.showStatusBar), "isContentEditable" in S && s(12, V = S.isContentEditable), "useTransform" in S && s(13, Q = S.useTransform), "useTransform3D" in S && s(14, L = S.useTransform3D), "debug" in S && s(15, F = S.debug)
	}, t = xe(t), [v, g, f, m, y, T, O, x, C, D, R, j, V, Q, L, F, J, t, h, k]
}

class _c extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.window{background-color:var(--color-background-window-panel);box-shadow:inset -1px -1px 0 #000,inset 1px 1px 0 #dfdfdf,inset -2px -2px 0 grey,inset 2px 2px 0 #fff;height:var(--height);left:0;min-height:var(--min-height);min-width:var(--min-width);overflow:hidden;padding:4px;pointer-events:auto;position:absolute;top:0;width:var(--width)}.window:global(.ghost){background-color:transparent;border-image-outset:0;border-image-repeat:repeat;border-image-slice:3%;border-image-source:url(/assets/images/border-ghost.svg);border-image-width:3px;border-style:solid;border-width:4px;box-shadow:none;image-rendering:-moz-crisp-edges;image-rendering:pixelated;pointer-events:none;z-index:2}@supports (mix-blend-mode:difference){.window:global(.ghost){mix-blend-mode:difference}}.window:global(.ghost>*){visibility:hidden}.window.move{left:var(--x);top:var(--y)}.window.transform{left:0;top:0;transform:translate(var(--x),var(--y))}.window.transform-3d{left:0;top:0;transform:translate3d(var(--x),var(--y),0)}.window.debug{outline:1px solid var(--color-debug);outline-offset:-1px}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, yc, bc, De, {x: 0, y: 1, minWidth: 2, minHeight: 3, width: 4, height: 5, padding: 6, title: 7, status: 19, content: 8, buttons: 9, showTitleBar: 10, showStatusBar: 11, isContentEditable: 12, useTransform: 13, useTransform3D: 14, debug: 15}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}

	static get observedAttributes() {
		return ["x", "y", "minWidth", "minHeight", "width", "height", "padding", "title", "status", "content", "buttons", "showTitleBar", "showStatusBar", "isContentEditable", "useTransform", "useTransform3D", "debug"]
	}

	get x() {
		return this.$$.ctx[0]
	}

	set x(t) {
		this.$$set({x: t}), N()
	}

	get y() {
		return this.$$.ctx[1]
	}

	set y(t) {
		this.$$set({y: t}), N()
	}

	get minWidth() {
		return this.$$.ctx[2]
	}

	set minWidth(t) {
		this.$$set({minWidth: t}), N()
	}

	get minHeight() {
		return this.$$.ctx[3]
	}

	set minHeight(t) {
		this.$$set({minHeight: t}), N()
	}

	get width() {
		return this.$$.ctx[4]
	}

	set width(t) {
		this.$$set({width: t}), N()
	}

	get height() {
		return this.$$.ctx[5]
	}

	set height(t) {
		this.$$set({height: t}), N()
	}

	get padding() {
		return this.$$.ctx[6]
	}

	set padding(t) {
		this.$$set({padding: t}), N()
	}

	get title() {
		return this.$$.ctx[7]
	}

	set title(t) {
		this.$$set({title: t}), N()
	}

	get status() {
		return this.$$.ctx[19]
	}

	set status(t) {
		this.$$set({status: t}), N()
	}

	get content() {
		return this.$$.ctx[8]
	}

	set content(t) {
		this.$$set({content: t}), N()
	}

	get buttons() {
		return this.$$.ctx[9]
	}

	set buttons(t) {
		this.$$set({buttons: t}), N()
	}

	get showTitleBar() {
		return this.$$.ctx[10]
	}

	set showTitleBar(t) {
		this.$$set({showTitleBar: t}), N()
	}

	get showStatusBar() {
		return this.$$.ctx[11]
	}

	set showStatusBar(t) {
		this.$$set({showStatusBar: t}), N()
	}

	get isContentEditable() {
		return this.$$.ctx[12]
	}

	set isContentEditable(t) {
		this.$$set({isContentEditable: t}), N()
	}

	get useTransform() {
		return this.$$.ctx[13]
	}

	set useTransform(t) {
		this.$$set({useTransform: t}), N()
	}

	get useTransform3D() {
		return this.$$.ctx[14]
	}

	set useTransform3D(t) {
		this.$$set({useTransform3D: t}), N()
	}

	get debug() {
		return this.$$.ctx[15]
	}

	set debug(t) {
		this.$$set({debug: t}), N()
	}
}

customElements.define("emuos-window", _c);

function wc(o) {
	let t, s, l, h, v, g, f, m, y, T, O, x, k, C, D, R, j, V = [{class: j = "resize-handles " + (o[0].class || "")}, o[1]], Q = {};
	for (let L = 0; L < V.length; L += 1) {
		Q = re(Q, V[L]);
	}
	return {
		c() {
			t = G("div"), s = G("div"), l = Te(), h = G("div"), v = Te(), g = G("div"), f = Te(), m = G("div"), y = Te(), T = G("div"), O = Te(), x = G("div"), k = Te(), C = G("div"), D = Te(), R = G("div"), this.c = Z, this.h()
		}, l(L) {
			t = q(L, "DIV", {class: !0});
			var F = $(t);
			s = q(F, "DIV", {class: !0}), $(s).forEach(B), l = ke(F), h = q(F, "DIV", {class: !0}), $(h).forEach(B), v = ke(F), g = q(F, "DIV", {class: !0}), $(g).forEach(B), f = ke(F), m = q(F, "DIV", {class: !0}), $(m).forEach(B), y = ke(F), T = q(F, "DIV", {class: !0}), $(T).forEach(B), O = ke(F), x = q(F, "DIV", {class: !0}), $(x).forEach(B), k = ke(F), C = q(F, "DIV", {class: !0}), $(C).forEach(B), D = ke(F), R = q(F, "DIV", {class: !0}), $(R).forEach(B), F.forEach(B), this.h()
		}, h() {
			U(s, "class", "top"), U(h, "class", "left"), U(g, "class", "right"), U(m, "class", "bottom"), U(T, "class", "top-left"), U(x, "class", "top-right"), U(C, "class", "bottom-left"), U(R, "class", "bottom-right"), ye(t, Q)
		}, m(L, F) {
			ie(L, t, F), H(t, s), H(t, l), H(t, h), H(t, v), H(t, g), H(t, f), H(t, m), H(t, y), H(t, T), H(t, O), H(t, x), H(t, k), H(t, C), H(t, D), H(t, R)
		}, p(L, [F]) {
			ye(t, Q = Ne(V, [F & 1 && j !== (j = "resize-handles " + (L[0].class || "")) && {class: j}, F & 2 && L[1]]))
		}, i: Z, o: Z, d(L) {
			L && B(t)
		}
	}
}

function xc(o, t, s) {
	const l = [];
	let h = be(t, l);
	return o.$$set = v => {
		s(0, t = re(re({}, t), xe(v))), s(1, h = be(t, l))
	}, t = xe(t), [t, h]
}

class Ec extends Ie {
	constructor(t) {
		super(), this.shadowRoot.innerHTML = "<style>.resize-handles div{position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize-handles div.top{cursor:ns-resize;height:6px;left:0;top:-3px;width:100%}.resize-handles div.top-left{cursor:nwse-resize;height:12px;left:-3px;top:-3px;width:12px}.resize-handles div.top-right{cursor:nesw-resize;height:12px;right:-3px;top:-3px;width:12px}.resize-handles div.left{cursor:ew-resize;height:100%;left:-3px;top:0;width:6px}.resize-handles div.right{cursor:ew-resize;height:100%;right:-3px;top:0;width:6px}.resize-handles div.bottom{bottom:-3px;cursor:ns-resize;height:6px;left:0;width:100%}.resize-handles div.bottom-left{bottom:-3px;cursor:nesw-resize;height:12px;left:-3px;width:12px}.resize-handles div.bottom-right{bottom:-3px;cursor:nwse-resize;height:12px;right:-3px;width:12px}.resize-handles.debug div{outline:1px solid var(--color-debug);outline-offset:-1px}.resize-handles.debug div.bottom,.resize-handles.debug div.bottom-left,.resize-handles.debug div.bottom-right,.resize-handles.debug div.left,.resize-handles.debug div.right,.resize-handles.debug div.top,.resize-handles.debug div.top-left,.resize-handles.debug div.top-right{background-color:rgba(12,84,96,.267)}</style>", Re(this, {target: this.shadowRoot, props: Ae(this.attributes), customElement: !0}, xc, wc, De, {}, null), t && (t.target && ie(t.target, this, t.anchor), t.props && (this.$set(t.props), N()))
	}
}

customElements.define("emuos-resize-handlers", Ec);
//# sourceMappingURL=main.1f7406f7.js.map