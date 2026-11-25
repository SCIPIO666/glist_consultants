/**
 * Maths for the services donuts. Every donut is drawn in a 200 x 200 square around the
 * centre (100, 100) and then cropped to the part that is actually used (the `vb` box), so
 * a half donut has no empty half. Angles run CLOCKWISE from 12 o'clock, in degrees.
 */
export const CX = 100;
export const CY = 100;
export const R_OUT = 92;
export const R_IN = 62;
export const R_MID = (R_OUT + R_IN) / 2;
const GAP_DEG = 1.8;

export type Shape = "top" | "bottom" | "left" | "right" | "three-quarter-br" | "three-quarter-bl" | "full";

/** start: where the ring begins; span: how far round it goes; vb: [x, y, width, height] crop. */
export const SHAPES: Record<Shape, { start: number; span: number; vb: [number, number, number, number] }> = {
  top: { start: -90, span: 180, vb: [0, 0, 200, 100] }, // arc over the top, flat edge at the bottom
  bottom: { start: 90, span: 180, vb: [0, 100, 200, 100] }, // arc underneath, flat edge on top
  left: { start: 180, span: 180, vb: [0, 0, 100, 200] }, // arc on the left, flat edge on the right
  right: { start: 0, span: 180, vb: [100, 0, 100, 200] }, // arc on the right, flat edge on the left
  "three-quarter-br": { start: 180, span: 270, vb: [0, 0, 200, 200] }, // opening bottom-right
  "three-quarter-bl": { start: -90, span: 270, vb: [0, 0, 200, 200] }, // opening bottom-left
  full: { start: 0, span: 360, vb: [0, 0, 200, 200] },
};

/** Point at radius r and angle theta (clockwise from 12 o'clock), in the 200 x 200 square. */
export function pointAt(r: number, theta: number): [number, number] {
  const a = (theta * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
}

const f = (n: number) => n.toFixed(2);

/** Start and end angle of segment i of n. A full circle leaves a gap too, so segments never touch. */
export function segSpan(shape: Shape, i: number, n: number): [number, number] {
  const { start, span } = SHAPES[shape];
  const step = span / n;
  return [start + i * step + GAP_DEG / 2, start + (i + 1) * step - GAP_DEG / 2];
}

export function segMid(shape: Shape, i: number, n: number): number {
  const [a, b] = segSpan(shape, i, n);
  return (a + b) / 2;
}

/** SVG path of the ring segment (outer arc clockwise, then back along the inner arc). */
export function segPath(shape: Shape, i: number, n: number): string {
  const [a0, a1] = segSpan(shape, i, n);
  const large = a1 - a0 > 180 ? 1 : 0;
  const [ox0, oy0] = pointAt(R_OUT, a0);
  const [ox1, oy1] = pointAt(R_OUT, a1);
  const [ix1, iy1] = pointAt(R_IN, a1);
  const [ix0, iy0] = pointAt(R_IN, a0);
  return `M${f(ox0)} ${f(oy0)} A${R_OUT} ${R_OUT} 0 ${large} 1 ${f(ox1)} ${f(oy1)} L${f(ix1)} ${f(iy1)} A${R_IN} ${R_IN} 0 ${large} 0 ${f(ix0)} ${f(iy0)} Z`;
}
