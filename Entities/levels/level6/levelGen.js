class LevelGen {
    constructor(heroSize) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth * 4; // Increase grid size
        this.canvas.height = window.innerHeight * 4;

        this.heroSize = heroSize;
        this.size = Math.floor(heroSize / 4);
        this.rows = Math.floor(this.canvas.height / this.size);
        this.cols = Math.floor(this.canvas.width / this.size);
        this.squares = new Array(this.rows * this.cols).fill(false);

        this.room1 = { x: 20, y: 20, width: 30, height: 30 };
        this.room2 = { x: 20, y: this.rows - 50, width: 30, height: 30 };
        this.room3 = { x: this.cols - 80, y: 30, width: 70, height: 70 };

        this.groundtexture = new Image();
        this.groundtexture.src = "https://i.imgur.com/hGjaTaH.png";

        this.edgeCells = [];

        this.groundtexture.addEventListener('load', () => {
            // Call the level generation functions
            this.generateRandomRooms();
            this.drawSquares();
        });

    }

    drawSquares() {
        let ctx = this.ctx;
        let canvas = this.canvas;
        let squares = this.squares;
        let groundtexture = this.groundtexture;
        let size = this.size;
        let rows = this.rows;
        let cols = this.cols;
        let heroSize = this.heroSize;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // make background black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < squares.length; i++) {
            const x = (i % cols) * size;
            const y = Math.floor(i / cols) * size;

            // draw image
            if (!squares[i]) {
                ctx.drawImage(groundtexture, x, y, size, size);
            } else {
                // draw a darker versino of the image
                ctx.drawImage(groundtexture, x, y, size, size);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(x, y, size, size);
            }

            // Check if the cell is an edge
            if (this.isEdge(i)) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, size, size);
                this.edgeCells.push({ x, y });
            }

        }
    }

    isEdge(index) {
        const x = index % this.cols;
        const y = Math.floor(index / this.cols);

        const left = index - 1;
        const right = index + 1;
        const top = index - this.cols;
        const bottom = index + this.cols;

        const topLeft = top - 1;
        const topRight = top + 1;
        const bottomLeft = bottom - 1;
        const bottomRight = bottom + 1;

        const indices = [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight];
        const isEdge = indices.some(i => {
            if (i < 0 || i >= this.squares.length) {
                return false;
            }
            return !this.squares[index] && this.squares[i];
        });

        return isEdge;
    }

    generateRandomRooms() {
        let squares = this.squares;
        let rows = this.rows;
        let cols = this.cols;

        const roomCount = 10;
        const roomMinSize = 15;
        const roomMaxSize = 50;
        const roomSpacing = 5;
        const roomMargin = 2;
        const roomArea = roomCount * ((roomMaxSize + roomMargin) ** 2);
        const areaFactor = 0.8;

        let rooms = [];
        let tries = 0;

        // add 6 mandatory rooms
        const mandatoryRooms = [
            this.room1,
            this.room2,
            this.room3
        ];
        rooms.push(...mandatoryRooms);

        while (rooms.length < roomCount && tries < 100) {
            const roomWidth = Math.floor(Math.random() * (roomMaxSize - roomMinSize + 1)) + roomMinSize;
            const roomHeight = Math.floor(Math.random() * (roomMaxSize - roomMinSize + 1)) + roomMinSize;
            const roomX = Math.floor(Math.random() * (cols - roomWidth - roomMargin * 2 - roomSpacing * (roomCount - 1))) + roomMargin;
            const roomY = Math.floor(Math.random() * (rows - roomHeight - roomMargin * 2)) + roomMargin;
            const room = { x: roomX, y: roomY, width: roomWidth, height: roomHeight };
            if (!rooms.some(r => this.isOverlap(room, r, roomSpacing))) {
                rooms.push(room);
            }
            tries++;
        }

        rooms.forEach(room => {
            // fill the room black
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    const index = y * cols + x;
                    squares[index] = false;
                }
            }
            this.fillRoomWithCircle(room);
        });

        this.connectRooms(rooms);
    }

    fillRoomWithCircle(room) {
        let squares = this.squares;
        let cols = this.cols;

        // generate an irregular cave shaped circle
        const xCenter = room.x + room.width / 2;
        const yCenter = room.y + room.height / 2;
        const radius = Math.min(room.width, room.height) / 2;
        const noiseScale = 3;
        const circlePoints = this.generateCircle(xCenter, yCenter, radius, noiseScale);

        // fill the room with the circle
        for (let y = room.y; y < room.y + room.height; y++) {
            for (let x = room.x; x < room.x + room.width; x++) {
                const index = y * cols + x;
                const point = { x, y };
                if (this.isPointInPolygon(point, circlePoints)) {
                    squares[index] = true;
                }
            }
        }
    }

    generateCircle(xCenter, yCenter, radius, noiseScale) {
        const circlePoints = [];
        const angleStep = Math.PI / 180;

        for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
            const noiseValue = p5.prototype.noise(angle * noiseScale);
            const randomRadius = radius * (0.8 + 0.4 * noiseValue);
            const x = xCenter + randomRadius * Math.cos(angle);
            const y = yCenter + randomRadius * Math.sin(angle);
            circlePoints.push({ x, y });
        }

        return circlePoints;
    }

    isPointInPolygon(point, polygon) {
        let isInside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;

            const intersect = ((yi > point.y) != (yj > point.y))
                && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect) isInside = !isInside;
        }
        return isInside;
    }

    isOverlap(room1, room2, spacing) {
        const x1 = room1.x - spacing;
        const y1 = room1.y - spacing;
        const x2 = room2.x - spacing;
        const y2 = room2.y - spacing;
        const w1 = room1.width + spacing * 2;
        const h1 = room1.height + spacing * 2;
        const w2 = room2.width + spacing * 2;
        const h2 = room2.height + spacing * 2;
        return x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2;
    }

    connectRooms(rooms) {
        let squares = this.squares;
        let cols = this.cols;

        function drawCorridor(startX, startY, endX, endY, thickness, currentIndex) {
            function drawIrregularLine(x1, y1, x2, y2, t) {
                const noiseScale = 0.1;
                for (let i = 0; i <= 1; i += 0.01) {
                    const x = x1 + (x2 - x1) * i;
                    const y = y1 + (y2 - y1) * i;
                    const noiseValue = p5.prototype.noise((x + y) * noiseScale);
                    const offset = t * (0.5 + noiseValue * 0.5);

                    let xMin = Math.min(x1, x2);
                    let xMax = Math.max(x1, x2);
                    let yMin = Math.min(y1, y2);
                    let yMax = Math.max(y1, y2);
                    xMin -= 2;
                    xMax += 2;
                    yMin -= 2;
                    yMax += 2;


                    for (let p = xMin; p <= xMax; p++) {
                        for (let q = yMin; q <= yMax; q++) {
                            const index = (q + Math.round(offset)) * cols + (p + Math.round(offset));
                            if (Math.abs(p - x) <= t && Math.abs(q - y) <= t) {
                                squares[index] = true;
                            }
                        }
                    }
                }

            }

            const room1 = rooms[currentIndex];
            const room2 = rooms[currentIndex + 1];
            const minRoomDimension = Math.min(room1.width, room1.height, room2.width, room2.height);
            const corridorThickness = Math.floor(minRoomDimension * 0.4);

            drawIrregularLine(startX, startY, endX, startY, corridorThickness);
            drawIrregularLine(endX, startY, endX, endY, corridorThickness);
        }

        for (let i = 0; i < rooms.length - 1; i++) {
            const room1 = rooms[i];
            const room2 = rooms[i + 1];

            const room1CenterX = Math.floor(room1.x + room1.width / 2);
            const room1CenterY = Math.floor(room1.y + room1.height / 2);
            const room2CenterX = Math.floor(room2.x + room2.width / 2);
            const room2CenterY = Math.floor(room2.y + room2.height / 2);

            const minRoomDimension = Math.min(
                room1.width,
                room1.height,
                room2.width,
                room2.height
            );

            const minThickness = Math.max(1, Math.floor(minRoomDimension * 0.2));
            const maxThickness = Math.floor(minRoomDimension * 0.4);
            const corridorThickness = Math.floor(Math.random() * (maxThickness - minThickness + 1)) + minThickness;

            drawCorridor(room1CenterX, room1CenterY, room2CenterX, room1CenterY, corridorThickness, i);
            drawCorridor(room2CenterX, room1CenterY, room2CenterX, room2CenterY, corridorThickness, i);
        }
    }

}
