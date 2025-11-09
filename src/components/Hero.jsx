import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[40vh] md:h-[52vh] lg:h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full w-full bg-gradient-to-b from-black/20 via-black/30 to-black pointer-events-none" />
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow">Mission Control: DTRA Data Platform</h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-cyan-200/80">
            One-click deploy modular mission data tools across Dev, Staging, and Prod with a cinematic, real-time command interface.
          </p>
        </div>
      </div>
    </section>
  );
}
