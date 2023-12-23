import React, { useState, useRef } from 'react';
import './Magnifier.css';

const RulerOverlay = ({ zoom }) => {
  // const markers = [];
  // for (let i = 0; i <= 100; i += 10) {
  //   markers.push(
  //     <div className="ruler-marker" style={{ left: `${i}%` }} key={i}>
  //       {i / 100} mm
  //     </div>
  //   );
  // }

  // return (
  //   <div className="ruler-overlay">
  //     <div className="ruler-scale">{markers}</div>
  //   </div>
  // );
};


const Magnifier = ({ src }) => {
  const [magnify, setMagnify] = useState(false);
  const [zoom, setZoom] = useState(200); // Default zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scalePosition, setScalePosition] = useState({ x: 50, y: 50 }); // Position of the floating scale
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

  // const scaleStyle = {
  //   position: 'absolute',
  //   left: `${scalePosition.x}%`,
  //   top: `${scalePosition.y}%`,
  //   width: '500px', // Longer width to resemble a ruler
  //   height: '40px', // Standard height for visibility
  //   border: '1px solid black', // Ruler typically has a darker border
  //   backgroundColor: 'white', // Ruler is often white or light-colored
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-around', // Space out the markings evenly
  //   color: 'black', // Black color for the text and markings
  //   fontSize: '50px', // Adjust font size for the numbers
  //   pointerEvents: 'none',
  //   backgroundImage: 'linear-gradient(to right, black 50%, transparent 50%)', // Create ruler markings
  //   backgroundSize: '10px 100%', // Size of each marking
  //   boxSizing: 'border-box'
  // };
  

  // const FloatingRuler = ({ position }) => {
  //   // Generate markings for each millimeter
  //   const markings = [];
  //   for (let i = 0; i <= 100; i++) {
  //     const isCentimeter = i % 10 === 0;
  //     const label = isCentimeter ? i / 10 : '';
  //     markings.push(
  //       <div key={i} style={{
  //         height: isCentimeter ? '100%' : '50%', // Longer lines for centimeters
  //         width: '1px',
  //         backgroundColor: 'blue',
  //         position: 'absolute',
  //         left: `${i}%`,
  //         bottom: 0,
  //       }}>
  //         {isCentimeter && <span style={{
  //           position: 'absolute',
  //           bottom: '-20px',
  //           left: '-50%',
  //           whiteSpace: 'nowrap',
  //         }}>{label}</span>}
  //       </div>
  //     );
  //   }
  
  //   // Style for the floating ruler container
  //   const rulerStyle = {
  //     position: 'absolute',
  //     left: `${position.x}%`,
  //     top: `${position.y}%`,
  //     width: '500px', // Arbitrary width of the floating ruler
  //     height: '50px', // Height to fit centimeter and millimeter markings
  //     display: 'flex',
  //     alignItems: 'flex-end',
  //     justifyContent: 'flex-start',
  //     pointerEvents: 'none',
  //     border: '1px solid black',
  //     boxSizing: 'border-box',
  //   };
  
  //   return (
  //     <div style={rulerStyle}>
  //       {markings}
  //     </div>
  //   );
  // };

  const FloatingRuler = ({ position }) => {
    // Generate markings for each millimeter
    const markings = [];
    for (let i = 0; i <= 100; i++) {
      const isCentimeter = i % 10 === 0;
      const isHalfCentimeter = i % 5 === 0 && !isCentimeter;
      const label = isCentimeter ? i / 10 : '';
      markings.push(
        <div key={i} style={{
          height: isCentimeter ? '100%' : isHalfCentimeter ? '75%' : '50%', // Adjust height for different markings
          width: '1px',
          backgroundColor: 'black',
          position: 'absolute',
          left: `${i}%`,
          bottom: 0,
        }}>
          {isCentimeter && <span style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-50%',
            whiteSpace: 'nowrap',
            fontSize: '15px', // Reduced font size for the labels
            color: 'red',
          }}>{label}</span>}
        </div>
      );
    }
  
    // Style for the floating ruler container
    const rulerStyle = {
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      width: '500px', // Arbitrary width of the floating ruler
      height: '50px', // Height to fit centimeter and millimeter markings
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      pointerEvents: 'none',
      border: '1px solid black',
      boxSizing: 'border-box',
      background: 'white', // Adding a white background for better visibility
    };
  
    return (
      <div style={rulerStyle}>
        {markings}
      </div>
    );
  };
  
  // const FloatingRuler = ({ position }) => {
  //   // Generate markings for each millimeter
  //   const markings = [];
  //   for (let i = 0; i <= 100; i++) {
  //     const isCentimeter = i % 10 === 0;
  //     const isHalfCentimeter = i % 5 === 0 && !isCentimeter;
  //     const label = isCentimeter ? i / 10 : '';
  //     markings.push(
  //       <div key={i} style={{
  //         height: isCentimeter ? '100%' : isHalfCentimeter ? '75%' : '50%', // Adjust height for different markings
  //         width: '1px',
  //         backgroundColor: 'black',
  //         position: 'absolute',
  //         left: `${i}%`,
  //         bottom: 0,
  //       }}>
  //         {isCentimeter && <span style={{
  //           position: 'absolute',
  //           top: '-20px', // Changed from 'bottom' to 'top' to move the label above the ruler
  //           left: '50%',
  //           transform: 'translateX(-50%)', // Center the label
  //           whiteSpace: 'nowrap',
  //           fontSize: '10px', // Reduced font size for the labels
  //           color: 'red', // Set label text color to red
  //         }}>{`${label} `}</span>}
  //       </div>
  //     );
  //   }
  
  //   // Style for the floating ruler container
  //   const rulerStyle = {
  //     position: 'absolute',
  //     left: `${position.x}%`,
  //     top: `${position.y}%`,
  //     width: '500px', // Arbitrary width of the floating ruler
  //     height: '50px', // Height to fit centimeter and millimeter markings
  //     display: 'flex',
  //     alignItems: 'flex-end',
  //     justifyContent: 'flex-start',
  //     pointerEvents: 'none',
  //     border: '1px solid black',
  //     boxSizing: 'border-box',
  //     background: 'white', // Adding a white background for better visibility
  //   };
  
  //   return (
  //     <div style={rulerStyle}>
  //       {markings}
  //     </div>
  //   );
  // };  

  return (
    <div>
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
          backgroundImage: `url(${src})`,
          backgroundSize: magnify ? `${zoom}%` : '100%',
          backgroundPosition: `${position.x}% ${position.y}%`
        }}
        onMouseMove={handleMouseMove}
        onContextMenu={handleRightClick}
      >
        {magnify && <div style={tooltipStyle}>{zoom / 100}x</div>}
        {magnify && <RulerOverlay zoom={zoom} />}
        {/* {magnify && <div style={scaleStyle}>1mm</div>}  */}
        {magnify && <FloatingRuler position={scalePosition} />} 

      </div>
    </div>
  );
};

export default Magnifier;
