import asyncio
import websockets
import json
import math
import logging
import io
import sys

logging.basicConfig(level=logging.INFO)


class MarsRover:
    def __init__(self):
        self.position = [200, 200]
        self.orientation = 0

    def move(self, distance):
        self.position[0] += distance * math.cos(math.radians(self.orientation))
        self.position[1] += distance * math.sin(math.radians(self.orientation))
        print(f"Moved to {self.position}")
        return {
            "type": "roverUpdate",
            "position": self.position,
            "orientation": self.orientation,
        }

    def turn(self, angle):
        self.orientation = (self.orientation + angle) % 360
        return {
            "type": "roverUpdate",
            "position": self.position,
            "orientation": self.orientation,
        }


rover = MarsRover()

async def execute_code(websocket, path):
    logging.info(f"New connection from {websocket.remote_address}")
    try:
        async for message in websocket:
            logging.info(f"Received message: {message}")
            data = json.loads(message)
            if data['type'] == 'runCode':
                logging.info(f"Running code: {data['code']}")
                code = data['code']
                
                global_vars = {"rover": rover, "move": rover.move, "turn": rover.turn}
                local_vars = {}
                
                # Capture stdout
                old_stdout = sys.stdout
                sys.stdout = io.StringIO()
                
                try:
                    exec(code, global_vars, local_vars)
                    logging.info(f"Code executed successfully")
                    
                    # Get the captured output
                    output = sys.stdout.getvalue()
                    
                    # Send any printed output
                    if output:
                        await websocket.send(json.dumps({"type": "output", "data": output}))
                    
                    # Send any rover updates
                    if 'move' in local_vars or 'turn' in local_vars:
                        await websocket.send(json.dumps(rover.move(0)))  # Send current position
                    
                except Exception as e:
                    await websocket.send(json.dumps({"type": "output", "data": f"Error: {str(e)}"}))
                
                finally:
                    # Restore stdout
                    sys.stdout = old_stdout
    
    except websockets.exceptions.ConnectionClosedError:
        logging.info(f"Connection closed for {websocket.remote_address}")
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
    finally:
        logging.info(f"Connection closed for {websocket.remote_address}")

async def main():
    server = await websockets.serve(execute_code, "localhost", 8765)
    logging.info("Server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
