import React, { useState, useRef } from 'react';
import './Magnifier.css';

const RulerOverlay = ({ zoom }) => {
  // Additional ruler overlay logic if needed
};

const Magnifier = ({ src }) => {
  const [magnify, setMagnify] = useState(false);
  const [zoom, setZoom] = useState(100); // Default zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scalePosition, setScalePosition] = useState({ x: 50, y: 50 }); // Position of the floating scale
  const [imageSrc, setImageSrc] = useState(''); // State for the uploaded image source
  const magnifierRef = useRef(null); // Ref to the magnifier element


  const handleMouseMove = (e) => {
    if (!magnify) return;

    // Left mouse button pressed
    if (e.buttons === 1) {
      const bounds = magnifierRef.current.getBoundingClientRect();
      const x = ((e.clientX - bounds.left) / bounds.width) * 100;
      const y = ((e.clientY - bounds.top) / bounds.height) * 100;
      setPosition({ x, y });
    }

    // Right mouse button pressed
    if (e.buttons === 2) {
      const bounds = e.target.getBoundingClientRect();
      const x = ((e.clientX - bounds.left) / bounds.width) * 100;
      const y = ((e.clientY - bounds.top) / bounds.height) * 100;
      setScalePosition({ x, y });
    }
  };
   // Upload file
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent the context menu
  };

  const tooltipStyle = {
    position: 'absolute',
    left: '10px',
    top: '10px',
    padding: '5px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'red',
    borderRadius: '4px',
    pointerEvents: 'none',
    fontSize: '0.8em'
  };

  const FloatingRuler = ({ position, zoom }) => {
    const markings = [];
    const zoomFactor = zoom / 100; // Convert zoom level to a factor
  
    // The length of the unit (0 to 1) adjusted by the zoom factor
    const unitLength = 100 * zoomFactor;
  
    for (let i = 0; i <= unitLength; i += zoomFactor) {
      const isMajorTick = i % (10 * zoomFactor) === 0; // Major tick every 0.1 unit
      const isMinorTick = i % (5 * zoomFactor) === 0 && !isMajorTick; // Minor tick at 0.05 unit
  
      const label = isMajorTick ? (i / unitLength).toFixed(1) : ''; // Label for major ticks
  
      markings.push(
        <div key={i} style={{
          height: isMajorTick ? '100%' : isMinorTick ? '75%' : '50%',
          width: '1px',
          backgroundColor: 'black',
          position: 'absolute',
          left: `${(i / zoomFactor)}%`,
          bottom: 0,
        }}>
          {isMajorTick && <span style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-50%',
            whiteSpace: 'nowrap',
            fontSize: '15px',
            color: 'red',
          }}>{label}</span>}
        </div>
      );
    }

      // Define constants for clarity
    const baseWidth = 500; // Base width of the ruler
    const adjustmentFactor = 0.70; // Factor for scaling adjustments
    const halfScale = 2; // Factor to half the scale

    // Adjust the ruler width dynamically based on zoom level
    const adjustedWidth = baseWidth * zoomFactor / adjustmentFactor;
    const rulerWidth = adjustedWidth / halfScale;
  
    const rulerStyle = {
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      width: `${rulerWidth}px`,
      height: '50px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      pointerEvents: 'none',
      border: '1px solid black',
      boxSizing: 'border-box',
      background: 'white',
    };
    
    return (
      <div style={rulerStyle}>
        {markings}
      </div>
    );
  };
  

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <button onClick={() => setMagnify(!magnify)}>
        {magnify ? 'Turn off Magnifier' : 'Turn on Magnifier'}
      </button>
      <select onChange={(e) => setZoom(e.target.value)} value={zoom} className="zoom-selector">
      <option value="25">0.25x</option>
        <option value="50">0.5x</option>
        <option value="75">0.75x</option>
        <option value="100">1x</option>
        <option value="200">2x</option>
        <option value="300">3x</option>
        <option value="400">4x</option>
        <option value="500">5x</option>
      </select>
      <div
        className="magnifier"
        ref={magnifierRef}
        style={{
          backgroundImage: `url(${imageSrc})`, // Use uploaded image
          backgroundSize: magnify ? `${zoom}%` : '100%',
          backgroundPosition: `${position.x}% ${position.y}%`
        }}
        onMouseMove={handleMouseMove}
        onContextMenu={handleRightClick}
      >
        {magnify && <RulerOverlay zoom={zoom} />}
        {magnify && <FloatingRuler position={scalePosition} zoom={zoom} />}
      </div>
    </div>
  );
};

export default Magnifier;
