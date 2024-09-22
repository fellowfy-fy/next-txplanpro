"use client";

import React from "react";

const Slides = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="p-4 bg-white print-color-exact">
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 1</h1>
      <p className="text-xl">Содержимое слайда 1</p>
      {/* Добавьте другой контент для слайда 1 */}
    </div>
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 2</h1>
      <p className="text-xl">Содержимое слайда 2</p>
      {/* Добавьте другой контент для слайда 2 */}
    </div>
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 3</h1>
      <p className="text-xl">Содержимое слайда 3</p>
      {/* Добавьте другой контент для слайда 3 */}
    </div>
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 4</h1>
      <p className="text-xl">Содержимое слайда 4</p>
      {/* Добавьте другой контент для слайда 4 */}
    </div>
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 5</h1>
      <p className="text-xl">Содержимое слайда 5</p>
      {/* Добавьте другой контент для слайда 5 */}
    </div>
    <div className="slide-container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Слайд 6</h1>
      <p className="text-xl">Содержимое слайда 6</p>
      {/* Добавьте другой контент для слайда 6 */}
    </div>
  </div>
));

Slides.displayName = "Slides";

export default Slides;
