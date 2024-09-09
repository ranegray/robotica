import { useEffect, useRef } from 'react';

export default function RoverCam() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set up your Mars scene drawing code here

        // Example: Draw a red rectangle representing the Mars surface
        context.fillStyle = 'red';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Example: Draw a rover at a specific position
        const roverX = 100;
        const roverY = 100;
        context.fillStyle = 'gray';
        context.fillRect(roverX, roverY, 50, 50);

        // Add more drawing code to create your Mars scene

    }, []);

    return (
        <div className="w-1/3">
            <h2>RoverCam</h2>
            <p>Curiosity Rovers Cameras</p>
            <canvas ref={canvasRef} className='w-full' />
        </div>
    );
}
