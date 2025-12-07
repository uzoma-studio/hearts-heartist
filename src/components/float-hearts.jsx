"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * FloatHearts
 * - hearts: array of Contentful entries
 * Renders absolutely-positioned heart elements and animates them with requestAnimationFrame.
 */
export default function FloatHearts({ hearts }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const stateRef = useRef({
    positions: [],
    velocities: [],
    sizes: [],
    bounds: { w: 0, h: 0 },
    rafId: null,
    lastTs: null,
  });

  const handleClick = (i) => {
    const slug = hearts?.[i]?.fields?.slug;
    if (!slug) return;
    router.push(`/${slug}/home`);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      stateRef.current.bounds = { w: rect.width, h: rect.height };

      // measure item sizes (if not measured yet, fallback to computed)
      hearts.forEach((_, i) => {
        const el = itemsRef.current[i];
        if (el) {
          const r = el.getBoundingClientRect();
          stateRef.current.sizes[i] = { w: r.width, h: r.height };
        } else {
          stateRef.current.sizes[i] = stateRef.current.sizes[i] || { w: 160, h: 160 };
        }
      });

      // initialize positions & velocities if needed or when count changes
      if (stateRef.current.positions.length !== hearts.length) {
        stateRef.current.positions = hearts.map((_, i) => {
          const s = stateRef.current.sizes[i] || { w: 160, h: 160 };
          const x = Math.random() * Math.max(0, stateRef.current.bounds.w - s.w);
          const y = Math.random() * Math.max(0, stateRef.current.bounds.h - s.h);
          return { x, y };
        });
        stateRef.current.velocities = hearts.map(() => {
          const speed = 30 + Math.random() * 80; // px per second
          const ang = Math.random() * Math.PI * 2;
          return { vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed };
        });
      }
    };

    measure();
    const onResize = () => {
      measure();
    };
    window.addEventListener("resize", onResize);

    const step = (ts) => {
      if (!stateRef.current.lastTs) stateRef.current.lastTs = ts;
      const dt = (ts - stateRef.current.lastTs) / 1000;
      stateRef.current.lastTs = ts;

      const bounds = stateRef.current.bounds;

      for (let i = 0; i < hearts.length; i++) {
        const pos = stateRef.current.positions[i];
        const vel = stateRef.current.velocities[i];
        const size = stateRef.current.sizes[i] || { w: 160, h: 160 };

        let nx = pos.x + vel.vx * dt;
        let ny = pos.y + vel.vy * dt;

        // bounce on horizontal edges
        if (nx <= 0) {
          nx = 0;
          vel.vx *= -1;
        } else if (nx + size.w >= bounds.w) {
          nx = Math.max(0, bounds.w - size.w);
          vel.vx *= -1;
        }

        // bounce on vertical edges
        if (ny <= 0) {
          ny = 0;
          vel.vy *= -1;
        } else if (ny + size.h >= bounds.h) {
          ny = Math.max(0, bounds.h - size.h);
          vel.vy *= -1;
        }

        pos.x = nx;
        pos.y = ny;
      }

      // simple pairwise collision detection & resolution (circle approximation)
      for (let i = 0; i < hearts.length; i++) {
        for (let j = i + 1; j < hearts.length; j++) {
          const posA = stateRef.current.positions[i];
          const posB = stateRef.current.positions[j];
          const sizeA = stateRef.current.sizes[i] || { w: 160, h: 160 };
          const sizeB = stateRef.current.sizes[j] || { w: 160, h: 160 };

          const ax = posA.x + sizeA.w / 2;
          const ay = posA.y + sizeA.h / 2;
          const bx = posB.x + sizeB.w / 2;
          const by = posB.y + sizeB.h / 2;

          let dx = bx - ax;
          let dy = by - ay;
          let dist = Math.hypot(dx, dy);
          const minDist = Math.min(sizeA.w, sizeA.h) / 2 + Math.min(sizeB.w, sizeB.h) / 2;
          if (dist === 0) {
            // avoid divide by zero — nudge randomly
            dx = (Math.random() - 0.5) || 0.01;
            dy = (Math.random() - 0.5) || 0.01;
            dist = Math.hypot(dx, dy);
          }

          if (dist < minDist) {
            // normalize collision normal
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            // separate objects equally
            posA.x -= nx * (overlap / 2);
            posA.y -= ny * (overlap / 2);
            posB.x += nx * (overlap / 2);
            posB.y += ny * (overlap / 2);

            // relative velocity along normal
            const va = stateRef.current.velocities[i];
            const vb = stateRef.current.velocities[j];
            const relVel = (va.vx - vb.vx) * nx + (va.vy - vb.vy) * ny;

            // if moving towards each other, resolve by exchanging velocity along normal (elastic)
            if (relVel < 0) {
              const impulse = -relVel; // equal mass simplification
              va.vx += impulse * nx;
              va.vy += impulse * ny;
              vb.vx -= impulse * nx;
              vb.vy -= impulse * ny;
            }
          }
        }
      }

      // apply transforms to DOM
      for (let i = 0; i < hearts.length; i++) {
        const el = itemsRef.current[i];
        const pos = stateRef.current.positions[i];
        if (el) {
          // clamp within bounds in case resolving moved them outside
          const size = stateRef.current.sizes[i] || { w: 160, h: 160 };
          const cx = Math.max(0, Math.min(bounds.w - size.w, pos.x));
          const cy = Math.max(0, Math.min(bounds.h - size.h, pos.y));
          el.style.transform = `translate(${cx}px, ${cy}px)`;
          // also update stored pos to clamped values
          pos.x = cx;
          pos.y = cy;
        }
      }

      stateRef.current.rafId = requestAnimationFrame(step);
    };

    stateRef.current.rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(stateRef.current.rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [hearts]);

  const colors = [ "#ffeaa7", "#fab1a0", "#55efc4", "#74b9ff", "#a29bfe", "#fdcb6e", "#badc58", "#7ed6df", "#ffbe76", "#34e7e4" ]

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {hearts.map((heart, i) => (
        <div
          key={heart.sys.id}
          ref={(el) => (itemsRef.current[i] = el)}
          onClick={() => handleClick(i)}
          className="heart-bg bg-white absolute w-42 h-42 p-4 shadow-md flex items-center justify-center"
          style={{ left: 0, top: 0, willChange: "transform", transition: "transform 0s", backgroundColor: colors[i % colors.length] }}
        >
          <p className="mb-2 text-center pointer-events-none">{heart.fields.title}</p>
        </div>
      ))}
    </div>
  );
}