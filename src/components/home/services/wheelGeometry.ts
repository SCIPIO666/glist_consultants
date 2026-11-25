/**
 * Maths for the services wheel. Everything is in percent of the wheel's square box,
 * so it scales with the wheel at any size. Angles are degrees clockwise from 12 o'clock.
 */
export const R_OUT = 0.44; // outer edge of the wedges
export const R_IN = 0.2; // inner edge of the wedges (the hub sits inside this)
export const R_ARC = 0.475; // radius of the coloured arcs around the outside
export const R_LABEL = 0.33; // where each wedge's icon + label are centred
const GAP_DEG = 1.4; // visible gap between wedges

/** Point at radius r (0..0.5 of the box) and angle a, as [x%, y%]. */
export function pt(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [50 + 100 * r * Math.sin(a), 50 - 100 * r * Math.cos(a)];
}

const f = (n: number) => n.toFixed(2);

/** Start and end angle of wedge i of n. */
export function span(i: number, n: number): [number, number] {
  const step = 360 / n;
  return [i * step + GAP_DEG / 2, (i + 1) * step - GAP_DEG / 2];
}

/** CSS clip-path polygon() for the ring segment of wedge i. */
export function wedgeClip(i: number, n: number): string {
  const [a0, a1] = span(i, n);
  const pts: [number, number][] = [];
  const steps = 18;
  for (let s = 0; s <= steps; s++) pts.push(pt(R_OUT, a0 + ((a1 - a0) * s) / steps));
  for (let s = steps; s >= 0; s--) pts.push(pt(R_IN, a0 + ((a1 - a0) * s) / steps));
  return `polygon(${pts.map(([x, y]) => `${f(x)}% ${f(y)}%`).join(",")})`;
}

/** Centre of wedge i's content, as [x%, y%]. */
export function wedgeCentre(i: number, n: number): [number, number] {
  const [a0, a1] = span(i, n);
  return pt(R_LABEL, (a0 + a1) / 2);
}

/** SVG path (viewBox 0 0 100 100) of the coloured arc outside wedge i. */
export function arcPath(i: number, n: number): string {
  const [a0, a1] = span(i, n);
  const [x0, y0] = pt(R_ARC, a0);
  const [x1, y1] = pt(R_ARC, a1);
  const r = R_ARC * 100;
  return `M${f(x0)} ${f(y0)} A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`;
}
