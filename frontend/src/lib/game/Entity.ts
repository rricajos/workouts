export interface Entity {
	x: number; 
	y: number; 
	w: number; 
	h: number; 

	// velocity of next x, y...
	vx: number; 
	vy: number;
	vw: number;
	vh: number;

	onMove: boolean;
	onBeat: boolean;
	onGround: boolean;
	alive: boolean;
	solid: boolean;
	color: string;
}